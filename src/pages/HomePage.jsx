import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div className="HomePage min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white/20 hover:ring-white/50">
              Announcing our next generation of products.{''}
              <a href="#" className="font-semibold text-white">
                <span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Shop the latest tech products
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90">
              Discover amazing deals on the latest technology. We offer the best prices on smartphones, laptops, and accessories with fast shipping and excellent customer service.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-gradient-to-r from-green-800 to-green-500 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Shop Now
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
