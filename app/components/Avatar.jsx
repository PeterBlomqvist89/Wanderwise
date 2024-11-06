import { useAuth } from "../components/AuthContextProvider";
import { CircleUserRound } from "lucide-react";

const Avatar = ({ avatarUrl, className = "h-[63px] w-[63px]" }) => {
  const { user } = useAuth();
  const userAvatar = avatarUrl || user?.photoURL;

  return (
    <div
      className={`bg-brunswickgreen rounded-full flex items-center justify-center overflow-hidden border-2 border-brunswickgreen drop-shadow-lg ${className}`}
    >
      {userAvatar ? (
        <img
          src={userAvatar}
          alt="User Avatar"
          className={`object-cover ${className}`}
        />
      ) : (
        <CircleUserRound
          color="var(--timberwolf)"
          size={50}
          strokeWidth={1}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default Avatar;
