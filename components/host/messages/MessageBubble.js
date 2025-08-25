export default function MessageBubble({ text, time, mine = false, media, sender }) {
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${mine ? 'mr-4' : 'ml-4'}`}>
        {/* Message bubble */}
        <div className={`px-4 py-2 rounded-2xl ${
          mine 
            ? 'bg-blue-500 text-white rounded-br-sm' 
            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
        }`}>
          {media && (
            <div className="mb-2">
              <img src={media.image} alt="media" className="rounded-lg w-full max-w-[250px] object-cover mb-1" />
              <p className="text-sm opacity-90">{media.caption}</p>
            </div>
          )}
          <p className="text-sm leading-relaxed">{text}</p>
        </div>
        
        {/* Time and status */}
        <div className={`flex items-center gap-1 mt-1 px-1 ${mine ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500">{time}</span>
          {mine && (
            <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
