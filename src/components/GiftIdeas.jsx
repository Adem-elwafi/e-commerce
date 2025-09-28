import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const GiftIdeas = ({ products = [], cartItems = [], toggleCart = () => {} }) => {
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
    return null; // Don't render anything if no valid products
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Gift Ideas</h2>
          <p className="text-lg text-gray-600">Perfect tech gifts for every occasion</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftIdeas.map((product) => {
            const inCart = cartItems.some(item => item.id === product.id);
            return (
              <article key={product.id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    <Link to={`/products/${product.id}`} className="hover:text-blue-600">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      ${product.onSale ? product.salePrice : product.price}
                      {product.onSale && (
                        <span className="ml-2 text-sm text-red-600 line-through">
                          ${product.price}
                        </span>
                      )}
                    </span>
                    <button
                      onClick={() => toggleCart(product.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        inCart
                          ? 'bg-transparent text-emerald-600 border-2 border-emerald-600'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      aria-pressed={inCart}
                      aria-label={`${inCart ? 'Remove' : 'Add'} ${product.name} to cart`}
                    >
                      {inCart ? (
                        <span className="flex items-center">
                          <FiShoppingCart className="mr-1.5" /> Added
                        </span>
                      ) : (
                        'Add to Cart'
                      )}
                    </button>
                  </div>
                </div>
                {product.onSale && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    SALE
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
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