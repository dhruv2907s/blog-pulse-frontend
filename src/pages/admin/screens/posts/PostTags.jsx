import React, { useState, useEffect } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const PostTags = ({ onTagsHandler, tags: initialTags = [] }) => {
  const [tags, setTags] = useState(initialTags);

  const handleChange = (newTags) => {
    setTags(newTags);
    onTagsHandler(newTags); // Pass newTags directly instead of using state
  };

  // Sync with parent component's tags
  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  return (
    <div className="w-full">
      <TagsInput 
        value={tags}
        onChange={handleChange}
        className="react-tagsinput w-full rounded-lg border border-gray-300 p-2 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200"
        tagProps={{
          className: "react-tagsinput-tag bg-blue-500 text-white rounded-md px-2 py-1 m-1",
          classNameRemove: "react-tagsinput-remove text-white ml-2"
        }}
        inputProps={{
          className: "react-tagsinput-input w-32 border-none focus:outline-none",
          placeholder: "Add a tag"
        }}
      />
      <p className="text-sm text-gray-500 mt-2">
        Separate keywords with a comma, space bar, or enter key
      </p>
    </div>
  );
};

export default PostTags;