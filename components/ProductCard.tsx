import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { createApi } from "unsplash-js"
import type { Product } from "@/types/product"
import { AddToCartButton } from "./addToCart"

const unsplash = createApi({
  accessKey: "3L_ey_a9r-9tf9se_sTMpMrfYcz0qjWnzLaHY5s9urA",
})

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

const imageCache: { [key: string]: string } = {}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [imageUrl, setImageUrl] = useState("/placeholder.png")
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true

    if (imageCache[product.name]) {
      setImageUrl(imageCache[product.name])
    } else {
      unsplash.search.getPhotos({ query: product.name, perPage: 1 })
        .then(result => {
          if (result.response && result.response.results.length > 0) {
            const url = result.response.results[0].urls.small
            imageCache[product.name] = url
            if (isMounted.current) {
              setImageUrl(url)
            }
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setImageUrl("/placeholder.png")
          }
        })
    }

    return () => {
      isMounted.current = false
    }
  }, [product.name])

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()
    e.preventDefault()
    onAddToCart(product)
  }

  return (
    <div className="relative border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group">
      <Link href={`/product/${product.id}`} key={product.id}>
        <Image
          src={imageUrl}
          alt={product.name}
          width={500}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="px-4 pt-4 relative">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            {/* <button
              onClick={handleAddToCartClick}
              className="rounded bg-gray-400 text-white p-2 hover:bg-gray-500 transition duration-300"
            >
              Add to Cart
            </button> */}
            <AddToCartButton product={product} />
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