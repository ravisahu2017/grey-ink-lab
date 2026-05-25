"use client";

import { useEffect, useState } from "react";
import OrderController from "@/controllers/orderController";
import "./myOrders.css";

export default function MyOrders() {
    const [orderId, setOrderId] = useState<string | null>(null);
    const [order, setOrder] = useState<any>(null);
    const [ordersList, setOrdersList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Read ID query param on client side safely
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = queryParams.get("id");
        setOrderId(id);

        if (!id) {
            // Load local guest orders list
            const localOrders = JSON.parse(localStorage.getItem("gil_orders") || "[]");
            setOrdersList(localOrders);
            setIsLoading(false);
        }
    }, []);

    // Fetch specific order if ID changes
    useEffect(() => {
        if (!orderId) return;

        const fetchOrderDetails = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await OrderController.getOrderById(orderId);
                setOrder(data);
            } catch (err: any) {
                console.error("Error fetching order:", err);
                setError(err.message || "Failed to load order details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const formatPrice = (price: number | string) => {
        const num = typeof price === "string" ? parseFloat(price) : price;
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(num);
    };

    const handleViewOrder = (id: string | number) => {
        window.history.pushState({}, "", `/my-orders?id=${id}`);
        setOrderId(id.toString());
    };

    const handleBackToHistory = () => {
        window.history.pushState({}, "", "/my-orders");
        setOrderId(null);
        setOrder(null);
        // Refresh local orders list
        const localOrders = JSON.parse(localStorage.getItem("gil_orders") || "[]");
        setOrdersList(localOrders);
    };

    if (isLoading) {
        return (
            <div className="orders-page fu">
                <div className="orders-container" style={{ textAlign: "center", padding: "100px 0" }}>
                    <p style={{ fontFamily: "Jost", fontWeight: 300, color: "var(--stone)" }}>Loading order information...</p>
                </div>
            </div>
        );
    }

    // Specific Order Detail View
    if (orderId) {
        if (error) {
            return (
                <div className="orders-page fu">
                    <div className="orders-container" style={{ textAlign: "center", padding: "80px 0" }}>
                        <p style={{ fontFamily: "Cormorant Garamond", fontSize: "20px", color: "#C05C46", marginBottom: "20px" }}>{error}</p>
                        <button className="btn-history-shop" onClick={handleBackToHistory}>
                            View Order History
                        </button>
                    </div>
                </div>
            );
        }

        const isSuccessLanding = document.referrer.includes("/checkout");

        return (
            <div className="orders-page fu">
                <div className="orders-container">
                    {/* Success Confirmation Header */}
                    {isSuccessLanding && (
                        <div className="success-banner">
                            <h2 className="success-title">Order Received</h2>
                            <p className="success-message">
                                Thank you for your support. Your order <strong>#{orderId}</strong> has been successfully placed. Each concrete sculpture is cast, cured, and finished slowly by hand in our Delhi studio.
                            </p>
                        </div>
                    )}

                    {/* Back Button */}
                    <button
                        onClick={handleBackToHistory}
                        style={{
                            alignSelf: "flex-start",
                            background: "none",
                            border: "none",
                            fontFamily: "Jost",
                            fontSize: "10px",
                            fontWeight: 300,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: "var(--stone)",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12,19 5,12 12,5" />
                        </svg>
                        Back to Orders
                    </button>

                    {/* Order Details Card */}
                    {order && (
                        <div className="order-card">
                            <div className="order-header-info">
                                <span className="order-id-label">Order #{order.id}</span>
                                <div className="order-date-status">
                                    <span className="order-date">
                                        {new Date(order.date_created).toLocaleDateString()}
                                    </span>
                                    <span className={`order-status-badge ${order.status}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Line Items */}
                            <div className="order-items-grid">
                                {order.line_items?.map((item: any) => (
                                    <div className="order-item-row" key={item.id}>
                                        <div className="order-item-main">
                                            <div className="order-item-thumb">
                                                <img
                                                    src={item.image?.src || "http://localhost:8080/wp-content/uploads/2026/05/product_1.jpeg"}
                                                    alt={item.name}
                                                />
                                            </div>
                                            <div className="order-item-info">
                                                <span className="order-item-name">{item.name}</span>
                                                <span className="order-item-meta">
                                                    Qty: {item.quantity} {item.meta_data?.find((m: any) => m.key === "Finish") ? `· Finish: ${item.meta_data.find((m: any) => m.key === "Finish").value}` : ""}
                                                </span>
                                            </div>
                                        </div>
                                        <span className="order-item-price">
                                            {formatPrice(parseFloat(item.total))}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <hr className="summary-divider" />

                            {/* Totals Summary */}
                            <div className="summary-row">
                                <span className="summary-label">Subtotal</span>
                                <span className="summary-val">{formatPrice(order.discount_total ? parseFloat(order.total) + parseFloat(order.discount_total) : order.total)}</span>
                            </div>
                            <div className="summary-row">
                                <span className="summary-label">Shipping</span>
                                <span className="summary-val">
                                    {parseFloat(order.shipping_total) === 0 ? "Free" : formatPrice(order.shipping_total)}
                                </span>
                            </div>
                            <hr className="summary-divider" />
                            <div className="summary-row" style={{ alignItems: "baseline" }}>
                                <span className="summary-total-label">Total Paid</span>
                                <span className="summary-total-val">{formatPrice(order.total)}</span>
                            </div>

                            {/* Shipping and Billing addresses */}
                            <div className="addresses-grid">
                                <div>
                                    <h3 className="address-block-title">Shipping Address</h3>
                                    <p className="address-text">
                                        {order.shipping?.first_name} {order.shipping?.last_name}<br />
                                        {order.shipping?.address_1}<br />
                                        {order.shipping?.address_2 && <>{order.shipping.address_2}<br /></>}
                                        {order.shipping?.city}, {order.shipping?.state} - {order.shipping?.postcode}<br />
                                        {order.shipping?.country === "IN" ? "India" : order.shipping?.country}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="address-block-title">Contact & Billing</h3>
                                    <p className="address-text">
                                        {order.billing?.email}<br />
                                        {order.billing?.phone}<br />
                                        <span style={{ fontSize: "11px", color: "var(--stone-light)" }}>
                                            Paid via: {order.payment_method_title}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Order History List View
    return (
        <div className="orders-page fu">
            <div className="orders-container">
                <h1 className="history-title">My Orders</h1>

                {ordersList.length === 0 ? (
                    <div className="empty-history">
                        <p style={{ fontFamily: "Cormorant Garamond", fontSize: "19px", fontStyle: "italic", color: "var(--stone)" }}>
                            You haven't placed any orders yet.
                        </p>
                        <button className="btn-history-shop" onClick={() => window.location.href = "/catalogue/collectibles"}>
                            Start Exploring
                        </button>
                    </div>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersList.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{ fontWeight: 400, color: "var(--ink)" }}>#{item.id}</td>
                                        <td>{item.date}</td>
                                        <td>
                                            <span className={`order-status-badge ${item.status}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td>{formatPrice(item.total)}</td>
                                        <td>
                                            <span className="link-view-order" onClick={() => handleViewOrder(item.id)}>
                                                View Details
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
