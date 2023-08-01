import React, { useState } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

const TABLE_HEAD = [
  { value: '', style: '' },
  { value: 'Название', style: 'w-1/2' },
  { value: '', style: '' },
  { value: 'Статус', style: '' },
  { value: 'Понравилось', style: '' },
  { value: 'Просмотров', style: '' },
  { value: 'Обновлено', style: '' }
];

const Td = props => {
  const { value, textAlign = 'center', onClick, className, key } = props;
  return (
    <td
      key={key}
      style={{ textAlign }}
      onClick={onClick}
      className={'px-1 py-3 text-md font-medium text-gray-800 whitespace-nowrap ' + className}>
      {value}
    </td>
  );
};

const Tbody = props => {
  const { cols, rows, rowNames, isEditor, titleId } = props;
  const [active, setActive] = useState(false);

  const click = () => {
    setActive(!active);
  };

  return (
    <tbody className="divide-gray-200 border-b-2" key={cols.id}>
      <tr>
        <td className="w-8"></td>
        <Td value={cols.value} onClick={click} textAlign="left" />
      </tr>
      {rows.map(row => {
        const rowTime = new Date(row.updatedAt);
        const time =
          rowTime.getDate() + '.' + (rowTime.getMonth() + 1) + '.' + rowTime.getFullYear();
        return (
          <tr
            key={row.id}
            style={{
              opacity: active ? 1 : 0,
              transition: 'all 0.3s linear',
              overflow: !active && 'hidden',
              display: active ? 'table-row' : 'none'
            }}>
            <td className="h-fit">
              <input
                type="checkbox"
                value=""
                className="flex m-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
            </td>
            {rowNames.map(name =>
              name !== 'edit' ? (
                <Td
                  value={row[name]}
                  key={row.id + row[name]}
                  textAlign={name === 'name' ? 'left' : 'center'}
                />
              ) : (
                <td key={row.id + name}>
                  <a href={'/title/' + titleId + '/' + row['id'] + '/import'}>Импортировать</a>
                </td>
              )
            )}
            <Td value={time} />
            {isEditor && (
              <td className="m-auto p-2">
                <ModeEditIcon />
              </td>
            )}
          </tr>
        );
      })}
    </tbody>
  );
};

export const MyTable = props => {
  const { isEditor = true, setIsEditor, cols, rowName, titleId } = props;
  if (!cols) return;
  return (
    <div className="flex flex-col max-w-full mx-auto">
      <table className="min-w-full  divide-gray-200">
        <thead>
          <tr>
            {TABLE_HEAD.map((item, index) => (
              <th
                key={item.value}
                scope="col"
                style={{ textAlign: index > 1 ? 'center' : 'left' }}
                className={'px-1 py-3 text-md font-bold text-gray-500 ' + item.style}>
                {item.value}
              </th>
            ))}
          </tr>
        </thead>
        {cols.map(col => (
          <Tbody
            cols={col}
            rows={col[rowName]}
            rowNames={['name', 'edit', 'likes', 'views', 'downloaded']}
            isEditor={isEditor}
            titleId={titleId}
          />
        ))}
      </table>
    </div>
  );
};

export const SimpleTable = props => {
  const { cols, rows } = props;
  console.log(rows);
  if (!rows) return;
  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <table className="min-w-full  divide-gray-200">
        <thead>
          <tr>
            {cols.map((item, index) => (
              <th
                key={item}
                scope="col"
                style={{ textAlign: index > 0 ? 'center' : 'left' }}
                className={'px-1 py-3 text-md font-bold text-gray-500 '}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.name} className="h-12 text-center">
              <td className="flex flex-row my-auto py-2">
                <img
                  src={process.env.REACT_APP_API_URL + '/img/' + row.img}
                  className="my-auto rounded-full border-spacing-1 aspect-square w-12 object-cover"
                />{' '}
                <span className="ml-4 my-auto">{row.name}</span>
              </td>
              <td>
                <a href={'/team/' + row.id}>users</a>
              </td>
              <td>
                <a href={'/team/' + row.id}>titles</a>
              </td>
              <td>
                <a>likes</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
