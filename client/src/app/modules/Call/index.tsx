"use client";

import { useParams } from "next/navigation";
import React from "react";
import CallProvier from "./providers";
import LayoutVideoCall from "./layouts/LayoutVideoCall";

const CallView = () => {
  return (
    <CallProvier>
      <LayoutVideoCall />
    </CallProvier>
  );
};

export default CallView;
