import React from "react";

function UserChatTab({ user, onClick, isActive }) {
  return (
    <div
      className={`
        flex items-center gap-2 p-2 rounded-lg cursor-pointer transition
        ${isActive ? "bg-[#4f6a3b] shadow-md" : "bg-[#2F4F2F] hover:bg-[#4f6a3b]"}
      `}
      onClick={() => onClick(user)}
    >
      <img
        src={user.avatar}
        alt={user.name}
        className="w-8 h-8 rounded-full border-2 border-[#FFFDD0]"
      />
      <span className="text-[#FFFDD0] font-medium text-sm">{user.name}</span>
    </div>
  );
}

export default UserChatTab;
