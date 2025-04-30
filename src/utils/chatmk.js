import axios from 'axios';

// 세션 목록 조회
export const fetchChatSessions = async () => {
  try {
    const response = await axios.get('/api/chat/sessions');
    return response.data;
  } catch (error) {
    console.error('세션 목록 불러오기 실패:', error);
    throw error;
  }
};

// 세션 생성
export const createChatSession = async () => {
  try {
    const response = await axios.post('/api/chat/sessions', { title: '제목을 입력해주세요.' });
    return response.data; // sessionId 포함
  } catch (error) {
    console.error('세션 생성 실패:', error);
    throw error;
  }
};

// 제목 수정
export const updateChatTitle = async (sessionId, newTitle) => {
  try {
    const response = await axios.patch(`/api/chat/sessions/${sessionId}/title`, {
      title: newTitle,
    });
    return response.data;
  } catch (error) {
    console.error('제목 수정 실패:', error);
    throw error;
  }
};
