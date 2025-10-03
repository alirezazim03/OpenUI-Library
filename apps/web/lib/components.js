const fs = require("fs")
const path = require("path")

const glob = require("glob")

function getComponentsData() {
  // Determine the correct path to components directory
  let componentsDir = path.resolve(process.cwd(), "../../components")

  // Fallback paths to try
  const possiblePaths = [
    path.resolve(process.cwd(), "../../components"), // From apps/web -> project root
    path.resolve(__dirname, "../../../../../components"), // From .next/server/pages -> project root
    path.resolve(__dirname, "../../../components"), // From lib -> project root
    path.resolve(process.cwd(), "components"), // If running from project root
  ]

  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      componentsDir = possiblePath
      break
    }
  }

  // Normalize path for cross-platform compatibility (Windows fix)
  const pattern = path
    .join(componentsDir, "**", "component.json")
    .replace(/\\/g, "/")

  try {
    let files = glob.sync(pattern)

    // Windows fallback: try with forward slashes if no files found
    if (files.length === 0 && process.platform === "win32") {
      const fallbackPattern =
        componentsDir.replace(/\\/g, "/") + "/**/component.json"
      files = glob.sync(fallbackPattern)
    }

    const components = []

    for (const file of files) {
      try {
        const content = fs.readFileSync(file, "utf8")
        const metadata = JSON.parse(content)

        // Extract component path information
        const relativePath = path.relative(componentsDir, file)
        const pathParts = relativePath.split(path.sep)
        const componentPath = path.dirname(relativePath)

        components.push({
          ...metadata,
          path: componentPath,
          // Only override category if not provided in metadata
          category: metadata.category || pathParts[0],
        })
      } catch (error) {
        // Log parsing errors but continue processing other components
        // eslint-disable-next-line no-console
        // eslint-disable-next-line no-console
        console.warn(
          `Skipping invalid component metadata in ${file}:`,
          error.message
        )
      }
    }

    return components
  } catch (error) {
    // eslint-disable-next-line no-console
    // eslint-disable-next-line no-console
    console.error("Error reading components directory:", error.message)
    return []
  }
}

function getComponentByPath(componentPath) {
  let componentsDir = path.resolve(process.cwd(), "../../components")

  // Fallback paths to try
  const possiblePaths = [
    path.resolve(process.cwd(), "../../components"), // From apps/web -> project root
    path.resolve(__dirname, "../../../../../components"), // From .next/server/pages -> project root
    path.resolve(__dirname, "../../../components"), // From lib -> project root
    path.resolve(process.cwd(), "components"), // If running from project root
  ]

  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      componentsDir = possiblePath
      break
    }
  }

  const metadataPath = path.join(componentsDir, componentPath, "component.json")

  try {
    const content = fs.readFileSync(metadataPath, "utf8")
    const metadata = JSON.parse(content)

    // Read component files
    const componentDir = path.join(componentsDir, componentPath)
    const files = fs.readdirSync(componentDir)

    const componentFiles = {}
    for (const file of files) {
      if (file !== "component.json") {
        const filePath = path.join(componentDir, file)
        const fileContent = fs.readFileSync(filePath, "utf8")
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
    console.error(`Error reading component ${componentPath}:`, error.message)
    return null
  }
}

module.exports = {
  getComponentsData,
  getComponentByPath,
}
