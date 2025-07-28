// components/BookingFilter.jsx
const BookingFilter = ({ filter, setFilter, search, setSearch }) => {
    const filters = ['All', 'Pending', 'Paid', 'Cancelled', 'Refunds'];
  
    return (
      <div className="flex flex-col md:flex-row justify-between mt-6 mb-4 gap-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter booking code e.g 12FWKL4"
          className="w-[571px] md:w-2/3 p-2 border-red-500 rounded-md text-sm bg-gray-50"
        />
        <div className="flex gap-4 mx-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm font-medium cursor-pointer ${
                filter === f ? 'text-red-600 underline' : 'text-gray-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default BookingFilter;
  