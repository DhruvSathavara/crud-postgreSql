import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/lib/db/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        // url: process.env.DATABASE_URL as string,
        url: "postgresql://postgres.dnypjwvztrgwhwmmfgce:newCrudOperati@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
    },
})