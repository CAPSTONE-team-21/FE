import { useState } from 'react';
import { IconCheckNoBgActive, IconCheckNoBgInactive } from '../../utils/icons';

const UserPassWord = () => {
  // 비밀번호
  const [password, setPassword] = useState('');
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const validateCondition1 = (value) => {
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^a-zA-Z0-9]/.test(value);
    const count = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length >= 2;
    return count;
  };

  const validateCondition2 = (value) => {
    const lengthValid =
      value.replace(/\s/g, '').length >= 8 && value.replace(/\s/g, '').length <= 32;
    return lengthValid;
  };

  const validatePassword = (value) => {
    return validateCondition1(value) && validateCondition2(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
    setIsPasswordMatch(value === confirmPassword);
  };

  // 비밀번호 확인
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setIsPasswordMatch(password === value);
  };

  return (
    <>
      {/* 비밀번호 */}
      <div className="flex flex-col gap-[10px]">
        <div className="text-[15px] font-bold text-gray">비밀번호</div>
        <div
          className={`w-full flex items-center px-[16px] py-[14px] gap-[12px] tracking-[-0.025em]
              border ${isPasswordValid ? 'border-gray-stroke08' : 'border-rederror'}
              rounded-[8px] h-[51px]
              ${isPasswordValid ? 'focus-within:border-main' : 'focus-within:border-rederror'}
              transition duration-200`}
        >
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
            placeholder="비밀번호를 입력해주세요."
            className="w-full outline-none placeholder-gray-stroke30 placeholder:font-medium"
          />
        </div>

        {isPasswordFocused && (
          <div className="flex flex-col gap-[4px] mt-[4px] text-[13px]">
            {/* 조건 1 */}
            <div
              className={`flex items-center gap-[4px] ${
                validateCondition1(password) ? 'text-main' : 'text-gray-stroke30'
              }`}
            >
              <img
                src={validateCondition1(password) ? IconCheckNoBgActive : IconCheckNoBgInactive}
                alt="check"
                className="w-[8.8px]"
              />
              <div>영문/숫자/특수문자 중 2가지 이상 포함</div>
            </div>
            {/* 조건 2 */}
            <div
              className={`flex items-center gap-[4px] ${
                validateCondition2(password) ? 'text-main' : 'text-gray-stroke30'
              }`}
            >
              <img
                src={validateCondition2(password) ? IconCheckNoBgActive : IconCheckNoBgInactive}
                alt="check"
                className="w-[8.8px]"
              />
              <div>8자 이상 32자 이하 입력 (공백 제외)</div>
            </div>
          </div>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div className="flex flex-col gap-[10px]">
        <div className="text-[15px] font-bold text-gray">비밀번호 확인</div>
        <div
          className={`w-full flex items-center px-[16px] py-[14px] gap-[12px] tracking-[-0.025em]
              border ${isPasswordMatch ? 'border-gray-stroke08' : 'border-rederror'}
              rounded-[8px] h-[51px]
              ${isPasswordMatch ? 'focus-within:border-main' : 'focus-within:border-rederror'}
              transition duration-200`}
        >
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="비밀번호를 재입력해주세요."
            className="w-full outline-none placeholder-gray-stroke30 placeholder:font-medium"
          />
        </div>
        {!isPasswordMatch && (
          <div className="text-rederror text-[14px] font-medium leading-[1.4]">
            비밀번호가 일치하지 않습니다. 다시 입력해주세요.
          </div>
        )}
      </div>
    </>
  );
};

export default UserPassWord;
