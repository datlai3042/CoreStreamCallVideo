"use client";
import React, { useContext } from "react";
import { StreamingContext } from "../../providers";

const ButtonCall = () => {
  const { handleEvent, peerId, peerRemoteId, stream } =
    useContext(StreamingContext);
  const onRedirect = () => {
    if (stream) {
      stream.getTracks().forEach((tracks) => tracks.stop());
    }
    const url = `/call?caller_id=${peerId}&receiver_id=${peerRemoteId}&owner_call=${peerId}`;
    const windowFeatures =
      "toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no," +
      `width=${screen.width},height=${screen.height},top=0,left=0`;
    window.open(url, "_blank", windowFeatures);
  };
  return <button onClick={onRedirect}>ButtonCall</button>;
};

export default ButtonCall;
