import React from "react";
import { images } from "../../constants";
import { FiSearch } from "react-icons/fi";

const Hero = () => {
    return (
        <section className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-center lg:text-left mb-6">
                        Where creativity and inspiration meet
                    </h1>
                    <p className="text-xl sm:text-2xl text-indigo-100 text-center lg:text-left mb-8">
                        Share your thoughts, learn new things, and connect with like-minded individuals.
                    </p>
                    <div className="relative max-w-xl mx-auto lg:mx-0">
                        <input
                            className="w-full px-6 py-4 rounded-full bg-white bg-opacity-20 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-30 transition duration-300"
                            type="text"
                            placeholder="Search articles..."
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-indigo-600 rounded-full p-2 hover:bg-indigo-100 transition duration-300">
                            <FiSearch className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <div className="lg:w-1/2 mt-12 lg:mt-0">
                    <img
                        className="w-full h-auto rounded-lg shadow-2xl transform hover:scale-105 transition duration-300"
                        src={images.HomePageDemo}
                        alt="Users reading articles"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;