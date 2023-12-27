/**MW 自動設置視圖*/
class MW_AutoSettingView extends AutoSettingView {
	protected first: boolean = true;
	protected GetResName(): string { return "AutoPanel"; }
	public MoreSettingButton: FairyExButton;
	public _moresetting: boolean = false;
	public BalanceIncreasesAddButton: FairyExButton;
	public BalanceIncreasesSubtractButton: FairyExButton;
	public BalanceDecreasesAddButton: FairyExButton;
	public BalanceDecreasesSubtractButton: FairyExButton;
	public BalanceIncreasesText: fairygui.GTextField;
	public BalanceDecreasesText: fairygui.GTextField;
	public BalanceIncreases: Array<number> = [];
	public BalanceDecreases: Array<number> = [];
	public BalanceIncreasesIndex: number = 0;
	public BalanceDecreasesIndex: number = 0;

	public UserAutoSpinType: string;

	public BalanceIncreasesUseName: string;
	public BalanceDecreasesUseName: string;
	public UserAutoSpinTypeUseName: string;

	public BalanceIncreasesKey: string = "BalanceIncreases";
	public BalanceDecreasesKey: string = "BalanceDecreases";
	public UserAutoSpinTypeKey: string = "UserAutoSpinType";

	public UserAutoSpinTypeMap: Dictionary;

