class CrownLobbyBarView extends LobbyBarView {
	public static lobbyPakeageName = "Slot_000_CrownLobbyBar";
	public static paytableInfoView: PayTableInfoView = null;
	protected static AutoSpecialRoundBG: fairygui.GObject = null;
	protected static AutoUnlimitRoundSign: fairygui.GObject = null;
	protected CreditCurrency: fairygui.GTextField;

	protected Initialize() {
		this.SetMessageSetting(22, 635);
		this.SetBetSetting(30,130);
		super.Initialize();

		CrownLobbyBarView.AutoSpecialRoundBG = this.View.asCom.getChild("sign_infinityBG");
		CrownLobbyBarView.AutoSpecialRoundBG.visible = false;
		CrownLobbyBarView.AutoUnlimitRoundSign = this.StopAutoButton.asCom.getChild("sign_infinity");
		CrownLobbyBarView.AutoUnlimitRoundSign.visible = false;

		this.CreditCurrency = this.View.asCom.getChild("CreditCurrency").asTextField;
		this.CreditCurrency.text = "";

		//this.InfoButton.addClickListener(this.OnInfo, this);
		// if(SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode)
		// 	this.getGameTitle();
	}

	protected InitAutoSettView() {
		this.AutoSettingView = new CrownAutoSettingView(this.View);
		this.AutoSettingView.Visible = false;
	}

	protected async OnInfo() {
		//this.ClosePopupView();
		await this.checkResourceLoadOnBackgroundComplete();
		if (CrownLobbyBarView.paytableInfoView == null) {
			var Info = fairygui.UIPackage.createObject(CrownLobbyBarView.lobbyPakeageName, "Info").asCom;
			fairygui.GRoot.inst.addChild(Info)
			CrownLobbyBarView.paytableInfoView = new PayTableInfoView(Info);
			Info.sortingOrder = ZOrder.eTip + 100;
		}
		CrownLobbyBarView.paytableInfoView.Open();
	}

	protected OnStopAutoRun() {
		super.OnStopAutoRun();
		CrownLobbyBarView.AutoSpecialRoundBG.visible = false;
	}

	public UpdateAutoCountText() {
		if (SelfData.Instance.PlaySetting.AutoSetting.IsUntilBonus)
			CrownLobbyBarView.AutoSpecialRoundBG.visible = true;
		if (SelfData.Instance.PlaySetting.AutoSetting.IsUnlimitRound) {
			this.AutoCountText.visible = false;
			CrownLobbyBarView.AutoUnlimitRoundSign.visible = true;
			//this.AutoCountText.text = (SelfData.Instance.PlaySetting.AutoSetting.TotalRound + 1).toString();
		}
		else {
			this.AutoCountText.visible = true;
			CrownLobbyBarView.AutoUnlimitRoundSign.visible = false;

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
		if (!(SelfData.Instance.PlaySetting.IsAuto && CrownLobbyBarView.AutoSpecialRoundBG.visible))
			CrownLobbyBarView.AutoSpecialRoundBG.visible = false;
	}

	public ResetPlayButton() {
		super.ResetPlayButton();
		if (!(SelfData.Instance.PlaySetting.IsAuto && CrownLobbyBarView.AutoSpecialRoundBG.visible))
			CrownLobbyBarView.AutoSpecialRoundBG.visible = false;
	}


	async getGameTitle() {
		// let gameID = GameType[SelfData.Instance.TargetGame]
		// await waitForFlage(() => { return GameNameTable.GameNameDict.containsKey(gameID) })
		// document.title = "iFa-" + GameNameTable.GameNameDict[gameID];
	}

}