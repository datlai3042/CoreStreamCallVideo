"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/styles.module.scss";
import { SocketCallVideoContext } from "../providers/socketCallVideo.provider";
const LayoutVideoCall = () => {
  const { infoCall, instanceHookCall } = useContext(SocketCallVideoContext);
  return (
    <div id={`${styles.call__container}`}>
      {infoCall?.call_status === "CREATE" && <span>Đang kết nối</span>}
      {infoCall?.call_status === "REJECT" && <span>Không bắt máy</span>}

      <VideoCallRemote />
      <VideoCallMe />
      <VideoCallController />
    </div>
  );
};

const VideoCallRemote = () => {
  return (
    <div className={`${styles.videoCallRemote__container}`}>
      <video></video>
    </div>
  );
};

const VideoCallMe = () => {
  const { infoCall, instanceHookCall } = useContext(SocketCallVideoContext);
  const videoMeRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (
      instanceHookCall?.connectStream &&
      instanceHookCall.stream?.current &&
      videoMeRef.current
    ) {
      videoMeRef.current.srcObject = instanceHookCall.stream.current;
      videoMeRef.current.play();
    }
  }, [instanceHookCall?.connectStream]);

  return (
    <div className={`${styles.videoCallMe__container}`}>
      <video ref={videoMeRef}></video>
    </div>
  );
};

const VideoCallController = () => {
  return <div className={`${styles.videoCallController__container}`}></div>;
};

export default LayoutVideoCall;
