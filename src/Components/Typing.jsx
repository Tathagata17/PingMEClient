import React from "react";

function Typing() {
  return (
    <div className="flex flex-row p-1 space-x-1">
      <span className="w-2 h-2 bg-green-900 rounded-full animate-bounce [animation-delay:0ms]"></span>
      <span className="w-2 h-2 bg-green-900 rounded-full animate-bounce [animation-delay:150ms]"></span>
      <span className="w-2 h-2 bg-green-900 rounded-full animate-bounce [animation-delay:300ms]"></span>
    </div>
  );
}

export default Typing; 