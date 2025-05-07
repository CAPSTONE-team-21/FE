import { ChatContext } from '../contexts/ChatContext';
import { useLocation } from 'react-router-dom';

import SidebarToggleButton from './SidebarToggleButton';
import ChatTitle from '../components/Header/ChatTitle';
import FilterButton from './Header/FilterButton';
import SummaryButton from './Header/SummaryButton';
import HeaderProfile from './Header/HeaderProfile';
import HeaderLoginButton from './Header/HeaderLoginButton';

const Header = () => {
  const location = useLocation();
  const isChatPage = location.pathname.startsWith('/chat');

  return (
    <div className="fixed top-0 left-0 w-full h-[64px] bg-white z-40">
      <div className=" mx-auto flex items-center justify-between h-full">
        {/* 왼쪽 버튼 */}
        <div className="px-[20px]">
          <SidebarToggleButton />
        </div>
        {/* 조건부렌더링 */}
        <div className="flex w-full mx-auto items-center justify-between pl-[24px]">
          {/* Chat페이지에서만 ChatTitle 보여줌 */}
          {isChatPage && <ChatTitle isHeader={true} />}

          <div className="flex ml-auto gap-[16px]">
            {/* <FilterButton /> */}
            {isChatPage && <SummaryButton isHeader={true} />}
            {isChatPage && <HeaderLoginButton isHeader={true} />}
          </div>
        </div>
        {/* 여기까지 */}
        {/* 추후에 로그인 했을 시, 안 했을 시 렌더링 다르게 할 것 */}
        {/* {isLoggedIn ? <HeaderProfile /> : <LoginButton />} */}

        <div className="ml-auto pr-[26px]">{/* <HeaderProfile /> */}</div>
      </div>
    </div>
  );
};
export default Header;
