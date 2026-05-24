"use client";

import { useEffect } from "react";

export default function ScrollObserver() {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -50px 0px", // Trigger when element is slightly inside the viewport
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

        const observeNewElements = () => {
            const targets = document.querySelectorAll(".fu:not(.vis)");
            targets.forEach((target) => {
                observer.observe(target);
            });
        };

        // Run initially
        observeNewElements();

        // Use MutationObserver to watch for dynamic DOM updates (like fetched API products)
        const mutationObserver = new MutationObserver((mutations) => {
            let shouldCheck = false;
            for (const mutation of mutations) {
                if (mutation.addedNodes.length > 0) {
                    shouldCheck = true;
                    break;
                }
            }
            if (shouldCheck) {
                observeNewElements();
            }
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return null;
}
