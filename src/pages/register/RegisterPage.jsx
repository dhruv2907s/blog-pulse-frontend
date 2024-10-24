import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/index/users";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/reducers/userReducer";

const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user);
    const { mutate, isLoading } = useMutation({
        mutationFn: ({ name, email, password }) => signup({ name, email, password }),
        onSuccess: (data) => {
            dispatch(userActions.setUserInfo(data));
            localStorage.setItem("account", JSON.stringify(data));
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        if (userState.userInfo) {
            navigate("/");
        }
    }, [navigate, userState.userInfo]);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const submitHandler = (data) => {
        const { name, email, password } = data;
        mutate({ name, email, password });
    };

    const password = watch("password");

    return (
        <MainLayout>
            <section className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-50">

                <div className="max-w-lg w-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl mt-20 p-8 md:p-10 transition-transform transform hover:scale-[1.02]">
                    <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">Join Us</h2>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                autoComplete="off"
                                type="text"
                                id="name"
                                {...register("name", { required: "Name is required" })}
                                placeholder="Enter your name"
                                className="mt-1 block w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                autoComplete="off"
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                                placeholder="Enter your email"
                                className="mt-1 block w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                {...register("password", {
                                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                                    required: "Password is required",
                                })}
                                placeholder="Enter your password"
                                className="mt-1 block w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) => value === password || "Passwords do not match",
                                })}
                                placeholder="Confirm password"
                                className="mt-1 block w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            disabled={!isValid || isLoading}
                            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 mb-4 rounded-lg font-bold text-lg tracking-wide hover:scale-105 transition disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Registering..." : "Create Account"}
                        </button>
                    </form>
                    
                    <p className="text-sm text-center text-gray-500 mt-6">
                        Already have an account?{" "}
                        <Link to="/login" className="text-indigo-600 font-semibold">Log In</Link>
                    </p>
                </div>

                <footer className="mt-10 py-6 text-center text-sm text-gray-500">
                    &copy; 2024 BlogPulse. All rights reserved.
                </footer>
            </section>
        </MainLayout>
    );
};

export default RegisterPage;
