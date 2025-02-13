'use server'

import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

/** USERS SERVICE **/  
export const getUsers = async () => {
  try {
    return await db.select().from(usersTable)
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}



// export const addUser = async (user : {
//   name: string,
//   username: string,
//   passwordHashed: string
// }) => {
//   try {
//     const [newUser] = await db.insert(usersTable).values(user).returning()
//     return newUser
//   } catch (error) {
//     console.error("Error adding user:", error)
//     return null
//   }
// }

// export const updateUser = async (id: number, user : {
//   name: string,
//   username: string,
//   passwordHashed: string 
// }) => {
//   try {
//     const [updatedUser] = await db.update(usersTable).set(user).where(eq(usersTable.id, id)).returning()
//     return updatedUser
//   } catch (error) {
//     console.error("Error updating user:", error)
//     return null
//   }
// }

// export const deleteUser = async (id: number) => {
//   try {
//     const [deletedUser] = await db.delete(usersTable).where(eq(usersTable.id, id)).returning()
//     return deletedUser
//   } catch (error) {
//     console.error("Error deleting user:", error)
//     return null
//   }
// }



