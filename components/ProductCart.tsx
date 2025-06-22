"use client";
import React, { FC, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShoppingCart, X, Trash2Icon } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { Product } from "@/types/product";
import { motion, useAnimation } from "framer-motion";
import { CartItem } from "./CartItem";
import { toast } from "sonner";

interface ProductCartProps {
	className?: string;
	children: React.ReactNode;
}

export const ProductCart: FC<ProductCartProps> = ({ className, children }) => {
	const [isCartOpen, setCartOpen] = React.useState(false);
	const [isLoaded, setIsLoaded] = React.useState(false);

	const [value, setValue, removeValue] = useLocalStorage<
		{ product: Product; count: number }[]
	>("cart", []);
	const controls = useAnimation();

	const toggleCart = () => {
		if (!isLoaded) {
			setIsLoaded(true);
		}
		setCartOpen((prev) => !prev);
	};

	useEffect(() => {
		// Play animation when the cart value changes
		controls.start({
			scale: [1, 1.3, 1],
			rotate: [0, 10, -10, 0],
			transition: { duration: 0.5, repeat: 1 },
		});
	}, [value, controls]);

	const handleQuantityChange = (productId: number, newCount: number) => {
		const cart = value || [];
		const index = cart.findIndex((c) => c.product.id === productId);
		if (index > -1) {
			if (newCount > 0 && newCount < 99) {
				cart[index].count = newCount;
			} else if( newCount >= 99) {
				cart[index].count = 99;
				toast.error('Maximum quantity is 99',{duration: 1000});
			}
			// else if (newCount >1) {
			// 	cart[index].count = 1;
			// } 
			else {
				cart.splice(index, 1);
			}
			
			setValue(cart);
		}
	};

	// const handleInputChange = (productId: number, newCount: number) => {
	// 	const cart = value || [];
	// 	const index = cart.findIndex((c) => c.product.id === productId);

	// 	if (index > -1) {
	// 		cart[index].count = newCount;
	// 		setValue(cart);
	// 	}
	// };

	return (
		<div className={cn("flex overflow-x-hidden", className)}>
			<div className="flex-1 overflow-y-auto h-auto">{children}</div>
			<div>
				<button
					onClick={toggleCart}
					className="z-50 cursor-pointer fixed bottom-4 right-4 p-4 bg-white rounded-full shadow-xl hover:bg-gray-100 transition-colors border"
				>
					{!isCartOpen ? (
						<div className="">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: value?.length !== 0 ? 1 : 0,
                  scale: value?.length !== 0 ? 1 : 0.8,
                }}
                transition={{ duration: 0.1, type: "spring", stiffness: 300 }}
                className="fixed right-2 bottom-16 bg-white p-1 px-2 rounded-full shadow-xl"
              >
                {value?.length !== 0 && (
                  <span >
                    {value
                      .reduce((total, item) => total + item.count, 0)
                      .toFixed(0)}
                  </span>
                )}
              </motion.div>
							<motion.div className="" animate={controls}>
								<ShoppingCart className="w-6 h-6 text-gray-800 " />
							</motion.div>
						</div>
					) : (
						<X className="w-6 h-6 text-gray-800 motion-preset-confetti " />
					)}
				</button>
				<div
					className={cn(
						"fixed top-0 -right-10  h-dvh bg-white shadow-xl p-4 z-40 overflow-hidden  ",
						isCartOpen
							? "  animate-slide w-96 right-0"
							: isLoaded
							? "  animate-slide_out w-0"
							: "w-0",
					)}
				>
					<h2 className="text-2xl font-bold mb-4 text-gray-800">Cart</h2>
					<ul className="py-5 max-h-[80%] overflow-y-auto overflow-x-hidden">
						{value?.length === 0 ? (
							<div className="animate-pulse flex space-x-4">
								<div className="flex-1 space-y-4 py-1 font-bold text-center text-3xl">
									Empty
									<div className="h-4 bg-gray-200 rounded w-3/4"></div>
									<div className="space-y-2">
										<div className="h-4 bg-gray-200 rounded"></div>
										<div className="h-4 bg-gray-200 rounded w-5/6"></div>
									</div>
								</div>
							</div>
						) : (
							value?.map((p) => (<motion.li
                key={p.product.id} 
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                >
								{/* <li
									key={p.product.id}
									className="flex justify-between items-center mb-2 border-b"
								>
									<div className="flex items-center gap-1">
										<div className="border-r-2 border-gray-600 pr-2 flex gap-1">
											<button
												onClick={() =>
													handleQuantityChange(p.product.id, p.count + 1)
												}
												className="flex justify-center items-center w-6 h-6 text-gray-800 cursor-pointer bg-gray-200 rounded-sm hover:bg-gray-300 transition-colors"
											>
												<Plus size={16} />
											</button>
											<button
												onClick={() =>
													handleQuantityChange(p.product.id, p.count - 1)
												}
												className="flex justify-center items-center w-6 h-6 text-gray-800 cursor-pointer bg-gray-200 rounded-sm hover:bg-gray-300 transition-colors"
											>
												<Minus size={16} />
											</button>
										</div>
										<div className="">
											<p className="text-gray-800">{p.product.name} </p>
											<span className="text-sm text-gray-500">
												{p.product.price}$
											</span>
										</div>
									</div>
									<p className="text-gray-800 flex gap-1">
										<input
											type="number"
											value={p.count}
											onChange={(e) =>
												handleInputChange(
													p.product.id,
													parseInt(e.target.value, 10),
												)
											}
											className="w-12 text-center border-b"
										/>
										<span className="text-sm text-gray-500">
											{(p.product.price * p.count).toFixed(2)}$
										</span>
									</p>
								</li> */}
                <CartItem item={p} onQuantityChange={handleQuantityChange} />
                </motion.li>
							))
						)}
					</ul>
					<div className=" bottom-0 w-full bg-white z-[10] ">
						{value?.length !== 0 && (
							//  (
							// 	<div className="text-gray-800">Cart is empty</div>
							// ) :
							<>
								<div className="text-gray-800 my-2">
									Total:{" "}
									<span className="font-bold text-lg">
										{value
											.reduce(
												(total, item) =>
													total + item.product.price * item.count,
												0,
											)
											.toFixed(2)}
										$
									</span>
								</div>
								<div>
									<button
										className="mt-4 w-1/2 py-2 px-4 rounded-md bg-pink-500 text-white font-semibold shadow hover:bg-pink-600 transition-colors  flex items-center justify-center "
										onClick={removeValue}
									>
										<span className="">Clear all</span>
										<Trash2Icon strokeWidth={1.25} className="ml-2 " />
									</button>
								</div>
							</>
						)}
					</div>
				</div>

				<div
					className={cn(
						"hidden sm:block",
						"top-0 right-0  h-screen bg-white shadow-xl transition-transform duration-200 ",
						isCartOpen
							? "animate-slide w-96"
							: isLoaded
							? "  animate-slide_out w-0"
							: "w-0",
					)}
					onClick={toggleCart}
				/>
				{isLoaded && (
					<div
						className={cn(
							"sm:hidden fixed inset-0 w-full h-dvh bg-black/30 backdrop-blur-sm z-30 ",
							isCartOpen ? "animate-fade_in  " : "animate-fade_out  hidden",
						)}
						aria-hidden={!isCartOpen}
						onClick={toggleCart}
					/>
				)}
			</div>
		</div>
	);
};
