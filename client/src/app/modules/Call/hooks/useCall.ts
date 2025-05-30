import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"
import { MediaConnection } from "peerjs"
import { peer } from "../../Streaming/config/peer"

type TUseCall = {
    stream?: MutableRefObject<MediaStream | undefined>
    peerReceiverId: string
}


const useCall = (props: TUseCall) => {
    let { stream , peerReceiverId} = props
    const streamRemote = useRef<MediaStream>()
    const [peerId, setPeerId] = useState('')
    const [peerRemoteId, setPeerRemoteId] = useState(peerReceiverId)

    // Dùng ref giữ giá trị peerRemoteId mới nhất
    const peerRemoteIdRef = useRef(peerRemoteId)
    useEffect(() => {
        peerRemoteIdRef.current = peerRemoteId
    }, [peerReceiverId])
console.log({peerRemoteId})
    const onReceive = useCallback(async (call: MediaConnection) => {
        console.log({ peerRemoteId: peerRemoteIdRef.current, receive: true, stream, streamRemote })
        if (!stream?.current) {
            try {
                const streamAPI = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                stream!.current = streamAPI;
                setConnectStream(true);
            } catch (error) {
                console.log({ error });
            }
        }
        call.answer(stream?.current)
        call.on('stream', (stream) => {
            console.log({peerId})
            streamRemote.current = stream
            setHasStream(true)
        })
    }, [stream])

    useEffect(() => {
        const handleOpen = (id: string) => {
            console.log('[peer open]', id)
            setPeerId(id)
        }

        peer.on('open', handleOpen)
        peer.on('call', onReceive)

        return () => {
            peer.off('open', handleOpen)
            peer.off('call', onReceive)
        }
    }, [onReceive, peerReceiverId])

    const [hasStream, setHasStream] = useState(false)
    const [connectStream, setConnectStream] = useState(false)

    const onCall = useCallback(async () => {
      
        console.log({ peerRemoteId: peerReceiverId, call: true, stream, streamRemote })
        if (!peerReceiverId) return

        try {
            const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            stream!.current = localStream; // ✅ Gán vào ref được truyền từ props

            setConnectStream(true);

            const call = peer.call(peerReceiverId, localStream)
            console.log({call})
            if (!call) {
                console.error('peer.call failed – remote peer not found')
                return
            }
            call.on('stream', (remoteStream) => {
                streamRemote.current = remoteStream
                setHasStream(true)
            })
        } catch (err) {
            console.error('Error getting media or calling peer:', err)
        }
    }, [connectStream, peerReceiverId])

    return { onCall, streamRemote, hasStream, setPeerRemoteId, setPeerId, peerId, connectStream, peerRemoteId }
}

export default useCall