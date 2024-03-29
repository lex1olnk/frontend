import React, { useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { useNavigate } from 'react-router-dom'

const TABLE_HEAD = [
  { value: '', style: '' },
  { value: 'Название', style: 'w-1/2' },
  { value: '', style: '' },
  { value: 'Статус', style: '' },
  { value: 'Понравилось', style: '' },
  { value: 'Просмотров', style: '' },
  { value: 'Обновлено', style: '' },
]

const Td = (props: any) => {
  const { value, textAlign = 'center', onClick, className, key, href } = props
  return (
    <td
      key={key}
      style={{ textAlign }}
      className={'px-1 py-3 text-md font-medium text-gray-800 whitespace-nowrap ' + className}
    >
      <button onClick={onClick}>{value}</button>
    </td>
  )
}

const Tbody = (props: any) => {
  const { cols, rows, rowNames, isEditor, bookId } = props
  const [active, setActive] = useState(false)
  const navigate = useNavigate()
  const click = () => {
    setActive(!active)
  }

  return (
    <tbody className='divide-gray-200 border-b-2' key={cols.id}>
      {rows.map((row: any) => {
        const rowTime = new Date(row.updatedAt)
        const time =
          rowTime.getDate() + '.' + (rowTime.getMonth() + 1) + '.' + rowTime.getFullYear()
        return (
          <tr key={row.id}>
            <td className='h-fit'>
              <input
                type='checkbox'
                value=''
                className='flex m-auto w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded'
              />
            </td>
            {rowNames.map((name: any) =>
              name !== 'edit' ? (
                <Td
                  value={row[name]}
                  key={row.id + row[name]}
                  textAlign={name === 'name' ? 'left' : 'center'}
                  onClick={() => name === 'name' && navigate(`/book/${bookId}/${row['id']}`)}
                />
              ) : (
                <td key={row.id + name}>
                  <button onClick={() => navigate(`/book/${bookId}/${row['id']}/import`)}>
                    Импортировать
                  </button>
                </td>
              ),
            )}
            <Td value={time} />
            {isEditor && (
              <td className='m-auto p-2'>
                <ModeEditIcon />
              </td>
            )}
          </tr>
        )
      })}
    </tbody>
  )
}

export const MyTable = (props: any) => {
  const { isEditor = true, setIsEditor, cols, rowName, bookId } = props
  if (!cols) return null
  return (
    <div className='flex flex-col max-w-full mx-auto'>
      <table className='min-w-full  divide-gray-200'>
        <thead>
          <tr>
            {TABLE_HEAD.map((item, index) => (
              <th
                key={item.value}
                scope='col'
                style={{ textAlign: index > 1 ? 'center' : 'left' }}
                className={'px-1 py-3 text-md font-bold text-gray-500 ' + item.style}
              >
                {item.value}
              </th>
            ))}
          </tr>
        </thead>
        {cols.map((col: any) => (
          <Tbody
            key={col}
            cols={col}
            rows={col[rowName]}
            rowNames={['name', 'edit', 'likes', 'views', 'downloaded']}
            isEditor={isEditor}
            bookId={bookId}
          />
        ))}
      </table>
    </div>
  )
}

export const SimpleTable = (props: any) => {
  const { cols, rows, loading } = props
  console.log(rows)
  return (
    <div className='flex flex-col max-w-5xl mx-auto'>
      <table className='min-w-full  divide-gray-200'>
        <thead>
          <tr>
            {cols.map((item: any, index: number) => (
              <th
                key={item}
                scope='col'
                style={{ textAlign: index > 0 ? 'center' : 'left' }}
                className={'px-1 py-3 text-md font-bold text-gray-500 '}
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            rows.map((row: any) => (
              <tr key={row.name} className='h-12 text-center'>
                <td className='flex flex-row my-auto py-2'>
                  <img
                    src={process.env.REACT_APP_API_URL + '/img/' + row.img}
                    className='my-auto rounded-full border-spacing-1 aspect-square w-12 object-cover'
                  />{' '}
                  <span className='ml-4 my-auto'>{row.name}</span>
                </td>
                <td>
                  <a href={'/team/' + row.id}>{row.name}</a>
                </td>
                <td>
                  <a href={'/team/' + row.id}>titles</a>
                </td>
                <td>
                  <a>likes</a>
                </td>
              </tr>
            ))
          ) : (
            <>
            <tr className='h-12 text-center'>
              <td className='flex flex-row my-auto py-2'>
                <div className='my-auto bg-slate-300 rounded-full border-spacing-1 aspect-square w-12'></div>
                <div className='h-4 w-2/3 bg-slate-300 m-auto rounded-lg'></div>
              </td>
              <td>
                <div className='h-4 w-12 bg-slate-300 mx-auto rounded-lg'></div>
              </td>
              <td>
                <div className='h-4 w-12 bg-slate-300 mx-auto rounded-lg'></div>
              </td>
              <td>
                <div className='h-4 w-12 bg-slate-300 mx-auto rounded-lg'></div>
              </td>
            </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  )
}
