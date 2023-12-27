class LobbyBarView extends ILobbyBarView {
    protected PlayButton: FairyExButton;
    protected ScoreButton: FairyExButton;
    protected StopButton: FairyExButton;
    protected StopAutoButton: FairyExButton;

    protected AutoCountText: fairygui.GTextField;
    protected AutoCountTextWidth: number = 58;
    protected AutoCountFontSize: number = 22;

    protected BetText: fairygui.GTextField;
    protected BetTextWidth: number = 90;
    protected BetFontSize: number = 32;
    protected PlusBetButton: FairyExButton;
    protected MinusBetButton: FairyExButton;
    protected MaxBetButton: FairyExButton;

    protected WinMoneyText: fairygui.GTextField;

    protected CenterMoneyText: fairygui.GTextField;
    protected MessageText: fairygui.GTextField;
    protected MessageTextWidth: number = 1066;
    protected MessageFontSize: number = 24;

    protected MessageTextTweenParent: fairygui.GComponent;
    protected MessageTextTween: fairygui.GTextField;
    protected MessageTextTweenWidth: number = 1066;
    protected MessageFontTweenSize: number = 24;

    protected CreditText: fairygui.GTextField;

    protected SettingButton: FairyExButton;
    protected SettingGroup: fairygui.GObject;
    protected SoundOnButton: FairyExButton;
    protected SoundOffButton: FairyExButton;
    protected InfoButton: fairygui.GButton;
    protected HistoryButton: fairygui.GButton;
    protected EventBtn: fairygui.GButton;

    protected AutoPopupView: AutoPopupView;
    protected AutoSettingView: AutoSettingView;

    protected IsSkip: boolean = false;
    protected IsShowResult: boolean = false;

    protected ContinueRunButton: fairygui.GButton;

    protected WebViewSrc: string = "";
    protected WebView: WebView = null;
    protected WebViewBg: fairygui.GObject;

    protected RecommendButton: fairygui.GButton;
    protected RecommendController: Recommend;
    protected RecommendUI: fairygui.GObject;

    public ChangeNameUI: fairygui.GButton;
	public ChangeNameInfo: fairygui.GTextField;

    protected GetResName(): string { return "LobbyBar_" + LanguageType[SelfData.Instance.Language]; }
    protected Initialize() {
        this.PlayButton = new FairyExButton(this.View.asCom.getChild("PlayButton").asButton);
        this.PlayButton.addClickListener(this.OnPlayRun, this);
        this.PlayButton.addLongClickListener(this.OnAutoPopup, this, 0.5, false);

        this.ScoreButton = new FairyExButton(this.View.asCom.getChild("ScoreButton").asButton);
        this.ScoreButton.addClickListener(this.OnScoreClick, this);

        this.StopButton = new FairyExButton(this.View.asCom.getChild("StopButton").asButton);
        this.StopButton.addClickListener(this.OnStopRun, this);

        this.StopAutoButton = new FairyExButton(this.View.asCom.getChild("StopAutoButton").asButton);
        this.StopAutoButton.addClickListener(this.OnStopAutoRun, this);

        this.AutoCountText = this.StopAutoButton.asCom.getChild("auto_count").asTextField;
        this.AutoCountText.text = "0";

        this.BetText = this.View.asCom.getChild("BetText").asTextField;

        this.PlusBetButton = new FairyExButton(this.View.asCom.getChild("PlusBetButton").asButton);
        this.PlusBetButton.addClickListener(this.OnPlusBetClick, this);

        this.MinusBetButton = new FairyExButton(this.View.asCom.getChild("MinusBetButton").asButton);
        this.MinusBetButton.addClickListener(this.OnMinusBetClick, this);

        this.MaxBetButton = new FairyExButton(this.View.asCom.getChild("MaxBetButton").asButton);
        this.MaxBetButton.addClickListener(this.OnMaxBetClick, this);

        this.WinMoneyText = this.View.asCom.getChild("WinMoneyText").asTextField;
        this.WinMoneyText.text = "0.00";

        this.MessageText = this.View.asCom.getChild("MessageText").asTextField;
        this.MessageTextWidth = 1080;
        this.MessageFontSize = 24;
        this.OnShowMessage(LocalizationCommonTable.Get(10000001));

        this.CenterMoneyText = this.View.asCom.getChild("CenterMoneyText").asTextField;
        this.CenterMoneyText.text = "";

        this.CreditText = this.View.asCom.getChild("CreditText").asTextField;
        this.CreditText.text = "0.00";

        this.SettingButton = new FairyExButton(this.View.asCom.getChild("SystemButton").asButton);
        this.SettingButton.addClickListener(this.OnSetting, this);

        this.SettingGroup = this.View.asCom.getChild("SystemGroup");
        this.SettingGroup.visible = false;

        this.SoundOnButton = new FairyExButton(this.View.asCom.getChild("SoundOnButton").asButton);
        this.SoundOnButton.visible = SoundManger.Instance.Enable;
        this.SoundOnButton.addClickListener(() => this.OnSound(true), this);

        this.SoundOffButton = new FairyExButton(this.View.asCom.getChild("SoundOffButton").asButton);
        this.SoundOffButton.visible = !SoundManger.Instance.Enable;
        this.SoundOffButton.addClickListener(() => this.OnSound(false), this);

        //this.InfoButton = new FairyExButton(this.View.asCom.getChild("InfoButton").asButton);
        //this.InfoButton.addClickListener(this.OnInfo, this);

        this.InfoButton = this.View.asCom.getChild("InfoButton").asButton;
        this.InfoButton.addClickListener(this.OnInfo, this);

        this.HistoryButton = this.View.asCom.getChild("HistoryButton").asButton;
        this.HistoryButton.addClickListener(this.OnHistoryClick, this);

        if (this.View.asCom.getChild("RecommendButton") != null) {
            this.RecommendButton = this.View.asCom.getChild("RecommendButton").asButton;
            this.RecommendButton.asCom.getChild("Recommend").asLoader.url = getFairyUIURL("Slot_000_LobbyLoader", "UiRecommend_");
            this.RecommendButton.addClickListener(this.OnRecommendClick, this);

            if (SelfData.Instance.IsOpenRecommend)
                this.RecommendButton.visible = true;
            else
                this.RecommendButton.visible = false;
            //this.RecommendButton.visible = false;
        }

        this.AutoPopupView = new AutoPopupView(this.View);
        this.AutoPopupView.SetCallbackFunc(this.OnAutoRun, this.OnUntilBonus, this.OpenAutoSettingView, this);
        this.AutoPopupView.Visible = false;

        this.InitAutoSettView();

        if (this.View.asCom.getChild("ContinueRunButton") != null) {
            this.ContinueRunButton = this.View.asCom.getChild("ContinueRunButton").asButton;
            this.ContinueRunButton.addClickListener(this.OnContinueRun, this);
            this.ContinueRunButton.visible = false;
        }

        EventManager.Instance.RegisterEventListener(StageResizeEvent, this, this.onResize);


        this.WebViewBg = this.View.asCom.getChild("WebView");
        if (this.WebViewBg != null) {
            this.WebViewBg.visible = false;
            this.WebViewBg = fairygui.GRoot.inst.addChild(this.WebViewBg);
            this.WebViewBg.sortingOrder = ZOrder.eTip + 100;
            this.WebViewBg.asCom.getChild("close").asButton.addClickListener(this.OnCloseWebView, this);
        }

        this.OnUpdateMoney();
        this.View.sortingOrder = ZOrder.eLobbyBar;
        this.Visible = true;
    }

    protected InitAutoSettView() {
        this.AutoSettingView = new AutoSettingView(this.View);
        this.AutoSettingView.Visible = false;
    }

    public OnDestroy() {
        this.UnRegisterEvent();

        if (this.WebViewBg != null) {
            this.WebViewBg.visible = false;
            if (this.WebView != null) {
                this.WebView.destroy();
                delete this.WebView;
                this.WebView = null;
            }
            WebView.DestroyAll();
        }

        this.AutoPopupView.OnDestroy();

        super.OnDestroy();
    }

    protected UnRegisterEvent() {
        //EventManager.Instance.UnregisterEventListener(this.resizeEventID);
    }

    protected playButtonSwitch(showButton: FairyExButton) {
        this.PlayButton.visible = showButton === this.PlayButton;
        this.ScoreButton.visible = showButton === this.ScoreButton;
        this.StopButton.visible = showButton === this.StopButton;
        this.StopAutoButton.visible = showButton === this.StopAutoButton;
    }

    public PlayButtonEnabled(enabled: boolean) {
        this.PlayButton.enabled = enabled;
        this.ScoreButton.enabled = enabled;
        this.StopButton.enabled = enabled;
        this.StopAutoButton.enabled = enabled;
    }

    public ResetPlayButton() {
        this.PlayButton.visible = true;
        this.ScoreButton.visible = false;
        this.StopButton.visible = false;
        this.StopAutoButton.visible = false;
        this.PlayButtonEnabled(true);
    }

    protected OnPlayRun() {

        this.ClosePopupView();
        this.EnableBetButton(false);
        this.PlayButton.enabled = false;
        this.Controller.StartRun();
    }

    public FreeSpin() {
        if (SelfData.Instance.PlaySetting.IsAuto) {
            this.ResetPlayButton();
            this.playButtonSwitch(this.StopButton);
            // if (SelfData.Instance.PlaySetting.IsFastX3)
            //     this.SettingButton.enabled = false;
            return;
        }
        this.ResetPlayButton();
        this.EnableBetButton(false);
        this.PlayButton.enabled = false;
    }

    protected OnScoreClick() {
        if (!this.IsShowResult)
            return;
        this.ClosePopupView();
        this.EnableBetButton(false);
        this.ScoreButton.enabled = false;
        this.IsSkip = true;
        this.Controller.ShowResultSkip();
    }

    public StopButtonGray() {
        this.ResetPlayButton();
        this.playButtonSwitch(this.StopButton);
        this.ClosePopupView();
        this.EnableBetButton(false);
        this.StopButton.enabled = false;
    }

    protected OnStopRun() {
        this.ClosePopupView();
        this.EnableBetButton(false);
        this.Controller.StopRun();
        this.StopButton.enabled = false;
    }

    protected OnStopAutoRun() {
        this.ClosePopupView();
        this.EnableBetButton(false);
        this.Controller.StopAutoRun();

        if (this.IsShowResult)
            this.playButtonSwitch(this.ScoreButton);
        else
            this.playButtonSwitch(this.StopButton);
    }

    protected OnAutoPopup() {
        this.AutoPopupView.Visible = true;
    }

    protected OnAutoRun(times: number) {
        this.ClosePopupView();
        this.EnableBetButton(false);
        let setting: AutoPlaySetting = new AutoPlaySetting();
        setting.TotalRound = times;
        if (times < 0) setting.IsUnlimitRound = true;
        setting.IsFastX2 = SelfData.Instance.PlaySetting.IsFastX2;
        setting.IsFastX3 = SelfData.Instance.PlaySetting.IsFastX3;
        this.OnAutoSettingOK(setting);
        this.UpdateAutoCountText();
    }

    protected OnUntilBonus() {
        this.ClosePopupView();
        this.EnableBetButton(false);
        let setting: AutoPlaySetting = new AutoPlaySetting();
        setting.IsUnlimitRound = true;
        setting.IsUntilBonus = true;
        setting.TotalRound = 0;
        setting.IsFastX2 = SelfData.Instance.PlaySetting.IsFastX2;
        setting.IsFastX3 = SelfData.Instance.PlaySetting.IsFastX3;
        this.OnAutoSettingOK(setting);
        this.UpdateAutoCountText();
    }

    protected ClosePopupView() {
        //this.AutoPopupView.Visible = false;
        this.SettingGroup.visible = false;
    }

    protected OpenAutoSettingView() {
        if(SelfData.Instance.IsOpenBonusSpin)
            return;
        this.ClosePopupView();
        this.AutoSettingView.OpenUI(this.OnAutoSettingOK, this.OnAutoSettingCancel, this);

        SavePng("autoSetting");
    }

    protected OnAutoSettingOK(setting: AutoPlaySetting) {
        this.EnableBetButton(false);
        this.Controller.OnAutoSetting(setting);
        this.playButtonSwitch(this.StopAutoButton);
        //if (setting.IsFastX3) this.SettingButton.enabled = false;
        this.UpdateAutoCountText();
    }

    public UpdateAutoCountText() {
        if (SelfData.Instance.PlaySetting.AutoSetting.IsUnlimitRound)
            this.AutoCountText.text = (SelfData.Instance.PlaySetting.AutoSetting.TotalRound + 1).toString();
        else
            this.AutoCountText.text = SelfData.Instance.PlaySetting.AutoSetting.TotalRound.toString();

        this.AutoCountText.fontSize = this.AutoCountFontSize;
        while (this.AutoCountText.textWidth > this.AutoCountTextWidth)
            this.AutoCountText.fontSize--;
    }

    public ShowChangeNameTip(){

    }

    protected OnAutoSettingCancel(setting: AutoPlaySetting) {
        this.Controller.OnAutoSetting(setting, false);
    }

    protected OnSetting() {
        SoundManger.Instance.PlaySoundSE("button", false, SoundManger.Instance.SEVolume, () => {
            //SoundManger.Instance.StopSoundSE("button");
        });
        //this.ClosePopupView();
        this.SettingGroup.visible = !this.SettingGroup.visible;

        SavePng("setting");
    }

    protected OnRecommendClick() {
        this.ClosePopupView();
        if (this.RecommendUI == null) {
            this.RecommendUI = UIManager.Instance.ShowEffect("Slot_000_ICashCrownCommon", "Recommend", true);
            fairygui.GRoot.inst.addChild(this.RecommendUI);
            this.RecommendUI.sortingOrder = ZOrder.eLobbyBar + 50;
            //this.RecommendParent.addChild(this.RecommendUI);
            if (this.RecommendUI != null) {
                this.RecommendController = new Recommend;
                this.RecommendController.Init(this.RecommendUI.asCom, this.OnEvent, this);
                this.RecommendController.Show();
            }
        }
        else {
            this.RecommendController.Show();
        }
        //this.RecommendParent.visible = true;
    }

    protected OnEvent() {
        this.Controller.OnEventBtnClick();
    }

    protected OnSound(enable: boolean) {
        //this.ClosePopupView();
        this.SoundOnButton.visible = !enable;
        this.SoundOffButton.visible = enable;
        this.Controller.SoundSwitch(enable);
    }

    protected OnInfo() {
        this.ClosePopupView();
        if (this.WebViewBg != null) {
            this.ShowWebView(SelfData.Instance.InfoUrl +
                "?gameId=" + SelfData.Instance.TargetGameType +
                "&lang=" + getUrlLanguage(SelfData.Instance.Language) +
                "&scale=" + SelfData.Instance.PlaySetting.CurrencyScale);
            //this.ShowWebView("https://www.bjyrda.cn/hs-game/client/?gameId=6015&lang=cn");
        }
        else {
            this.Controller.ShowInfoView();
        }
    }

    protected OnHistoryClick() {
        this.ClosePopupView();
        if (this.WebViewBg != null && SelfData.Instance.HistoryUseWebView && !CheckAndroidFireFox()) {
            this.ShowWebView(SelfData.Instance.HistoryUrl + "?lang=" + getUrlLanguage(SelfData.Instance.Language) + "&userId=" + SelfData.Instance.AccountData.ThirdPartyAccountId + "&utoken=" + SelfData.Instance.AccountData.LoginToken + "&siteId=" + SelfData.Instance.AccountData.SiteId);
            //this.ShowWebView("https://www.bjyrda.cn/hs-game/client/?gameId=6015&lang=cn");
        }
        else {
            this.Controller.ShowHistoryView();
        }
    }

    protected EnableBetButton(enable: boolean) {
        if (enable) {
            this.MinusBetButton.enabled = true; //this.Controller.BetIndex > 0;
            this.PlusBetButton.enabled = true; //this.Controller.BetIndex < this.Controller.BetMaxIndex;
            this.MaxBetButton.enabled = true; //this.Controller.BetIndex < this.Controller.BetMaxIndex;
        }
        else {
            this.MinusBetButton.enabled = false;
            this.PlusBetButton.enabled = false;
            this.MaxBetButton.enabled = false;
        }
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

    protected OnMaxBetClick() {
        this.ClosePopupView();
        this.Controller.BetIndex = this.Controller.BetMaxIndex;
        this.UpdateBetText();
    }

    public UpdateBetText() {
        if(!SelfData.Instance.IsRePlay)
            SelfData.Instance.BetIndex = this.Controller.BetIndex;
        SelfData.Instance.PlaySetting.Bet = this.Controller.BetArray[this.Controller.BetIndex] / SelfData.Instance.PlaySetting.CurrencyScale;
        this.BetText.text = toCoinToString_CurrencyBet(SelfData.Instance.PlaySetting.TotleBet * SelfData.Instance.PlaySetting.MultiplyValue);
        this.Controller.UpdateOnBetRateChange();
        this.EnableBetButton(true);
        updateFontSize(this.BetText, this.BetFontSize, this.BetTextWidth);
    }

    protected OnCloseWebView() {
        this.WebViewBg.visible = false;
        if (this.WebView != null) {
            this.WebView.destroy();
            delete this.WebView;
            this.WebView = null;
        }
        WebView.DestroyAll();
        window.focus();
    }

    protected ShowWebView(src: string) {
        this.WebViewSrc = src;
        if (this.WebView == null)
            this.WebView = new WebView(this.WebViewSrc);
        else
            this.WebView.src = this.WebViewSrc;
        this.resizeWebView(false);
        this.WebViewBg.visible = true;
    }

    protected resizeWebView(resize: boolean) {
        let scaleW: number = window.innerWidth / SelfData.Instance.UIWindowsSize.x;
        let scaleH: number = window.innerHeight / SelfData.Instance.UIWindowsSize.y;
        if (scaleW > scaleH) {
            if (window.innerHeight >= SelfData.Instance.MaxWindowsSize.y) {
                let scale: number = SelfData.Instance.MaxWindowsSize.y / window.innerHeight;
                let newW = SelfData.Instance.UIWindowsSize.x * scale * 0.88 + 2;
                let newH = SelfData.Instance.UIWindowsSize.y * scale * 0.8 + 2;
                let newX = (SelfData.Instance.UIWindowsSize.x - newW) / 2;
                let newY = (SelfData.Instance.UIWindowsSize.y - newH) / 2 - (SelfData.Instance.UIWindowsSize.y * (1 - scale)) / 2;
                this.WebView.show(newX, newY, newW, newH, resize);
            }
            else {
                let newW = SelfData.Instance.UIWindowsSize.x * 0.88 + 2;
                let newH = SelfData.Instance.UIWindowsSize.y * 0.8 + 2;
                let newX = (SelfData.Instance.UIWindowsSize.x - newW) / 2;
                let newY = (SelfData.Instance.UIWindowsSize.y - newH) / 2;
                this.WebView.show(newX, newY, newW, newH, resize);
            }
        }
        else {
            if (window.innerWidth >= SelfData.Instance.MaxWindowsSize.x) {
                let scale: number = SelfData.Instance.MaxWindowsSize.x / window.innerWidth;
                let newW = SelfData.Instance.UIWindowsSize.x * scale * 0.88 + 2;
                let newH = SelfData.Instance.UIWindowsSize.y * scale * 0.8 + 2;
                let newX = (SelfData.Instance.UIWindowsSize.x - newW) / 2;
                let newY = (SelfData.Instance.UIWindowsSize.y - newH) / 2 - (SelfData.Instance.UIWindowsSize.y * (1 - scale)) / 2;
                this.WebView.show(newX, newY, newW, newH, resize);
            }
            else {
                let newW = SelfData.Instance.UIWindowsSize.x * 0.88 + 2;
                let newH = SelfData.Instance.UIWindowsSize.y * 0.8 + 2;
                let newX = (SelfData.Instance.UIWindowsSize.x - newW) / 2;
                let newY = (SelfData.Instance.UIWindowsSize.y - newH) / 2;
                this.WebView.show(newX, newY, newW, newH, resize);
            }
        }
    }

    protected onResize(event: StageResizeEvent): void {
        if (this.WebView != null)
            this.resizeWebView(true);
    }

    public OnGameResult() {
        this.ClosePopupView();
        if (SelfData.Instance.PlaySetting.IsAuto) {
            return;
        }
        this.ResetPlayButton();
        this.playButtonSwitch(this.StopButton);
    }

    public OnShowResultBegin() {
        this.IsShowResult = true;
        this.ResetPlayButton();
        this.playButtonSwitch(this.ScoreButton);
    }

    public OnShowResultEnd() {
        this.IsSkip = false;
        this.IsShowResult = false;

        //當遊戲贏時Lobby MessageText = false
        if (SelfData.Instance.PlaySetting.IsWinEffect == false) {
            this.OnShowMessage(LocalizationCommonTable.Get(10000001));
        }
        //this.OnShowMessage(LocalizationCommonTable.Get(10000001));

        if (SelfData.Instance.PlaySetting.IsAuto) {
            this.UpdateAutoCountText();
            this.ResetPlayButton();
            this.playButtonSwitch(this.StopAutoButton);
            //if (SelfData.Instance.PlaySetting.IsFastX3)
            //    this.SettingButton.enabled = false;
            return;
        }

        this.SettingButton.enabled = true;
        this.EnableBetButton(true);
        this.ResetPlayButton();
    }

    public OnAutoStopRun() {
        this.ResetPlayButton();
    }

    public OnShowMessage(message: string) {
        this.MessageText.text = message;

        updateFontSize(this.MessageText, this.MessageFontSize, this.MessageTextWidth);
    }

    public async OnShowCenterMoney(money: number, time: number = 0.25) {
        await NumberIncrementAni(this.CenterMoneyText, 0, toCoin(money), time, 2, () => this.IsSkip, this);
        await waitForSeconds(0.5);
        this.CenterMoneyText.text = "";
    }

    public async OnShowWinMoney(money: number) {
        if (money < 0) {
            this.WinMoneyText.text = "0.00";
            updateFontSize(this.WinMoneyText, 12, 165);
            return;
        }
        let lastMoney: number = Number(this.WinMoneyText.text);
        await NumberIncrementAni(this.WinMoneyText, lastMoney, toCoin(money), 0.25, 2, () => this.IsSkip, this, true, 12, 165);
    }

    public async OnShowFlyMoney(money: number) {

    }

    public async OnUpdateMoney() {
        let lastMoney: number = Number(this.CreditText.text);
        let targetMoney: number = toCoin(SelfData.Instance.AccountData.Money);
        if (lastMoney < targetMoney) {
            await NumberIncrementAni(this.CreditText, lastMoney, targetMoney, 0.25, 2, () => this.IsSkip, this, true, 12, 165);
        }
        else {
            await NumberDecrementAni(this.CreditText, lastMoney, targetMoney, 0.25, 2, () => this.IsSkip, this, true, 12, 165);
        }
        EventManager.Instance.Send(new ClientEvent(ClientMsg.OnUpdateMoneyEnd));
    }

    public OnShowRespin() {
        this.StopButton.enabled = false;
    }

    public OnAccountNoMoney() {
        this.EnableBetButton(true);
        this.ResetPlayButton();
    }

    public ResetLobbyButton() {
        this.EnableBetButton(true);
        this.ResetPlayButton();
    }

    public ShowFastRunDialog() {
        let dialog = new MessageTips();
        dialog.CreateTips();
        dialog.ShowDialog(LocalizationCommonTable.Get(1002), LocalizationCommonTable.Get(1003), LocalizationCommonTable.Get(1009), this.Controller.fastStart, this.Controller, this.Controller.normalStart, this.Controller);
    }

    public WaitContinueRun() {
        if (this.ContinueRunButton != null)
            this.ContinueRunButton.visible = true;
        else
            this.OnContinueRun();
    }

    protected OnContinueRun() {
        if (this.ContinueRunButton != null)
            this.ContinueRunButton.visible = false;
        this.Controller.OnContinueRun();
    }

    public SetMessageSetting(FontSize?: number, TextWidth?: number) {
        if (FontSize != null) this.MessageFontSize = FontSize;
        if (TextWidth != null) this.MessageTextWidth = TextWidth;
    }

    public SetBetSetting(FontSize?: number, TextWidth?: number) {
        if (FontSize != null) this.BetFontSize = FontSize;
        if (TextWidth != null) this.BetTextWidth = TextWidth;
    }
}

class RePlayUpdateWinMoney{
    public WinMoney: number;
    public GetEventName(): string {
        return "RePlayUpdateWinMoney";
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