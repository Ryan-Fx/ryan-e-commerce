import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <div className=" bg-slate-100 py-10 px-40 grid grid-cols-3">
        <div className="space-y-4">
          <h2 className="font-semibold text-slate-600">Customer Service</h2>
          <ul className="space-y-3 text-sm text-slate-500">
            <li>Help Center</li>
            <li>Payment Methods</li>
            <li>Free Shipping</li>
            <li>Return & Refund</li>
            <li>Shopee Guarantee</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="font-semibold text-slate-600">About Ryan Store</h2>
          <ul className="space-y-3 text-sm text-slate-500">
            <li>About Us</li>
            <li>Shopee Policies</li>
            <li>Privacy Policy</li>
            <li>Flash Deals</li>
            <li>Media Contact</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h2 className="font-semibold text-slate-600">Follow Us</h2>
          <div className="space-y-3 text-sm text-slate-500">
            <p className="flex gap-2">
              <FaFacebook size={20} /> Facebook
            </p>
            <p className="flex gap-2">
              <FaInstagram size={20} /> Instagram
            </p>
            <p className="flex gap-2">
              <FaTwitter size={20} /> Twitter
            </p>
            <p className="flex gap-2">
              <FaLinkedin size={20} /> LinkedIn
            </p>
          </div>
        </div>
      </div>
      <div className="w-full p-3 bg-slate-100 pt-10">
        <p className="text-sm text-slate-500 text-center hover:text-purple-500 transition">
          &copy; 2024 Ryan Store.😎 All rights reserved.
        </p>
      </div>
    </div>
  );
}
