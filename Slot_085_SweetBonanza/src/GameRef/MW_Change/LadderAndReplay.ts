class LadderAndReplay {
	public RePlayLoading: fairygui.GComponent;
	//共用
	public SlotBetTable: SlotBetTable;
	public BetArray: Array<number> = [];
	public BetRate: number = 5;
	public BetIndex: number = 0;
	public BetMaxIndex: number = 0;

	public FGRank: fairygui.GComponent;
	public _title: fairygui.GLoader;
	public SearchParent: fairygui.GComponent;
	public BuyParent: fairygui.GComponent;
	public Btn_Close: fairygui.GButton;
	public Rank_Only: fairygui.GComponent;
	public RankOnly_ranktxt_on: fairygui.GLoader;
	public Rank_Buy: fairygui.GComponent;
	public RankBuy_ranktxt_off: fairygui.GLoader;
	public RankBuy_buytxt_off: fairygui.GLoader;
	public RankBuy_rankpage: fairygui.GComponent;
	public RankBuy_buypage: fairygui.GComponent;
	public RankBuy_ranktxt_on: fairygui.GLoader;
	public RankBuy_buytxt_on: fairygui.GLoader;
	public RankBuy_btnbuy: fairygui.GButton;
	public RankBuy_btnrank: fairygui.GButton;
	private RankOpen: boolean = false;
	private BuyOpen: boolean = false;
	//排行
	public ListParent_Rank: fairygui.GComponent;
	public ListParent_RankScrollPane: fairygui.ScrollPane;
	public RankSetting: fairygui.GComponent;
	public SearchSetting: fairygui.GComponent;
	public SearchParent_Rank: fairygui.GLoader;
	public SearchParent_Name: fairygui.GLoader;
	public SearchParent_Bet: fairygui.GLoader;
	public SearchParent_Win: fairygui.GLoader;
	public SearchParent_Copy: fairygui.GLoader;
	public SearchParent_Play: fairygui.GLoader;

	public RankSetting_game: fairygui.GLoader;
	public RankSetting_player: fairygui.GLoader;
	public RankSetting_time: fairygui.GLoader;
	public RankSetting_win: fairygui.GLoader;
	public RankSetting_Btn_Setting_on: fairygui.GButton;
	public RankSetting_Btn_Setting_off: fairygui.GButton;
	public RankSetting_Btn_Setting_on_UI: fairygui.GComponent;
	public RankSetting_Btn_Setting_off_UI: fairygui.GComponent;

	public SearchSetting_current_off_btn: fairygui.GButton;
	public SearchSetting_allgame_off_btn: fairygui.GButton;
	public SearchSetting_personal_off_btn: fairygui.GButton;
	public SearchSetting_player_off_btn: fairygui.GButton;
	public SearchSetting_day_off_btn: fairygui.GButton;
	public SearchSetting_week_off_btn: fairygui.GButton;
	public SearchSetting_month_off_btn: fairygui.GButton;
	public SearchSetting_history_off_btn: fairygui.GButton;
	public SearchSetting_bet_off_btn: fairygui.GButton;
	public SearchSetting_win_off_btn: fairygui.GButton;

	public SearchSetting_current_on_btn: fairygui.GButton;
	public SearchSetting_allgame_on_btn: fairygui.GButton;
	public SearchSetting_personal_on_btn: fairygui.GButton;
	public SearchSetting_player_on_btn: fairygui.GButton;
	public SearchSetting_day_on_btn: fairygui.GButton;
	public SearchSetting_week_on_btn: fairygui.GButton;
	public SearchSetting_month_on_btn: fairygui.GButton;
	public SearchSetting_history_on_btn: fairygui.GButton;
	public SearchSetting_bet_on_btn: fairygui.GButton;
	public SearchSetting_win_on_btn: fairygui.GButton;

	public SearchSetting_current_loader: fairygui.GLoader;
	public SearchSetting_allgame_loader: fairygui.GLoader;
	public SearchSetting_personal_loader: fairygui.GLoader;
	public SearchSetting_player_loader: fairygui.GLoader;
	public SearchSetting_day_loader: fairygui.GLoader;
	public SearchSetting_week_loader: fairygui.GLoader;
	public SearchSetting_month_loader: fairygui.GLoader;
	public SearchSetting_history_loader: fairygui.GLoader;
	public SearchSetting_bet_loader: fairygui.GLoader;
	public SearchSetting_win_loader: fairygui.GLoader;

	public SearchSetting_inputnormal: fairygui.GLoader;
	public SearchSetting_inputText: fairygui.GTextField;
	public SearchSetting_SearchBtn: fairygui.GButton;
	public SearchSetting_ReplayBtn: fairygui.GButton;

	private isOpenSetting: boolean = true;
	private RankType_game: string[] = ["s_current_", "s_game_"];
	private RankType_player: string[] = ["s_personal_", "s_player_"];
	private RankType_time: string[] = ["s_day_", "s_week_", "s_month_", "s_history_"];
	private RankType_win: string[] = ["s_bet_", "s_win_"];
	private SearchSetting_gameBtnGroup_off: Array<fairygui.GButton> = new Array<fairygui.GButton>();
	private SearchSetting_gameBtnGroup_on: Array<fairygui.GButton> = new Array<fairygui.GButton>();
	private SearchSetting_playerBtnGroup_off: Array<fairygui.GButton> = new Array<fairygui.GButton>();
	private SearchSetting_playerBtnGroup_on: Array<fairygui.GButton> = new Array<fairygui.GButton>();
	private SearchSetting_timeBtnGroup_off: Array<fairygui.GButton> = new Array<fairygui.GButton>();
	private SearchSetting_timeBtnGroup_on: Array<fairygui.GButton> = new Array<fairygui.GButton>();
	private SearchSetting_winBtnGroup_off: Array<fairygui.GButton> = new Array<fairygui.GButton>();
	private SearchSetting_winBtnGroup_on: Array<fairygui.GButton> = new Array<fairygui.GButton>();
	private SearchSetting_ShowID_Game: number;
	private SearchSetting_ShowID_Player: number;
	private SearchSetting_ShowID_Time: number;
	private SearchSetting_ShowID_Win: number;
	private SearchSetting_SendID_Game: number;
	private SearchSetting_SendID_Player: number;
	private SearchSetting_SendID_Time: number;
	private SearchSetting_SendID_Win: number;

	//購買
	public ListParent_Buy: fairygui.GComponent;
	public ListParent_BuyScrollPane: fairygui.ScrollPane;
	public BuySetting: fairygui.GComponent;
	public BuySetting_TotleBet: fairygui.GLoader;
	public BuySetting_Bet: fairygui.GTextField;
	public BuySetting_PlusBtn: fairygui.GButton;
	public BuySetting_MinusBtn: fairygui.GButton;

	public BuyBonusTable: BuyBonusTable;
	public RankDataList: RankData[] = [];
	public BuyItemList: any[] = [];

	public PlayerBetIndex: number;
	public RePlayerBetIndex: number;

	public OnClickUseType: number = 0;
	public UseClick: boolean = false;

	public Init(parent: fairygui.GComponent = null) {
		this.RePlayLoading = parent.getChild("RePlayLoading").asCom;
		this.RePlayLoading.sortingOrder = ZOrder.eLobbyBar + 80;
		this.RePlayLoading.visible = false;
		this.FGRank = parent.getChild("lobbybar").asCom.getChild("FGRank").asCom;
		this._title = this.FGRank.getChild("title").asLoader;
		this.SearchParent = this.FGRank.getChild("SearchParent").asCom;
		this.BuyParent = this.FGRank.getChild("BuyPParent").asCom;
		this.Btn_Close = this.FGRank.getChild("close").asButton;
		this.Btn_Close.addClickListener(this.Hide, this);
		this.Rank_Only = this.FGRank.getChild("rank_only").asCom;
		this.RankOnly_ranktxt_on = this.Rank_Only.asCom.getChild("buypage").asCom.getChild("ranktxt_on").asLoader;
		this.Rank_Buy = this.FGRank.getChild("rank_buy").asCom;
		this.RankBuy_ranktxt_off = this.Rank_Buy.getChild("ranktxt_off").asLoader;
		this.RankBuy_buytxt_off = this.Rank_Buy.getChild("buytxt_off").asLoader;
		this.RankBuy_rankpage = this.Rank_Buy.getChild("rankpage").asCom;
		this.RankBuy_ranktxt_on = this.RankBuy_rankpage.getChild("ranktxt_on").asLoader;
		this.RankBuy_buypage = this.Rank_Buy.getChild("buypage").asCom;
		this.RankBuy_buytxt_on = this.RankBuy_buypage.getChild("buytxt_on").asLoader;
		this.RankBuy_btnbuy = this.Rank_Buy.getChild("btn_buy").asButton;
		this.RankBuy_btnbuy.addClickListener(this.ShowBuyParent, this);
		this.RankBuy_btnrank = this.Rank_Buy.getChild("btn_rank").asButton;
		this.RankBuy_btnrank.addClickListener(this.ShowSearchParent, this);
		if (SelfData.Instance.CanBuyFreeGame && SelfData.Instance.AccountData.AllowBuy) {
			this.Rank_Only.visible = false;
			this.Rank_Buy.visible = true;
		}
		else {
			this.Rank_Only.visible = true;
			this.Rank_Buy.visible = false;
		}
		this.InitBetArray();
		this.SetUI_Rank();
		this.SetUI_Buy();
		this.SetLoader();
		this.OnSearch_Game(0, 1, false);
		this.OnSearch_Player(1, -1, false);
		this.OnSearch_Time(3, -1, false);
		this.OnSearch_Win(1, 0, false);
		this.RegisterEven();
		//this.LadderRequest();
		//this.ShowSearchParent();
		this.FGRank.visible = false;
	}

	public InitBetArray() {
		let scale = SelfData.Instance.PlaySetting.CurrencyScale;
		this.SlotBetTable = TableManager.Instance.GetTable(SlotBetTable);
		let betString = this.SlotBetTable.GetValue<string, string>(SelfData.Instance.TargetGame, SlotBetTable.m_Bet);
		let betArray = betString.split(",");
		betArray.forEach(bet => this.BetArray.push(parseInt(bet) * scale));
		this.BetRate = this.SlotBetTable.GetValue<string, number>(SelfData.Instance.TargetGame, SlotBetTable.m_BetRate);
		let defaultBet = this.SlotBetTable.GetValue<string, number>(SelfData.Instance.TargetGame, SlotBetTable.m_DefaultBet) * scale;
		this.BetIndex = SelfData.Instance.BetIndex;
		this.BetMaxIndex = this.BetArray.length - 1;
	}

	public ChangeBetArray(type: string) {
		this.BetArray = [];
		let _currencyData = CoinSymbolsTable.GetCoinSymbolData(type);
		let betString = this.SlotBetTable.GetValue<string, string>(SelfData.Instance.TargetGame, SlotBetTable.m_Bet);
		let betArray = betString.split(",");
		betArray.forEach(bet => this.BetArray.push(parseInt(bet) * _currencyData.Scale));
		SelfData.Instance.AccountData.CoinSymbolScale = _currencyData.Scale;
		var event: ChangeRePlayBet = new ChangeRePlayBet();
		EventManager.Instance.Send(event);
	}

	public SetUI_Rank() {
		this.SearchSetting = this.SearchParent.getChild("SearchSetting").asCom;
		this.RankSetting = this.SearchParent.getChild("RankSetting").asCom;
		this.ListParent_Rank = this.SearchParent.getChild("ListParent").asCom;
		this.ListParent_RankScrollPane = this.ListParent_Rank.scrollPane;
		//this.ListParent_RankScrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.OnRankScroll, this);

		this.SearchParent_Rank = this.SearchParent.getChild("rank").asLoader;
		this.SearchParent_Name = this.SearchParent.getChild("name").asLoader;
		this.SearchParent_Bet = this.SearchParent.getChild("bet").asLoader;
		this.SearchParent_Win = this.SearchParent.getChild("win").asLoader;
		this.SearchParent_Copy = this.SearchParent.getChild("copy").asLoader;
		this.SearchParent_Play = this.SearchParent.getChild("play").asLoader;

		this.RankSetting_game = this.RankSetting.getChild("game").asLoader;
		this.RankSetting_player = this.RankSetting.getChild("player").asLoader;
		this.RankSetting_time = this.RankSetting.getChild("time").asLoader;
		this.RankSetting_win = this.RankSetting.getChild("win").asLoader;
		this.RankSetting_Btn_Setting_on = this.RankSetting.getChild("close").asButton;
		this.RankSetting_Btn_Setting_on.addClickListener(() => { this.OnSearchSetting(true) }, this);
		this.RankSetting_Btn_Setting_off = this.RankSetting.getChild("open").asButton;
		this.RankSetting_Btn_Setting_off.addClickListener(() => { this.OnSearchSetting(false) }, this);
		this.RankSetting_Btn_Setting_on_UI = this.RankSetting.getChild("openui").asCom;
		this.RankSetting_Btn_Setting_off_UI = this.RankSetting.getChild("closeui").asCom;

		this.SearchSetting_inputText = this.SearchSetting.getChild("input").asTextField;
		this.SearchSetting_SearchBtn = this.SearchSetting.getChild("SearchButton").asButton;
		this.SearchSetting_SearchBtn.addClickListener(this.OnSearchBtn_SearchPage, this);
		this.SearchSetting_ReplayBtn = this.SearchSetting.getChild("replayBtn").asButton;
		this.SearchSetting_ReplayBtn.addClickListener(this.OnReplayBtn_SearchPage, this);

		this.SearchSetting_current_loader = this.SearchSetting.getChild("current").asLoader;
		this.SearchSetting_allgame_loader = this.SearchSetting.getChild("allgame").asLoader;
		this.SearchSetting_personal_loader = this.SearchSetting.getChild("personal").asLoader;
		this.SearchSetting_player_loader = this.SearchSetting.getChild("player").asLoader;
		this.SearchSetting_day_loader = this.SearchSetting.getChild("day").asLoader;
		this.SearchSetting_week_loader = this.SearchSetting.getChild("week").asLoader;
		this.SearchSetting_month_loader = this.SearchSetting.getChild("month").asLoader;
		this.SearchSetting_history_loader = this.SearchSetting.getChild("history").asLoader;
		this.SearchSetting_bet_loader = this.SearchSetting.getChild("bet").asLoader;
		this.SearchSetting_win_loader = this.SearchSetting.getChild("win").asLoader;
		this.SearchSetting_inputnormal = this.SearchSetting.getChild("inputnormal").asLoader;

		this.SearchSetting_current_off_btn = this.SearchSetting.getChild("current_off_btn").asButton;
		this.SearchSetting_current_off_btn.addClickListener(() => { this.OnSearch_Game(0, 1) }, this);
		this.SearchSetting_allgame_off_btn = this.SearchSetting.getChild("allgame_off_btn").asButton;
		this.SearchSetting_allgame_off_btn.addClickListener(() => { this.OnSearch_Game(1, -1) }, this);
		this.SearchSetting_gameBtnGroup_off.push(this.SearchSetting_current_off_btn);
		this.SearchSetting_gameBtnGroup_off.push(this.SearchSetting_allgame_off_btn);

		this.SearchSetting_personal_off_btn = this.SearchSetting.getChild("personal_off_btn").asButton;
		this.SearchSetting_personal_off_btn.addClickListener(() => { this.OnSearch_Player(0, 1) }, this);
		this.SearchSetting_player_off_btn = this.SearchSetting.getChild("player_off_btn").asButton;
		this.SearchSetting_player_off_btn.addClickListener(() => { this.OnSearch_Player(1, -1) }, this);
		this.SearchSetting_playerBtnGroup_off.push(this.SearchSetting_personal_off_btn);
		this.SearchSetting_playerBtnGroup_off.push(this.SearchSetting_player_off_btn);

		this.SearchSetting_day_off_btn = this.SearchSetting.getChild("day_off_btn").asButton;
		this.SearchSetting_day_off_btn.addClickListener(() => { this.OnSearch_Time(0, 0) }, this);
		this.SearchSetting_week_off_btn = this.SearchSetting.getChild("week_off_btn").asButton;
		this.SearchSetting_week_off_btn.addClickListener(() => { this.OnSearch_Time(1, 1) }, this);
		this.SearchSetting_month_off_btn = this.SearchSetting.getChild("month_off_btn").asButton;
		this.SearchSetting_month_off_btn.addClickListener(() => { this.OnSearch_Time(2, 2) }, this);
		this.SearchSetting_history_off_btn = this.SearchSetting.getChild("history_off_btn").asButton;
		this.SearchSetting_history_off_btn.addClickListener(() => { this.OnSearch_Time(3, -1) }, this);
		this.SearchSetting_timeBtnGroup_off.push(this.SearchSetting_day_off_btn);
		this.SearchSetting_timeBtnGroup_off.push(this.SearchSetting_week_off_btn);
		this.SearchSetting_timeBtnGroup_off.push(this.SearchSetting_month_off_btn);
		this.SearchSetting_timeBtnGroup_off.push(this.SearchSetting_history_off_btn);

		this.SearchSetting_bet_off_btn = this.SearchSetting.getChild("bet_off_btn").asButton;
		this.SearchSetting_bet_off_btn.addClickListener(() => { this.OnSearch_Win(0, 1) }, this);
		this.SearchSetting_win_off_btn = this.SearchSetting.getChild("win_off_btn").asButton;
		this.SearchSetting_win_off_btn.addClickListener(() => { this.OnSearch_Win(1, 0) }, this);
		this.SearchSetting_winBtnGroup_off.push(this.SearchSetting_bet_off_btn);
		this.SearchSetting_winBtnGroup_off.push(this.SearchSetting_win_off_btn);

		this.SearchSetting_current_on_btn = this.SearchSetting.getChild("current_on_btn").asButton;
		this.SearchSetting_allgame_on_btn = this.SearchSetting.getChild("allgame_on_btn").asButton;
		this.SearchSetting_gameBtnGroup_on.push(this.SearchSetting_current_on_btn);
		this.SearchSetting_gameBtnGroup_on.push(this.SearchSetting_allgame_on_btn);

		this.SearchSetting_personal_on_btn = this.SearchSetting.getChild("personal_on_btn").asButton;
		this.SearchSetting_player_on_btn = this.SearchSetting.getChild("player_on_btn").asButton;
		this.SearchSetting_playerBtnGroup_on.push(this.SearchSetting_personal_on_btn);
		this.SearchSetting_playerBtnGroup_on.push(this.SearchSetting_player_on_btn);

		this.SearchSetting_day_on_btn = this.SearchSetting.getChild("day_on_btn").asButton;
		this.SearchSetting_week_on_btn = this.SearchSetting.getChild("week_on_btn").asButton;
		this.SearchSetting_month_on_btn = this.SearchSetting.getChild("month_on_btn").asButton;
		this.SearchSetting_history_on_btn = this.SearchSetting.getChild("history_on_btn").asButton;
		this.SearchSetting_timeBtnGroup_on.push(this.SearchSetting_day_on_btn);
		this.SearchSetting_timeBtnGroup_on.push(this.SearchSetting_week_on_btn);
		this.SearchSetting_timeBtnGroup_on.push(this.SearchSetting_month_on_btn);
		this.SearchSetting_timeBtnGroup_on.push(this.SearchSetting_history_on_btn);

		this.SearchSetting_bet_on_btn = this.SearchSetting.getChild("bet_on_btn").asButton;
		this.SearchSetting_win_on_btn = this.SearchSetting.getChild("win_on_btn").asButton;
		this.SearchSetting_winBtnGroup_on.push(this.SearchSetting_bet_on_btn);
		this.SearchSetting_winBtnGroup_on.push(this.SearchSetting_win_on_btn);
	}

	public SetUI_Buy() {
		this.ListParent_Buy = this.BuyParent.getChild("ListParent").asCom;
		this.ListParent_BuyScrollPane = this.ListParent_Buy.scrollPane;
		this.ListParent_BuyScrollPane.addEventListener(fairygui.ScrollPane.SCROLL, this.OnBuyScroll, this);
		this.BuySetting = this.BuyParent.getChild("BuyParent").asCom;
		this.BuySetting_TotleBet = this.BuySetting.getChild("totlebet").asLoader;
		this.BuySetting_TotleBet.url = getFairyUIURL("Slot_000_LobbyLoader", "totalbet_");
		this.BuySetting_Bet = this.BuySetting.getChild("bet").asTextField;
		this.BuySetting_PlusBtn = this.BuySetting.getChild("Plus").asButton;
		this.BuySetting_PlusBtn.addClickListener(this.OnPlusBetClick, this);
		this.BuySetting_MinusBtn = this.BuySetting.getChild("Minus").asButton;
		this.BuySetting_MinusBtn.addClickListener(this.OnMinusBetClick, this);
		this.BuyBonusTable = TableManager.Instance.GetTable(BuyBonusTable);
		let max = TableManager.Instance.GetTable(BuyBonusTable).GetMax();
		SelfData.Instance.BuyBonusMaxType = max;
		for (let i = 0; i < Number(max); i++) {
			let obj = this.CreateItem("BuyList", this.ListParent_Buy, 106, i);
			let rank = new BuyItem();
			let id = i + 1;
			rank.SetItemData(obj.asCom, id, this.BetIndex, this.BuyBonusTable.BuyCost(id, 0), this.BuyBonusTable.NeedIcon(id, 0), this.BuyBonusTable.PlayTime(id, 0), this.Hide, this);
			this.BuyItemList.push(rank);
		}
		this.UpdateCost();
	}

	public UpdateCost() {
		let _bet = this.BetArray[this.BetIndex] / SelfData.Instance.PlaySetting.CurrencyScale;
		let _totle = _bet * SelfData.Instance.PlaySetting.CurrencyScale * SelfData.Instance.PlaySetting.BetRate
		this.BuySetting_Bet.text = toCoinToString_CurrencyBet(_totle * SelfData.Instance.PlaySetting.MultiplyValue);
		updateFontSize(this.BuySetting_Bet, 36, 160);
		for (let i = 0; i < this.BuyItemList.length; i++) {
			let id = i + 1;
			this.BuyItemList[i].UpdateCost(this.BuyBonusTable.BuyCost_JustShow(id, 0, _totle), this.BetIndex);
		}
	}

	protected OnPlusBetClick() {
		SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		this.BetIndex++;
		if (this.BetIndex > this.BetMaxIndex)
			this.BetIndex = 0;
		this.UpdateCost();
	}

	protected OnMinusBetClick() {
		SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		this.BetIndex--;
		if (this.BetIndex < 0)
			this.BetIndex = this.BetMaxIndex;
		this.UpdateCost();
	}

	public SetLoader() {
		//Public
		this._title.url = getFairyUIURL("Slot_000_LobbyLoader", "fgbuy_title_");
		this.RankOnly_ranktxt_on.url = getFairyUIURL("Slot_000_LobbyLoader", "ranktxt_on_");
		this.RankBuy_ranktxt_off.url = getFairyUIURL("Slot_000_LobbyLoader", "ranktxt_off_");
		this.RankBuy_buytxt_off.url = getFairyUIURL("Slot_000_LobbyLoader", "buytxt_off_");
		this.RankBuy_ranktxt_on.url = getFairyUIURL("Slot_000_LobbyLoader", "ranktxt_on_");
		this.RankBuy_buytxt_on.url = getFairyUIURL("Slot_000_LobbyLoader", "buytxt_on_");
		//Rank
		this.RankSetting_game.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_game[1]);
		this.RankSetting_player.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_player[1]);
		this.RankSetting_time.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_time[3]);
		this.RankSetting_win.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_win[1]);

		this.SearchParent_Rank.url = getFairyUIURL("Slot_000_LobbyLoader", "c_rank_");
		this.SearchParent_Name.url = getFairyUIURL("Slot_000_LobbyLoader", "c_name_");
		this.SearchParent_Bet.url = getFairyUIURL("Slot_000_LobbyLoader", "c_bet_");
		this.SearchParent_Win.url = getFairyUIURL("Slot_000_LobbyLoader", "c_win_");
		this.SearchParent_Copy.url = getFairyUIURL("Slot_000_LobbyLoader", "c_copy_");
		this.SearchParent_Play.url = getFairyUIURL("Slot_000_LobbyLoader", "c_play_");

		this.SearchSetting_current_loader.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_game[0]);
		this.SearchSetting_allgame_loader.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_game[1]);
		this.SearchSetting_personal_loader.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_player[0]);
		this.SearchSetting_player_loader.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_player[1]);
		this.SearchSetting_day_loader.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_time[0]);
		this.SearchSetting_week_loader.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_time[1]);
		this.SearchSetting_month_loader.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_time[2]);
		this.SearchSetting_history_loader.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_time[3]);
		this.SearchSetting_bet_loader.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_win[0]);
		this.SearchSetting_win_loader.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_win[1]);
		this.SearchSetting_inputnormal.url = getFairyUIURL("Slot_000_LobbyLoader", "s_code_");
	}

	private RegisterEven() {
		NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerSlotLadderRespond, this, this.LadderRespond);
		NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerSlotReplayRespond, this, this.ReplayRespond);
		EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.UpdateInputTet);
		EventManager.Instance.RegisterEventListener(SendRankEvent, this, this.OnGetEvent);
	}

	public Show() {
		if (SelfData.Instance.CanBuyFreeGame && SelfData.Instance.AccountData.AllowBuy) {
			this.Rank_Only.visible = false;
			this.Rank_Buy.visible = true;
		}
		else {
			this.Rank_Only.visible = true;
			this.Rank_Buy.visible = false;
		}
		if (this.FGRank != null) {
			this.FGRank.visible = true;
		}
		this.ShowSearchParent(false);
		this.OnSearchSetting(false, false);
		this.BetIndex = SelfData.Instance.BetIndex;
		this.UpdateCost();
	}

	public ShowBuy() {
		if (SelfData.Instance.CanBuyFreeGame && SelfData.Instance.AccountData.AllowBuy) {
			this.Rank_Only.visible = false;
			this.Rank_Buy.visible = true;
		}
		else {
			this.Rank_Only.visible = true;
			this.Rank_Buy.visible = false;
		}
		if (this.FGRank != null) {
			this.FGRank.visible = true;
		}
		this.ShowBuyParent(false);
		this.OnSearchSetting(false, false);
		this.BetIndex = SelfData.Instance.BetIndex;
		this.UpdateCost();
	}

	public Hide() {
		SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		if (this.FGRank != null) {
			this.FGRank.visible = false;
		}
	}

	public UpdateInputTet() {
		if (this.SearchSetting_inputText.text != null) {
			if (this.SearchSetting_inputText.text != "") {
				this.SearchSetting_inputnormal.visible = false;
			}
			else {
				this.SearchSetting_inputnormal.visible = true;
			}
		}
	}

	public ShowBuyParent(playsound: boolean = true) {
		if (playsound)
			SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		if (this.BuyOpen)
			return;
		this.BuyOpen = true;
		this.RankOpen = false;
		this.SearchParent.visible = false;
		this.BuyParent.visible = true;
		this.RankBuy_buypage.visible = true;
		this.RankBuy_rankpage.visible = false;
	}

	public ShowSearchParent(playsound: boolean = true) {
		if (playsound)
			SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		if (this.RankOpen)
			return;
		this.RankOpen = true;
		this.BuyOpen = false;
		this.SearchParent.visible = true;
		this.BuyParent.visible = false;
		this.RankBuy_buypage.visible = false;
		this.RankBuy_rankpage.visible = true;
		this.LadderRequest();
	}

	public OnSearch_Game(index: number, id: number, playsound: boolean = true) {
		if (playsound)
			SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		for (let i = 0; i < this.SearchSetting_gameBtnGroup_off.length; i++) {
			this.SearchSetting_gameBtnGroup_off[i].visible = true;
			if (index == i)
				this.SearchSetting_gameBtnGroup_off[i].visible = false;
		}
		for (let j = 0; j < this.SearchSetting_gameBtnGroup_on.length; j++) {
			this.SearchSetting_gameBtnGroup_on[j].visible = false;
			if (index == j)
				this.SearchSetting_gameBtnGroup_on[j].visible = true;
		}
		this.SearchSetting_SendID_Game = id;
		this.SearchSetting_ShowID_Game = index;
	}

	public OnSearch_Player(index: number, id: number, playsound: boolean = true) {
		if (playsound)
			SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		for (let i = 0; i < this.SearchSetting_playerBtnGroup_off.length; i++) {
			this.SearchSetting_playerBtnGroup_off[i].visible = true;
			if (index == i)
				this.SearchSetting_playerBtnGroup_off[i].visible = false;
		}
		for (let j = 0; j < this.SearchSetting_playerBtnGroup_on.length; j++) {
			this.SearchSetting_playerBtnGroup_on[j].visible = false;
			if (index == j)
				this.SearchSetting_playerBtnGroup_on[j].visible = true;
		}
		this.SearchSetting_SendID_Player = id;
		this.SearchSetting_ShowID_Player = index;
	}

	public OnSearch_Time(index: number, id: number, playsound: boolean = true) {
		if (playsound)
			SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		for (let i = 0; i < this.SearchSetting_timeBtnGroup_off.length; i++) {
			this.SearchSetting_timeBtnGroup_off[i].visible = true;
			if (index == i)
				this.SearchSetting_timeBtnGroup_off[i].visible = false;
		}
		for (let j = 0; j < this.SearchSetting_timeBtnGroup_on.length; j++) {
			this.SearchSetting_timeBtnGroup_on[j].visible = false;
			if (index == j)
				this.SearchSetting_timeBtnGroup_on[j].visible = true;
		}
		this.SearchSetting_SendID_Time = id;
		this.SearchSetting_ShowID_Time = index;
	}

	public OnSearch_Win(index: number, id: number, playsound: boolean = true) {
		if (playsound)
			SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		for (let i = 0; i < this.SearchSetting_winBtnGroup_off.length; i++) {
			this.SearchSetting_winBtnGroup_off[i].visible = true;
			if (index == i)
				this.SearchSetting_winBtnGroup_off[i].visible = false;
		}
		for (let j = 0; j < this.SearchSetting_winBtnGroup_on.length; j++) {
			this.SearchSetting_winBtnGroup_on[j].visible = false;
			if (index == j)
				this.SearchSetting_winBtnGroup_on[j].visible = true;
		}
		this.SearchSetting_SendID_Win = id;
		this.SearchSetting_ShowID_Win = index;
	}

	public OnSearchSetting(isopen: boolean, playsound: boolean = true) {
		if (playsound)
			SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		this.SearchSetting.visible = isopen;
		this.RankSetting_Btn_Setting_on.visible = !isopen;
		this.RankSetting_Btn_Setting_off.visible = isopen;
		this.RankSetting_Btn_Setting_on_UI.visible = !isopen;
		this.RankSetting_Btn_Setting_off_UI.visible = isopen;
		this.isOpenSetting = !isopen;
	}

	public OnReplayBtn_SearchPage() {
		SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		if (this.SearchSetting_inputText.text == "")
			return;
		let isnumber = isNaN(Number(this.SearchSetting_inputText.text));
		if (!isnumber)
			this.ReplayRequest(Number(this.SearchSetting_inputText.text));
		else {
			let dialog = new MessageTips();
			dialog.CreateTips_MWUI();
			dialog.ShowTips(
				LocalizationCommonTable.Get(1002),
				LocalizationCommonTable.Get(10000020),
				null,
				this,
			);
			this.SearchSetting_inputText.text = "";
		}
	}

	public OnSearchBtn_SearchPage() {
		SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		this.LadderRequest();
	}

	public OnRankScroll() { }

	public OnBuyScroll() { }

	public CreateItem(_name: string, _parent: fairygui.GComponent, _hight: number, index: number) {
		let obj = UIManager.Instance.ShowEffect("Slot_000_LobbyLoader", _name, false);
		_parent.addChild(obj);
		obj.setXY(0, _hight * index);
		obj.name = "r" + index.toString();
		obj.visible = true;
		return obj;
	}

	public LadderRequest() {
		let msgBuilder = new MessageBuilder();
		msgBuilder.Add(SlotLadderRequest.GameType, this.SearchSetting_SendID_Game, NetMsgFieldType.Int);
		msgBuilder.Add(SlotLadderRequest.LogDate, this.SearchSetting_SendID_Time, NetMsgFieldType.Int);
		msgBuilder.Add(SlotLadderRequest.WinOrWinRate, this.SearchSetting_SendID_Win, NetMsgFieldType.Int);
		msgBuilder.Add(SlotLadderRequest.Personal, this.SearchSetting_SendID_Player, NetMsgFieldType.Int);
		NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerSlotLadderRequest, msgBuilder);
		this.OnSearchSetting(false, false);
	}

	public ReplayRequest(_id: number) {
		let msgBuilder = new MessageBuilder();
		msgBuilder.Add(SlotReplayRequest.ReplayId, _id, NetMsgFieldType.Long);
		NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerSlotReplayRequest, msgBuilder);
	}

	public OnListClick(event: any) {
		let t = event.itemObject.getChild("rank").asTextField;
		SelfData.Instance.RankDataIndex = Number(t.text) - 1;
		SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		//console.log("OnListClick");
		if (this.UseClick) {
			if (this.OnClickUseType == 0) {
				this.UseClick = false;

				this.CopyStr(SelfData.Instance.RankDataList[SelfData.Instance.RankDataIndex].data["Sn"].toString());

				let oldGameUrl: string = eval('window.location.href.toString()');
				let _url = oldGameUrl.split("/" + SelfData.Instance.TargetGame);
				let stringURL = _url[0] + SelfData.Instance.OutShowRePlayURL;

				this.CopyStr(
					stringURL +
					GameType[SelfData.Instance.RankDataList[SelfData.Instance.RankDataIndex].data["GameType"].toString()] +
					"?" + "gameMode=2" +
					"&" + "lang=" + getUrlLanguage(SelfData.Instance.Language) +
					"&" + "outmode=" + SelfData.Instance.Is_OUTMode +
					"&" + "outshowreplayid=" +  
					SelfData.Instance.RankDataList[SelfData.Instance.RankDataIndex].data["Sn"].toString()
				);
				event.itemObject.getTransition("copy").play();
			}
			else {
				this.ReplayRequest(SelfData.Instance.RankDataList[SelfData.Instance.RankDataIndex].data["Sn"]);
				this.UseClick = false;
			}
		}
	}

	public OnRePlay() {
		this.OnClickUseType = 1;
		this.UseClick = true;
		//console.log("OnRePlay");
	}

	public OnCopy() {
		this.OnClickUseType = 0;
		this.UseClick = true;
		//console.log("OnCopy");
	}

	public OnGetEvent(event: SendRankEvent) {
		if (event.Type == 0) {
			event.Button.removeClickListener(this.OnCopy, this);
			event.Button.addClickListener(this.OnCopy, this);
		}
		else {
			event.Button.removeClickListener(this.OnRePlay, this);
			event.Button.addClickListener(this.OnRePlay, this);
		}
	}

	public setRankUI(idx: number, obj: fairygui.GObject) {
		let data = SelfData.Instance.SelfRankDataList[idx].data;

		let _Crown = obj.asCom.getChild("crown").asImage;
		let _bet = obj.asCom.getChild("bet").asTextField;
		let _name = obj.asCom.getChild("name").asTextField;
		let _gameName = obj.asCom.getChild("game").asTextField;
		let _currency = obj.asCom.getChild("currency").asTextField;
		let _date = obj.asCom.getChild("date").asTextField;
		let _win = obj.asCom.getChild("win").asTextField;
		let _rank = obj.asCom.getChild("rank").asTextField;
		let _btnCopy = obj.asCom.getChild("Btn_Copy").asButton;
		let _btnReplay = obj.asCom.getChild("Btn_Play").asButton;
		let _info = obj.asCom.getChild("info").asTextField;


		//_btnCopy.removeClickListener(this.OnCopy, this);
		//_btnCopy.addClickListener(this.OnCopy, this);
		//if (DisTeaOneModel.Instance.RankDataIndex < 10) {
		//_btnCopy.addClickListener(() => {
		let event = new SendRankEvent();
		event.Button = _btnCopy;
		event.Index = idx;
		event.Type = 0;
		EventManager.Instance.Send(event);
		let event1 = new SendRankEvent();
		event1.Button = _btnReplay;
		event1.Index = idx;
		event1.Type = 1;
		EventManager.Instance.Send(event1);
		//}, this);
		//_btnReplay.removeClickListener(this.OnRePlay, this);
		//_btnReplay.addClickListener(this.OnRePlay, this);
		// _btnReplay.addClickListener(() => {
		// 	let event = new SendRankEvent();
		// 	event.Index = idx;
		// 	event.Type = 1;
		// 	EventManager.Instance.Send(event);
		// }, this);
		// DisTeaOneModel.Instance.RankDataIndex++;
		//}

		let _playerAvatar = obj.asCom.getChild("player").asCom;

		_bet.text = Math.floor(data["Win"] / data["Bet"]).toString() + "x";
		updateFontSize_onlySize(_bet, 33, 94);
		let _avatarData = data["Equipment"];
		//console.log("avatarstring : " + _avatarData);
		let _time = data["LogDate"];
		let times: string = _time.split("T");
		let day = times[0].replace(/-/g, "/");
		_date.text = day + " " + times[1];
		updateFontSize(_date, 14, 84);
		_name.text = data["Pseudonym"] == "" ? data["Nickname"] : data["Pseudonym"];
		updateFontSize_onlySize(_name, 20, 156);
		_gameName.text = GameNameTable.Get(parseInt(data["GameType"], 10));
		updateFontSize_onlySize(_gameName, 20, 156);
		_currency.text = data["Currency"] == "MW" ? "CNY" : data["Currency"];
		_win.text = toCoinToString(data["Win"]);
		updateFontSize_onlySize(_win, 26, 97);
		_rank.text = (SelfData.Instance.SelfRankDataList[idx].RankIndex + 1).toString();
		_info.text = LocalizationCommonTable.Get(10000023);
		updateFontSize(_info, 21, 185);
		if (SelfData.Instance.SelfRankDataList[idx].RankIndex < 3) {
			_Crown.visible = true;
		}
		else {
			_Crown.visible = false;
		}
		let _replayid = data["Sn"];
		let Avatar = <MyGLoader>_playerAvatar.getChild("Avatar").asLoader;

		let OuterFrame = <MyGLoader>_playerAvatar.getChild("OuterFrame").asLoader;
		let Top = <MyGLoader>_playerAvatar.getChild("Top").asLoader;
		let Bot = <MyGLoader>_playerAvatar.getChild("Bot").asLoader;
		let Left = <MyGLoader>_playerAvatar.getChild("Left").asLoader;
		let Right = <MyGLoader>_playerAvatar.getChild("Right").asLoader;
		let TopLeft = <MyGLoader>_playerAvatar.getChild("TopLeft").asLoader;
		let TopRight = <MyGLoader>_playerAvatar.getChild("TopRight").asLoader;
		let Wing = <MyGLoader>_playerAvatar.getChild("Wing").asLoader;
		let Name = <MyGLoader>_playerAvatar.getChild("Name").asLoader;
		let GameTitle = <MyGLoader>_playerAvatar.getChild("GameTitle").asLoader;

		let delimiterChars = [",", ";"];
		let AvatarId: string[] = [];
		let avatarId = _avatarData;
		let new_avatarId_1 = avatarId.split(delimiterChars[0]);

		let new_avatarId_2 = avatarId.split(delimiterChars[1]);
		if (new_avatarId_1.length >= 11)
			AvatarId = new_avatarId_1;
		else if (new_avatarId_2.length >= 11)
			AvatarId = new_avatarId_2;
		for (let i = 0; i < AvatarId.length; i++) {
			//console.log("AvatarId : " + SelfData.Instance.ImageResUrl + AvatarId[i] + ".png");
		}
		Avatar.url = SelfData.Instance.ImageResUrl + AvatarId[0] + ".png";
		OuterFrame.url = SelfData.Instance.ImageResUrl + AvatarId[1] + ".png";
		Top.url = SelfData.Instance.ImageResUrl + AvatarId[2] + ".png";
		Bot.url = SelfData.Instance.ImageResUrl + AvatarId[3] + ".png";
		Left.url = SelfData.Instance.ImageResUrl + AvatarId[4] + ".png";
		Right.url = SelfData.Instance.ImageResUrl + AvatarId[5] + ".png";
		TopLeft.url = SelfData.Instance.ImageResUrl + AvatarId[6] + ".png";
		TopRight.url = SelfData.Instance.ImageResUrl + AvatarId[7] + ".png";
		Wing.url = SelfData.Instance.ImageResUrl + AvatarId[8] + ".png";
		Name.url = SelfData.Instance.ImageResUrl + AvatarId[9] + ".png";
		GameTitle.url = SelfData.Instance.ImageResUrl + AvatarId[10] + ".png";

	};
	public LadderRespond(connectionId: number, message: any[]) {
		//console.log("LadderRespond");
		SelfData.Instance.RankDataList = [];
		SelfData.Instance.SelfRankDataList = [];
		SelfData.Instance.OtherRankDataList = [];
		let data = JSON.parse(message[SlotLadderRespond.LadderInfo]);
		let list: fairygui.GList = new fairygui.GList();
		list = this.ListParent_Rank.getChild("n0").asList;
		list.setVirtual();
		list.itemRenderer = this.setRankUI;
		for (let i = 0; i < data.length; i++) {
			//let obj = this.CreateItem("RankList", this.ListParent_Rank, 60, i);
			let rank = new RankData();

			rank.SetItemData(data[i], i, this.ReplayRequest, this);
			// if (data[i]["Nickname"] == "17****61")
			SelfData.Instance.SelfRankDataList.push(rank);
			// else
			// 	SelfData.Instance.OtherRankDataList.push(rank);
			SelfData.Instance.RankDataList.push(rank);
		}
		//SelfData.Instance.SelfRankDataList = SelfData.Instance.SelfRankDataList.concat(SelfData.Instance.OtherRankDataList);
		list.numItems = data.length;
		list.addEventListener(fairygui.ItemEvent.CLICK, this.OnListClick, this);
		this.OnSearchSetting(false, false);
		this.RankSetting_game.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_game[this.SearchSetting_ShowID_Game]);
		this.RankSetting_player.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_player[this.SearchSetting_ShowID_Player]);
		this.RankSetting_time.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_time[this.SearchSetting_ShowID_Time]);
		this.RankSetting_win.url = getFairyUIURL("Slot_000_LobbyLoader", this.RankType_win[this.SearchSetting_ShowID_Win]);
	}

	public async ReplayRespond(connectionId: number, message: any[]) {
		let GameID = message[1];
		if (GameID == -1) {
			let dialog = new MessageTips();
			dialog.CreateTips_MWUI();
			dialog.ShowTips(
				LocalizationCommonTable.Get(1002),
				LocalizationCommonTable.Get(10000020),
				null,
				this,
			);
			this.SearchSetting_inputText.text = "";
		}
		else if (SelfData.Instance.TargetGameType != GameID && SelfData.Instance.UrlParam_RePlayID == "") {
			let dialog = new MessageTips();
			dialog.CreateTips_MWUI();
			dialog.ShowDialog(LocalizationCommonTable.Get(1002),
				LocalizationCommonTable.Get(1003),
				LocalizationCommonTable.Get(10000014).format(GameNameTable.Get(parseInt(GameID, 10))),
				() => {
					GoToRePlayGame(SelfData.Instance.TargetGame, GameType[GameID], message[0]);
				},
				this,
				() => {
					//dialog.CloseTip();
				},
				this);
		}
		else {
			this.PlayerBetIndex = SelfData.Instance.BetIndex;
			//console.log("ReplayRespond");
			this.ChangeBetArray(message[2]);
			let data = JSON.parse(message[6]);
			let reBetIndex = data["BetParam"][0] * SelfData.Instance.PlaySetting.CurrencyScale;
			this.RePlayerBetIndex = this.BetArray.indexOf(reBetIndex);
			SelfData.Instance.GameNormalRoundID = data["OriginalGameRoundId"];
			SelfData.Instance.PlaySetting.BetRate
			SelfData.Instance.GameBonusRoundID = [];
			let _bonusData = data["BonusResult"];
			GameLogic.Instance.ServerGameResultList = [];
			GameLogic.Instance.ServerBonusGameResultList = [];
			let normalresult = this.createTestGameResult(data["NormalResult"], []);
			GameLogic.Instance.ServerGameResultList.push(normalresult);
			let _bonus = [];
			for (let i = 0; i < _bonusData.length; i++) {
				SelfData.Instance.GameBonusRoundID.push(_bonusData[i][_bonusData[i].length - 1]);
				_bonusData[i].pop();
				_bonus.push(_bonusData[i]);
			}
			let bonusresult = this.createTestGameResult([], _bonus);
			GameLogic.Instance.ServerBonusGameResultList.push(bonusresult);
			SelfData.Instance.IsRePlay = true;

			let _bet = (this.BetArray[this.RePlayerBetIndex] / SelfData.Instance.PlaySetting.CurrencyScale)
				* SelfData.Instance.PlaySetting.CurrencyScale
				* SelfData.Instance.PlaySetting.BetRate;
			let totlebet = toCoinToString_CurrencyBet(_bet * SelfData.Instance.PlaySetting.MultiplyValue);
			let totleWin = 0;
			for (let j = 0; j < data["BonusWin"].length; j++) {
				totleWin += Number(data["BonusWin"][j]);
			}
			totleWin += Number(data["NormalWin"]);
			this.Hide();
			this.RePlayLoading.visible = true;
			this.RePlayLoading.getTransition("W").play();
			await waitForSeconds(1);

			var eventlobby: ShowRePlayLobby = new ShowRePlayLobby();
			eventlobby._mainRoundID = SelfData.Instance.GameNormalRoundID;
			eventlobby._bonusRoundID = SelfData.Instance.GameBonusRoundID;
			eventlobby._gameType = message[1];
			eventlobby._rePlayDateTime = message[7];
			eventlobby._rePlayName = message[4] == "" ? message[3] : message[4];
			eventlobby._rePlayTotleWin = toCoinToString(totleWin);
			eventlobby._rePlayXBet = Math.floor(totleWin / (_bet * SelfData.Instance.PlaySetting.MultiplyValue)).toString() + "x";
			eventlobby._rePlayBet = totlebet;
			eventlobby._rePlayAvatarID = message[5];
			EventManager.Instance.Send(eventlobby);

			var eventmoney: BuyBonusChangeBet = new BuyBonusChangeBet();
			eventmoney._BetID = this.RePlayerBetIndex;
			EventManager.Instance.Send(eventmoney);

			var event: EnabledStartButton_RePlay = new EnabledStartButton_RePlay();
			EventManager.Instance.Send(event);
		}
	}

	public createTestGameResult(normalResult: number[], bonusResult: number[][], jackpotMoney: number = 0) {
		var source: any[] = [];
		source.push(0); //moneyWin
		source.push(normalResult); // normal GameResult
		source.push(bonusResult); //bonus GameResult
		source.push(0); //nomal win
		source.push(0); //bonus win
		source.push(0); // result money
		source.push(0); // main no prize count ,use less
		source.push(0); // sub no prize count ,use less
		source.push(jackpotMoney); //jack pot prize
		source.push(0); // vip
		source.push(0); // vip current deposition in month
		source.push(0); // vip current play points in 90 days
		source.push([0, 0, 0]); // ticket list ,use less            
		return new ClientGameResult(source);
	}

	/**刪除所有孩子*/
	public removeAllChild(list: any[]) {
		for (let i = list.length; i >= 0; i--) {
			if (list[i] != null) {
				list[i].ItemView.parent.removeChild(list[i].ItemView);
				delete list[i];
			}
			list[i] = null;
			list.splice(i, 1);
		}
	}

	public CopyStr(str: string) {
		let copy: any = window.document.createElement("textarea");
		copy.textContent = str;
		copy.style.position = 'fixed';
		copy.style.top = '0';
		copy.style.left = '0';
		copy.style.opacity = '0';
		window.document.body.appendChild(copy);
		copy.select();
		document.execCommand('copy');

		window.document.body.removeChild(copy);
	}
}

