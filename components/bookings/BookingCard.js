// components/BookingCard.jsx

const BookingCard = ({ booking }) => {
    const { image, title, location, price, date, code, status } = booking;
  
    const statusMap = {
      Cancelled: { action: 'Re-book', color: 'red' },
      Pending: { action: 'Pay Now', color: 'green' },
      Paid: { action: 'Print Receipt', color: 'gray' },
    };
  
    const { action, color } = statusMap[status] || { action: 'View', color: 'gray' };
  
    return (
      <div className="rounded-2xl shadow border p-4 w-full max-w-sm flex flex-col justify-between border-gray-200">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-black">{title}</h3>
            <img src={image} alt="Property" className="w-12 h-12 rounded-full object-cover" />
          </div>
          <p className="text-sm text-gray-600 mt-1">{location}</p>
          <p className="text-sm text-black mt-1 font-medium">₦{price} night</p>
  
          <div className="flex justify-between mt-4 text-sm">
            <div>
              <p className="text-gray-400">Date</p>
              <p className="font-semibold">{date}</p>
            </div>
            <div>
              <p className="text-gray-400">Code</p>
              <p className="font-semibold">{code}</p>
            </div>
          </div>
        </div>
  
        <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200 text-sm">
          <p className={`${color === 'gray' ? 'text-gray-400 line-through' : 'text-gray-400'}`}>{status}</p>
          <button className={`font-medium ${color === 'red' ? 'text-red-500' : color === 'green' ? 'text-green-500' : 'text-gray-500'}`}>
            {action}
          </button>
        </div>
      </div>
    );
  };
  
  export default BookingCard;
  