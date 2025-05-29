import React from "react";
import LayoutSideVideoComment from "../layouts/LayoutSideVideoComment";
import CallProvider from "../providers";

const CallView = () => {
  return (
    <>
      <CallProvider>
        <LayoutSideVideoComment />
      </CallProvider>
    </>
  );
};

export default CallView;
