import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiEye, FiStar } from 'react-icons/fi';

const GiftIdeas = ({ products = [], cartItems = [], toggleCart = () => {}, toggleWishlist = () => {} }) => {
  // Safely get gift ideas or first 4 products
  const getSafeProducts = () => {
    try {
      if (!Array.isArray(products) || products.length === 0) return [];
      
      const validProducts = products.filter(product => 
        product && 
        typeof product === 'object' && 
        product.id && 
        product.title
      );
      
      if (validProducts.length === 0) return [];
      
      const giftIdeas = validProducts.filter(p => p.giftIdea);
      return giftIdeas.length > 0 ? giftIdeas : validProducts.slice(0, 4);
    } catch (error) {
      console.error('Error processing products:', error);
      return [];
    }
  };

  const giftIdeas = getSafeProducts();

  if (!giftIdeas || giftIdeas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No gift ideas available at the moment. Check back soon!</p>
      </div>
    );
  }

  // Sample rating function (replace with actual rating logic if available)
  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);
  const getRandomReviewCount = () => Math.floor(Math.random() * 100) + 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {giftIdeas.map((product) => {
          const inCart = cartItems.some(item => item.id === product.id);
          const rating = getRandomRating();
          const reviewCount = getRandomReviewCount();
          const isNew = Math.random() > 0.5;
          
          return (
            <div key={product.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gray-100 aspect-square">
                <img
                  src={product.image || 'https://via.placeholder.com/300x300?text=Product+Image'}
                  alt={product.name || 'Product'}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Quick Actions */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                  <button 
                    className="p-2 bg-white rounded-full text-gray-800 hover:bg-blue-600 hover:text-white transition-colors"
                    aria-label="Quick view"
                  >
                    <FiEye className="w-5 h-5" />
                  </button>
                  <button 
                    className="p-2 bg-white rounded-full text-gray-800 hover:bg-red-500 hover:text-white transition-colors"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Add to wishlist"
                  >
                    <FiHeart className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.onSale && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                    </span>
                  )}
                  {isNew && (
                    <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-5">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.floor(rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  <Link to={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                    {product.name || 'Product Name'}
                  </Link>
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">
                  {product.description || 'Product description goes here'}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900">
                      ${product.onSale ? product.salePrice : (product.price || '0.00')}
                    </span>
                    {product.onSale && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => toggleCart(product.id)}
                    className={`p-2 rounded-full transition-colors ${
                      inCart
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    aria-pressed={inCart}
                    aria-label={`${inCart ? 'Remove from' : 'Add to'} cart`}
                  >
                    {inCart ? (
                      <FiCheck className="w-5 h-5" />
                    ) : (
                      <FiShoppingCart className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

GiftIdeas.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string,
      price: PropTypes.number,
      salePrice: PropTypes.number,
      onSale: PropTypes.bool,
      bestseller: PropTypes.bool,
      rating: PropTypes.number,
      image: PropTypes.string,
      description: PropTypes.string,
      giftIdea: PropTypes.bool
    })
  ),
  cartItems: PropTypes.array,
  toggleCart: PropTypes.func
};

export default GiftIdeas;