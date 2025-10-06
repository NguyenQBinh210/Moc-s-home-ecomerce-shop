import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 lg:py-15  mt-10 flex flex-col items-center">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* subcripe  */}
          <div className="space-y-5">
            <h2>Exclusive</h2>
            <h3>Subcribe</h3>
            <p className="text-gray-400">Get 10% off your first order</p>
            <div
              className="flex items-center gap-2 rounded-md border-[1px]
                  border-gray-500 bg-black text-white"
            >
              <input
                type="email"
                placeholder="Enter your email ..."
                className="w-full p-2 px-4 placeholder-gray-400 rounded-full
                    bg-black"
              />
              <button
                className="text-gray-400 hover:text-white px-4 py-2 rounded-lg 
                    flex items-center justify-center"
              ></button>
            </div>
          </div>
          {/* Support  */}
          <div className="space-y-5">
            <h3 className="text-lg">Support</h3>
            <p className="text-gray-400">Tây Tựu, Bắc Từ Liêm, Hà Nội</p>
            <p className="text-gray-400">nnguyenqbinh210@gmail.com</p>
            <p className="text-gray-400">+84-123456789</p>
            <p className="text-gray-400">Connect with us</p>
          </div>
          {/* Account  */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg">Account</h3>
              <ul className="text-gray-400 space-y-5">
                <li>
                  <a href="#" className="hover:text-white">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Cart
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Wishlist
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Shop
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg">Quick Link</h3>
              <ul className="text-gray-400 space-y-5">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms Of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Dowload  */}
          <div className="space-y-4 lg:px-6">
            <h3 className="text-lg">Download App</h3>
            <p className="text-gray-400">Save $3 with App New User Only</p>
            <div className="flex items-center gap-4">
              <img
                src="https://file.hstatic.net/1000185761/file/dathongbaobocongthuong_f59abb4cba0249a4ab7d8b49f05a0e71.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Moc's Home. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
