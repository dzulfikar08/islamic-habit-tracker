import { middleware } from '@/middleware/middleware'
import { getUsers } from '@/services/userService'


import { NextRequest, NextResponse } from 'next/server'

export const runtime ='edge'


/** GET: Fetch all experiences */
export const GET = async () => {
    try {
      // middleware(NextRequest, NextResponse, () => {})
      const res = await getUsers()
      return NextResponse.json(res, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
    }
  }