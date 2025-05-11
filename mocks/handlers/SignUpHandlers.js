// msw/handlers.js
import { http, HttpResponse } from 'msw';

console.log('[회원가입 핸들러 실행]');
export const SignUpHandlers = [
  // ✅ 회원가입

  http.post('/api/signup', async ({ request }) => {
    const body = await request.json();
    console.log('📨 [회원가입] 요청 바디:', body);
    const { email, nickname, password, passwordConfirm } = body;

    if (!email || !nickname || !password || !passwordConfirm) {
      console.log('[MSW] 필수값 누락 조건문 실행됨');
      return HttpResponse.json(
        { message: '이메일, 닉네임, 비밀번호, 비밀번호 확인은 필수입니다.' },
        { status: 400 }
      );
    }

    if (email === 'existing@example.com') {
      return HttpResponse.json({ message: '이미 존재하는 이메일입니다.' }, { status: 400 });
    }
    if (password !== passwordConfirm) {
      return HttpResponse.json(
        { message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { accessToken: 'fake-access-token', refreshToken: 'fake-refresh-token' },
      { status: 201 }
    );
  }),

  // ✅ 이메일 인증 코드 발송
  http.post('/api/email/send', async ({ request }) => {
    const body = await request.json();
    console.log('📨 [이메일 인증 요청] 요청 바디:', body);
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return HttpResponse.json(
        { message: '이메일 형식이 잘못되었거나 누락되었습니다.' },
        { status: 400 }
      );
    }

    return HttpResponse.json({ message: '인증 코드가 발송되었습니다.' }, { status: 200 });
  }),

  // ✅ 이메일 인증 코드 확인
  http.post('/api/email/verify', async ({ request }) => {
    const body = await request.json();
    console.log('📨 [이메일 인증 확인] 요청 바디:', body);
    const { email, code } = body;

    if (!email || !code) {
      return HttpResponse.json(
        { message: '이메일 형식이 잘못되었거나 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 🟢 테스트용: 이메일이 'test@example.com' + code 'ABC123' 일 때만 성공
    if (email === 'test@example.com' && code === 'ABC123') {
      return HttpResponse.json({ message: '이메일 인증 성공!' }, { status: 200 });
    }

    if (email === 'test@example.com') {
      return HttpResponse.json({ message: '인증 코드가 일치하지 않습니다.' }, { status: 400 });
    }

    return HttpResponse.json({ message: '인증 코드가 발송되지 않았습니다.' }, { status: 404 });
  }),
];
