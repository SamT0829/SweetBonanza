class SweetBonanzaLobbyBarController extends LobbyBarController {
    public InitBetArray() {
        let scale = SelfData.Instance.PlaySetting.CurrencyScale;
        this.SlotBetTable = TableManager.Instance.GetTable(SlotBetTable);
        let betString = this.SlotBetTable.GetValue<string, string>(SelfData.Instance.TargetGame, SlotBetTable.m_Bet);
        let betArray = betString.split(",");
        betArray.forEach(bet => this.BetArray.push(parseInt(bet) * scale));
        this.BetRate = this.SlotBetTable.GetValue<string, number>(SelfData.Instance.TargetGame, SlotBetTable.m_BetRate);
        let defaultBet = this.SlotBetTable.GetValue<string, number>(SelfData.Instance.TargetGame, SlotBetTable.m_DefaultBet) * scale;
        this.BetIndex = this.BetArray.indexOf(defaultBet);
        SweetBonanzaGameModel.Instance.LostBetIndex = this.BetIndex;
        this.BetMaxIndex = this.BetArray.length - 1;
        SelfData.Instance.PlaySetting.BetRate = this.BetRate;
        SelfData.Instance.PlaySetting.Bet = defaultBet / scale;
        if (SelfData.Instance.AccountData.GameData) {
            defaultBet = SelfData.Instance.AccountData.GameData.BetParam[0] * scale;
            this.BetIndex = this.BetArray.indexOf(defaultBet);
            SweetBonanzaGameModel.Instance.LostBetIndex = this.BetIndex;
            SelfData.Instance.PlaySetting.Bet = defaultBet / scale;
        }
        SelfData.Instance.PlaySetting.SendPlayGame();
        this.View.UpdateBetText();
        //RePlay
        EventManager.Instance.RegisterEventListener(RunBuyBonus, this, this.StartBuyBonusRun);
        EventManager.Instance.RegisterEventListener(RePlayBonus, this, this.StartRePlayBonusRun);
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
    
    public StartRePlayBonusRun() {
        if (this.startCount != this.stopCount) {
            this.startCount = 0;
            this.stopCount = 0;
        }
        if (!SelfData.Instance.PlaySetting.IsFastX3)
            this.startCount++;
        this.isRun = true;
        this.SendEvent(ClientEvent, ClientMsg.RePlayOnStart);
    }
    //

    public StartBuyBonusRun() {
        if (this.isRun)
            return;
        if (!SelfData.Instance.PlaySetting.IsAuto && this.startCount === this.stopCount && this.startCount === 6 && this.isShowFastDialog && !SelfData.Instance.PlaySetting.IsFastX3) {
            (<SweetBonanzaLobbyBarView>this.View).ShowFastRunDialogByBuyBonus();
        }
        else {
            if (this.startCount != this.stopCount) {
                this.startCount = 0;
                this.stopCount = 0;
            }
            if (!SelfData.Instance.PlaySetting.IsFastX3)
                this.startCount++;
            this.isRun = true;
            this.SendEvent(ClientEvent, ClientMsg.BuyBonusOnStart);
        }
    }

    protected ResetLobbyButton(event: ClientEvent) {
        this.isRun = false;
        this.View.ResetLobbyButton();
        var levent: BuyBonusEnable = new BuyBonusEnable();
        EventManager.Instance.Send(levent);
    }

    buyBonusFastStart() {
        SelfData.Instance.PlaySetting.IsFastX3 = true;
        this.startCount++;
        this.isRun = true;
        this.SendEvent(ClientEvent, ClientMsg.BuyBonusOnStart);
    }

    buyBonusNormalStart() {
        this.isShowFastDialog = false;
        this.isRun = true;
        this.SendEvent(ClientEvent, ClientMsg.BuyBonusOnStart);
    }

    /** 停止自動玩 */
    public StopAutoRun() {
        SelfData.Instance.PlaySetting.IsAuto = false;
        var event: StopAutoPlay = new StopAutoPlay();
        EventManager.Instance.Send(event);
    }

    /** 自動玩停止 */
    public OnAutoStopRun() {
        this.StopAutoRun();
        this.View.OnAutoStopRun();
        var event: StopAutoPlay = new StopAutoPlay();
        EventManager.Instance.Send(event);
    }
}

class BuyBonusEnable implements IEventUnit {
    public GetEventName(): string {
        return "BuyBonusEnable";
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

class StopAutoPlay implements IEventUnit {
    public GetEventName(): string {
        return "StopAutoPlay";
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
