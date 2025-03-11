"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "usehooks-ts";
import { Product } from "@/types/product";
import { Minus, Plus } from "lucide-react";

interface AddToCartProps {
  className?: string;
  product: Product;
}

export const AddToCartButton: FC<AddToCartProps> = ({ className, product }) => {
  const [value, setValue] = useLocalStorage<
    { product: Product; count: number }[]
  >("cart", []);
  const [existingProduct, setExistingProduct] = useState<{ product: Product; count: number } | undefined>(undefined);

  useEffect(() => {
    const productInCart = value.find((p) => p.product.id === product.id);
    setExistingProduct(productInCart);
  }, [value, product]);

  const handleQuantityChange = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      productId: number,
      newCount: number
    ) => {
      e.stopPropagation();
      e.preventDefault();
      const cart = value || [];
      const index = cart.findIndex((c) => c.product.id === productId);

      if (index > -1) {
        if (newCount > 0) {
          cart[index].count = newCount;
        } else {
          cart.splice(index, 1);
        }
      } else if (newCount > 0) {
        cart.push({ product, count: newCount });
      }
      setValue([...cart]);
    },
    [value, setValue, product]
  );

  return (
    <div className={cn("", className)}>
      {!existingProduct ? (
        <button
          onClick={(e) => handleQuantityChange(e, product.id, 1)}
          className="rounded bg-gray-400 text-white p-2 hover:bg-gray-500 transition duration-300"
        >
          Add to cart
        </button>
      ) : (
        <div className="flex items-center gap-2 text-2xl fade-in-0 p-1">
          <button
            onClick={(e) => handleQuantityChange(e, product.id, existingProduct.count + 1)}
            className=" flex justify-center items-center w-8 h-8 text-gray-800 cursor-pointer bg-gray-200 rounded-sm hover:bg-gray-300 transition-colors"
          >
            <Plus size={20} />
          </button>
          <div className="text-gray-800">{existingProduct.count}</div>
          <button
            onClick={(e) => handleQuantityChange(e, product.id, existingProduct.count - 1)}
            className=" flex justify-center items-center w-8 h-8 text-gray-800 cursor-pointer bg-gray-200 rounded-sm hover:bg-gray-300 transition-colors"
          >
            <Minus size={20} />
          </button>
        </div>
      )}
    </div>
  );
};