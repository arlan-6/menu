import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProductCart } from "@/components/ProductCart";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from 'sonner'
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Menu app",
	description: "A modern menu application for browsing and ordering products.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Analytics />
				<Toaster richColors  visibleToasts={1}/>
				<ProductCart>{children}</ProductCart>
			</body>
		</html>
	);
}
