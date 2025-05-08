const EmailVerify = () => {
  return (
    <div>
      {/* 아이디 */}
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
            placeholder="이메일을 입력해주세요."
            className="w-full outline-none flex-1
            placeholder-gray-stroke30 placeholder:font-medium
            "
          />
          <button
            className="text-[14px] font-medium tracking-[-0.025em] text-gray-stroke30
            px-[14px] py-[11px] rounded-[5px] h-[39px] bg-gray-stroke02"
          >
            인증 요청
          </button>
        </div>
        <div
          className="w-full flex items-center pl-[16px] pr-[6px] py-[5px] gap-[12px]
          border border-gray-stroke08 rounded-[8px] tracking-[-0.025em]
          focus-within:border focus-within:border-main
          transition duration-200"
        >
          <input
            type="text"
            placeholder="인증 번호를 입력해주세요."
            className="w-full outline-none flex-1
            placeholder-gray-stroke30 placeholder:font-medium
            "
          />
          <button
            className="text-[14px] font-medium tracking-[-0.025em] text-gray-stroke30
            px-[14px] py-[11px] rounded-[5px] h-[39px] bg-gray-stroke02"
          >
            시간초
          </button>
        </div>
      </div>
    </div>
  );
};
export default EmailVerify;
