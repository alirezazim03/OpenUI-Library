const fs = require("fs")
const path = require("path")

// Debug: Check if glob is available
let glob
try {
  glob = require("glob")
  console.log(
    "[DEBUG] glob package loaded successfully, version:",
    glob.version || "unknown"
  )
} catch (error) {
  console.error("[DEBUG] CRITICAL: Failed to load glob package:", error.message)
  throw new Error("Missing required dependency: glob")
}

function getComponentsData() {
  // Determine the correct path to components directory
  let componentsDir = path.resolve(process.cwd(), "../../components")

  // Debug logging
  console.log("[DEBUG] Component discovery started")
  console.log("[DEBUG] Current working directory:", process.cwd())
  console.log("[DEBUG] __dirname:", __dirname)

  // Fallback paths to try
  const possiblePaths = [
    path.resolve(process.cwd(), "../../components"), // From apps/web -> project root
    path.resolve(__dirname, "../../../../../components"), // From .next/server/pages -> project root
    path.resolve(__dirname, "../../../components"), // From lib -> project root
    path.resolve(process.cwd(), "components"), // If running from project root
  ]

  console.log("[DEBUG] Checking possible component paths:")
  for (const possiblePath of possiblePaths) {
    const exists = fs.existsSync(possiblePath)
    console.log(`[DEBUG] - ${possiblePath}: ${exists ? "EXISTS" : "NOT FOUND"}`)
    if (exists) {
      componentsDir = possiblePath
      console.log(`[DEBUG] Using components directory: ${componentsDir}`)
      break
    }
  }

  const pattern = path.join(componentsDir, "**", "component.json")
  console.log(
    "[DEBUG] Searching for component.json files with pattern:",
    pattern
  )

  try {
    const files = glob.sync(pattern)
    console.log(`[DEBUG] Found ${files.length} component.json files:`, files)
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
          category: pathParts[0],
          framework: pathParts[1],
          name: pathParts[2],
        })
        console.log(
          `[DEBUG] Successfully processed component: ${metadata.name} (${componentPath})`
        )
      } catch (error) {
        // Log parsing errors but continue processing other components
        // eslint-disable-next-line no-console
        console.warn(
          `[DEBUG] Skipping invalid component metadata in ${file}:`,
          error.message
        )
      }
    }

    console.log(
      `[DEBUG] Component discovery completed. Found ${components.length} valid components`
    )
    return components
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[DEBUG] Error reading components directory:", error.message)
    console.error("[DEBUG] Error details:", error)
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
