import fs from "fs"
import path from "path"
import { globSync } from "glob"

export function getContributorsData() {
  // console.log("========== getContributorsData CALLED ==========")
  
  let componentsDir = path.resolve(process.cwd(), "../../components")
  // console.log("Initial componentsDir:", componentsDir)
  // console.log("process.cwd():", process.cwd())
  
  const possiblePaths = [
    path.resolve(process.cwd(), "../../components"),
    path.resolve(__dirname, "../../../../../components"),
    path.resolve(__dirname, "../../../components"),
    path.resolve(process.cwd(), "components"),
  ]
  
  // console.log("========== Checking possible paths ==========")
  let pathFound = false
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      componentsDir = possiblePath
      pathFound = true
      // console.log("✅ USING PATH:", componentsDir)
      break
    }
  }
  
  if (!pathFound) {
    // console.error("❌ NO VALID PATH FOUND!")
    return []
  }

  // Fix for Windows: normalize path separators for glob
  const normalizedPath = componentsDir.replace(/\\/g, "/")
  const pattern = `${normalizedPath}/**/component.json`
  
  // console.log("========== Glob pattern ==========")
  // console.log("Pattern:", pattern)
  
  try {
    // console.log("========== Running globSync ==========")
    const files = globSync(pattern)
    // console.log(`Found ${files.length} component.json files`)
    
    if (files.length === 0) {
      // console.warn("⚠️ No component.json files found!")
      
      // Manual check - let's see what's actually in the subdirectories
      // console.log("Checking subdirectories manually:")
      const dirContents = fs.readdirSync(componentsDir)
      dirContents.forEach(dir => {
        const dirPath = path.join(componentsDir, dir)
        if (fs.statSync(dirPath).isDirectory()) {
          // const filesInDir = fs.readdirSync(dirPath)
          // console.log(`  ${dir}/:`, filesInDir)
        }
      })
      
      return []
    }
    
    // console.log("Files found:", files)
    
    const contributorsMap = new Map()
    // console.log("========== Processing files ==========")
    
    for (const file of files) {
      // console.log(`\nProcessing file: ${file}`)
      try {
        const content = fs.readFileSync(file, "utf8")
        const metadata = JSON.parse(content)
        // console.log(`  Parsed metadata:`, JSON.stringify(metadata, null, 2))
        
        const author = metadata.author || "Unknown"
        // console.log(`  Author: ${author}`)
        
        if (!contributorsMap.has(author)) {
          // console.log(`  Creating new contributor entry for: ${author}`)
          contributorsMap.set(author, {
            author,
            avatar: author !== "Unknown" ? `https://github.com/${author}.png` : null,
            github: author !== "Unknown" ? `https://github.com/${author}` : null,
            components: [],
          })
        } else {
          // console.log(`  Adding to existing contributor: ${author}`)
        }

        const componentData = {
          name: metadata.name || "Unnamed Component",
          path: path.relative(componentsDir, path.dirname(file)),
        }
        // console.log(`  Adding component:`, componentData)
        contributorsMap.get(author).components.push(componentData)
        
      } catch (error) {
        // console.error(`  ❌ Error processing ${file}:`, error)
      }
    }

    // console.log("========== Final Results ==========")
    // console.log(`Total unique contributors: ${contributorsMap.size}`)
    
    const result = Array.from(contributorsMap.values()).sort(
      (a, b) => b.components.length - a.components.length
    )
    
    // console.log("Contributors (sorted):")
    // result.forEach((contributor, index) => {
    //   // console.log(`  ${index + 1}. ${contributor.author} - ${contributor.components.length} components`)
    // })
    
    return result
    
  } catch (error) {
    // console.error("========== FATAL ERROR ==========")
    // console.error("Error:", error)
    return []
  }
}