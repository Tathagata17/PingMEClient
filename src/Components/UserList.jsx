import React from "react";
import UserChatTab from "./UserChatTab";

function UserList({
  userlist,
  handleSubscribe,
  selectedUser,
  setSelectedUser,
}) {
  const hideScrollbarStyle = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  return (
    <>
      <div className="text-[#FFFDD0] text-2xl bg-[#356636] p-4 font-bold flex-shrink-0 shadow-md">
        Ping Me
      </div>

      <div
        className="flex-1 p-1 flex flex-col gap-y-0.5 overflow-y-scroll"
        style={hideScrollbarStyle}
      >
        {userlist.map((user) => (
          <UserChatTab
            key={user.id}
            user={user}
            isActive={selectedUser?.id === user.id}
            onClick={() => {
              setSelectedUser(user);
              handleSubscribe(user.friendsPhone);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default UserList;
