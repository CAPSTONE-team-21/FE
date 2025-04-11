// 채팅을 리스트로 감싸기 (type을 보고 user, bot 챗 렌더링)
import UserChat from './UserChat';
import BotChat from './BotChat';

const ChatMessageList = ({ sessionMessages }) => {
  return (
    <div className="flex flex-col">
      {sessionMessages.map((item, idx) => {
        return item.sender === 'USER' ? (
          <>
            <div>
              <UserChat key={idx} message={item.message} />
            </div>
            <div className="border-t border-gray-stroke05"></div>
            <div>
              <BotChat key={idx} message={item.message} />
              {/* 확인용 코드 추후 삭제 예정 */}
            </div>
          </>
        ) : (
          <div>
            <BotChat key={idx} message={item.message} />
          </div>
        );
      })}
    </div>
  );
};

export default ChatMessageList;
