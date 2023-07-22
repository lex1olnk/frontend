import { useState, useEffect } from 'react';
import { teamGetById } from '../../http/teamApi';
import { useParams } from 'react-router-dom';
import { getDescString } from '../../http/univApi';
import parse from 'html-react-parser';
import ConvertLexical from '../../plugins/ConvertLexical';

const TeamPage = () => {
  const [team, setTeam] = useState('');
  const [desc, setDesc] = useState('');
  const { id } = useParams();

  useEffect(() => {
    teamGetById(id).then(res => {
      setTeam(res);
      getDescString('teams', res.name + '.txt').then(res => {
        ConvertLexical({ descString: res, setDesc });
      });
    });
  }, []);

  if (!team && !desc) return <div>...LOADING</div>;
  console.log(team);
  return (
    <div className="bg-slate-100 pt-1">
      <div className="max-w-[1144px] mx-auto">
        <div>
          <div className="w-full bg-cred p-4 rounded-t-lg mt-4">
            <span className="text-2xl">{team.name}</span>
            <span>likes</span>
            <button className="ml-2 p-2 bg-white rounded-lg">Пригласить пользователей</button>
          </div>
          <div className="w-full p-4 bg-white rounded-b-lg">
            <span>Users: 15</span>
            <div className="mt-4">someMap</div>
          </div>
        </div>
        <div className="max-w-[1144px] mx-auto p-4">
          <span>Описание</span>
          <div>{parse(desc)}</div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
