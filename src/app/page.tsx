import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopMart</h1>
          <p className="text-xl max-w-2xl mb-8">
            Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with
            fast shipping and excellent customer service.
          </p>
          <Link href="/Products" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:text-white hover:bg-black transition duration-300">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Category Cards */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Link rel="stylesheet" href="/Categories">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src='/techImage.jpg'
                    alt="Technology"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Technology</h3>
                  <p className="text-gray-600">Latest gadgets and electronics</p>
                </div>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Link href="/Categories">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src='/fashImage.webp'
                    alt="Fashion"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Fashion</h3>
                  <p className="text-gray-600">Trendy clothing and accessories</p>
                </div>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Link href="/Categories">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src='/marketImage.jpg'
                    alt="Lifestyle"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Groceries</h3>
                  <p className="text-gray-600">Home and living products</p>
                </div>
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
              <Link href="/Categories">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src='/booksImage.avif'
                    alt="Special Deals"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Books</h3>
                  <p className="text-gray-600">Explore our collection of books</p>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">All products meet our high standards</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick delivery to your doorstep</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Excellent Support</h3>
              <p className="text-gray-600">24/7 customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for the latest products and exclusive offers
          </p>
          <div className="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
            <input
              suppressHydrationWarning
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l bg-white sm:rounded-r-none sm:rounded-l focus:outline-none text-gray-800"
            />
            <button suppressHydrationWarning className="bg-black text-white font-bold py-3 px-6 mt-2 sm:mt-0 sm:rounded-r hover:bg-gray-100 hover:text-blue-600 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}