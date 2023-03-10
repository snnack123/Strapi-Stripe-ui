import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { isTokenCloseToExpire } from '../../utils/utilFunctions';
import { refreshToken } from '../../utils/userRequests'
import { refreshTokenMilliseconds } from '../../utils/constants';

export default function SignOut() {
    const { jwt } = useSelector((state) => state.user_store);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = () => {
        setTimeout(() => {
            localStorage.removeItem('token');
            dispatch({ type: 'user/logout' });
            navigate('/login');
        }, 500);
    }

    const refreshUserToken = async () => {
        console.log('refreshing token');

        if(jwt.length > 0) {
            dispatch({ type: 'user/refreshToken', payload: true });
            const result = await refreshToken(jwt);
    
            if(result.status) {
                localStorage.setItem('token', result.token);
                dispatch({ type: 'user/jwt', payload: result.token });
                dispatch({ type: 'user/refreshToken', payload: true });
            }
        }
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            const checkedToken = isTokenCloseToExpire(jwt);

            if (checkedToken) {
                refreshUserToken();
            }
          }, refreshTokenMilliseconds);
      
          // Return a cleanup function that clears the interval
          return () => {
            clearInterval(intervalId);
          };
    }, [])

    return (
        <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:bg-indigo-500 focus:ring-offset-2"
            onClick={() => logoutUser()}
        >
            Sign out
        </button>
    )
}
