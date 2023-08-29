import React, { useState, useEffect } from 'react';
import UploadImage from '../UploadImage';
import { Label, Input } from '../Inputs/inputs';
import { postTeam } from '../../actions/teamActions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

const CreateTeam: React.FC = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    src: '',
    img: '',
    desc: '',
    adminId: -1
  });

  const [image, setImage] = useState('');
  
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ root }) => root.user.user);

  useEffect(() => {
    setFormValues(prevState => ({ ...prevState, ['img']: image }));
  }, [image]);

  useEffect(() => {
    setFormValues(prevState => ({ ...prevState, ['adminId']: user.id }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(formValues);
    dispatch(postTeam(formValues))
  };


  return (
    <div className="bg-slate-100 min-h-[calc(100vh_-_65px_-_148px)]">
      <form>
        <div className="flex flex-row mx-auto justify-center">
        <div className="shadow-md text-center w-[333px] h-[460px] rounded-md mx-2 bg-white flex flex-col">
          <div className="w-full bg-slate-200 h-[52px] flex">
            <span className="text-xl text-left px-8 my-auto">Лого</span>
          </div>
          <div className="px-8 mt-8">
            <UploadImage
              className="mx-auto h-[240px] w-[240px]"
              value={formValues.img}
              onChange={setImage}
            />
            <p className="my-3">JPG или PNG не больше 5 мб</p>
            <p>
              Нажмите на <b>квадрат</b>, чтобы добавить изображение
            </p>
          </div>
        </div>
        <div className="w-[720px] min-h-[250px] bg-white shadow-md">
          <div className="w-full bg-slate-200 h-[52px] flex">
            <span className="text-xl text-left px-8 my-auto">Информация о тайтле</span>
          </div>
          <div className="px-8 my-4 mb-12">
            <Input
              title={'Название команды'}
              input={'Название'}
              helper={'Напишите уникальное значение'}
              name="name"
              onChange={handleChange}
            />
            <Input
              title={'Сайт команды'}
              input={'ссылка'}
              helper={'Обычно пишут ссылки на вк группу, тг-канал'}
              name="src"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="block text-white w-36 mx-auto my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Default
      </button>
      </form>
      
    </div>
  );
};

export default CreateTeam;
