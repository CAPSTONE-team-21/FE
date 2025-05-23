import { useState, useRef, useEffect } from 'react';
import { IconAccount } from '../../utils/icons';
import { IconLogout } from '../../utils/icons';
import DropDownItem from '../DropDownItem';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [accountClick, setAccountClick] = useState(false);
  const { logout, user } = useAuth(); // ✅ user 가져오기
  const nav = useNavigate();
  const dropdownRef = useRef(null);

  const isClick = () => {
    setAccountClick(!accountClick);
  };

  // ✅ 바깥 클릭 감지용 useEffect
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    nav(`/`);
  };
  console.log('👤 현재 유저:', user);
  return (
    <div className="relative flex" ref={dropdownRef}>
      <div className="flex gap-1 cursor-pointer items-center group" onClick={isClick}>
        <div className="w-[38px] opacity-20 group-hover:opacity-30 duration-300">
          <img src={IconAccount} alt="profile" />
        </div>
        {/* ✅ 닉네임 표시 */}
        {user?.nickname && (
          <div className="text-[14px] text-gray/80 font-medium group-hover:underline">
            {user.nickname}
          </div>
        )}
      </div>
      <div className="flex text-[14px] text-gray/80 items-center ml-1">님</div>
      <div className="absolute p-[5px] w-fit right-0 top-full mt-2 z-50 rounded-[10px] border border-gray-stroke03 shadow-dropDown">
        {accountClick && (
          <DropDownItem
            icon={IconLogout}
            label="로그아웃"
            onClick={handleLogout}
            textColor={'text-rederror'}
          />
        )}
      </div>
    </div>
  );
};
export default Profile;
