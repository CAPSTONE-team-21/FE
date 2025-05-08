import EmailVerify from './EmailVerify';
import { useState } from 'react';
import UserName from './UserName';
import UserPassWord from './UserPassWord';
const SignUpForm = () => {
  return (
    <>
      <div className="flex flex-col gap-[20px] w-full">
        <UserName />
        <EmailVerify />
        <UserPassWord />
      </div>
    </>
  );
};
export default SignUpForm;
