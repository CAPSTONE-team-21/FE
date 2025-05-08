import { useState } from 'react';

const UserName = () => {
  // 사용자명
  const [userName, setUserName] = useState('');
  const [isUserNameValid, setIsUserNameValid] = useState(true);

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);

    // 사용자명 정규식 검사
    const regex = /^[가-힣a-zA-Z0-9]{2,8}$/;
    setIsUserNameValid(regex.test(value));
  };
  return (
    <>
      {/* 사용자명 */}
      <div className="flex flex-col gap-[10px]">
        <div className="text-[15px] font-bold text-gray">사용자명</div>
        <input
          type="text"
          placeholder="한글, 영어, 숫자 포함 2~8글자"
          value={userName}
          onChange={handleUserNameChange}
          className={`w-full outline-none h-[51px]
              px-[16px] py-[14px]
              border ${isUserNameValid ? 'border-gray-stroke08' : 'border-rederror'}
              rounded-[8px]
              ${isUserNameValid ? 'focus-within:border-main' : 'focus-within:border-rederror'}
              placeholder-gray-stroke30 placeholder:font-medium tracking-[-0.025em]`}
        />
        {!isUserNameValid && (
          <div className="text-rederror text-[14px] font-medium leading-[1.4]">
            한글, 영어, 숫자를 포함한 2~8글자만 가능합니다.
          </div>
        )}
      </div>
    </>
  );
};
export default UserName;
