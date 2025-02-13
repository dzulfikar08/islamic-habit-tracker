import { middleware } from '@/middleware/middleware'
import { getTransactions } from '@/services/transactionService'



import { NextRequest, NextResponse } from 'next/server'

export const runtime ='edge'



/** GET: Fetch all experiences */
export const GET = async () => {
    try {
      // middleware(NextRequest, NextResponse, () => {})
      const res = await getTransactions()
      return NextResponse.json(res, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch habit' }, { status: 500 })
    }
  }