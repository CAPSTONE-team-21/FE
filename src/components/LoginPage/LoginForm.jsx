import GotoSignUp from './GotoSignUp';
import { IconEye, IconCheckInactive, IconCheckActive } from '../../utils/icons';
import { useState } from 'react';
import Button from '../Button';
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  return (
    <>
      {/* 이메일 */}
      <input
        type="email"
        placeholder="아이디를 입력해주세요."
        className="w-full outline-none
        px-[16px] py-[14px] tracking-[-0.025em]
        border border-gray-stroke08 rounded-t-[8px] border-b-transparent
        focus:border focus:border-main
        placeholder-gray-stroke30 placeholder:font-medium"
      />

      {/* 비밀번호 */}
      <div
        className="w-full flex items-center px-[16px] py-[14px] gap-[12px] tracking-[-0.025em]
      border border-gray-stroke08 rounded-b-[8px]
      focus-within:border focus-within:border-main
      transition duration-200"
      >
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="비밀번호를 입력해주세요."
          className="w-full outline-none
          placeholder-gray-stroke30 placeholder:font-medium
          "
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="">
          <img className="h-[11px]" src={IconEye} alt="eye" />
        </button>
      </div>

      {/* 자동로그인 회원가입 */}
      <div className="w-full flex justify-between mt-[16px] mb-[24px] px-[1px]">
        {/* 자동로그인 */}
        <div
          className="flex gap-[6px] items-center cursor-pointer select-none group"
          onClick={() => setAutoLogin(!autoLogin)}
        >
          <img
            className="w-[18px] transition duration-150"
            src={autoLogin ? IconCheckActive : IconCheckInactive}
            alt="checkIcon"
          />
          <div
            className={`text-[14px] font-medium leading-[1.4] tracking-[-0.025em] ${
              autoLogin ? 'text-gray-600' : 'text-gray-stroke50'
            } group-hover:text-gray-600
            transition duration-150`}
          >
            자동 로그인
          </div>
        </div>
        {/* 회원가입으로 */}
        <GotoSignUp />
      </div>

      {/* 로그인 버튼 */}
      <Button />
    </>
  );
};
export default LoginForm;
