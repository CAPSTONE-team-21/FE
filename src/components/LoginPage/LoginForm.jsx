import SignUpBtn from './SignUpBtn';
import { IconEye, IconCheckInactive, IconCheckActive } from '../../utils/icons';
import { useState } from 'react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {/* 이메일 비밀번호 */}
      <input
        type="email"
        placeholder="아이디를 입력해주세요."
        className="w-full outline-none
        px-[16px] py-[14px] border border-gray-stroke08 rounded-t-[8px] border-b-transparent
        focus:border focus:border-main
        placeholder-gray-stroke30 placeholder:font-medium"
      />
      <div
        className="w-full flex items-center px-[16px] py-[14px] gap-[12px]
      border border-gray-stroke08 rounded-b-[8px]
      focus-within:border focus-within:border-main"
      >
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력해주세요."
          className="w-full outline-none
          placeholder-gray-stroke30 placeholder:font-medium"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="">
          <img className="h-[11px]" src={IconEye} alt="eye" />
        </button>
      </div>
      <div className="w-full flex justify-between mt-[16px] px-[1px]">
        {/* 자동로그인 */}
        <div className="flex gap-[6px] items-center">
          <img className="w-[18px]" src={IconCheckInactive} alt="checkIcon" />
          <div className="text-gray-stroke50 font-medium text-[14px]">자동 로그인</div>
        </div>
        {/* 회원가입버튼 */}
        <SignUpBtn />
      </div>

      {/* 로그인 버튼 */}
    </>
  );
};
export default LoginForm;
