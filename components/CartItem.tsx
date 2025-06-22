"use client";
import React, { memo } from "react";
import { Product } from "@/types/product";
import { Plus, Minus } from "lucide-react";

interface CartItemProps {
  item: { product: Product; count: number };
  onQuantityChange: (productId: number, newCount: number) => void;
  onRemove?: (productId: number) => void;
}

// Using React.memo to prevent re-renders if props don't change
export const CartItem: React.FC<CartItemProps> = memo(({ item, onQuantityChange}) => {
  const { product, count } = item;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCount = parseInt(e.target.value, 10);
    // Basic validation: If it's not a number or less than 1, don't update (or default to 1)
    if (!isNaN(newCount) && newCount >= 1 && newCount <= 99) {
      onQuantityChange(product.id, newCount);
    }else if (newCount >= 99){
      onQuantityChange(product.id, 99);
    }
  };

  return (
    <div className="flex items-center  gap-2 py-3 border-b border-gray-200">
      {/* Optional: Add an image */}
      {/* <img src={product.imageUrl} alt={product.name} className="w-16 h-16 rounded-md object-cover" /> */}
      
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{product.name}</p>
        <span className="text-sm text-gray-500">${product.price.toFixed(2)}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onQuantityChange(product.id, count - 1)}
          aria-label={`Decrease quantity of ${product.name}`}
          className="p-1 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          value={count}
          max={99}
          onChange={handleInputChange}
          className="w-12 text-center border rounded-md"
          aria-label={`Quantity for ${product.name}`}
        />
        <button
          onClick={() => onQuantityChange(product.id, count + 1)}
          aria-label={`Increase quantity of ${product.name}`}
          className="p-1 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="text-right w-20">
        <p className="font-semibold">${(product.price * count).toFixed(2)}</p>
      </div>

      {/* <button
        onClick={() => onRemove(product.id)}
        aria-label={`Remove ${product.name} from cart`}
        className="text-red-500 hover:text-red-700 transition-colors"
      >
        <Trash2 size={20} />
      </button> */}
    </div>
  );
});

// It's good practice to set a displayName for components wrapped in memo
CartItem.displayName = 'CartItem';