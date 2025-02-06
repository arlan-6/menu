"use client"
import React, { FC, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ShoppingCart, X } from "lucide-react"
import { useLocalStorage } from "usehooks-ts"
import { Product } from "@/types/product"
import { motion, useAnimation } from "framer-motion"

interface ProductCartProps {
  className?: string
  children: React.ReactNode
}

export const ProductCart: FC<ProductCartProps> = ({ className, children }) => {
  const [isCartOpen, setCartOpen] = React.useState(false)
  const [value, setValue, removeValue] = useLocalStorage<{ product: Product; count: number }[]>("cart", [])
  const controls = useAnimation()

  const toggleCart = () => {
    setCartOpen((prev) => !prev)
  }

  useEffect(() => {
    // Play animation when the cart value changes
    controls.start({
      scale: [1, 1.3, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5, repeat: 1 },
    })
  }, [value, controls])

  return (
    <div className={cn("flex overflow-x-hidden", className)}>
      <div className="flex-1">{children}</div>
      <div>
        <button
          onClick={toggleCart}
          className="z-50 cursor-pointer fixed bottom-4 right-4 p-4 bg-white rounded-full shadow-xl hover:bg-gray-100 transition-colors border"
        >
          {!isCartOpen ? (
            <motion.div className="" animate={controls}>
              <ShoppingCart className="w-6 h-6 text-gray-800" />
            </motion.div>
          ) : (
            <X className="w-6 h-6 text-gray-800" />
          )}
        </button>
        {isCartOpen && (
          <>
            <div
              
              className="animate-[slide_0.2s] fixed top-0 right-0 w-80 h-screen bg-white shadow-xl p-4 z-40"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart</h2>
              <ul>
                {value?.map((p) => (
                  <li key={p.product.id} className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          const cart = value || []
                          const index = cart.findIndex((c) => c.product.id === p.product.id)
                          if (index > -1) {
                            if (cart[index].count > 1) {
                              cart[index].count -= 1
                            } else {
                              cart.splice(index, 1)
                            }
                            setValue(cart)
                          }
                        }}
                        className="w-6 h-6 text-gray-800 cursor-pointer"
                      >
                        -
                      </button>
                      <p className="text-gray-800">{p.product.name}</p>
                      <button
                        onClick={() => {
                          const cart = value || []
                          const index = cart.findIndex((c) => c.product.id === p.product.id)
                          if (index > -1) {
                            cart[index].count += 1
                            setValue(cart)
                          }
                        }}
                        className="w-6 h-6 text-gray-800 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-gray-800">{p.count}</p>
                  </li>
                ))}
              </ul>
              {value?.length === 0 ? (
                <div className="text-gray-800">Cart is empty</div>
              ) : (
                <>
                  <div className="text-gray-800">
                    Price: {value.reduce((total, item) => total + item.product.price * item.count, 0).toFixed(2)}$
                  </div>
                  <div className="underline cursor-pointer" onClick={removeValue}>
                    Clear all
                  </div>
                </>
              )}
            </div>
            <div
              
              className="animate-[slide_0.2s] top-0 right-0 w-80 h-screen bg-red-700 shadow-xl p-4 z-30"
              onClick={toggleCart}
            />
          </>
        )}
      </div>
    </div>
  )
}