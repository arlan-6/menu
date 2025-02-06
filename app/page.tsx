import ProductList from "@/components/ProductList"
import type { Product } from "@/types/product"

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${"http://localhost:3001"}/products`, { cache: "no-store" })
  if (!res.ok) {
    console.error("Failed to fetch products:", await res.text())
    throw new Error("Failed to fetch products")
  }
  return res.json()
}

export default async function Home() {
  try {
    const products = await getProducts()
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Our Menu</h1>
        <ProductList initialProducts={products} />
      </main>
    )
  } catch (error) {
    console.error("Error in Home component:", error)
    return <div>Error loading products. Please try again later.</div>
  }
}

// npx json-server --watch db.json --port
// 3001