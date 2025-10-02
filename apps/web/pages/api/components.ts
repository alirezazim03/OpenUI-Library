import type { NextApiRequest, NextApiResponse } from "next"
import type { ComponentsApiResponse } from "../../types"
const { getComponentsData } = require("../../lib/components")

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ComponentsApiResponse | { error: string }>
) {
  try {
    console.log("[DEBUG] /api/components endpoint called")
    console.log("[DEBUG] Request method:", req.method)

    const components = getComponentsData()
    console.log("[DEBUG] API returning " + components.length + " components")

    res.status(200).json({ components })
  } catch (error) {
    console.error("[DEBUG] Error in /api/components:", error)
    res.status(500).json({ error: "Failed to load components" })
  }
}
