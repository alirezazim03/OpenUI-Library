import { getContributorsData } from "@/lib/getContributors"
import type { NextApiRequest, NextApiResponse } from "next"
// const { getContributorsData } = require("../../lib/components")

interface Contributor {
  author: string
  avatar: string | null
  github: string | null
  components: Array<{
    name: string
    path: string
  }>
}

interface ContributorsApiResponse {
  contributors: Contributor[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContributorsApiResponse | { error: string }>
) {
  try {
    const contributors = getContributorsData()
    // console.log(contributors, "contributors")
    res.status(200).json({ contributors })
  } catch (error) {
    // console.log(error, "---> error")
    // console.error("Error in /api/contributors:", error)
    res.status(500).json({ error: "Failed to load contributors" })
  }
}