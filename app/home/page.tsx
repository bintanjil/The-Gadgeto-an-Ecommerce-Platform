'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative h-[650px] bg-[#E5E4E2]">
        {/* Dynamic background pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#00B7EB]/10 to-[#E5E4E2]/50 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -inset-[10px] bg-[#00B7EB]" style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
            }} />
          </div>
          
          <div className="container mx-auto px-6 h-full flex items-center relative">
            <div className="max-w-2xl animate-fade-in-up">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#00B7EB] to-[#0095C0] bg-clip-text text-transparent animate-text-gradient">
                Welcome to The Gadgeto
              </h1>
              <p className="text-xl mb-8 text-gray-700 animate-fade-in-up animation-delay-200">
                Discover the latest in tech innovation with our premium selection of gadgets and electronics.
              </p>
              <div className="flex gap-4 animate-fade-in-up animation-delay-300">
                <Link 
                  href="/products" 
                  className="group relative inline-flex items-center bg-[#00B7EB] hover:bg-[#0095C0] text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="mr-2">Shop Now</span>
                  <svg className="w-5 h-5 transition-transform transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <button 
                  className="group inline-flex items-center px-6 py-3 border-2 border-[#00B7EB] text-[#00B7EB] rounded-full hover:bg-[#00B7EB] hover:text-white transition-all font-semibold"
                  onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}
                >
                  <span className="mr-2">Learn More</span>
                  <svg className="w-5 h-5 transition-transform transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 animate-fade-in-up animation-delay-400">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00B7EB]">1000+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00B7EB]">50k+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#00B7EB]">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 hidden lg:block">
              <div className="relative w-[400px] h-[400px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B7EB]/10 rounded-full filter blur-xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0095C0]/10 rounded-full filter blur-lg animate-pulse animation-delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-[#E5E4E2] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pattern-dots"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00B7EB] to-[#0095C0] bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-gray-600">Explore our wide range of products across different categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Smartphones Category */}
            <div className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="h-48 relative">
                <Image 
                  src="/product/phone.webp" 
                  alt="Smartphones" 
                  layout="fill" 
                  objectFit="cover" 
                />
              </div>
              <div className="p-6 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#00B7EB] font-semibold text-xl">Smartphones</h3>
                  <span className="bg-[#00B7EB]/10 text-[#00B7EB] px-3 py-1 rounded-full text-sm font-medium">
                    24 Products
                  </span>
                </div>
                <p className="text-gray-600 mb-4">Latest smartphones from top brands</p>
                <Link 
                  href="/products?category=smartphones"
                  className="inline-flex items-center text-[#00B7EB] hover:text-[#0095C0] transition-colors group-hover:translate-x-2 duration-300"
                >
                  <span>View Collection</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Laptops Category */}
            <div className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="h-48 relative">
                <Image 
                  src="/product/laptop.jpg" 
                  alt="Laptops" 
                  layout="fill" 
                  objectFit="cover" 
                />
              </div>
              <div className="p-6 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#00B7EB] font-semibold text-xl">Laptops</h3>
                  <span className="bg-[#00B7EB]/10 text-[#00B7EB] px-3 py-1 rounded-full text-sm font-medium">
                    16 Products
                  </span>
                </div>
                <p className="text-gray-600 mb-4">High-performance laptops for work and play</p>
                <Link 
                  href="/products?category=laptops"
                  className="inline-flex items-center text-[#00B7EB] hover:text-[#0095C0] transition-colors group-hover:translate-x-2 duration-300"
                >
                  <span>View Collection</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Accessories Category */}
            <div className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="h-48 relative">
                <Image 
                  src="/product/gadget.webp" 
                  alt="Accessories" 
                  layout="fill" 
                  objectFit="cover" 
                />
              </div>
              <div className="p-6 relative">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[#00B7EB] font-semibold text-xl">Accessories</h3>
                  <span className="bg-[#00B7EB]/10 text-[#00B7EB] px-3 py-1 rounded-full text-sm font-medium">
                    32 Products
                  </span>
                </div>
                <p className="text-gray-600 mb-4">Essential accessories for your devices</p>
                <Link 
                  href="/products?category=accessories"
                  className="inline-flex items-center text-[#00B7EB] hover:text-[#0095C0] transition-colors group-hover:translate-x-2 duration-300"
                >
                  <span>View Collection</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* View All Categories Button */}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-[#00B7EB] text-white rounded-full hover:bg-[#0095C0] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">View All Categories</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00B7EB] to-[#0095C0] bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-gray-600">Discover our most popular and trending products</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* iPhone 14 Pro */}
            <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/product/iphone.webp"
                  alt="iPhone 14 Pro"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-4 right-4 space-y-2">
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-[#00B7EB] hover:text-white transition-colors duration-200" title="Quick View">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-[#00B7EB] hover:text-white transition-colors duration-200" title="Add to Wishlist">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* New Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#00B7EB] text-white text-xs font-semibold rounded-full">New</span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">iPhone 14 Pro</h3>
                  <p className="text-sm text-gray-600">iPhone 14 Pro with 512gb Storage</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-[#00B7EB]">$999</p>
                    <p className="text-sm text-gray-500 line-through">$1099</p>
                  </div>
                  <button className="flex items-center justify-center p-3 bg-[#00B7EB] rounded-full text-white hover:bg-[#0095C0] transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Apple Watch */}
            <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/product/applewatch.webp"
                  alt="Apple Watch"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-4 right-4 space-y-2">
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-[#00B7EB] hover:text-white transition-colors duration-200" title="Quick View">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-[#00B7EB] hover:text-white transition-colors duration-200" title="Add to Wishlist">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Sale Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">Sale</span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Apple Watch Series 8</h3>
                  <p className="text-sm text-gray-600">Series 8 with GPS</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-[#00B7EB]">$399</p>
                    <p className="text-sm text-gray-500 line-through">$449</p>
                  </div>
                  <button className="flex items-center justify-center p-3 bg-[#00B7EB] rounded-full text-white hover:bg-[#0095C0] transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* iPad Mini */}
            <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/product/ipad.webp"
                  alt="iPad Mini"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-4 right-4 space-y-2">
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-[#00B7EB] hover:text-white transition-colors duration-200" title="Quick View">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-[#00B7EB] hover:text-white transition-colors duration-200" title="Add to Wishlist">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Best Seller Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">Best Seller</span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">iPad Mini</h3>
                  <p className="text-sm text-gray-600">8.3-inch Liquid Retina display</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-[#00B7EB]">$499</p>
                    <p className="text-sm text-gray-500 line-through">$549</p>
                  </div>
                  <button className="flex items-center justify-center p-3 bg-[#00B7EB] rounded-full text-white hover:bg-[#0095C0] transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Asus Vivobook */}
            <div className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/product/laptop.jpg"
                  alt="Asus Vivobook"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-4 right-4 space-y-2">
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-[#00B7EB] hover:text-white transition-colors duration-200" title="Quick View">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-lg hover:bg-[#00B7EB] hover:text-white transition-colors duration-200" title="Add to Wishlist">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Limited Stock Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">Limited Stock</span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Asus Vivobook 15</h3>
                  <p className="text-sm text-gray-600">15.6" FHD, Intel Core i5</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-[#00B7EB]">$699</p>
                    <p className="text-sm text-gray-500 line-through">$799</p>
                  </div>
                  <button className="flex items-center justify-center p-3 bg-[#00B7EB] rounded-full text-white hover:bg-[#0095C0] transition-colors duration-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* View All Products Button */}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-[#00B7EB] text-white rounded-full hover:bg-[#0095C0] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="mr-2">View All Products</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-gradient-to-b from-[#E5E4E2]/5 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300B7EB' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }} />
        </div>

        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00B7EB] to-[#0095C0] bg-clip-text text-transparent">
              Special Offers
            </h2>
            <p className="text-gray-600">Limited time deals on premium products</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl relative overflow-hidden group">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00B7EB]/20 to-[#0095C0]/20 rounded-bl-[100px] transform transition-transform duration-500 group-hover:scale-110"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#00B7EB]/10 to-[#0095C0]/10 rounded-tr-[80px] transform transition-transform duration-500 group-hover:scale-110"></div>

              <div className="relative">
                <h3 className="text-4xl font-bold text-gray-800 mb-4">Flash Sale!</h3>
                <p className="text-xl text-gray-600 mb-6">Get up to 20% off on all accessories</p>

                {/* Countdown Timer */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  <div className="bg-[#00B7EB]/5 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#00B7EB]">02</div>
                    <div className="text-sm text-gray-600">Days</div>
                  </div>
                  <div className="bg-[#00B7EB]/5 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#00B7EB]">18</div>
                    <div className="text-sm text-gray-600">Hours</div>
                  </div>
                  <div className="bg-[#00B7EB]/5 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#00B7EB]">45</div>
                    <div className="text-sm text-gray-600">Minutes</div>
                  </div>
                  <div className="bg-[#00B7EB]/5 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-[#00B7EB]">30</div>
                    <div className="text-sm text-gray-600">Seconds</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/offers"
                    className="flex items-center px-6 py-3 bg-[#00B7EB] text-white rounded-full hover:bg-[#0095C0] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span className="mr-2">Shop Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <button
                    className="px-6 py-3 border-2 border-[#00B7EB] text-[#00B7EB] rounded-full hover:bg-[#00B7EB] hover:text-white transition-all transform hover:scale-105"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Deal Cards */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-[#00B7EB]/10 p-4 rounded-lg mb-4">
                  <Image
                    src="/product/gadget.webp"
                    alt="Tech Accessories"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Tech Accessories</h4>
                <p className="text-[#00B7EB] font-bold">Save 20%</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-[#00B7EB]/10 p-4 rounded-lg mb-4">
                  <Image
                    src="/product/applewatch.webp"
                    alt="Smartwatches"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Smartwatches</h4>
                <p className="text-[#00B7EB] font-bold">Up to 15% Off</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-[#00B7EB]/10 p-4 rounded-lg mb-4">
                  <Image
                    src="/product/laptop.jpg"
                    alt="Laptops"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Laptops</h4>
                <p className="text-[#00B7EB] font-bold">From $699</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-[#00B7EB]/10 p-4 rounded-lg mb-4">
                  <Image
                    src="/product/iphone.webp"
                    alt="Smartphones"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Smartphones</h4>
                <p className="text-[#00B7EB] font-bold">Save $100</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#E5E4E2] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300B7EB' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }} />
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Log in Registration */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Column: Content */}
                <div className="p-12">
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#00B7EB] to-[#0095C0] bg-clip-text text-transparent">
                    Join The Gadgeto Community
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#00B7EB]/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#00B7EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Track Your Orders</h3>
                        <p className="text-gray-600">Monitor your orders and shipping status</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#00B7EB]/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#00B7EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Wishlist</h3>
                        <p className="text-gray-600">Save your favorite items for later</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#00B7EB]/10 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#00B7EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800">Exclusive Deals</h3>
                        <p className="text-gray-600">Get access to member-only offers</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col md:flex-row gap-4">
                    <Link 
                      href="/login"
                      className="flex-1 bg-[#00B7EB] text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 hover:bg-[#0095C0] shadow-lg hover:shadow-xl text-center"
                    >
                      Login
                    </Link>
                    <Link 
                      href="/signup"
                      className="flex-1 bg-white text-[#00B7EB] px-8 py-3 rounded-lg font-semibold border-2 border-[#00B7EB] transition-all transform hover:scale-105 hover:bg-[#00B7EB] hover:text-white text-center"
                    >
                      Sign Up
                    </Link>
                  </div>

                  {/* Social Media Login */}
                  <div className="mt-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                        </svg>
                      </button>
                      <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </button>
                      <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Image/Pattern */}
                <div className="relative hidden md:block bg-gradient-to-br from-[#00B7EB] to-[#0095C0]">
                  <div className="absolute inset-0 pattern-dots opacity-10"></div>
                  <div className="h-full flex items-center justify-center p-12">
                    <div className="text-white max-w-sm">
                      <h3 className="text-2xl font-bold mb-4">Welcome to The Gadgeto</h3>
                      <p className="mb-6">Join our community of tech enthusiasts and get exclusive access to the latest gadgets and deals.</p>
                      <ul className="space-y-4">
                        <li className="flex items-center">
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Early access to sales
                        </li>
                        <li className="flex items-center">
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Free shipping on first order
                        </li>
                        <li className="flex items-center">
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          24/7 premium support
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
