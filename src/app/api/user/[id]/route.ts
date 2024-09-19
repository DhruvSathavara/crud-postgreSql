import { db } from '@/lib/db/db'; // Import Drizzle instance
import { user } from '@/lib/db/schema'; // Import user table schema
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
// GET request to fetch a user by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const userId = params.id;

        // Query the database to get the user by ID
        const result = await db.select().from(user).where(eq(user.id, userId)).limit(1);

        // (user.id.eq(userId)).limit(1);

        if (result.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}


export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const userId = params.id;

        // Query the database to get the user by ID
        const result = await db.delete(user).where(eq(user.id, userId));
        // (user.id.eq(userId)).limit(1);

        if (result.length === 0) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}

