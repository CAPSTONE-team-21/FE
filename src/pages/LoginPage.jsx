import Header from '../components/Header';
import Logo from '../components/LoginPage/Logo.jsx';
import LoginForm from '../components/LoginPage/LoginForm';
import SocialLogin from '../components/LoginPage/SocialLogin';

const LoginPage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Header />
      {/* 본문 전체: 헤더 제외 + InputBox 제외 */}
      <div className="flex justify-center items-center">
        <div
          className="pt-[60px] w-[320px] h-[552px] overflow-hidden
        flex flex-col justify-center items-center"
        >
          <Logo />
          <LoginForm />
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
