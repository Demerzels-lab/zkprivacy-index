import { NextApiRequest, NextApiResponse } from 'next'
import { createAgent } from '@/lib/agentsData'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { protocol, threshold, timeframe } = req.body
    
    // Validate input
    if (!protocol || !threshold || !timeframe) {
      return res.status(400).json({
        success: false,
        error: 'Protocol, threshold, and timeframe are required'
      })
    }
    
    try {
      // Create new agent
      const newAgent = createAgent({
        protocol,
        threshold,
        timeframe
      })
      
      res.status(201).json({
        success: true,
        agent: newAgent,
        message: `Agent #${newAgent.agentId} deployed successfully`,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to deploy agent',
        message: error instanceof Error ? error.message : 'Unknown error'
      })
    }
  } else {
    res.status(405).json({
      error: 'Method not allowed'
    })
  }
}