import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import { useSocket } from "../context/SocketProvider";

const Info = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  useEffect(() => {
    socket.on("room:join", (data) => {
      console.log(`Data from be ${data}`);
    });
  }, [socket]);

  return (
    <div className="flex flex-col">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Email ID</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Room No.</label>
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button>JOIN</button>
      </form>
    </div>
  );
};

export default Info;
