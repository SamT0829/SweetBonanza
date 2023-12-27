/**大堂吧台控制器*/
class LobbyBarController {
    public View: ILobbyBarView = null;
    private EventIds: Array<number> = [];
    private EventFuncDic: Dictionary = new Dictionary([]);

    public SlotBetTable: SlotBetTable;
    public BetArray: Array<number> = [];
    public BetRate: number = 5;
    public BetIndex: number = 0;
    public BetMaxIndex: number = 0;

    public constructor(view: ILobbyBarView) {
        this.View = view;
        this.View.Controller = this;
        this.InitBetArray();
        //this.View.UpdateBetText();
        this.RegEvent(ClientMsg.AutoStopRun, this.OnAutoStopRun)
        this.RegEvent(ClientMsg.OnGameResult, this.OnGameResult);
        this.RegEvent(ClientMsg.OnShowResultBegin, this.OnShowResultBegin);
        this.RegEvent(ClientMsg.OnShowResultEnd, this.OnShowResultEnd);
        this.RegEvent(ClientMsg.OnShowMessage, this.OnShowMessage);
        this.RegEvent(ClientMsg.OnShowCenterMoney, this.OnShowCenterMoney);
        this.RegEvent(ClientMsg.OnShowWinMoney, this.OnShowWinMoney);
        this.RegEvent(ClientMsg.OnShowFlyMoney, this.OnShowFlyMoney);
        this.RegEvent(ClientMsg.OnUpdateMoney, this.OnUpdateMoney);
        this.RegEvent(ClientMsg.OnShowRespin, this.OnShowRespin);
        this.RegEvent(ClientMsg.NoMoney, this.OnAccountNoMoney);
        this.RegEvent(ClientMsg.FreeSpin, this.OnFreeSprin);
        this.RegEvent(ClientMsg.OnStopButtonGray, this.OnStopButtonGray);
        this.RegEvent(ClientMsg.WaitContinueRun, this.WaitContinueRun);
        this.RegEvent(ClientMsg.ResetLobbyButton, this.ResetLobbyButton);
        this.RegEvent(ClientMsg.UpdateAutoCount, this.UpdateAutoTimes);
        this.RegEvent(ClientMsg.ShowChangeNmae, this.ShowChangeNameTip);
        this.RegEvent(ClientMsg.UpdateBetText, this.OnUpdateBetText);
    }

    /**初始化投注數組*/
    public InitBetArray() {
        let scale = SelfData.Instance.PlaySetting.CurrencyScale;
        this.SlotBetTable = TableManager.Instance.GetTable(SlotBetTable);
        let betString = this.SlotBetTable.GetValue<string, string>(SelfData.Instance.TargetGame, SlotBetTable.m_Bet);
        let betArray = betString.split(",");
        betArray.forEach(bet => this.BetArray.push(parseInt(bet) * scale));
        this.BetRate = this.SlotBetTable.GetValue<string, number>(SelfData.Instance.TargetGame, SlotBetTable.m_BetRate);
        let defaultBet = this.SlotBetTable.GetValue<string, number>(SelfData.Instance.TargetGame, SlotBetTable.m_DefaultBet) * scale;
        this.BetIndex = this.BetArray.indexOf(defaultBet);
        this.BetMaxIndex = this.BetArray.length - 1;
        SelfData.Instance.PlaySetting.BetRate = this.BetRate;
        SelfData.Instance.PlaySetting.Bet = defaultBet / scale;
        if (SelfData.Instance.AccountData.GameData) {
            defaultBet = SelfData.Instance.AccountData.GameData.BetParam[0] * scale;
            this.BetIndex = this.BetArray.indexOf(defaultBet);
            SelfData.Instance.PlaySetting.Bet = defaultBet / scale;
        }
        SelfData.Instance.PlaySetting.SendPlayGame();
        this.View.UpdateBetText();
        //RePlay
        EventManager.Instance.RegisterEventListener(ChangeRePlayBet, this, this.ChangeRePlayBet);
        //
    }
    //RePlay
    public ChangeRePlayBet() {
        this.BetArray = [];
        let scale = SelfData.Instance.PlaySetting.CurrencyScale;
        let betString = this.SlotBetTable.GetValue<string, string>(SelfData.Instance.TargetGame, SlotBetTable.m_Bet);
        let betArray = betString.split(",");
        betArray.forEach(bet => this.BetArray.push(parseInt(bet) * scale));
    }
    //

