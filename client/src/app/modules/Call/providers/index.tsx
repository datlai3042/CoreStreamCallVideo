"use client";
import { useParams, useSearchParams } from "next/navigation";
import { createContext, useEffect, useRef } from "react";
import useCall from "../hooks/useCall";

type TCallContext = {};

export const CallContext = createContext<TCallContext>({});

const CallProvier = ({ children }: { children: React.ReactNode }) => {
  const qs = useSearchParams();
  const streamRef = useRef<MediaStream | undefined>(undefined);
  const { onCall } = useCall({ stream: streamRef, peerReceiverId: qs.get('receiver_id') || '', peerCallId: qs.get('caller_id') || '' });

  useEffect(() => {
    const caller_id = qs.get("caller_id");
    const receiver_id = qs.get("receiver_id");
    const owner_call = qs.get("owner_call");
    console.log({caller_id, receiver_id, owner_call})
    if (!caller_id || !receiver_id || !owner_call) return
    console.log('truoc')
    onCall();
    console.log('sau')

  }, [qs]);

  return (
    <CallContext.Provider value={{}}>
      {children}
      {JSON.stringify(qs)}
    </CallContext.Provider>
  );
};

export default CallProvier;
