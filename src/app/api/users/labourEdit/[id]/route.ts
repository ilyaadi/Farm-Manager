import Labour from '@/models/labour'; // Adjust the path as necessary
import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/helpers/requireUser';

// API to fetch a single labour entry for editing
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = requireUser(req);
        const { id } = params;
        const labour = await Labour.findOne({ _id: id, userId });
        if (!labour) {
            return NextResponse.json({ message: 'Labour not found' }, { status: 404 });
        }
        return NextResponse.json(labour, { status: 200 });
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ message: 'Failed to fetch labour entry', error }, { status: 500 });
    }
}

// API to update a labour entry
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = requireUser(req);
        const { id } = params;
        const { name, shift, date } = await req.json();
        const updatedLabour = await Labour.findOneAndUpdate(
            { _id: id, userId },
            { name, shift, date },
            { new: true, runValidators: true }
        );
        if (!updatedLabour) {
            return NextResponse.json({ message: 'Labour not found' }, { status: 404 });
        }
        return NextResponse.json(updatedLabour, { status: 200 });
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ message: 'Failed to update labour entry', error }, { status: 500 });
    }
}

// API to delete a labour entry
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const userId = requireUser(req);
        const { id } = params;
        const deletedLabour = await Labour.findOneAndDelete({ _id: id, userId });
        if (!deletedLabour) {
            return NextResponse.json({ message: 'Labour not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Labour entry deleted successfully' }, { status: 200 });
    } catch (error: any) {
        if (error.message === "Unauthorized") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ message: 'Failed to delete labour entry', error }, { status: 500 });
    }
}
