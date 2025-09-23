const fs = require('fs')
const path = require('path')
const glob = require('glob')

function getComponentsData() {
  console.log('getComponentsData: __dirname =', __dirname)
  console.log('getComponentsData: process.cwd() =', process.cwd())

  // Determine the correct path to components directory
  let componentsDir = path.resolve(process.cwd(), '../../components')

  // Fallback paths to try
  const possiblePaths = [
    path.resolve(process.cwd(), '../../components'), // From apps/web -> project root
    path.resolve(__dirname, '../../../../../components'), // From .next/server/pages -> project root
    path.resolve(__dirname, '../../../components'), // From lib -> project root
    path.resolve(process.cwd(), 'components'), // If running from project root
  ]

  console.log('Trying paths:', possiblePaths)

  for (const possiblePath of possiblePaths) {
    console.log(
      'Checking path:',
      possiblePath,
      'exists:',
      fs.existsSync(possiblePath)
    )
    if (fs.existsSync(possiblePath)) {
      componentsDir = possiblePath
      console.log('Using components directory:', componentsDir)
      break
    }
  }

  const pattern = path.join(componentsDir, '**', 'component.json')
  console.log('Glob pattern:', pattern)

  try {
    const files = glob.sync(pattern)
    console.log('Glob found files:', files)
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
          name: pathParts[2],
        })
      } catch (error) {
        console.error(
          `Error reading component metadata from ${file}:`,
          error.message
        )
      }
    }

    return components
  } catch (error) {
    console.error('Error reading components:', error.message)
    return []
  }
}

function getComponentByPath(componentPath) {
  let componentsDir = path.resolve(process.cwd(), '../../components')

  // Fallback paths to try
  const possiblePaths = [
    path.resolve(process.cwd(), '../../components'), // From apps/web -> project root
    path.resolve(__dirname, '../../../../../components'), // From .next/server/pages -> project root
    path.resolve(__dirname, '../../../components'), // From lib -> project root
    path.resolve(process.cwd(), 'components'), // If running from project root
  ]

  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      componentsDir = possiblePath
      break
    }
  }

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
      files: componentFiles,
    }
  } catch (error) {
    console.error(`Error reading component ${componentPath}:`, error.message)
    return null
  }
}

module.exports = {
  getComponentsData,
  getComponentByPath,
}
