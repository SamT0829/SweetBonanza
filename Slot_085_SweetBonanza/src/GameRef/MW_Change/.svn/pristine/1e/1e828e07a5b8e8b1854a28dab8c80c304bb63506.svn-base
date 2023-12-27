/**MW大堂遊戲畫面*/
class MW_LobbyBarView extends LobbyBarView {
	public static lobbyPakeageName = "Slot_000_LobbyLoader";
	public static paytableInfoView: PayTableInfoView = null;
	public BetSettingUI: MW_BetSettingView;
	public BetSettingButton: FairyExButton;
	protected static AutoUnlimitRoundSign: fairygui.GObject = null;

	protected CreditCurrency: fairygui.GTextField;

	protected MessageTextWidth: number = 505;
	protected MessageFontSize: number = 30;
	protected BetTextWidth: number = 130;
	protected BetFontSize: number = 12;

	protected MessageTextTweenParent: fairygui.GComponent;
	protected MessageTextTween: fairygui.GTextField;
	protected MessageTextTweenWidth: number = 1200;
	protected MessageFontTweenSize: number = 30;

	public WinMoneyParent: fairygui.GComponent;
	protected PlayButton_W: FairyExButton;
	protected ScoreButton_W: FairyExButton;
	protected StopButton_W: FairyExButton;
	protected StopAutoButton_W: FairyExButton;
	protected FastTurboButton_W: FairyExButton;
	protected FastTurboButtonSelect_W: FairyExButton;
	protected AutoCountText_W: fairygui.GTextField;
	protected BetText_W: fairygui.GTextField;
	protected PlusBetButton_W: FairyExButton;
	protected MinusBetButton_W: FairyExButton;
	protected MaxBetButton_W: FairyExButton;
	protected WinMoneyText_W: fairygui.GTextField;
	public WinMoneyParent_W: fairygui.GComponent;
	protected CreditText_W: fairygui.GTextField;
	protected SettingButton_W: FairyExButton;
	protected SettingButton_Notify_W: fairygui.GImage;
	protected SettingGroup_W: fairygui.GObject;
	protected SoundOnButton_W: FairyExButton;
	protected SoundOffButton_W: FairyExButton;
	protected InfoButton_W: fairygui.GButton;
	protected HistoryButton_W: fairygui.GButton;
	protected BonusCodeButton_W: fairygui.GButton;
	protected EventButton_W: fairygui.GButton;
	protected EventButton_fx_W: fairygui.GImage;
	protected AutoSettingView_W: MW_AutoSettingView;
	public BetSettingUI_W: MW_BetSettingView;
	public BetButton_W: FairyExButton;
	protected ContinueRunButton_W: fairygui.GButton;
	protected static AutoUnlimitRoundSign_W: fairygui.GObject = null;
	protected CreditCurrency_W: fairygui.GTextField;
	public FlyMoneyPoint_W: fairygui.GObject;
	public ChangeNameUI_W: fairygui.GImage;
	public Btn_BonusTimes_W: FairyExButton;
	public BtnCancleBonus_W: FairyExButton;
	public BonusCode_Times_ui_W: fairygui.GTextField;
	public Btn_BonusTimes_Load_W: fairygui.GLoader;
	public BtnCancleBonus_Load_W: fairygui.GLoader;
	public CancleBonus_Close_Ani_W: fairygui.Transition;
	public CancleBonus_Open_Ani_W: fairygui.Transition;
	public BtnSetting_FGSpinInfo_W: fairygui.GTextField;
	// CBET ShowCurrency //
	public HideCurrencyAni_W: fairygui.Transition;
	public ShowCurrencyAni_W: fairygui.Transition;
	public CurrencyText_W: fairygui.GTextField;
	///////////////////////////////////

	protected PlayButton_V: FairyExButton;
	protected ScoreButton_V: FairyExButton;
	protected StopButton_V: FairyExButton;
	protected StopAutoButton_V: FairyExButton;
	protected FastTurboButton_V: FairyExButton;
	protected FastTurboButtonSelect_V: FairyExButton;
	protected AutoCountText_V: fairygui.GTextField;
	protected BetText_V: fairygui.GTextField;
	protected PlusBetButton_V: FairyExButton;
	protected MinusBetButton_V: FairyExButton;
	protected MaxBetButton_V: FairyExButton;
	protected WinMoneyText_V: fairygui.GTextField;
	public WinMoneyParent_V: fairygui.GComponent;
	protected CreditText_V: fairygui.GTextField;
	protected SettingButton_V: FairyExButton;
	protected SettingButton_Notify_V: fairygui.GImage;
	protected SettingGroup_V: fairygui.GObject;
	protected SoundOnButton_V: FairyExButton;
	protected SoundOffButton_V: FairyExButton;
	protected InfoButton_V: fairygui.GButton;
	protected HistoryButton_V: fairygui.GButton;
	protected BonusCodeButton_V: fairygui.GButton;
	protected EventButton_V: fairygui.GButton;
	protected EventButton_fx_V: fairygui.GImage;
	protected AutoSettingView_V: MW_AutoSettingView;
	public BetSettingUI_V: MW_BetSettingView;
	public BetButton_V: FairyExButton;
	public FlyMoneyPoint_V: fairygui.GObject;
	public ChangeNameUI_V: fairygui.GImage;
	public Btn_BonusTimes_V: FairyExButton;
	public BtnCancleBonus_V: FairyExButton;
	public BonusCode_Times_ui_V: fairygui.GTextField;
	public Btn_BonusTimes_Load_V: fairygui.GLoader;
	public BtnCancleBonus_Load_V: fairygui.GLoader;
	public CancleBonus_Close_Ani_V: fairygui.Transition;
	public CancleBonus_Open_Ani_V: fairygui.Transition;
	public BtnSetting_FGSpinInfo_V: fairygui.GTextField;
	// CBET ShowCurrency //
	public HideCurrencyAni_V: fairygui.Transition;
	public ShowCurrencyAni_V: fairygui.Transition;
	public CurrencyText_V: fairygui.GTextField;
	///////////////////////////////////

	public FlyMoneyPoint: fairygui.GObject;
	protected ContinueRunButton_V: fairygui.GButton;
	protected static AutoUnlimitRoundSign_V: fairygui.GObject = null;
	protected CreditCurrency_V: fairygui.GTextField;

	protected RecommendButton: fairygui.GButton;
	protected RecommendButton_W: fairygui.GButton;
	protected RecommendButton_fx_W: fairygui.GImage;
	protected RecommendButton_V: fairygui.GButton;
	protected RecommendButton_fx_V: fairygui.GImage;
	protected RecommendController: Recommend;
	protected RecommendUI: fairygui.GObject;

	public IsOpenFGInfo: boolean = false;

	protected GetResName(): string { return "lobbybar"; }
	public FastTurboButton: FairyExButton;
	public FastTurboButtonSelect: FairyExButton;
	public SoundKey: string = "SoundType";
	public View_W: fairygui.GComponent;
	public View_V: fairygui.GComponent;

