// 채팅을 리스트로 감싸기
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
            <div>
              <BotChat key={idx} message={item.message} />
            </div>
          </>
        ) : (
          <BotChat key={idx} message={item.message} />
        );
      })}
    </div>
  );
};

export default ChatMessageList;
