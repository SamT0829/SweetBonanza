class SweetBonanzaLobbyBarView extends MW_LobbyBarView {
    public BuyBonusBtn_W: FairyExButton;
    public BuyBonusBtn_V: FairyExButton;
    protected Initialize() {
        super.Initialize();       
        //RePlay
        this.BuyBonusBtn_W = new FairyExButton(this.View_W.getChild("Btn_BuyFG").asButton);
        let BuyBonusBtn_loader_W: fairygui.GLoader = this.BuyBonusBtn_W.asCom.getChild("fgfeature").asLoader;
        BuyBonusBtn_loader_W.url = getFairyUIURL("Slot_000_LobbyLoader", "fgfeature_");
        this.BuyBonusBtn_W.NormalEnabled = false;
        this.BuyBonusBtn_V = new FairyExButton(this.View_V.getChild("Btn_BuyFG").asButton);
        let BuyBonusBtn_loader_V: fairygui.GLoader = this.BuyBonusBtn_V.asCom.getChild("fgfeature").asLoader;
        BuyBonusBtn_loader_V.url = getFairyUIURL("Slot_000_LobbyLoader", "fgfeature_");
        this.BuyBonusBtn_V.NormalEnabled = false;
        this.BuyBonusBtn_W.addClickListener(this.CheckBuyBonus, this);
        this.BuyBonusBtn_V.addClickListener(this.CheckBuyBonus, this);
        this.BuyBonusBtn_W.visible = true;
        this.BuyBonusBtn_V.visible = true;
        EventManager.Instance.RegisterEventListener(AutoSaveSettingEvent, this, this.OnAutoSaveSettingOK);
     
    }

    //RePlay
    public CheckBuyBonus() {
        var event: ShowLadderReplay = new ShowLadderReplay();
        event.Type = 0;
        EventManager.Instance.Send(event);
    }
    //

    //RePlay
   protected EnableBetButton(enable: boolean) {
        if (enable) {
            this.MinusBetButton.enabled = true; //this.Controller.BetIndex > 0;
            this.PlusBetButton.enabled = true; //this.Controller.BetIndex < this.Controller.BetMaxIndex;
            this.MaxBetButton.enabled = true; //this.Controller.BetIndex < this.Controller.BetMaxIndex;
            //this.FastTurboButton.enabled = true;
            //this.FastTurboButtonSelect.enabled = true;
            this.BetSettingButton.enabled = true;
            this.BuyBonusBtn_W.enabled = true;
            this.BuyBonusBtn_V.enabled = true;
            if (this.BonusCodeButton_W != null)
                this.BonusCodeButton_W.enabled = true;
            if (this.BonusCodeButton_V != null)
                this.BonusCodeButton_V.enabled = true;
        }
        else {
            this.MinusBetButton.enabled = false;
            this.PlusBetButton.enabled = false;
            this.MaxBetButton.enabled = false;
            //this.FastTurboButton.enabled = false;
            //this.FastTurboButtonSelect.enabled = false;
            this.BetSettingButton.enabled = false;
            this.BuyBonusBtn_W.enabled = false;
            this.BuyBonusBtn_V.enabled = false;
            if (this.BonusCodeButton_W != null)
                this.BonusCodeButton_W.enabled = false;
            if (this.BonusCodeButton_V != null)
                this.BonusCodeButton_V.enabled = false;
        }
        if (SelfData.Instance.IsOpenBonusSpin) {
            if (SelfData.Instance.AccountData.BonusCode && SelfData.Instance.AccountData.BonusCode_FreeSpin > 0) {
                this.MinusBetButton.enabled = false;
                this.PlusBetButton.enabled = false;
                this.MaxBetButton.enabled = false;
                //this.FastTurboButton.enabled = false;
                //this.FastTurboButtonSelect.enabled = false;
                this.BetSettingButton.enabled = false;
                this.BuyBonusBtn_W.enabled = false;
                this.BuyBonusBtn_V.enabled = false;
                if (this.BonusCodeButton_W != null)
                    this.BonusCodeButton_W.enabled = false;
                if (this.BonusCodeButton_V != null)
                    this.BonusCodeButton_V.enabled = false;
            }
        }
    }
    //

    protected OnReset() {
        this.ResetPlayButton();
    }

    protected OnPlusBetClick() {
        this.ClosePopupView();
        this.Controller.BetIndex++;
        if (this.Controller.BetIndex > this.Controller.BetMaxIndex)
            this.Controller.BetIndex = 0;
        this.UpdateBetText();
    }

    protected OnMinusBetClick() {
        this.ClosePopupView();
        this.Controller.BetIndex--;
        if (this.Controller.BetIndex < 0)
            this.Controller.BetIndex = this.Controller.BetMaxIndex;
        this.UpdateBetText();
    }

    protected OnAutoSettingOK(setting: AutoPlaySetting) {
        this.EnableBetButton(false);
        this.Controller.OnAutoSetting(setting);
        this.playButtonSwitch(this.StopAutoButton);
        //if (setting.IsFastX3) this.SettingButton.enabled = false;
        this.UpdateAutoCountText();
        SweetBonanzaGameModel.Instance.MainFastX2 = setting.IsFastX2;
        SweetBonanzaGameModel.Instance.MainFastX3 = setting.IsFastX3;
    }

    protected OnAutoSettingCancel(setting: AutoPlaySetting) {
        this.Controller.OnAutoSetting(setting, false);
        SweetBonanzaGameModel.Instance.MainFastX2 = setting.IsFastX2;
        SweetBonanzaGameModel.Instance.MainFastX3 = setting.IsFastX3;
    }

    protected OnStopAutoRun() {
        this.ClosePopupView();
        this.EnableBetButton(false);
        this.Controller.StopAutoRun();

        if (this.IsShowResult)
            this.playButtonSwitch(this.ScoreButton);
        else if (SlotGameController.isPlaying)
            this.playButtonSwitch(this.StopButton);
        else if (!SlotGameController.isPlaying)
            this.playButtonSwitch(this.PlayButton);
    }

    public RedataBet() {
        if (SweetBonanzaGameModel.Instance.LostBetIndex == 0) {
            this.ClosePopupView();
            this.Controller.BetIndex = 0;
            this.UpdateBetText();
            SweetBonanzaGameModel.Instance.LostBetIndex = 2;
        }
    }

    public OnDailyBetChange() {
        this.ClosePopupView();
        SweetBonanzaGameModel.Instance.LostBetIndex = this.Controller.BetIndex;
        this.Controller.BetIndex = 0;
        this.UpdateBetText();
    }

    public OnEndDailyBuy() {
        this.ClosePopupView();
        this.Controller.BetIndex = SweetBonanzaGameModel.Instance.LostBetIndex;
        this.UpdateBetText();
    }

 

    public EnabledStartButton() {
        this.ClosePopupView();
        this.EnableBetButton(false);
        this.PlayButton.enabled = false;
        var event: RunBuyBonus = new RunBuyBonus();
        EventManager.Instance.Send(event);

    }

    public ResetLobbyButton() {
        this.EnableBetButton(true);
        this.ResetPlayButton();
    }

    public OnAutoSaveSettingOK(e: AutoSaveSettingEvent) {
        this.OnAutoSettingOK(e.setting);
    }

    public ShowFastRunDialogByBuyBonus() {
        let dialog = new MessageTips();
        dialog.CreateTips(this.View.asCom);
        dialog.ShowDialog(LocalizationCommonTable.Get(1002), LocalizationCommonTable.Get(1003), LocalizationCommonTable.Get(1009), 
            (<SweetBonanzaLobbyBarController>this.Controller).buyBonusFastStart, this.Controller, 
            (<SweetBonanzaLobbyBarController>this.Controller).buyBonusNormalStart, this.Controller);
    }

    protected OnBonusCodeOpenClick() {
        super.OnBonusCodeOpenClick();
        SweetBonanzaGameView.Instance.DoubleWinRateStateChange(this);
	}

    protected CancleBonusCode() {
        super.CancleBonusCode();
        SweetBonanzaGameView.Instance.DoubleWinRateStateChange(this);
	}

    public UpdateBetText() {
        super.UpdateBetText();
        SweetBonanzaGameView.Instance.UpdateDoubleWinBetText();
    }

}
class ChangeBet implements IEventUnit {
    public GetEventName(): string {
        return "ChangeBet";
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

class SpinBuyBonus implements IEventUnit {
    public GetEventName(): string {
        return "SpinBuyBonus";
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

class ResetBtn_Buy implements IEventUnit {
    public GetEventName(): string {
        return "ResetBtn_Buy";
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

class AutoSaveSettingEvent implements IEventUnit {
    public setting: AutoPlaySetting = SelfData.Instance.PlaySetting.AutoSetting;
    public GetEventName(): string {
        return "AutoSaveSettingEvent";
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

class ReDataBetIndex implements IEventUnit {
    public GetEventName(): string {
        return "ReDataBetIndex";
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

class BuyDailyBonus implements IEventUnit {
    public GetEventName(): string {
        return "BuyDailyBonus";
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

class EndDailyBonus implements IEventUnit {
    public GetEventName(): string {
        return "EndDailyBonus";
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

