import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSinglePosts, updatePosts } from "../../../../services/index/posts";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import parseJsonToHtml from "../../../../utils/parseJSONtoHTML";
import stables from "../../../../constants/stables";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { HiOutlineCamera } from "react-icons/hi";
import Editor from "../../../../components/editor/Editor";

const EditPost = () => {
    const { slug } = useParams();
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);
    const [photo, setPhoto] = useState(null);
    const [body, setBody] = useState(null);
    const [initialPhoto, setInitialPhoto] = useState(null);

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSinglePosts({ slug }),
        queryKey: ["blog", slug],
    });

    const { mutate: mutateUpdatePost, isLoading: isLoadingUpdatePost } =
        useMutation({
            mutationFn: ({ updatedData, slug, token }) => {
                return updatePosts({
                    updatedData,
                    slug,
                    token,
                });
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["blog", slug]);
                toast.success("Post is updated");
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    useEffect(() => {
        if (!isLoading && !isError) {
            setInitialPhoto(data?.photo);
            setBody(parseJsonToHtml(data?.body));
        }
    }, [data, isError, isLoading]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };

    const handleUpdatePost = async () => {
        let updatedData = new FormData();

        if (!initialPhoto && photo) {
            updatedData.append("postPicture", photo);
        } else if (initialPhoto && !photo) {
            const urlToObject = async (url) => {
                let response = await fetch(url);
                let blob = await response.blob();
                const file = new File([blob], initialPhoto, {
                    type: blob.type,
                });
                return file;
            };
            const picture = await urlToObject(
                stables.UPLOAD_FOLDER_BASE_URL + data?.photo
            );

            updatedData.append("postPicture", picture);
        }

        updatedData.append("document", JSON.stringify({ body }));

        mutateUpdatePost({
            updatedData,
            slug,
            token: userState.userInfo.token,
        });
    };

    const handleDeleteImage = () => {
        if (window.confirm("Do you want to delete your Post picture?")) {
            setInitialPhoto(null);
            setPhoto(null);
        }
    };

    return (
        <div>
            {isLoading ? (
                <ArticleDetailSkeleton />
            ) : isError ? (
                <ErrorMessage message="Something went wrong." />
            ) : (
                <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                    <article className="flex-1">
                        <label
                            htmlFor="postPicture"
                            className="w-full cursor-pointer"
                        >
                            {photo ? (
                                <img
                                    src={URL.createObjectURL(photo)}
                                    alt={data?.title}
                                    className="rounded-xl w-full"
                                />
                            ) : initialPhoto ? (
                                <img
                                    src={
                                        stables.uploadFolderBaseUrl +
                                        data?.photo
                                    }
                                    alt={data?.title}
                                    className="rounded-xl w-full"
                                />
                            ) : (
                                <div className="w-full min-h-[200px] h-full bg-blue-50/50 flex justify-center items-center">
                                    <HiOutlineCamera className="w-7 h-auto text-primary" />
                                </div>
                            )}
                        </label>
                        <input
                            type="file"
                            className="sr-only"
                            id="postPicture"
                            onChange={handleFileChange}
                        />
                        <button
                            type="button"
                            className="w-fit bg-red-500 text-sm text-white mt-5 font-semibold rounded-lg px-2 py-1"
                            onClick={handleDeleteImage}
                        >
                            Delete Image
                        </button>
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
                        <div className="w-full my-7 flex flex-col border-2 border-primary rounded-xl">
                            {!isLoading && !isError && (
                                <Editor
                                    content={data?.body}
                                    editable={true}
                                    onDataChange={(data) => setBody(data)}
                                />
                            )}
                        </div>
                        <button
                            disabled={isLoadingUpdatePost}
                            className="w-full bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            onClick={handleUpdatePost}
                            type="button"
                        >
                            Update Post
                        </button>
                    </article>
                </section>
            )}
        </div>
    );
};

export default EditPost;
