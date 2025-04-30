import { HttpResponse, http } from 'msw';
import chatSessions_allView from './dummy/chatSessions_allView.json';

let initSessionId = 3;

export const handlers = [
  // 전체 세션 목록 조회 (사이드바, 메인용)
  http.get('/chat/sessions', () => {
    return HttpResponse.json(chatSessions_allView);
  }),

  http.post('/chat/sessions', async ({ request }) => {
    const { title } = await request.json();

    const newSession = {
      sessionId: initSessionId++,
      title: title || '제목을 입력해주세요.',
      isBookmark: false,
    };
    chatSessions_allView.push(newSession);
    return HttpResponse.json(newSession); // 이게 그대로 res.data
  }),
];
