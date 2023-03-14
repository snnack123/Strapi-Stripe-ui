import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

export default function UpdatedEmailAlert() {
    const dispatch = useDispatch();

    const closeAlert = () => {
        dispatch({ type: "modal/showUpdatedEmail", payload: false });
    }

    useEffect(() => {
        toast.success('The email address has been successfully updated!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onClose: closeAlert
        });
    }, [])

    return (
        <>
            <ToastContainer />
        </>
    )
}
