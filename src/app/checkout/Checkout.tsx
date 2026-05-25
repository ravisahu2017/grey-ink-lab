"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import OrderController from "@/controllers/orderController";
import "./checkout.css";

export default function Checkout() {
    const { cartItems, cartSubtotal, clearCart } = useCart();
    useScrollAnimation(cartItems);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        postcode: "",
        country: "IN",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setIsLoading(true);
        try {
            // Map cart items into WooCommerce line_items payload format
            const lineItems = cartItems.map((item) => ({
                product_id: parseInt(item.productId),
                quantity: item.quantity,
                meta_data: item.finish ? [{ key: "Finish", value: item.finish }] : [],
            }));

            // Prepare order payload for guest checkout
            const orderPayload = {
                payment_method: "cod",
                payment_method_title: "Cash on Delivery",
                set_paid: false,
                billing: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    address_1: formData.address1,
                    address_2: formData.address2,
                    city: formData.city,
                    state: formData.state,
                    postcode: formData.postcode,
                    country: formData.country,
                    email: formData.email,
                    phone: formData.phone,
                },
                shipping: {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    address_1: formData.address1,
                    address_2: formData.address2,
                    city: formData.city,
                    state: formData.state,
                    postcode: formData.postcode,
                    country: formData.country,
                },
                line_items: lineItems,
            };

            const order = await OrderController.createOrder(orderPayload);

            // Store order key in local storage to allow guest user to retrieve order history
            const existingOrders = JSON.parse(localStorage.getItem("gil_orders") || "[]");
            const newOrderRecord = {
                id: order.id,
                email: formData.email,
                date: new Date().toLocaleDateString(),
                total: order.total,
                status: order.status,
                items: cartItems.map(item => ({ name: item.name, quantity: item.quantity, finish: item.finish })),
            };
            localStorage.setItem("gil_orders", JSON.stringify([newOrderRecord, ...existingOrders]));

            // Clear active cart items
            clearCart();

            // Redirect to orders success page
            window.location.href = `/my-orders?id=${order.id}`;
        } catch (error: any) {
            console.error("Checkout failed:", error);
            alert(`Checkout failed: ${error.message || "Please check your connection and try again."}`);
        } finally {
            setIsLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-empty fu">
                <h2 className="chk-empty-title">Your shopping bag is empty</h2>
                <button className="btn-chk-back" onClick={() => window.location.href = "/catalogue/collectibles"}>
                    Return to Catalogue
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-page fu">
            <div className="checkout-grid">
                {/* Form fields */}
                <form className="checkout-form-section" onSubmit={handleSubmit}>
                    <div>
                        <h2 className="checkout-form-title">Contact Information</h2>
                        <div className="form-group-row" style={{ marginTop: "24px" }}>
                            <div className="input-field-wrap">
                                <label className="input-label">Email address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="checkout-input"
                                    placeholder="email@example.com"
                                />
                            </div>
                            <div className="input-field-wrap">
                                <label className="input-label">Phone number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="checkout-input"
                                    placeholder="98765 43210"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="checkout-form-title">Shipping Address</h2>
                        <div className="form-group-row" style={{ marginTop: "24px" }}>
                            <div className="input-field-wrap">
                                <label className="input-label">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="checkout-input"
                                />
                            </div>
                            <div className="input-field-wrap">
                                <label className="input-label">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    required
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="checkout-input"
                                />
                            </div>
                        </div>

                        <div className="input-field-wrap">
                            <label className="input-label">Address Line 1 *</label>
                            <input
                                type="text"
                                name="address1"
                                required
                                value={formData.address1}
                                onChange={handleInputChange}
                                className="checkout-input"
                                placeholder="House / Flat No., Building Name, Street"
                            />
                        </div>

                        <div className="input-field-wrap">
                            <label className="input-label">Address Line 2 (Optional)</label>
                            <input
                                type="text"
                                name="address2"
                                value={formData.address2}
                                onChange={handleInputChange}
                                className="checkout-input"
                                placeholder="Landmark, Area, Colony"
                            />
                        </div>

                        <div className="form-group-row">
                            <div className="input-field-wrap">
                                <label className="input-label">City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="checkout-input"
                                />
                            </div>
                            <div className="input-field-wrap">
                                <label className="input-label">State *</label>
                                <input
                                    type="text"
                                    name="state"
                                    required
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="checkout-input"
                                    placeholder="e.g. Delhi, Maharashtra"
                                />
                            </div>
                        </div>

                        <div className="form-group-row">
                            <div className="input-field-wrap">
                                <label className="input-label">PIN Code *</label>
                                <input
                                    type="text"
                                    name="postcode"
                                    required
                                    value={formData.postcode}
                                    onChange={handleInputChange}
                                    className="checkout-input"
                                    placeholder="110001"
                                />
                            </div>
                            <div className="input-field-wrap">
                                <label className="input-label">Country *</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="checkout-input"
                                >
                                    <option value="IN">India</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn-place-order"
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Place Order & Pay"}
                    </button>
                </form>

                {/* Right panel summary */}
                <div className="checkout-summary-section">
                    <h2 className="summary-title">Order Summary</h2>
                    <div className="summary-items">
                        {cartItems.map((item) => (
                            <div className="summary-item" key={item.id}>
                                <div className="summary-item-img">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="summary-item-info">
                                    <div className="summary-item-name">{item.name}</div>
                                    <div className="summary-item-meta">
                                        Qty: {item.quantity} {item.finish ? `· Finish: ${item.finish}` : ""}
                                    </div>
                                </div>
                                <span className="summary-item-price">
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <hr className="summary-divider" />

                    <div className="summary-row">
                        <span className="summary-label">Subtotal</span>
                        <span className="summary-val">{formatPrice(cartSubtotal)}</span>
                    </div>

                    <div className="summary-row">
                        <span className="summary-label">Shipping</span>
                        <span className="summary-val" style={{ color: "#C05C46", textTransform: "uppercase", fontSize: "10px", letterSpacing: "0.1em" }}>
                            {cartSubtotal >= 1500 ? "Free" : formatPrice(150)}
                        </span>
                    </div>

                    <hr className="summary-divider" />

                    <div className="summary-row" style={{ alignItems: "baseline" }}>
                        <span className="summary-total-label">Total</span>
                        <span className="summary-total-val">
                            {formatPrice(cartSubtotal + (cartSubtotal >= 1500 ? 0 : 150))}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
