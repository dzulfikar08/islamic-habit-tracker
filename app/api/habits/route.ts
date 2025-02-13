import { middleware } from '@/middleware/middleware'
import { getHabits } from '@/services/habitService'
import { getUsers } from '@/services/userService'


import { NextRequest, NextResponse } from 'next/server'

export const runtime ='edge'


/** GET: Fetch all experiences */
export const GET = async () => {
    try {
      // middleware(NextRequest, NextResponse => {})
      const res = await getHabits()
      return NextResponse.json(res, { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch habits' }, { status: 500 })
    }
  }
  /** POST: Add a new experience */
  // export const POST = async (req: Request) => {
  //   try {
  //     const body = await req.json() as {
  //       name: string;
  //       username: string;
  //       password: string;
  //       passwordHashed: string;
  //     };

  //     const hashedPassword = await Bun.password.hash(body.password,{
  //       algorithm: "bcrypt",
  //       cost: 4, // number between 4-31
  //     });

  //     body.passwordHashed = hashedPassword

  //     const newExperience = await addUser(body)
  
  //     if (!newExperience) {
  //       return NextResponse.json({ error: 'Failed to add experience' }, { status: 400 })
  //     }
  
  //     return NextResponse.json(newExperience, { status: 201 })
  //   } catch (error) {
  //     return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  //   }
  // }
  /** PUT: Update an experience */
  // export const PUT = async (req: Request) => {
  //   try {
  //     const body = await req.json() as { id: number; [key: string]: any }
  //     const { id, ...data } = body
  
  //     if (!id) {
  //       return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  //     }
  
  //     const updatedExperience = await updateExperience(id, data)
  
  //     if (!updatedExperience) {
  //       return NextResponse.json({ error: 'Failed to update experience' }, { status: 400 })
  //     }
  
  //     return NextResponse.json(updatedExperience, { status: 200 })
  //   } catch (error) {
  //     return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  //   }
  // }
  
  // /** DELETE: Remove an experience */
  // export const DELETE = async (req: Request) => {
  //   try {
  //     const { id }: { id: number } = await req.json()
  
  //     if (!id) {
  //       return NextResponse.json({ error: 'ID is required' }, { status: 400 })
  //     }
  
  //     const deletedExperience = await deleteExperience(id)
  
  //     if (!deletedExperience) {
  //       return NextResponse.json({ error: 'Failed to delete experience' }, { status: 400 })
  //     }
  
  //     return NextResponse.json({ message: 'Experience deleted successfully' }, { status: 200 })
  //   } catch (error) {
  //     return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  //   }
  // }
  
  