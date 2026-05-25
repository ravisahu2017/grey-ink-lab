"use client";

import "@/app/globals.css";
import { useCart } from "@/context/CartContext";

export default function NavBar() {
    const { openCart, cartCount } = useCart();

    return (
        <nav>
            <div className="nav-l">
                <a href="/catalogue/collectibles">Shop</a>
                <a href="#">Story</a>
                <a href="#">Experiences</a>
                <a href="#">Contact</a>
            </div>
            <a href="/" className="nav-logo">Grey<br></br>Ink<br></br>Lab</a>
            <div className="nav-r">
                <a href="#">
                    <svg className="nav-ico" viewBox="0 0 24 24">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                </a>
                <a href="#">
                    <svg className="nav-ico" viewBox="0 0 24 24">
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <line x1="15.5" y1="15.5" x2="22" y2="22" strokeLinecap="round" />
                    </svg>
                </a>
                <a href="#" onClick={(e) => { e.preventDefault(); openCart(); }} className="nav-cart-link">
                    <svg className="nav-ico" viewBox="0 0 24 24">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    {cartCount > 0 && <span className="nav-cart-count">{cartCount}</span>}
                </a>
            </div>
        </nav>
    );
}   