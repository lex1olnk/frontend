import { useState, useEffect } from 'react';
import { SimpleTable } from '../Table';
import { getTeamsAll } from '../../actions/teamActions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const TeamsPage = () => {
  const dispatch = useAppDispatch();
  const { teams } = useAppSelector(({ root }) => root.teams);
  const cols = ['Команда', 'Участников', 'Работ', 'Лайков'];

  // useEffect(() => {
  //   dispatch(getTeamsAll());
  // }, []);

  return (
    <div className="bg-slate-100 pt-2 min-h-[calc(100vh_-_65px_-_148px)]">
      <div className="my-4 max-w-[1144px] rounded-lg bg-white mx-auto p-4">
        <span className="my-auto text-xl">Команды</span>
      </div>
      <div className="flex flex-row justify-between mx-auto max-w-[1144px]">
        <div className="bg-white w-[800px] h-full rounded-lg p-4">
          <SimpleTable cols={cols} rows={teams} loading={true} />
        </div>
        <div className="bg-white w-[332px] h-32 rounded-lg p-4">ss</div>
      </div>
    </div>
  );
};

export default TeamsPage;
