import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) &&
          !event.target.closest('[aria-label="Global"]')) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-transparent">
      <nav aria-label="Global" className="flex items-center justify-between p-3 lg:px-6">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Mytek</span>
            <img src={logo} alt="Mytek Logo" className="h-20 w-auto" />
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button 
            type="button" 
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#000000]"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-12">
          <Link to="/" className="text-sm/6 font-semibold text-[#000000] hover:text-[#08CB00]">Home</Link>
          <Link to="/shop" className="text-sm/6 font-semibold text-[#000000] hover:text-[#08CB00]">Shop</Link>
          <a 
            href="#bestsellers" 
            className="text-sm/6 font-semibold text-[#000000] hover:text-[#08CB00] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('bestsellers');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Best Sellers
          </a>
          <a 
            href="#gift-ideas" 
            className="text-sm/6 font-semibold text-[#000000] hover:text-[#08CB00] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('gift-ideas');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Gift Ideas
          </a>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <Link to="/cart" className="text-sm/6 font-semibold text-[#000000] hover:text-[#08CB00]">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </Link>
          <Link to="/account" className="text-sm/6 font-semibold text-[#000000] hover:text-[#08CB00]">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.58-7.499-1.632z" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className="lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-[#000000]/75" aria-hidden="true" onClick={toggleMobileMenu}></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/95 backdrop-blur-sm px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link to="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Mytek</span>
                  <img src={logo} alt="Mytek Logo" className="h-16 w-auto" />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-[#000000]"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="py-6">
                  <div className="-my-6">
                    <div className="py-6">
                      <Link to="/" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#000000] hover:bg-gray-50" onClick={toggleMobileMenu}>Home</Link>
                      <Link to="/shop" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#000000] hover:bg-gray-50" onClick={toggleMobileMenu}>Shop</Link>
                      <a 
                        href="#bestsellers" 
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#000000] hover:bg-gray-50 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleMobileMenu();
                          const element = document.getElementById('bestsellers');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Best Sellers
                      </a>
                      <a 
                        href="#gift-ideas" 
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#000000] hover:bg-gray-50 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleMobileMenu();
                          const element = document.getElementById('gift-ideas');
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Gift Ideas
                      </a>
                      <Link to="/cart" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#000000] hover:bg-gray-50" onClick={toggleMobileMenu}>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                          </svg>
                          Cart
                        </div>
                      </Link>
                      <Link to="/account" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#000000] hover:bg-gray-50" onClick={toggleMobileMenu}>
                        <div className="flex items-center">
                          <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.58-7.499-1.632z" />
                          </svg>
                          Account
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;