class ServerConnectedEvent implements IEventUnit
{
	private _serverId: RemoteConnetionType;

    public GetEventName() : string
    {
        return  "ServerConnectedEvent";
    }

	public GetSendAll() : boolean
    {
        return false;
    }
	public GetSecondKeyListened() : any
    {
        return this._serverId;
    }
	
	public constructor(serverType? : RemoteConnetionType)
	{
		this._serverId = serverType;
	}
}