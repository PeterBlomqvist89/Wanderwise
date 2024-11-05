import { useAuth } from "../components/AuthContextProvider";
import { CircleUserRound } from "lucide-react";

const Avatar = ({ avatarUrl }) => {
  const { user } = useAuth(); // Fetch logged-in user data
  const userAvatar = avatarUrl || user?.photoURL; // Use provided avatarUrl or fallback to user's photoURL

  return (
    <div className="bg-brunswickgreen h-[63px] w-[63px] rounded-full flex items-center justify-center overflow-hidden border-2 border-brunswickgreen drop-shadow-lg">
      {userAvatar ? (
        // Display the provided avatar or user's avatar
        <img
          src={userAvatar}
          alt="User Avatar"
          className="h-full w-full object-cover"
        />
      ) : (
        // Display a default icon if no avatar is set
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
