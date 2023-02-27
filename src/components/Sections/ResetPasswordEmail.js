import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { sendResetPasswordEmail } from '../../utils/userRequests';

export default function ResetPasswordEmail() {
    const [confirmError, setConfirmError] = useState({ error: false, message: '' });
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const resetPassword = async (e) => {
        e.preventDefault();

        const result = await sendResetPasswordEmail(email);
        setEmailSent(true);

        if (!result.status) {
            setConfirmError({ error: true, message: result.message });
        }
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                    Reset Password
                </h1>
                <form className="mt-6">
                    {!emailSent ? 
                    <>
                        <p className='text-center font-bold mb-5'>You will receive an email message with instructions on how to reset your password.</p>
                        <div className="mb-2">
                        <label
                            htmlFor="text"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email address
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            value={email}
                            onChange={(e) => {
                                setConfirmError({ error: false, message: '' });
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    </>
                    :
                        <p className='text-center font-bold mb-5'>An email message with instructions on how to reset your password has been sent to your email address if your email exists in our database.</p>
                    }
                    {
                        confirmError.error &&
                        (
                            <div className='mb-2'>
                                <p className='text-red-700'>{confirmError.message}</p>
                            </div>
                        )
                    }
                    <div className="mt-6">
                    {!emailSent ? 
                            <button
                                type='submit'
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                                onClick={(e) => resetPassword(e)}
                            >
                                Send email
                            </button>
                            :
                            <button
                            type='submit'
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                            onClick={() => navigate('/login')}
                        >
                            Back to login
                        </button>
                    }
                    </div>
                </form>
            </div>
        </div>
    )
}
