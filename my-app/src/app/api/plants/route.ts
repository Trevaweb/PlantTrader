import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Plant from '@/lib/models/Plant';

export async function GET() {
  try {
    await connectDB();
    const plants = await Plant.find({}).sort({ category: 1, name: 1 });
    return NextResponse.json(plants);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch plants' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const plant = await Plant.create(body);
    return NextResponse.json(plant, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create plant' },
      { status: 500 }
    );
  }
} 