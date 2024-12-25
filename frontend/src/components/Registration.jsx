import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Registration.css";
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios

const Registration = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .min(6, "Must be at least 6 characters")
                .required("Required"),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post('http://localhost:3000/auth/register', {
                    email: values.email,
                    password: values.password,
                    password_confirmation: values.password_confirmation,
                });
                console.log("Registration successful:", response.data);
                // You can redirect or show a success message here
            } catch (error) {
                console.error("Registration error:", error.response ? error.response.data : error.message);
                // You can show an error message to the user here
            }
        },
    });

    return (
        <div className="background">
            <div className="flex flex-col items-center pt-6 sm:justify-center sm:pt-0 ">
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                    <div>
                        <h2>Register</h2>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    placeholder="mail@gmail.com"
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
                                className="block text-sm font-medium text-gray-700 undefined"
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
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password_confirmation}
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                                {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                                    <div className="text-red-600">{formik.errors.password_confirmation}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600">
                        Already have an account?{" "}
                        <span>
                            <Link className="text-blue-600 hover:underline" to="/login">
                                Log in
                            </Link>
                        </span>
                    </div>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full" />
                        <p className="px-3 ">OR</p>
                        <hr className="w-full" />
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Registration;
