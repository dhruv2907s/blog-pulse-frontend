import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getInsights } from "../../../../services/index/posts";
import stables from "../../../../constants/stables";
import images from "../../../../constants/images";

let isFirstRun = true;
const Insights = () => {
    const emailID = JSON.parse(localStorage.getItem("account")).email;
    const userState = useSelector((state) => state.user);
    // const [currentPage, setCurrentPage] = useState(1);

    const {
        data: insightsData,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryFn: () => getInsights(userState.userInfo.token, emailID),
        queryKey: ["insightsOfPost"],
    });

    useEffect(() => {
        if (isFirstRun) {
            isFirstRun = false;
            return;
        }
        refetch();
    }, [refetch]);
    return (
        <div>
            <h1 className="text-2xl font-semibold">Comments</h1>
            <div className="w-full px-4 mx-auto">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0"></div>
                    <h2 className="text-2xl leading-tight">Post Insights</h2>
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                >
                                    Post Title
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                >
                                    Comment Count
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                >
                                    Likes Count
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                ></th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading || isFetching ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-10 w-full"
                                    >
                                        Loading...
                                    </td>
                                </tr>
                            ) : insightsData?.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-10 w-full"
                                    >
                                        No Posts found
                                    </td>
                                </tr>
                            ) : (
                                insightsData?.postsData?.map((post) => (
                                    <tr key={post._id}>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <a
                                                        href="/"
                                                        className="relative block"
                                                    >
                                                        <img
                                                            src={
                                                                post?.photo
                                                                    ? stables.UPLOAD_FOLDER_BASE_URL +
                                                                      post?.photo
                                                                    : images.noImage
                                                            }
                                                            alt={post.title}
                                                            className="mx-auto object-cover rounded-lg w-10 aspect-square"
                                                        />
                                                    </a>
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {post.title}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        {insightsData?.commentDetail?.map(
                                            (comment) => (
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                    <p className="text-gray-900 whitespace-wrap">
                                                        {
                                                            comment.commentData
                                                                .length
                                                        }
                                                    </p>
                                                </td>
                                            )
                                        )}

                                        {insightsData?.likeDetail?.map(
                                            (like) => (
                                                <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                                                    <p className="text-gray-900 whitespace-wrap">
                                                        {like.likeData.count}
                                                    </p>
                                                </td>
                                            )
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Insights;
