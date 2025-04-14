import SidebarToggleButton from '../SidebarToggleButton';
import NewChatButton from './NewChatButton';
import SearchChatTitle from './SearchChatTitle';
import ChatList from './ChatList';
import { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../../contexts/ChatContext';

const SideBar = () => {
  const { isSidebarOpen, setSidebarOpen, currentSessionId } = useContext(ChatContext);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-stroke04 z-40
          transition-opacity duration-300 ease-in-out"
          onClick={() => setSidebarOpen(false)} // 클릭 시 사이드바 닫기
        />
      )}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 h-screen w-[260px]
         bg-white border-r border-gray/10 px-[20px]
         transition-all duration-500 ease-in-out transform -translate-x-full
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="w-[220px]">
          {/* 메뉴 */}
          {/* 왼쪽 버튼 */}
          <div className="flex items-center h-[60px] mb-[10px]">
            <SidebarToggleButton />
          </div>

          {/* 새채팅 */}
          <NewChatButton />
          {/* 채팅제목 검색 */}
          <SearchChatTitle />

          {/* 채팅리스트 (그룹제목, 채팅제목리스트) */}
          <ChatList key={currentSessionId} />
        </div>
      </div>
    </>
  );
};
export default SideBar;
