import { NextResponse } from 'next/server';
import { db } from '@/lib/db/db'; // Import Drizzle instance
import { user } from '@/lib/db/schema'; // Import user table schema
// import { v4 as uuidv4 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { userValidationSchema } from '@/lib/validators/userSchema';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
    try {
        const body = await req.json(); // Parse incoming request body
        const validationResult = userValidationSchema.safeParse(body); // Validate request body

        if (!validationResult.success) {
            return NextResponse.json({ error: validationResult.error.errors }, { status: 400 });
        }


        const newUser = {
            id: uuidv4(), // Generate UUID for new user
            fname: validationResult.data.fname,
            lname: validationResult.data.lname,
            email: validationResult.data.email,
        };


        await db.insert(user).values(newUser);

        return NextResponse.json({ message: 'User added successfully', newUser }, { status: 201 });
    } catch (error) {
        console.error('Error adding user:', error);
        return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
    }
}



export async function GET(req: Request) {

    try {
        const allUsers = await db.select().from(user);
        return Response.json(allUsers);
    } catch (error) {
        return Response.json({ message: ' failed to get users' }, { status: 500 });
    }
}

