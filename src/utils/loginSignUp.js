import api from './api';

// 로그인
export const login = async (email, password) => {
  try {
    const { data } = await api.post('/api/auth/login', { email, password });
    return data;
  } catch (error) {
    console.error('로그인 실패:', error);
    throw error;
  }
};

// 회원가입
export const signup = async (nickname, email, password) => {
  try {
    const { data } = await api.post('/api/auth/signup', { nickname, email, password });
    return data;
  } catch (error) {
    console.error('회원가입 실패:', error);
    throw error;
  }
};
