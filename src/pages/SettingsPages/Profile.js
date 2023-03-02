import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import { classNames } from '../../utils/utilFunctions'

export default function Profile() {
    const [availableToHire, setAvailableToHire] = useState(true);
    const [privateAccount, setPrivateAccount] = useState(false);
    const [allowCommenting, setAllowCommenting] = useState(true);
    const [allowMentions, setAllowMentions] = useState(true);
    return (
        <form className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
            {/* Profile section */}
            <div className="py-6 px-4 sm:p-6 lg:pb-8">
                <div>
                    <h2 className="text-lg font-medium leading-6 text-gray-900">Profile</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>

                <div className="mt-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                        />
                    </div>

                    <div className="col-span-12">
                        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                            URL
                        </label>
                        <input
                            type="text"
                            name="url"
                            id="url"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                        />
                    </div>

                    <div className="col-span-12 sm:col-span-6">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                            Company
                        </label>
                        <input
                            type="text"
                            name="company"
                            id="company"
                            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Privacy section */}
            <div className="divide-y divide-gray-200 pt-6">
                <div className="px-4 sm:px-6">
                    <div>
                        <h2 className="text-lg font-medium leading-6 text-gray-900">Privacy</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
                        </p>
                    </div>
                    <ul className="mt-2 divide-y divide-gray-200">
                        <Switch.Group as="li" className="flex items-center justify-between py-4">
                            <div className="flex flex-col">
                                <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                    Available to hire
                                </Switch.Label>
                                <Switch.Description className="text-sm text-gray-500">
                                    Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                                </Switch.Description>
                            </div>
                            <Switch
                                checked={availableToHire}
                                onChange={setAvailableToHire}
                                className={classNames(
                                    availableToHire ? 'bg-teal-500' : 'bg-gray-200',
                                    'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                                )}
                            >
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        availableToHire ? 'translate-x-5' : 'translate-x-0',
                                        'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                />
                            </Switch>
                        </Switch.Group>
                        <Switch.Group as="li" className="flex items-center justify-between py-4">
                            <div className="flex flex-col">
                                <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                    Make account private
                                </Switch.Label>
                                <Switch.Description className="text-sm text-gray-500">
                                    Pharetra morbi dui mi mattis tellus sollicitudin cursus pharetra.
                                </Switch.Description>
                            </div>
                            <Switch
                                checked={privateAccount}
                                onChange={setPrivateAccount}
                                className={classNames(
                                    privateAccount ? 'bg-teal-500' : 'bg-gray-200',
                                    'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                                )}
                            >
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        privateAccount ? 'translate-x-5' : 'translate-x-0',
                                        'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                />
                            </Switch>
                        </Switch.Group>
                        <Switch.Group as="li" className="flex items-center justify-between py-4">
                            <div className="flex flex-col">
                                <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                    Allow commenting
                                </Switch.Label>
                                <Switch.Description className="text-sm text-gray-500">
                                    Integer amet, nunc hendrerit adipiscing nam. Elementum ame
                                </Switch.Description>
                            </div>
                            <Switch
                                checked={allowCommenting}
                                onChange={setAllowCommenting}
                                className={classNames(
                                    allowCommenting ? 'bg-teal-500' : 'bg-gray-200',
                                    'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                                )}
                            >
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        allowCommenting ? 'translate-x-5' : 'translate-x-0',
                                        'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                />
                            </Switch>
                        </Switch.Group>
                        <Switch.Group as="li" className="flex items-center justify-between py-4">
                            <div className="flex flex-col">
                                <Switch.Label as="p" className="text-sm font-medium text-gray-900" passive>
                                    Allow mentions
                                </Switch.Label>
                                <Switch.Description className="text-sm text-gray-500">
                                    Adipiscing est venenatis enim molestie commodo eu gravid
                                </Switch.Description>
                            </div>
                            <Switch
                                checked={allowMentions}
                                onChange={setAllowMentions}
                                className={classNames(
                                    allowMentions ? 'bg-teal-500' : 'bg-gray-200',
                                    'relative ml-4 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2'
                                )}
                            >
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                        allowMentions ? 'translate-x-5' : 'translate-x-0',
                                        'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                    )}
                                />
                            </Switch>
                        </Switch.Group>
                    </ul>
                </div>
                <div className="mt-4 flex justify-end py-4 px-4 sm:px-6">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="ml-5 inline-flex justify-center rounded-md border border-transparent bg-sky-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}
