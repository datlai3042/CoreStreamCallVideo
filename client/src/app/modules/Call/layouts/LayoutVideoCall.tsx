'use client'

import React from "react";
import styles from "../styles/styles.module.scss";
const LayoutVideoCall = () => {


    
  return (
    <div id={`${styles.call__container}`}>
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
  return (
    <div className={`${styles.videoCallMe__container}`}>
      <video></video>
    </div>
  );
};

const VideoCallController = () => {
  return <div className={`${styles.videoCallController__container}`}></div>;
};

export default LayoutVideoCall;