class RankItem {
	public ItemView: fairygui.GComponent;
	public _Crown: fairygui.GImage;
	public _playerAvatar: fairygui.GComponent;
	public _bet: fairygui.GTextField;
	public _name: fairygui.GTextField;
	public _gameName: fairygui.GTextField;
	public _currency: fairygui.GTextField;
	public _date: fairygui.GTextField;
	public _win: fairygui.GTextField;
	public _rank: fairygui.GTextField;
	public _replayid: number;
	public _avatarData: string;
	public _btnCopy: fairygui.GButton;
	public _btnReplay: fairygui.GButton;
	public CallBack: Function;
	public CallbackThis: any;

	public SetItemData(obj: fairygui.GComponent, data: Object, rank: number, okFunc: Function, funcThis: any) {
		this.CallBack = okFunc;
		this.CallbackThis = funcThis
		this.SetUI(obj);
		this.SetData(data, rank);

	}

	public SetUI(obj: fairygui.GComponent) {
		this.ItemView = obj;
		this._Crown = this.ItemView.getChild("crown").asImage;
		this._bet = this.ItemView.getChild("bet").asTextField;
		this._name = this.ItemView.getChild("name").asTextField;
		this._gameName = this.ItemView.getChild("game").asTextField;
		this._currency = this.ItemView.getChild("currency").asTextField;
		this._date = this.ItemView.getChild("date").asTextField;
		this._win = this.ItemView.getChild("win").asTextField;
		this._rank = this.ItemView.getChild("rank").asTextField;
		this._btnCopy = this.ItemView.getChild("Btn_Copy").asButton;
		this._btnCopy.addClickListener(this.OnCopy, this);
		this._btnReplay = this.ItemView.getChild("Btn_Play").asButton;
		this._btnReplay.addClickListener(this.OnRePlay, this);
		this._playerAvatar = this.ItemView.getChild("player").asCom;
	}

