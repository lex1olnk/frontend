import React from 'react';

const UploadImage = ({ value, setValue, className }) => {
  const phone = value ? window.URL.createObjectURL(value) : null;
  const input = React.useRef(null);
  return (
    <div className={className}>
      <img
        className={'bg-white h-full w-full rounded-md border-2 object-cover border-gray-200'}
        style={{
          backgroundImage: 'url(' + phone + ')',
          backgroundSize: '240px auto'
        }}
        onClick={() => input.current.click()}></img>
      <input
        type="file"
        id="logoInput"
        ref={input}
        onChange={e => setValue({ target: { name: 'img', value: e.target.files[0] } })}
        hidden={true}
      />
    </div>
  );
};

export default UploadImage;
