'use client';

export default function Footer() {
  return (
    <footer className="bg-[#E5E4E2]">
      <div className="text-center">
              <h2 className="text-[#00B7EB] font-bold mb-6">Contact Us</h2>
              <div className="space-y-4 max-w-md mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all transform hover:scale-105">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#00B7EB] mb-2">Email</h3>
                    <p className="text-gray-700">tanjilm445@gmail.com</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-[#00B7EB] mb-2">Phone</h3>
                    <p className="text-gray-600">Customer Support: +8801797241407</p>
                  </div>
                </div>
              </div>
            </div>
        <div className="container mx-auto px-6 py-4">
          <div className="text-center md:text-right">
            <p className="text-gray-600">The Gadgeto</p>
          </div>
        </div>
    </footer>
  );
}
