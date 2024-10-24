import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { stables } from "../../../constants";
import { toast } from "react-hot-toast";
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { HiOutlineCamera } from 'react-icons/hi';
import { useSelector } from "react-redux";
import { images } from "../../../constants";
import ArticleCard from '../../../components/ArticleCard';
import ArticleCardSkeleton from '../../../components/ArticleCardSkeleton';
import ErrorMessage from '../../../components/ErrorMessage';
import { getAllPosts } from "../../../services/index/posts";
import {ManagePosts} from "../../admin/screens/posts/ManagePost"

const Header = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = {
    name: userState.userInfo.name,
    avatar: userState.userInfo.avatar
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img className="h-10" src={images.blog_pulse_logo_black} alt="logo" />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-lg font-semibold ${
                location.pathname === "/"
                  ? "text-primary"
                  : "text-primary-foreground hover:text-primary"
              } transition-colors relative group`}
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-primary-foreground hover:text-primary focus:outline-none"
              >
                {user.avatar ? (
                  <img 
                    src={stables.UPLOAD_FOLDER_BASE_URL + user.avatar}
                    alt="profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-50/50 flex justify-center items-center">
                    <HiOutlineCamera className="w-4 h-auto text-primary" />
                  </div>
                )}
                <span>{user.name}</span>
                <FaChevronDown className={`transform ${isDropdownOpen ? 'rotate-180' : ''} transition-transform`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg py-1 z-10">
                  
                  <Link
                    to="/new-post"
                    className="block px-4 py-2 text-sm text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    Create New Post
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

const ArticleScroll = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = data?.data.filter(post => {
    if (!debouncedSearchTerm.trim()) return true;
    
    const searchTerms = debouncedSearchTerm.toLowerCase().split(' ');
    const titleLower = post.title?.toLowerCase() || '';
    const excerptLower = post.excerpt?.toLowerCase() || '';
    const contentLower = post.content?.toLowerCase() || '';
    const authorNameLower = post.user?.name?.toLowerCase() || '';
    const tagsLower = post.tags?.map(tag => tag.toLowerCase()) || []; // Convert tags to lowercase array
    
    return searchTerms.every(term => 
      titleLower.includes(term) || 
      excerptLower.includes(term) || 
      contentLower.includes(term) ||
      authorNameLower.includes(term) ||
      tagsLower.some(tag => tag.includes(term)) // Check if any tag matches the search term
    );
}) || [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 text-center mb-12">
            Discover Amazing Blog Posts
          </h1>
          <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search by title, content, author, tags, or keywords..."
            className="w-full p-4 pr-12 rounded-full border-2 border-primary/30 focus:border-primary focus:outline-none bg-background text-primary-foreground"
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search articles"
          />
            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-foreground/60" />
          </div>
          <div className="space-y-8">
            {isLoading ? (
              [...Array(5)].map((_, index) => (
                <ArticleCardSkeleton key={index} />
              ))
            ) : isError ? (
              <ErrorMessage message="Couldn't fetch blog posts" />
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <ArticleCard key={post._id} post={post} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-primary-foreground text-lg mb-2">
                  No posts found matching "{searchTerm}"
                </p>
                <p className="text-primary-foreground/60">
                  Try adjusting your search terms or browse all posts
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleScroll;