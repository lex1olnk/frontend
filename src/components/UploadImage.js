import React from 'react';

const UploadImage = ({ value, onChange, className }) => {
  const phone = value ? window.URL.createObjectURL(value) : null;
  console.log(value);
  const input = React.useRef(null);
  return (
    <div className={className}>
      <img
        className='bg-white h-full w-full rounded-md object-cover'
        style={{
          backgroundImage: 'url(' + phone + ')',
          backgroundSize: '240px auto'
        }}
        onClick={() => input.current.click()}></img>
      <input
        type="file"
        id="logoInput"
        ref={input}
        onChange={e => onChange(e.target.files[0])}
        hidden={true}
      />
    </div>
  );
};

export default UploadImage;
