import { db } from "@/db";
import { accountsTable, usersTable } from "@/db/schema";
import { D1Adapter } from "@auth/d1-adapter";
import { eq } from 'drizzle-orm'



/** USERS SERVICE **/
export const signInGoogle = async (body: any) => {
    try {
     

      const [token] = await db.select({token: accountsTable.idToken}).from(accountsTable).where(eq(accountsTable.userId, body)).limit(1)
      console.log(token)
      return token.token

    } catch (error) {
      console.error("Error fetching users:", error)
      return false
    }
}
