// msw/handlers.js
import { http, HttpResponse } from 'msw';

export const loginHandlers = [
  // 회원가입
  http.post('/api/auth/signup', async ({ request }) => {
    const body = await request.json();
    console.log('📨 회원가입 요청 바디:', body); // ✅ 추가
    const { email } = body;

    if (email === 'existing@example.com') {
      return HttpResponse.json({ message: '이미 존재하는 이메일입니다.' }, { status: 400 });
    }
    return HttpResponse.json(
      {
        accessToken: 'fake-access-token',
        refreshToken: 'fake-refresh-token',
      },
      { status: 201 }
    );
  }),

  // 로그인
  http.post('/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json();

    if (email === 'unknown') {
      return HttpResponse.json({ message: '존재하지 않는 사용자입니다.' }, { status: 404 });
    }

    if (email === 'test' && password === '123') {
      return HttpResponse.json({
        accessToken: 'fake-access-token',
        refreshToken: 'fake-refresh-token',
      });
    }

    return HttpResponse.json({ message: '이메일 또는 비밀번호가 틀렸습니다.' }, { status: 401 });
  }),
];
