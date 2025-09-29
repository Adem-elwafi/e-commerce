// src/pages/Shop.jsx
import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';

const categories = ['All', 'Laptops', 'Smartphones', 'Headphones', 'Smartwatches'];

const products = [
  {
    id: 1,
    name: 'MacBook Pro 14" M2',
    price: 1999.99,
    category: 'Laptops',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e5c09?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: 999.00,
    category: 'Smartphones',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1697898706715-d54f797ee67c?w=500&auto=format&fit=crop&q=60',
  },
  // Add more products as needed
];

export default function Shop() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [cartCount, setCartCount] = useState(0);
  
    const filteredProducts = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  
    const addToCart = () => {
      setCartCount(prev => prev + 1);
    };
  
    return (
      <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
        {/* Header */}
        <header className="bg-[#253900] text-white sticky top-0 z-10 shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">TechStore</h1>
              <div className="relative flex items-center">
                <div className="relative">
                  <FiShoppingCart className="text-2xl cursor-pointer" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#08CB00] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Search and Filter */}
<div className="bg-white shadow-sm sticky top-16 z-10">
  <div className="container mx-auto px-4 py-4">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="relative flex-1 max-w-2xl">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#08CB00] focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-[#253900] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  </div>
</div>

<main className="container mx-auto px-4 py-8">
  <h2 className="text-2xl font-semibold mb-6">
    {selectedCategory === 'All' ? 'All Products' : selectedCategory}
    <span className="text-gray-500 text-base font-normal ml-2">
      ({filteredProducts.length} products)
    </span>
  </h2>
  
  {filteredProducts.length === 0 ? (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">No products found. Try adjusting your search or filters.</p>
    </div>
  ) : (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group"
        >
          <div className="relative overflow-hidden h-60 bg-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
            />
            <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
              <FiHeart className="text-gray-600" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
              <span className="text-xs text-white bg-[#08CB00] px-2 py-1 rounded-full">
                {product.category}
              </span>
            </div>
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
            <div className="flex items-center mb-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar 
                    key={i} 
                    className={`${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                  />
                ))}
              </div>
              <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
            </div>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
              <div className="flex gap-2">
                <button 
                  className="px-3 py-1.5 text-sm bg-[#253900] text-white rounded-lg hover:bg-[#1a2a00] transition-colors"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
                <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiShoppingCart />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</main>

<footer className="bg-[#1d1d1f] text-[#f5f5f7] py-8 mt-12">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Footer sections */}
    </div>
    <div className="border-t border-gray-800 mt-8 pt-6 text-sm text-gray-400">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p>Copyright © 2025 TechStore Inc. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Use</a>
          <a href="#" className="hover:text-white">Sales and Refunds</a>
        </div>
      </div>
    </div>
  </div>
</footer>
      </div>
    );
  }