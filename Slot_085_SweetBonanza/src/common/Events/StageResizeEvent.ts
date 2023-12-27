/**舞台調整大小事件*/
class StageResizeEvent implements IEventUnit
{
    /**
     * 是否為直屏
     */
    public IsPortrait:boolean = false; //横屏landscape 竖屏Portrait

    public GetEventName() : string
    {
        return  "StageResizeEvent";
    }

	public GetSendAll() : boolean
    {
        return true;
    }
	public GetSecondKeyListened() : any
    {
        return null;
    }
	
	public constructor()
	{
	}
}