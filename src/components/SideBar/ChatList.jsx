import { ChatContext } from '../../contexts/ChatContext';
import ChatGroup from './ChatGroup';
import ChatTitleItem from './ChatTitleItem';

import { useContext } from 'react';

const ChatList = () => {
  const { chatSessions, currentSessionId } = useContext(ChatContext);

  return (
    <div>
      <div className="w-full pt-[12px]">
        <ChatGroup className=" gap-[10px]" title="내 채팅">
          {chatSessions.map((session) => (
            <ChatTitleItem
              key={session.sessionId}
              session={session}
              isSelected={session.sessionId === currentSessionId}
            />
          ))}
        </ChatGroup>
      </div>
    </div>
  );
};
export default ChatList;