	protected Initialize() {
		this.Setting = new AutoPlaySetting();
		this.Setting.TotalRound = -1;
		this.BalanceIncreases = [];
		this.BalanceDecreases = [];
		this.BalanceIncreasesKey = "BalanceIncreases";
		this.BalanceDecreasesKey = "BalanceDecreases";
		this.UserAutoSpinTypeKey = "UserAutoSpinType";
		this.UserAutoSpinTypeMap = new Dictionary([]);
		this.FastX3Button = new FairyExButton(this.View.asCom.getChild("FastButtonSelect").asButton);
		this.FastX3Button.NormalEnabled = false;
		this.FastX3Button.addClickListener(() => this.OnFastRadioClick(this.FastX3Button), this);
		this.FastX3Button.visible = false;

		this.FastX3ButtonGray = new FairyExButton(this.View.asCom.getChild("FastButton").asButton);
		this.FastX3ButtonGray.NormalEnabled = false;
		this.FastX3ButtonGray.addClickListener(() => this.OnFastRadioClick(this.FastX3ButtonGray), this);
		this.FastX3ButtonGray.visible = false;

		this.Auto30Button = new FairyExButton(this.View.asCom.getChild("Auto0_Select").asButton);
		//this.Auto30Button.addClickListener(() => this.OnAutoRunRadioClick(null), this);
		this.Auto30Button.NormalEnabled = false;
		this.Auto30Button.visible = false;

		this.Auto30ButtonGray = new FairyExButton(this.View.asCom.getChild("Auto0").asButton);
		this.Auto30ButtonGray.NormalEnabled = false;
		this.Auto30ButtonGray.addClickListener(() => this.OnAutoRunRadioClick(this.Auto30ButtonGray), this);
		this.Auto30ButtonGray.visible = false;
		this.UserAutoSpinTypeMap.add("auto30", this.Auto30ButtonGray);

		this.Auto50Button = new FairyExButton(this.View.asCom.getChild("Auto1_Select").asButton);
		//this.Auto50Button.addClickListener(() => this.OnAutoRunRadioClick(null), this);
		this.Auto50Button.NormalEnabled = false;
		this.Auto50Button.visible = false;

		this.Auto50ButtonGray = new FairyExButton(this.View.asCom.getChild("Auto1").asButton);
		this.Auto50ButtonGray.NormalEnabled = false;
		this.Auto50ButtonGray.addClickListener(() => this.OnAutoRunRadioClick(this.Auto50ButtonGray), this);
		this.Auto50ButtonGray.visible = false;
		this.UserAutoSpinTypeMap.add("auto50", this.Auto50ButtonGray);

		this.Auto100Button = new FairyExButton(this.View.asCom.getChild("Auto2_Select").asButton);
		//this.Auto100Button.addClickListener(() => this.OnAutoRunRadioClick(null), this);
		this.Auto100Button.NormalEnabled = false;
		this.Auto100Button.visible = false;

		this.Auto100ButtonGray = new FairyExButton(this.View.asCom.getChild("Auto2").asButton);
		this.Auto100ButtonGray.NormalEnabled = false;
		this.Auto100ButtonGray.addClickListener(() => this.OnAutoRunRadioClick(this.Auto100ButtonGray), this);
		this.Auto100ButtonGray.visible = false;
		this.UserAutoSpinTypeMap.add("auto100", this.Auto100ButtonGray);

		this.AutoUnlimitButton = new FairyExButton(this.View.asCom.getChild("Autolimit_Select").asButton);
		//this.AutoUnlimitButton.addClickListener(() => this.OnAutoRunRadioClick(null), this);
		this.AutoUnlimitButton.NormalEnabled = false;
		this.AutoUnlimitButton.visible = false;

		this.AutoUnlimitButtonGray = new FairyExButton(this.View.asCom.getChild("Autolimit").asButton);
		this.AutoUnlimitButtonGray.NormalEnabled = false;
		this.AutoUnlimitButtonGray.addClickListener(() => this.OnAutoRunRadioClick(this.AutoUnlimitButtonGray), this);
		this.AutoUnlimitButtonGray.visible = false;
		this.UserAutoSpinTypeMap.add("autoUnlimit", this.AutoUnlimitButtonGray);

		// this.UntilBonusButton = new FairyExButton(this.View.asCom.getChild("BonusStop_Select").asButton);
		// this.UntilBonusButton.NormalEnabled = false;
		// this.UntilBonusButton.addClickListener(this.OnUntilBonus, this);
		// this.UntilBonusButton.visible = false;

		// this.UntilBonusButtonGray = new FairyExButton(this.View.asCom.getChild("BonusStop").asButton);
		// this.UntilBonusButtonGray.NormalEnabled = false;
		// this.UntilBonusButtonGray.addClickListener(this.OnUntilBonus, this);
		// this.UntilBonusButtonGray.visible = false;

		this.BalanceIncreasesAddButton = new FairyExButton(this.View.asCom.getChild("UpperLimitAdd").asButton);
		this.BalanceIncreasesAddButton.NormalEnabled = false;
		this.BalanceIncreasesAddButton.addClickListener(this.OnBalanceIncreasesAdd, this);

		this.BalanceIncreasesSubtractButton = new FairyExButton(this.View.asCom.getChild("UpperLimitSubtract").asButton);
		this.BalanceIncreasesSubtractButton.NormalEnabled = false;
		this.BalanceIncreasesSubtractButton.addClickListener(this.OnBalanceIncreasesSubtract, this);

		this.BalanceDecreasesAddButton = new FairyExButton(this.View.asCom.getChild("LowerLimitAdd").asButton);
		this.BalanceDecreasesAddButton.NormalEnabled = false;
		this.BalanceDecreasesAddButton.addClickListener(this.OnBalanceDecreasesAdd, this);

		this.BalanceDecreasesSubtractButton = new FairyExButton(this.View.asCom.getChild("LowerLimitSubtract").asButton);
		this.BalanceDecreasesSubtractButton.NormalEnabled = false;
		this.BalanceDecreasesSubtractButton.addClickListener(this.OnBalanceDecreasesSubtract, this);

		this.BalanceIncreasesText = this.View.asCom.getChild("upperlimitText").asTextField;
		this.BalanceDecreasesText = this.View.asCom.getChild("lowerlimitText").asTextField;

		this.OKButton = new FairyExButton(this.View.asCom.getChild("OKButton").asButton);
		this.OKButton.NormalEnabled = false;
		this.OKButton.addClickListener(this.OnOKClick, this);

		this.XButton = this.View.asCom.getChild("Close").asButton;
		this.XButton.addClickListener(this.OnCancelClick, this);
		this.UserAutoSpinType = localStorageGetItem(this.UserAutoSpinTypeKey);
		this.SetLoader();
		//this.Reset();
	}

