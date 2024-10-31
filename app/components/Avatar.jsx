import { useAuth } from "../components/AuthContextProvider";
import { CircleUserRound } from "lucide-react";

const Avatar = () => {
  const { user } = useAuth(); // Hämta användarens status
  const avatarUrl = user?.photoURL; // Användarens avatar från Firebase

  return (
    <div className="bg-brunswickgreen h-[63px] w-[63px] rounded-full flex items-center justify-center overflow-hidden border-2 border-brunswickgreen drop-shadow-lg">
      {avatarUrl ? (
        // Visa användarens avatar om den finns
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="h-full w-full object-cover"
        />
      ) : (
        // Visa en standardikon om ingen avatar är inställd
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
