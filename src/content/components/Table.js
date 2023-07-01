import React from 'react';

const TABLE_HEAD = [
  { value: 'Название', style: 'pr-64' },
  { value: 'Статус перевода', style: '' },
  { value: 'Понравилось', style: '' },
  { value: 'Просмотров', style: '' },
  { value: 'Дата добавления', style: '' },
  { value: 'Скачать', style: '' }
];

const TABLE_DATA = ['Глава: 1', 'Готово', 1, 1, '01.07.2023'];

export default function Table() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto">
      <div className="overflow-x-auto">
        <div className="mt-4 w-full inline-block align-middle">
          <div className="overflow-hidden rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {TABLE_HEAD.map((item, index) => (
                    <th
                      scope="col"
                      style={{ textAlign: index > 0 ? 'center' : 'left' }}
                      className={'px-3 py-3 text-md font-bold text-gray-500 ' + item.style}>
                      {item.value}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  {TABLE_DATA.map((item, index) => (
                    <td
                      style={{ textAlign: index > 0 ? 'center' : 'left' }}
                      className="text-center px-3 py-3 text-md font-medium text-gray-800 whitespace-nowrap">
                      {item}
                    </td>
                  ))}
                  <td className="h-fit">
                    <input
                      type="checkbox"
                      value=""
                      className="flex m-auto w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                  </td>
                </tr>
                <tr>
                  {TABLE_DATA.map((item, index) => (
                    <td
                      style={{ textAlign: index > 0 ? 'center' : 'left' }}
                      className="text-center px-3 py-3 text-md font-medium text-gray-800 whitespace-nowrap">
                      {item}
                    </td>
                  ))}
                  <td className="h-fit">
                    <input
                      type="checkbox"
                      value=""
                      className="flex m-auto w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                  </td>
                </tr>
                <tr>
                  {TABLE_DATA.map((item, index) => (
                    <td
                      style={{ textAlign: index > 0 ? 'center' : 'left' }}
                      className="text-center px-3 py-3 text-md font-medium text-gray-800 whitespace-nowrap">
                      {item}
                    </td>
                  ))}
                  <td className="h-fit">
                    <input
                      type="checkbox"
                      value=""
                      className="flex m-auto w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
