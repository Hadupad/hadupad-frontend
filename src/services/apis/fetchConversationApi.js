const CONVERSATION_URL = process.env.NEXT_PUBLIC_CONVERSATION_API_URL;

export const fetchConversation = async ({ conversationId }) => {
  //console.log('Fetching conversation with ID:', conversationId);
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.error('No access token found in localStorage');
    throw new Error('No access token found. Please log in.');
  }
  if (!conversationId) {
    console.error('No conversation ID provided');
    throw new Error('Conversation ID is required');
  }

  const url = new URL(`${CONVERSATION_URL}conversations/${conversationId}`);
  url.searchParams.append('page', '1');
  url.searchParams.append('limit', '50');

  //console.log('API Request URL:', url.toString());
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const responseData = await res.json();
  //console.log('API Response:', responseData);

  if (!res.ok) {
    console.error('API Error:', responseData);
    if (responseData.message === 'Failed to get conversation: User is not a participant in this conversation') {
      throw new Error('You are not a participant in this conversation');
    }
    throw new Error(responseData.error || responseData.message || 'Failed to fetch previous conversation');
  }

  return responseData;
};