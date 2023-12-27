// TypeScript file
/**註冊網路CallBack訊息*/
class NetMessageRegister
{
    private _callerObject : any; // used to record the this of caller
	private _functionCall :  (number, []) => void;

     /**調用者對象object*/
    public get CallerObject() : any
	{
		return this._callerObject;
	}
     /**調用者對象回調*/
	public get FunctionCall() : (number, []) => void
	{
		return this._functionCall;
	}

    /**註冊CallBack訊息*/
    public constructor(callerObject : any, callback: (number, []) => void)
	{
		this._callerObject = callerObject;
		this._functionCall = callback;
	}
}

/**網絡處理器*/
class NetworkHandler
{
    private static _instance : NetworkHandler;

    private _remoteConnectorTable = new Dictionary([]);                                             //(connectionId: RemoteConnetionType,HsClientPeer(url, connectionId)) 遠程連接器表
    private _messageDispatchTable = new Dictionary([]);                                             //消息調度表

    /**網絡處理器設定單例*/
    public static get Instance(): NetworkHandler 
    {
        if (this._instance == null)
        {
            this._instance = new NetworkHandler();
        }
        return this._instance;
    }

    /**HsClientPeer 連線*/
    public Connect(connectionId: RemoteConnetionType, url: string)                                   //url:稱統一資源定位器、定位位址
    {
        if (this._remoteConnectorTable[connectionId] != null)
        {
            this._remoteConnectorTable[connectionId].disconnect();
            this._remoteConnectorTable.remove(connectionId);            
        }
        this._remoteConnectorTable[connectionId] = new HsClientPeer(url, connectionId);
        this._remoteConnectorTable[connectionId].connect(0);                                          //HsClientPeer 連線
    }

    /**HsClientPeer 離線*/
    public Disconnect(connectionId: RemoteConnetionType)
    {
        if (this._remoteConnectorTable[connectionId] != null)
        {
            this._remoteConnectorTable[connectionId].disconnect();
            this._remoteConnectorTable.remove(connectionId);
        }
    }

    /**註冊 Client 資料 或 傳送到SEVER Client 資料 */
    public Sned(connectionId: RemoteConnetionType, msgType: MsgType, message: MessageBuilder)
    {
         //<-----------------HsClientPeer離線或關閉時------------------------->
        if(!(<HsClientPeer>this._remoteConnectorTable[connectionId]).isConnected() ||
            (<HsClientPeer>this._remoteConnectorTable[connectionId]).isClosing())
        {
            let serverDisconnectedEvent = 
                new ServerDisconnectedEvent((<HsClientPeer>this._remoteConnectorTable[connectionId]).RemoteConnType);
            EventManager.Instance.Send(serverDisconnectedEvent);
            return;
        }       
       
        let builtMessage = message;

         //<-----------------判斷是否為玩家訊息------------------------>
        if (msgType > MsgType.NetMsg_PlayerMessageBegin && msgType < MsgType.NetMsg_PlayerMessageEnd)
        {
            let playerMessage = new MessageBuilder();
            playerMessage.Add(PlayerFieldIndicator.MessageType, msgType, NetMsgFieldType.Int);
            playerMessage.Add(PlayerFieldIndicator.MessageData, message.Build(), NetMsgFieldType.Object);

            msgType = MsgType.NetMsg_PlayerMessage;
            builtMessage = playerMessage;
        }

        //<-----------------把訊息傳送到SEVER---------------------------------->
        let outMessage = new MessageBuilder();
        outMessage.Add(FieldIndicator.MessageID, msgType, NetMsgFieldType.Int);
        outMessage.Add(FieldIndicator.RemoteType, RemoteConnetionType.Client, NetMsgFieldType.Int);
        outMessage.Add(FieldIndicator.Data, builtMessage.Build(), NetMsgFieldType.Object);
        outMessage.Add(FieldIndicator.SelfDefinedType, true, NetMsgFieldType.Boolean);

          //sendOperation => Sends operation to the Photon Server, outMessage 操作參數作為鍵值對的扁平數組：[key1, value1, key2, value2...], 選擇是否必須確認操作。如果為 false，則不能保證操作到達服務器。
        (<HsClientPeer>this._remoteConnectorTable[connectionId]).sendOperation(NetOperationCode.ClientServer, outMessage.Build(), true);
    }

    /**註冊ClientCallBack訊息*/
    public RegisterMessageListener(msgType: MsgType, callerObj : any, callback: (number, []) => void)
    {
        this._messageDispatchTable[msgType] = new NetMessageRegister(callerObj, callback);
    }

    /**消息到達時(Client Data)*/
    public OnMessageArrived(rowMessage: any[])
    {
        var msgType:MsgType = (<MsgType>rowMessage[FieldIndicator.MessageID]);
        var remoteConnectionType:RemoteConnetionType = (<RemoteConnetionType>rowMessage[FieldIndicator.RemoteType]);
        var userData: any[] = rowMessage[FieldIndicator.Data];

        if (msgType === MsgType.NetMsg_PlayerMessage)
        {
            msgType = (<MsgType>userData[PlayerFieldIndicator.MessageType]);
            userData = userData[PlayerFieldIndicator.MessageData];
        }
        this.DispatchEvent(msgType, remoteConnectionType, userData);                                //調用事件
    }

    /**調用事件*/
    private DispatchEvent(msgType: MsgType, senderId: number, message: any[])
    {
        if (this._messageDispatchTable.containsKey(msgType))
        {
            var param : any = [];
			param.push(senderId);
            param.push(message);
            let register = (<NetMessageRegister>this._messageDispatchTable[msgType]);
            register.FunctionCall.apply(register.CallerObject, param);                              //funcion.apply ( 對象, func參數)
        }
    }
}