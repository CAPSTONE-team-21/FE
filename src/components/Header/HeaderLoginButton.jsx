import { IconUser } from '../../utils/icons.js';

const HeaderLoginButton = () => {
  return (
    <div className="flex justify-center items-center px-4 py-2 gap-[10px] border border-main-2 bg-main-typeStroke rounded-[10px] text-[14px] text-main font-medium cursor-pointer">
      <img className="w-[12px] h-auto" src={IconUser} alt="filter 아이콘" />
      <div>로그인</div>
    </div>
  );
};

export default HeaderLoginButton;
