import Peer from 'peerjs';
let peerInstance: Peer 

export function createPeer(id: string) {
  if (!peerInstance) {
    peerInstance = new Peer(id, {
      host: 'your-peer-server.com',
      port: 9000,
      path: '/myapp'
    });
  }
  return peerInstance;
}

export function getPeer() {
  return peerInstance;
}
