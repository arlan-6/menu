"use client";
import React, { FC, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { Product } from "@/types/product";
import { motion, useAnimation } from "framer-motion";

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
			if (newCount > 0) {
				cart[index].count = newCount;
			} else {
				cart.splice(index, 1);
			}
			setValue(cart);
		}
	};

	const handleInputChange = (productId: number, newCount: number) => {
		const cart = value || [];
		const index = cart.findIndex((c) => c.product.id === productId);

		if (index > -1) {
			cart[index].count = newCount;
			setValue(cart);
		}
	};

	return (
		<div className={cn("flex overflow-x-hidden", className)}>
			<div className="flex-1 overflow-y-auto h-auto">{children}</div>
			<div>
				<button
					onClick={toggleCart}
					className="z-50 cursor-pointer fixed bottom-4 right-4 p-4 bg-white rounded-full shadow-xl hover:bg-gray-100 transition-colors border"
				>
					{!isCartOpen ? (
						<motion.div className="" animate={controls}>
							<ShoppingCart className="w-6 h-6 text-gray-800 " />
						</motion.div>
					) : (
						<X className="w-6 h-6 text-gray-800 motion-preset-confetti " />
					)}
				</button>
				<div
					className={cn(
						"fixed top-0 -right-10 h-screen bg-white shadow-xl p-4 z-40 overflow-auto  ",
						isCartOpen
							? "  animate-slide w-80 right-0"
							: isLoaded
							? "  animate-slide_out w-0"
							: "w-0",
					)}
				>
					<h2 className="text-2xl font-bold mb-4 text-gray-800">Cart</h2>
					<ul className="pb-40">
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
							value?.map((p) => (
								<li
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
								</li>
							))
						)}
					</ul>
					<div className="fixed bottom-0 w-80 p-4 bg-white z-[10] ">
						{value?.length === 0 ? (
							<div className="text-gray-800">Cart is empty</div>
						) : (
							<>
								<div className="text-gray-800">
									Total:{" "}
									{value
										.reduce(
											(total, item) => total + item.product.price * item.count,
											0,
										)
										.toFixed(2)}
									$
								</div>
								<div className="underline cursor-pointer" onClick={removeValue}>
									Clear all
								</div>
							</>
						)}
					</div>
				</div>

				<div
					className={cn(
						"top-0 right-0  h-screen bg-white shadow-xl transition-transform duration-200 ",
						isCartOpen
							? "animate-slide w-80"
							: isLoaded
							? "  animate-slide_out w-0"
							: "w-0",
					)}
					onClick={toggleCart}
				/>
			</div>
		</div>
	);
};
