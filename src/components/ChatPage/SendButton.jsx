import { IconSendBefore, IconSendAfter } from '../../utils/icons';

const SendButton = ({ onClick, input }) => {
  const isFilled = input.trim().length > 0;

  return (
    <button onClick={onClick} className="flex items-end">
      <img className="w-[36px]" src={isFilled ? IconSendAfter : IconSendBefore} alt="전송" />
    </button>
  );
};

export default SendButton;
