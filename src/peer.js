class PeerService {
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      });
    }
  }
  async answerCall(offer) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const ansCall = await this.peer.createAnswer();
      await this.peer.setLocalDescription(new RTCSessionDescription(ansCall));
      return ansCall;
    }
  }
  async setLocalDescription(ansCall) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(ansCall));
    }
  }
  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      await this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
}
const peerService = new PeerService();
export default peerService;
