const CONVERSATION_URL = process.env.NEXT_PUBLIC_CONVERSATION_API_URL;

export const sendMessage = async ({ conversationId, message, type }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');
  if (!conversationId) throw new Error('Conversation ID is required');
  if (!message) throw new Error('Message content is required');

  const res = await fetch(`${CONVERSATION_URL}conversations/${conversationId}/messages`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: message,
      type: type || 'text',
    }),
    cache: 'no-store',
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to send message');
  }

  return responseData;
};