	protected Initialize() {
		this.SetMessageSetting(22, 635);
		this.SetBetSetting(30, 130);
		this.View.sortingOrder = ZOrder.eLobbyBar;
		// this.FlyMoneyPoint_W = this.View.asCom.getChild("flymoneypoint_W");
		// this.FlyMoneyPoint_V = this.View.asCom.getChild("flymoneypoint_V");
		this.View_W = this.View.asCom.getChild("LobbyBar_W").asCom;
		this.View_V = this.View.asCom.getChild("LobbyBar_V").asCom;
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////                 橫式UI                     //////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		this.PlayButton_W = new FairyExButton(this.View_W.getChild("PlayButton").asCom.getChild("PlayButton").asButton);
		this.PlayButton_W.NormalEnabled = false;
		this.PlayButton_W.addClickListener(this.OnPlayRun, this);
		this.PlayButton_W.addLongClickListener(this.OpenAutoSettingView, this, 0.5, false);

		this.ScoreButton_W = new FairyExButton(this.View_W.getChild("PlayButton").asCom.getChild("ScoreButton").asButton);
		this.ScoreButton_W.NormalEnabled = false;
		this.ScoreButton_W.addClickListener(this.OnScoreClick, this);

		this.StopButton_W = new FairyExButton(this.View_W.getChild("PlayButton").asCom.getChild("StopButton").asButton);
		this.StopButton_W.NormalEnabled = false;
		this.StopButton_W.addClickListener(this.OnStopRun, this);

		this.StopAutoButton_W = new FairyExButton(this.View_W.getChild("PlayButton").asCom.getChild("StopAutoButton").asButton);
		this.StopAutoButton_W.NormalEnabled = false;
		this.StopAutoButton_W.addClickListener(this.OnStopAutoRun, this);

		this.BetButton_W = new FairyExButton(this.View_W.getChild("Bet").asCom.getChild("BtnBetSetting").asButton);
		this.BetButton_W.NormalEnabled = false;
		this.BetButton_W.addClickListener(this.OpenBetSetting, this);

		this.FastTurboButton_W = new FairyExButton(this.View_W.getChild("BtnTurbo").asButton);
		this.FastTurboButton_W.NormalEnabled = false;
		this.FastTurboButton_W.addClickListener(this.OnTurbo, this);
		this.FastTurboButton_W.asCom.getTransition("open").play();
		this.FastTurboButton_W.visible = true;

		this.FastTurboButtonSelect_W = new FairyExButton(this.View_W.getChild("BtnTurbo_Select").asButton);
		this.FastTurboButtonSelect_W.NormalEnabled = false;
		this.FastTurboButtonSelect_W.addClickListener(this.OffTurbo, this);
		this.FastTurboButtonSelect_W.visible = false;

		this.AutoCountText_W = this.StopAutoButton_W.asCom.getChild("auto_count").asTextField;
		this.AutoCountText_W.text = "0";

		this.BetText_W = this.View_W.getChild("Bet").asCom.getChild("BetText").asTextField;

		// CBET ShowCurrency //
		this.HideCurrencyAni_W = this.View_W.getChild("Bet").asCom.getTransition("HideCurrency");
		this.ShowCurrencyAni_W = this.View_W.getChild("Bet").asCom.getTransition("ShowCurrency");
		this.CurrencyText_W = this.View_W.getChild("Bet").asCom.getChild("CurrencyText").asTextField;
		if (SelfData.Instance.AccountData.CurrencyData.ClientShow == 1) {
			this.ShowCurrencyAni_W.play();
			this.CurrencyText_W.text = "(" + SelfData.Instance.AccountData.CurrencyData.Currency + ")";
			updateFontSize(this.CurrencyText_W, 18, 46);
		}
		else {
			this.HideCurrencyAni_W.play();
		}
		///////////////////////

		this.PlusBetButton_W = new FairyExButton(this.View_W.getChild("Bet").asCom.getChild("BtnAdd").asButton);
		this.PlusBetButton_W.NormalEnabled = false;
		this.PlusBetButton_W.addClickListener(this.OnPlusBetClick, this);

		this.MinusBetButton_W = new FairyExButton(this.View_W.getChild("Bet").asCom.getChild("BtnSubtract").asButton);
		this.MinusBetButton_W.NormalEnabled = false;
		this.MinusBetButton_W.addClickListener(this.OnMinusBetClick, this);

		this.MaxBetButton_W = new FairyExButton(this.View_W.getChild("BtnMaxBet").asButton);
		this.MaxBetButton_W.NormalEnabled = false;
		this.MaxBetButton_W.addClickListener(this.OnMaxBetClick, this);

		this.WinMoneyText_W = this.View_W.getChild("Win").asCom.getChild("WinMoneyText").asTextField;
		this.WinMoneyText_W.text = "0.00";

		this.CreditText_W = this.View_W.getChild("Credit").asCom.getChild("CreditText").asTextField;
		this.CreditText_W.text = "0.00";

		this.SettingButton_W = new FairyExButton(this.View_W.getChild("Btn_Setting").asButton);
		this.SettingButton_W.NormalEnabled = false;
		this.SettingButton_W.addClickListener(this.OnSetting, this);

		let _info = this.SettingButton_W.asCom.getChild("freeinfo");
		if (_info != null) {
			this.BtnSetting_FGSpinInfo_W = _info.asTextField;
		}

		let _settingnotify = this.SettingButton_W.asCom.getChild("isbonus");
		if (_settingnotify != null) {
			this.SettingButton_Notify_W = _settingnotify.asImage;
		}

		this.SettingGroup_W = this.View_W.getChild("SettingMore");
		this.SettingGroup_W.visible = false;

		this.SoundOnButton_W = new FairyExButton(this.SettingGroup_W.asCom.getChild("SoundOn").asButton);
		this.SoundOnButton_W.visible = SoundManger.Instance.Enable;
		this.SoundOnButton_W.NormalEnabled = false;
		this.SoundOnButton_W.addClickListener(() => this.OnSound(true), this);

		this.SoundOffButton_W = new FairyExButton(this.SettingGroup_W.asCom.getChild("SoundOff").asButton);
		this.SoundOffButton_W.visible = !SoundManger.Instance.Enable;
		this.SoundOffButton_W.NormalEnabled = false;
		this.SoundOffButton_W.addClickListener(() => this.OnSound(false), this);

		this.InfoButton_W = this.SettingGroup_W.asCom.getChild("Info").asButton;
		this.InfoButton_W.addClickListener(this.OnInfo, this);

		this.HistoryButton_W = this.SettingGroup_W.asCom.getChild("History").asButton;
		this.HistoryButton_W.addClickListener(this.OnHistoryClick, this);
		if (this.SettingGroup_W.asCom.getChild("IsBonus") != null) {
			this.BonusCodeButton_W = this.SettingGroup_W.asCom.getChild("IsBonus").asButton;
			this.BonusCodeButton_W.addClickListener(this.OnBonusCodeOpenClick, this);
		}

		this.EventButton_W = this.View_W.getChild("EventButton").asButton;
		this.EventButton_W.addClickListener(this.OnEvent, this);
		this.EventButton_fx_W = this.EventButton_W.asCom.getChild("fx").asImage;
		this.EventButton_fx_W.visible = SelfData.Instance.IsOpenActivity;

		this.AutoSettingView_W = new MW_AutoSettingView(this.View.asCom.getChild("LobbyBar_W").asCom);
		this.BetSettingUI_W = new MW_BetSettingView(this.View.asCom.getChild("LobbyBar_W").asCom);

		if (this.View_W.getChild("ContinueRunButton") != null) {
			this.ContinueRunButton_W = this.View_W.getChild("ContinueRunButton").asButton;
			this.ContinueRunButton_W.addClickListener(this.OnContinueRun, this);
			this.ContinueRunButton_W.visible = false;
		}
		MW_LobbyBarView.AutoUnlimitRoundSign_W = this.StopAutoButton_W.asCom.getChild("sign_infinity");
		MW_LobbyBarView.AutoUnlimitRoundSign_W.visible = false;

		this.CreditCurrency_W = this.View_W.getChild("Credit").asCom.getChild("CreditCurrency").asTextField;
		this.CreditCurrency_W.text = "";

		this.ChangeNameUI_W = this.EventButton_W.asCom.getChild("notify").asImage;
		this.ChangeNameUI_W.visible = false;

		let bonustime = this.View_W.getChild("Btn_BonusTimes");
		if (bonustime != null) {
			this.Btn_BonusTimes_W = new FairyExButton(bonustime.asButton);
			this.Btn_BonusTimes_W.touchable = false;
			this.Btn_BonusTimes_Load_W = this.Btn_BonusTimes_W.asCom.getChild("loader").asLoader;
			this.Btn_BonusTimes_Load_W.url = getFairyUIURL("Slot_000_LobbyLoader", "freespin_");
			this.BonusCode_Times_ui_W = this.Btn_BonusTimes_W.asCom.getChild("times").asTextField;
		}
		let canclebonus = this.View_W.getChild("BtnCancleBonus");
		if (canclebonus != null) {
			this.BtnCancleBonus_W = new FairyExButton(canclebonus.asButton);
			this.BtnCancleBonus_W.addClickListener(this.CancleBonusCode, this);
		}
		this.CancleBonus_Close_Ani_W = this.View_W.asCom.getTransition("close");
		this.CancleBonus_Open_Ani_W = this.View_W.asCom.getTransition("open");

		//View_W.sortingOrder = ZOrder.eLobbyBar;
		this.Visible = true;
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////////////                 直式UI                     //////////////////////////////////////
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		this.PlayButton_V = new FairyExButton(this.View_V.getChild("PlayButton").asCom.getChild("PlayButton").asButton);
		this.PlayButton_V.NormalEnabled = false;
		this.PlayButton_V.addClickListener(this.OnPlayRun, this);
		this.PlayButton_V.addLongClickListener(this.OpenAutoSettingView, this, 0.5, false);

		this.ScoreButton_V = new FairyExButton(this.View_V.getChild("PlayButton").asCom.getChild("ScoreButton").asButton);
		this.ScoreButton_V.NormalEnabled = false;
		this.ScoreButton_V.addClickListener(this.OnScoreClick, this);

		this.StopButton_V = new FairyExButton(this.View_V.getChild("PlayButton").asCom.getChild("StopButton").asButton);
		this.StopButton_V.NormalEnabled = false;
		this.StopButton_V.addClickListener(this.OnStopRun, this);

		this.StopAutoButton_V = new FairyExButton(this.View_V.getChild("PlayButton").asCom.getChild("StopAutoButton").asButton);
		this.StopAutoButton_V.NormalEnabled = false;
		this.StopAutoButton_V.addClickListener(this.OnStopAutoRun, this);

		this.BetButton_V = new FairyExButton(this.View_V.getChild("Bet").asCom.getChild("BtnBetSetting").asButton);
		this.BetButton_V.NormalEnabled = false;
		this.BetButton_V.addClickListener(this.OpenBetSetting, this);

		this.FastTurboButton_V = new FairyExButton(this.View_V.getChild("Btn_Turbo").asButton);
		this.FastTurboButton_V.NormalEnabled = false;
		this.FastTurboButton_V.addClickListener(this.OnTurbo, this);
		this.FastTurboButton_V.asCom.getTransition("open").play();
		this.FastTurboButton_V.visible = true;

		this.FastTurboButtonSelect_V = new FairyExButton(this.View_V.getChild("Btn_Turbo_Select").asButton);
		this.FastTurboButtonSelect_V.NormalEnabled = false;
		this.FastTurboButtonSelect_V.addClickListener(this.OffTurbo, this);
		this.FastTurboButtonSelect_V.visible = false;

		this.AutoCountText_V = this.StopAutoButton_V.asCom.getChild("auto_count").asTextField;
		this.AutoCountText_V.text = "0";

		this.BetText_V = this.View_V.getChild("Bet").asCom.getChild("BetText").asTextField;

		// CBET ShowCurrency //
		this.HideCurrencyAni_V = this.View_V.getChild("Bet").asCom.getTransition("HideCurrency");
		this.ShowCurrencyAni_V = this.View_V.getChild("Bet").asCom.getTransition("ShowCurrency");
		this.CurrencyText_V = this.View_V.getChild("Bet").asCom.getChild("CurrencyText").asTextField;
		if(SelfData.Instance.AccountData.CurrencyData.ClientShow == 1){
			this.ShowCurrencyAni_V.play();
			this.CurrencyText_V.text = "(" + SelfData.Instance.AccountData.CurrencyData.Currency  + ")";
			updateFontSize(this.CurrencyText_V, 18, 48);
		}
		else{
			this.HideCurrencyAni_V.play();
		}
		///////////////////////

		this.PlusBetButton_V = new FairyExButton(this.View_V.getChild("BtnAdd").asButton);
		this.PlusBetButton_V.NormalEnabled = false;
		this.PlusBetButton_V.addClickListener(this.OnPlusBetClick, this);

		this.MinusBetButton_V = new FairyExButton(this.View_V.getChild("BtnSubtract").asButton);
		this.MinusBetButton_V.NormalEnabled = false;
		this.MinusBetButton_V.addClickListener(this.OnMinusBetClick, this);

		this.MaxBetButton_V = new FairyExButton(this.View_V.getChild("BtnMaxBet").asButton);
		this.MaxBetButton_V.NormalEnabled = false;
		this.MaxBetButton_V.addClickListener(this.OnMaxBetClick, this);

		this.WinMoneyText_V = this.View_V.getChild("Win").asCom.getChild("WinMoneyText").asTextField;
		this.WinMoneyText_V.text = "0.00";

		this.CreditText_V = this.View_V.getChild("Credit").asCom.getChild("CreditText").asTextField;
		this.CreditText_V.text = "0.00";

		this.SettingButton_V = new FairyExButton(this.View_V.getChild("Btn_Setting").asButton);
		this.SettingButton_V.NormalEnabled = false;
		this.SettingButton_V.addClickListener(this.OnSetting, this);

		let _settingnotify_v = this.SettingButton_V.asCom.getChild("isbonus");
		if (_settingnotify_v != null) {
			this.SettingButton_Notify_V = _settingnotify_v.asImage;
		}

		this.SettingGroup_V = this.View_V.getChild("SettingMore");
		this.SettingGroup_V.visible = false;

		this.SoundOnButton_V = new FairyExButton(this.SettingGroup_V.asCom.getChild("SoundOn").asButton);
		this.SoundOnButton_V.visible = SoundManger.Instance.Enable;
		this.SoundOnButton_V.NormalEnabled = false;
		this.SoundOnButton_V.addClickListener(() => this.OnSound(true), this);

		this.SoundOffButton_V = new FairyExButton(this.SettingGroup_V.asCom.getChild("SoundOff").asButton);
		this.SoundOffButton_V.visible = !SoundManger.Instance.Enable;
		this.SoundOffButton_V.NormalEnabled = false;
		this.SoundOffButton_V.addClickListener(() => this.OnSound(false), this);

		this.InfoButton_V = this.SettingGroup_V.asCom.getChild("Info").asButton;
		this.InfoButton_V.addClickListener(this.OnInfo, this);

		this.HistoryButton_V = this.SettingGroup_V.asCom.getChild("History").asButton;
		this.HistoryButton_V.addClickListener(this.OnHistoryClick, this);

		let _info_v = this.SettingButton_V.asCom.getChild("freeinfo");
		if (_info_v != null) {
			this.BtnSetting_FGSpinInfo_V = _info_v.asTextField;
		}

		if (this.SettingGroup_V.asCom.getChild("IsBonus") != null) {
			this.BonusCodeButton_V = this.SettingGroup_V.asCom.getChild("IsBonus").asButton;
			this.BonusCodeButton_V.addClickListener(this.OnBonusCodeOpenClick, this);
		}

		this.EventButton_V = this.View_V.getChild("EventButton").asButton;
		this.EventButton_V.addClickListener(this.OnEvent, this);
		this.EventButton_fx_V = this.EventButton_V.asCom.getChild("fx").asImage;
		this.EventButton_fx_V.visible = SelfData.Instance.IsOpenActivity;

		this.AutoSettingView_V = new MW_AutoSettingView(this.View.asCom.getChild("LobbyBar_V").asCom);
		this.BetSettingUI_V = new MW_BetSettingView(this.View.asCom.getChild("LobbyBar_V").asCom);

		if (this.View_V.getChild("ContinueRunButton") != null) {
			this.ContinueRunButton_V = this.View_V.getChild("ContinueRunButton").asButton;
			this.ContinueRunButton_V.addClickListener(this.OnContinueRun, this);
			this.ContinueRunButton_V.visible = false;
		}
		MW_LobbyBarView.AutoUnlimitRoundSign_V = this.StopAutoButton_V.asCom.getChild("sign_infinity");
		MW_LobbyBarView.AutoUnlimitRoundSign_V.visible = false;

		this.CreditCurrency_V = this.View_V.getChild("Credit").asCom.getChild("CreditCurrency").asTextField;
		this.CreditCurrency_V.text = "";

		this.ChangeNameUI_V = this.EventButton_V.asCom.getChild("notify").asImage;
		this.ChangeNameUI_V.visible = false;

		let bonustime_v = this.View_V.getChild("Btn_BonusTimes");
		if (bonustime_v != null) {
			this.Btn_BonusTimes_V = new FairyExButton(bonustime_v.asButton);
			this.Btn_BonusTimes_V.touchable = false;
			this.Btn_BonusTimes_Load_V = this.Btn_BonusTimes_V.asCom.getChild("loader").asLoader;
			this.Btn_BonusTimes_Load_V.url = getFairyUIURL("Slot_000_LobbyLoader", "freespin_");
			this.BonusCode_Times_ui_V = this.Btn_BonusTimes_V.asCom.getChild("times").asTextField;
		}
		let canclebonus_v = this.View_V.getChild("BtnCancleBonus");
		if (canclebonus_v != null) {
			this.BtnCancleBonus_V = new FairyExButton(canclebonus_v.asButton);
			this.BtnCancleBonus_V.addClickListener(this.CancleBonusCode, this);
		}
		this.CancleBonus_Close_Ani_V = this.View_V.asCom.getTransition("close");
		this.CancleBonus_Open_Ani_V = this.View_V.asCom.getTransition("open");

		this.Visible = true;
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		this.MessageText = this.View.asCom.getChild("MessageText").asTextField;
		if (this.View.asCom.getChild("MessageText_Tween") != null) {
			this.MessageTextTweenParent = this.View.asCom.getChild("MessageText_Tween").asCom;
			this.MessageTextTween = this.MessageTextTweenParent.getChild("MessageText").asTextField;
		}
		this.CheckUIObj();
		this.InitAutoSettView();
		this.OnShowMessage(LocalizationCommonTable.Get(10000001));
		EventManager.Instance.RegisterEventListener(ResizeWindowEvent, this, this.onResize);
		EventManager.Instance.RegisterEventListener(StageResizeEvent, this, this.WebViewResize);
		EventManager.Instance.RegisterEventListener(EnabledStartButton, this, this.EnabledStartButton);
		EventManager.Instance.RegisterEventListener(EnabledStartButton_RePlay, this, this.EnabledStartButtonRePlay);
		EventManager.Instance.RegisterEventListener(BuyBonusChangeBet, this, this.BuyBonusUpdateBet);

		this.WebViewBg = this.View.parent.asCom.getChild("WebView");
		if (this.WebViewBg != null) {
			this.WebViewBg.visible = false;
			//this.WebViewBg = fairygui.GRoot.inst.addChild(this.WebViewBg);
			this.WebViewBg.sortingOrder = ZOrder.eTip + 100;
			this.WebViewBg.asCom.getChild("close").asButton.addClickListener(this.OnCloseWebView, this);
		}
		this.OnUpdateMoney();

		//this.InfoButton.addClickListener(this.OnInfo, this);
		if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode)
			this.getGameTitle();
		//this.OnTurbo();
		this.SoundKey = "SoundType";
		let _soundtype = localStorageGetItem(this.SoundKey);
		if (_soundtype != null) {
			if (_soundtype == "on")
				this.LocalSoundType(true);
			else if (_soundtype == "off")
				this.LocalSoundType(false);
		}
		else {
			localStorageSetItem(this.SoundKey, "off");
			this.LocalSoundType(false);
		}
		EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnUpdateMoney_ShowOnly, ClientMsg.OnUpdateMoney_ShowOnly);
		EventManager.Instance.RegisterEventListener(ClientEvent, this, this.UpdateBonusCodeTime, ClientMsg.UpdateBonusCodeTime);
		this.SetLoader();
		this.IsOpenFGInfo = false;
		if (this.View_W.asCom.getChild("recommendButton") != null) {
			this.RecommendButton_W = this.View_W.asCom.getChild("recommendButton").asButton;
			this.RecommendButton_W.asCom.getChild("Recommend").asLoader.url = getFairyUIURL("Slot_000_LobbyLoader", "UiRecommend_");
			this.RecommendButton_W.addClickListener(this.OnRecommendClick, this);
			this.RecommendButton_fx_W = this.RecommendButton_W.asCom.getChild("fx").asImage;
			this.RecommendButton_V = this.View_V.asCom.getChild("recommendButton").asButton;
			this.RecommendButton_V.asCom.getChild("Recommend").asLoader.url = getFairyUIURL("Slot_000_LobbyLoader", "UiRecommend_");
			this.RecommendButton_V.addClickListener(this.OnRecommendClick, this);
			this.RecommendButton_fx_V = this.RecommendButton_V.asCom.getChild("fx").asImage;
			//截圖  請替換下面那行
			//if (!SelfData.Instance.IsOpenRecommend) {
			//
			if (SelfData.Instance.IsOpenRecommend) {
				this.RecommendButton_W.visible = true;
				this.RecommendButton_V.visible = true;
				if (SelfData.Instance.IsOpenActivity) {
					this.RecommendButton_fx_W.visible = true;
					this.RecommendButton_fx_V.visible = true;
				}
				else {
					this.RecommendButton_fx_W.visible = false;
					this.RecommendButton_fx_V.visible = false;
				}
			}
			else {
				this.RecommendButton_W.visible = false;
				this.RecommendButton_V.visible = false;
			}
			//this.RecommendButton.visible = false;
		}
	}

	/**設定UI加載器語言*/
	public SetLoader() {
		let URLString = "ui://" + "Slot_000_LobbyLoader_" + LanguageType[SelfData.Instance.Language] + "/";
		//     W     //
		this.PlayButton_W.asCom.getChild("Spin").asLoader.url = URLString + "Spin_" + LanguageType[SelfData.Instance.Language];
		this.ScoreButton_W.asCom.getChild("spinskip").asLoader.url = URLString + "SpinSkip_" + LanguageType[SelfData.Instance.Language];
		this.StopAutoButton_W.asCom.getChild("spinauto").asLoader.url = URLString + "SpinAuto_" + LanguageType[SelfData.Instance.Language];
		this.MaxBetButton_W.asCom.getChild("maxtxt").asLoader.url = URLString + "maxtxt_" + LanguageType[SelfData.Instance.Language];
		this.View_W.getChild("Bet").asCom.getChild("bet").asLoader.url = URLString + "UiBet_" + LanguageType[SelfData.Instance.Language];
		this.View_W.getChild("Credit").asCom.getChild("credit").asLoader.url = URLString + "UiCredit_" + LanguageType[SelfData.Instance.Language];
		this.View_W.getChild("Win").asCom.getChild("win").asLoader.url = URLString + "UiWin_" + LanguageType[SelfData.Instance.Language];
		this.EventButton_W.asCom.getChild("event").asLoader.url = URLString + "UiEvent_" + LanguageType[SelfData.Instance.Language];
		this.ContinueRunButton_W.asCom.getChild("continue").asLoader.url = URLString + "continue_" + LanguageType[SelfData.Instance.Language];
		//     V     //
		this.PlayButton_V.asCom.getChild("Spin").asLoader.url = URLString + "Spin_" + LanguageType[SelfData.Instance.Language];
		this.ScoreButton_V.asCom.getChild("spinskip").asLoader.url = URLString + "SpinSkip_" + LanguageType[SelfData.Instance.Language];
		this.StopAutoButton_V.asCom.getChild("spinauto").asLoader.url = URLString + "SpinAuto_" + LanguageType[SelfData.Instance.Language];
		this.MaxBetButton_V.asCom.getChild("maxtxt").asLoader.url = URLString + "maxtxt_" + LanguageType[SelfData.Instance.Language];
		this.EventButton_V.asCom.getChild("event").asLoader.url = URLString + "UiEvent_" + LanguageType[SelfData.Instance.Language];
		this.ContinueRunButton_V.asCom.getChild("continue").asLoader.url = URLString + "continue_" + LanguageType[SelfData.Instance.Language];
	}

	protected OnPlayRun() {
		this.ClosePopupView();
		this.EnableBetButton(false);
		this.PlayButton.enabled = false;
		this.Controller.StartRun();
		this.BtnCancleBonus_W.enabled = false;
		this.BtnCancleBonus_V.enabled = false;
		this.FastTurboButton_W.enabled = false;
		this.FastTurboButton_V.enabled = false;
		this.FastTurboButtonSelect_W.enabled = false;
		this.FastTurboButtonSelect_V.enabled = false;
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
		this.BtnCancleBonus_W.enabled = true;
		this.BtnCancleBonus_V.enabled = true;
		this.FastTurboButton_W.enabled = true;
		this.FastTurboButton_V.enabled = true;
		this.FastTurboButtonSelect_W.enabled = true;
		this.FastTurboButtonSelect_V.enabled = true;
	}

	public OnTurbo() {
		SoundManger.Instance.PlaySoundSE("button", false);
		this.FastTurboButton.asCom.getTransition("off").play();
		SelfData.Instance.PlaySetting.IsFastX3 = true;
		this.FastTurboButton.visible = false;
		this.FastTurboButtonSelect.visible = true;
	}

	public OffTurbo() {
		SoundManger.Instance.PlaySoundSE("button", false);
		SelfData.Instance.PlaySetting.IsFastX3 = false;
		this.FastTurboButton.visible = true;
		this.FastTurboButtonSelect.visible = false;
	}

	protected OnPlusBetClick() {
		SoundManger.Instance.PlaySoundSE("button", false);
		this.ClosePopupView();
		this.Controller.BetIndex++;
		if (this.Controller.BetIndex > this.Controller.BetMaxIndex)
			this.Controller.BetIndex = 0;
		this.UpdateBetText();
	}

	protected OnMinusBetClick() {
		SoundManger.Instance.PlaySoundSE("button", false);
		this.ClosePopupView();
		this.Controller.BetIndex--;
		if (this.Controller.BetIndex < 0)
			this.Controller.BetIndex = this.Controller.BetMaxIndex;
		this.UpdateBetText();
	}

	protected OnMaxBetClick() {
		SoundManger.Instance.PlaySoundSE("button", false);
		this.ClosePopupView();
		this.Controller.BetIndex = this.Controller.BetMaxIndex;
		this.UpdateBetText();
	}

	protected OnSetting() {
		SoundManger.Instance.PlaySoundSE("button", false, SoundManger.Instance.SEVolume, () => {
			//SoundManger.Instance.StopSoundSE("button");
		});
		//this.ClosePopupView();
		this.SettingGroup_W.visible = !this.SettingGroup_W.visible;
		this.SettingGroup_V.visible = !this.SettingGroup_V.visible;
		if (this.SettingButton_Notify_W != null) {
			if (SelfData.Instance.AccountData.BonusCode && SelfData.Instance.AccountData.BonusCode_FreeSpin > 0) {
				this.SettingButton_Notify_W.visible = !this.SettingGroup.visible;
				this.SettingButton_Notify_V.visible = !this.SettingGroup.visible;
				if (this.SettingGroup_W.visible) {
					this.SettingGroup_W.asCom.getTransition("t1").play();
					this.SettingGroup_V.asCom.getTransition("t1").play();
				}
				else {
					this.SettingGroup_W.asCom.getTransition("t0").play();
					this.SettingGroup_V.asCom.getTransition("t0").play();
				}
			}
		}
		let _tanscl_W = this.SettingButton_W.asCom.getTransition("close");
		let _tanscl_V = this.SettingButton_V.asCom.getTransition("close");
		if (_tanscl_W != null) {
			_tanscl_W.play();
			_tanscl_V.play();
		}
		SavePng("setting");
	}

	public WebViewResize(event: StageResizeEvent): void {
		if (this.WebView != null)
			this.resizeWebView(true);
	}

	public EnabledStartButton() {
		this.ClosePopupView();
		this.EnableBetButton(false);
		this.PlayButton.enabled = false;
		var event: RunBuyBonus = new RunBuyBonus();
		EventManager.Instance.Send(event);

	}

	public EnabledStartButtonRePlay() {
		this.ClosePopupView();
		this.EnableBetButton(false);
		this.PlayButton.enabled = false;

		var event: RePlayBonus = new RePlayBonus();
		EventManager.Instance.Send(event);
	}

	public BuyBonusUpdateBet(event: BuyBonusChangeBet): void {
		this.Controller.BetIndex = event._BetID;
		this.UpdateBetText();
	}

	public async ShowChangeNameTip() {
		this.ChangeNameUI_W.visible = SelfData.Instance.AccountData.ChangeName;
		this.ChangeNameUI_V.visible = SelfData.Instance.AccountData.ChangeName;
	}

	/**調整網頁視圖大小*/
	protected resizeWebView(resize: boolean) {
		let scaleW: number = window.innerWidth / SelfData.Instance.UIWindowsSize.x;
		let scaleH: number = window.innerHeight / SelfData.Instance.UIWindowsSize.y;
		if (SelfData.Instance.WindowSwitch) {
			if (window.innerWidth >= window.innerHeight) {
				this.WebViewBg.rotation = 0;
			}
			else {
				this.WebViewBg.rotation = -90;
			}
			if (scaleW > scaleH) {
				let newW = SelfData.Instance.UIWindowsSize.x * 0.88 + 2;
				let newH = SelfData.Instance.UIWindowsSize.y * 0.8 + 2;
				let newX = (SelfData.Instance.UIWindowsSize.x - newW) / 2;
				let newY = (SelfData.Instance.UIWindowsSize.y - newH) / 2;
				if (window.innerWidth >= window.innerHeight) {
					this.WebViewBg.asCom.getTransition("W").play();
					this.WebView.show(newX, newY, newW, newH, resize);
				}
				else {
					this.WebViewBg.asCom.getTransition("V").play();
					this.WebView.show(((newW / 2) / 2) + newX - 5, -(((newH / 2) / 2)) - newY + 5, newH, newW, resize);
				}

			}
			else {
				let newW = SelfData.Instance.UIWindowsSize.x * 0.88 + 2;
				let newH = SelfData.Instance.UIWindowsSize.y * 0.8 + 2;
				let newX = (SelfData.Instance.UIWindowsSize.x - newW) / 2;
				let newY = (SelfData.Instance.UIWindowsSize.y - newH) / 2;
				if (window.innerWidth >= window.innerHeight) {
					this.WebViewBg.asCom.getTransition("W").play();
					this.WebView.show(newX, newY, newW, newH, resize);
				}
				else {
					this.WebViewBg.asCom.getTransition("V").play();
					this.WebView.show(((newW / 2) / 2) + newX - 5, -(((newH / 2) / 2)) - newY + 5, newH, newW, resize);
				}
			}
		}
		else {
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
	}

	/**調整網頁視圖大小*/
	protected resizeWebView_Aviator(resize: boolean) {
		let scaleW: number = window.innerWidth / SelfData.Instance.UIWindowsSize.x;
		let scaleH: number = window.innerHeight / SelfData.Instance.UIWindowsSize.y;

		if (SelfData.Instance.WindowSwitch) {
			if (window.innerWidth >= window.innerHeight) {
				this.WebViewBg.rotation = 0;
			}
			else {
				this.WebViewBg.rotation = -90;
			}

			if (scaleW > scaleH) {
				let newW = SelfData.Instance.UIWindowsSize.x * 0.88 + 2;
				let newH = SelfData.Instance.UIWindowsSize.y * 0.8 + 2;
				let newX = (SelfData.Instance.UIWindowsSize.x - newW) / 2;
				let newY = (SelfData.Instance.UIWindowsSize.y - newH) / 2;
				if (window.innerWidth >= window.innerHeight) {
					if (window.innerHeight >= SelfData.Instance.MaxWindowsSize.y) {
						let scale: number = SelfData.Instance.MaxWindowsSize.y / window.innerHeight;
						newW = SelfData.Instance.UIWindowsSize.x * scale * 0.88 + 2;
						newH = SelfData.Instance.UIWindowsSize.y * scale * 0.8 + 2;
						newX = (SelfData.Instance.UIWindowsSize.x - newW) / 2;
						newY = (SelfData.Instance.UIWindowsSize.y - newH) / 2 - (SelfData.Instance.UIWindowsSize.y * (1 - scale)) / 2;
					}
					//this.WebView.show(newX, newY, newW, newH, resize);
					this.WebViewBg.asCom.getTransition("W").play();
					this.WebView.show(newX, newY, newW, newH, resize);
				}
				else {
					this.WebViewBg.asCom.getTransition("V").play();
					this.WebView.show(((newW / 2) / 2) + newX - 5, -(((newH / 2) / 2)) - newY + 5, newH, newW, resize);
				}
			}
			else {
				let newW = SelfData.Instance.UIWindowsSize.x * 0.88 + 2;
				let newH = SelfData.Instance.UIWindowsSize.y * 0.8 + 2;
				let newX = (SelfData.Instance.UIWindowsSize.x - newW) / 2;
				let newY = (SelfData.Instance.UIWindowsSize.y - newH) / 2;
				if (window.innerWidth >= window.innerHeight) {
					if (window.innerWidth >= SelfData.Instance.MaxWindowsSize.x) {
						let scale: number = SelfData.Instance.MaxWindowsSize.x / window.innerWidth;
						newW = SelfData.Instance.UIWindowsSize.x * scale * 0.88 + 2;
						newH = SelfData.Instance.UIWindowsSize.y * scale * 0.8 + 2;
						newX = (SelfData.Instance.UIWindowsSize.x - newW) / 2;
						newY = (SelfData.Instance.UIWindowsSize.y - newH) / 2 - (SelfData.Instance.UIWindowsSize.y * (1 - scale)) / 2;
					}
					this.WebViewBg.asCom.getTransition("W").play();
					this.WebView.show(newX, newY, newW, newH, resize);
				}
				else {
					this.WebViewBg.asCom.getTransition("V").play();
					this.WebView.show(((newW / 2) / 2) + newX - 5, -(((newH / 2) / 2)) - newY + 5, newH, newW, resize);
				}
			}
		}
	}

	public UpdateMoney(money: number) {
		this.CreditText.text = toCoinToString(money);
	}

	public onResize(event: ResizeWindowEvent): void {
		// if (!JJBXModel.Instance.CanSwitchUI)
		// 	return;
		this.UpdateMoney(SelfData.Instance.AccountData.Money);
		if (SelfData.Instance.WindowSwitch) {
			if (window.innerWidth >= window.innerHeight) {
				this.View.asCom.getTransition("W").play(); LobbyBarView
				this.CheckButton(true);
				this.AutoCountText_W.text = this.AutoCountText_V.text;
			}
			else {
				this.View.asCom.getTransition("V").play();
				this.CheckButton(false);
				this.AutoCountText_V.text = this.AutoCountText_W.text;
			}
			this.CheckUIObj();
			updateFontSize(this.CreditText_W, 12, 165);
			updateFontSize(this.CreditText_V, 12, 165);
			updateFontSize(this.WinMoneyText_W, 12, 165);
			updateFontSize(this.WinMoneyText_V, 12, 165);
			this.InitAutoSettView();
			if (this.MessageTextTween != null) {
				updateFontSize_MessageText(this.MessageText, this.MessageFontSize, this.MessageTextWidth, this.MessageTextTween,
					this.MessageFontTweenSize, this.MessageTextTweenWidth, this.MessageTextTweenParent, 12);
			}
			else {
				updateFontSize(this.MessageText, this.MessageFontSize, this.MessageTextWidth);
			}
			this.ReBetText();
			this.UpdateFlyMoneyPos();
		}
	}

	public CheckButton(isW: boolean) {
		this.ReButton(isW, this.PlayButton_W, this.PlayButton_V, this.PlayButton);
		this.ReButton(isW, this.ScoreButton_W, this.ScoreButton_V, this.ScoreButton);
		this.ReButton(isW, this.StopButton_W, this.StopButton_V, this.StopButton);
		this.ReButton(isW, this.StopAutoButton_W, this.StopAutoButton_V, this.StopAutoButton);
		this.ReButton(isW, this.BetButton_W, this.BetButton_V, this.BetSettingButton);
		this.ReButton(isW, this.FastTurboButton_W, this.FastTurboButton_V, this.FastTurboButton);
		this.ReButton(isW, this.FastTurboButtonSelect_W, this.FastTurboButtonSelect_V, this.FastTurboButtonSelect);
		this.ReButton(isW, this.PlusBetButton_W, this.PlusBetButton_V, this.PlusBetButton);
		this.ReButton(isW, this.MinusBetButton_W, this.MinusBetButton_V, this.MinusBetButton);
		this.ReButton(isW, this.MaxBetButton_W, this.MaxBetButton_V, this.MaxBetButton);
		this.ReButton(isW, this.StopAutoButton_W, this.StopAutoButton_V, this.StopAutoButton);

		if (isW) {
			this.AutoCountText_W.visible = this.AutoCountText.visible;
			this.AutoCountText_W.text = this.AutoCountText.text;
			if (this.ContinueRunButton_W != null) this.ContinueRunButton_W.visible = this.ContinueRunButton.visible;
			MW_LobbyBarView.AutoUnlimitRoundSign_W.visible = MW_LobbyBarView.AutoUnlimitRoundSign.visible;
		}
		else {
			this.AutoCountText_V.visible = this.AutoCountText.visible;
			this.AutoCountText_V.text = this.AutoCountText.text;
			if (this.ContinueRunButton_V != null) this.ContinueRunButton_V.visible = this.ContinueRunButton.visible;
			MW_LobbyBarView.AutoUnlimitRoundSign_V.visible = MW_LobbyBarView.AutoUnlimitRoundSign.visible;
		}

	}

	public ReButton(isW: boolean, button_W: FairyExButton, button_V: FairyExButton, nowButton: FairyExButton) {
		if (button_W == null || button_V == null)
			return;
		if (!isW) {
			button_V.visible = nowButton.visible;
			button_V.enabled = nowButton.enabled;
		}
		else {
			button_W.visible = nowButton.visible;
			button_W.enabled = nowButton.enabled;
		}
	}

	public ReBetText() {
		SelfData.Instance.PlaySetting.Bet = this.Controller.BetArray[this.Controller.BetIndex] / SelfData.Instance.PlaySetting.CurrencyScale;
		this.BetText.text = toCoinToString_CurrencyBet(SelfData.Instance.PlaySetting.TotleBet * SelfData.Instance.PlaySetting.MultiplyValue);
		this.Controller.UpdateOnBetRateChange();
		updateFontSize(this.BetText, this.BetFontSize, this.BetTextWidth);
	}

	public CheckUIObj() {
		this.PlayButton = window.innerWidth >= window.innerHeight ? this.PlayButton_W : this.PlayButton_V;
		this.ScoreButton = window.innerWidth >= window.innerHeight ? this.ScoreButton_W : this.ScoreButton_V;
		this.StopButton = window.innerWidth >= window.innerHeight ? this.StopButton_W : this.StopButton_V;
		this.StopAutoButton = window.innerWidth >= window.innerHeight ? this.StopAutoButton_W : this.StopAutoButton_V;
		this.FastTurboButton = window.innerWidth >= window.innerHeight ? this.FastTurboButton_W : this.FastTurboButton_V;
		this.FastTurboButtonSelect = window.innerWidth >= window.innerHeight ? this.FastTurboButtonSelect_W : this.FastTurboButtonSelect_V;
		this.BetSettingButton = window.innerWidth >= window.innerHeight ? this.BetButton_W : this.BetButton_V;
		this.AutoCountText = window.innerWidth >= window.innerHeight ? this.AutoCountText_W : this.AutoCountText_V;
		this.BetText = window.innerWidth >= window.innerHeight ? this.BetText_W : this.BetText_V;
		this.PlusBetButton = window.innerWidth >= window.innerHeight ? this.PlusBetButton_W : this.PlusBetButton_V;
		this.MinusBetButton = window.innerWidth >= window.innerHeight ? this.MinusBetButton_W : this.MinusBetButton_V;
		this.MaxBetButton = window.innerWidth >= window.innerHeight ? this.MaxBetButton_W : this.MaxBetButton_V;
		this.WinMoneyParent = window.innerWidth >= window.innerHeight ? this.WinMoneyParent_W : this.WinMoneyParent_V;
		this.WinMoneyText = window.innerWidth >= window.innerHeight ? this.WinMoneyText_W : this.WinMoneyText_V;
		this.CreditText = window.innerWidth >= window.innerHeight ? this.CreditText_W : this.CreditText_V;
		this.SettingButton = window.innerWidth >= window.innerHeight ? this.SettingButton_W : this.SettingButton_V;
		this.SettingGroup = window.innerWidth >= window.innerHeight ? this.SettingGroup_W : this.SettingGroup_V;
		this.SoundOnButton = window.innerWidth >= window.innerHeight ? this.SoundOnButton_W : this.SoundOnButton_V;
		this.SoundOffButton = window.innerWidth >= window.innerHeight ? this.SoundOffButton_W : this.SoundOffButton_V;
		this.InfoButton = window.innerWidth >= window.innerHeight ? this.InfoButton_W : this.InfoButton_V;
		this.HistoryButton = window.innerWidth >= window.innerHeight ? this.HistoryButton_W : this.HistoryButton_V;
		this.EventBtn = window.innerWidth >= window.innerHeight ? this.EventButton_W : this.EventButton_V;
		this.ContinueRunButton = window.innerWidth >= window.innerHeight ? this.ContinueRunButton_W : this.ContinueRunButton_V;
		this.FlyMoneyPoint = window.innerWidth >= window.innerHeight ? this.FlyMoneyPoint_W : this.FlyMoneyPoint_V;

		MW_LobbyBarView.AutoUnlimitRoundSign = window.innerWidth >= window.innerHeight ? MW_LobbyBarView.AutoUnlimitRoundSign_W : MW_LobbyBarView.AutoUnlimitRoundSign_V;
		MW_LobbyBarView.AutoUnlimitRoundSign.visible = false;
		if (this.CreditCurrency != null) {
			this.CreditCurrency = window.innerWidth >= window.innerHeight ? this.CreditCurrency_W : this.CreditCurrency_V;
			this.CreditCurrency.text = "";
		}

	}

	/**初始化自動設置視圖*/
	protected InitAutoSettView() {
		let _view = window.innerWidth >= window.innerHeight ? this.AutoSettingView_W : this.AutoSettingView_V;
		let _bet = window.innerWidth >= window.innerHeight ? this.BetSettingUI_W : this.BetSettingUI_V;
		this.AutoSettingView = _view;
		this.AutoSettingView.Visible = false;
		this.BetSettingUI = _bet;
		this.BetSettingUI.Visible = false;
	}

	protected async OnInfo() {
		SoundManger.Instance.PlaySoundSE("button", false);
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
		SoundManger.Instance.PlaySoundSE("button", false);
		this.ClosePopupView();
		if (this.WebViewBg != null && SelfData.Instance.HistoryUseWebView && !CheckAndroidFireFox()) {
			this.ShowWebView(SelfData.Instance.HistoryUrl + "?lang=" + getUrlLanguage(SelfData.Instance.Language) + "&userId=" + SelfData.Instance.AccountData.ThirdPartyAccountId + "&utoken=" + SelfData.Instance.AccountData.LoginToken + "&siteId=" + SelfData.Instance.AccountData.SiteId);
			//this.ShowWebView("https://www.bjyrda.cn/hs-game/client/?gameId=6015&lang=cn");
		}
		else {
			this.Controller.ShowHistoryView();
		}
	}

	protected OnBonusCodeOpenClick() {
		SoundManger.Instance.PlaySoundSE("button", false);
		//this.ClosePopupView();
		SelfData.Instance.IsOpenBonusSpin = true;
		this.OnOpenBonusCode();
		this.EnableBetButton(false);

		this.OnSetting();
	}

	protected CancleBonusCode() {
		this.ClosePopupView();
		SelfData.Instance.IsOpenBonusSpin = false;
		this.OnCloseBonusCode();
		this.EnableBetButton(true);
	}

	protected OnOpenBonusCode() {
		//this.ClosePopupView();
		SelfData.Instance.LostBetIndex = this.Controller.BetIndex;
		this.Controller.BetIndex = 0;
		this.UpdateBetText_noChage();
		this.CancleBonus_Open_Ani_W.play();
		this.CancleBonus_Open_Ani_V.play();
	}

	protected OnCloseBonusCode() {
		this.ClosePopupView();
		this.Controller.BetIndex = SelfData.Instance.LostBetIndex;
		this.UpdateBetText();
		this.CancleBonus_Close_Ani_W.play();
		this.CancleBonus_Close_Ani_V.play();
	}

	public async WaitCloseInfo() {
		await waitForSeconds(5);
		let _tanscl_W = this.SettingButton_W.asCom.getTransition("close");
		let _tanscl_V = this.SettingButton_V.asCom.getTransition("close");
		if (_tanscl_W != null) {
			_tanscl_W.play();
			_tanscl_V.play();
		}
	}

	public UpdateBonusCodeTime(eventdata) {
		SelfData.Instance.AccountData.BonusCode_FreeSpin = eventdata.eventData;
		if (this.BonusCode_Times_ui_W != null) {
			this.BonusCode_Times_ui_W.text = SelfData.Instance.AccountData.BonusCode_FreeSpin.toString();
			this.BonusCode_Times_ui_V.text = SelfData.Instance.AccountData.BonusCode_FreeSpin.toString();
			updateFontSize(this.BonusCode_Times_ui_W, 30, 112);
			updateFontSize(this.BonusCode_Times_ui_V, 30, 112);
		}
		if (SelfData.Instance.AccountData.BonusCode && SelfData.Instance.AccountData.BonusCode_FreeSpin > 0) {
			if (this.SettingButton_Notify_W != null) {
				if (!this.SettingGroup.visible) {
					this.SettingButton_Notify_W.visible = true;
					this.SettingButton_Notify_V.visible = true;
				}
				this.SettingGroup.asCom.getTransition("t1").play();
			}
			if (this.BtnSetting_FGSpinInfo_W != null) {
				this.BtnSetting_FGSpinInfo_W.text = LocalizationCommonTable.Get(10000022);
				this.BtnSetting_FGSpinInfo_V.text = LocalizationCommonTable.Get(10000022);
				updateFontSize(this.BtnSetting_FGSpinInfo_W, 20, 226);
				updateFontSize(this.BtnSetting_FGSpinInfo_V, 20, 226);
				let _tansop_W = this.SettingButton_W.asCom.getTransition("open");
				let _tansop_V = this.SettingButton_V.asCom.getTransition("open");
				if (_tansop_W != null && !this.IsOpenFGInfo) {
					_tansop_W.play();
					_tansop_V.play();
					this.IsOpenFGInfo = true;
					this.WaitCloseInfo();
				}
			}
		}
		else {
			if (SelfData.Instance.IsOpenBonusSpin) {
				SelfData.Instance.IsOpenBonusSpin = false;
				this.OnCloseBonusCode();
			}
			if (this.SettingButton_Notify_W != null) {
				if (!this.SettingGroup.visible) {
					this.SettingButton_Notify_W.visible = false;
					this.SettingButton_Notify_V.visible = false;
				}
				this.SettingGroup.asCom.getTransition("t0").play();
			}
			if (this.BtnSetting_FGSpinInfo_W != null) {
				this.BtnSetting_FGSpinInfo_W.text = LocalizationCommonTable.Get(10000022);
				this.BtnSetting_FGSpinInfo_V.text = LocalizationCommonTable.Get(10000022);
				updateFontSize(this.BtnSetting_FGSpinInfo_W, 19, 226);
				updateFontSize(this.BtnSetting_FGSpinInfo_V, 19, 226);
				let _tanscl_W = this.SettingButton_W.asCom.getTransition("close");
				let _tanscl_V = this.SettingButton_V.asCom.getTransition("close");
				if (_tanscl_W != null) {
					_tanscl_W.play();
					_tanscl_V.play();
				}
			}
		}
	}

	public UpdateBetText_noChage() {
		SelfData.Instance.PlaySetting.Bet = this.Controller.BetArray[this.Controller.BetIndex] / SelfData.Instance.PlaySetting.CurrencyScale;
		this.BetText.text = toCoinToString_CurrencyBet(SelfData.Instance.PlaySetting.TotleBet * SelfData.Instance.PlaySetting.MultiplyValue);
		this.Controller.UpdateOnBetRateChange();
		this.EnableBetButton(true);
		updateFontSize(this.BetText, 12, 116);
	}

	public LocalSoundType(enable: boolean) {
		this.SoundOnButton.visible = !enable;
		this.SoundOffButton.visible = enable;
		SoundManger.Instance.Enable = enable;
	}

	protected OnSound(enable: boolean) {
		SoundManger.Instance.PlaySoundSE("button", false);
		// this.SoundOnButton.visible = !enable;
		// this.SoundOffButton.visible = enable;
		this.SoundOnButton_W.visible = !enable;
		this.SoundOnButton_V.visible = !enable;
		this.SoundOffButton_W.visible = enable;
		this.SoundOffButton_V.visible = enable;
		this.Controller.SoundSwitch(enable);
		if (enable)
			localStorageSetItem(this.SoundKey, "on");
		else
			localStorageSetItem(this.SoundKey, "off");
	}

	protected OnStopAutoRun() {
		super.OnStopAutoRun();
	}

	public UpdateAutoCountText() {
		if (SelfData.Instance.PlaySetting.AutoSetting.IsUnlimitRound) {
			this.AutoCountText.visible = false;
			MW_LobbyBarView.AutoUnlimitRoundSign.visible = true;
			//this.AutoCountText.text = (SelfData.Instance.PlaySetting.AutoSetting.TotalRound + 1).toString();
		}
		else {
			this.AutoCountText.visible = true;
			MW_LobbyBarView.AutoUnlimitRoundSign.visible = false;

			this.AutoCountText.text = SelfData.Instance.PlaySetting.AutoSetting.TotalRound.toString();
			this.AutoCountText.fontSize = this.AutoCountFontSize;
			while (this.AutoCountText.textWidth > this.AutoCountTextWidth)
				this.AutoCountText.fontSize--;
		}
	}

	async checkResourceLoadOnBackgroundComplete() {
		await waitForFlage(() => { return SelfData.Instance.LoadingViewHide; })
		if (!SelfData.Instance.ResourceLoadOnBackgroundComplete) {
			let message = LocalizationCommonTable.Get(90303);
			let r = [" ▷▷▷", " ▶▷▷", " ▶▶▷", " ▶▶▶"]; // [" ▯▯▯"," ▮▯▯"," ▮▮▯"," ▮▮▮"];// [".","..","..."];//"◐◓◑◒";//["◦", "╱","——","╲","│","╱","—―","╲"];
			let index = 0;
			let tip = UIManager.Instance.ShowTip(message + r[index]);

			while (!SelfData.Instance.ResourceLoadOnBackgroundComplete) {
				await waitForSeconds(0.01);
				index++;
				index = index >= r.length * 50 ? 0 : index;
				tip.SetContent(message + r[Math.floor(index / 50)]);

			}
			tip.CloseTip();
		}
	}

	protected playButtonSwitch(showButton: FairyExButton) {
		super.playButtonSwitch(showButton);
		if (SelfData.Instance.PlaySetting.IsFastX3) {
			this.FastTurboButton.asCom.getTransition("off").play();
			this.FastTurboButton.visible = false;
			this.FastTurboButtonSelect.visible = true;
		}
		else {
			this.FastTurboButton.visible = true;
			this.FastTurboButtonSelect.visible = false;
		}
	}

	protected EnableBetButton(enable: boolean) {
		if (enable) {
			this.MinusBetButton.enabled = true; //this.Controller.BetIndex > 0;
			this.PlusBetButton.enabled = true; //this.Controller.BetIndex < this.Controller.BetMaxIndex;
			this.MaxBetButton.enabled = true; //this.Controller.BetIndex < this.Controller.BetMaxIndex;
			//this.FastTurboButton.enabled = true;
			//this.FastTurboButtonSelect.enabled = true;
			this.BetSettingButton.enabled = true;
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
				if (this.BonusCodeButton_W != null)
					this.BonusCodeButton_W.enabled = false;
				if (this.BonusCodeButton_V != null)
					this.BonusCodeButton_V.enabled = false;
			}
		}
	}

	protected ClosePopupView() {
		//this.SettingGroup_W.visible = false;
		//this.SettingGroup_V.visible = false;
	}

	protected OpenBetSetting() {
		this.BetSettingUI.OpenUI(this.Controller.BetIndex, this.OnBetSettingOK, this.OnBetSettingCancle, this);
	}

	public OnBetSettingOK(index: number) {
		this.Controller.BetIndex = index;
		this.UpdateBetText();
	}

	public OnBetSettingCancle() { }

	public ResetPlayButton() {
		super.ResetPlayButton();
	}

	public OnShowMessage(message: string) {
		this.MessageText.text = message;
		//updateFontSize(this.MessageText, this.MessageFontSize, this.MessageTextWidth);
		if (this.MessageTextTween != null) {
			this.MessageTextTween.text = message;
			updateFontSize_MessageText(this.MessageText, this.MessageFontSize, this.MessageTextWidth, this.MessageTextTween,
				this.MessageFontTweenSize, this.MessageTextTweenWidth, this.MessageTextTweenParent, 12);
		}
		else {
			updateFontSize(this.MessageText, this.MessageFontSize, this.MessageTextWidth);
		}
	}

	public async OnShowWinMoney(money: number) {
		if (money < 0) {
			this.WinMoneyText_W.text = "0.00";
			this.WinMoneyText_V.text = "0.00";
			this.WinMoneyText.text = "0.00";
			updateFontSize(this.WinMoneyText, 12, 165);
			updateFontSize(this.WinMoneyText_W, 12, 165);
			updateFontSize(this.WinMoneyText_V, 12, 165);
			return;
		}
		let lastMoney: number = Number(this.WinMoneyText.text);
		this.WinMoneyText_W.text = toCoinToString(money);
		this.WinMoneyText_V.text = toCoinToString(money);
		var event: RePlayUpdateWinMoney = new RePlayUpdateWinMoney();
		event.WinMoney = money;
		EventManager.Instance.Send(event);
		await NumberIncrementAni(this.WinMoneyText, lastMoney, toCoin(money), 0.25, 2, () => this.IsSkip, this, true, 12, 165);
	}

	public async OnShowFlyMoney(money: number) {
		this.FlyMoney(money);
	}

	public async OnShowCenterMoney(money: number, time: number = 0.25) {
		this.WinMoneyParent.getTransition("t0").play();
	}

	public FlyMoney(money: number) {

	}

	public UpdateFlyMoneyPos() {

	}

	public async OnUpdateMoney_ShowOnly() {
		let lastMoney: number = Number(this.CreditText.text);
		let targetMoney: number = toCoin(SelfData.Instance.AccountData.Money);
		if (lastMoney < targetMoney) {
			await NumberIncrementAni(this.CreditText, lastMoney, targetMoney, 0.25, 2, () => this.IsSkip, this, true, 12, 165);
		}
		else {
			await NumberDecrementAni(this.CreditText, lastMoney, targetMoney, 0.25, 2, () => this.IsSkip, this, true, 12, 165);
		}
		this.CreditText_W.text = this.CreditText.text;
		this.CreditText_V.text = this.CreditText.text;
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
		this.CreditText_W.text = this.CreditText.text;
		this.CreditText_V.text = this.CreditText.text;
		EventManager.Instance.Send(new ClientEvent(ClientMsg.OnUpdateMoneyEnd));
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
		super.OnDestroy();
	}

	public WaitContinueRun() {
		if (this.ContinueRunButton != null) {
			this.ContinueRunButton_W.visible = true;
			this.ContinueRunButton_V.visible = true;
		}
		else
			this.OnContinueRun();
	}

	protected OnContinueRun() {
		if (this.ContinueRunButton != null) {
			this.ContinueRunButton_W.visible = false;
			this.ContinueRunButton_V.visible = false;
		}
		this.Controller.OnContinueRun();
	}


	async getGameTitle() {
		//let gameID = GameType[SelfData.Instance.TargetGame]
		//await waitForFlage(() => { return GameNameTable.GameNameDict.containsKey(gameID) })
		//document.title = "iFa-" + GameNameTable.GameNameDict[gameID];
	}
}

class EnabledStartButton implements IEventUnit {
	public GetEventName(): string {
		return "EnabledStartButton";
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

class EnabledStartButton_RePlay implements IEventUnit {
	public GetEventName(): string {
		return "EnabledStartButton_RePlay";
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

class RunBuyBonus implements IEventUnit {
	public GetEventName(): string {
		return "RunBuyBonus";
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

class RePlayBonus implements IEventUnit {
	public GetEventName(): string {
		return "RePlayBonus";
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