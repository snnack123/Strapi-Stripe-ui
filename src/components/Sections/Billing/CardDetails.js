import React from 'react'
import { CreditCardIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux';
import { cardTypes } from '../../../utils/constants';
import CreateCardModal from './CreateCardModal';
import EditCardModal from './EditCardModal';
import visa from '../assets/visa.png';
import mastercard from '../assets/mastercard.png';
import { manageCreditCard } from '../../../utils/userRequests';
import Skeleton from 'react-loading-skeleton';

export default function CardDetails() {
    const { card } = useSelector((state) => state.payment_store);
    const { jwt } = useSelector((state) => state.user_store);
    // const dispatch = useDispatch();

    // const handleCreateModal = (e, type) => {
    //     e.preventDefault();
    //     dispatch({ type: 'payment/createCard', payload: type });
    // }

    // const handleEditModal = (e, type) => {
    //     e.preventDefault();
    //     dispatch({ type: 'payment/editCard', payload: type });
    // }

    const handleCreditCard = async (type, e) => {
        e.preventDefault();
        const result = await manageCreditCard(type, jwt);

        if (result.status) {
            window.open(result.url);
        } else {
            console.log(result);
        }
    }

    const getCardImage = (name) => {
        if (name === 'visa') {
            return visa;
        } else if (name === 'mastercard') {
            return mastercard;
        }
    }

    return (
        <div className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className=" w-full items-center justify-between space-x-6 p-6">
                <div>
                    <div className='flex justify-between'>
                        <div>
                            <div className="flex items-center space-x-3">
                                <h3 className="truncate text-lg font-medium text-gray-900">Payment Method</h3>
                            </div>
                            <div className="mt-1 truncate text-sm text-gray-500 w-full">Change how you pay for your plan.</div>
                        </div>
                        <button className="relative inline-flex w-0 flex-1 justify-end gap-x-3 rounded-br-lg border border-transparent my-4 text-sm font-semibold text-[#06b6d4] hover:text-[#0284c7]"
                            onClick={(e) => handleCreditCard('create', e)}
                        >
                            <div className='underline'>Add new Card</div>
                        </button>
                    </div>

                    {
                        card.brand !== null && card.brand !== '' ?
                            <div className='mt-10 flex justify-between border border-gray-200 rounded w-full p-3'>
                                <div className='flex flex-row'>
                                    <div className='border border-gray-200 w-16 p-2 flex justify-center align-middle rounded'>
                                        {
                                            card.brand ?
                                                <img src={getCardImage(card.brand)} alt='visa' className='h-auto w-auto' /> :
                                                <Skeleton width={40} height={40} />
                                        }
                                    </div>
                                    <div className='ml-2 mt-1 truncate text-sm text-gray-500'>
                                        <div className="inline-block flex-shrink-0 rounded-full bg-[#bae6fd] px-2 py-0.5 text-xs font-medium text-[#0284c7]">Default card for payments</div>
                                        <div>{card.brand ? cardTypes[card.brand] + ' ending in ' + card.last4 : <Skeleton />}</div>
                                        <div>Expiry {card.expMonth ? card.expMonth + '/' + card.expYear : <Skeleton />}</div>
                                    </div>
                                </div>
                                <button className="relative inline-flex w-0 flex-1 justify-end gap-x-3 rounded-br-lg border border-transparent my-4 text-sm font-semibold text-green-600 hover:text-green-800"
                                    onClick={(e) => handleCreditCard('edit', e)}
                                >
                                    <div>Edit</div>
                                    <CreditCardIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                            : 
                            <div className='mt-10 flex justify-center border-2 border-green-600 rounded-xl w-full p-3 text-green-600 hover:text-green-800'> 
                                <button 
                                    type='button'
                                    onClick={(e) => handleCreditCard('create', e)}
                                >
                                    Register a new credit card
                                </button>
                            </div>
                    }
                </div>
            </div>
            <CreateCardModal />
            <EditCardModal />
        </div>
    )
}