    /**註冊事件*/
    protected RegEvent(msg: ClientMsg, func: Function) {
        this.EventIds.push(EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnEventResult, msg));
        this.EventFuncDic.add(msg, func);
    }

    protected UnRegEvent() {
        for (let i = 0, imax = this.EventIds.length; i < imax; ++i) {
            let id = this.EventIds[i];
            EventManager.Instance.UnregisterEventListener(id);
        }
        this.EventIds = [];
    }

    /** 音樂音效開關 */
    public SoundSwitch(enable: boolean) {
        SoundManger.Instance.Enable = enable;
    }


    /** 同步自動玩Setting */
    public OnAutoSetting(setting: AutoPlaySetting, isAuto: boolean = true) {
        SelfData.Instance.PlaySetting.IsAuto = isAuto;
        SelfData.Instance.PlaySetting.AutoSetting = cloneClass(setting);
        //console.log("OnAutoSetting: " + JSON.stringify(SelfData.Instance.PlaySetting));
        if (isAuto)
            this.StartRun();
    }

    /** 點擊後進入特殊遊戲 */
    public OnContinueRun() {
        this.SendEvent(ClientEvent, ClientMsg.OnContinueRun);
    }

    protected startCount = 0;
    protected stopCount = 0;
    protected isShowFastDialog = true;
    protected isRun: boolean = false;
    /** 開始轉輪 */
    public StartRun() {
        if (this.isRun)
            return;
        if (!SelfData.Instance.PlaySetting.IsAuto && this.startCount === this.stopCount && this.startCount === 6 && this.isShowFastDialog && !SelfData.Instance.PlaySetting.IsFastX3) {
            this.View.ShowFastRunDialog();
        }
        else {
            if (this.startCount != this.stopCount) {
                this.startCount = 0;
                this.stopCount = 0;
            }
            if (!SelfData.Instance.PlaySetting.IsFastX3)
                this.startCount++;
            this.isRun = true;
            this.SendEvent(ClientEvent, ClientMsg.StartRun);
        }
    }

    fastStart() {
        SelfData.Instance.PlaySetting.IsFastX3 = true;
        this.startCount++;
        this.isRun = true;
        this.SendEvent(ClientEvent, ClientMsg.StartRun);
    }

    normalStart() {
        this.isShowFastDialog = false;
        this.isRun = true;
        this.SendEvent(ClientEvent, ClientMsg.StartRun);
    }

    public UpdateOnBetRateChange() {
        this.SendEvent(ClientEvent, ClientMsg.OnBetRateChange);

    }

    /** 停止轉輪 */
    public StopRun() {
        this.stopCount++;
        this.SendEvent(ClientEvent, ClientMsg.StopRun);
    }

    /** 停止自動玩 */
    public StopAutoRun() {
        SelfData.Instance.PlaySetting.IsAuto = false;
    }

    /** 顯示結果skip */
    public ShowResultSkip() {
        this.SendEvent(ClientEvent, ClientMsg.OnShowResultSkip);
    }

    /** 顯示賠率表, 另開網頁 */
    public ShowInfoView() {
        let deviceAgent = navigator.userAgent;
        let ios = deviceAgent.toLowerCase().match(/(iphone|ipod|ipad)/);
        if (ios) {
            openInNewTab(SelfData.Instance.InfoUrl +
                "?gameId=" + SelfData.Instance.TargetGameType +
                "&lang=" + getUrlLanguage(SelfData.Instance.Language) +
                "&scale=" + SelfData.Instance.PlaySetting.CurrencyScale);
            //document.location.href = (SelfData.Instance.InfoUrl + "?gameId=" + SelfData.Instance.TargetGameType + "&lang=" + getUrlLanguage(SelfData.Instance.Language));
        } else {
            window.open(SelfData.Instance.InfoUrl +
                "?gameId=" + SelfData.Instance.TargetGameType +
                "&lang=" + getUrlLanguage(SelfData.Instance.Language) +
                "&scale=" + SelfData.Instance.PlaySetting.CurrencyScale);
        }
    }

    /** 顯示歷史記錄, 另開網頁 */
    public ShowHistoryView() {
        let deviceAgent = navigator.userAgent;
        let ios = deviceAgent.toLowerCase().match(/(iphone|ipod|ipad)/);
        if (ios) {
            openInNewTab(SelfData.Instance.HistoryUrl + "?lang=" + getUrlLanguage(SelfData.Instance.Language) + "&userId=" + SelfData.Instance.AccountData.ThirdPartyAccountId + "&utoken=" + SelfData.Instance.AccountData.LoginToken + "&siteId=" + SelfData.Instance.AccountData.SiteId);
            //openInNewTab(SelfData.Instance.HistoryUrl + "?lang=" + getUrlLanguage(SelfData.Instance.Language) + "&showType=2");
        } else {
            window.open(SelfData.Instance.HistoryUrl + "?lang=" + getUrlLanguage(SelfData.Instance.Language) + "&userId=" + SelfData.Instance.AccountData.ThirdPartyAccountId + "&utoken=" + SelfData.Instance.AccountData.LoginToken + "&siteId=" + SelfData.Instance.AccountData.SiteId);
            //window.open(SelfData.Instance.HistoryUrl + "?lang=" + getUrlLanguage(SelfData.Instance.Language) + "&showType=2");
        }
    }
    /** 活動, 另開網頁 */
    public OnEventBtnClick() {
        let deviceAgent = navigator.userAgent;
        let ios = deviceAgent.toLowerCase().match(/(iphone|ipod|ipad)/);
        if (ios) {
            openInNewTab(SelfData.Instance.EventUrl + "?lang=" + getUrlLanguage(SelfData.Instance.Language) + "&userId=" + SelfData.Instance.AccountData.ThirdPartyAccountId + "&utoken=" + SelfData.Instance.AccountData.LoginToken + "&siteId=" + SelfData.Instance.AccountData.SiteId);
            //openInNewTab(SelfData.Instance.HistoryUrl + "?lang=" + getUrlLanguage(SelfData.Instance.Language) + "&showType=2");
        } else {
            window.open(SelfData.Instance.EventUrl + "?lang=" + getUrlLanguage(SelfData.Instance.Language) + "&userId=" + SelfData.Instance.AccountData.ThirdPartyAccountId + "&utoken=" + SelfData.Instance.AccountData.LoginToken + "&siteId=" + SelfData.Instance.AccountData.SiteId);
            //window.open(SelfData.Instance.HistoryUrl + "?lang=" + getUrlLanguage(SelfData.Instance.Language) + "&showType=2");
        }
    }

    protected SendEvent<T extends IEventUnit>(type: { new (secondKey): T; }, secondKey: any) {
        //consoleLog("SendEvent: " + ClientMsg[secondKey]);
        let event: T = new type(secondKey);
        EventManager.Instance.Send(event);
    }

    /** 接收Event事件 */
    protected OnEventResult(event: IEventUnit) {
        this.EventFuncDic[event.GetSecondKeyListened()].apply(this, [event]);
    }

    /** 自動玩停止 */
    public OnAutoStopRun() {
        this.StopAutoRun();
        this.View.OnAutoStopRun();

    }

    /** 更新次數 */
    public UpdateAutoTimes() {
        this.View.UpdateAutoCountText();
    }

    /** 顯示更名提示 */
    public ShowChangeNameTip() {
        this.View.ShowChangeNameTip();
    }

    /** 接收到server回傳值 */
    protected OnGameResult(event: ClientEvent) {
        this.isRun = false;
        this.View.OnGameResult();
    }

    /** Slot開始表演 */
    protected OnShowResultBegin(event: ClientEvent) {
        this.View.OnShowResultBegin();
    }

    /** Slot表演結束 */
    protected OnShowResultEnd(event: ClientEvent) {
        this.isRun = false;
        this.View.OnShowResultEnd();
    }

    /** 顯示Message */
    protected OnShowMessage(event: ClientEvent) {
        let message: string = event.eventData;
        this.View.OnShowMessage(message);
    }

    /** 中間顯示數字 */
    protected OnShowCenterMoney(event: ClientEvent) {
        let money: number = event.eventData[0];
        let time: number = event.eventData[1];
        this.View.OnShowCenterMoney(money, time);
    }

    /** 顯示得分 */
    protected OnShowWinMoney(event: ClientEvent) {
        let money: number = event.eventData;
        this.View.OnShowWinMoney(money);
    }

    protected OnShowFlyMoney(event: ClientEvent) {
        let money: number = event.eventData;
        this.View.OnShowFlyMoney(money);
    }

    /** 更新Money */
    protected OnUpdateMoney(event: ClientEvent) {
        this.View.OnUpdateMoney();
    }

    /** Respin表演中 */
    protected OnShowRespin(event: ClientEvent) {
        this.View.OnShowRespin();
    }

    /** Account沒錢 */
    protected OnAccountNoMoney(event: ClientEvent) {
        this.isRun = false;
        this.View.OnAccountNoMoney();
    }

    /**免費遊戲轉盤*/
    protected OnFreeSprin(event: ClientEvent) {
        this.View.FreeSpin();
    }

    /**停止按鈕灰色*/
    protected OnStopButtonGray(event: ClientEvent) {
        this.View.StopButtonGray();
    }

    protected WaitContinueRun(event: ClientEvent) {
        this.View.WaitContinueRun();
    }

    protected ResetLobbyButton(event: ClientEvent) {
        this.isRun = false;
        this.View.ResetLobbyButton();
    }

    protected OnUpdateBetText(event:ClientEvent)
    {
        this.View.UpdateBetText();
    }
}

class ChangeRePlayBet implements IEventUnit {

    public GetEventName(): string {
        return "ChangeRePlayBet";
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