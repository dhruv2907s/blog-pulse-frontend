import React from "react";
import { useNavigate } from "react-router-dom";
import ArticleCard from "../../components/ArticleCard";
import { FaArrowRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import ErrorMessage from "../../components/ErrorMessage";

const Articles = () => {
    const navigate = useNavigate(); // Add useNavigate hook
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    return (
        <section className="bg-gradient-to-br from-indigo-50 to-pink-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-12">
                    Latest Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        [...Array(3)].map((item, index) => (
                            <ArticleCardSkeleton key={index} />
                        ))
                    ) : isError ? (
                        <div className="col-span-full">
                            <ErrorMessage message="Couldn't fetch articles" />
                        </div>
                    ) : (
                        data?.data.map((post) => (
                            <ArticleCard key={post._id} post={post} />
                        ))
                    )}
                </div>
                <div className="mt-12 text-center">
                    <button
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition duration-300 ease-in-out"
                        onClick={() => navigate("/feed")} // Navigate to /find
                    >
                        <span>More Articles</span>
                        <FaArrowRight className="ml-2 w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Articles;
