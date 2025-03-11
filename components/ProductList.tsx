"use client"

import { useState, useMemo, useCallback } from "react"
import ProductCard from "@/components/ProductCard"
import type { Product } from "@/types/product"
import { useLocalStorage } from "usehooks-ts"

interface ProductListProps {
  initialProducts: Product[]
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("name")
  const [searchQuery, setSearchQuery] = useState("")

  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(e.target.value)
  }, [])

  const handleSortOrderChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value)
  }, [])

  const handleSearchQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  
  const [value, setValue] = useLocalStorage<{ product: Product; count: number }[]>("cart", [])

  const handleAddToCart = (product: Product) => {
    const cart = value || []
    const existingProduct = cart.find((p) => p.product.id === product.id)
    if (existingProduct) {
      existingProduct.count += 1
    } else {
      cart.push({ product, count: 1 })
    }
    setValue(cart)
  }

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts]
    if (categoryFilter !== "all") {
      result = result.filter((product) => product.category === categoryFilter)
    }
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    result.sort((a, b) => {
      if (sortOrder === "name") return a.name.localeCompare(b.name)
      if (sortOrder === "price") return a.price - b.price
      return 0
    })
    return result
  }, [initialProducts, categoryFilter, sortOrder, searchQuery])

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            placeholder="Search by name, category, or description"
            className="mr-2 p-2 border rounded"
          />
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="mr-2 p-2 border rounded"
          >
            <option value="all">All Categories</option>
            <option value="appetizer">Appetizers</option>
            <option value="main">Main Courses</option>
            <option value="dessert">Desserts</option>
          </select>
          <select value={sortOrder} onChange={handleSortOrderChange} className="p-2 border rounded">
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
        </div>
        <div className="text-gray-700">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  )
}