import React from "react";
import { images } from "../../constants";


const Hero = () => {
    return (
        <section className="bg-gradient-to-br from-green-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
                <div className="lg:w-1/2 lg:pr-12">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white text-center lg:text-left mb-6">
                        Where creativity and inspiration meet
                    </h1>
                    <p className="text-xl sm:text-2xl text-indigo-100 text-center lg:text-left mb-8">
                        Share your thoughts, learn new things, and connect with like-minded individuals.
                    </p>
                    
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