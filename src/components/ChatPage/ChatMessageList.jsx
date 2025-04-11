// 채팅을 리스트로 감싸기
import UserChat from './UserChat';
import BotChat from './BotChat';

const ChatMessageList = ({ sessionMessages }) => {
  return (
    <div>
      {sessionMessages.map((item, idx) => {
        return item.sender === 'USER' ? (
          <UserChat key={idx} message={item.message} />
        ) : (
          <BotChat key={idx} message={item.message} />
        );
      })}
    </div>
  );
};

export default ChatMessageList;
