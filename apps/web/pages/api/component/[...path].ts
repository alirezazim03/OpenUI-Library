import type { NextApiRequest, NextApiResponse } from "next"
import type { ComponentApiResponse } from "../../../types"
const { getComponentByPath } = require("../../../lib/components")

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ComponentApiResponse | { error: string }>
) {
  try {
    const { path } = req.query
    const componentPath = Array.isArray(path) ? path.join("/") : path || ""
    const component = getComponentByPath(componentPath)

    if (!component) {
      return res.status(404).json({ error: "Component not found" })
    }

    res.status(200).json({ component })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error in /api/component/[...path]:", error)
    res.status(500).json({ error: "Failed to load component" })
  }
}
