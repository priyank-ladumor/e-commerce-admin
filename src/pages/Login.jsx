/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState, useEffect } from 'react'
import { yupResolver } from "@hookform/resolvers/yup";
// eslint-disable-next-line import/no-extraneous-dependencies
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { adminLogin } from '../store/action/authAction';

const schema = yup.object({
    email: yup.string().email().required("please enter your email"),
    password: yup
        .string()
        .min(6)
        .required("Please enter your password")
});

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { adminLoginError, adminLoginRole } = useSelector((state) => state.auth)

    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [isVerify, setIsVerify] = useState(false)
    const onChangeCaptcha = () => {
        setIsVerify(!isVerify)
    }

    const auth = localStorage.getItem("token")
    useEffect(() => {
        if (auth && adminLoginRole === "ADMIN") {
            navigate("/")
        } else if (auth && adminLoginRole === "CUSTOMER") {
            toast.error('Please enter admin gmail', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth, adminLoginRole])

    const onsubmit = async (data) => {
        if (data && (isVerify === true)) {
            const items = {
                email: data.email,
                password: data.password
            }
            dispatch(adminLogin(items))
            reset();

        } else {
            toast.error('Please solve the captcha ', {
                position: "top-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div>
            <div className=" min-h-full h-screen  px-6 py-12  grid place-content-center md:me-[200px]">
                <div className="border-2 border-gray-300 bg-white py-12 px-8 w-[100%] md:w-[150%] ">
                    <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            className="mx-auto h-16 rounded-lg w-auto  flex justify-center items-center"
                            src="https://i.imgur.com/d7MoWpc.png"
                            alt="Your Company"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to Shoppy.io admin
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit(onsubmit)} noValidate>
                            {
                                adminLoginError &&
                                <div>
                                    <span className="inline-flex w-[100%] items-center justify-center rounded-md bg-red-50 px-2 py-1 text-xl font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                        {adminLoginError}
                                    </span>
                                </div>
                            }
                            <div>
                                <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                    <TextField
                                        error={errors && errors.email?.message}
                                        id="standard-error-helper-text"
                                        label="Email Address"
                                        type='email'
                                        {...register("email")}
                                        helperText={errors && errors.email?.message}
                                        variant="filled" />
                                </FormControl>
                            </div>
                            <div>
                                <FormControl fullWidth sx={{ m: 0 }} size="large" >
                                    <TextField
                                        error={errors && errors.password?.message}
                                        id="standard-error-helper-text"
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        helperText={errors && errors.password?.message}
                                        variant="filled" />
                                </FormControl>
                            </div>
                            <div className="text-sm">
                                <div className="flex gap-x-1 justify-between">
                                    <div>
                                        <div className="flex h-6 items-center">

                                            {showPassword ? <Visibility onClick={() => setShowPassword(!showPassword)} /> : <VisibilityOff onClick={() => setShowPassword(!showPassword)} />}
                                            <div className="text-sm ms-1 leading-6">
                                                <label htmlFor="passwordshow" className="font-medium  text-gray-900">
                                                    Show Password
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm">
                                <div className="captcha" style={{ transform: "scale(0.85)", transformOrigin: "0 0" }}>
                                    <ReCAPTCHA
                                        sitekey={import.meta.env.VITE_APP_CAPTCHA_SITE_KEY}
                                        onChange={onChangeCaptcha}
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login
