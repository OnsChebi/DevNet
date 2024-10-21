import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Registration.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"; 

const Login = () => {
    const navigate = useNavigate(); 

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .min(6, "Must be at least 6 characters")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                console.log("Form data", values);
                const response = await axios.post("http://localhost:3000/auth/login", values);
                const { access_token } = response.data; // Extract token from response
                
                console.log("Login response", response.data);
                
                // Store the token in localStorage
                localStorage.setItem('access_token', access_token);
                
                // Redirect to the /home route after successful login
                navigate('/home');
            } catch (error) {
                console.error("Login error:", error);
            }
        },
    });

    // URLs for Google and GitHub OAuth
    const googleOAuthUrl = "http://localhost:3000/auth/google";
    const githubOAuthUrl = "http://localhost:3000/auth/github";

    return (
        <div className="background">
            <div className="flex flex-col items-center pt-6 sm:justify-center sm:pt-0">
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    placeholder="example@gmail.com"
                                    type="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-600">{formik.errors.email}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-600">{formik.errors.password}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        Don't have an account?{" "}
                        <span>
                            <Link className="text-blue-600 hover:underline" to="/register">
                                Register
                            </Link>
                        </span>
                    </div>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full" />
                        <p className="px-3">OR</p>
                        <hr className="w-full" />
                    </div>
                    <div className="my-6 space-y-2">
                        <button
                            aria-label="Login with Google"
                            type="button"
                            onClick={() => window.location.href = googleOAuthUrl}
                            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                {/* Google logo */}
                            </svg>
                            <p>Login with Google</p>
                        </button>
                        <button
                            aria-label="Login with GitHub"
                            type="button"
                            onClick={() => window.location.href = githubOAuthUrl}
                            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                {/* GitHub logo */}
                            </svg>
                            <p>Login with GitHub</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
