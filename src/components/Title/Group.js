export const Group = ({ title, items }) => {
  const data = items;
  if (!data) return;
  return (
    <div className="flex flex-row flex-wrap mt-2">
      {data.map(item => (
        <div
          className="bg-cred text-white text-sm px-3 py-1 my-1 mr-2 rounded-md border-b-2"
          key={item.id + item.value}>
          {item.value}
        </div>
      ))}
    </div>
  );
};