	public SetLoader(){
		let URLString = "ui://" + "Slot_000_LobbyLoader_" + LanguageType[SelfData.Instance.Language] + "/";
		this.View.asCom.getChild("title_autoplay").asLoader.url = URLString + "title_autoplay_" + LanguageType[SelfData.Instance.Language];
		this.View.asCom.getChild("time").asLoader.url = URLString + "time_" + LanguageType[SelfData.Instance.Language];
		this.View.asCom.getChild("morethan").asLoader.url = URLString + "morethan_" + LanguageType[SelfData.Instance.Language];
		this.View.asCom.getChild("lessthan").asLoader.url = URLString + "lessthan_" + LanguageType[SelfData.Instance.Language];
		this.View.asCom.getChild("quickspin").asLoader.url = URLString + "quickspin_" + LanguageType[SelfData.Instance.Language];
		this.View.asCom.getChild("autoplay").asLoader.url = URLString + "autoplay_" + LanguageType[SelfData.Instance.Language];
	}

	public SetMiscTable() {
		let miscStr = TableManager.Instance.GetTable(MiscDataTable);
		if (miscStr != null) {
			let rates = miscStr.GetValue("BalanceIncreases").split(",");
			for (let i = 0; i < rates.length; i++) {
				this.BalanceIncreases.push(parseInt(rates[i]) * SelfData.Instance.PlaySetting.CurrencyScale);
			}
		}
		if (miscStr != null) {
			let waitTimes = miscStr.GetValue("BalanceDecreases").split(",");
			for (let i = 0; i < waitTimes.length; i++) {
				this.BalanceDecreases.push(parseInt(waitTimes[i]) * SelfData.Instance.PlaySetting.CurrencyScale);
			}
		}
	}

	protected Reset() {
		this.Setting = new AutoPlaySetting();
		this.Setting.IsFastX3 = SelfData.Instance.PlaySetting.IsFastX3;

		this.FastX3Button.visible = SelfData.Instance.PlaySetting.IsFastX3;
		this.FastX3ButtonGray.visible = !this.FastX3Button.visible;
		this.BalanceIncreasesUseName = "";
		this.UserAutoSpinTypeUseName = "";
		this.BalanceDecreasesUseName = "";
		this.OnAutoRunRadioClick(null);

		this.ClearAdvSetting();
		this.SetMiscTable();
		let CreditUpper = localStorageGetItem(this.BalanceIncreasesKey) != null ? parseInt(localStorageGetItem(this.BalanceIncreasesKey)) : 0;
		let CreditLower = localStorageGetItem(this.BalanceDecreasesKey) != null ? parseInt(localStorageGetItem(this.BalanceDecreasesKey)) : 0;
		this.SetButtonNumber(AutoRunAdvType.CreditUpperLimit, CreditUpper);
		this.SetButtonNumber(AutoRunAdvType.CreditLowerLimit, CreditLower);
	}

	public OpenUI(okFunc: Function, cancelFunc: Function, funcThis: any) {
		this.OKCallback = okFunc;
		this.CancelCallback = cancelFunc;
		this.CallbackThis = funcThis;
		this.UserAutoSpinType = localStorageGetItem(this.UserAutoSpinTypeKey);
		this.Reset();
		if (this.UserAutoSpinType != null)
			this.OnAutoRunRadioClick(this.UserAutoSpinTypeMap[this.UserAutoSpinType]);
		else
			this.OnAutoRunRadioClick(this.Auto50ButtonGray);
		this.Visible = true;
	}

