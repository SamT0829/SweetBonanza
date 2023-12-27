class CrownAutoSettingView extends AutoSettingView {
	protected first: boolean = true;

	protected Initialize() {
		super.Initialize();
		this.Reset();
		this.Auto30Button.removeClickListener();
		this.Auto50Button.removeClickListener();
		this.Auto100Button.removeClickListener();
		this.AutoUnlimitButton.removeClickListener();

	}
	public OpenUI(okFunc: Function, cancelFunc: Function, funcThis: any) {
		this.OKCallback = okFunc;
		this.CancelCallback = cancelFunc;
		this.CallbackThis = funcThis;
		if (this.first) {
			this.first = false;
			this.OnAutoRunRadioClick(this.AutoUnlimitButtonGray);
		}
		this.Visible = true;
	}

	protected OnOKClick() {
		if ((this.Setting.CheckLowerLimitMoney && toCoin(SelfData.Instance.AccountData.Money) <= this.Setting.LowerLimitMoney) || (this.Setting.CheckUpperLimitMoney && toCoin(SelfData.Instance.AccountData.Money) >= this.Setting.UpperLimitMoney)) {
			this.Visible = false;
			return;
		}
		super.OnOKClick();
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
		if (this.Auto30Button.visible)
			this.Setting.TotalRound = 30;
		else if (this.Auto50Button.visible)
			this.Setting.TotalRound = 50;
		else if (this.Auto100Button.visible)
			this.Setting.TotalRound = 100;
		else if (this.AutoUnlimitButton.visible) {
			this.Setting.TotalRound = 0;
			this.Setting.IsUnlimitRound = true;
		}
	}
}