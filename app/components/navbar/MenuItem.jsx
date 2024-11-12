"use client";

const MenuItem = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-50 transition  select-none cursor-pointer font-livvic"
    >
      {label}
    </div>
  );
};

export default MenuItem;
