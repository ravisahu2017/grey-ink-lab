import { woocommerceApi } from "@/utils/api";

export default class OrderController {
    /**
     * Create a new order in WooCommerce
     */
    static async createOrder(orderPayload: any): Promise<any> {
        try {
            const response = await woocommerceApi.post("/orders", orderPayload);
            if (!response.success) {
                throw new Error(response.error || "Failed to create order");
            }
            return response.data;
        } catch (error: any) {
            throw new Error(error.message || "Error creating order");
        }
    }

    /**
     * Retrieve order details by Order ID
     */
    static async getOrderById(orderId: string | number): Promise<any> {
        try {
            const response = await woocommerceApi.get(`/orders/${orderId}`);
            if (!response.success) {
                throw new Error(response.error || `Failed to fetch order ${orderId}`);
            }
            return response.data;
        } catch (error: any) {
            throw new Error(error.message || "Error fetching order");
        }
    }

    /**
     * Retrieve orders by Email (for guest query or lookup)
     */
    static async getOrdersByEmail(email: string): Promise<any[]> {
        try {
            const response = await woocommerceApi.get(`/orders?email=${encodeURIComponent(email)}`);
            if (!response.success) {
                throw new Error(response.error || "Failed to fetch orders");
            }
            return response.data;
        } catch (error: any) {
            throw new Error(error.message || "Error fetching orders");
        }
    }
}
