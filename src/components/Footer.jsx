import React from "react";
import { images } from "../constants";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-8 md:mb-0">
                        <img
                            src={images.Logo}
                            alt="logo"
                            className="brightness-0 invert h-8"
                        />
                        <p className="mt-3 text-sm text-gray-400">
                            Build a modern and creative website
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-items-center space-x-4 md:space-x-12">
                        <a href="/" className="hover:text-white transition-colors duration-300 py-2">About</a>
                        <a href="/" className="hover:text-white transition-colors duration-300 py-2">Features</a>
                        <a href="/" className="hover:text-white transition-colors duration-300 py-2">Pricing</a>
                    </div>
                    <div className="flex space-x-6 mt-8 md:mt-0">
                        <a href="https://x.com/home" className="hover:text-white transition-colors duration-300">
                            <AiOutlineTwitter className="w-6 h-6" />
                        </a>
                        <a href="https://www.instagram.com" className="hover:text-white transition-colors duration-300">
                            <AiFillInstagram className="w-6 h-6" />
                        </a>
                        <a href="https://www.facebook.com" className="hover:text-white transition-colors duration-300">
                            <FaFacebook className="w-6 h-6" />
                        </a>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} BlogPulse All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;