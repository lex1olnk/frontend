import React, { useState } from 'react';
import { SelectedInput } from '../Inputs/inputs';
import { sendTeamRequest } from '../../http/teamApi';

const SendInviteUser = props => {
  const { setUpdated, onClick, teamId } = props;
  const [userId, setUserId] = useState({
    id: -1
  });

  const handleChange = e => {
    setUserId(e.target.value.id);
  };

  const click = async () => {
    try {
      const res = await sendTeamRequest({ userId, teamId }).then(() => {
        onClick(currentState => !currentState);
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backgrop-blue-sm flex flex-col justify-center items-center">
      <div className="flex px-8 bg-slate-200 h-[52px]">
        <div className="w-[600px] my-auto text-lg">Приглашение пользователей в команду</div>
      </div>
      <div className="bg-white p-8 rounded">
        <div className="flex flex-col w-[600px] mx-auto">
          <SelectedInput
            type="user"
            title="Пользователь"
            input="Пользователь"
            name="id"
            helper={'В переводе'}
            setSelectedOption={handleChange}
            isMulti={false}
            valueType="nickname"
            onSelect={true}
          />
        </div>
        <div className="flex flex-row justify-between">
          <button
            type="button"
            onClick={click}
            className="text-white w-36 mx-auto bg-cred hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2  focus:outline-none dark:focus:ring-blue-800">
            Добавить
          </button>
          <button
            type="button"
            onClick={() => onClick(false)}
            className="text-white w-36 mx-auto bg-cred hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2  focus:outline-none dark:focus:ring-blue-800">
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendInviteUser;
