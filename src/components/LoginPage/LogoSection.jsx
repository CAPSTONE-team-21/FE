import { nav } from 'framer-motion/client';
import { IconLogo } from '../../utils/icons';
import { Logo } from '../../utils/icons';
import { useNavigate } from 'react-router-dom';

const LogoSection = () => {
  const nav = useNavigate();
  return (
    <div
      className="flex space-x-[6px] border-red-600
    mt-[80px] mb-[36px] cursor-pointer"
      onClick={() => nav('/')}
    >
      <img className="w-[37px]" src={IconLogo} alt="LogoImg" />
      <img className="w-[138px]" src={Logo} alt="Logo" />
    </div>
  );
};
export default LogoSection;
