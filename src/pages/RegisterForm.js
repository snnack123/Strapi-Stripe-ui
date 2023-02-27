import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import { registerSchema } from '../utils/yupSchemas';
import { registerUser, sendConfirmationToken } from '../utils/userRequests';
import BackToLoginPage from '../components/Buttons/BackToLoginPage';

export default function RegisterForm() {
  const [registerError, setRegisterError] = useState({
    error: false,
    message: '',
  });
  const [fetched, setFetched] = useState(false);

  const registerUserHandler = async (username, email, name, password) => {
    const result = await registerUser(username, email, name, password);

    if (!result.error) {
      setFetched(true);
      const userEmail = result.data.user.email;
      sendConfirmationToken(userEmail);
    } else {
      setRegisterError({
        error: true,
        message: result.message,
      });
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          username: '',
          email: '',
          name: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={registerSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={async (values) => {
          const { username, email, name, password } = values;
          await registerUserHandler(username, email, name, password);
        }}
      >
        {({ errors, touched }) => (
          <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
              <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                {!fetched ? 'Register' : 'Successfully created account'}
              </h1>
              {!fetched ?
                <>
                  <p className="text-sm text-center text-gray-500 mt-2">
                    Fill in the form below to get instant access
                  </p>
                  <Form className="mt-6">
                    <div className="mb-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-800"
                      >
                        Full Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className={`${errors.name && 'border-red-500'} block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                      />
                      {errors.name && touched.name ? (
                        <p className="text-red-500 text-xs italic">{errors.name}</p>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-800"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className={`${errors.email && 'border-red-500'} block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                      />
                      {errors.email && touched.email ? (
                        <p className="text-red-500 text-xs italic">{errors.email}</p>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="username"
                        className="block text-sm font-semibold text-gray-800"
                      >
                        Username
                      </label>
                      <Field
                        type="text"
                        name="username"
                        className={`${errors.name && 'border-red-500'} block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                      />
                      {errors.name && touched.name ? (
                        <p className="text-red-500 text-xs italic">{errors.name}</p>
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
                        type="password"
                        name="password"
                        className={`${errors.password && 'border-red-500'} block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                      />
                      {errors.password && touched.password ? (
                        <p className="text-red-500 text-xs italic">{errors.password}</p>
                      ) : null}
                    </div>

                    <div className="mb-2">
                      <label
                        htmlFor="passwordConfirmation"
                        className="block text-sm font-semibold text-gray-800"
                      >
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="passwordConfirmation"
                        className={`${errors.passwordConfirmation && 'border-red-500'} block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                      />
                      {errors.passwordConfirmation && touched.passwordConfirmation ? (
                        <p className="text-red-500 text-xs italic">{errors.passwordConfirmation}</p>
                      ) : null}
                    </div>
                    <div className="mt-6">
                      <button
                        type='submit'
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                      >
                        Sign up
                      </button>
                    </div>
                    <p className="text-red-500 text-xs italic text-center">{registerError.message}</p>
                  </Form>
                </>
                :
                <>
                  <p className='text-center font-bold my-5'>Congratulations, your account has been successfully created. </p>
                  <BackToLoginPage />
                </>
              }
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}
