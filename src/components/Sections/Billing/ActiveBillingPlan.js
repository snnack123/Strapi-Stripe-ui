import React from 'react'
import { ArrowUpRightIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux'
import { formatDate } from '../../../utils/utilFunctions';
import { billingPeriods } from '../../../utils/constants';
import Skeleton from 'react-loading-skeleton';

export default function ActiveBillingPlan() {
    const { activePlan } = useSelector((state) => state.payment_store);

    return (
        <div className="w-full col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex truncate">
                    <div>
                        <div className="flex items-center space-x-3">
                            <h3 className="truncate text-sm font-medium text-gray-900">{activePlan.name}</h3>
                            <span className="inline-block flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                {billingPeriods[activePlan.type]}
                            </span>
                        </div>
                        <div className="mt-1 truncate text-sm text-gray-500">Our most popular plan for small teams.</div>
                    </div>
                    <div>
                        <div className='ml-10 truncate text-sm font-medium text-gray-900'>
                            <div className='text-center'>Expire date</div>
                            <div><span className='text-lg'>{activePlan.expireDate ? formatDate(activePlan.expireDate) : <Skeleton />}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-20'>
                <div className="-mt-px flex divide-x divide-gray-200">
                    <div className="-ml-px flex w-0 flex-1">
                        <div className="relative inline-flex w-0 flex-1 justify-end gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-green-600 hover:text-green-800 pr-4">
                            <span className='cursor-pointer'>Upgrade Plan</span>
                            <ArrowUpRightIcon className="h-5 w-5 cursor-pointer" aria-hidden="true" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