	public SetData(data: Object, rank: number) {
		this._bet.text = (data["Win"] / data["Bet"]).toFixed(0) + "x";
		updateFontSize_onlySize(this._bet, 33, 94);
		this._avatarData = data["Equipment"];
		//console.log("avatarstring : " + this._avatarData);
		let _time = data["LogDate"];
		let times: string = _time.split("T");
		let day = times[0].replace(/-/g, "/");
		this._date.text = day + " " + times[1];
		updateFontSize(this._date, 14, 84);
		this._name.text = data["Pseudonym"] == "" ? data["Nickname"] : data["Pseudonym"];
		updateFontSize_onlySize(this._name, 20, 156);
		this._gameName.text = GameNameTable.Get(parseInt(data["GameType"], 10));
		updateFontSize_onlySize(this._gameName, 20, 156);
		this._currency.text = data["Currency"] == "MW" ? "CNY" : data["Currency"];
		this._win.text = toCoinToString(data["Win"]);
		updateFontSize_onlySize(this._win, 26, 97);
		this._rank.text = (rank + 1).toString();
		if (rank < 3) {
			this._Crown.visible = true;
		}
		else {
			this._Crown.visible = false;
		}
		this._replayid = data["Sn"];
		let Avatar = <MyGLoader>this._playerAvatar.getChild("Avatar").asLoader;

		let OuterFrame = <MyGLoader>this._playerAvatar.getChild("OuterFrame").asLoader;
		let Top = <MyGLoader>this._playerAvatar.getChild("Top").asLoader;
		let Bot = <MyGLoader>this._playerAvatar.getChild("Bot").asLoader;
		let Left = <MyGLoader>this._playerAvatar.getChild("Left").asLoader;
		let Right = <MyGLoader>this._playerAvatar.getChild("Right").asLoader;
		let TopLeft = <MyGLoader>this._playerAvatar.getChild("TopLeft").asLoader;
		let TopRight = <MyGLoader>this._playerAvatar.getChild("TopRight").asLoader;
		let Wing = <MyGLoader>this._playerAvatar.getChild("Wing").asLoader;
		let Name = <MyGLoader>this._playerAvatar.getChild("Name").asLoader;
		let GameTitle = <MyGLoader>this._playerAvatar.getChild("GameTitle").asLoader;

		let delimiterChars = [",", ";"];
		let AvatarId: string[] = [];
		let avatarId = this._avatarData;
		let new_avatarId_1 = avatarId.split(delimiterChars[0]);

		let new_avatarId_2 = avatarId.split(delimiterChars[1]);
		if (new_avatarId_1.length >= 11)
			AvatarId = new_avatarId_1;
		else if (new_avatarId_2.length >= 11)
			AvatarId = new_avatarId_2;
		for (let i = 0; i < AvatarId.length; i++) {
			//console.log("AvatarId : " + SelfData.Instance.ImageResUrl + AvatarId[i] + ".png");
		}
		Avatar.url = SelfData.Instance.ImageResUrl + AvatarId[0] + ".png";
		OuterFrame.url = SelfData.Instance.ImageResUrl + AvatarId[1] + ".png";
		Top.url = SelfData.Instance.ImageResUrl + AvatarId[2] + ".png";
		Bot.url = SelfData.Instance.ImageResUrl + AvatarId[3] + ".png";
		Left.url = SelfData.Instance.ImageResUrl + AvatarId[4] + ".png";
		Right.url = SelfData.Instance.ImageResUrl + AvatarId[5] + ".png";
		TopLeft.url = SelfData.Instance.ImageResUrl + AvatarId[6] + ".png";
		TopRight.url = SelfData.Instance.ImageResUrl + AvatarId[7] + ".png";
		Wing.url = SelfData.Instance.ImageResUrl + AvatarId[8] + ".png";
		Name.url = SelfData.Instance.ImageResUrl + AvatarId[9] + ".png";
		GameTitle.url = SelfData.Instance.ImageResUrl + AvatarId[10] + ".png";

	}

