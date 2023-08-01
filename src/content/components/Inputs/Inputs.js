import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getData, postData } from '../../http/univApi';
import CreatableSelect from 'react-select/creatable';

const SelectedInput = props => {
  const {
    type,
    input,
    title,
    helper,
    name,
    setSelectedOption,
    valueType = 'value',
    isMulti = true,
    onSelect = false
  } = props;
  const [items, setItems] = useState(null);

  useEffect(() => {
    getData(type).then(res => {
      const data = res.map(item => ({
        id: item.id,
        value: item[valueType],
        label: item[valueType]
      }));
      setItems(data);
    });
  }, []);
  console.log();
  if (!items) return null;

  return (
    <div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-[640px] mx-auto px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-3">
            {title}
          </label>
          <Select
            closeMenuOnSelect={onSelect}
            isMulti={isMulti}
            onChange={newValue => setSelectedOption({ target: { name: name, value: newValue } })}
            options={items}
            className="input"
            classNamePrefix="select"
          />
          <p className="text-gray-600 text-xs italic mt-2">{helper}</p>
        </div>
      </div>
    </div>
  );
};

const CreatableInput = props => {
  const { type, name, helper, setSelectedOption, post, get = getData, someV = null } = props;
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    get(type).then(res => {
      const data = res.map(item => ({
        id: item.id,
        value: item.value,
        label: item.value
      }));
      setIsLoading(false);
      setItems(data);
    });
  }, []);

  const handleCreate = async value => {
    setIsLoading(true);
    await post(value, someV).then(res => {
      console.log(res);
      const newValue = { id: res.id, value: res.value, label: res.value, bookId: res.bookId };
      setIsLoading(false);
      setItems(prev => [...prev, newValue]);
    });
  };

  if (!items) return null;

  return (
    <div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-[640px] mx-auto px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-3">
            {type}
          </label>
          <CreatableSelect
            isLoading={isLoading}
            onChange={newValue => setSelectedOption({ target: { name: name, value: newValue } })}
            onCreateOption={handleCreate}
            options={items}
            className="input"
            classNamePrefix="select"
          />
          <p className="text-gray-600 text-xs italic mt-2">{helper}</p>
        </div>
      </div>
    </div>
  );
};

const Input = props => {
  const { title = null, input = null, helper = null, setValue, type = 'text', name } = props;
  return (
    <div className="w-[640px] mx-auto">
      <Label value={title} />
      <input
        className={
          'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
        }
        onChange={setValue}
        type={type}
        name={name}
        placeholder={input}
      />
      <p className="text-gray-600 text-xs italic">{helper}</p>
    </div>
  );
};

const Label = ({ value, className = '' }) => {
  return (
    <label
      className={
        'uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-3' + ' ' + className
      }>
      {value}
    </label>
  );
};

export { SelectedInput, CreatableInput, Input, Label };
