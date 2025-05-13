import { http, HttpResponse } from 'msw';
import originalSessions from '../dummy/chatSessions_allView.json';

const chatSessions_allView = [...originalSessions]; // 수정 가능한 복사본
let bookmarks = chatSessions_allView.filter((s) => s.isBookmark).map((s) => s.sessionId); // 초기값 세션 기준으로 북마크 목록 구성

export const bookmarkHandlers = [
  // 북마크 추가
  http.post('/api/bookmarks', async ({ request }) => {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return HttpResponse.json({ message: '요청 데이터가 잘못되었습니다.' }, { status: 400 });
    }

    if (typeof sessionId !== 'number') {
      return HttpResponse.json({ message: '세션 ID 형식이 잘못되었습니다.' }, { status: 400 });
    }

    const target = chatSessions_allView.find((s) => s.sessionId === sessionId);
    if (!target) {
      return HttpResponse.json({ message: '해당 세션 ID가 존재하지 않습니다.' }, { status: 404 });
    }

    // 이미 북마크 안 되어 있다면 추가
    if (!bookmarks.includes(sessionId)) {
      bookmarks.push(sessionId);
      target.isBookmark = true; // ✅ 세션 정보에 반영
    }

    return HttpResponse.json({ message: '북마크가 추가되었습니다.' }, { status: 200 });
  }),

  // 북마크 삭제
  http.delete('/api/bookmarks/:id', ({ params }) => {
    const id = Number(params.id);

    if (isNaN(id)) {
      return HttpResponse.json({ message: 'ID 형식이 잘못되었습니다.' }, { status: 400 });
    }

    const target = chatSessions_allView.find((s) => s.sessionId === id);
    if (!target) {
      return HttpResponse.json({ message: '해당 세션 ID가 존재하지 않습니다.' }, { status: 404 });
    }

    const index = bookmarks.indexOf(id);
    if (index === -1) {
      return HttpResponse.json(
        { message: '해당 세션 ID가 북마크되어 있지 않습니다.' },
        { status: 404 }
      );
    }

    bookmarks.splice(index, 1); // 목록에서 제거
    target.isBookmark = false; // ✅ 세션 정보에 반영

    return new HttpResponse(null, { status: 204 }); // No Content
  }),

  // 북마크 목록 조회
  http.get('/api/bookmarks', () => {
    const data = bookmarks.map((id) => {
      const s = chatSessions_allView.find((s) => s.sessionId === id);
      return {
        sessionId: s.sessionId,
        title: s.title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });

    return HttpResponse.json(data, { status: 200 });
  }),
];
