import EmailVerify from './EmailVerify';
import { useState } from 'react';
import UserName from './UserName';
import UserPassWord from './UserPassWord';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // ✅ context에서 가져오기

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signup, errorMsg, loading } = useAuth(); // ✅ context 훅 사용

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(nickname, email, password);
    if (success) {
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    }
  };
  return (
    <>
      <div className="flex flex-col gap-[20px] w-full">
        <UserName value={nickname} onChange={setNickname} />
        <EmailVerify value={email} onChange={setEmail} />
        <UserPassWord value={password} onChange={setPassword} />
        {errorMsg && (
          <div className="text-rederror text-[14px] font-medium leading-[1.4]">{errorMsg}</div>
        )}
        <div className="mt-[28px] mb-[48px] w-full">
          <Button text="회원가입" onClick={handleSignupSubmit} disabled={loading} />
        </div>
      </div>
    </>
  );
};
export default SignUpForm;
