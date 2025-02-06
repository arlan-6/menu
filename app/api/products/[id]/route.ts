import { NextResponse } from "next/server"

const API_URL = "http://localhost:3001"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const res = await fetch(`${API_URL}/products/${params.id}`)
    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`)
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error(`Error fetching product ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

