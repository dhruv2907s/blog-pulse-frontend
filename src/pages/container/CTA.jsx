import React from "react";
import { images } from "../../constants";

const CTA = () => {
    return (
        <section className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                            Get our stories delivered from us to your inbox weekly.
                        </h2>
                        <div className="mt-8 sm:flex sm:max-w-md lg:mt-0 lg:ml-0">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full px-5 py-3 placeholder-gray-300 border border-transparent rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                            />
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <button className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-r-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white">
                                    Get Started
                                </button>
                            </div>
                        </div>
                        <p className="mt-6 text-sm text-indigo-100">
                            Get a response tomorrow if you submit by 9pm today. If we receive after 9pm, you'll get a response the following day.
                        </p>
                    </div>
                    <div className="mt-10 lg:mt-0">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-lg transform -rotate-6 scale-105 opacity-50"></div>
                            <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                                <img
                                    src={images.CTA}
                                    alt="Future of Work"
                                    className="w-full h-48 sm:h-56 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900">Future of Work</h3>
                                    <p className="mt-2 text-gray-600">
                                        Majority of people will work in jobs that don't exist today.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;