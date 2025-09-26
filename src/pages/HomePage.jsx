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



<a class="flex items-center justify-center ">
  <div class="relative group">
    <button
      class="relative inline-block p-px font-semibold leading-6 text-white bg-neutral-900 shadow-2xl cursor-pointer rounded-2xl shadow-emerald-900 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-emerald-600"
    >
      <span
        class="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></span>
      <span class="relative z-10 block px-6 py-3 rounded-2xl bg-gradient-to-r from-green-900 to-green-1000 ">
        <div class="relative z-10 flex items-center space-x-3">
          <span
            class="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300"
            >Shop now</span
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-7 h-7 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300"
          >
            <path
              d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            ></path>
          </svg>
        </div>
      </span>
    </button>
  </div>
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