	protected OnOKClick() {
		this.Setting.LowerLimitMoney = toCoin(SelfData.Instance.AccountData.Money) - this.BalanceDecreases[this.BalanceDecreasesIndex];
		this.Setting.CheckLowerLimitMoney = this.BalanceDecreases[this.BalanceDecreasesIndex] > 0 ? true : false;
		this.Setting.UpperLimitMoney = toCoin(SelfData.Instance.AccountData.Money) + this.BalanceIncreases[this.BalanceIncreasesIndex];
		this.Setting.CheckUpperLimitMoney = this.BalanceIncreases[this.BalanceIncreasesIndex] > 0 ? true : false;
		if ((this.Setting.CheckLowerLimitMoney && toCoin(SelfData.Instance.AccountData.Money) <= this.Setting.LowerLimitMoney) || (this.Setting.CheckUpperLimitMoney && toCoin(SelfData.Instance.AccountData.Money) >= this.Setting.UpperLimitMoney)) {
			this.Visible = false;
			return;
		}
		localStorageSetItem(this.UserAutoSpinTypeKey, this.UserAutoSpinTypeUseName);
		if (this.BalanceIncreasesUseName != "")
			localStorageSetItem(this.BalanceIncreasesKey, this.BalanceIncreasesUseName);
		if (this.BalanceDecreasesUseName != "")
			localStorageSetItem(this.BalanceDecreasesKey, this.BalanceDecreasesUseName);
		super.OnOKClick();
	}

	protected ClearAdvSetting() {
		this.Setting.IsUntilBonus = false;
		//this.UntilBonusButton.visible = false;
		//this.UntilBonusButtonGray.visible = true;

		this.Setting.CheckSingleWinMoney = false;

		this.Setting.CheckUpperLimitMoney = false;

		this.Setting.CheckLowerLimitMoney = false;

	}

	protected OnFastRadioClick(button: FairyExButton) {
		this.FastX3Button.visible = button === this.FastX3ButtonGray;
		this.FastX3ButtonGray.visible = !this.FastX3Button.visible;
		this.Setting.IsFastX3 = this.FastX3Button.visible;
	}


	protected OnAutoRunRadioClick(button: FairyExButton) {
		this.Auto30Button.visible = button === this.Auto30ButtonGray;
		this.Auto50Button.visible = button === this.Auto50ButtonGray;
		this.Auto100Button.visible = button === this.Auto100ButtonGray;
		this.AutoUnlimitButton.visible = button === this.AutoUnlimitButtonGray;
		this.Auto30ButtonGray.visible = !this.Auto30Button.visible;
		this.Auto50ButtonGray.visible = !this.Auto50Button.visible;
		this.Auto100ButtonGray.visible = !this.Auto100Button.visible;
		this.AutoUnlimitButtonGray.visible = !this.AutoUnlimitButton.visible;
		this.Setting.IsUnlimitRound = false;
		if (this.Auto30Button.visible) {
			this.Setting.TotalRound = 30;
			this.Setting.IsUntilBonus = true;
			this.UserAutoSpinTypeUseName = "auto30";
		}
		else if (this.Auto50Button.visible) {
			this.Setting.TotalRound = 50;
			this.Setting.IsUntilBonus = true;
			this.UserAutoSpinTypeUseName = "auto50";
		}
		else if (this.Auto100Button.visible) {
			this.Setting.TotalRound = 100;
			this.Setting.IsUntilBonus = true;
			this.UserAutoSpinTypeUseName = "auto100";
		}
		else if (this.AutoUnlimitButton.visible) {
			this.Setting.TotalRound = 0;
			this.Setting.IsUntilBonus = true;
			this.Setting.IsUnlimitRound = true;
			this.UserAutoSpinTypeUseName = "autoUnlimit";
		}
	}

	protected OnUntilBonus() {
		//this.UntilBonusButton.visible = !this.UntilBonusButton.visible;
		//this.UntilBonusButtonGray.visible = !this.UntilBonusButton.visible;
		this.Setting.IsUntilBonus = this.UntilBonusButton.visible;
	}

