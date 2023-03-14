import React from 'react'
import { AtSymbolIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import UpdateEmail from '../../components/Modals/UpdateEmail';
import UpdatePassword from '../../components/Modals/UpdatePassword';
import UpdatedEmailAlert from '../../components/Alerts/UpdatedEmailAlert';
import UpdatedPasswordAlert from '../../components/Alerts/UpdatedPasswordAlert';

export default function Security() {
  const { user } = useSelector((state) => state.user_store);
  const { showUpdatedEmail, showUpdatedPassword } = useSelector((state) => state.modal_store);
  const dispatch = useDispatch();

  const updateUser = (type) => {
    dispatch({ type: `modal/update${type}`, payload: true });
  }

  return (
    <div className="divide-y divide-gray-200 lg:col-span-9">
      <section aria-labelledby="security-settings-heading">
        <div className="shadow sm:overflow-hidden">
          <div className="bg-white py-6 px-4 sm:p-6">
            <div>
              <h2 id="security-settings-heading" className="text-xl font-medium leading-6 text-gray-900">
                Security Settings
              </h2>
            </div>
          </div>
        </div>
        <div className="py-4">
          <div className=" flex flex-row justify-between py-6 px-4 sm:p-6 text-base font-medium border-b-2">
            <div className='flex flex-row'>
              <AtSymbolIcon className='w-7 h-7 text-[#0369a1] font-bold mr-5' />
              <div>
                <div>Email address</div>
                <div className='text-sm font-normal'>Your current account email address is {user.email}</div>
              </div>
            </div>
            <button className='m-2 py-2 px-4 border border-[#0369a1] text-[#0369a1] rounded-xl hover:text-[#1e40af] hover:border-[#1e40af]'
              onClick={() => updateUser('Email')}
            >
              Update
            </button>
          </div>
          <div className=" flex flex-row justify-between py-6 px-4 sm:p-6 text-base font-medium">
            <div className='flex flex-row'>
              <LockClosedIcon className='w-7 h-7 text-[#0369a1] font-bold mr-5' />
              <div>
                <div>Password</div>
                <div className='text-sm font-normal'>It's a good idea to use a strong password that you don't use elsewhere</div>
              </div>
            </div>
            <button className='m-2 py-2 px-4 border border-[#0369a1] text-[#0369a1] rounded-xl hover:text-[#1e40af] hover:border-[#1e40af]'
              onClick={() => updateUser('Password')}
            >
              Update
            </button>
          </div>
        </div>
      </section>
      <UpdateEmail />
      <UpdatePassword />
      {showUpdatedEmail && <UpdatedEmailAlert />}
      {showUpdatedPassword && <UpdatedPasswordAlert />}
    </div>
  )
}
