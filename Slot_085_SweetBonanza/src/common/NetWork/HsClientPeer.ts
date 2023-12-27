/**Hs 客戶同行*/
class HsClientPeer extends Photon.PhotonPeer
{

    logger = new Exitgames.Common.Logger("詩詩:");
    private _remoteConnetionType : RemoteConnetionType;

    public get RemoteConnType() : RemoteConnetionType { return this._remoteConnetionType; }
    
    //當photonPeer 更新狀態時,回調方法
    constructor(url: string, remoteConnetionType : RemoteConnetionType, subprotocol?: string, debugName?: string)
    {
        super(url,subprotocol,debugName);
        this._remoteConnetionType = remoteConnetionType;

        super.addPeerStatusListener(Photon.PhotonPeer.StatusCodes.connecting,this.onSocketConnecting);
        super.addPeerStatusListener(Photon.PhotonPeer.StatusCodes.connect,this.onSocketConnect);
        super.addPeerStatusListener(Photon.PhotonPeer.StatusCodes.connectFailed,this.onSocketConnectFailed);
        super.addPeerStatusListener(Photon.PhotonPeer.StatusCodes.disconnect,this.onSocketDisconnect);
        super.addPeerStatusListener(Photon.PhotonPeer.StatusCodes.connectClosed,this.onSocketConnectClosed);
        super.addPeerStatusListener(Photon.PhotonPeer.StatusCodes.error,this.onSocketError);
        super.addPeerStatusListener(Photon.PhotonPeer.StatusCodes.timeout,this.onSocketTimeout);

        super.addResponseListener(NetOperationCode.ServerClient,this.onReceiveMessage);
    }

    //-----------------------Response Listener

    /**在接收消息時*/
    public onReceiveMessage(data): void 
    {
        //console.log("收到数据" + data);
        if (data.errCode == 0) 
        {
            NetworkHandler.Instance.OnMessageArrived(data.vals);    //消息到達時
            //console.log("ReceiveMessage");
        }
    }

    //-----------------------Peer Status Listener

    public onSocketConnecting(): void
    {
        // console.log("Connecting!!");
    }

    public onSocketConnect(): void
    {
        let serverConnectedEvent = new ServerConnectedEvent(this._remoteConnetionType);
        EventManager.Instance.Send(serverConnectedEvent);
        // console.log("Connect!!");
    }

    public onSocketConnectFailed(): void
    {
        let serverDisconnectedEvent = new ServerDisconnectedEvent(this._remoteConnetionType);
        EventManager.Instance.Send(serverDisconnectedEvent);
        // console.log("ConnectFailed!!");
    }

    public onSocketDisconnect(): void
    {
        let serverDisconnectedEvent = new ServerDisconnectedEvent(this._remoteConnetionType);
        EventManager.Instance.Send(serverDisconnectedEvent);
        // console.log("Disconnect!!");
    }

    public onSocketConnectClosed(): void
    {
        let serverDisconnectedEvent = new ServerDisconnectedEvent(this._remoteConnetionType);
        EventManager.Instance.Send(serverDisconnectedEvent);
        // console.log("ConnectClosed!!");
    }

    public onSocketError(): void
    {
        //console.log("Error!!");
    }

    public onSocketTimeout(): void
    {
        //console.log("Timeout!!");
    }
}