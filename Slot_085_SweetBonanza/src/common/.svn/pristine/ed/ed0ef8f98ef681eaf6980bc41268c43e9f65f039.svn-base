class WindowDialog extends UIWindowBase
{
    private _exitDialog: boolean = false;
    private _isMessage: boolean = false;

    private _okBtn: fairygui.GButton;
    private _cancelBtn: fairygui.GButton;
    
    private _titleText: fairygui.GTextField;
    private _contentText: fairygui.GTextField;
    private _contentBRText: fairygui.GTextField;

    // resize event
    private resizeEventID:number = 0;
    private _bg_v_height:number = 576;
    
    public InitMessage(ok: string, title: string, content: string, contentBR: string, fn: Function, fnObject: any)
	{
		if(ok == "")
			this._okBtn.title = "";//LocalizationCommonTable.Get(1002);  //////////////////////////////////// deal with table
		else
			this._okBtn.title = ok;
        if(title != "")
		    this._titleText.text = title;
		this._contentText.text = content;
        this._contentBRText.text = contentBR;
		
		this._cancelBtn.visible = false;
        this._okBtn.x = (this._okBtn.x + this._cancelBtn.x)/2;
        this._isMessage = true;

        if (fn)
		    this._okBtn.addClickListener(fn, fnObject);
	}

    public InitDialog(ok: string, cancel: string, title: string, content: string, fnOK: Function, fnCancel: Function, fnOKObject: any, fnCancelObject: any)
	{
		if(ok == "")
			this._okBtn.title = "";//LocalizationCommonTable.Get(1002);//////////////////////////////////// deal with table
		else
			this._okBtn.title = ok;
		if(cancel == "")
			this._cancelBtn.title = "";//LocalizationCommonTable.Get(1003);//////////////////////////////////// deal with table
		else
			this._cancelBtn.title = cancel;
		this._titleText.text = title;
		this._contentText.text = content;
		
        if (fnOK)
		    this._okBtn.addClickListener(fnOK, fnOKObject);
        if (fnCancel)
            this._cancelBtn.addClickListener(fnCancel, fnCancelObject);
	}

    public SetContent(content:string)
    {
        this._contentText.text = content;
    }

    public Initialize()
    {
        this.ResetUI();

        if(this._cancelBtn)
			this._cancelBtn.addClickListener(this.OnClose, this);

		this._okBtn.addClickListener(this.OnClose, this);

        // this.resizeEventID = EventManager.Instance.RegisterEventListener( StageResizeEvent, this, this.onResize );  //////////////////// deal with resize
        // let event = new StageResizeEvent();
        // event.IsPortrait = SelfData.Instance.IsPortrait;
        //this.onResize( event );
    }

    public GetUIName(): string
    {
        return this.Name;
    }

    public OnUndo(): boolean
    {
        if (this._isMessage)
        {
            this._okBtn.fireClick();
            //this._okBtn.onClick.Call();
        }
        else
        {
            this._cancelBtn.fireClick();
            //this._cancelBtn.onClick.Call();
        }
		return true;
    }

	public Update(): void
	{

	}

    public UnRegisterEvent(): void
    {
        EventManager.Instance.UnregisterEventListener( this.resizeEventID );
    }

    private ResetUI()
    {
        this._titleText = this.View.asCom.getChild("title").asTextField;
        this._contentText = this.View.asCom.getChild("content").asTextField;
        this._contentBRText = this.View.asCom.getChild("content-BR").asTextField;

        this._okBtn = this.View.asCom.getChild("okBtn").asButton;
        this._cancelBtn = this.View.asCom.getChild("cancelBtn").asButton;
    }

    // private onResize( event:StageResizeEvent ):void  //////////////////// deal with resize
    // {
    //     if (SelfData.PlayerInGameScene)
    //         return;

	// 	if ( event.IsPortrait )
	// 	{
	// 		let stageH = egret.MainContext.instance.stage.stageHeight;
	// 		this.View.y = (stageH - this._bg_v_height)/2 - SelfData.Instance.PortraitTopHeight; //(stageH - this._bg_v_height)/2 - SelfData.Instance.PortraitTopHeight;
	// 	}
    //     else {
    //         let stageH = egret.MainContext.instance.stage.stageHeight;
    //         this.View.y = (stageH - this._bg_v_height)/2;
    //     }
    // }
}