"use client";
import React, { useContext } from "react";
import { StreamingContext } from "../../providers";
import { Phone } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/store";
import { UserType } from "@/app/modules/User/index.type";

type TProps = {
  userEvent: UserType
}

const ButtonCall = (props: TProps) => {
  const { userEvent } = props
  const { handleEvent, peerId, peerRemoteId, stream } =
    useContext(StreamingContext);
  const user = useSelector((state: RootState) => state.authStore.user)

  const onRedirect = () => {
    if (stream) {
      stream.getTracks().forEach((tracks) => tracks.stop());
    }
    const url = `/call?caller_id=${user?._id}&receiver_id=${userEvent?._id}&owner_call=${user?._id}`;
    const windowFeatures =
      "toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no," +
      `width=${screen.width},height=${screen.height},top=0,left=0`;
    window.open(url, "_blank", windowFeatures);
  };
  return <button onClick={onRedirect}>
    <Phone size={16} />
  </button>;
};

export default ButtonCall;
