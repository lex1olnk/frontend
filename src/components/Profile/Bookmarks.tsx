import React, { useState } from 'react'
import { Book } from '../../interfaces/book'

type BookmarksProps = {
  books: Book[]
}

const Bookmarks: React.FC<BookmarksProps> = props => {
  const { books } = props;
  const [value, setValue] = useState('1')
  const currentBooks = books.filter(book => book.bookmark === value)

  const handleClick = (value)

  return (
    <div>
      <div>
        <a onClick={() => setValue('')}>
          Все
        </a>
        <a onClick={() => setValue('reading')}>
          Читаю
        </a>
        <a onClick={() => setValue('abandoned')}>
          Брошено
        </a>
        <a onClick={() => setValue('planned')}>
          Буду читать
        </a>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Bookmarks
