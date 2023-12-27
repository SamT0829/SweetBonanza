class RefreshBalanceController {
    private static _instance: RefreshBalanceController;
    public static get Instance(): RefreshBalanceController {
        if (this._instance == null) {
            this._instance = new RefreshBalanceController();
        }
        return this._instance;
    }

    public RefreshBalanceTip: RefreshBalanceTips = null;
    public WaitMWSingleGetBalance: boolean = false;
    public MWSingleGetBalanceTimer = 0;
    public LastMWSingleGetBalanceTime = 0;
    public NoMoneySyncMWSingleGetBalance: boolean = false;
    public IsPlaying: boolean = false;
    public LastMoney: number = 0;
    public RespondError: boolean = false;

    public constructor() {
        NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerMWSingleGetBalanceRespond, this, this.OnMWSingleGetBalanceRespondBase);
    }

    public SendMWSingleGetBalanceRequest() {
        if (this.RespondError || SelfData.Instance.PlaySetting.ShowError) return;
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode) {
            if (this.NoMoneySyncMWSingleGetBalance) this.UpdateAccountMoney(1234567890);
            let event = new ClientEvent(ClientMsg.NoMoney);
            EventManager.Instance.Send(event);
            return;
        }
        if (SelfData.Instance.AccountData.WalletType != WalletType.MWSingle)
            return;
        this.WaitMWSingleGetBalance = true;
        let msgBuilder = new MessageBuilder();
        NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerMWSingleGetBalanceRequest, msgBuilder);
        //consoleLog("SendMWSingleGetBalanceRequest");
    }

    public OnMWSingleGetBalanceRespondBase(connectionId: number, message: any[]) { 
        consoleLog("OnMWSingleGetBalanceRespond: " + JSON.stringify(message));
        if (this.RespondError || SelfData.Instance.PlaySetting.ShowError) return;
        if (this.NoMoneySyncMWSingleGetBalance)
            this.OnMWSingleGetBalanceRespondByNoMoney(connectionId, message);
        else
            this.OnMWSingleGetBalanceRespond(connectionId, message);
    }

    public OnMWSingleGetBalanceRespondByNoMoney(connectionId: number, message: any[]) {
        let errorCode: ErrorCode = message[MWSingleGetBalanceRespond.ErrorCode];
        let money: number = message[MWSingleGetBalanceRespond.NewBalance];
        if (errorCode != ErrorCode.Success) {
            this.RespondError = true;
            SelfData.Instance.PlaySetting.ShowError = true;
            SelfData.Instance.PlaySetting.IsAuto = false;
            SelfData.Instance.PlaySetting.AutoSetting.TotalRound = 0;
            let tip = new MessageTips();
            tip.CreateTips();
            tip.ShowTips(LocalizationCommonTable.Get(1002), LocalizationCommonTable.Get(99998), () => closeWindow(), this);
            //NetworkHandler.Instance.Disconnect(RemoteConnetionType.Account);
            //NetworkHandler.Instance.Disconnect(RemoteConnetionType.Lobby);
            return;
        }
        this.UpdateAccountMoney(money);
        let event = new ClientEvent(ClientMsg.NoMoney);
        EventManager.Instance.Send(event);
    }

    public UpdateAccountMoney(money: number) {        
        SelfData.Instance.AccountData.Money = money;
        if (this.LastMoney != money) {
            SelfData.Instance.AddRunLog(RunLog.MWSingleGetBalance, money.toString());
            this.LastMoney = money;
        }

        if (!this.IsPlaying || this.NoMoneySyncMWSingleGetBalance) {
            let e: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
            EventManager.Instance.Send(e);
        }

        this.WaitMWSingleGetBalance = false;
        this.NoMoneySyncMWSingleGetBalance = false;
        this.MWSingleGetBalanceTimer = 0;

        if (this.RefreshBalanceTip != null) {
            this.RefreshBalanceTip.CloseTip();
            delete this.RefreshBalanceTip;
            this.RefreshBalanceTip = null;
        }
    }

    public OnMWSingleGetBalanceRespond(connectionId: number, message: any[]) {
        let errorCode: ErrorCode = message[MWSingleGetBalanceRespond.ErrorCode];
        let money: number = message[MWSingleGetBalanceRespond.NewBalance];
        if (errorCode != ErrorCode.Success) {
            this.RespondError = true;
            SelfData.Instance.PlaySetting.ShowError = true;
            SelfData.Instance.PlaySetting.IsAuto = false;
            SelfData.Instance.PlaySetting.AutoSetting.TotalRound = 0;
            let tip = new MessageTips();
            tip.CreateTips();
            tip.ShowTips(LocalizationCommonTable.Get(1002), LocalizationCommonTable.Get(99998), () => closeWindow(), this);
            //NetworkHandler.Instance.Disconnect(RemoteConnetionType.Account);
            //NetworkHandler.Instance.Disconnect(RemoteConnetionType.Lobby);
            return;
        }
        SelfData.Instance.AccountData.Money = money;
        if (this.LastMoney != money) {
            SelfData.Instance.AddRunLog(RunLog.MWSingleGetBalance, money.toString());
            this.LastMoney = money;
        }
        let e: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
        EventManager.Instance.Send(e);
        this.WaitMWSingleGetBalance = false;
        this.MWSingleGetBalanceTimer = 0;
    }
}