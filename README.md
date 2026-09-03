# Whatbytes E-Commerce Assignment

A polished, responsive e-commerce frontend built with Next.js, TypeScript, and Tailwind CSS.

## Live Demo
[Live Demo](https://whatbytesfrontendassignment.vercel.app)

## Features
- **Product Listing:** Responsive grid layout for products.
- **Search & Filtering:** Real-time search by title/description and URL-synced category & price filtering.
- **Dynamic Product Pages:** Detailed view for each product (`/product/[id]`).
- **Cart Functionality:** Client-side state management using React Context + `useReducer`.
- **Persistent Cart:** Safe `localStorage` hydration without Next.js SSR mismatch errors.
- **Responsive Design:** Optimized for Mobile, Tablet, and Desktop screens.
- **Empty States:** Graceful handling of empty cart and invalid product IDs.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Icons:** lucide-react
- **State Management:** React Context API + `useReducer`

## Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build

To create an optimized production build, run:
```bash
npm run build
```

## Project Structure

- `src/app`: Next.js App Router pages (`layout.tsx`, `page.tsx`, `cart/page.tsx`, `product/[id]/page.tsx`).
- `src/components/layout`: Global layout components like `Header` and `Footer`.
- `src/components/products`: Product-specific components (Grid, Cards, Filters, Client-side interactions).
- `src/context`: Cart state management via React Context (`CartContext.tsx`).
- `src/data`: Mock product data (`products.ts`).
- `src/lib`: Helper functions like URL filtering logic (`filterProducts.ts`).
- `src/types`: TypeScript interfaces for products and cart state.

## Design Decisions

- **State Management:** Used `useReducer` with Context API as requested. It is lightweight, avoids unnecessary third-party dependencies like Zustand for simple global states, and demonstrates strong React fundamentals.
- **Cart Persistence:** Implemented a two-pass render (hydration) in `CartContext` to safely load from `localStorage` without triggering Next.js hydration mismatch errors on the initial server render.
- **Filtering & Search:** Synced directly with URL search parameters (`?category=x&price=y`). This ensures filters are shareable, persistent across reloads, and play nicely with browser history.
- **Product Data:** Used high-quality stable image URLs from Unsplash instead of colored placeholders to achieve a realistic, polished e-commerce feel matching the reference design.
- **Styling:** Matched the reference design's deep blue primary color scheme (`#0a4687`) and structural proportions using Tailwind CSS utility classes.
