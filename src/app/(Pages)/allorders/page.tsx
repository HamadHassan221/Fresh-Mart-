"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader } from 'lucide-react';

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  ratingsAverage: number;
}

interface CartItem {
  _id: string;
  count: number;
  product: Product;
  price: number;
}

interface Order {
  _id: string;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt: string;
  createdAt: string;
  cartItems: CartItem[];
}

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('userId');
        
        if (!userId) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }


        console.log(userId);
        
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
          { method: 'GET' }
        );
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Handle different response formats
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data.data && Array.isArray(data.data)) {
          // If the API returns { data: [...] }
          setOrders(data.data);
        } else if (data.orders && Array.isArray(data.orders)) {
          // If the API returns { orders: [...] }
          setOrders(data.orders);
        } else if (data.results && Array.isArray(data.results)) {
          // If the API returns { results: [...] }
          setOrders(data.results);
        } else {
          // Handle empty or unexpected response
          setOrders([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
          <div className="flex justify-center items-center h-64">
            <Loader className='animate-spin w-20 h-20' />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        
        {!orders || orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="mt-4 text-xl font-medium text-gray-900">No orders yet</h2>
              <p className="mt-2 text-gray-500">You haven't placed any orders yet.</p>
              <Link 
                href="/" 
                className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="border-b border-gray-200 p-4 bg-gray-50 flex flex-wrap justify-between items-center">
                  <div className="mb-2 md:mb-0">
                    <p className="text-sm text-gray-500">Order Placed</p>
                    <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="mb-2 md:mb-0">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">${order.totalOrderPrice.toFixed(2)}</p>
                  </div>
                  <div className="mb-2 md:mb-0">
                    <p className="text-sm text-gray-500">Order #</p>
                    <p className="font-medium">{order._id.slice(-8)}</p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.isDelivered 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.isDelivered ? 'Delivered' : 'Processing'}
                    </span>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="p-4">
                  <h3 className="sr-only">Items</h3>
                  <ul className="divide-y divide-gray-200">
                    {order.cartItems.map((item) => (
                      <li key={item._id} className="py-4 flex">
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={item.product.imageCover}
                            alt={item.product.title}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.product.title}</h3>
                              <p className="ml-4">${item.price.toFixed(2)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Quantity: {item.count}</p>
                          </div>
                          <div className="flex-1 flex items-end justify-between text-sm">
                            <p className="flex items-center text-gray-500">
                              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              {item.product.ratingsAverage}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Order Summary */}
                  <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Payment method</p>
                      <p className="font-medium capitalize">{order.paymentMethodType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Subtotal</p>
                      <p className="font-medium">${(order.totalOrderPrice - order.taxPrice - order.shippingPrice).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium">{order.isPaid ? 'Paid' : 'Pending'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Shipping</p>
                      <p className="font-medium">${order.shippingPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-sm text-gray-500">Order date</p>
                      <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Tax</p>
                      <p className="font-medium">${order.taxPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                    <div>
                      <p className="text-lg font-medium">Order total</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">${order.totalOrderPrice.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}