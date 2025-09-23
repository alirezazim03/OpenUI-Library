const fs = require('fs')
const path = require('path')
const glob = require('glob')

function getComponentsData() {
  const componentsDir = path.join(process.cwd(), '../../components')
  const pattern = path.join(componentsDir, '**/component.json')
  
  try {
    const files = glob.sync(pattern)
    const components = []
    
    for (const file of files) {
      try {
        const content = fs.readFileSync(file, 'utf8')
        const metadata = JSON.parse(content)
        
        // Extract component path information
        const relativePath = path.relative(componentsDir, file)
        const pathParts = relativePath.split(path.sep)
        const componentPath = path.dirname(relativePath)
        
        components.push({
          ...metadata,
          path: componentPath,
          category: pathParts[0],
          framework: pathParts[1],
          name: pathParts[2]
        })
      } catch (error) {
        console.error(`Error reading component metadata from ${file}:`, error.message)
      }
    }
    
    return components
  } catch (error) {
    console.error('Error reading components:', error.message)
    return []
  }
}

function getComponentByPath(componentPath) {
  const componentsDir = path.join(process.cwd(), '../../components')
  const metadataPath = path.join(componentsDir, componentPath, 'component.json')
  
  try {
    const content = fs.readFileSync(metadataPath, 'utf8')
    const metadata = JSON.parse(content)
    
    // Read component files
    const componentDir = path.join(componentsDir, componentPath)
    const files = fs.readdirSync(componentDir)
    
    const componentFiles = {}
    for (const file of files) {
      if (file !== 'component.json') {
        const filePath = path.join(componentDir, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        componentFiles[file] = fileContent
      }
    }
    
    return {
      ...metadata,
      path: componentPath,
      files: componentFiles
    }
  } catch (error) {
    console.error(`Error reading component ${componentPath}:`, error.message)
    return null
  }
}

module.exports = {
  getComponentsData,
  getComponentByPath
}
