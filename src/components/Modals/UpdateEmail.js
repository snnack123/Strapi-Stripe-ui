import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { updateEmailSchema } from '../../utils/yupSchemas';
import { updateEmailData } from '../../utils/constants';
import { updateUser } from '../../utils/userRequests';

export default function UpdateEmail() {
    const { jwt } = useSelector((state) => state.user_store);
    const [updateUserError, setUpdateUserError] = useState({
        error: false,
        message: '',
    });
    const { updateEmail } = useSelector((state) => state.modal_store);
    const dispatch = useDispatch();

    const handleModal = (type) => {
        dispatch({ type: 'modal/updateEmail', payload: type });
        setUpdateUserError({ error: false, message: '' });
    }

    const updateEmailHandler = async (email) => {
        const result = await updateUser('email', { email }, jwt);

        if (!result.status) {
            setUpdateUserError({ error: true, message: result.message });
        } else {
            dispatch({ type: 'user/email', payload: email });
            handleModal(false);
            dispatch({ type: 'modal/showUpdatedEmail', payload: true });
        }
    }

    return (
        <>
            <Formik
                initialValues={updateEmailData}
                validationSchema={updateEmailSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={async (values) => {
                    const { email } = values;

                    await updateEmailHandler(email);
                }}
            >
                {({ errors, touched, setValues }) => (
                    <Transition.Root show={updateEmail} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={() => {
                            handleModal(false);
                            setValues(updateEmailData);
                        }}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-0 z-10 overflow-y-auto">
                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                                            <div>
                                                <div className="text-left sm:mt-5">
                                                    <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900">
                                                        Update email
                                                    </Dialog.Title>
                                                    <Form className='space-y-8 divide-y divide-gray-200'>
                                                        <div className="space-y-6 pt-8 sm:space-y-5 sm:pt-10">
                                                            <div className="space-y-6 sm:space-y-5">
                                                                <div className="sm:col-span-3">
                                                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-600">
                                                                        Email*
                                                                    </label>
                                                                    <div className="mt-2">
                                                                        <Field
                                                                            type="text"
                                                                            name="email"
                                                                            id="email"
                                                                            placeholder='Your email'
                                                                            className={`${errors.email && 'border-red-500'} p-2 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                                                        />
                                                                        {errors.email && touched.email ? (
                                                                            <p className="text-red-500 text-xs italic">{errors.email}</p>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                                <div className="sm:col-span-3">
                                                                    <label htmlFor="confirmEmail" className="block text-sm font-medium leading-6 text-gray-600">
                                                                        Confirm Email*
                                                                    </label>
                                                                    <div className="mt-2">
                                                                        <Field
                                                                            type="text"
                                                                            name="confirmEmail"
                                                                            id="confirmEmail"
                                                                            placeholder='Your email'
                                                                            className={`${errors.confirmEmail && 'border-red-500'} p-2 block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                                                        />
                                                                        {errors.confirmEmail && touched.confirmEmail ? (
                                                                            <p className="text-red-500 text-xs italic">{errors.confirmEmail}</p>
                                                                        ) : null}
                                                                    </div>
                                                                </div>
                                                                <div className='mt-10 block text-sm font-medium leading-6 text-gray-600'>*This field is mandatory</div>
                                                            </div>
                                                        </div>
                                                        <div className='border-none text-red-500 text-xs italic text-center'>{updateUserError.message}</div>
                                                        <div className='flex justify-end'>
                                                            <div className="mt-5 sm:mt-6 mr-2">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-2xl border bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                                    onClick={() => {
                                                                        handleModal(false);
                                                                        setValues(updateEmailData);
                                                                    }}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                            <div className="mt-5 sm:mt-6">
                                                                <button
                                                                    type='submit'
                                                                    className="inline-flex justify-center rounded-2xl bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                                                >
                                                                    Update
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition.Root>)}
            </Formik>
        </>
    )
}
