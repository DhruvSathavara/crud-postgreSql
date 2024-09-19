import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db'; // Import Drizzle instance
import { user } from '@/lib/db/schema'; // Import user table schema
import { userValidationSchema } from '@/lib/validators/userSchema'; // Zod validation schema
import { eq } from 'drizzle-orm'; // Drizzle condition

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json(); // Parse request body
        const userId = params.id; // Extract user ID from URL params

        console.log('u id ----', userId);
        console.log('body ---', body);

        // Validate the data with Zod
        const validationResult = userValidationSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json({ error: validationResult.error.errors }, { status: 400 });
        }

        // Update user data in the database
        const updatedUser = await db.update(user)
            .set({
                fname: validationResult.data.fname,
                lname: validationResult.data.lname,
                email: validationResult.data.email,
            })
            .where(eq(user.id, userId));

        if (updatedUser.rowCount === 0) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: 'Failed to update user' }, { status: 500 });
    }
}
