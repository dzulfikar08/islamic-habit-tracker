import { getRequestContext } from '@cloudflare/next-on-pages'
import { drizzle } from 'drizzle-orm/d1'
import  type { AnyD1Database } from 'drizzle-orm/d1'
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import * as schema from '@/db/schema'

export const runtime = 'edge'

export function initDbConnection() {
  if (process.env.NODE_ENV === 'development') {
    // setupDevPlatform();
    const { env: requestEnv } = getRequestContext()

    // @ts-expect-error DB is exist
    return drizzle(requestEnv.DB, { schema })
  }

  return drizzle(process.env.DB as unknown as AnyD1Database, { schema })
}

export const db = initDbConnection()
