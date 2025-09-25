import fs from 'fs'
import path from 'path'
import glob from 'glob'
import { ComponentMetadata, ComponentWithFiles } from '../types'

export function getComponentsData(): ComponentMetadata[] {
  // Determine the correct path to components directory
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

  const pattern = path.join(componentsDir, '**', 'component.json')

  try {
    const files = glob.sync(pattern)
    const components: ComponentMetadata[] = []

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
        // eslint-disable-next-line no-console
        console.error(
          `Error reading component metadata from ${file}:`,
          (error as Error).message
        )
      }
    }

    return components
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error reading components:', (error as Error).message)
    return []
  }
}

export function getComponentByPath(
  componentPath: string
): ComponentWithFiles | null {
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

    const componentFiles: Record<string, string> = {}
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
    // eslint-disable-next-line no-console
    console.error(
      `Error reading component ${componentPath}:`,
      (error as Error).message
    )
    return null
  }
}

// Functions already exported above
