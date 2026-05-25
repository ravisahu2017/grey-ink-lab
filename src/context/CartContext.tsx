"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
    id: string; // Unique combination of ID + finish (e.g. "prod1-Raw Concrete")
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    finish: string;
    slug: string;
}

interface CartContextType {
    cartItems: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addToCart: (item: Omit<CartItem, "quantity" | "id">, qty?: number) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartSubtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load cart from localStorage on mount safely
    useEffect(() => {
        const storedCart = localStorage.getItem("gil_cart");
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (e) {
                console.error("Failed to parse cart items", e);
            }
        }
    }, []);

    // Helper to update both state and localStorage
    const saveCart = (items: CartItem[]) => {
        setCartItems(items);
        localStorage.setItem("gil_cart", JSON.stringify(items));
    };

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const addToCart = (newItem: Omit<CartItem, "quantity" | "id">, qty = 1) => {
        const itemId = `${newItem.productId}-${newItem.finish}`;
        const existingItemIndex = cartItems.findIndex((item) => item.id === itemId);

        if (existingItemIndex > -1) {
            const updatedItems = [...cartItems];
            updatedItems[existingItemIndex].quantity += qty;
            saveCart(updatedItems);
        } else {
            saveCart([...cartItems, { ...newItem, id: itemId, quantity: qty }]);
        }
        openCart(); // Auto-open cart sidebar drawer when an item is added
    };

    const removeFromCart = (id: string) => {
        const updatedItems = cartItems.filter((item) => item.id !== id);
        saveCart(updatedItems);
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        const updatedItems = cartItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
        );
        saveCart(updatedItems);
    };

    const clearCart = () => {
        saveCart([]);
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isOpen,
                openCart,
                closeCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartCount,
                cartSubtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
