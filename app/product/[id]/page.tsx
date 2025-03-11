"use client";

import { useState, useEffect } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import Suggestions from "@/components/Suggestions";
import type { Product } from "@/types/product";
import { ArrowLeft } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { getProductById, getProductsByCategory } from "@/lib/data";
import { createApi } from "unsplash-js";
import { AddToCartButton } from "@/components/addToCart";

const unsplash = createApi({
  accessKey: "3L_ey_a9r-9tf9se_sTMpMrfYcz0qjWnzLaHY5s9urA",
});

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("/placeholder.png");

  useEffect(() => {
    if (!params || !params.id) {
      notFound();
      return;
    }

    async function fetchData() {
      try {
        const productId = Array.isArray(params.id) ? parseInt(params.id[0], 10) : parseInt(params.id as string, 10);
        const productData = getProductById(productId);
        if (productData) {
          setProduct(productData);
          const suggestionsData = getProductsByCategory(productData.category);
          setSuggestions(suggestionsData.filter((s) => s.id !== productData.id));

          // Fetch image from Unsplash
          const result = await unsplash.search.getPhotos({ query: productData.name, perPage: 1 });
          if (result.response && result.response.results.length > 0) {
            setImageUrl(result.response.results[0].urls.small);
          }
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load product data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params]);

  const [value, setValue] = useLocalStorage<
    { product: Product; count: number }[]
  >("cart", []);
  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product);
    console.log(" cart:", value);

    const cart = value || [];
    const existingProduct = cart.find((p) => p.product.id === product.id);
    if (existingProduct) {
      existingProduct.count += 1;
    } else {
      cart.push({ product, count: 1 });
    }
    setValue(cart);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {product && (
        <div className="flex flex-col md:flex-row items-center md:items-start bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={imageUrl}
              alt={product.name}
              width={900}
              height={800}

              className="w-auto h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-6 md:pl-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {product.name}
            </h1>
            <p className="text-2xl text-gray-700 mb-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-md text-gray-500 mb-4 uppercase tracking-wide">
              {product.category}
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            {/* <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 rounded bg-gray-400 text-white p-2 hover:bg-gray-500 transition duration-300"
            >
              Add to Cart
            </button> */}
            <AddToCartButton className="p-2" product={product} />
          </div>
          <button
            onClick={() => router.push("/")}
            className="flex gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />{" "}
            Home
          </button>
        </div>
      )}
      <Suggestions suggestions={suggestions} />
    </div>
  );
}