	public OnRePlay() {
		SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		this.CallBack.apply(this.CallbackThis, [this._replayid]);
	}

	public OnCopy() {
		SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
		this.CopyStr(this._replayid.toString());
	}

	public CopyStr(str: string) {
		let copy: any = window.document.createElement("textarea");
		copy.textContent = str;
		copy.style.position = 'fixed';
		copy.style.top = '0';
		copy.style.left = '0';
		copy.style.opacity = '0';
		window.document.body.appendChild(copy);
		copy.select();
		document.execCommand('copy');

		window.document.body.removeChild(copy);
	}

}

class BuyItem {
	public ItemView: fairygui.GComponent;
	public ItemIndex: fairygui.GTextField;
	public ItemIcon: fairygui.GLoader;
	public ItemInfo: fairygui.GTextField;
	public ItemNeed: fairygui.GTextField;
	public ItemMoney: fairygui.GTextField;
	public ItemBnt: fairygui.GButton;
	public CallBack: Function;
	public CallbackThis: any;
	private _BuyID: number;
	private _Bet: number;
	private _BuyCost: number;
	private _NeedIcon: number;
	private _PlayTime: number;
	public CostNotEnough: boolean = false;

	public SetItemData(obj: fairygui.GComponent, _id: number, _bet: number, _cost: number, _need: number, _time: number, okFunc: Function, funcThis: any) {
		this.ItemView = obj;
		this._BuyID = _id;
		this._Bet = _bet;
		this._BuyCost = _cost;
		this._NeedIcon = _need;
		this._PlayTime = _time;
		this.CallBack = okFunc;
		this.CallbackThis = funcThis;
		this.CostNotEnough = SelfData.Instance.AccountData.Money < this._BuyCost;
		this.SetUI();
	}

