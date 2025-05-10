// 회원가입
import api from './api';

export const signup = async (nickname, email, password) => {
  try {
    const { data } = await api.post('/api/auth/signup', { nickname, email, password });
    return data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};
