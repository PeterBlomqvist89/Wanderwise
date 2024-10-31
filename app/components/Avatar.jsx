import { CircleUserRound } from "lucide-react";

const Avatar = () => {
  return (
    <div className="bg-brunswickgreen h-[63px] w-[63px] rounded-full flex items-center justify-center">
      <CircleUserRound
        color="var(--timberwolf)"
        size={50}
        strokeWidth={1}
        className="cursor-pointer"
      />
    </div>
  );
};

export default Avatar;
