import type { NextRequest } from 'next/server';
import { up } from "@auth/d1-adapter";


export const runtime ='edge'

export async function GET(request: NextRequest) {
    try {
        await up(process.env.DB as unknown as D1Database)
    } catch (e: any) {
        console.log(e.cause.message, e.message)
    }
    return new Response('Migration completed');
}