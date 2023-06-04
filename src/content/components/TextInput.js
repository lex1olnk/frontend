const Input = ({ title = null, input = null, helper = null, value, setValue }) => {
  return (
    <div className="flex flex-col -mx-3 mb-6">
      <div className="w-[640px] mx-auto px-3">
        <Label value={title} />
        <input
          className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 my-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={e => setValue(e.target.value)}
          value={value}
          placeholder={input}
        />
        <p className="text-gray-600 text-xs italic">{helper}</p>
      </div>
    </div>
  );
};

const Label = ({ value }) => {
  return (
    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mx-auto">
      {value}
    </label>
  );
};

export { Input, Label };