	public SetUI() {
		this.ItemIndex = this.ItemView.getChild("Index").asTextField;
		this.ItemIndex.text = this._BuyID.toString();
		this.ItemIcon = this.ItemView.getChild("Icon").asLoader;
		this.ItemIcon.url = getFairyUIURL(SelfData.Instance.MainPackageName, SelfData.Instance.NeedIconNumber.toString(), false);
		this.ItemInfo = this.ItemView.getChild("info").asTextField;
		this.ItemInfo.text = LocalizationCommonTable.Get(10000019) + "\nX" + this._PlayTime.toString();
		this.ItemNeed = this.ItemView.getChild("Need").asTextField;
		this.ItemNeed.text = "x" + this._NeedIcon.toString();
		this.ItemMoney = this.ItemView.getChild("Money").asTextField;
		this.ItemMoney.text = toCoinToString(this._BuyCost);
		updateFontSize(this.ItemMoney, 19, 160);
		this.ItemBnt = this.ItemView.getChild("BuyBtn").asButton;
		this.ItemBnt.addClickListener(() => { this.BuyBonus(this._BuyID, this._BuyCost) }, this);
		this.ItemBnt.getChild("text").asLoader.url = getFairyUIURL("Slot_000_LobbyLoader", "buytxt_");
	}

