import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`${email} joined!`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setMyStream(stream);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    return () => {
      socket.off("user:joined", handleUserJoined);
    };
  }, [socket, handleUserJoined]);
  return (
    <div>
      <h1>room</h1>
      <p>{remoteSocketId ? "Connected" : "No one else is in the room"}</p>
      {remoteSocketId && <button onClick={handleCallUser}>call</button>}
      <h1>my stream</h1>
      {myStream && (
        <ReactPlayer
          playing
          muted
          height="300px"
          width="300px"
          url={myStream}
        />
      )}
    </div>
  );
};

export default Room;
