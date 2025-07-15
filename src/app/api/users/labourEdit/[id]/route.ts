import Labour from '@/models/labour'; // Adjust the path as necessary
import { NextResponse } from 'next/server';

// API to fetch a single labour entry for editing
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const labour = await Labour.findById(id);
        if (!labour) {
            return NextResponse.json({ message: 'Labour not found' }, { status: 404 });
        }
        return NextResponse.json(labour, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch labour entry', error }, { status: 500 });
    }
}

// API to update a labour entry
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const { name, shift, date } = await req.json();

    try {
        const updatedLabour = await Labour.findByIdAndUpdate(
            id,
            { name, shift, date }, // Include date in the update
            { new: true, runValidators: true }
        );

        if (!updatedLabour) {
            return NextResponse.json({ message: 'Labour not found' }, { status: 404 });
        }

        return NextResponse.json(updatedLabour, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to update labour entry', error }, { status: 500 });
    }
}

// API to delete a labour entry
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        const deletedLabour = await Labour.findByIdAndDelete(id);

        if (!deletedLabour) {
            return NextResponse.json({ message: 'Labour not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Labour entry deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to delete labour entry', error }, { status: 500 });
    }
}
