import React, { useEffect, useState, useCallback } from 'react'
import { classNames, formatDate, sortSubscriptions } from '../../utils/utilFunctions'
import { RadioGroup, Switch } from '@headlessui/react'
import { getSubscriptionPlans } from '../../utils/userRequests'
import { useDispatch, useSelector } from 'react-redux'
import ActiveBillingPlan from '../../components/Sections/Billing/ActiveBillingPlan'
import CardDetails from '../../components/Sections/Billing/CardDetails'
import Skeleton from 'react-loading-skeleton'

export default function Billing() {
    const { jwt } = useSelector((state) => state.user_store);
    const { activePlan } = useSelector((state) => state.payment_store);

    const [availablePlans, setAvailablePlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState([]);
    const [payments, setPayments] = useState([{ date: '#', description: '#', amount: '#', invoice: '#' }]);
    const [annualBillingEnabled, setAnnualBillingEnabled] = useState(true);

    const dispatch = useDispatch();

    const handleSubscriptionPlans = useCallback(async () => {
        const result = await getSubscriptionPlans(jwt);

        if (!result.error) {
            const subscriptions = sortSubscriptions(result.data.plans);
            setAvailablePlans(subscriptions);
            dispatch({ type: 'payment/activePlan', payload: result.data.activePlan });
            dispatch({ type: 'payment/card', payload: result.data.card });
            if (result.data.payments.length > 0) {
                setPayments(result.data.payments);
            }

            if (result.data.activePlan.name.length > 0) {
                const activeSubscription = subscriptions.find((plan) => plan.name === result.data.activePlan.name);
                setSelectedPlan(activeSubscription);
            }
        }
    }, [jwt, dispatch]);

    useEffect(() => {
        handleSubscriptionPlans();
    }, [handleSubscriptionPlans]);

    return (
        <>
            <div className="divide-y divide-gray-200 lg:col-span-9" action="#" method="POST">
                {/* {availablePlans.length > 0 && */}
                <>
                    <section aria-labelledby="payment-details-heading">
                        <form action="#" method="POST">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="bg-white py-6 px-4 sm:p-6">
                                    <div>
                                        <h2 id="payment-details-heading" className="text-lg font-medium leading-6 text-gray-900">
                                            Payment details
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Update your billing information. Please note that updating your location could affect your tax
                                            rates.
                                        </p>
                                    </div>
                                    <div className='w-full grid gap-2 sm:grid-cols-1 lg:grid-cols-2 mt-5'>
                                        {activePlan.name === null ? <ActiveBillingPlan /> : activePlan.name !== '' ? <ActiveBillingPlan /> : null}
                                        <CardDetails />
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-7 text-right sm:px-6">
                                </div>
                            </div>
                        </form>
                    </section>
                    {/* Plan */}
                    <section aria-labelledby="plan-heading">
                        <form action="#" method="POST">
                            <div className="shadow sm:overflow-hidden sm:rounded-md">
                                <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
                                    <div>
                                        <h2 id="plan-heading" className="text-lg font-medium leading-6 text-gray-900">
                                            Pricing Plans
                                        </h2>
                                    </div>

                                    {/* <RadioGroup value={selectedPlan} onChange={setSelectedPlan}> */}
                                    <RadioGroup value={selectedPlan} onChange={setSelectedPlan}>
                                        <RadioGroup.Label className="sr-only"> Pricing plans </RadioGroup.Label>
                                        <div className="relative -space-y-px rounded-md bg-white">
                                            {availablePlans.length > 0 ? availablePlans.map((plan) => (
                                                <RadioGroup.Option
                                                    key={plan.name}
                                                    value={plan}
                                                    className={({ checked }) =>
                                                        classNames(
                                                            checked ? 'z-10 border-orange-200 bg-orange-50' : 'border-gray-200',
                                                            'relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:grid-cols-3 md:pl-4 md:pr-6'
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <span className="flex items-center text-sm">
                                                                <span
                                                                    className={classNames(
                                                                        checked ? 'bg-orange-500 border-transparent' : 'bg-white border-gray-300',
                                                                        active ? 'ring-2 ring-offset-2 ring-gray-900' : '',
                                                                        'h-4 w-4 rounded-full border flex items-center justify-center'
                                                                    )}
                                                                    aria-hidden="true"
                                                                >
                                                                    <span className="rounded-full bg-white w-1.5 h-1.5" />
                                                                </span>
                                                                <RadioGroup.Label as="span" className="ml-3 font-medium text-gray-900">
                                                                    {plan.name}
                                                                </RadioGroup.Label>
                                                            </span>
                                                            <RadioGroup.Description
                                                                as="span"
                                                                className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                                                            >
                                                                <span
                                                                    className={classNames(
                                                                        checked ? 'text-orange-900' : 'text-gray-900',
                                                                        'font-medium'
                                                                    )}
                                                                >
                                                                    {plan.amount} RON / mo
                                                                </span>{' '}
                                                                {annualBillingEnabled &&
                                                                    <span className={checked ? 'text-orange-700' : 'text-gray-500'}>
                                                                        ({plan.amountOnYear * 0.9} RON / yr)
                                                                    </span>
                                                                }
                                                            </RadioGroup.Description>
                                                            {/* <RadioGroup.Description
                                                                        as="span"
                                                                        className={classNames(
                                                                            checked ? 'text-orange-700' : 'text-gray-500',
                                                                            'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
                                                                        )}
                                                                    >
                                                                        {plan.limit}
                                                                    </RadioGroup.Description> */}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))
                                                :
                                                <>
                                                    <div className='relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:pl-4 md:pr-6'><Skeleton /></div>
                                                    <div className='relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:pl-4 md:pr-6'><Skeleton /></div>
                                                    <div className='relative flex cursor-pointer flex-col border p-4 focus:outline-none md:grid md:pl-4 md:pr-6'><Skeleton /></div>
                                                </>
                                            }
                                        </div>
                                    </RadioGroup>

                                    <Switch.Group as="div" className="flex items-center">
                                        <Switch
                                            checked={annualBillingEnabled}
                                            onChange={setAnnualBillingEnabled}
                                            className={classNames(
                                                annualBillingEnabled ? 'bg-orange-500' : 'bg-gray-200',
                                                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    annualBillingEnabled ? 'translate-x-5' : 'translate-x-0',
                                                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                )}
                                            />
                                        </Switch>
                                        <Switch.Label as="span" className="ml-3" onChange={() => setAnnualBillingEnabled(!annualBillingEnabled)}>
                                            <span className="text-sm font-medium text-gray-900">Annual billing</span>
                                            <span className="text-sm text-gray-500">(Save 10%)</span>
                                        </Switch.Label>
                                    </Switch.Group>
                                </div>
                                <div className="bg-gray-50 px-4 py-7 text-right sm:px-6">
                                </div>
                            </div>
                        </form>
                    </section>

                    {/* Billing history */}
                    <section aria-labelledby="billing-history-heading">
                        <div className="bg-white pt-6 shadow sm:overflow-hidden sm:rounded-md">
                            <div className="px-4 sm:px-6">
                                <h2 id="billing-history-heading" className="text-lg font-medium leading-6 text-gray-900">
                                    Billing history
                                </h2>
                            </div>
                            <div className="mt-6 flex flex-col">
                                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <div className="overflow-hidden border-t border-gray-200">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                            Date
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                            Description
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                                            Amount
                                                        </th>
                                                        {/*
                                              `relative` is added here due to a weird bug in Safari that causes `sr-only` headings to introduce overflow on the body on mobile.
                                            */}
                                                        <th
                                                            scope="col"
                                                            className="relative px-6 py-3 text-left text-sm font-medium text-gray-500"
                                                        >
                                                            <span className="sr-only">View receipt</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 bg-white">
                                                    {availablePlans.length > 0 ? payments.map((payment, index) => (
                                                        <tr key={index}>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                                <time>{payment.date !== '#' ? formatDate(payment.date) : payment.date}</time>
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                                {payment.description}
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                                {payment.amount + ' RON'}
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                                <button className="text-orange-600 hover:text-orange-900" onClick={() => {
                                                                    if (payment.invoice !== '#') {
                                                                        window.open(payment.invoice, '_blank');
                                                                    }
                                                                }}>
                                                                    View receipt
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                        :
                                                        <tr>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                                                <time><Skeleton /></time>
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            <Skeleton />
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                                            <Skeleton />
                                                            </td>
                                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                                <button className="text-orange-600 hover:text-orange-900">
                                                                    View receipt
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
                {/* } */}
            </div>
        </>
    )
}
