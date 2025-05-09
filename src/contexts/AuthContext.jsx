// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from 'react';
import { login as loginAPI } from '../utils/loginSignUp'; // ✅ utils 함수 사용

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, errorMsg, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
