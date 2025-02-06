import { NextResponse } from "next/server"

const API_URL =  "http://localhost:3001"

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/products`)
    if (!res.ok) {
      throw new Error(`API responded with status: ${res.status}`)
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

