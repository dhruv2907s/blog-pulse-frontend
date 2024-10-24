import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { images, stables } from "../../constants";
import { Link, useParams } from "react-router-dom";
import SuggestedPosts from "./container/SuggestedPosts";
import CommentContainer from "../../components/comments/CommentsContainer";
import SocialShareButtons from "../../components/SocialShareButtons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllPosts, getSinglePosts } from "../../services/index/posts";
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { useSelector } from "react-redux";
import Editor from "../../components/editor/Editor";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { HiSpeakerWave } from "react-icons/hi2";
import { likesCount } from "../../services/index/likes";
import { toast } from "react-hot-toast";
import axios from "axios";

const ArticleDetailPage = () => {
    let likeStat = "empty";
    const { slug } = useParams();
    const userState = useSelector((state) => state.user);
    const [likedPost, setLikedPost] = useState(false);
    const [typeComment, setTypeComment] = useState(false);
    const [login, setLogin] = useState(false);
    const [positive, setPositive] = useState(0);
    const [negative, setNegative] = useState(0);

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSinglePosts({ slug }),
        queryKey: ["blog", slug],
    });

    const { mutate: mutateLikes } = useMutation({
        mutationFn: ({ slug, token }) => {
            return likesCount({ slug, token });
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const addLikes = () => {
        mutateLikes({ slug, token: userState?.userInfo?.token });
    };

    const addComment = () => {
        setTypeComment(!typeComment);
    };

    const likeChange = () => {
        if (likeStat === "empty") {
            likeStat = "fill";
        } else {
            likeStat = "empty";
        }
        setLikedPost(!likedPost);
        addLikes();
    };

    const { data: postsData } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"],
    });

    const analyzePost = (data) => {
        let string = "";
        return new Promise(async (resolve, reject) => {
            try {
                for (let i = 0; i < data.body.content.length; i++) {
                    for (let j = 0; j < data.body.content[i].content.length; j++) {
                        string += data.body.content[i].content[j].text;
                    }
                }
                const options = {
                    method: "POST",
                    url: "https://webit-text-analytics.p.rapidapi.com/sentiment",
                    params: {
                        text: string,
                        language: "en",
                    },
                    headers: {
                        "content-type": "application/json",
                        "X-RapidAPI-Key": "5b73e136cfmsh8bf75048987ecefp1a5b72jsn3fca4e2107f4",
                        "X-RapidAPI-Host": "webit-text-analytics.p.rapidapi.com",
                    },
                    data: {
                        key1: "value",
                        key2: "value",
                    },
                };
                const response = await axios.request(options);
                const obj = {
                    positive: response?.data?.data?.sentiment?.positive,
                    negative: response?.data?.data?.sentiment?.negative,
                };
                if (obj) {
                    resolve(obj);
                } else {
                    resolve("Not Found");
                }
            } catch (error) {
                reject(error);
            }
        });
    };

    const sentimentAnalyze = () => {
        analyzePost(data)
            .then((result) => {
                setPositive((result.positive * 100).toFixed(2));
                setNegative((result.negative * 100).toFixed(2));
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const soundPost = () => {
        let sound_string = "";
        return new Promise(async (resolve, reject) => {
            try {
                for (let i = 0; i < data.body.content.length; i++) {
                    for (let j = 0; j < data.body.content[i].content.length; j++) {
                        sound_string += data.body.content[i].content[j].text;
                    }
                }
                const options = {
                    method: "GET",
                    url: "https://text-to-speech27.p.rapidapi.com/speech",
                    params: {
                        text: sound_string,
                        lang: "en-us",
                    },
                    headers: {
                        "X-RapidAPI-Key": "5b73e136cfmsh8bf75048987ecefp1a5b72jsn3fca4e2107f4",
                        "X-RapidAPI-Host": "text-to-speech27.p.rapidapi.com",
                    },
                    responseType: "arraybuffer",
                };
                const response = await axios.request(options);
                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });
    };

    const playText = () => {
        soundPost()
            .then((data) => {
                const audio = new Audio();
                audio.src = URL.createObjectURL(
                    new Blob([data], { type: "audio/mpeg" })
                );
                audio.onloadedmetadata = () => {
                    audio.play();
                };
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        if (userState?.userInfo?.token) setLogin(true);
    }, [userState?.userInfo?.token, setLogin]);

    return (
        <MainLayout>
            {isLoading ? (
                <ArticleDetailSkeleton />
            ) : isError ? (
                <ErrorMessage message="Couldn't fetch the post details." />
            ) : (
                <section className="container mx-auto max-w-5xl flex flex-col px-5 py-10 lg:flex-row lg:gap-x-8 lg:items-start bg-gradient-to-r from-blue-50 to-blue-100 shadow-md rounded-lg">
                    <article className="flex-1">
                        <div className="flex gap-3 mb-8 text-sm">
                            <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">
                                Home
                            </Link>
                            <span className="text-gray-400">/</span>
                            <Link to="/blog" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200">
                                Blog
                            </Link>
                        </div>
                        <img
                            className="rounded-2xl w-full shadow-lg hover:shadow-xl transition-shadow duration-300"
                            src={
                                data?.photo
                                    ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                                    : images.samplePostImage
                            }
                            alt={data?.title}
                        />
                        <div className="mt-8 flex gap-3">
                            {data?.categories.map((category) => (
                                <Link
                                    key={category.name}
                                    to={`/blog?category=${category.name}`}
                                    className="text-primary text-sm font-roboto inline-block md:text-base bg-blue-50 px-4 py-1 rounded-full hover:bg-blue-100 transition-colors duration-200"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                        <h1 className="text-3xl font-bold font-roboto mt-6 mb-8 text-gray-900 md:text-4xl lg:text-5xl transition-all duration-300 hover:underline">
                            {data?.title}
                        </h1>
                        <div className="w-full prose prose-lg max-w-none">
                            {!isLoading && !isError && (
                                <Editor content={data?.body} editable={false} />
                            )}
                        </div>
                        {login && (
                            <div className="flex flex-row justify-end gap-4 mt-8 mb-6">
                                <button
                                    className="flex flex-row items-center hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-200"
                                    onClick={addLikes}
                                >
                                    {likedPost ? (
                                        <AiFillHeart
                                            id="fill"
                                            color="RED"
                                            className="w-5 h-5"
                                            onClick={likeChange}
                                        />
                                    ) : (
                                        <AiOutlineHeart
                                            id="empty"
                                            className="w-5 h-5"
                                            onClick={likeChange}
                                        />
                                    )}
                                    <span className="ml-2 font-medium">Like</span>
                                </button>
                                <button
                                    className="flex flex-row items-center hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-200"
                                    onClick={addComment}
                                >
                                    <FiMessageSquare className="w-5 h-5" />
                                    <span className="ml-2 font-medium">Comment</span>
                                </button>
                                <button
                                    className="flex flex-row items-center hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-200"
                                    onClick={playText}
                                >
                                    <HiSpeakerWave className="w-5 h-5" />
                                    <span className="ml-2 font-medium">Listen</span>
                                </button>
                            </div>
                        )}
                        <div className="mt-6">
                            <p className="font-roboto font-medium text-lg text-gray-600">
                                Sentiment Analysis:
                            </p>
                            <button
                                className="inline-block text-lg font-medium mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                                onClick={sentimentAnalyze}
                            >
                                Check Sentiment
                            </button>
                            <p className="mt-4 text-lg">
                                Positive: {positive}% | Negative: {negative}%
                            </p>
                        </div>
                        <div className="mt-12">
                            <SocialShareButtons title={data?.title} />
                        </div>
                    </article>
                    <div className="lg:w-[30%] w-full mt-12 lg:mt-0">
                        <SuggestedPosts
                            isLoading={isLoading}
                            isError={isError}
                            posts={postsData}
                        />
                    </div>
                </section>
            )}
            {typeComment && (
                <div className="mt-6 container mx-auto max-w-5xl">
                    <CommentContainer />
                </div>
            )}
        </MainLayout>
    );
};

export default ArticleDetailPage;
