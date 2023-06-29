import React from 'react';
import Select from 'react-select';
import { getData } from '../http/univApi';

const SelectedInput = ({
  type,
  input,
  helper,
  selectedOption,
  setSelectedOption,
  valueType = 'value',
  isMulti = true,
  onSelect = false
}) => {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    getData(type).then(res => {
      const data = res.map(item => ({
        id: item.id,
        value: item[valueType],
        label: item[valueType]
      }));
      setItems(data);
    });
  }, []);

  if (!items) return null;

  return (
    <div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-[640px] mx-auto px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ml-3">
            {type}
          </label>
          <Select
            closeMenuOnSelect={onSelect}
            name={input}
            isMulti={isMulti}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
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

export default SelectedInput;
