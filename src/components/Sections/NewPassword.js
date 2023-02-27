import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetUserPassword, verifyToken } from '../../utils/userRequests';
import { resetPasswordSchema } from '../../utils/yupSchemas';
import { Formik, Form, Field } from 'formik';
import Spinner from '../Spinner';

export default function NewPassword() {
  const [searchParams] = useSearchParams();
  const [tokenStatus, setTokenStatus] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [confirmError, setConfirmError] = useState({
    error: false, 
    message: '' 
  });

  const token = searchParams.get("token");
  const navigate = useNavigate();

  const verifyResetPasswordCode = async () => {
    try {
      const result = await verifyToken(token);
      setFetched(true);
      setTokenStatus(result.ok);

      if (!result.ok) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const changePassword = async (password, passwordConfirmation) => {
    try {
      const result = await resetUserPassword(password, passwordConfirmation, token);

      if (result.status) {
        navigate('/login');
      } else {
        setConfirmError({ error: true, message: result.message });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    verifyResetPasswordCode();
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={resetPasswordSchema}
        validateOnChange={ false }
        validateOnBlur={ false }
        onSubmit={async (values) => {
          const { password, passwordConfirmation } = values;
          changePassword(password, passwordConfirmation);
        }}
      >
        {({ errors, touched }) => (
          <>
            {!fetched ?
              <Spinner />
              :
              tokenStatus &&
              <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                  <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                    New password
                  </h1>
                  <Form className="mt-6">
                    <div className="mb-2">
                      <label
                        htmlFor="text"
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
                        htmlFor="text"
                        className="block text-sm font-semibold text-gray-800"
                      >
                        Confirm password
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
                    {
                      confirmError.error &&
                      (
                        <div className='mb-2'>
                          <p className='text-red-700 text-center'>{confirmError.message}</p>
                        </div>
                      )
                    }
                    <div className="mt-6">
                      <button
                        type='submit'
                        className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                      >
                        Change password
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            }
          </>
        )}
      </Formik>
    </div>
  )
}
