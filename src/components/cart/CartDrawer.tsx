"use client";

import { useCart } from "@/context/CartContext";
import "./cart.css";

export default function CartDrawer() {
    const {
        cartItems,
        isOpen,
        closeCart,
        updateQuantity,
        removeFromCart,
        cartSubtotal,
    } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            {/* Backdrop Overlay */}
            <div
                className={`cart-backdrop ${isOpen ? "active" : ""}`}
                onClick={closeCart}
            />

            {/* Sidebar Drawer Container */}
            <div className={`cart-drawer-container ${isOpen ? "open" : ""}`}>
                {/* Header */}
                <div className="cart-drawer-header">
                    <span className="cart-drawer-title">
                        Shopping Bag <span className="cart-item-count">({cartItems.length})</span>
                    </span>
                    <button className="cart-close-btn" onClick={closeCart} aria-label="Close cart">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="cart-drawer-body">
                    {cartItems.length === 0 ? (
                        <div className="cart-empty-state">
                            <p className="cart-empty-message">Your shopping bag is empty</p>
                            <button className="cart-empty-shop-btn" onClick={closeCart}>
                                Continue Exploring
                            </button>
                        </div>
                    ) : (
                        <div className="cart-items-list">
                            {cartItems.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <div className="cart-item-img-wrap">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="cart-item-details">
                                        <div className="cart-item-header">
                                            <span className="cart-item-name">{item.name}</span>
                                            <button
                                                className="cart-item-remove-btn"
                                                onClick={() => removeFromCart(item.id)}
                                                aria-label="Remove item"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        {item.finish && (
                                            <span className="cart-item-finish">Finish: {item.finish}</span>
                                        )}
                                        <div className="cart-item-footer">
                                            <div className="cart-qty-selector">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    aria-label="Decrease quantity"
                                                >
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <line x1="5" y1="12" x2="19" y2="12" />
                                                    </svg>
                                                </button>
                                                <span className="cart-qty-val">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    aria-label="Increase quantity"
                                                >
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                        <line x1="12" y1="5" x2="12" y2="19" />
                                                        <line x1="5" y1="12" x2="19" y2="12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <span className="cart-item-price">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Checkout Panel */}
                {cartItems.length > 0 && (
                    <div className="cart-drawer-footer">
                        <div className="cart-summary-row">
                            <span className="cart-summary-label">Subtotal</span>
                            <span className="cart-summary-value">{formatPrice(cartSubtotal)}</span>
                        </div>
                        <p className="cart-tax-notice">
                            Taxes and shipping calculated at checkout.
                        </p>
                        <button
                            className="cart-checkout-btn"
                            onClick={() => {
                                closeCart();
                                window.location.href = "/checkout";
                            }}
                        >
                            Proceed to Checkout
                        </button>
                        <button className="cart-continue-btn" onClick={closeCart}>
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
