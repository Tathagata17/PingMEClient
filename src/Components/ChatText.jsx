import React from "react";

function ChatText({ text, sender, timestamp,user ,username}) {
  // Format timestamp to a readable time (HH:MM AM/PM)
  const formattedTime = new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  //console.log("sender"+sender);
  return (
    <div
      className={`flex flex-col gap-1 p-2 mb-1 ml-2 ${
        sender === user ? "ml-96" : "ml-1"
      }`}
      style={{
        maxWidth: "50%",        
      }}
    >
    
    <div className="flex flex-row gap-1 justify-center items-center">
        <div className="rounded-full p-1 w-10 h-10 bg-red-300 flex justify-center items-center">
        {sender===user?"You":username.substring(0,1)}
        </div>
      <div
        className={` gap-1 px-1 py-1 rounded-lg ${
          sender === user ? "bg-[#93C572] text-white" : "bg-gray-300 text-gray-800"
        }`}
        style={{
          wordBreak: "break-word", // break long words
          lineHeight: "1.5",       // improve readability
        }}
      >
        <p className="break-words">{text} </p>
        <span className="text-xs text-gray-900">{formattedTime}</span>
      </div>
      
      </div>
    </div>
  );
}

export default ChatText;