	protected SetButtonNumber(type: AutoRunAdvType, number: number) {

		if (type == AutoRunAdvType.CreditUpperLimit) {
			this.BalanceIncreasesIndex = number;
			this.BalanceIncreasesText.text = this.BalanceIncreases[this.BalanceIncreasesIndex].toFixed(2);
		}
		else if (type == AutoRunAdvType.CreditLowerLimit) {
			this.BalanceDecreasesIndex = number;
			this.BalanceDecreasesText.text = this.BalanceDecreases[this.BalanceDecreasesIndex].toFixed(2);
		}
	}

	public OnBalanceIncreasesAdd() {
		if (this.BalanceIncreases.length > 0) {
			this.BalanceIncreasesIndex++;
			if (this.BalanceIncreasesIndex > this.BalanceIncreases.length - 1) {
				this.BalanceIncreasesIndex = 0;
			}
		}
		this.Setting.UpperLimitMoney = toCoin(SelfData.Instance.AccountData.Money) + this.BalanceIncreases[this.BalanceIncreasesIndex];
		this.BalanceIncreasesText.text = this.BalanceIncreases[this.BalanceIncreasesIndex].toFixed(2);
		this.Setting.CheckUpperLimitMoney = this.BalanceIncreases[this.BalanceIncreasesIndex] > 0 ? true : false;
		this.BalanceIncreasesUseName = this.BalanceIncreasesIndex.toString();
	}

	public OnBalanceIncreasesSubtract() {
		if (this.BalanceIncreases.length > 0) {
			this.BalanceIncreasesIndex--;
			if (this.BalanceIncreasesIndex < 0) {
				this.BalanceIncreasesIndex = this.BalanceIncreases.length - 1;
			}
		}
		this.Setting.UpperLimitMoney = toCoin(SelfData.Instance.AccountData.Money) + this.BalanceIncreases[this.BalanceIncreasesIndex];
		this.BalanceIncreasesText.text = this.BalanceIncreases[this.BalanceIncreasesIndex].toFixed(2);
		this.Setting.CheckUpperLimitMoney = this.BalanceIncreases[this.BalanceIncreasesIndex] > 0 ? true : false;
		this.BalanceIncreasesUseName = this.BalanceIncreasesIndex.toString();
	}

	public OnBalanceDecreasesAdd() {
		if (this.BalanceDecreases.length > 0) {
			this.BalanceDecreasesIndex++;
			if (this.BalanceDecreasesIndex > this.BalanceDecreases.length - 1) {
				this.BalanceDecreasesIndex = 0;
			}
		}
		this.Setting.LowerLimitMoney = toCoin(SelfData.Instance.AccountData.Money) - this.BalanceDecreases[this.BalanceDecreasesIndex];
		this.BalanceDecreasesText.text = this.BalanceDecreases[this.BalanceDecreasesIndex].toFixed(2);
		this.Setting.CheckLowerLimitMoney = this.BalanceDecreases[this.BalanceDecreasesIndex] > 0 ? true : false;
		this.BalanceDecreasesUseName = this.BalanceDecreasesIndex.toString();
	}

	public OnBalanceDecreasesSubtract() {
		if (this.BalanceDecreases.length > 0) {
			this.BalanceDecreasesIndex--;
			if (this.BalanceDecreasesIndex < 0) {
				this.BalanceDecreasesIndex = this.BalanceDecreases.length - 1;
			}
		}
		this.Setting.LowerLimitMoney = toCoin(SelfData.Instance.AccountData.Money) - this.BalanceDecreases[this.BalanceDecreasesIndex];
		this.BalanceDecreasesText.text = this.BalanceDecreases[this.BalanceDecreasesIndex].toFixed(2);
		this.Setting.CheckLowerLimitMoney = this.BalanceDecreases[this.BalanceDecreasesIndex] > 0 ? true : false;
		this.BalanceDecreasesUseName = this.BalanceDecreasesIndex.toString();
	}
}