export default function MessageBubble({ text, time, mine = false, media }) {
  const baseClasses = "max-w-[60%] px-4 py-2 rounded-xl text-sm";
  const bubbleStyles = mine
    ? "bg-yellow-100 self-end text-black"
    : "bg-gray-100 self-start text-black";

  return (
    <div className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
      <div className={`${baseClasses} ${bubbleStyles}`}>
        {media && (
          <div className="mb-2">
            <p className="font-medium mb-1">{media.caption}</p>
            <img src={media.image} alt="media" className="rounded-lg max-w-xs" />
          </div>
        )}
        <p>{text}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1">{time}</span>
    </div>
  );
}
