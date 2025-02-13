"use server"
// import jwt from 'jsonwebtoken'
import { SignJWT, jwtVerify } from 'jose'

import { NextResponse } from 'next/server'


export const authenticate = async (req: any, res: any, next: any)=>{
    if(!req.headers.authorization)
        return NextResponse.json({ success: false, message: 'You are not authorized' }, { status: 401 })

    let token = req.headers.authorization

    // Bearer token
    token = token.split(" ")[1]
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not set');
      }
      
    try{
        let user = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
        req.user = user.payload
        next()
    }
    catch(err){
        return NextResponse.json({ success: false, message: 'You are not authorized' }, { status: 401 })
    }
}