import Header from '../components/Header';
import SignUpForm from '../components/SignUpPage/SignUpForm';

const SignUpPage = () => {
  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <Header />
        {/* 본문 전체: 헤더 제외 + InputBox 제외 */}
        <div className="flex justify-center items-center">
          <div
            className="pt-[60px] w-[320px] h-[641px] overflow-hidden
          flex flex-col justify-center items-center"
          >
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUpPage;
