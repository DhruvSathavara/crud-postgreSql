import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// const queryString = process.env.DATABASE_URL as string;
const queryString = "postgresql://postgres.dnypjwvztrgwhwmmfgce:newCrudOperati@aws-0-us-east-1.pooler.supabase.com:6543/postgres";
export const connection = postgres(queryString);

export const db = drizzle(connection);