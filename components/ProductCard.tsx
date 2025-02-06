import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    onAddToCart(product)
  }

  return (
    <div className="relative border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <Link href={`/product/${product.id}`} key={product.id}>
        <Image
          src="/placeholder.png"
          alt={product.name}
          width={500}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="px-4 pt-4 relative">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <button
              onClick={handleAddToCartClick}
              className="rounded bg-gray-400 text-white p-2 hover:bg-gray-500 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
          <p className="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
        </div>
        <div className="px-4 pb-4 relative">
          <p className="text-sm text-gray-500 mb-4">{product.category}</p>
          <div className="absolute inset-0 bg-white bg-opacity-90 p-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}