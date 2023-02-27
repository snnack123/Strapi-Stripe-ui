import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyConfirmAccountToken } from '../../utils/userRequests';
import BackToLoginPage from '../Buttons/BackToLoginPage';

export default function EmailConfirmation() {
    const [tokenStatus, setTokenStatus] = useState(false);
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const navigate = useNavigate();

    const verifyConfirmAccountCode = async () => {
        try {
            if (token) {
                const result = await verifyConfirmAccountToken(token);
                setTokenStatus(result.ok);

                if (!result.ok) {
                    navigate('/login');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        verifyConfirmAccountCode();
    }, [])

    return (
        <>
            {
                <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                    {!token ?
                        <>
                            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                                    Account confirmation
                                </h1>
                                <p className='text-center '>Your account is not confirmed yet!</p>
                                <p className='text-center font-bold mb-5'>We sent you an activation code on your email address if the address exists in our database.</p>
                                <BackToLoginPage />
                            </div>
                        </>
                        :
                        tokenStatus &&
                        <>
                            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                                    Confirmation successful
                                </h1>
                                <p className='text-center font-bold mb-5'>Your account has been activated!</p>
                                <BackToLoginPage />
                            </div>
                        </>
                    }
                </div>
            }
        </>
    )
}
