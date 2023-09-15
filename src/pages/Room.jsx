import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import peer from "../peer";

const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`${email} joined!`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`incoming call `, from, offer);
      const ansCall = await peer.answerCall(offer);
      socket.emit("call:accepted", { to: from, ansCall });
    },
    [socket]
  );

  const handleCallAccepted = useCallback(
    ({ from, ansCall }) => {
      peer.setLocalDescription(ansCall);
      console.log("Call Accepted!");
      for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
      }
    },
    [myStream]
  );

  useEffect(() => {
    peer.peer.addEventListener("track", async (e) => {
      const remoteStream = e.streams;
      console.log("everything works!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incoming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incoming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
    };
  }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted]);

  return (
    <div>
      <h1>room</h1>
      <p>{remoteSocketId ? "Connected" : "No one else is in the room"}</p>
      {remoteSocketId && <button onClick={handleCallUser}>call</button>}
      {myStream && (
        <>
          <h1>my stream</h1>
          <ReactPlayer
            playing
            muted
            height="300px"
            width="300px"
            url={myStream}
          />
        </>
      )}
      {remoteStream && (
        <>
          <h1>remote stream</h1>
          <ReactPlayer
            playing
            muted
            height="300px"
            width="300px"
            url={remoteStream}
          />
        </>
      )}
    </div>
  );
};

export default Room;
