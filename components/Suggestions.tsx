import Link from "next/link"
import ProductCard from "@/components/ProductCard"
import type { Product } from "@/types/product"
import { useLocalStorage } from "usehooks-ts";

interface SuggestionsProps {
  suggestions: Product[]
}

export default function Suggestions({ suggestions }: SuggestionsProps) {
  const [value, setValue, removeValue] = useLocalStorage<{product:Product,count:number}[]>("cart", []);
  const handleAddToCart = (product: Product) => {
    // Implement your add to cart logic here
    console.log("Added to cart:", product)

    const cart = value || [];
    const existingProduct = cart.find((p) => p.product.id === product.id);
    if (existingProduct) {
      existingProduct.count += 1;
    } else {
      cart.push({ product, count: 1 });
    }
    setValue(cart);

  }
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-gray-800">You might also like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4">
        {suggestions.map((suggestion) => (
            <ProductCard onAddToCart={handleAddToCart} product={suggestion} key={suggestion.id}/>
        ))}
      </div>
    </div>
  )
}