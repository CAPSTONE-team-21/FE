import api from './api';

// 회원가입
// 네 개의 매개변수 받음
export const signup = async (nickname, email, password) => {
  console.log('signup 함수 호출됨');
  try {
    const { data } = await api.post('/api/auth/signup', {
      nickname,
      email,
      password,
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

// 이메일 인증
export const sendEmailCode = async (email) => {
  try {
    // post시 email을 JSON body로 보냅니다: { email: "입력한 이메일" }
    const res = await api.post('/api/auth/email/send', { email });
    // 요청 성공 시: 응답 결과에서 message를 꺼내서, 성공 플래그(success: true)와 함께 객체로 반환합니다.
    // 예: { success: true, message: "인증 코드가 발송되었습니다." }
    return { success: true, message: res.data.message };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: '인증 요청 중 오류가 발생했습니다.' };
  }
};

// 이메일 인증 코드 확인
export const verifyEmailCode = async (email, code) => {
  try {
    const res = await api.post('/api/auth/email/verify', { email, code });

    return { success: true, message: res.data.message }; // 예: "이메일 인증 성공!"
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 400 || status === 404) {
      return { success: false, message }; // 예: "코드가 일치하지 않음", "발송 안 됨"
    }

    return { success: false, message: '인증 확인 중 오류가 발생했습니다.' };
  }
};
