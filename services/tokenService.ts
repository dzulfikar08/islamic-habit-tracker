'use server'

import { db } from '@/db'
import {  tokenTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
// import jwt from 'jsonwebtoken'
import { SignJWT, jwtVerify } from 'jose'

/** TOKENS SERVICE **/
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

export const getTokens = async () => {
    try {
      return await db.select().from(tokenTable)
    } catch (error) {
      console.error("Error fetching tokens:", error)
      return []
    }
  }
  
  export const addToken = async (token: {
    username: string,
    userId: number
  }) => {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET environment variable is not set');
    }
    try {
      // var tokenSignedx = jwt.sign(token.username, process.env.JWT_SECRET, { expiresIn: '1d' });
      const tokenSigned = await new SignJWT({ username: token.username, userId: token.userId })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secretKey)

      const [newToken] = await db.insert(tokenTable).values({token: tokenSigned, username: token.username, userId: token.userId, expirationDateUTC: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()  }).returning()
      return newToken
    } catch (error) {
      console.error("Error adding token:", error)
      return null
    }
  }
  
  export const deleteToken = async (id: number) => {
    try {
      const [deletedToken] = await db.delete(tokenTable).where(eq(tokenTable.id, id)).returning()
      return deletedToken
    } catch (error) {
      console.error("Error deleting token:", error)
      return null
    }
  }