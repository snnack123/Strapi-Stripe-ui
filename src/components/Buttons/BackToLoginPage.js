import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function BackToLoginPage() {
    const navigate = useNavigate();

    return (
        <div className="mt-6">
            <button
                type='submit'
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                onClick={() => navigate('/login')}
            >
                Back to login page
            </button>
        </div>
    )
}
