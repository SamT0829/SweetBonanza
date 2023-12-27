class LobbyRePlay {
	public CloseType: boolean = false;// false : CloseBtn  true : GameBte
	public BaseView: any;
	public ViewParent: fairygui.GComponent;
	public HideLobby_1: fairygui.GGroup;
	public HideLobby_2: fairygui.GGroup;
	public MainRoundID: number;
	public BonusRoundID: number[] = [];
	public RePlayGameType: number;
	public RePlayDateTime: string;
	public RePlayName: string;
	public RePlayTotleWin: string;
	public RePlayXBet: string;
	public RePlayWin: number;
	public RePlayBet: string;
	public RePlayAvatarID: string;
	//橫式
	public View_W: fairygui.GComponent;
	public WaterMark_W: fairygui.GComponent;
	public WaterMark_TextLoader_W: fairygui.GLoader[] = [];
	public WaterMark_RoundID_W: fairygui.GTextField[] = [];
	public WinLoader_W: fairygui.GLoader;
	public BetLoader_W: fairygui.GLoader;
	public WinText_W: fairygui.GTextField;
	public BetText_W: fairygui.GTextField;
	public NameText_W: fairygui.GTextField;
	public TotleWinText_W: fairygui.GTextField;
	public DateText_W: fairygui.GTextField;
	public XBetText_W: fairygui.GTextField;
	public TotleWinLoader: fairygui.GLoader;
	public XBetLoader: fairygui.GLoader;
	public RoundIDText_W: fairygui.GTextField;
	public Avatar_W: fairygui.GComponent;
	public CloseBtn_W: fairygui.GButton;
	public CloseBtn_Loader_W: fairygui.GLoader;
	public GameBte_W: fairygui.GButton;
	public GameBtn_Loader_W: fairygui.GLoader;
	//直式
	public View_V: fairygui.GComponent;
	public WaterMark_V: fairygui.GComponent;
	public WaterMark_TextLoader_V: fairygui.GLoader[] = [];
	public WaterMark_RoundID_V: fairygui.GTextField[] = [];
	public WinLoader_V: fairygui.GLoader;
	public BetLoader_V: fairygui.GLoader;
	public WinText_V: fairygui.GTextField;
	public BetText_V: fairygui.GTextField;
	public NameText_V: fairygui.GTextField;
	public TotleWinText_V: fairygui.GTextField;
	public DateText_V: fairygui.GTextField;
	public XBetText_V: fairygui.GTextField;
	public RoundIDText_V: fairygui.GTextField;
	public Avatar_V: fairygui.GComponent;
	public CloseBtn_V: fairygui.GButton;
	public CloseBtn_Loader_V: fairygui.GLoader;
	public GameBte_V: fairygui.GButton;
	public GameBtn_Loader_V: fairygui.GLoader;

	public Initialize(Parent: fairygui.GComponent, _baseView: any) {
		this.BaseView = _baseView;
		this.HideLobby_1 = Parent.getChild("lobbybar").asCom.getChild("Lobby_1") == null ? null : Parent.getChild("lobbybar").asCom.getChild("Lobby_1").asGroup;
		this.HideLobby_2 = Parent.getChild("lobbybar").asCom.getChild("Lobby_2") == null ? null : Parent.getChild("lobbybar").asCom.getChild("Lobby_2").asGroup;
		this.ViewParent = Parent.getChild("LobbyRePlay").asCom;
		this.ViewParent.sortingOrder = ZOrder.eLobbyBar + 70;
		//橫式
		this.View_W = this.ViewParent.getChild("PlayBack_W").asCom;
		this.WaterMark_W = this.View_W.getChild("watermark").asCom;
		for (let i = 0; i < 20; i++) {
			let _loader = this.WaterMark_W.getChild("l_" + i.toString()).asLoader;
			let _txt = this.WaterMark_W.getChild("t_" + i.toString()).asTextField;
			_loader.url = getFairyUIURL("Slot_000_LobbyLoader", "info_");
			this.WaterMark_TextLoader_W.push(_loader);
			this.WaterMark_RoundID_W.push(_txt);
		}
		this.WinLoader_W = this.View_W.getChild("winloader").asLoader;
		this.BetLoader_W = this.View_W.getChild("betloader").asLoader;
		this.WinText_W = this.View_W.getChild("win").asTextField;
		this.BetText_W = this.View_W.getChild("bet").asTextField;
		this.NameText_W = this.View_W.getChild("nametxt").asTextField;
		this.TotleWinText_W = this.View_W.getChild("totlewintxt").asTextField;
		this.DateText_W = this.View_W.getChild("datetxt").asTextField;
		this.XBetText_W = this.View_W.getChild("xbettxt").asTextField;
		this.TotleWinLoader = this.View_W.getChild("totlewinloader").asLoader;
		this.XBetLoader = this.View_W.getChild("xbetloader").asLoader;
		this.RoundIDText_W = this.View_W.getChild("RoundID").asTextField;
		this.Avatar_W = this.View_W.getChild("Avatar").asCom;
		this.CloseBtn_W = this.View_W.getChild("closeBtn").asButton;
		this.CloseBtn_Loader_W = this.CloseBtn_W.asCom.getChild("close").asLoader;
		this.CloseBtn_W.addClickListener(this.OnCloseBtn, this);
		this.GameBte_W = this.View_W.getChild("gameBtn").asButton;
		this.GameBtn_Loader_W = this.GameBte_W.asCom.getChild("togame").asLoader;
		this.GameBte_W.addClickListener(this.OnGameBtn, this);
		//直式
		this.View_V = this.ViewParent.getChild("PlayBack_V").asCom;
		this.WaterMark_V = this.View_V.getChild("watermark").asCom;
		for (let i = 0; i < 20; i++) {
			let _loader = this.WaterMark_V.getChild("l_" + i.toString()).asLoader;
			let _txt = this.WaterMark_V.getChild("t_" + i.toString()).asTextField;
			_loader.url = getFairyUIURL("Slot_000_LobbyLoader", "info_");
			this.WaterMark_TextLoader_V.push(_loader);
			this.WaterMark_RoundID_V.push(_txt);
		}
		this.WinLoader_V = this.View_V.getChild("winloader").asLoader;
		this.BetLoader_V = this.View_V.getChild("betloader").asLoader;
		this.WinText_V = this.View_V.getChild("win").asTextField;
		this.BetText_V = this.View_V.getChild("bet").asTextField;
		this.NameText_V = this.View_V.getChild("nametxt").asTextField;
		this.TotleWinText_V = this.View_V.getChild("totlewintxt").asTextField;
		this.DateText_V = this.View_V.getChild("datetxt").asTextField;
		this.XBetText_V = this.View_V.getChild("xbettxt").asTextField;
		this.RoundIDText_V = this.View_V.getChild("RoundID").asTextField;
		this.Avatar_V = this.View_V.getChild("Avatar").asCom;
		this.CloseBtn_V = this.View_V.getChild("closeBtn").asButton;
		this.CloseBtn_Loader_V = this.CloseBtn_V.asCom.getChild("close").asLoader;
		this.CloseBtn_V.addClickListener(this.OnCloseBtn, this);
		this.GameBte_V = this.View_V.getChild("gameBtn").asButton;
		this.GameBtn_Loader_V = this.GameBte_V.asCom.getChild("togame").asLoader;
		this.GameBte_V.addClickListener(this.OnGameBtn, this);

		EventManager.Instance.RegisterEventListener(ResizeWindowEvent, this, this.onResize);
		EventManager.Instance.RegisterEventListener(ShowRePlayLobby, this, this.ShowRePlay);
		EventManager.Instance.RegisterEventListener(RePlayUpdateWinMoney, this, this.UpdateWinMoney);
		EventManager.Instance.RegisterEventListener(RePlayBonusRoundID, this, this.UpdateRoundID);
		EventManager.Instance.RegisterEventListener(RePlayClose, this, this.ShowCloseDialog);
		EventManager.Instance.RegisterEventListener(OnRePlayEnd, this, this.RePlayEnd);
		this.SetLoader();
		this.ViewParent.visible = false;
	}

	public SetLoader() {
		this.TotleWinLoader.url = getFairyUIURL("Slot_000_LobbyLoader", "c_win_");
		this.XBetLoader.url = getFairyUIURL("Slot_000_LobbyLoader", "c_bet_");
		this.WinLoader_W.url = getFairyUIURL("Slot_000_LobbyLoader", "UiWin_");
		this.BetLoader_W.url = getFairyUIURL("Slot_000_LobbyLoader", "UiBet_");
		this.CloseBtn_Loader_W.url = getFairyUIURL("Slot_000_LobbyLoader", "close_");
		this.WinLoader_V.url = getFairyUIURL("Slot_000_LobbyLoader", "UiWin_");
		this.BetLoader_V.url = getFairyUIURL("Slot_000_LobbyLoader", "UiBet_");
		this.CloseBtn_Loader_V.url = getFairyUIURL("Slot_000_LobbyLoader", "close_");
		this.GameBtn_Loader_W.url = getFairyUIURL("Slot_000_LobbyLoader", "togame_");
		this.GameBtn_Loader_V.url = getFairyUIURL("Slot_000_LobbyLoader", "togame_");

		this.WinText_W.text = "0.00";
		this.WinText_V.text = "0.00";
	}

	public ShowRePlay(event: ShowRePlayLobby) {
		if (this.HideLobby_1 != null) {
			this.HideLobby_1.visible = false;
			this.HideLobby_2.visible = false;
		}

		this.ViewParent.visible = true;
		this.MainRoundID = event._mainRoundID;
		this.BonusRoundID = event._bonusRoundID;
		this.RePlayGameType = event._gameType;
		let _timelist = event._rePlayDateTime.split(" ");
		_timelist[0].replace(/-/g, "/");
		this.RePlayDateTime = _timelist[0];
		this.RePlayName = event._rePlayName;
		this.RePlayTotleWin = event._rePlayTotleWin;
		this.RePlayXBet = event._rePlayXBet;
		this.RePlayBet = event._rePlayBet;
		this.RePlayAvatarID = event._rePlayAvatarID;
		if (SelfData.Instance.UrlParam_OutShowRePlayID != "") {
			this.View_V.getTransition("t1").play();
			this.View_W.getTransition("t1").play();
		}
		else {
			this.View_V.getTransition("t0").play();
			this.View_W.getTransition("t0").play();
		}
		this.SetData();
	}

	public SetData() {
		this.BetText_W.text = this.RePlayBet;
		updateFontSize(this.BetText_W, 34, 129);
		this.BetText_V.text = this.RePlayBet;
		updateFontSize(this.BetText_V, 34, 125);
		this.NameText_W.text = this.RePlayName;
		updateFontSize(this.NameText_W, 25, 129);
		this.NameText_V.text = this.RePlayName;
		updateFontSize(this.NameText_V, 40, 222);
		this.TotleWinText_W.text = this.RePlayTotleWin;
		updateFontSize(this.TotleWinText_W, 30, 129);
		this.TotleWinText_V.text = this.RePlayTotleWin;
		updateFontSize(this.TotleWinText_V, 45, 222);
		this.DateText_W.text = this.RePlayDateTime;
		updateFontSize(this.DateText_W, 20, 86);
		this.DateText_V.text = this.RePlayDateTime;
		updateFontSize(this.DateText_V, 30, 159);
		this.XBetText_W.text = this.RePlayXBet;
		updateFontSize(this.XBetText_W, 30, 80);
		this.XBetText_V.text = this.RePlayXBet;
		updateFontSize(this.XBetText_V, 45, 159);
		this.RoundIDText_W.text = this.MainRoundID.toString();
		updateFontSize(this.RoundIDText_W, 34, 154);
		for (let i = 0; i < this.WaterMark_RoundID_W.length; i++) {
			this.WaterMark_RoundID_W[i].text = this.MainRoundID.toString();
			updateFontSize(this.WaterMark_RoundID_W[i], 45, 184);
		}
		this.RoundIDText_V.text = this.MainRoundID.toString();
		updateFontSize(this.RoundIDText_V, 33, 138);
		for (let j = 0; j < this.WaterMark_RoundID_V.length; j++) {
			this.WaterMark_RoundID_V[j].text = this.MainRoundID.toString();
			updateFontSize(this.WaterMark_RoundID_V[j], 45, 184);
		}
		if (SelfData.Instance.UrlParam_OutShowRePlayID != "") {
			this.GameBtn_Loader_W.url = getFairyUIURL("Slot_000_LobbyLoader", "UIReplay_");
			this.GameBtn_Loader_V.url = getFairyUIURL("Slot_000_LobbyLoader", "UIReplay_");
		}
		else if (this.RePlayGameType == SelfData.Instance.TargetGameType && SelfData.Instance.UrlParam_RePlayID == "" && SelfData.Instance.AccountData.AllowBuy == true) {
			this.GameBtn_Loader_W.url = getFairyUIURL("Slot_000_LobbyLoader", "tobuy_");
			this.GameBtn_Loader_V.url = getFairyUIURL("Slot_000_LobbyLoader", "tobuy_");
		}
		else {
			this.GameBtn_Loader_W.url = getFairyUIURL("Slot_000_LobbyLoader", "togame_");
			this.GameBtn_Loader_V.url = getFairyUIURL("Slot_000_LobbyLoader", "togame_");
		}
		this.SetAvatar();
	}

	public SetAvatar() {
		let _Avatar_W = <MyGLoader>this.Avatar_W.getChild("Avatar").asLoader;
		let _OuterFrame_W = <MyGLoader>this.Avatar_W.getChild("OuterFrame").asLoader;
		let _Top_W = <MyGLoader>this.Avatar_W.getChild("Top").asLoader;
		let _Bot_W = <MyGLoader>this.Avatar_W.getChild("Bot").asLoader;
		let _Left_W = <MyGLoader>this.Avatar_W.getChild("Left").asLoader;
		let _Right_W = <MyGLoader>this.Avatar_W.getChild("Right").asLoader;
		let _TopLeft_W = <MyGLoader>this.Avatar_W.getChild("TopLeft").asLoader;
		let _TopRight_W = <MyGLoader>this.Avatar_W.getChild("TopRight").asLoader;
		let _Wing_W = <MyGLoader>this.Avatar_W.getChild("Wing").asLoader;
		let _Name_W = <MyGLoader>this.Avatar_W.getChild("Name").asLoader;
		let _GameTitle_W = <MyGLoader>this.Avatar_W.getChild("GameTitle").asLoader;

		let _Avatar_V = <MyGLoader>this.Avatar_V.getChild("Avatar").asLoader;
		let _OuterFrame_V = <MyGLoader>this.Avatar_V.getChild("OuterFrame").asLoader;
		let _Top_V = <MyGLoader>this.Avatar_V.getChild("Top").asLoader;
		let _Bot_V = <MyGLoader>this.Avatar_V.getChild("Bot").asLoader;
		let _Left_V = <MyGLoader>this.Avatar_V.getChild("Left").asLoader;
		let _Right_V = <MyGLoader>this.Avatar_V.getChild("Right").asLoader;
		let _TopLeft_V = <MyGLoader>this.Avatar_V.getChild("TopLeft").asLoader;
		let _TopRight_V = <MyGLoader>this.Avatar_V.getChild("TopRight").asLoader;
		let _Wing_V = <MyGLoader>this.Avatar_V.getChild("Wing").asLoader;
		let _Name_V = <MyGLoader>this.Avatar_V.getChild("Name").asLoader;
		let _GameTitle_V = <MyGLoader>this.Avatar_V.getChild("GameTitle").asLoader;

		let delimiterChars = [",", ";"];
		let AvatarId: string[] = [];
		let avatarId = this.RePlayAvatarID;
		let new_avatarId_1 = avatarId.split(delimiterChars[0]);
		let new_avatarId_2 = avatarId.split(delimiterChars[1]);
		console.log("avatarstring : " + avatarId);
		if (new_avatarId_1.length >= 11)
			AvatarId = new_avatarId_1;
		else if (new_avatarId_2.length >= 11)
			AvatarId = new_avatarId_2;
		for (let i = 0; i < AvatarId.length; i++) {
			console.log("AvatarId : " + SelfData.Instance.ImageResUrl + AvatarId[i] + ".png");
		}
		_Avatar_W.url = SelfData.Instance.ImageResUrl + AvatarId[0] + ".png";
		_OuterFrame_W.url = SelfData.Instance.ImageResUrl + AvatarId[1] + ".png";
		_Top_W.url = SelfData.Instance.ImageResUrl + AvatarId[2] + ".png";
		_Bot_W.url = SelfData.Instance.ImageResUrl + AvatarId[3] + ".png";
		_Left_W.url = SelfData.Instance.ImageResUrl + AvatarId[4] + ".png";
		_Right_W.url = SelfData.Instance.ImageResUrl + AvatarId[5] + ".png";
		_TopLeft_W.url = SelfData.Instance.ImageResUrl + AvatarId[6] + ".png";
		_TopRight_W.url = SelfData.Instance.ImageResUrl + AvatarId[7] + ".png";
		_Wing_W.url = SelfData.Instance.ImageResUrl + AvatarId[8] + ".png";
		_Name_W.url = SelfData.Instance.ImageResUrl + AvatarId[9] + ".png";
		_GameTitle_W.url = SelfData.Instance.ImageResUrl + AvatarId[10] + ".png";

		_Avatar_V.url = SelfData.Instance.ImageResUrl + AvatarId[0] + ".png";
		_OuterFrame_V.url = SelfData.Instance.ImageResUrl + AvatarId[1] + ".png";
		_Top_V.url = SelfData.Instance.ImageResUrl + AvatarId[2] + ".png";
		_Bot_V.url = SelfData.Instance.ImageResUrl + AvatarId[3] + ".png";
		_Left_V.url = SelfData.Instance.ImageResUrl + AvatarId[4] + ".png";
		_Right_V.url = SelfData.Instance.ImageResUrl + AvatarId[5] + ".png";
		_TopLeft_V.url = SelfData.Instance.ImageResUrl + AvatarId[6] + ".png";
		_TopRight_V.url = SelfData.Instance.ImageResUrl + AvatarId[7] + ".png";
		_Wing_V.url = SelfData.Instance.ImageResUrl + AvatarId[8] + ".png";
		_Name_V.url = SelfData.Instance.ImageResUrl + AvatarId[9] + ".png";
		_GameTitle_V.url = SelfData.Instance.ImageResUrl + AvatarId[10] + ".png";
	}

	public HideRePlay() {
		if (this.HideLobby_1 != null) {
			this.HideLobby_1.visible = true;
			this.HideLobby_2.visible = true;
		}
		this.ViewParent.visible = false;
	}

	public async UpdateWinMoney(event: RePlayUpdateWinMoney) {
		let money = event.WinMoney;
		if (money < 0) {
			this.WinText_W.text = "0.00";
			this.WinText_V.text = "0.00";
			updateFontSize(this.WinText_W, 33, 130);
			updateFontSize(this.WinText_V, 33, 130);
			return;
		}
		let lastMoney_W: number = Number(this.WinText_W.text);
		let lastMoney_V: number = Number(this.WinText_V.text);
		await NumberIncrementAni(this.WinText_W, lastMoney_W, toCoin(money), 0.25, 2, () => { }, this, true, 33, 130);
		await NumberIncrementAni(this.WinText_V, lastMoney_V, toCoin(money), 0.25, 2, () => { }, this, true, 33, 130);
	}

	public UpdateRoundID(event: RePlayBonusRoundID): void {
		if (this.BonusRoundID.length > 0) {
			this.RoundIDText_W.text = this.BonusRoundID[event.RoundIndex].toString();
			updateFontSize(this.RoundIDText_W, 34, 154);
			for (let i = 0; i < this.WaterMark_RoundID_W.length; i++) {
				this.WaterMark_RoundID_W[i].text = this.BonusRoundID[event.RoundIndex].toString();
				updateFontSize(this.WaterMark_RoundID_W[i], 45, 184);
			}

			this.RoundIDText_V.text = this.BonusRoundID[event.RoundIndex].toString();
			updateFontSize(this.RoundIDText_V, 33, 138);
			for (let j = 0; j < this.WaterMark_RoundID_V.length; j++) {
				this.WaterMark_RoundID_V[j].text = this.BonusRoundID[event.RoundIndex].toString();
				updateFontSize(this.WaterMark_RoundID_V[j], 45, 184);
			}
		}
	}

	public ShowCloseDialog(event: RePlayClose): void {
		if (SelfData.Instance.UrlParam_OutShowRePlayID != "") {
			ResetRePlay();
		}
		else {
			let IsTargetGame = true;
			if (this.RePlayGameType == SelfData.Instance.TargetGameType && SelfData.Instance.UrlParam_RePlayID == "") {
				IsTargetGame = true;
			}
			else {
				IsTargetGame = false;
			}
			if (this.CloseType) {
				if (IsTargetGame) {
					this.GoThisGame();
				}
				else {
					let dialog = new MessageTips();
					dialog.CreateTips_MWUI();
					dialog.ShowDialog(LocalizationCommonTable.Get(10000016),
						LocalizationCommonTable.Get(10000017),
						LocalizationCommonTable.Get(10000015),
						this.GoBackGame,
						this,
						this.GoThisGame,
						this);
				}
			}
			else {
				if (IsTargetGame) {
					this.GoBuy();
				}
				else {
					this.GoThisGame();
				}
			}
		}
	}

	public OnCloseBtn() {
		if (SelfData.Instance.UrlParam_OutShowRePlayID != "") {

		}
		else {
			SelfData.Instance.SkipRePlay = true;
			this.CloseType = true;
			var eventclose: RePlayClose = new RePlayClose();
			EventManager.Instance.Send(eventclose);
		}
	}

	public OnGameBtn() {
		SelfData.Instance.SkipRePlay = true;
		this.CloseType = false;
		var eventclose: RePlayClose = new RePlayClose();
		EventManager.Instance.Send(eventclose);
	}

	public CloseOK() {
		this.HideRePlay();
	}

	public GoBuy() {
		this.HideRePlay();
		GoToBuyFreeGame(SelfData.Instance.TargetGame);
	}

	public GoBackGame() {
		GoToOtherGame(SelfData.Instance.TargetGame, SelfData.Instance.UrlParam_OriginalGameID);
	}

	public GoThisGame() {
		GoToOtherGame(SelfData.Instance.TargetGame, SelfData.Instance.TargetGame);
	}

	public RePlayEnd(event: OnRePlayEnd) {
		let dialog = new MessageTips();
		dialog.CreateTips_MWUI();
		dialog.ShowTips(
			LocalizationCommonTable.Get(1002),
			LocalizationCommonTable.Get(10000018),
			null,
			this,
		);
	}

	public onResize(event: ResizeWindowEvent): void {
		if (SelfData.Instance.WindowSwitch) {
			if (window.innerWidth >= window.innerHeight) {
				this.ViewParent.getTransition("W").play();
			}
			else {
				this.ViewParent.getTransition("V").play();
			}

		}
	}
}

class ShowRePlayLobby {
	public _mainRoundID: number;
	public _bonusRoundID: number[] = [];
	public _gameType: number;
	public _rePlayDateTime: string;
	public _rePlayName: string;
	public _rePlayTotleWin: string;
	public _rePlayXBet: string;
	public _rePlayBet: string;
	public _rePlayAvatarID: string;

	public GetEventName(): string {
		return "ShowRePlayLobby";
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
