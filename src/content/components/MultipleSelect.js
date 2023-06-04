import React from 'react';
import axios from 'axios';
import Select from 'react-select';

const MultipleSelect = ({ type, input, helper }) => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    axios.get(`http://localhost:5000/api/` + type + '/all').then(res => {
      const data = res.data.map(item => ({
        id: item.id,
        value: item.value,
        label: item.value
      }));

      setItems(data);
    });
  }, []);

  if (!items) return null;

  console.log('selected', selectedOption);

  return (
    <div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-[640px] mx-auto px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            {type}
          </label>
          <Select
            closeMenuOnSelect={false}
            isMulti
            name={input}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={items}
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <p className="text-gray-600 text-xs italic">{helper}</p>
        </div>
      </div>
    </div>
  );
};

export default MultipleSelect;
