import React from "react";

const MessageLoader = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-3 max-w-[50%] border-2">
        <div className="rounded-lg px-4 py-2 bg-muted">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageLoader;
