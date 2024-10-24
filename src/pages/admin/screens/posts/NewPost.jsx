import React, { useState } from "react";
import { HiOutlineCamera } from "react-icons/hi";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../../../services/index/posts";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Editor from "../../../../components/editor/Editor";

const NewPost = () => {
    const labelClassName = "text-gray-800 font-semibold block text-xl mb-2";
    const inputClassName =
        "placeholder:text-gray-400 w-full text-gray-800 my-3 rounded-lg px-4 py-3 font-semibold block outline-none border border-gray-300 shadow-sm transition duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200";
    const buttonClassName =
        "w-full py-3 font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-md";
    const submitButtonClassName = "bg-gradient-to-r from-green-400 to-green-600 text-white mx-2 hover:shadow-lg";
    const discardButtonClassName = "bg-gradient-to-r from-red-400 to-red-600 text-white mx-2 hover:shadow-lg";
    const editorContainerClassName = "mx-10 my-7 flex flex-col justify-center border border-gray-300 rounded-xl shadow-lg p-4 bg-white";
    const imageContainerClassName = "mx-10 pt-7 relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105";
    const imagePreviewClassName = "rounded-lg w-full object-cover h-[200px]";

    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");
    const [body, setBody] = useState(null);
    const [tags, setTags] = useState([]);
    const userState = useSelector((state) => state.user);

    const { mutate } = useMutation({
        mutationFn: ({ postData, token }) => {
            return createPost({
                postData,
                token,
            });
        },
        onSuccess: (data) => {
            toast.success("Post created");
            // Reset form after successful submission
            setPhoto(null);
            setTitle("");
            setCaption("");
            setBody("");
            setTags([]);
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);
    };

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const captionChangeHandler = (event) => {
        setCaption(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const postData = {
            title,
            caption,
            body,
            tags
        };

        let updatedData = new FormData();

        updatedData.append("postPicture", photo);
        updatedData.append("document", JSON.stringify(postData));

        mutate({ postData: updatedData, token: userState.userInfo.token });
    };

    const handleDiscard = () => {
        setPhoto(null);
        setTitle("");
        setCaption("");
        setBody("");
        setTags([]);
    };

    return (
        <form className="container pb-7 bg-gray-100 rounded-lg shadow-lg p-6" onSubmit={submitHandler}>
            {/* heading */}
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Create a New Post</h1>
            
            {/* title and caption */}
            <div className="mx-auto mb-7 max-w-md">
                <label htmlFor="title" className={labelClassName}>Title</label>
                <input
                    type="text"
                    id="title"
                    className={inputClassName}
                    value={title}
                    autoComplete="off"
                    onChange={titleChangeHandler}
                    placeholder="Enter title here..."
                />
                <label htmlFor="caption" className={labelClassName}>Caption</label>
                <input
                    type="text"
                    id="caption"
                    autoComplete="off"
                    placeholder="Enter caption here..."
                    value={caption}
                    onChange={captionChangeHandler}
                    className={inputClassName}
                />
            </div>

            {/* editor */}
            <label className="text-gray-800 font-semibold ml-auto text-xl">Body</label>
            <div className={editorContainerClassName}>
                <Editor
                    editable={true}
                    content={(prevBody) => prevBody}
                    onDataChange={(data) => setBody(data)}
                />
            </div>

            {/* post image */}
            <label className="text-gray-800 font-semibold text-xl ml-auto">Image</label>
            <div className={imageContainerClassName}>
                <label htmlFor="postPicture" className="w-full">
                    {photo ? (
                        <img
                            src={URL.createObjectURL(photo)}
                            alt="post"
                            className={imagePreviewClassName}
                        />
                    ) : (
                        <div className="w-full h-[200px] flex justify-center items-center bg-blue-50 rounded-lg">
                            <HiOutlineCamera className="w-12 h-auto text-blue-500" />
                        </div>
                    )}
                </label>
                <input
                    type="file"
                    className="sr-only"
                    id="postPicture"
                    onChange={handleFileChange}
                />
            </div>

            {/* tags */}
            

            {/* submit button */}
            <div className="mx-auto pt-7 flex flex-row justify-between max-w-md">
                <button
                    className={`${buttonClassName} ${submitButtonClassName}`}
                    type="submit"
                >
                    Post
                </button>
                <button 
                    type="button"
                    className={`${buttonClassName} ${discardButtonClassName}`}
                    onClick={handleDiscard}
                >
                    Discard
                </button>
            </div>
        </form>
    );
};

export default NewPost;