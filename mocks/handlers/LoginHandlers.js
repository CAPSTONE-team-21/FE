// msw/handlers.js
import { http, HttpResponse } from 'msw';

export const loginHandlers = [
  // 로그인
  http.post('/api/login', async ({ request }) => {
    const { email, password } = await request.json();

    if (email === 'unknown') {
      return HttpResponse.json({ message: '존재하지 않는 사용자입니다.' }, { status: 404 });
    }

    if (email === 'test' && password === '123') {
      return HttpResponse.json({
        accessToken: 'fake-access-token',
        refreshToken: 'fake-refresh-token',
        nickname: '테스트',
      });
    }

    return HttpResponse.json({ message: '이메일 또는 비밀번호가 틀렸습니다.' }, { status: 401 });
  }),
];
