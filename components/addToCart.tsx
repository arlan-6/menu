"use client";
import React, { FC, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "usehooks-ts";
import { Product } from "@/types/product";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface AddToCartProps {
  className?: string;
  product: Product;
}

export const AddToCartButton: FC<AddToCartProps> = ({ className, product }) => {
  const [cartItems, setCartItems] = useLocalStorage<
    { product: Product; count: number }[]
  >("cart", []);

  // 1. SIMPLIFIED STATE: Derive existingProduct directly from props/state.
  // useMemo prevents re-calculating this on every render unless cartItems or product.id changes.
  const existingProduct = useMemo(
    () => cartItems.find((item) => item.product.id === product.id),
    [cartItems, product.id]
  );

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    // 2. IMMUTABLE UPDATE: Create a new array with the new item.
    setCartItems([...cartItems, { product, count: 1 }]);
  };

  const handleQuantityChange = (e: React.MouseEvent<HTMLButtonElement>, newCount: number) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (newCount > 0 && newCount < 99) {
      // 2. IMMUTABLE UPDATE: Create a new array using .map()
      const updatedCart = cartItems.map((item) =>
        item.product.id === product.id ? { ...item, count: newCount } : item
      );
      setCartItems(updatedCart);
    } else if( newCount >= 99) {
      const updatedCart = cartItems.map((item) =>
        item.product.id === product.id ? { ...item, count: 99 } : item
      );
      setCartItems(updatedCart);
				toast.error('Maximum quantity is 99',{duration: 1000});
			}else {
      // 2. IMMUTABLE UPDATE: Create a new array using .filter()
      const updatedCart = cartItems.filter(
        (item) => item.product.id !== product.id
      );
      setCartItems(updatedCart);
    }
  };

  return (
    <div className={cn("flex items-start justify-center h-10", className)}>
      {!existingProduct ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0 }}
          whileHover={{ scale: 1.05 }}
        
          onClick={handleAddToCart}
          aria-label={`Add ${product.name} to cart`}
          // UI IMPROVEMENT: Using a stronger, primary color for the CTA
          className="px-4 py-2 w-full rounded-md bg-pink-500 text-white font-semibold shadow-sm hover:bg-pink-600 transition-all duration-200"
        >
          Add to cart
        </motion.button>
      ) : (
        // UI IMPROVEMENT: Consistent styling and intuitive [-] [4] [+] layout
        <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        
        className="flex gap-4 items-center justify-between w-full p-1 border border-gray-300 rounded-md max-w-40">
          <button
            onClick={(e) => handleQuantityChange(e, existingProduct.count - 1)}
            // 3. ACCESSIBILITY & UX IMPROVEMENT
            aria-label={`Remove one ${product.name} from cart`}
            className="p-1 text-gray-700 rounded-sm hover:bg-gray-200 transition-colors"
          >
            {/* UX IMPROVEMENT: Show trash icon when count is 1 */}
            {existingProduct.count === 1 ? <Trash2 size={20} className="text-red-500" /> : <Minus size={20} />}
          </button>
          
            <motion.div
            key={existingProduct.count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            // transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-bold text-lg text-gray-800"
            aria-live="polite"
            >
            {existingProduct.count}
            </motion.div>

          <button
            onClick={(e) => handleQuantityChange(e, existingProduct.count + 1)}
            // 3. ACCESSIBILITY
            aria-label={`Add one more ${product.name} to cart`}
            className="p-1 text-gray-700 rounded-sm hover:bg-gray-200 transition-colors"
          >
            <Plus size={20} />
          </button>
        </motion.div>
      )}
    </div>
  );
};