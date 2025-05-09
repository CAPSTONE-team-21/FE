import EmailVerify from './EmailVerify';
import { useState } from 'react';
import UserName from './UserName';
import UserPassWord from './UserPassWord';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken, refreshToken } = await signup(nickname, email, password);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      // 👉 회원가입 후 이동
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('이메일 또는 비밀번호가 틀렸습니다.');
      } else {
        alert('로그인 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-[20px] w-full">
        <UserName />
        <EmailVerify />
        <UserPassWord />
        <div className="mt-[28px] mb-[48px] w-full">
          <Button text="회원가입" onClick={handleSignupSubmit} />
        </div>
      </div>
    </>
  );
};
export default SignUpForm;
