import React from "react";
import {
    FaFacebookSquare,
    FaTwitterSquare,
    FaRedditSquare,
    FaWhatsappSquare,
} from "react-icons/fa";
const SocialShareButtons = ({ url, title }) => {
    return (
        <div className="w-full flex justify-between">
            <a
                href={`https://www.facebook.com/dialog/share?app_id=${process.env.REACT_APP_FACEBOOK_APP_ID}&display=popup&href=${url}`}
                target="_blank"
                rel="noreferrer"
            >
                <FaFacebookSquare className="text-[#3B5998] w-12 h-auto" />
            </a>
            <a
                href={`https://twitter.com/intent/tweet/?url=${url}`}
                target="_blank"
                rel="noreferrer"
            >
                <FaTwitterSquare className="text-[#00acee] w-12 h-auto" />
            </a>
            <a
                href={`http://www.reddit.com/submit?url=${url}&title=${title}`}
                target="_blank"
                rel="noreferrer"
            >
                <FaRedditSquare className="text-[#ff4500] w-12 h-auto" />
            </a>
            <a
                href={`https://api.whatsapp.com/send/?text=${url}`}
                target="_blank"
                rel="noreferrer"
            >
                <FaWhatsappSquare className="text-[#25D366] w-12 h-auto" />
            </a>
        </div>
    );
};

export default SocialShareButtons;
