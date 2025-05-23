import { HttpResponse, http } from 'msw';
import chatSessions_allView from '../dummy/chatSessions_allView.json';
import { sessionMessagesMap } from '../dummy/sessionMessagesMap';
import { sessionSummaries } from '../dummy/sessionSummaries';
let initSessionId = 3;

export const chatHandlers = [
  // 전체 세션 목록 조회 (사이드바, 메인용)
  http.get('/api/chat/sessions', () => {
    return HttpResponse.json(chatSessions_allView);
  }),

  // 새 세션 생성
  http.post('/api/chat/sessions', async ({ request }) => {
    let body = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }
    const title = body.title || '제목을 입력해주세요.';

    const newSession = {
      sessionId: initSessionId++,
      title: title || '제목을 입력해주세요.',
      isBookmark: false,
    };
    chatSessions_allView.push(newSession);
    return HttpResponse.json(newSession); // 이게 그대로 res.data
  }),

  // title 수정
  http.patch('/api/chat/sessions/:id/title', async ({ params, request }) => {
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

  // 메시지 전송 (AI 응답 포함)
  http.post('/api/chat/:id/messages', async ({ params, request }) => {
    const { id } = params;
    const { message, skinTypes } = await request.json();

    const types =
      skinTypes && skinTypes.length > 0 ? skinTypes : ['DRY', 'OILY', 'SENSITIVE', 'COMBINED'];

    const responses = types.flatMap((type) => [
      {
        sender: 'BOT',
        skinType: type,
        message: `[MOCK:${type}] "첫번째 응답: 🩷 포뮬라랩 병풀 진정 앰플 리뷰입니다! 🩷

☑️ 이 제품을 구매하게 된 이유!
저는 평소에 피부 진정에 관심이 많아서 포뮬라랩의 다양한 제품을 사용해보고 있어요. 이번에는 병풀 진정 앰플을 구매하게 된 이유는 피부가 민감하고 쉽게 붉어지는 편이라, 진정 효과가 뛰어난 제품을 찾고 싶었기 때문이에요.

☑️ 제품 특징
	•	성분: 병풀 추출물과 마데카소사이드가 함유되어 있어 피부 진정과 재생에 도움을 줍니다.
	•	제형: 점도 높은 젤 타입으로, 끈적임 없이 부드럽게 발립니다.
	•	용기: 스포이드형으로 사용이 편리하고, 위생적입니다.
	•	가격: 28,000원으로 다소 비싼 편이지만, 그만큼의 가치가 있다고 생각해요.`,
      },
      {
        sender: 'BOT',
        skinType: type,
        message: `[MOCK:${type}] "두번째 응답: ☑️ 이 제품을 선택한 이유! 

➡️ 촉촉한 수분을 채워주고 싶어서 히알룰론산 앰플을 찾아보고 있었는데, 포뮬라랩의 신제품이 눈에 띄더라고요! 특히 병풀 추출물과 마데카소사이드 성분이 들어가 있어 피부 진정에도 효과적일 것 같아서 선택했습니다. 

☑️ 제품 특징 

➡️ 점도 높은 젤 타입의 제형으로, 수분을 꽉 잡아줄 것 같은 느낌이 들어요. 

➡️ 병풀 추출물과 마데카소사이드가 피부 진정에 도움을 주고, 스포이드형 용기로 위생적으로 사용이 가능하답니다! 

☑️ 전체적인 사용 후기 

✔️ 향은 은은하고 거슬리지 않아 좋았어요. 

✔️ 제형은 점도가 있어 처음에는 밀착력이 좋지만, 약간의 끈적임이 남는 느낌이었어요. 

✔️ 피부에 부드럽게 발리고 흡수는 빠른 편이지만, 좀 더 가벼운 제형을 선호하는 저에겐 조금 무겁게 느껴졌습니다. 

✔️ 사용 후 피부가 촉촉해지는 느낌은 확실히 들었지만, 여름철에는 좀 더 가벼운 수분 제품을 선호하게 될 것 같아요. 

✔️ 성분은 20가지 주의성분 중 1개가 포함되어 있지만, 알레르기 유발성분은 없어서 안심하고 사용했습니다. 

👎🏻 아쉬운 점 

➡️ 제형이 다소 점도가 높아 여름철 사용에는 조금 부담스러울 수 있을 것 같아요. 

🙆🏻‍♀️ 추천 드립니다 

➡️ 점도 있는 수분 제품을 좋아하시는 분들, 피부 진정과 보습을 동시에 챙기고 싶으신 분들께 추천합니다!`,
      },
      {
        sender: 'BOT',
        skinType: type,
        message: `[MOCK:${type}] "세번째 응답: [제품명]: 포뮬라랩 히알룰론산 수분 앰플

[사용 경험]: 이번에 포뮬라랩의 히알룰론산 수분 앰플을 사용해봤어요! 30ml 용량에 가격은 28,000원인데, 스포이드형 용기라서 사용하기 편리하더라구요. 제형은 점도가 높은 젤 타입인데, 처음에는 약간의 무거움이 느껴졌어요. 하지만 피부에 바르고 나니 어느 정도 흡수가 되면서 수분감이 느껴졌습니다.

[장점]: 이 앰플의 가장 큰 장점은 강력한 보습력이에요! 병풀 추출물과 마데카소사이드가 포함되어 있어서인지 피부 진정 효과도 느껴졌고, 사용 후 피부가 정말 촉촉해졌어요. 특히, 히알룰론산 덕분에 수분감이 오래 지속되는 느낌이었어요. 또한, 스포이드형이라서 필요한 만큼만 덜어서 사용할 수 있어서 위생적이고 간편했어요.

[단점]: 다만 점도가 높은 젤 타입이다 보니, 처음 바를 때 약간의 끈적임이 느껴졌어요. 민감성 피부를 가진 저로서는 이 점이 조금 아쉬웠습니다. 그리고 여름철에는 다소 무겁게 느껴질 수 있을 것 같아요. 지성 피부인 저에게는 겨울철에 사용하기 더 적합할 것 같네요.

[추천 여부]: 겨울철 보습이 필요한 분들께는 정말 추천하고 싶어요. 특히 수분이 부족한 피부에 좋을 것 같아요. 하지만 여름철에는 다른 가벼운 제품과 병행해서 사용하는 것이 좋을 것 같습니다.

[가성비/행사 언급]: 28,000원의 가격대에 30ml 용량은 나쁘지 않은 것 같아요. 가성비도 괜찮고, 특히 기획 행사나 할인 이벤트를 활용하면 더욱 좋은 선택이 될 것 같아요. 전체적으로 만족스러운 제품이었어요!`,
      },
    ]);
    // 🟡 여기 추가해야 함
    sessionMessagesMap[id] = sessionMessagesMap[id] || [];
    sessionMessagesMap[id].push({
      sender: 'USER',
      skinType: types[0], // 첫 번째 타입 기준으로 임의 지정
      message,
    });
    sessionMessagesMap[id].push(...responses); // BOT 응답 추가
    return HttpResponse.json(responses);
  }),

  http.get('/api/chat/sessions/:id/messages', ({ params }) => {
    const { id } = params;

    // 세션별 메시지 저장소에서 조회 (직접 구현 필요)
    const messages = sessionMessagesMap[id];
    console.log('[MSW] GET 요청 받음', id);
    console.log('[MSW] 현재 메시지 맵:', sessionMessagesMap);

    if (!messages) {
      return HttpResponse.json(
        { message: '해당 세션의 메시지를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json(messages);
  }),

  http.get('/api/chat/sessions/:id/summary', ({ params }) => {
    const { id } = params;

    // 세션별 메시지 저장소에서 조회 (직접 구현 필요)
    const dummySummary = sessionSummaries[id];
    if (!dummySummary) {
      return HttpResponse.json(
        { dummySummary: '해당 세션의 메시지를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    return HttpResponse.json({ summarizedMessage: dummySummary });
  }),

  // 세션 삭제
  http.delete('/api/chat/sessions/:id', ({ params, request }) => {
    const sessionId = Number(params.id);
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!authHeader || !token) {
      return HttpResponse.json({ message: '인증 토큰 누락' }, { status: 401 });
    }

    if (isNaN(sessionId)) {
      return HttpResponse.json({ message: 'ID 형식이 잘못되었습니다.' }, { status: 400 });
    }

    const index = chatSessions_allView.findIndex((s) => s.sessionId === sessionId);
    if (index === -1) {
      return HttpResponse.json({ message: '세션을 찾을 수 없습니다.' }, { status: 404 });
    }

    const session = chatSessions_allView[index];

    // ❗ 실제 프로젝트에서는 userId 비교
    // if (session.userId !== 'me') {
    //   return HttpResponse.json({ message: '권한이 없습니다.' }, { status: 403 });
    // }

    chatSessions_allView.splice(index, 1); // 삭제
    return new HttpResponse(null, { status: 204 }); // ✅ 204 No Content
  }),
];
