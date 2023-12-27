class Marquee {
    public MarqueeCom: fairygui.GComponent;
    public PlayerNotice: fairygui.GObject = null;
    public JPNotice: fairygui.GObject = null;
    public SysNotice: fairygui.GObject = null;
    public PlayerNoticeTrans: fairygui.Transition = null;
    public JPNoticeTrans: fairygui.Transition = null;
    public SysNoticeTrans: fairygui.Transition = null;
    private color: string[] = ["dcd7b4", "ffc800", "00f032", "c5c5c5", "ffff00", "fa00ff"];
    private AvatarColor: string[] = ["ffffff"];
    private playerTxt: fairygui.GRichTextField = null;
    private jpTxt: fairygui.GRichTextField = null;
    private sysTxt: fairygui.GRichTextField = null;
    private _bNotice: boolean = false;
    private m_sJpMsgTemp: string = "";
    private _sysNotices: string[] = new Array();		//保存系统通知消息
    private _jpNotices: string[] = new Array();		//保存彩金炒场消息
    private _playerNotices: string[] = new Array();	//玩家消息

    private _idIndex: number = 0;
    public _endWait: boolean = true;
    private _infoData: Dictionary = new Dictionary([]);
    private _data: Array<any> = new Array<any>();
    private makedata: any = null;
    private showTime: number = 60;
    //private MarqueeData: Array<any> = new Array<any>();
    private ShowData: Array<MarqueeResult> = new Array<MarqueeResult>();
    private SelfGameData: Array<MarqueeResult> = new Array<MarqueeResult>();
    private selfOtherGameData: Array<MarqueeResult> = new Array<MarqueeResult>();
    private cleanUpTimer;
    private FontSize: number = 0;
    private FontWidth: number = 0;

    //AvatarMarqueeCom
    private TransCom: fairygui.GComponent;
    private AvatarNotice: fairygui.GComponent;
    private AvatarNoticeTrans: fairygui.Transition;
    private AvatarMarqueeCom: fairygui.GComponent;
    private AvatarCom: fairygui.GComponent;
    private AvatarChild: fairygui.GComponent;
    private AvatarName: fairygui.GRichTextField;
    private GameID: fairygui.GRichTextField;

    //Loader of AvatarChild
    private OuterFrame: fairygui.GLoader;
    private Avatar: fairygui.GLoader;
    private Top: fairygui.GLoader;
    private Bot: fairygui.GLoader;
    private Left: fairygui.GLoader;
    private Right: fairygui.GLoader;
    private TopLeft: fairygui.GLoader;
    private TopRight: fairygui.GLoader;
    private Name: fairygui.GLoader;
    private Wing: fairygui.GLoader;
    private GameTitle: fairygui.GLoader;

    private TextCom: fairygui.GComponent;

    //Child of TextCom
    private CongratulationsText: fairygui.GRichTextField;
    private WinningTitle: fairygui.GRichTextField;
    private GameNameTitle: fairygui.GRichTextField;
    private AwardAmountTitle: fairygui.GRichTextField;
    private WinningOds: fairygui.GRichTextField;
    private GameName: fairygui.GRichTextField;
    private AwardAmount: fairygui.GRichTextField;
    private Icon: fairygui.GLoader;

    //限制
    private isAvatarMarqueeOn = false;
    private isGetAvatarForH5 = true;
    private minWindOdds: number = 100;
    private minWinMoney: number = 100000;
    private minWinTableMoney: number = 100000;
    private avatarMarqueefontsize: number = 30;
    private avatarMarqueeTextWidth: number = 130;

    private _Parent: fairygui.GComponent;


    public Init(parent: fairygui.GComponent = null) {
        this.isAvatarMarqueeOn = SelfData.Instance.AvatarMarqueeOn;
        this.minWindOdds = SelfData.Instance.MarqueeRate;
        this.minWinMoney = SelfData.Instance.MarqueeWinMoney * SelfData.Instance.PlaySetting.CurrencyScale;
        this.minWinTableMoney = SelfData.Instance.MarqueeTableWinMoney * SelfData.Instance.PlaySetting.CurrencyScale;
        //NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerLocalGameNameRespond, this, this.GameNameRespod);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.ShowSelfMarquee, ClientMsg.SelfMarquee);
        this.FontSize = 26;
        this.FontWidth = 1090;
        if (parent != null)
            this._Parent = parent;
        this.MarqueeInit();
        //this.GameNameRequest();
    }

    // //獲取遊戲名稱清請求
    // private GameNameRequest(currentChangeId: number = 0) {
    //     let msgBuilder = new MessageBuilder();
    //     msgBuilder.Add(GameNameRequest.Lang, LanguageType[SelfData.Instance.Language], NetMsgFieldType.String);
    //     msgBuilder.Add(GameNameRequest.Offset, currentChangeId, NetMsgFieldType.Int);
    //     if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode && SelfData.Instance.UrlParam_GameMode != GameMode.SetResultMode) {
    //         NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerLocalGameNameRequest, msgBuilder);
    //         let setResponseTimer = (ms, thisObj) => {

    //             const id = setInterval(output, ms);

    //             let time = 0;

    //             function output() {
    //                 time += ms;
    //                 consoleLog(`Server Timeout...${time}ms`);
    //                 thisObj.GameNameRequest();
    //                 cleanUpResponseTimer();
    //             }

    //             function cleanUpResponseTimer() {
    //                 clearInterval(id);
    //             }

    //             return cleanUpResponseTimer;
    //         }

    //         this.cleanUpTimer = setResponseTimer(15000, this);
    //     }
    // }

    ////獲取遊戲名稱回應 GamaNameTable 
    // public GameNameRespod(connectionId: number, message: any[]) {
    //     let total: number = message[GameNameRespond.Total];
    //     this.cleanUpTimer();
    //     delete this.cleanUpTimer;
    //     this.cleanUpTimer = null;
    //     let msg = message[GameNameRespond.GameName];

    //     if (msg != null) {
    //         let dict = JsonToDictionary(JSON.parse(msg));
    //         for (let i = 0, max = dict._keys.length; i < max; ++i) {
    //             if (!GameNameTable.GameNameDict.containsKey(dict._keys[i])) {
    //                 GameNameTable.GameNameDict.add(dict._keys[i], dict._values[i]);
    //             }
    //         }
    //     }

    //     if (GameNameTable.GameNameDict.Count != total) {
    //         this.GameNameRequest(GameNameTable.GameNameDict.Count);
    //     }

    //     //當獲取完全部的遊戲名稱時
    //     else {
    //         this.MarqueeInit();
    //     }
    // }

    public MarqueeInit() {
        this.RegisterMarqueeEven();
        this.CreateMarquee();

        if (this.isAvatarMarqueeOn)
            this.CreateAvatarMarquee();

        this.SendMarquee();
        this.CheckMarquee();
    }

    //註冊跑馬燈事件
    public RegisterMarqueeEven() {
        NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerMarqueeRespond, this, this.MarqueeRespod);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnShowMarquee, ClientMsg.Marquee);
        EventManager.Instance.RegisterEventListener(StageResizeEvent, this, this.onResize);
    }

    //傳送到server跑馬燈資料
    public SendMarquee(currentChangeId: number = 0) {
        let msgBuilder = new MessageBuilder();
        this._data = [];
        msgBuilder.Add(MarqueeRequest.CurrentChangeId, currentChangeId, NetMsgFieldType.Int);

        if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode && SelfData.Instance.UrlParam_GameMode != GameMode.SetResultMode) {
            NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerMarqueeRequest, msgBuilder);
        }
    }

    //創建跑馬燈
    public CreateMarquee() {
        let _marqueeObj: fairygui.GObject = fairygui.UIPackage.createObject(SelfData.Instance.CommonPackageName, "Marquee");
        this.PlayerNotice = _marqueeObj.asCom.getChild("PlayerNotice");
        this.PlayerNoticeTrans = this.PlayerNotice.asCom.getTransition("move");
        this.PlayerNoticeTrans.setHook("end", () => this._endWait = false, this);
        this.JPNotice = _marqueeObj.asCom.getChild("JPNotice");
        this.JPNoticeTrans = this.JPNotice.asCom.getTransition("move");
        this.JPNoticeTrans.setHook("end", () => this._endWait = false, this);
        this.SysNotice = _marqueeObj.asCom.getChild("SysNotice");
        this.SysNoticeTrans = this.SysNotice.asCom.getTransition("move");
        this.SysNoticeTrans.setHook("end", () => this._endWait = false, this);
        this.playerTxt = this.PlayerNotice.asCom.getChild("txt").asRichTextField;
        this.jpTxt = this.JPNotice.asCom.getChild("txt").asRichTextField;
        this.sysTxt = this.SysNotice.asCom.getChild("txt").asRichTextField;
        if (this._Parent != null) {
            this._Parent.addChild(_marqueeObj);
            _marqueeObj.sortingOrder = ZOrder.eLobbyBar - 2;
        }
        else
            fairygui.GRoot.inst.addChild(_marqueeObj);
        _marqueeObj.asCom.setPivot(0.5, 0.5);
        this.MarqueeCom = _marqueeObj.asCom;
        this.MarqueeCom.touchable = false;
        if (SelfData.Instance.WindowSwitch) {
            if (window.innerWidth >= window.innerHeight) {
                this.MarqueeCom.setXY(0, 0);
                this.MarqueeCom.setScale(1, 1);
                this.MarqueeCom.rotation = 0;
                this.FontWidth = 1090;
                if (this.TransCom != null) {
                    this.TransCom.setXY(SelfData.Instance.MarqueePoint_W[0], SelfData.Instance.MarqueePoint_W[1]);
                    this.TransCom.setScale(SelfData.Instance.MarqueeScale_W[0], SelfData.Instance.MarqueeScale_W[1]);
                    this.TransCom.getTransition("w").play();
                }
            }

            else {
                if (this._Parent != null) {
                    this.MarqueeCom.setXY(0, -355);
                    this.MarqueeCom.setScale(0.65, 0.65);
                    //this.MarqueeCom.rotation = -90;
                }
                else {
                    this.MarqueeCom.setXY(-355, 0);
                    this.MarqueeCom.setScale(0.65, 0.65);
                    this.MarqueeCom.rotation = -90;
                }
                this.FontWidth = 800;
                if (this.TransCom != null) {
                    this.TransCom.setXY(SelfData.Instance.MarqueePoint_V[0], SelfData.Instance.MarqueePoint_V[1]);
                    this.TransCom.setScale(SelfData.Instance.MarqueeScale_V[0], SelfData.Instance.MarqueeScale_V[1]);
                    this.TransCom.getTransition("v").play();
                }
            }
        }
        this.PlayerNotice.visible = false;
        this.JPNotice.visible = false;
        this.SysNotice.visible = false;
    }

    public MarqueeRespod(connectionId: number, message: any[]) {
        let id: number = message[MarqueeRespond.CurrentChangeId];
        if (id === this._idIndex) {
            this.ReSendMarquee();
            return;
        }
        let info: Array<Object> = message[MarqueeRespond.MarqueeTable];
        for (let k in info) {
            this._data.push(info[k]);
        }
        for (let i = 0; i < this._data.length; i++) {
            let result = new MarqueeResult(this._data[i]);
            let marinfo = new MarqueeInfo(result.Content);
            if (result.AccountId === SelfData.Instance.AccountData.UserID && parseInt(marinfo.GameId) === SelfData.Instance.TargetGameType)
                this.SelfGameData.push(result);
            else if (result.AccountId === SelfData.Instance.AccountData.UserID)
                this.selfOtherGameData.push(result);
            else
                this.ShowData.push(result);
        }
        this._idIndex = id;
        this.ReSendMarquee();
        this.makedata = makeIterator(this._data);
        // if (this.makedata == null) {
        //     this.ReSendMarquee();
        //     return;
        // }
        // if (this.makedata.isDown().done) {
        //     this.ReSendMarquee();
        //     return;
        // }

        // let content = new MarqueeResult(this.makedata.next().value);
        // content.Content.push(content.ServerTime);
        // let data = new MarqueeInfo(content.Content);
        // if (SelfData.Instance.TargetGame == data.GameId) {
        //     this.SelfGameData.push(content);
        //     let _Time = this.SelfGameData[0].ServerTime + this.showTime;
        //     if (SelfData.Instance.AccountData.ServerTime >= _Time) {
        //         let first_content = this.SelfGameData.shift();
        //         let first_data = new MarqueeInfo(first_content.Content);
        //         this.ShowMarquee(content.MarqueeCategory, first_data);
        //     }
        //     else {
        //         let event = new ClientEvent(ClientMsg.Marquee);
        //         EventManager.Instance.Send(event);
        //     }
        // }
        // else {
        //     this.ShowMarquee(content.MarqueeCategory, data);
        // }
    }

    public async CheckMarquee() {
        while (this.ShowData.length <= 0) {
            await waitForSeconds(1);
            this.OnShowMarquee();
            return;
        }
        let content = this.ShowData.shift();
        content.Content.push(content.ServerTime);
        content.Content.push(content.AvatarId);
        let data = new MarqueeInfo(content.Content);
        this.ShowMarquee(content.MarqueeCategory, data);
    }

    public async ShowMarquee(currentChangeId: MarqueeCategory, marqueeInfo: MarqueeInfo) {
        let nickName: string = "";
        let playBaes: string = "";
        let AddBaes: string = "";
        this._endWait = true;
        if (marqueeInfo.WinBase == -1) {
            playBaes = "";
            AddBaes = "<font color='#" + this.color[4] + "'>" + playBaes + "</font>";
        }
        else {
            playBaes = marqueeInfo.WinBase.toString();
            AddBaes = "<font color='#" + this.color[4] + "'>" + playBaes + "</font>" +
                "<font color='#" + this.color[3] + "'>" + LocalizationCommonTable.Get(2004) + "</font>";
        }
        switch (currentChangeId) {
            case 0:
                this.SysNotice.visible = true;
                this.SysNoticeTrans.play();
                this.sysTxt.text = "<font color='#" + this.color[0] + "'>" + "" + "</font>";
                updateFontSize(this.sysTxt, this.FontSize, this.FontWidth);
                break;
            case 1:
                nickName = marqueeInfo.NickName;
                // nickName = nickName.substring(0, 2) + "****" + nickName.substring(nickName.length - 2, nickName.length);
                this.JPNotice.visible = true;
                this.JPNoticeTrans.play();
                this.jpTxt.text = "<font color='#" + this.color[3] + "'>" + LocalizationCommonTable.Get(2001) + "</font>" +
                    "<font color='#" + this.color[4] + "'>" + nickName + "</font>" +
                    "<font color='#" + this.color[3] + "'>" + LocalizationCommonTable.Get(2002) + GameNameTable.Get(parseInt(marqueeInfo.GameId, 10)) + "</font>" +
                    "<font color='#" + this.color[3] + "'>" + LocalizationCommonTable.Get(2003) + "</font>" +
                    AddBaes +
                    "<font color='#" + this.color[5] + "'>" + (marqueeInfo.WinMoney / 100).toFixed(2) + "</font>" +
                    "<font color='#" + this.color[3] + "'>" + LocalizationCommonTable.Get(2005) + "</font>";
                updateFontSize(this.jpTxt, this.FontSize, this.FontWidth);
                break;
            case 2:
                nickName = marqueeInfo.NickName;
                // nickName = nickName.substring(0, 2) + "****" + nickName.substring(nickName.length - 2, nickName.length);
                this.PlayerNotice.visible = true;
                this.PlayerNoticeTrans.play();
                this.playerTxt.text = "<font color='#" + this.color[1] + "'>" + LocalizationCommonTable.Get(2001) + "</font>" +
                    "<font color='#" + this.color[2] + "'>" + nickName + "</font>" +
                    "<font color='#" + this.color[1] + "'>" + LocalizationCommonTable.Get(2002) + GameNameTable.Get(parseInt(marqueeInfo.GameId, 10)) + "</font>" +
                    "<font color='#" + this.color[1] + "'>" + LocalizationCommonTable.Get(2003) + "</font>" +
                    AddBaes +
                    "<font color='#" + this.color[2] + "'>" + (marqueeInfo.WinMoney / 100).toFixed(2) + "</font>" +
                    "<font color='#" + this.color[1] + "'>" + LocalizationCommonTable.Get(2005) + "</font>";
                updateFontSize(this.playerTxt, this.FontSize, this.FontWidth);
                if (this.isAvatarMarqueeOn)
                    this.ShowAvatarMarquee(nickName, marqueeInfo);
                break;
            default:
                break;
        }
        while (this._endWait) await waitForSeconds(0.5);

        let event = new ClientEvent(ClientMsg.Marquee);
        EventManager.Instance.Send(event);

        //if (this.makedata.isDown().done) {
        //    this.SendMarquee(this._idIndex);
        //}
        //else {
        //    let event = new ClientEvent(ClientMsg.Marquee);
        //    EventManager.Instance.Send(event);
        //}
    }

    private OnShowMarquee() {
        if (this.selfOtherGameData.length > 0 && SelfData.Instance.AccountData.ServerTime >= (this.selfOtherGameData[0].ServerTime + this.showTime)) {
            let result = this.selfOtherGameData.shift();
            this.ShowData.splice(0, 0, result);
        }
        this.CheckMarquee();
    }

    private async ReSendMarquee() {
        await waitForSeconds(5);
        this.SendMarquee(this._idIndex);
    }

    public ShowSelfMarquee() {
        while (this.SelfGameData.length > 0) {
            let result = this.SelfGameData.shift();
            this.ShowData.splice(0, 0, result);
        }
    }

    private onResize(event: StageResizeEvent): void {
        if (SelfData.Instance.WindowSwitch) {
            if (window.innerWidth >= window.innerHeight) {
                this.MarqueeCom.setXY(0, 0);
                this.MarqueeCom.setScale(1, 1);
                this.MarqueeCom.rotation = 0;
                this.FontWidth = 1090;
                if (this.TransCom != null){
                    this.TransCom.setXY(SelfData.Instance.MarqueePoint_W[0], SelfData.Instance.MarqueePoint_W[1]);
                    this.TransCom.setScale(SelfData.Instance.MarqueeScale_W[0], SelfData.Instance.MarqueeScale_W[1]);
                    this.TransCom.getTransition("w").play();
                }
            }

            else {
                if (this._Parent != null) {
                    this.MarqueeCom.setXY(0, -355);
                    this.MarqueeCom.setScale(0.65, 0.65);
                    //this.MarqueeCom.rotation = -90;
                }
                else {
                    this.MarqueeCom.setXY(-355, 0);
                    this.MarqueeCom.setScale(0.65, 0.65);
                    this.MarqueeCom.rotation = -90;
                }
                this.FontWidth = 800;
                if (this.TransCom != null){
                    this.TransCom.setXY(SelfData.Instance.MarqueePoint_V[0], SelfData.Instance.MarqueePoint_V[1]);
                    this.TransCom.setScale(SelfData.Instance.MarqueeScale_V[0], SelfData.Instance.MarqueeScale_V[1]);
                    this.TransCom.getTransition("v").play();
                }
            }
        }
    }


    //#region AvatarMarquee
    //創建頭像跑馬燈
    public CreateAvatarMarquee() {
        this.TransCom = this.MarqueeCom.getChild("AvatarNotice").asCom;
        this.AvatarNotice = this.TransCom.getChild("Avatar").asCom;
        this.AvatarNoticeTrans = this.AvatarNotice.getTransition("move");
        this.AvatarNoticeTrans.setHook("end", () => this._endWait = false, this);
        this.AvatarMarqueeCom = this.AvatarNotice.getChild("AvatarMarqueeCom").asCom;

        this.AvatarCom = this.AvatarMarqueeCom.getChild("AvatarCom").asCom;
        this.AvatarChild = this.AvatarCom.getChild("AvatarChild").asCom;
        //  this.AvatarName =  this.AvatarCom.getChild("AvatarName").asRichTextField;
        this.GameID = this.AvatarCom.getChild("GameID").asRichTextField;

        this.TextCom = this.AvatarMarqueeCom.getChild("TextCom").asCom;
        this.CongratulationsText = this.TextCom.getChild("CongratulationsText").asRichTextField;
        this.WinningTitle = this.TextCom.getChild("WinningTitle").asRichTextField;
        this.GameNameTitle = this.TextCom.getChild("GameNameTitle").asRichTextField;
        this.AwardAmountTitle = this.TextCom.getChild("AwardAmountTitle").asRichTextField;
        this.WinningOds = this.TextCom.getChild("WinningOds").asRichTextField;
        this.GameName = this.TextCom.getChild("GameName").asRichTextField;
        this.AwardAmount = this.TextCom.getChild("AwardAmount").asRichTextField;
        this.Icon = this.TextCom.getChild("Icon").asLoader;

        if (SelfData.Instance.WindowSwitch) {
            if (window.innerWidth >= window.innerHeight) {
                if (this.TransCom != null){
                    this.TransCom.setXY(SelfData.Instance.MarqueePoint_W[0], SelfData.Instance.MarqueePoint_W[1]);
                    this.TransCom.setScale(SelfData.Instance.MarqueeScale_W[0], SelfData.Instance.MarqueeScale_W[1]);
                    this.TransCom.getTransition("w").play();
                }
            }

            else {
                if (this.TransCom != null){
                    this.TransCom.setXY(SelfData.Instance.MarqueePoint_V[0], SelfData.Instance.MarqueePoint_V[1]);
                    this.TransCom.setScale(SelfData.Instance.MarqueeScale_V[0], SelfData.Instance.MarqueeScale_V[1]);
                    this.TransCom.getTransition("v").play();
                }
            }
        }

        this.CreateAvatarComLoader();

        this.AvatarNotice.visible = false;
    }

    //創建頭像Loader
    public CreateAvatarComLoader() {
        this.Avatar = <MyGLoader>this.AvatarChild.getChild("Avatar").asLoader;
        this.OuterFrame = <MyGLoader>this.AvatarChild.getChild("OuterFrame").asLoader;
        this.Top = <MyGLoader>this.AvatarChild.getChild("Top").asLoader;
        this.Bot = <MyGLoader>this.AvatarChild.getChild("Bot").asLoader;
        this.Left = <MyGLoader>this.AvatarChild.getChild("Left").asLoader;
        this.Right = <MyGLoader>this.AvatarChild.getChild("Right").asLoader;
        this.TopLeft = <MyGLoader>this.AvatarChild.getChild("TopLeft").asLoader;
        this.TopRight = <MyGLoader>this.AvatarChild.getChild("TopRight").asLoader;
        this.Wing = <MyGLoader>this.AvatarChild.getChild("Wing").asLoader;
        this.Name = <MyGLoader>this.AvatarChild.getChild("Name").asLoader;
        this.GameTitle = <MyGLoader>this.AvatarChild.getChild("GameTitle").asLoader;

    }

    public SetImageURL(avatarId: string, gameId: any) {
        let delimiterChars = [",", ";"];
        let AvatarId: string[] = [];
        let new_avatarId_1 = avatarId.split(delimiterChars[0]);
        let new_avatarId_2 = avatarId.split(delimiterChars[1]);
        //console.log("avatarstring : " + avatarId);
        if (new_avatarId_1.length >= 11)
            AvatarId = new_avatarId_1;
        else if (new_avatarId_2.length >= 11)
            AvatarId = new_avatarId_2;
        // for (let i = 0; i < AvatarId.length; i++) {
        //     console.log("AvatarId : " + SelfData.Instance.ImageResUrl + AvatarId[i] + ".png");
        // }
        this.Avatar.url = SelfData.Instance.ImageResUrl + AvatarId[0] + ".png";
        this.OuterFrame.url = SelfData.Instance.ImageResUrl + AvatarId[1] + ".png";
        this.Top.url = SelfData.Instance.ImageResUrl + AvatarId[2] + ".png";
        this.Bot.url = SelfData.Instance.ImageResUrl + AvatarId[3] + ".png";
        this.Left.url = SelfData.Instance.ImageResUrl + AvatarId[4] + ".png";
        this.Right.url = SelfData.Instance.ImageResUrl + AvatarId[5] + ".png";
        this.TopLeft.url = SelfData.Instance.ImageResUrl + AvatarId[6] + ".png";
        this.TopRight.url = SelfData.Instance.ImageResUrl + AvatarId[7] + ".png";
        this.Wing.url = SelfData.Instance.ImageResUrl + AvatarId[8] + ".png";
        this.Name.url = SelfData.Instance.ImageResUrl + AvatarId[9] + ".png";
        this.GameTitle.url = SelfData.Instance.ImageResUrl + AvatarId[10] + ".png";

        this.Icon.url = SelfData.Instance.IconURL + gameId + "_icon1_" + this.LanguageChangeID(SelfData.Instance.Language).toString() + ".jpg";
        //console.log("this.Icon.url : " + SelfData.Instance.IconURL + gameId + "_icon1_" + this.LanguageChangeID(SelfData.Instance.Language).toString() + ".jpg");
    }

    private WriteText(GRichTextField: fairygui.GRichTextField, text: string, fontSize: number = this.avatarMarqueefontsize, textWidth: number = this.avatarMarqueeTextWidth) {
        GRichTextField.text = text;
        updateFontSize(GRichTextField, fontSize, textWidth);
    }

    public async ShowAvatarMarquee(nickName: string, marqueeInfo: MarqueeInfo) {
        let show: boolean = false;
        if (Number(marqueeInfo.WinBase) > 0) {
            if (Number(marqueeInfo.WinBase) >= this.minWindOdds || Number(marqueeInfo.WinMoney) >= this.minWinMoney) {
                show = true;
            }
        }
        else {
            if (Number(marqueeInfo.WinBase) == -1 && Number(marqueeInfo.WinMoney) >= this.minWinTableMoney) {
                show = true;
            }
        }

        if (show) {
            let playBaes: string = "";
            let AddBase: string = "";
            if (this.isGetAvatarForH5)
                this.SetImageURL(marqueeInfo.AvatarId, marqueeInfo.GameId);
            this.AvatarNotice.visible = true;
            this.AvatarNoticeTrans.play();

            // var text = "<font color='#" +  this.color[1] + "'>" + "恭喜獲獎" + "</font>";
            var text = "<font color='#" + this.AvatarColor[0] + "'>" + LocalizationCommonTable.Get(2011) + "</font>";
            this.WriteText(this.CongratulationsText, text, 22, 156);
            if (marqueeInfo.WinBase == -1) {
                playBaes = "";
                var number = "<font color='#" + this.AvatarColor[0] + "'>" + playBaes + "</font>";
                text = number;
                this.WinningTitle.visible = false;
            }
            else {
                playBaes = marqueeInfo.WinBase.toString();
                var number = "<font color='#" + this.AvatarColor[0] + "'>" + playBaes + "</font>";
                text = "<font color='#" + this.AvatarColor[0] + "'>" + "x" + number + "</font>";
                this.WinningTitle.visible = true;
            }
            this.WriteText(this.WinningOds, text, 28, 85);

            text = "<font color='#" + this.AvatarColor[0] + "'>" + GameNameTable.Get(parseInt(marqueeInfo.GameId, 10)) + "</font>";
            this.WriteText(this.GameName, text, 30, 159);

            // text = "<font color='#" + this.AvatarColor[0] + "'>" + (marqueeInfo.WinMoney / 100).toFixed(2) + "</font>" +
            //     "<font color='#" + this.AvatarColor[0] + "'>" + LocalizationCommonTable.Get(2005) + "</font>";
            text = "<font color='#" + this.AvatarColor[0] + "'>" + (marqueeInfo.WinMoney / 100).toFixed(2) + "</font>";
            this.WriteText(this.AwardAmount, text, 28, 159);

            text = "<font color='#" + this.AvatarColor[0] + "'>" + nickName + "</font>";
            this.WriteText(this.GameID, text, 26, 170);

            text = "<font color='#" + this.AvatarColor[0] + "'>" + LocalizationCommonTable.Get(2012) + "</font>";
            this.WriteText(this.WinningTitle, text, 16, 85);

            text = "<font color='#" + this.AvatarColor[0] + "'>" + LocalizationCommonTable.Get(2013) + "</font>";
            this.GameNameTitle.text = text;

            text = "<font color='#" + this.AvatarColor[0] + "'>" + LocalizationCommonTable.Get(2014) + "</font>";
            this.AwardAmountTitle.text = text;

            // text = "<font color='#" + this.color[1] + "'>" + LocalizationCommonTable.Get(2002) + GameNameTable.Get(parseInt(marqueeInfo.GameId, 10)) + "</font>" ;      
            // this.WriteText(this.AvatarName, text);            
        }
    }

    public LanguageChangeID(id: number) {
        let res = 0;
        if (id == 0) {
            res = 1;
        }
        else if (id == 1) {
            res = 2;
        }
        else if (id == 2) {
            res = 0;
        }
        else if (id == 3) {
            res = 6;
        }
        else if (id == 4) {
            res = 3;
        }
        else if (id == 5) {
            res = 4;
        }
        else if (id == 6) {
            res = 7;
        }
        else if (id == 7) {
            res = 8;
        }
        else if (id == 8) {
            res = 5;
        }
        else if (id == 9) {
            res = 9;
        }
        else if (id == 10) {
            res = 10;
        }
        return res;
    }
    //#endregion    
}