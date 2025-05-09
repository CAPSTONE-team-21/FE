import { IconCancel } from '../../utils/icons';
import { IconSummaryBlue } from '../../utils/icons';

const SessionSummary = ({ onClick }) => {
  return (
    <div className="flex justify-center fixed left-0 top-0 w-screen h-screen z-50 bg-black bg-opacity-[4%] ">
      <div className="bg-white w-[760px] h-[512px] mt-[80px] rounded-[20px] border border-gray-stroke07 shadow-modal">
        {/* 모달창 상단 (취소 버튼) */}
        <div className="flex items-center justify-between px-8 pt-6 pb-5 border-b border-gray-stroke05">
          <di className="flex items-center gap-2 ">
            <img src={IconSummaryBlue} alt="요약" />
            <span className="text-[18px] font-semibold text-main ">현재 채팅방 내용 요약</span>
          </di>
          <img onClick={onClick} className="cursor-pointer w-3" src={IconCancel} alt="취소" />
        </div>
      </div>
    </div>
  );
};

export default SessionSummary;
