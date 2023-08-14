import { useState, useEffect } from 'react';
import { getTeamById } from '../../http/teamApi';
import { useParams } from 'react-router-dom';
import { getDescString } from '../../http/univApi';
import parse from 'html-react-parser';
import ConvertLexical from '../../plugins/ConvertLexical';
import SendInviteUser from './SendInviteUser';

const TitleDesc = props => {
  const { name, value } = props;
  return (
    <div className="px-6 first:pl-0" key={name + value}>
      <span className="text-sm">{name}</span>
      <br />
      <span className="text-lg">{value}</span>
    </div>
  );
};

const TeamPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [team, setTeam] = useState('');
  const [desc, setDesc] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getTeamById(id).then(res => {
      setTeam(res);
      getDescString(`teams/${res.name}.txt`).then(res => {
        ConvertLexical({ descString: res, setDesc });
      });
    });
  }, []);

  const titleDescs = [
    {
      name: 'Автор',
      value: team.adminId
    },
    {
      name: 'Создана',
      value: team.createdAt
    },
    {
      name: 'Лайки',
      value: team.likes
    }
  ];

  if (!team && !desc) return <div>...LOADING</div>;

  return (
    <div className="bg-slate-100 pt-1 min-h-[calc(100vh_-_65px_-_148px)]">
      <div className="max-w-[1144px] mx-auto">
        <div>
          <div className="flex flex-row justify-between w-full bg-cred p-4 rounded-t-lg mt-4">
            <p className="text-2xl text-white">{team.name}</p>
            <button
              onClick={() => setShowModal(cur => !cur)}
              className="ml-2 p-2 bg-white rounded-lg">
              Пригласить пользователей
            </button>
          </div>
          <div className="max-w-[1144px] h-full mx-auto flex flex-row justify-between p-4 bg-white">
            <img
              src={process.env.REACT_APP_API_URL + '/img/' + team.img}
              className="h-[240px] w-[240px] object-cover"
            />
            <div className="rounded-md w-[886px] pl-4">
              <div className="flex flex-row">
                {titleDescs.map(desc => (
                  <TitleDesc name={desc.name} value={desc.value} />
                ))}
              </div>
              <div className="flex flex-row py-2">
                <img
                  src={process.env.REACT_APP_API_URL + '/img/' + team.img}
                  className="my-auto rounded-full border-spacing-1 aspect-square w-12 object-cover"
                />{' '}
                <div className="py-1 px-4 text-white my-2 bg-cred mx-4">{''}</div>
              </div>
              <div>
                {team.users.length > 0 ? (
                  team.users.map(user => {
                    <div></div>;
                  })
                ) : (
                  <div>Участников нету</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1144px] mx-auto p-4">
          <span>Описание</span>
          <div>{parse(desc)}</div>
        </div>
      </div>
      {showModal && <SendInviteUser onClick={setShowModal} teamId={team.id} />}
    </div>
  );
};

export default TeamPage;
