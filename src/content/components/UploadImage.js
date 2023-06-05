import React from 'react';

const UploadImage = ({ value, setValue, className }) => {
  const phone = value ? window.URL.createObjectURL(value) : null;
  const input = React.useRef(null);
  console.log(value);
  return (
    <div
      className={
        'flex bg-white rounded-md border-2 border-b-slate-300 aspect-3/4 w-60 text-gray-700 border-gray-200  p-6 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' +
        ' ' +
        className
      }
      style={{
        background: 'url(' + phone + ')',
        resize: 'cover'
      }}
      onClick={() => input.current.click()}>
      {!value ? <span className="m-auto text-center">Нажмите, чтобы добавить картину</span> : null}
      <input
        type="file"
        id="logoInput"
        ref={input}
        onChange={e => setValue(e.target.files[0])}
        hidden={true}
      />
    </div>
  );
};

export default UploadImage;
