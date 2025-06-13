import { color } from "motion/react";
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			keyframes: {
				slide: {
					"0%": { width: "0",right: '-10px' },
					"60%": { width: "390px" }, // slight overshoot
					"100%": { width: "384px",right: '0px' }, // settle
				},
				slide_out: {
					"0%": { width: "384px",right: '0px' },
					"40%": { width: "390px",right: '-10px' }, // slight bump
					"100%": { width: "0",right: '-10px' },
				},
				fade_in: {
					"0%": { opacity: "0" },
					"100%": { opacity: ".2" },
				},
				fade_out: {
					"0%": { opacity: ".2" },
					"100%": { opacity: "0" },
				},
			},
			animation: {
				slide: "slide 0.3s ",
				slide_out: "slide_out 0.3s ",
				fade_in: "fade_in 0.3s ease-in-out",
				fade_out: "fade_out 0.3s ease-in-out",
			},
			colors: {
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)",
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
				},
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
				},
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				chart: {
					1: "hsl(var(--chart-1) / <alpha-value>)",
					2: "hsl(var(--chart-2) / <alpha-value>)",
					3: "hsl(var(--chart-3) / <alpha-value>)",
					4: "hsl(var(--chart-4) / <alpha-value>)",
					5: "hsl(var(--chart-5) / <alpha-value>)",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("tailwindcss-motion")],
};

export default config;
