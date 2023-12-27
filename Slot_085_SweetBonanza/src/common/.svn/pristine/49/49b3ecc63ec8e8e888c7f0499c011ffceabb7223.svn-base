class BaseView extends ISlotView {
    protected IsSkip: boolean = false;
    protected IsStop: boolean = false;
    protected slotWinFX: Array<fairygui.GObject> = [];
    protected slotWinFxParent: fairygui.GObject = null;
    protected slotWinFxOffset: egret.Point = new egret.Point(0, 0);

    protected BigWinObj: fairygui.GObject = null;
    protected BigWinBg: fairygui.GObject = null;
    protected BigWinDisplayObjectContainer: egret.DisplayObjectContainer = null;
    protected BigWinCoinLable: fairygui.GTextField = null;
    protected BigWinDisplayBg: fairygui.GObject = null;
    protected BigWinBgHight: number = 125;
    private continueRun = false;

    private _sendTime: number = 0;
    private _LastTime: number = 0;

    private _sendTime_b: number = 0;
    private _LastTime_b: number = 0;

    public get UnitTest(): boolean {
        return SelfData.Instance.UrlParam_GameMode === GameMode.UnitTestMode;
    };

    public Init(MainGame: fairygui.GComponent) {
        this.view = MainGame;
        this.CreateBigWin();
        this.RegisterEvent();
        this.resize();
        this.SaveMainPng();

        if (SelfData.Instance.UrlParam_SavePng) {
            document.addEventListener("keydown",
                function (evt: any) {
                    if (evt.keyCode == 67) {
                        SavePng("catch");
                    }
                }
            )
        }
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.onContinueRun, ClientMsg.OnContinueRun);

        let _time: number = new Date().getTime();
        this._LastTime = _time;
        SelfData.Instance.AccountData.ChangeName = true;
        SelfData.Instance.AccountData.BonusCode = false;
        EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.SendGetName);
        NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerPseudonymRespond, this, this.PlayerPseudonymRespond);

        EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.GetBonusCode);
        NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerBonusCodeRespond, this, this.PlayerBonusCodeRespond);

        this.FirstSendGetName();
        this.FirstGetBonusCode();
    }

    public async FirstSendGetName() {
        await waitForSeconds(1);
        this.PlayerPseudonymRequest();
    }

    public async FirstGetBonusCode() {
        await waitForSeconds(1);
        this.PlayerBonusCodeRequest();
    }

    public SendGetName() {
        if (SelfData.Instance.AccountData.ChangeName) {
            let curTime: number = new Date().getTime();
            let deltaTime: number = curTime - this._LastTime;
            this._sendTime += deltaTime;
            if (this._sendTime >= 300000) {
                this.PlayerPseudonymRequest();
                this._sendTime = 0;
            }
            this._LastTime = curTime;
        }
    }

    public GetBonusCode() {
        let curTime: number = new Date().getTime();
        let deltaTime: number = curTime - this._LastTime_b;
        this._sendTime_b += deltaTime;
        if (this._sendTime_b >= 300000) {
            this.PlayerBonusCodeRequest();
            this._sendTime_b = 0;
        }
        this._LastTime_b = curTime;
    }

    public PlayerPseudonymRequest() {
        if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode && SelfData.Instance.UrlParam_GameMode != GameMode.UnitTestMode) {
            let msgBuilder = new MessageBuilder();
            NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerPseudonymRequest, msgBuilder);
        }
    }

    public PlayerBonusCodeRequest() {
        if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode && SelfData.Instance.UrlParam_GameMode != GameMode.UnitTestMode) {
            if (SelfData.Instance.UseBonusCode) {
                let msgBuilder = new MessageBuilder();
                NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerBonusCodeRequest, msgBuilder);
            }
        }
    }

    public PlayerPseudonymRespond(connectionId: number, message: any[]) {
        let _name = message[1];
        if (_name != "") {
            SelfData.Instance.AccountData.ChangeName = false;
            let event = new ClientEvent(ClientMsg.ShowChangeNmae);
            EventManager.Instance.Send(event);
        }
        else {
            SelfData.Instance.AccountData.ChangeName = true;
            let event = new ClientEvent(ClientMsg.ShowChangeNmae);
            EventManager.Instance.Send(event);
        }
    }

    public PlayerBonusCodeRespond(connectionId: number, message: any[]) {
        //console.log("Respond" + message);
        //let bonuscode = new ClientEvent(ClientMsg.UpdateBonusCodeTime);
        //bonuscode.eventData = result.BonusCodeFreeSpinTime;
        //EventManager.Instance.Send(bonuscode);

        if (message[0] == "") {
            SelfData.Instance.AccountData.BonusCode = false;
            SelfData.Instance.AccountData.BonusCode_FreeSpin = 0;
        }
        else {
            SelfData.Instance.AccountData.BonusCode = true;
            SelfData.Instance.AccountData.BonusCode_FreeSpin = message[1];
        }
        //測試
        //SelfData.Instance.AccountData.BonusCode = true;
        //SelfData.Instance.AccountData.BonusCode_FreeSpin = 16;

        let bonuscode = new ClientEvent(ClientMsg.UpdateBonusCodeTime);
        bonuscode.eventData = SelfData.Instance.AccountData.BonusCode_FreeSpin;
        EventManager.Instance.Send(bonuscode);
    }

    public async SaveMainPng() {
        if (SelfData.Instance.UrlParam_SavePng) {
            await waitForSeconds(2);
            SavePng("main");
        }
    }

    public async StartRun() {
        this.IsSkip = false;
        this.IsStop = false;
        this.ShowWinMoney(-1);
        this.ShowLobbyMessage(LocalizationCommonTable.Get(10000002));
        await this.slotWheelManager.StartRun();
        await this.Run();
    }

    protected async Run() {

    }

    public async StopStart() {
        let e = new ClientEvent(ClientMsg.WheelStopStart);
        EventManager.Instance.Send(e);
        await this.slotWheelManager.StopRun(GameLogic.Instance.ShowResult);
        await this.Stoping();
        await this.Stop();
        await this.ReSpin();
    }
    protected async Stoping() {
        await this.slotWheelManager.Stoping();
    }
    protected async Stop() {

    }

    protected async ReSpin() {
        let e = new ClientEvent(ClientMsg.OnShowRespin);
        EventManager.Instance.Send(e);
    }

    /**顯示遊戲贏線特效*/
    public async ShowWinLineFxStart() {
        let e = new ClientEvent(ClientMsg.OnShowResultBegin);
        EventManager.Instance.Send(e);

        await this.ShowWinLineFx();
        await this.ShowWinLineFxEnd();

    }
    protected async ShowWinLineFx() {

    }
    protected async ShowWinLineFxEnd() {

    }

    public async ShowNormalWinFxStart() {
        await this.ShowNormalWinFx();
        await this.ShowNormalWinFxEnd();
    }
    protected async ShowNormalWinFx() {

    }
    protected async ShowNormalWinFxEnd() {

    }

    /**顯示主遊戲到特殊遊戲特效*/
    public async ShowMainToBonusFxStart() {
        await this.ShowMainToBonusFx();
        await this.ShowMainToBonusFxEnd();
        SavePng("bonus");
    }
    protected async ShowMainToBonusFx() {

    }
    protected async ShowMainToBonusFxEnd() {

    }
    public async ShowBonusStart() {
        await this.ShowBonus();
        await this.ShowBonusEnd();
    }
    protected async ShowBonus() {
        console.log("s");
    }
    protected async ShowBonusEnd() {

    }
    public async ShowBonusToMainFxStart() {
        await this.ShowBonusToMainFx();
        await this.ShowBonusToMainFxEnd();
    }
    protected async ShowBonusToMainFx() {

    }
    protected async ShowBonusToMainFxEnd() {

    }

    public async ShowFinalFxStart() {
        if (!SelfData.Instance.PlaySetting.IsAuto)
            await this.ShowFinalFx();
    }
    protected async ShowFinalFx() {

    }
    public async ShowFinalFxEnd() {

    }

    protected OnManualStop() {
        this.slotWheelManager.ManualStop();
        this.IsStop = true;
    }

    protected async OnManualSkip() {
        this.IsSkip = true;
    }

    protected RegisterEvent() {
        UIManager.Instance.Stage.addEventListener(egret.Event.RESIZE, this.resize, this);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnManualStop, ClientMsg.StopRun);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnManualSkip, ClientMsg.OnShowResultSkip);
    }

    public resize($e?): void {
        fairyguiResize();
    }

    /**顯示贏錢*/
    public ShowWinMoney(money: number) {
        let event: ClientEvent = new ClientEvent(ClientMsg.OnShowWinMoney);
        event.eventData = money;
        EventManager.Instance.Send(event);
    }

    protected ShowCenterMoney(money: number) {
        let event: ClientEvent = new ClientEvent(ClientMsg.OnShowCenterMoney);
        event.eventData = money;
        EventManager.Instance.Send(event);
    }

    protected UpdateAccountMoney() {
        let event: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
        EventManager.Instance.Send(event);
    }

    protected ShowLobbyMessage(message: string) {
        let event: ClientEvent = new ClientEvent(ClientMsg.OnShowMessage);
        event.eventData = message;
        EventManager.Instance.Send(event);
    }

    protected addSlotFx(slotIndex: number, targetNum: number, resName: string = "_Connection", fxList: fairygui.GObject[] = null) {
        if (SelfData.Instance.ConnectionClose)
            return;
        let fx: fairygui.GObject = UIManager.Instance.ShowEffect(SelfData.Instance.MainPackageName, targetNum + resName, false);
        if (fx == null)
            consoleLog("addSlotFx fail. " + targetNum + resName);
        else {
            this.slotWheelManager.DisableShowItem(slotIndex);
            let worldPoint = this.getSlotItemWorldPoint(slotIndex);
            fx.setXY(worldPoint.x + this.slotWinFxOffset.x, worldPoint.y + this.slotWinFxOffset.y);
            if (this.slotWinFxParent != null)
                this.view.addChildAt(fx, this.view.getChildIndex(this.slotWinFxParent) + 1);
            else
                this.view.addChild(fx);
            if (fxList != null)
                fxList.push(fx);
            else
                this.slotWinFX.push(fx);
        }
        return fx;
    }

    protected getSlotItemWorldPoint(slotIndex: number): egret.Point {
        let slotItem = this.slotWheelManager.GetShowItem(slotIndex);
        let slotWheel = slotItem.parent;
        let slotMain = slotWheel.parent;
        return new egret.Point(slotMain.x + slotWheel.x + slotItem.x, slotMain.y + slotWheel.y + slotItem.y);
    }

    /**隱藏所有插槽 FX*/
    protected hideAllSlotFX(fxList: fairygui.GObject[] = null): void {
        var list = [];
        this.slotWheelManager.EnableAllShowItem();
        if (fxList != null)
            list = fxList;
        else
            list = this.slotWinFX;

        this.removeAllChild(list);
    }

    /**刪除所有孩子*/
    public removeAllChild(list: fairygui.GObject[]) {
        // while (list.length > 0) {
        //     let e: fairygui.GObject = list.pop();
        //     e.dispose();
        //     e = null;
        // }

        for (let i = list.length; i >= 0; i--) {
            if (list[i] != null) {
                list[i].parent.removeChild(list[i]);
                delete list[i];
            }
            list[i] = null;
            list.splice(i, 1);
        }
    }

    protected CreateBigWin() {
        this.BigWinBg = this.view.getChild("BigWinBg");
        this.BigWinObj = this.view.getChild("BoneCoin");
        if (this.BigWinObj == null) {
            this.BigWinObj = UIManager.Instance.ShowEffect(SelfData.Instance.CommonPackageName, "BoneCoin", true);
            this.BigWinObj.sortingOrder = ZOrder.ePerformance;
            this.view.addChild(this.BigWinObj);
        }
        if (this.BigWinObj == null)
            return;
        this.BigWinDisplayObjectContainer = <egret.DisplayObjectContainer>this.BigWinObj.asCom.getChild("BoneTarget").displayObject;
        this.BigWinCoinLable = this.BigWinObj.asCom.getChild("coin").asTextField;
        this.BigWinObj.touchable = false;
        this.BigWinObj.visible = false;

        if (this.BigWinBg != null) {
            this.BigWinBg.touchable = false;
            this.BigWinBg.visible = false;
            this.BigWinBg.sortingOrder = ZOrder.ePerformance - 1;
            let bg = this.BigWinObj.asCom.getChild("bg");
            if (bg != null) {
                bg.visible = false;
            }
        }
        else {
            this.BigWinDisplayBg = this.BigWinObj.asCom.getChild("bg");
            this.BigWinDisplayBg.height = SelfData.Instance.UIWindowsSize.y - this.BigWinBgHight;
        }

        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnBigWinSkip, ClientMsg.OnShowResultSkip);
    }

    public OnBigWinSkip() {
        let show = false;
        for (let i = 0; i < UIManager.Instance.BoneList.length - 1; i++) {
            if (UIManager.Instance.BoneList[i] != null)
                show = UIManager.Instance.BoneList[i].visible;
            if (show)
                break;
        }
        if (show)
            UIManager.Instance.SkipBigWin();
    }

    protected async ShowBigWin(money: number) {
        // if (this.IsSkip)
        //     return;
        let type: BigWinType = SelfData.Instance.GetBigWinType(money);
        if (type !== BigWinType.None) {
            //避免得分按鈕卡住
            var e = new ClientEvent(ClientMsg.OnShowResultBegin);
            EventManager.Instance.Send(e);

            this.BigWinObj.visible = true;
            if (this.BigWinBg != null) this.BigWinBg.visible = true;
            await UIManager.Instance.ShowBigWin(this.BigWinDisplayObjectContainer, this.BigWinCoinLable, type, toCoin(money));
            this.BigWinObj.visible = false;
            if (this.BigWinBg != null) this.BigWinBg.visible = false;
        }
    }

    public ShowMessage(message: string, btntext: string, callback: Function, callbackObj: any) {
        let tip = new MessageTips();
        tip.CreateTips();
        tip.ShowTips(message, btntext, callback, callbackObj);
        return tip;
    }

    protected ShowTips(index: number) {
        let tip = new MessageTips();
        tip.CreateTips();
        tip.ShowTips(LocalizationCommonTable.Get(1002), LocalizationCommonTable.Get(index));
        return tip;
    }

    public ShowMarquee(info: string) {
        let marquee = new Marquee();
        marquee.CreateMarquee();
        //marquee.ShowMarquee(info);
        return marquee;
    }

    /**顯示等待繼續運行*/
    async ShowWaitContinueRun() {
        if (!SelfData.Instance.PlaySetting.IsAuto)
            return;
        if (!SelfData.Instance.PlaySetting.AutoSetting.IsUntilBonus)
            return;
        SelfData.Instance.PlaySetting.IsAuto = false;
        SelfData.Instance.PlaySetting.AutoSetting.TotalRound = 0;
        let e = new ClientEvent(ClientMsg.WaitContinueRun);
        EventManager.Instance.Send(e);
        await waitForFlage(() => { return this.continueRun; });
        this.continueRun = false;
    }

    protected onContinueRun() {
        this.continueRun = true;
    }
}

class ShowLadderReplay implements IEventUnit {
    public Type: number = 0;
    public GetEventName(): string {
        return "ShowLadderReplay";
    }

    public GetSendAll(): boolean {
        return true;
    }
    public GetSecondKeyListened(): any {
        return null;
    }

    public constructor() {

    }
}