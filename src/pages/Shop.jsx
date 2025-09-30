// src/pages/Shop.jsx
import React, { useState } from 'react';
import { FiSearch, FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';

const categories = ['All', 'Laptops', 'Smartphones', 'Headphones', 'Smartwatches'];

const products = [
  {
    id: 1,
    name: 'MacBook Pro 14\" M2',
    price: 1999.99,
    category: 'Laptops',
    rating: 4.8,
    image: 'https://macfinder.co.uk/wp-content/uploads/2022/12/img-MacBook-Pro-Retina-14-Inch-23934.jpg',
  },
  {
    id: 2,
    name: 'iPhone 15 Pro',
    price: 999.00,
    category: 'Smartphones',
    rating: 4.7,
    image: 'https://eshop.hkcsl.com/on/demandware.static/-/Sites-master-hkt-hk/default/dwcdd8cb96/images/IP15_promaxscol/4019641_1.jpg',
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    price: 349.99,
    category: 'Headphones',
    rating: 4.8,
    image: 'https://static1.pocketnowimages.com/wordpress/wp-content/uploads/styles/xxlarge/public/2022-05/LI%20WH1000%20XM5%20Colors.jpg',
  },
  {
    id: 4,
    name: 'Samsung Galaxy Watch 6',
    price: 299.99,
    category: 'Smartwatches',
    rating: 4.5,
    image: 'https://360-reader.com/wp-content/uploads/2023/07/Samsung-Galaxy-Watch-Band-20mm.png',
  },
  {
    id: 5,
    name: 'Dell XPS 15',
    price: 1799.99,
    category: 'Laptops',
    rating: 4.7,
    image: 'https://tse2.mm.bing.net/th/id/OIP.gJU7K0cumScePGJ8ynPbngHaEL?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: 6,
    name: 'Samsung Galaxy S23 Ultra',
    price: 1199.99,
    category: 'Smartphones',
    rating: 4.8,
    image: 'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1709103019/Croma%20Assets/Communication/Mobiles/Images/275154_10_duxhla.png',
  },
  {
    id: 7,
    name: 'Bose QuietComfort 45',
    price: 329.00,
    category: 'Headphones',
    rating: 4.7,
    image: 'https://th.bing.com/th/id/R.90918a5a2c22d2a2dd562f30f78fb921?rik=%2bVmMjigkHej3Jg&pid=ImgRaw&r=0',
  },
  {
    id: 8,
    name: 'Apple Watch Series 9',
    price: 429.00,
    category: 'Smartwatches',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 9,
    name: 'Microsoft Surface Laptop 5',
    price: 1299.99,
    category: 'Laptops',
    rating: 4.6,
    image: 'https://clarkdeals.com/wp-content/uploads/2022/09/microsoft-surface-laptop-935x604.png',
  },
  {
    id: 10,
    name: 'Google Pixel 8 Pro',
    price: 899.00,
    category: 'Smartphones',
    rating: 4.7,
    image: 'https://m.media-amazon.com/images/I/713eEl39eLL.jpg',
  }

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
            <h1 className="text-2xl font-bold">TechStore</h1>
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
          <div className="relative h-60">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2Y1ZjVmNyIvPjx0ZXh0IHg9IjI1MCIgeT0iMjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNjY2MiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIGltYWdlIGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
              }}
            />
            <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
              <FiHeart className="w-5 h-5 text-gray-600" />
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