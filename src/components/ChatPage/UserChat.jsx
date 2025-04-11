// 사용자 채팅
const UserChat = ({ message }) => {
  return (
    <>
      <div className="flex justify-end">
        <div className="bg-gray-stroke03 font-normal text-gray-stroke70 pl-[18px] pr-[16px] py-[16px] rounded-[20px] max-w-[70%] whitespace-pre-line break-words mb-4">
          {message}
        </div>
      </div>
    </>
  );
};

export default UserChat;
