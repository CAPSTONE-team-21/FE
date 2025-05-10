// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { login as loginAPI } from '../utils/login'; // ✅ utils 함수 사용
import { signup as signupAPI } from '../utils/signUp';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // 로그인 함수
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { accessToken, refreshToken } = await loginAPI(email, password);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      setIsLoggedIn(true);
      setUser({ email });
      setErrorMsg('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('이메일 또는 비밀번호가 틀렸습니다.');
      } else if (error.response.status === 404) {
        alert('존재하지 않는 사용자입니다.');
      } else {
        alert('회원가입 중 알 수 없는 오류가 발생했습니다.');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 함수
  const signup = async (nickname, email, password) => {
    setLoading(true);
    setErrorMsg('');
    try {
      const { accessToken, refreshToken } = await signupAPI(nickname, email, password);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      return true; // 성공 여부 반환
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setErrorMsg(error.response.data.message || '이미 존재하는 이메일입니다.');
        } else {
          setErrorMsg('회원가입 중 오류가 발생했습니다.');
        }
      } else {
        setErrorMsg('네트워크 오류');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, errorMsg, loading, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
