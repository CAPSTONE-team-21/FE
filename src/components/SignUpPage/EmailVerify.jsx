import { useState } from 'react';
import { sendEmailCode, verifyEmailCode } from '../../utils/signUp';

const EmailVerify = ({ value, onChange }) => {
  const [code, setCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [message, setMessage] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 이메일 인증 요청시
  const handleSendCode = async () => {
    setMessage('');
    const result = await sendEmailCode(value);
    if (result.success) {
      setShowCodeInput(true);
      alert('이메일 인증 메일이 전송되었습니다!');
    }
  };

  // 이메일 인증 확인
  const handleVerifyCode = async () => {
    const result = await verifyEmailCode(value, code);
    if (result.success) {
      setEmailVerified(true);
      alert('이메일 인증이 완료되었습니다!');
    }
  };

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="text-[15px] font-bold text-gray">아이디</div>

      {/* 이메일 입력 */}
      <div
        className="w-full flex items-center pl-[16px] pr-[6px] py-[5px] gap-[12px]
        border border-gray-stroke08 rounded-[8px] tracking-[-0.025em]
        focus-within:border focus-within:border-main
        transition duration-200"
      >
        <input
          type="email"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="이메일을 입력해주세요."
          className="w-full outline-none flex-1 placeholder-gray-stroke30 placeholder:font-medium disabled:bg-transparent"
          disabled={emailVerified}
        />
        <button
          className={`text-[14px] font-semibold tracking-[-0.025em]
          px-[14px] py-[11px] rounded-[5px] h-[39px]
          transition-colors duration-100
  ${
    emailVerified
      ? 'bg-gray-stroke02 text-gray-stroke30'
      : isValidEmail(value)
        ? 'bg-main text-white'
        : 'bg-gray-stroke02 text-gray-stroke30'
  }`}
          onClick={handleSendCode}
          disabled={!isValidEmail(value) || emailVerified}
        >
          {emailVerified ? '인증 완료' : '인증 요청'}
        </button>
      </div>

      {/* 인증 코드 입력 */}
      {showCodeInput && !emailVerified && (
        <div
          className="w-full flex items-center pl-[16px] pr-[6px] py-[5px] gap-[12px]
          border border-gray-stroke08 rounded-[8px] tracking-[-0.025em]
          focus-within:border focus-within:border-main
          transition duration-200"
        >
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증 번호를 입력해주세요."
            className="w-full outline-none flex-1 placeholder-gray-stroke30 placeholder:font-medium disabled:bg-transparent"
          />
          <button
            className={`text-[14px] font-semibold tracking-[-0.025em]
            px-[14px] py-[11px] rounded-[5px] h-[39px]
            transition-colors duration-100
            ${code.length > 0 ? 'bg-main text-white' : 'bg-gray-stroke02 text-gray-stroke30'}`}
            onClick={handleVerifyCode}
            disabled={code.length === 0}
          >
            인증 확인
          </button>
        </div>
      )}

      {/* 메시지 출력 */}
      {message && <div className="text-[13px] font-medium mt-[4px]">{message}</div>}
    </div>
  );
};

export default EmailVerify;
