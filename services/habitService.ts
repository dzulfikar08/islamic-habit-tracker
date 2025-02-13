'use server'

import { db } from '@/db'
import {  habitsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
/** HABITS SERVICE **/
export const getHabits = async () => {
    try {
      return await db.select().from(habitsTable)
    } catch (error) {
      console.error("Error fetching habits:", error)
      return []
    }
  }
  
  export const addHabit = async (habit: {
    name: string,
    fromTime: string,
    toTime: string,
    createdBy: string,
    createdAt: string 
  }) => {
    try {
      const [newHabit] = await db.insert(habitsTable).values(habit).returning()
      return newHabit
    } catch (error) {
      console.error("Error adding habit:", error)
      return null
    }
  }
  
  export const updateHabit = async (id: number, habit: {
    name: string,
    fromTime: string,
    toTime: string,
  }) => {
    try {
      const [updatedHabit] = await db.update(habitsTable).set(habit).where(eq(habitsTable.id, id)).returning()
      return updatedHabit
    } catch (error) {
      console.error("Error updating habit:", error)
      return null
    }
  }
  
  export const deleteHabit = async (id: number) => {
    try {
      const [deletedHabit] = await db.delete(habitsTable).where(eq(habitsTable.id, id)).returning()
      return deletedHabit
    } catch (error) {
      console.error("Error deleting habit:", error)
      return null
    }
  }
  
  