	public UpdateCost(_cost: number, _bet: number) {
		this._BuyCost = _cost;
		this._Bet = _bet;
		this.CostNotEnough = SelfData.Instance.AccountData.Money < this._BuyCost;
		this.ItemMoney.text = toCoinToString(_cost);
		updateFontSize(this.ItemMoney, 19, 160);
	}

	protected async ProcessCostNotEnough() {
		let wait = true;
		RefreshBalanceController.Instance.RefreshBalanceTip = new RefreshBalanceTips();
		RefreshBalanceController.Instance.RefreshBalanceTip.ShowTip(() => {
			RefreshBalanceController.Instance.RefreshBalanceTip.ButtonEnable = false;
			RefreshBalanceController.Instance.NoMoneySyncMWSingleGetBalance = true;
			RefreshBalanceController.Instance.SendMWSingleGetBalanceRequest();
			wait = false;
		}, this);
		while (wait) await waitForSeconds(0.01);
		while (RefreshBalanceController.Instance.WaitMWSingleGetBalance) await waitForSeconds(0.01);
		this.CostNotEnough = SelfData.Instance.AccountData.Money < this._BuyCost;
		this.CallBack.apply(this.CallbackThis);
	}

	public async BuyBonus(_id: number, cost: number) {
		if (this.CostNotEnough) {
			await this.ProcessCostNotEnough();
		}
		else {
			var eventmoney: BuyBonusChangeBet = new BuyBonusChangeBet();
			eventmoney._BetID = this._Bet;
			EventManager.Instance.Send(eventmoney);

			SelfData.Instance.BuyBonusType = _id;
			var event: BuyFreeGameEvent = new BuyFreeGameEvent();
			SelfData.Instance.BuyMoney = cost;
			event.cost = SelfData.Instance.BuyMoney;
			event.isbuy = true;
			EventManager.Instance.Send(event);
			SelfData.Instance.IsBuyBonus = true;
			this.CallBack.apply(this.CallbackThis);
		}
	}
}

class BuyFreeGameEvent implements IEventUnit {
	public cost: number = 0;
	public isbuy: boolean = false;
	public GetEventName(): string {
		return "BuyFreeGameEvent";
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

class SendRankEvent implements IEventUnit {
	public Button: fairygui.GButton;
	public Index: number = 0;
	public Type: number = 0;
	public GetEventName(): string {
		return "SendRankEvent";
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