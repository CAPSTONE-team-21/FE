import { useState } from 'react';

const EmailVerify = () => {
  // 이메일
  const [email, setEmail] = useState('');
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 인증번호
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);

  return (
    <div>
      <div className="flex flex-col gap-[10px]">
        <div className="text-[15px] font-bold text-gray">아이디</div>
        <div
          className="w-full flex items-center pl-[16px] pr-[6px] py-[5px] gap-[12px]
          border border-gray-stroke08 rounded-[8px] tracking-[-0.025em]
          focus-within:border focus-within:border-main
          transition duration-200"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요."
            className="w-full outline-none flex-1 placeholder-gray-stroke30 placeholder:font-medium"
          />
          <button
            className={`text-[14px] font-medium tracking-[-0.025em]
            px-[14px] py-[11px] rounded-[5px] h-[39px]
            ${isValidEmail(email) ? 'bg-main text-white' : 'bg-gray-stroke02 text-gray-stroke30'}`}
            onClick={() => {
              setShowCodeInput(true);
            }}
          >
            인증 요청
          </button>
        </div>

        {showCodeInput && (
          <div
            className="w-full flex items-center pl-[16px] pr-[6px] py-[5px] gap-[12px]
            border border-gray-stroke08 rounded-[8px] tracking-[-0.025em]
            focus-within:border focus-within:border-main
            transition duration-200"
          >
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)} // ✅ 인증번호 입력값 관리
              placeholder="인증 번호를 입력해주세요."
              className="w-full outline-none flex-1 placeholder-gray-stroke30 placeholder:font-medium"
            />
            <button
              className={`text-[14px] font-medium tracking-[-0.025em]
              px-[14px] py-[11px] rounded-[5px] h-[39px]
              ${code.length > 0 ? 'bg-main text-white' : 'bg-gray-stroke02 text-gray-stroke30'}`}
              onClick={() => {
                // 인증 확인 로직 (추후 API 연결 시 여기에 작성)
                console.log('인증번호 확인 버튼 클릭:', code);
              }}
            >
              인증 확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
