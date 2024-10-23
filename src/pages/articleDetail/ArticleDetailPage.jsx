import React, { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import BreadCrumbs from "../../components/BreadCrumbs";
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
    const [breadCrumbsData, setBreadCrumbsData] = useState([]);
    const [likedPost, setLikedPost] = useState(false);
    const [typeComment, setTypeComment] = useState(false);
    const [login, setLogin] = useState(false);
    const [positive, setPositive] = useState(0);
    const [negative, setNegative] = useState(0);
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSinglePosts({ slug }),
        queryKey: ["blog", slug],
        onSuccess: (data) => {
            setBreadCrumbsData([
                { name: "Home", link: "/" },
                { name: "Blog", link: "/blog" },
                { name: "Article Title", link: `/blog/${data.slug}` },
            ]);
        },
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
    let classname = "w-4 h-auto";

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
    // client side rendering api 1 starts
    const analyzePost = (data) => {
        let string = "";
        return new Promise(async (resolve, reject) => {
            try {
                for (let i = 0; i < data.body.content.length; i++) {
                    for (
                        let j = 0;
                        j < data.body.content[i].content.length;
                        j++
                    ) {
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
                        "X-RapidAPI-Key":
                            "5b73e136cfmsh8bf75048987ecefp1a5b72jsn3fca4e2107f4",
                        "X-RapidAPI-Host":
                            "webit-text-analytics.p.rapidapi.com",
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
    // client side rendering api 1 ends

    // client side rendering api 2 starts
    const soundPost = () => {
        let sound_string = "";
        return new Promise(async (resolve, reject) => {
            try {
                for (let i = 0; i < data.body.content.length; i++) {
                    for (
                        let j = 0;
                        j < data.body.content[i].content.length;
                        j++
                    ) {
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
                        "X-RapidAPI-Key":
                            "5b73e136cfmsh8bf75048987ecefp1a5b72jsn3fca4e2107f4",
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
    // client side rendering api 2 ends

    // server side data render api 1 starts
    // const{mutate: playSound} = useMutation({
    //     mutationFn:
    // })

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
                <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                    <article className="flex-1">
                        <BreadCrumbs data={breadCrumbsData} />
                        <img
                            className="rounded-xl w-full"
                            src={
                                data?.photo
                                    ? stables.UPLOAD_FOLDER_BASE_URL +
                                      data?.photo
                                    : images.samplePostImage
                            }
                            alt={data?.title}
                        />
                        <div className="mt-4 flex gap-2">
                            {data?.categories.map((category) => (
                                <Link
                                    to={`/blog?category=${category.name}`}
                                    className="text-primary text-sm font-roboto inline-block md:text-base"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                        <h1 className="text-xl font-medium font-roboto mt-4 text-dark-hard md:text-[26px]">
                            {data?.title}
                        </h1>
                        <div className="w-full">
                            {!isLoading && !isError && (
                                <Editor content={data?.body} editable={false} />
                            )}
                        </div>
                        {login && (
                            <div className="flex flex-row justify-end">
                                <button
                                    className="flex flex-row"
                                    onClick={addLikes}
                                >
                                    {likedPost ? (
                                        <AiFillHeart
                                            id="fill"
                                            color="RED"
                                            className={classname}
                                            onClick={likeChange}
                                        />
                                    ) : (
                                        <AiOutlineHeart
                                            id="empty"
                                            className={classname}
                                            onClick={likeChange}
                                        />
                                    )}

                                    <div className="px-2 py-2">Like</div>
                                </button>
                                <button
                                    className="flex flex-row"
                                    onClick={addComment}
                                >
                                    <FiMessageSquare className="w-4 h-auto" />
                                    <div className="px-2 py-2">Comment</div>
                                </button>
                            </div>
                        )}
                        {typeComment && (
                            <CommentContainer
                                comments={data?.comments}
                                className="mt-10"
                                logginedUserId={userState?.userInfo?._id}
                                postSlug={slug}
                            />
                        )}
                    </article>
                    <div>
                        <SuggestedPosts
                            header="Latest Article"
                            posts={postsData?.data}
                            tags={data?.tags}
                            className="mt-8 lg:mt-0 lg:max-w-xs"
                        />
                        <div className="mt-7">
                            <h2 className="font-roboto font-medium text-dark-hard mb-4 md:text-xl">
                                Share on
                            </h2>
                            <SocialShareButtons
                                url={encodeURI(window.location.href)}
                                title={encodeURIComponent(data?.title)}
                            />
                        </div>
                        <div>
                            <button
                                className="mt-5 ml-8 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
                                onClick={sentimentAnalyze}
                            >
                                Analyze the Sentiment
                            </button>
                            <button className="ml-3 mt-2" onClick={playText}>
                                <HiSpeakerWave size="40px" color="blue" />
                            </button>
                        </div>
                        {
                            <div className="py-5">
                                Positive: {positive} %
                                <br />
                                Negative: {negative} %
                            </div>
                        }
                    </div>
                </section>
            )}
        </MainLayout>
    );
};

export default ArticleDetailPage;
