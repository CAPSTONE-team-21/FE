import { HttpResponse, http } from 'msw';
import chatSessions_allView from '../dummy/chatSessions_allView.json';

let initSessionId = 3;

export const handlers = [
  // 전체 세션 목록 조회 (사이드바, 메인용)
  http.get('/chat/sessions', () => {
    return HttpResponse.json(chatSessions_allView);
  }),

  // 새 세션 생성
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

  // title 수정
  http.patch('/chat/sessions/:id/title', async ({ params, request }) => {
    const { id } = params; // URL 경로에 있는 :id 값을 꺼냄
    const { title } = await request.json(); //요청 바디에서 title값 꺼냄

    //chatSessions_allView 배열에서 sessionId가 일치하는 index 찾음
    const sessionIndex = chatSessions_allView.findIndex((s) => s.sessionId === Number(id)); //문자열id를 숫자로

    // 못찾으면 -1반환하고 404에러
    if (sessionIndex === -1) {
      return HttpResponse.json({ message: '세션을 찾을 수 없습니다.' }, { status: 404 });
    }

    // 제목을 새 title로 바꿈
    chatSessions_allView[sessionIndex].title = title;

    // 수정된 것 객체로 return
    return HttpResponse.json(chatSessions_allView[sessionIndex]); // 프론트에서 setChatSessions할 수 있게
  }),
];
