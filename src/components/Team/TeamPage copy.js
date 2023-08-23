import { useState, useEffect } from 'react';
import { getTeamById } from '../../http/teamApi';
import { useParams } from 'react-router-dom';
import { getHTML } from '../../http/univApi';
import parse from 'html-react-parser';
import SendInviteUser from './SendInviteUser';
import { ToastContainer } from 'react-toastify';
import { useQuery } from 'react-query';
import ConvertLexical from '../../plugins/ConvertLexical';

const TeamPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const [desc, setDesc] = useState('');

  const { isLoading, isSuccess, error, isError, data } = useQuery(['id', id], getTeamById, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  useEffect(() => {
    if (isSuccess)
      getHTML(`teams/${data.name}.txt`).then(res => {
        if (res) ConvertLexical({ descString: res, setDesc });
      });
  }, [isSuccess]);

  const titleDescs = [
    {
      name: 'Автор',
      value: 'adminId'
    },
    {
      name: 'Создана',
      value: 'createdAt'
    },
    {
      name: 'Лайки',
      value: 'likes'
    }
  ];

  return (
    <>
      {isLoading && <div>...Loading team </div>}
      {isError && <div>{error.message}</div>}
      {isSuccess && (
        <div className="bg-slate-100 pt-1 min-h-[calc(100vh_-_65px_-_148px)]">
          <div className="max-w-[1144px] mx-auto">
            <div>
              <div className="flex flex-row justify-between w-full bg-cred p-4 rounded-t-lg mt-4">
                <p className="text-2xl text-white">{data.name}</p>
                <button
                  onClick={() => setShowModal(cur => !cur)}
                  className="ml-2 p-2 bg-white rounded-lg">
                  Пригласить пользователей
                </button>
              </div>
              <div className="max-w-[1144px] h-full mx-auto flex flex-row justify-between p-4 bg-white">
                <img
                  src={process.env.REACT_APP_API_URL + '/img/' + data.img}
                  className="h-[240px] w-[240px] object-cover"
                />
                <div className="rounded-md w-[886px] pl-4">
                  <div className="flex flex-row">
                    {titleDescs.map(desc => (
                      <div className="px-6 first:pl-0" key={desc.name + desc.value}>
                        <span className="text-sm">{desc.name}</span>
                        <br />
                        <span className="text-lg">{data[desc.value]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row py-2">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/img/${data.admin.img}`}
                      className="my-auto rounded-full border-spacing-1 aspect-square w-12 object-cover"
                    />
                    <div className="py-1 px-4 text-white my-2 bg-cred mx-4">
                      {data.admin.nickname}
                    </div>
                  </div>
                  <div>
                    {data.members.length > 0 ? (
                      data.members.map(user => {
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
              {parse(desc)}
            </div>
          </div>
        </div>
      )}
      {showModal && <SendInviteUser onClick={setShowModal} teamId={data.id} />}
    </>
  );
};

export default TeamPage;
