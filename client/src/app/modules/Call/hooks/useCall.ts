import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react"
import { DataConnection, MediaConnection } from "peerjs"
import { createPeer, getPeer } from "../../Streaming/config/peer"

type TUseCall = {
    stream?: MutableRefObject<MediaStream | undefined>
    peerReceiverId: string
    peerCallId: string
}


const useCall = (props: TUseCall) => {
    let { stream, peerReceiverId, peerCallId } = props
    const streamRemote = useRef<MediaStream>()
    const [peerId, setPeerId] = useState('')
    const [peerRemoteId, setPeerRemoteId] = useState(peerReceiverId)
    const dataConnectionRef = useRef<DataConnection | null>(null)
    const peer = getPeer()

    // Dùng ref giữ giá trị peerRemoteId mới nhất
    const peerRemoteIdRef = useRef(peerRemoteId)
    useEffect(() => {
        peerRemoteIdRef.current = peerRemoteId
    }, [peerReceiverId])
    const onReceive = useCallback(async (call: MediaConnection) => {
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
            console.log({ peerId })
            streamRemote.current = stream
            setHasStream(true)
        })
    }, [stream, peer])

    useEffect(() => {
        const peer = createPeer(peerCallId);

        const handleOpen = (id: string) => {
            console.log('[peer open]', id)
            setPeerId(peerCallId)
        }

        peer.on('open', handleOpen)
        peer.on('call', onReceive)
        peer.on('connection', (conn: DataConnection) => {
            dataConnectionRef.current = conn
            conn.on('data', (data) => {
                console.log('Received text data:', data)
                // bạn có thể xử lý hoặc lưu text ở đây
            })
        })
        return () => {
            peer.off('open', handleOpen)
            peer.off('call', onReceive)
        }
    }, [onReceive, peerReceiverId, peer])

    const [hasStream, setHasStream] = useState(false)
    const [connectStream, setConnectStream] = useState(false)

    const onCall = useCallback(async () => {

        console.log({ peerRemoteId: peerReceiverId, call: true, stream, streamRemote })
        if (!peerReceiverId || !peer) return
        console.log({peer})
        const dataConn = peer?.connect(peerReceiverId)

        dataConn?.on('open', () => {
            dataConnectionRef.current = dataConn
            console.log('Data connection opened')
        })
        try {
            const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            stream!.current = localStream; // ✅ Gán vào ref được truyền từ props

            setConnectStream(true);

            const call = peer.call(peerReceiverId, localStream)
            console.log({ call })
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
    }, [connectStream, peerReceiverId, peer])

    return { onCall, streamRemote, hasStream, setPeerRemoteId, setPeerId, peerId, connectStream, peerRemoteId }
}

export default useCall