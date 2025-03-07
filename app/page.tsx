import ProductList from "@/components/ProductList"
import { getProducts } from "@/lib/data"



export default  function Home() {
  try {
    const products =  getProducts()
    return (
      <main className="container mx-auto p-4 overflow-auto">
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