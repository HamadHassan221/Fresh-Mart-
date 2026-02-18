"use client";

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black text-white inset-x-0 bottom-0">      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">ShopMall</h4>
            <p className="text-gray-400 mb-4">
              Your one-stop destination for all your shopping needs. Quality products at affordable prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaPinterest size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Best Sellers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Today's Deals</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <address className="text-gray-400 not-italic">
              <p className="mb-2">123 Commerce Street</p>
              <p className="mb-2">New York, NY 10001</p>
              <p className="mb-2">Email: support@shopmall.com</p>
              <p className="mb-2">Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
      </div>

      {/* Payment Methods & Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between text-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0 ">
              © {new Date().getFullYear()} ShopMall. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}