"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import productController from "@/controllers/productController";

interface Category {
  id: number;
  name: string;
  slug: string;
  image?: { src: string };
  count: number;
}

interface CategoryContextType {
  categories: Category[];
  isLoading: boolean;
  getCategoryIdBySlug: (slug: string) => number | undefined;
  getCategoryBySlug: (slug: string) => Category | undefined;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await productController.getCategories();
        if (Array.isArray(data)) {
          const filtered = data.filter((cat: any) => cat.slug !== "uncategorized");
          setCategories(filtered);
        }
      } catch (error) {
        console.error("Error loading categories in CategoryProvider:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryIdBySlug = (slug: string) => {
    return categories.find((cat) => cat.slug === slug)?.id;
  };

  const getCategoryBySlug = (slug: string) => {
    return categories.find((cat) => cat.slug === slug);
  };

  return (
    <CategoryContext.Provider value={{ categories, isLoading, getCategoryIdBySlug, getCategoryBySlug }}>
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}
