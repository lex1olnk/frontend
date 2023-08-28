import React, { useState } from 'react'
import { SelectedInput } from '../../../../components/Inputs/inputs'
import { sendTeamRequest } from '../../actions/teamActions'

type SendInviteUserProps = {
  onClick: (value: boolean) => void
  teamId: number
}

const SendInviteUser: React.FC<SendInviteUserProps> = (props) => {
  const { onClick, teamId } = props
  const [userId, setUserId] = useState(-1)

  const handleChange = (e: any) => {
    const user = e.target.value.id
    setUserId(user)
  }

  const handleSubmit = () => {
    const res = sendTeamRequest({ userId, teamId })
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backgrop-blue-sm flex flex-col justify-center items-center'>
      <div className='flex px-8 bg-slate-200 h-[52px]'>
        <div className='w-[600px] my-auto text-lg'>Приглашение пользователей в команду</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='bg-white p-8 rounded'>
          <div className='flex flex-col w-[600px] mx-auto'>
            <SelectedInput
              type='user'
              title='Пользователь'
              input='Пользователь'
              name='id'
              helper={'В переводе'}
              setSelectedOption={handleChange}
              isMulti={false}
              valueType='nickname'
              onSelect={true}
            />
          </div>
          <div className='flex flex-row justify-between'>
            <button
              type='submit'
              className='text-white w-36 mx-auto bg-cred hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2  focus:outline-none dark:focus:ring-blue-800'
            >
              Добавить
            </button>
            <button
              type='button'
              className='text-white w-36 mx-auto bg-cred hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2  focus:outline-none dark:focus:ring-blue-800'
            >
              Отменить
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SendInviteUser
