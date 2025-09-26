import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import products from '../data/products';

const Bestsellers = ({ onAddToCart, onAddToWishlist }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [touchStartX, setTouchStartX] = useState(0);
  const [modalProduct, setModalProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  const lastFocusedElement = useRef(null);

  // Update itemsPerPage on window resize
  useEffect(() => {
    function updateLayout() {
      const w = window.innerWidth;
      if (w >= 1024) setItemsPerPage(4);
      else if (w >= 640) setItemsPerPage(2);
      else setItemsPerPage(1);
    }
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Scroll carousel to currentIndex
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * currentIndex;
    el.scrollTo({ left: scrollAmount, behavior: 'smooth' });
  }, [currentIndex]);

  // Handle modal keyboard navigation and focus trap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') {
        closeModal();
      }
      
      // Trap focus inside modal
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Handlers
  const handlePrev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((i) => Math.min(i + 1, Math.ceil(products.length / itemsPerPage) - 1));
  }, [itemsPerPage]);

  const onTouchStart = useCallback((e) => {
    setTouchStartX(e.touches[0].pageX);
  }, []);
  
  const onTouchEnd = useCallback((e) => {
    const diff = touchStartX - e.changedTouches[0].pageX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
  }, [handleNext, handlePrev, touchStartX]);
  
  const openModal = useCallback((product) => {
    lastFocusedElement.current = document.activeElement;
    setModalProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }, []);
  
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = ''; // Re-enable background scrolling
    if (lastFocusedElement.current) {
      lastFocusedElement.current.focus();
    }
  }, []);
  
  const handleAddToCart = useCallback((product, e) => {
    e?.stopPropagation();
    if (typeof onAddToCart === 'function') {
      onAddToCart(product);
    } else {
      console.log('Added to cart:', product.id);
    }
  }, [onAddToCart]);
  
  const handleAddToWishlist = useCallback((productId, e) => {
    e?.stopPropagation();
    if (typeof onAddToWishlist === 'function') {
      onAddToWishlist(productId);
    } else {
      console.log('Added to wishlist:', productId);
    }
  }, [onAddToWishlist]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold border-b-2 border-gray-200 pb-1">
          Best Sellers
        </h2>
        <a href="/shop" className="text-sm text-blue-600 hover:underline">
          View All
        </a>
      </div>

      {/* Carousel */}
      <div className="relative">
        <button
          aria-label="Previous"
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentIndex === 0}
        >
          {/* Left Arrow */}
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div
          ref={carouselRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
        >
          {products.map((p, idx) => (
            <div
              key={p.id}
              className="group relative min-w-[250px] sm:min-w-[280px] bg-white rounded-lg shadow-sm hover:shadow-lg transition p-4 snap-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              role="button"
              tabIndex={0}
              onClick={() => openModal(p)}
              onKeyDown={(e) => e.key === 'Enter' && openModal(p)}
              aria-label={`View details for ${p.title}`}
            >
              {/* Sale/Bestseller Badge */}
              {p.onSale && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs uppercase px-2 py-1 rounded">
                  Sale
                </span>
              )}
              {p.bestseller && !p.onSale && (
                <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs uppercase px-2 py-1 rounded">
                  Bestseller
                </span>
              )}

              {/* Wishlist Icon */}
              <button 
                className="absolute top-2 right-2 text-gray-300 hover:text-red-500 transition focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full p-1"
                onClick={(e) => handleAddToWishlist(p.id, e)}
                aria-label={`Add ${p.title} to wishlist`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 011.07-1.562..." />
                </svg>
              </button>

              {/* Image */}
              <div className="overflow-hidden rounded-md">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition"
                />
              </div>

              {/* Title & Price */}
              <h3 className="mt-4 text-lg font-medium text-gray-900 line-clamp-2 h-14">{p.title}</h3>
              <div className="mt-1 flex items-center space-x-2 text-gray-600">
                {p.onSale && <span className="line-through">${p.price}</span>}
                <span className="text-xl font-semibold text-black">
                  ${p.onSale ? p.salePrice : p.price}
                </span>
              </div>

              {/* Rating */}
              <div className="mt-2 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < p.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921..." />
                  </svg>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={(e) => handleAddToCart(p, e)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:-translate-y-0.5 transition"
                  aria-label={`Add ${p.title} to cart`}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => openModal(p)}
                  className="bg-gray-100 text-gray-700 py-2 px-3 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
                  aria-label={`Quick view ${p.title}`}
                >
                  Quick View
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          aria-label="Next"
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 z-10"
        >
          {/* Right Arrow */}
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center space-x-2 mt-4">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isModalOpen ? 'opacity-100 z-50' : 'opacity-0 pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={closeModal}
      >
        {modalProduct && (
          <div 
            ref={modalRef}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 id="modal-title" className="text-2xl font-semibold">
                {modalProduct.title}
              </h2>
              <button
                aria-label="Close modal"
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-1"
                autoFocus
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 md:flex gap-6">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <img
                  src={modalProduct.image}
                  alt={modalProduct.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                  loading="lazy"
                />
              </div>
              
              <div className="md:w-1/2">
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < modalProduct.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {modalProduct.rating}/5.0
                    </span>
                  </div>
                  
                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    ${modalProduct.onSale ? modalProduct.salePrice : modalProduct.price}
                    {modalProduct.onSale && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${modalProduct.price}
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">{modalProduct.description}</p>
                
                <div className="flex space-x-4">
                  <button
                    onClick={(e) => {
                      handleAddToCart(modalProduct, e);
                      closeModal();
                    }}
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => {
                      handleAddToWishlist(modalProduct.id, e);
                    }}
                    className="p-3 text-gray-700 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full transition"
                    aria-label="Add to wishlist"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

Bestsellers.propTypes = {
  onAddToCart: PropTypes.func,
  onAddToWishlist: PropTypes.func,
};

Bestsellers.defaultProps = {
  onAddToCart: null,
  onAddToWishlist: null,
};

export default Bestsellers;