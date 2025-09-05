import { X } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";

function UserAddBox({ onClose, setuserList }) {
  const ME = localStorage.getItem("ME");
  const [friendPhone, setfriendPhone] = useState("");
  const [friendName, setfriendName] = useState("");

  const addUser = async (friendsPhone, Name) => {
    try {
      const data = {
        phone: ME,
        friendsPhone: friendsPhone,
        name: friendName,
      };
      const data2 = {
        phone: friendsPhone,
        friendsPhone: ME,
        name: ME,
      };
      const response = await axios.post(
        "http://localhost:4000/api/adduser",
        data
      );
      const response2 = await axios.post(
        "http://localhost:4000/api/adduser",
        data2
      );

      setuserList((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal content */}
      <div className="bg-white rounded-xl w-1/3 p-6 flex flex-col items-center relative shadow-lg">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 rounded-none"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Add User</h2>

        <input
          type="text"
          placeholder="Phone"
          value={friendPhone}
          className="w-full h-10 p-2 rounded-lg border border-gray-300 outline-none mb-4"
          onChange={(e) => setfriendPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Name"
          value={friendName}
          className="w-full h-10 p-2 rounded-lg border border-gray-300 outline-none mb-4"
          onChange={(e) => setfriendName(e.target.value)}
        />

        <button
          type="submit"
          onClick={(e) => {
            addUser(friendPhone, friendName);
            onClose();
          }}
          className="w-full py-2 bg-[#93C572] text-[#FFFDD0] font-semibold rounded-lg hover:bg-green-700 transition-all"
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default UserAddBox;
