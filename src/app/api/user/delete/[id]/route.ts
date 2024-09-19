import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db'; // Import Drizzle instance
import { user } from '@/lib/db/schema'; // Import user table schema
import { eq } from 'drizzle-orm'; // Drizzle condition

// Delete user by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const userId = params.id; // Extract user ID from URL params

        // Delete user by ID
        const deletedUser = await db.delete(user).where(eq(user.id, userId));

        if (deletedUser.rowCount === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ message: 'Failed to delete user' }, { status: 500 });
    }
}
