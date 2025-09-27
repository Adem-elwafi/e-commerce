// src/components/GiftIdeas.jsx
import React, { useState } from 'react';

const sampleProducts = [
  { id: 1, name: 'Classic Ceramic Mug', price: 12.99 },
  { id: 2, name: 'Minimalist Notebook', price: 9.5 },
  { id: 3, name: 'Eco Tote Bag', price: 14.0 },
  { id: 4, name: 'Compact Power Bank', price: 24.99 }
];

export default function GiftIdeas() {
  const [cart, setCart] = useState([]);

  function toggleCart(id) {
    setCart(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  }

  return (
    <section className="bg-brand-bg rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">Gift Ideas</h3>

      <div
        className="flex gap-4 overflow-x-auto scrollbar-x py-1"
        role="list"
        aria-label="Gift ideas horizontal list"
      >
        {sampleProducts.map(product => {
          const inCart = cart.includes(product.id);
          return (
            <article
              key={product.id}
              role="listitem"
              className="min-w-[220px] max-w-[220px] bg-white rounded-lg-2 shadow-sm transform transition-transform duration-200 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-lg flex flex-col overflow-hidden"
            >
              <div className="h-36 flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
                <div className="w-[86%] h-[86%] rounded-md border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400">
                  Image
                </div>
              </div>

              <div className="p-3 flex flex-col gap-2">
                <div className="text-sm font-semibold text-gray-900 min-h-[2.4rem]">
                  {product.name}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-brand-price font-extrabold text-base">
                    <span className="text-sm font-semibold align-baseline mr-0.5">$</span>
                    {product.price.toFixed(2)}
                  </div>

                  <button
                    onClick={() => toggleCart(product.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition duration-150 focus:outline-none focus-outline ${
                      inCart
                        ? 'bg-transparent text-brand-btn border-2 border-brand-btn'
                        : 'bg-brand-btn text-white'
                    }`}
                    aria-pressed={inCart}
                    aria-label={`${inCart ? 'Remove' : 'Add'} ${product.name} to cart`}
                  >
                    {inCart ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}