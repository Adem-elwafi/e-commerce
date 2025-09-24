import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  // State for cart and dropdowns
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Apple iPhone 15', price: 599, quantity: 1 },
    { id: 2, name: 'Apple iPad Air', price: 499, quantity: 1 },
    { id: 3, name: 'Apple Watch SE', price: 299, quantity: 2 },
    { id: 4, name: 'Sony Playstation 5', price: 799, quantity: 1 },
    { id: 5, name: 'Apple iMac 20\"', price: 8997, quantity: 3 },
  ]);

  const cartRef = useRef(null);
  const userDropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('[data-collapse-toggle="ecommerce-navbar-menu-1"]')) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle cart dropdown
  const toggleCart = (e) => {
    e?.preventDefault();
    setIsCartOpen(!isCartOpen);
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Toggle user dropdown
  const toggleUserDropdown = (e) => {
    e?.preventDefault();
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setIsCartOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Toggle mobile menu
  const toggleMobileMenu = (e) => {
    e?.preventDefault();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsCartOpen(false);
    setIsUserDropdownOpen(false);
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setIsCartOpen(false);
    setIsUserDropdownOpen(false);
    setIsMobileMenu(false);
  };

  // Remove item from cart
  const removeFromCart = (id, e) => {
    e?.stopPropagation();
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total items in cart
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  return (
    <div className="app-container">
<nav className="bg-black dark:bg-gray-800 antialiased">
  <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
    <div class="flex items-center justify-between">

      <div class="flex items-center space-x-8">
        <div class="shrink-0">
          <a href="#" title="" class="text-xl" >
          🧑‍💻 Mytek
          </a>
        </div>

        <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
          <li>
            <a href="#" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
              Home
            </a>
          </li>
          <li class="shrink-0">
            <a href="#" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
              Best Sellers
            </a>
          </li>
          <li class="shrink-0">
            <a href="#" className="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
              Gift Ideas
            </a>
          </li>
          <li class="shrink-0">
            <a href="#" title="" class="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
              Today's Deals
            </a>
          </li>
          <li class="shrink-0">
            <a href="#" title="" class="text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
              Sell
            </a>
          </li>
        </ul>
      </div>

      <div class="flex items-center lg:space-x-2">

        <div className="relative" ref={cartRef}>
          <button 
            onClick={toggleCart}
            type="button" 
            className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-700 text-sm font-medium leading-none text-white relative"
          >
            <span className="sr-only">My Cart</span>
            <svg className="w-5 h-5 lg:me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
            </svg> 
            <span className="hidden sm:flex">My Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {isCartOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 p-4">
              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Your cart is empty</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="grid grid-cols-2">
                        <div>
                          <a href="#" className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline">
                            {item.name}
                          </a>
                          <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                            ${item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center justify-end gap-4">
                          <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                            Qty: {item.quantity}
                          </p>
                          <button 
                            type="button" 
                            className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                            onClick={(e) => removeFromCart(item.id, e)}
                          >
                            <span className="sr-only">Remove</span>
                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold">${totalPrice.toLocaleString()}</span>
                      </div>
                      <a 
                        href="#" 
                        className="w-full text-center block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                        onClick={closeAllDropdowns}
                      >
                        Proceed to Checkout
                      </a>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div id="myCartDropdown1" class="hidden z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-800">
          <div class="grid grid-cols-2">
            <div>
              <a href="#" class="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline">Apple iPhone 15</a>
              <p class="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">$599</p>
            </div>
      
            <div class="flex items-center justify-end gap-6">
              <p class="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">Qty: 1</p>
      
              <button data-tooltip-target="tooltipRemoveItem1a" type="button" class="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                <span class="sr-only"> Remove </span>
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                </svg>
              </button>
              <div id="tooltipRemoveItem1a" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                Remove item
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
      
          <div class="grid grid-cols-2">
            <div>
              <a href="#" class="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline">Apple iPad Air</a>
              <p class="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">$499</p>
            </div>
      
            <div class="flex items-center justify-end gap-6">
              <p class="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">Qty: 1</p>
      
              <button data-tooltip-target="tooltipRemoveItem2a" type="button" class="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                <span class="sr-only"> Remove </span>
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                </svg>
              </button>
              <div id="tooltipRemoveItem2a" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                Remove item
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
      
          <div class="grid grid-cols-2">
            <div>
              <a href="#" class="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline">Apple Watch SE</a>
              <p class="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">$598</p>
            </div>
      
            <div class="flex items-center justify-end gap-6">
              <p class="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">Qty: 2</p>
      
              <button data-tooltip-target="tooltipRemoveItem3b" type="button" class="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                <span class="sr-only"> Remove </span>
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                </svg>
              </button>
              <div id="tooltipRemoveItem3b" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                Remove item
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
      
          <div class="grid grid-cols-2">
            <div>
              <a href="#" class="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline">Sony Playstation 5</a>
              <p class="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">$799</p>
            </div>
      
            <div class="flex items-center justify-end gap-6">
              <p class="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">Qty: 1</p>
      
              <button data-tooltip-target="tooltipRemoveItem4b" type="button" class="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                <span class="sr-only"> Remove </span>
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                </svg>
              </button>
              <div id="tooltipRemoveItem4b" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                Remove item
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
      
          <div class="grid grid-cols-2">
            <div>
              <a href="#" class="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline">Apple iMac 20"</a>
              <p class="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">$8,997</p>
            </div>
      
            <div class="flex items-center justify-end gap-6">
              <p class="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">Qty: 3</p>
      
              <button data-tooltip-target="tooltipRemoveItem5b" type="button" class="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                <span class="sr-only"> Remove </span>
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                </svg>
              </button>
              <div id="tooltipRemoveItem5b" role="tooltip" class="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                Remove item
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
          </div>
      
          <a href="#" title="" class="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" role="button"> Proceed to Checkout </a>
        </div>

        <div className="relative" ref={userDropdownRef}>
          <button 
            onClick={toggleUserDropdown}
            type="button" 
            className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-700 text-sm font-medium leading-none text-white"
          >
            <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
            </svg>              
            <span>Account</span>
          </button>

          {isUserDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
              <ul className="py-1">
                {[
                  { label: 'My Account', icon: '👤' },
                  { label: 'My Orders', icon: '📦' },
                  { label: 'Settings', icon: '⚙️' },
                  { label: 'Favourites', icon: '❤️' },
                  { label: 'Delivery Addresses', icon: '🏠' },
                  { label: 'Billing Data', icon: '💳' },
                ].map((item) => (
                  <li key={item.label}>
                    <a 
                      href="#" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
                      onClick={closeAllDropdowns}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
                <li className="border-t border-gray-200 dark:border-gray-600 my-1"></li>
                <li>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600"
                    onClick={closeAllDropdowns}
                  >
                    <span>🚪</span>
                    <span>Sign Out</span>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div id="userDropdown1" class="hidden z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700">
          <ul class="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
            <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> My Account </a></li>
            <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> My Orders </a></li>
            <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Settings </a></li>
            <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Favourites </a></li>
            <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Delivery Addresses </a></li>
            <li><a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Billing Data </a></li>
          </ul>
      
          <div class="p-2 text-sm font-medium text-gray-900 dark:text-white">
            <a href="#" title="" class="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Sign Out </a>
          </div>
        </div>

        <button 
          type="button" 
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          className="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md dark:hover:bg-gray-700 p-2 text-white"
        >
          <span className="sr-only">
            {isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          </span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
            ) : (
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
            )}
          </svg>                
        </button>
      </div>
    </div>

    <div 
      id="ecommerce-navbar-menu-1" 
      ref={mobileMenuRef}
      className={`bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 px-4 mt-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
    >
      <ul class="text-gray-900 dark:text-white text-sm font-medium dark:text-white space-y-3">
        <li>
          <a href="#" class="block py-2 hover:text-primary-700 dark:hover:text-primary-500" onClick={closeAllDropdowns}>Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 hover:text-primary-700 dark:hover:text-primary-500" onClick={closeAllDropdowns}>Best Sellers</a>
        </li>
        <li>
          <a href="#" class="block py-2 hover:text-primary-700 dark:hover:text-primary-500" onClick={closeAllDropdowns}>Gift Ideas</a>
        </li>
        <li>
          <a href="#" class="block py-2 hover:text-primary-700 dark:hover:text-primary-500" onClick={closeAllDropdowns}>Games</a>
        </li>
        <li>
          <a href="#" class="block py-2 hover:text-primary-700 dark:hover:text-primary-500" onClick={closeAllDropdowns}>Electronics</a>
        </li>
        <li>
          <a href="#" class="block py-2 hover:text-primary-700 dark:hover:text-primary-500" onClick={closeAllDropdowns}>Home & Garden</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </div>
  )
}

export default App