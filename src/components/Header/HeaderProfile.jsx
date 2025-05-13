import { IconAccount } from '../../utils/icons';

const Profile = () => {
  return (
    <div className="flex">
      <button className="w-[38px] opacity-20 hover:opacity-30 duration-300 cursor-pointer">
        <img src={IconAccount} alt="" />
      </button>
    </div>
  );
};
export default Profile;
