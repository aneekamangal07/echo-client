import React, { useEffect } from "react";
import { useCallback, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );
  const handleJoin = useCallback(
    (data) => {
      const { email, room } = data;
      console.log(email, room);
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoin);
    return () => {
      socket.off("room:join", handleJoin);
      // console.log(`Data from ${data}`);
    };
  }, [socket, handleJoin]);

  return (
    <div className="flex flex-col">
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Email ID</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Room No.</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button>JOIN</button>
      </form>
    </div>
  );
};

export default Info;
