import React, { useState } from "react";
const CommentForm = ({
    btnLabel,
    formSubmitHandler,
    formCancelHandler = null,
    initialText = "",
    loading = false,
}) => {
    const [value, setValue] = useState(initialText);
    const submitHandler = (event) => {
        event.preventDefault();
        formSubmitHandler(value);
        setValue("");
    };
    return (
        <form onSubmit={submitHandler} className="mt-8">
            <div className="flex flex-col items-end border border-primary rounded-lg p-4">
                <textarea
                    className="w-full focus:outline-none bg-transparent"
                    placeholder="Leave your comment here..."
                    rows="5"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                ></textarea>
                <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
                    {formCancelHandler && (
                        <button
                            onClick={formCancelHandler}
                            className="px-6 py-2.5 rounded-lg border border-red-500 text-red-500"
                        >
                            Cancel
                        </button>
                    )}
                    <button
                        disabled={loading}
                        type="submit"
                        className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {btnLabel}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default CommentForm;
