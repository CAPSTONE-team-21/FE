import { useNavigate } from 'react-router-dom';

const GotoSignUp = () => {
  const nav = useNavigate();
  return (
    <>
      <div
        className="text-gray-stroke50 font-medium text-[14px] cursor-pointer hover:text-gray-600"
        onClick={() => nav('/signup')}
      >
        회원가입
      </div>
    </>
  );
};
export default GotoSignUp;
