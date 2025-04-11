import { useState } from 'react';
import BotChat from './BotChat';
// 선택한 피부 타입 필터링 용 컨테이너

const BotChatContainer = () => {
  return (
    <div className="bg-main-buttonFill p-[4px] rounded-t-[15px] w-full mx-auto border-[1px] border-main-typeStroke">
      {/* 필터 버튼 */}
      <div className="flex gap-4">
        <button
          className="
    basis-1/4 flex items-center justify-center
    py-1
    text-[14px] text-main
    rounded-[10px]"
        >
          건성
        </button>
        <button
          className="
    basis-1/4 flex items-center justify-center
    py-1
    text-[14px] text-main-buttonStroke
    hover:bg-main-buttonFill hover:text-main-buttonHover duration-200
    focus:bg-white focus:text-main 
    rounded-[10px]"
        >
          지성
        </button>
        <button
          className="
    basis-1/4 flex items-center justify-center
    py-1
    text-[14px] text-main-buttonStroke
    rounded-[10px]"
        >
          민감성
        </button>
        <button
          className="
    basis-1/4 flex items-center justify-center
    py-1
    text-[14px] text-main-buttonStroke
    rounded-[10px]"
        >
          복합성
        </button>
      </div>
    </div>
  );
};

export default BotChatContainer;
