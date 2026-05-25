import { useEffect } from "react";

/**
 * Custom hook to trigger scroll fade-in animations on elements with class ".fu"
 * @param dependency Optional dependency to trigger re-observation (e.g. fetched products/categories list)
 */
export function useScrollAnimation(dependency?: any) {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px", // Trigger when 5% of the element is in viewport
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("vis");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeElements = () => {
      const targets = document.querySelectorAll(".fu:not(.vis)");
      targets.forEach((target) => {
        observer.observe(target);
      });
    };

    // Run observation immediately on mount/update
    observeElements();

    // Set a minor timeout to catch any elements delayed by React rendering pipeline
    const timeoutId = setTimeout(observeElements, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [dependency]);
}
