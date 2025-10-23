const CONVERSATION_URL = process.env.NEXT_PUBLIC_CONVERSATION_API_URL;

export const fetchConversation = async ({ conversationId }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');
  if (!conversationId) throw new Error('Conversation ID is required');

  const res = await fetch(`${CONVERSATION_URL}conversations/${conversationId}?page=1&limit=50`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to fetch previous conversation');
  }

  return responseData;
};