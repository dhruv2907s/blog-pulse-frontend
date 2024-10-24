import React from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { userActions } from "../store/reducers/userReducer.js";
const OAuth = () => {
    const dispatch = useDispatch();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            if (result.providerId) {
                localStorage.setItem("google", "true");
            }
            const res = await fetch("api/users/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();
            console.log(data);
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
        } catch (err) {
            console.log("Could not sign in with google!");
        }
    };
    return (
        <div className="flex justify-center">
    <button
        onClick={handleGoogleClick}
        type="button"
        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-lg uppercase hover:opacity-95 flex items-center gap-2"
    >
        <AiOutlineGoogle />
        Continue with Google
    </button>
</div>

    );
};

export default OAuth;
