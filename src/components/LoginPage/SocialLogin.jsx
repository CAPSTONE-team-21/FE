import { KakaoLoginL } from '../../utils/icons';
const SocialLogin = () => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="relative flex items-center mt-[36px] mb-[24px]">
        <div className="flex-grow border-t border-gray-stroke10 h-px w-[72px]"></div>
        <span className="flex-shrink mx-[16px] text-gray-stroke50 font-medium text-[14px] leading-[1.4] tracking-[-0.025em] ">
          소셜 계정으로 간편 로그인
        </span>
        <div className="flex-grow border-t border-gray-stroke10 h-px w-[72px]"></div>
      </div>

      <div>
        <img className="w-full cursor-pointer" src={KakaoLoginL} alt="kakaologin" />
      </div>
    </div>
  );
};
export default SocialLogin;
