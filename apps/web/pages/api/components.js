import { getComponentsData } from '../../lib/components'

export default function handler(req, res) {
  try {
    const components = getComponentsData()
    res.status(200).json({ components })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error in /api/components:', error)
    res.status(500).json({ error: 'Failed to load components' })
  }
}
