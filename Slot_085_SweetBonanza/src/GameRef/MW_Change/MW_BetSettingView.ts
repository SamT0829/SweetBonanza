class MW_BetSettingView extends IView {

	protected SlotBetTable: SlotBetTable;
	protected BetBtn: Array<FairyExButton>;
	protected BetBtnSelect: Array<FairyExButton>;
	protected BetInfo: Array<fairygui.GTextField>;
	protected MaxBet: FairyExButton;
	protected MaxBetSelect: FairyExButton;
	protected OKButton: FairyExButton;
	protected Close: FairyExButton;
	protected TotleBetText: fairygui.GTextField;
	protected BetArray: Array<number>;
	protected BetMaxIndex: number;
	protected OKCallback: Function;
	protected CancelCallback: Function;
	protected CallbackThis: any;
	protected ChooseBetIndex: number;

	protected GetResName(): string { return "SettingBet"; }
	protected Initialize() {
		this.BetArray = [];
		let scale = SelfData.Instance.PlaySetting.CurrencyScale;
		this.SlotBetTable = TableManager.Instance.GetTable(SlotBetTable);
		let betString = this.SlotBetTable.GetValue<string, string>(SelfData.Instance.TargetGame, SlotBetTable.m_Bet);
		let betArray = betString.split(",");
		betArray.forEach(bet => this.BetArray.push(parseInt(bet) * scale));
		this.BetMaxIndex = this.BetArray.length - 1;

		this.BetBtn = [];
		this.BetBtnSelect = [];
		this.BetInfo = [];
		for (let i = 0; i < 10; i++) {
			this.BetBtn.push(new FairyExButton(this.View.asCom.getChild("b" + i.toString()).asButton));
			this.BetBtnSelect.push(new FairyExButton(this.View.asCom.getChild("bs" + i.toString()).asButton));
			this.BetInfo.push(this.View.asCom.getChild("t" + i.toString()).asTextField);
			this.BetBtn[i].addClickListener(() => { this.OnBetSelect(i) }, this);
			this.BetBtn[i].visible = false;
			this.BetBtnSelect[i].visible = false;
			this.BetInfo[i].visible = false;
		}
		this.TotleBetText = this.View.asCom.getChild("Total_txt").asTextField;
		this.TotleBetText.visible = false;

		this.MaxBet = new FairyExButton(this.View.asCom.getChild("Max").asButton);
		this.MaxBet.addClickListener(this.OnMaxBetClick, this);

		this.MaxBetSelect = new FairyExButton(this.View.asCom.getChild("Max_select").asButton);
		this.MaxBetSelect.addClickListener(this.OnMaxBetClick, this);

		this.OKButton = new FairyExButton(this.View.asCom.getChild("Ok").asButton);
		this.OKButton.addClickListener(this.OnOKClick, this);

		this.Close = new FairyExButton(this.View.asCom.getChild("Close").asButton);
		this.Close.addClickListener(this.OnCloseClick, this);
		this.SetLoader();
	}

	public SetLoader(){
		let URLString = "ui://" + "Slot_000_LobbyLoader_" + LanguageType[SelfData.Instance.Language] + "/";
		this.View.asCom.getChild("titlebet").asLoader.url = URLString + "title_bet_" + LanguageType[SelfData.Instance.Language];
		this.View.asCom.getChild("setbet").asLoader.url = URLString + "setbet_" + LanguageType[SelfData.Instance.Language];
		this.View.asCom.getChild("maxtxt").asLoader.url = URLString + "maxtxt_" + LanguageType[SelfData.Instance.Language];
		this.View.asCom.getChild("confirm").asLoader.url = URLString + "confirm_" + LanguageType[SelfData.Instance.Language];
	}

	protected OnBetSelect(index: number) {
		for (let i = 0; i < this.BetArray.length; i++) {
			if (i != index) {
				this.BetBtn[i].visible = true;
				this.BetBtnSelect[i].visible = false;
			}
			else {
				this.BetBtn[i].visible = false;
				this.BetBtnSelect[i].visible = true;
			}
		}
		this.MaxBetSelect.visible = index == this.BetMaxIndex ? true : false;
		this.MaxBet.visible = index == this.BetMaxIndex ? false : true;
		this.ChooseBetIndex = index;
		// this.TotleBetText.text = toCoinToString(this.BetArray[this.ChooseBetIndex] *
		// 	SelfData.Instance.PlaySetting.CurrencyScale *
		// 	SelfData.Instance.PlaySetting.BetRate);
	}

	protected OnMaxBetClick(button: FairyExButton) {
		this.MaxBet.visible = button === this.MaxBetSelect;
		this.MaxBetSelect.visible = !this.MaxBet.visible;
		this.OnBetSelect(this.BetMaxIndex);
		// this.TotleBetText.text = toCoinToString(this.BetArray[this.ChooseBetIndex] *
		// 	SelfData.Instance.PlaySetting.CurrencyScale *
		// 	SelfData.Instance.PlaySetting.BetRate);
	}

	public OpenUI(betindex: number, okFunc: Function, cancelFunc: Function, funcThis: any) {
		this.OKCallback = okFunc;
		this.CancelCallback = cancelFunc;
		this.CallbackThis = funcThis;
		for (let b = 0; b < this.BetArray.length; b++) {
			this.BetBtn[b].visible = true;
			this.BetBtnSelect[b].visible = true;
			this.BetInfo[b].text = toCoinToString_CurrencyBet(this.BetArray[b] *
			SelfData.Instance.PlaySetting.BetRate*SelfData.Instance.PlaySetting.MultiplyValue);
			updateFontSize(this.BetInfo[b], 12, 96);
			this.BetInfo[b].visible = true;
		}
		this.OnBetSelect(betindex);
		this.Visible = true;
	}

	protected OnOKClick() {
		this.OKCallback.apply(this.CallbackThis, [this.ChooseBetIndex]);
		this.View.visible = false;
	}

	protected OnCloseClick() {
		this.View.visible = false;
	}
}

//SelfData.Instance.PlaySetting.Bet = this.Controller.BetArray[this.Controller.BetIndex] / SelfData.Instance.PlaySetting.CurrencyScale;
//this.BetText.text = toCoinToString(SelfData.Instance.PlaySetting.TotleBet * SelfData.Instance.PlaySetting.MultiplyValue);