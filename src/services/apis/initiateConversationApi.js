// services/apis/initiateConversationApi.js
const CONVERSATION_URL = process.env.NEXT_PUBLIC_CONVERSATION_API_URL;

export const initiateConversation = async ({ recipientId, propertyId, message }) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');
  if (!recipientId) throw new Error('Recipient ID is required');
  if (!propertyId) throw new Error('Property ID is required');

  const res = await fetch(`${CONVERSATION_URL}/conversations/get-or-create`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      recipientId,
      propertyId,
      message, // Include the message
    }),
    cache: 'no-store',
  });

  const responseData = await res.json();
  console.log('Initiate Conversation API Response:', responseData); // DEBUG

  if (!res.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to initiate conversation');
  }

  return responseData;
};