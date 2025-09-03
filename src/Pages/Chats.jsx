import React, { useState, useEffect, useRef } from "react";
import UserChatTab from "../Components/UserChatTab";
import Chatform from "../Components/Chatform";
import ChatText from "../Components/ChatText";
import mqtt from "mqtt";
import axios from "axios";
import CreateNewChat from "../Components/CreateNewChat";
import UserAddBox from "../Components/UserAddBox";
import UserList from "../Components/UserList";
import { HamburgerIcon, Menu } from "lucide-react";

function Chats() {
  
  const users = [
    // {
    //   id: 1,
    //   name: "Alice",
    //   phone: "7477759422",
    //   avatar: "https://i.pravatar.cc/150?img=1",
    // },
    // {
    //   id: 2,
    //   name: "Bob",
    //   phone: "200",
    //   avatar: "https://i.pravatar.cc/150?img=2",
    // },
    // {
    //   id: 3,
    //   name: "Roy",
    //   phone: "400",
    //   avatar: "https://i.pravatar.cc/150?img=3",
    // },
  ];
  const [selectedUser, setSelectedUser] = useState({});
  const [userlist, setuserList] = useState(users);
  const [modal, setModal] = useState(false);
  const [client, setClient] = useState(null);

  const ME = localStorage.getItem("ME");
  console.log("User",ME)

  // Store messages per user
  const [messages, setMessages] = useState({});

  const messagesEndRef = useRef(null);
  const selectedUserRef = useRef(selectedUser);

  const hideScrollbarStyle = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  // Scroll to bottom when selected user messages change
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedUser, messages]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/getuserlist",
          { phone: ME }
        );
        console.log(response.data.userlist);
        setuserList(response.data.userlist);
      } catch (err) {
        console.error("Error fetching user list:", err);
      }
    };

    fetchUsers();
  }, []);

  const getTopic = (sender, receiver) => {
    let phones = [String(sender), String(receiver)];
    phones.sort();
    return `chat/${phones[0]}-${phones[1]}`;
  };

  const handleSubscribe = (userphone) => {
    if (!client) return;
    client.subscribe(getTopic(ME, userphone), (err) => {
      if (!err) console.log(`Subscribed to ${getTopic(ME, userphone)}`);
    });
  };

  const addMessageFromSender = async (text) => {
    if (!selectedUser?.friendsPhone) return;

    const newMessage = { sender: ME, text, timestamp: new Date() };

    // Save message per user
    setMessages((prev) => ({
      ...prev,
      [selectedUser.friendsPhone]: [...(prev[selectedUser.friendsPhone] || []), newMessage],
    }));

    const Userdata = {
      sender: ME,
      receiver: selectedUser.friendsPhone,
      content: text,
    };

    try {
      await axios.post("http://localhost:8080/chat/send", Userdata);
    } catch (err) {
      console.error("Error sending message to backend:", err);
    }
  };

  const addMessageFromReceiver = (topic, payload) => {
    try {
      const data = JSON.parse(payload);
      const { sender, content } = data;

      if (sender === ME) return; // ignore own messages

      // Save message under sender's phone
      setMessages((prev) => ({
        ...prev,
        [sender]: [
          ...(prev[sender] || []),
          { sender, text: content, timestamp: new Date() },
        ],
      }));
    } catch (err) {
      console.error("Invalid payload:", payload);
    }
  };

  useEffect(() => {
    

    const mqttClient = mqtt.connect(url, options);
    setClient(mqttClient);

    mqttClient.on("message", (topic, payload) => {
      addMessageFromReceiver(topic, payload);
    });

    return () => mqttClient.end();
  }, []);

  const handleAddUserButton = () => setModal(!modal);

  return (
    <div className="flex h-screen font-sans">
      {modal && (
        <UserAddBox onClose={handleAddUserButton} setuserList={setuserList} />
      )}

      {/* Left Panel */}
      <div className="w-[35%] bg-[#93C572] flex flex-col shadow-lg">
        <UserList
          userlist={userlist}
          handleSubscribe={handleSubscribe}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
        <div className="flex flex-row-reverse" onClick={handleAddUserButton}>
          <CreateNewChat />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[65%] flex flex-col bg-[#dcf7ba] shadow-inner">
        {selectedUser?.friendsPhone ? (
          <>
            {/* Chat Header */}
            <div className="flex flex-row bg-[#2F4F2F] text-[#FFFDD0]  items-center gap-4 flex-shrink-0 shadow-md p-3 text-2xl font-semibold justify-between">
            <div>
              {selectedUser.name}
            </div>
            <div >
              <Menu/>
            </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col justify-between p-1 overflow-y-scroll">
              <div
                className="flex-1 overflow-y-auto mb-1 p-1 bg-[#dcf7ba] shadow-inner"
                style={hideScrollbarStyle}
              >
                {(messages[selectedUser.friendsPhone] || []).map((chat, index) => (
                  <ChatText
                    key={index}
                    text={chat.text}
                    sender={chat.sender}
                    timestamp={chat.timestamp}
                    user={ME}
                    username={selectedUser.name}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Form */}
              <div className="p-2 mb-1 bg-gray-200 rounded-md shadow-md">
                <Chatform message={addMessageFromSender} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 text-xl">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
}

export default Chats;
