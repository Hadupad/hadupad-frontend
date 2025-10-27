
// conversationApi.js
const CONVERSATION_URL = process.env.NEXT_PUBLIC_CONVERSATION_API_URL;

export const fetchConversations = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  const res = await fetch(`${CONVERSATION_URL}conversations`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const responseData = await res.json();
  // console.log("Fetched Conversations Data:", responseData);

  if (!res.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to fetch conversations');
  }

  // Normalize the response - check if it's already an array or wrapped in data
  if (Array.isArray(responseData)) {
    return {
      data: {
        conversations: responseData,
        totalCount: responseData.length,
        totalPages: 1,
        currentPage: 1,
      }
    };
  }

  return responseData;
};