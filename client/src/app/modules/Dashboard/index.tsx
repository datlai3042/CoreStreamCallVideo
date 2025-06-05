import React, { useEffect } from "react";
import ShowListUsers from "./components/ShowListUsers";
import styles from "./styles/styles.module.scss";
import { useGetMe } from "../User/hooks/useGetMe";
import { createPeer } from "../Streaming/config/peer";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/store";
import useCall from "../Call/hooks/useCall";
const DashboardView = () => {
  useGetMe();
 
  return (
    <div id={`${styles.dashboard__container}`}>
      <ShowListUsers />
    </div>
  );
};

export default DashboardView;
