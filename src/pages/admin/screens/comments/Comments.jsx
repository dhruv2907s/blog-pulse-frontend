import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
    deleteComment,
    getAllCommentsofUser,
} from "../../../../services/index/comments";

let isFirstRun = true;
const Comments = () => {
    const emailID = JSON.parse(localStorage.getItem("account")).email;
    const userState = useSelector((state) => state.user);

    const {
        data: commentsData,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryFn: () => getAllCommentsofUser(userState.userInfo.token, emailID),
        queryKey: ["commentsOfUser"],
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
                    <h2 className="text-2xl leading-tight">Your Comments</h2>
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                >
                                    Comment
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                >
                                    Created at
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
                            ) : commentsData?.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center py-10 w-full"
                                    >
                                        No Comments found
                                    </td>
                                </tr>
                            ) : (
                                commentsData?.map((comment) => (
                                    <tr key={comment._id}>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {comment.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                            <p className="text-gray-900 whitespace-wrap">
                                                {new Date(
                                                    comment.createdAt
                                                ).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                                            <button
                                                type="button"
                                                className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                                                onClick={() => {
                                                    deleteComment({
                                                        commentId: comment?._id,
                                                        token: userState
                                                            .userInfo.token,
                                                    });
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>
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

export default Comments;
