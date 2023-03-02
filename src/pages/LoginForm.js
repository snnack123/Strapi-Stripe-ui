import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { getStripeUserId } from '../utils/userRequests';
import { loginSchema } from '../utils/yupSchemas';
import { Formik, Form, Field } from 'formik';

export default function LoginForm() {
    const [loginErrors, setLoginErrors] = useState(
        { error: false, message: '' }
    );

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginUser = async (identifier, password) => {
        try {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify({
                    identifier: identifier,
                    password: password,
                }),
                redirect: 'follow'
            }

            await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/local`, requestOptions)
                .then(response => response.json())
                .then(async data => {
                    if (data.jwt) {
                       if (data.user.confirmedAccount) {
                        localStorage.setItem("token", data.jwt);
                        dispatch({ type: 'user/jwt', payload: data.jwt });
                        setLoginErrors({ error: false, message: '' });
                        dispatch({
                            type: 'user/user', payload: {
                                id: data.user.id,
                                username: data.user.username,
                                email: data.user.email,
                                confirmed: data.user.confirmed,
                                blocked: data.user.blocked,
                            }
                        });

                        if (!data.user.stripeId) {
                            const stripeId = await getStripeUserId(data.jwt, data.user.email);
                            if (stripeId.status) {
                                dispatch({ type: 'user/stripeId', payload: stripeId.stripeId });
                            }
                        }

                        navigate('/homepage');
                       } else {
                        setLoginErrors({ error: true, message: 'Please confirm your account first' });
                       }
                    } else {
                        setLoginErrors({ error: true, message: data.error.message });
                    }
                });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <Formik
                initialValues={{
                    identifier: '',
                    password: '',
                }}
                validationSchema={loginSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values) => {
                    const { identifier, password } = values;
                    await loginUser(identifier, password);
                }}
            >
                {({ errors, touched }) => (
                    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                                Sign in
                            </h1>
                            <Form className="mt-6">
                                <div className="mb-2">
                                    <label
                                        htmlFor="email-input"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Email
                                    </label>
                                    <Field
                                        id='email-input'
                                        type="email"
                                        name="identifier"
                                        className={`${errors.identifier && 'border-red-500'} block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                                    />
                                    {errors.identifier && touched.identifier ? (
                                        <p className="text-red-500 text-xs italic">{errors.identifier}</p>
                                    ) : null}
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-gray-800"
                                    >
                                        Password
                                    </label>
                                    <Field
                                        id='password'
                                        type="password"
                                        name="password"
                                        className={`${errors.password && 'border-red-500'} block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                                    />
                                    {errors.password && touched.password ? (
                                        <p className="text-red-500 text-xs italic">{errors.password}</p>
                                    ) : null}
                                </div>
                                <Link
                                    to="/reset-password"
                                    className="text-xs text-purple-600 hover:underline"
                                >
                                    Forget Password?
                                </Link>
                                <div className="mt-6">
                                    <button
                                        type='submit'
                                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                                    >
                                        Login
                                    </button>
                                </div>
                                <p className="text-red-500 text-xs italic text-center">{loginErrors.message}</p>
                            </Form>
                            <p className="mt-8 text-xs font-light text-center text-gray-700">
                                {" "}
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="font-medium text-purple-600 hover:underline"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
}
