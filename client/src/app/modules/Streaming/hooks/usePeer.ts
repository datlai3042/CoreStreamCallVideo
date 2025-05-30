import { useEffect, useState } from "react"
import { peer } from "../config/peer"
import { MediaConnection } from "peerjs"

type TProps = {
    callEventCallback: () => void
}

const usePeer = (props: TProps) => {
    const { callEventCallback } = props
    const [peerId, setPeerId] = useState('')
    useEffect(() => {
        peer.on(('open'), (id) => setPeerId(id))
        peer.on('call', call => {
            callEventCallback()
        });

        return () => {
            peer.off('call')
            peer.off('open')
        }
    }, [])

    return { peerId, peer, setPeerId }
}



export default usePeer