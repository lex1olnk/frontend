import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const QuillComponent = () => {
  const [value, setValue] = useState('')

  return (
    <ReactQuill
      theme='snow'
      value={value}
      onChange={setValue}
      formats={QuillComponent.formats}
      modules={QuillComponent.modules}
    />

  )
}

QuillComponent.modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['link'],
    [{ 'align': [] }],
    ['clean'],
  ],
};

QuillComponent.formats = [
  'bold',
  'italic',
  'underline',
  'link',
  'align',
];

export default QuillComponent
