import { useState, useEffect, useContext } from 'react';
import { getTeamById } from '../../http/teamApi';
import { useParams } from 'react-router-dom';
import { getDescString } from '../../http/univApi';
import parse from 'html-react-parser';
import SendInviteUser from './SendInviteUser';
import { ToastContainer } from 'react-toastify';
import { useQuery } from 'react-query';
import ConvertLexical from '../../plugins/ConvertLexical';

import { ReactComponent as VKIcon } from '../../icons/vk.svg';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttributionIcon from '@mui/icons-material/Attribution';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { Context } from '../..';
import { toJS } from 'mobx';

const TeamPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const [desc, setDesc] = useState('');
  const [isEditor, setIsEditor] = useState(false);

  const { isLoading, isSuccess, error, isError, data } = useQuery(['id', id], getTeamById, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  const { user } = useContext(Context);
  const _user = toJS(user.user);

  useEffect(() => {
    if (isSuccess)
      getDescString(`teams/${data.name}.txt`).then(res => {
        if (res) ConvertLexical({ descString: res, setDesc });
      });
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccess && data.adminId === _user.id) setIsEditor(true);
  }, [isSuccess]);

  const titleDescs = [
    {
      name: <AttributionIcon />,
      value: 'adminId'
    },
    {
      name: <AccessTimeIcon />,
      value: 'createdAt'
    },
    {
      name: <ThumbUpOffAltIcon />,
      value: 'likes'
    }
  ];

  if (isSuccess) console.log(data);

  return (
    <>
      {isLoading && <div>...Loading team </div>}
      {isError && <div>{error.message}</div>}
      {isSuccess && (
        <div className="bg-slate-100 pt-1 min-h-[calc(100vh_-_65px_-_148px)]">
          <div className="max-w-[912px] mx-auto">
            <div>
              <div className="w-full h-[160px] bg-cred text-center py-4 mt-4 rounded-t-lg">
                <p className="text-2xl text-white">{data.name}</p>
              </div>
              <div className="w-full p-4 bg-white rounded-b-lg">
                <div className="flex flex-row relative -top-24">
                  <div className="w-[336px] py-2">
                    <div className="flex flex-row h-14 mt-10 justify-center">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/img/${data.admin.img}`}
                        className="my-auto rounded-full border-2 border-white aspect-square w-12 object-cover"
                      />
                      <div className="py-1 px-4 text-white my-2 bg-cred mx-4 border-2 border-white">
                        {data.admin.nickname}
                      </div>
                    </div>
                    <div>
                      <div className="px-6">
                        <AttributionIcon />
                        <span className="text-lg ml-4">{data.adminId}</span>
                      </div>
                      <div className="px-6">
                        <AccessTimeIcon />
                        <span className="text-lg ml-4">{data.createdAt}</span>
                      </div>
                      <div className="px-6">
                        <ThumbUpOffAltIcon />
                        <span className="text-lg ml-4">{data.likes}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-[240px]">
                    <img
                      src={process.env.REACT_APP_API_URL + '/img/' + data.img}
                      className="h-[240px] w-[240px] rounded-full object-cover border-2 border-white"
                    />
                    <div className="mt-2">
                      <button className="mx-auto flex px-8 py-3 bg-stone-100 ">Подписаться</button>
                    </div>
                  </div>
                  <div className="flex flex-col w-[336px] py-2">
                    <button
                      onClick={() => setShowModal(cur => !cur)}
                      style={{ visibility: isEditor ? 'visible' : 'hidden' }}
                      className="hover:bg-red-400 transition-all duration-300 text-white h-10 w-[280px] mx-auto bg-cred border-2 border-white rounded-lg mt-12">
                      Пригласить пользователей
                    </button>
                    <div>
                      <div className="flex flex-row mt-2 px-6">
                        <VKIcon className="vk" />
                        <p className="text-lg ml-4">vk.com</p>
                      </div>
                      <div className="flex flex-row px-6 mt-2">
                        <VKIcon className="vk" />
                        <p className="text-lg ml-4">vk.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div>
                  {data.members.length > 0 ? (
                    data.members.map(user => {
                      <div></div>;
                    })
                  ) : (
                    <div>Участников нету</div>
                  )}
                </div> */}
              </div>
            </div>
            <div className="max-w-[1144px] mx-auto p-4">
              <span>Описание</span>
              {parse(desc)}
            </div>
          </div>
        </div>
      )}
      {showModal && isEditor && <SendInviteUser onClick={setShowModal} teamId={data.id} />}
    </>
  );
};

export default TeamPage;
