// 회원가입
import api from './api';

export const signup = async (nickname, email, password, passwordConfirm) => {
  console.log('signup 함수 호출됨');
  try {
    const { data } = await api.post('/api/auth/signup', {
      nickname,
      email,
      password,
      passwordConfirm, // ✅ 비밀번호 확인 추가
    });

    // accessToken 없으면 실패 (400 응답 등)
    if (data.accessToken) {
      return { success: true, data };
    } else if (data.message) {
      return { success: false, error: data.message }; // 핸들러에서 내려준 에러 메시지
    }

    return { success: false, error: '알 수 없는 오류가 발생했습니다.' };
  } catch (error) {
    console.error('회원가입 실패:', error);

    if (error.response && error.response.status === 400) {
      return { success: false, error: '이미 존재하는 이메일입니다.' };
    }
    if (error.response && error.response.data && error.response.data.message) {
      return { success: false, error: error.response.data.message };
    }
    return { success: false, error: '회원가입 중 오류가 발생했습니다.' };
  }
};
