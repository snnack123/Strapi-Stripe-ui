import React, { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { classNames } from '../../utils/utilFunctions'
import { profilePath, settingsPages } from '../../utils/constants'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Settings() {
    const { subNavigationOptions } = useSelector((state) => state.navigation_store);
    const [searchParams] = useSearchParams();
    const [pageType, setPageType] = useState(null);

    const type = searchParams.get("type");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!type) {
            navigate(profilePath);
        } else {
            setPageType(type);
            dispatch({ type: "subNavigation/active", payload: type });
        }
    }, [type]);

    return (
        <div>
            <Disclosure as="div" className="relative overflow-hidden bg-sky-700 pb-32">
                <header className="relative py-10">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
                    </div>
                </header>
            </Disclosure>

            <main className="relative -mt-32">
                <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
                    <div className="overflow-hidden rounded-lg bg-white shadow">
                        <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
                            <aside className="py-6 lg:col-span-3">
                                <nav className="space-y-1">
                                    {subNavigationOptions.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'border-teal-500 bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                                                    : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                                                'group flex items-center border-l-4 px-3 py-2 text-sm font-medium'
                                            )}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    item.current
                                                        ? 'text-teal-500 group-hover:text-teal-500'
                                                        : 'text-gray-400 group-hover:text-gray-500',
                                                    '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                            <span className="truncate">{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </aside>
                            {pageType && (settingsPages[pageType] || navigate(profilePath))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
