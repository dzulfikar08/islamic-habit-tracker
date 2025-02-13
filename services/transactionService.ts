'use server'

import { db } from '@/db'
import { transactionsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
/** TRANSACTIONS SERVICE **/
export const getTransactions = async () => {
  try {
    return await db.select().from(transactionsTable)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return []
  }
}

export const addTransaction = async (transaction: {
  habitsId: number,
  createdAt: string,
  createdBy: number,
  assignTo: string
}) => {
  try {
    const [newTransaction] = await db.insert(transactionsTable).values(transaction).returning()
    return newTransaction
  } catch (error) {
    console.error("Error adding transaction:", error)
    return null
  }
}

export const updateTransaction = async (id: number, transaction: {
  habitsId: number,
  doneAt: string,
  undoAt: string,
  createdAt: string,
  assignTo: string
}) => {
  try {
    const [updatedTransaction] = await db.update(transactionsTable).set(transaction).where(eq(transactionsTable.id, id)).returning()
    return updatedTransaction
  } catch (error) {
    console.error("Error updating transaction:", error)
    return null
  }
}

export const deleteTransaction = async (id: number) => {
  try {
    const [deletedTransaction] = await db.delete(transactionsTable).where(eq(transactionsTable.id, id)).returning()
    return deletedTransaction
  } catch (error) {
    console.error("Error deleting transaction:", error)
    return null
  }
}