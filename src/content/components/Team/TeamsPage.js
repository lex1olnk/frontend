import { useState, useEffect } from 'react';
import { SimpleTable } from '../components/Table';
import { teamsGetAll } from '../http/teamApi';

const TeamsPage = () => {
  const [teams, setTeams] = useState('');
  const cols = ['Команда', 'Участников', 'Работ', 'Лайков'];
  useEffect(() => {
    teamsGetAll().then(res => {
      setTeams(res);
    });
  }, []);

  return (
    <div className="bg-slate-100 pt-2">
      <div className="my-4 max-w-[1144px] rounded-lg bg-white mx-auto p-4">
        <span className="my-auto text-xl">Команды</span>
      </div>
      <div className="flex flex-row justify-between mx-auto max-w-[1144px]">
        <div className="bg-white w-[800px] h-full rounded-lg p-4">
          <SimpleTable cols={cols} rows={teams} />
        </div>
        <div className="bg-white w-[332px] h-32 rounded-lg p-4">ss</div>
      </div>
    </div>
  );
};

export default TeamsPage;
