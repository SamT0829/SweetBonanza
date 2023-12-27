/**MW_基本視圖*/
class MW_BaseView extends FreeGameView {
	public _IsPlay: boolean = false;
	public _Sound_bgm_List: string[] = ["bigwin", "megawin", "supermegawin"];
	public _SlotWinFX_Name: string[] = ["bigwin", "big_mage", "all"];
	public _SkipWinFX_Name: string[] = ["bigwin2", "megawin", "supermegawin"];
	protected _showbigwinFX_obj: fairygui.GComponent = null;
	protected _bigwinType: BigWinType = BigWinType.None;
	protected _bigwinTime: number[] = [4, 8.5, 14];
	protected _bigwinParent: fairygui.GComponent = null;
	protected _bigwinMoney: number = 0;
	protected _megawinMoney: number = 0;
	protected _surpermegaMoney: number = 0;
	protected _bigWinFontSize = 30;
	protected _bigWinFontWidth = 560;

	/**創造大贏*/
	protected CreateBigWin() {
		this.BigWinBg = this.view.getChild("BigWinBg");
		this.BigWinObj = this.view.getChild("BoneCoin");
		if (this.BigWinObj == null) {
			this.BigWinObj = UIManager.Instance.ShowEffect("Slot_000_LobbyLoader", "BigWinCommon", true);
			this._bigwinParent = this.view.asCom._parent.asCom.getChild("lobbybar").asCom.getChild("BigWinParent").asCom;
			this._bigwinParent.addChild(this.BigWinObj);
		}
		if (this.BigWinObj == null)
			return;
		this._showbigwinFX_obj = this.BigWinObj.asCom.getChild("BigWin").asCom;
		this.BigWinCoinLable = this._showbigwinFX_obj.getChild("bigwin").asCom.getChild("coin").asTextField;
		this.BigWinObj.touchable = false;
		this.BigWinObj.visible = false;
		this._bigwinParent.visible = false;

		EventManager.Instance.RegisterEventListener(ClientEvent, this, this.SendBigWinSkip, ClientMsg.OnShowResultSkip);
	}

	protected async ShowBigWin(money: number) {
		// if (this.IsSkip)
		//     return;
		this._bigwinMoney = SelfData.Instance.BigWinRate * SelfData.Instance.PlaySetting.RunTotleBet;
		this._megawinMoney = SelfData.Instance.HugeWinRate * SelfData.Instance.PlaySetting.RunTotleBet;
		this._surpermegaMoney = SelfData.Instance.MegaWinRate * SelfData.Instance.PlaySetting.RunTotleBet;
		let type: BigWinType = SelfData.Instance.GetBigWinType(money);
		this._bigwinType = type;
		if (type !== BigWinType.None) {
			//避免得分按鈕卡住
			var e = new ClientEvent(ClientMsg.OnShowResultBegin);
			EventManager.Instance.Send(e);

			this._bigwinParent.visible = true;
			this.BigWinObj.visible = true;
			if (this.BigWinBg != null) this.BigWinBg.visible = true;
			await this.ShowBigWinFX(this.BigWinCoinLable, type, toCoin(money));
			this.BigWinObj.visible = false;
			this._bigwinParent.visible = false;
			if (this.BigWinBg != null) this.BigWinBg.visible = false;
		}
	}

	protected async ShowBigWinWithRangeMoney(money: number, range: number) {
		// if (this.IsSkip)
		//     return;
		this._bigwinMoney = SelfData.Instance.BigWinRate;
		this._megawinMoney =  SelfData.Instance.HugeWinRate;
		this._surpermegaMoney = SelfData.Instance.MegaWinRate;
		let type: BigWinType = SelfData.Instance.GetBigWinTypeWithRangeMoney(money, range);
		this._bigwinType = type;
		if (type !== BigWinType.None) {
			//避免得分按鈕卡住
			var e = new ClientEvent(ClientMsg.OnShowResultBegin);
			EventManager.Instance.Send(e);

			this._bigwinParent.visible = true;
			this.BigWinObj.visible = true;
			if (this.BigWinBg != null) this.BigWinBg.visible = true;
			await this.ShowBigWinFX(this.BigWinCoinLable, type, toCoin(money));
			this.BigWinObj.visible = false;
			this._bigwinParent.visible = false;
			if (this.BigWinBg != null) this.BigWinBg.visible = false;
		}
	}

	public SendBigWinSkip() {
		// let event = new ClientEvent(ClientMsg.OnShowResultSkip)
		// EventManager.Instance.Send(event);
		this.HideBigWin();
	}

	public async ShowBigWinFX(coinlable: fairygui.GTextField, m_type: BigWinType, coin: number) {
		this._IsPlay = true;
		
		this.BigWinObj.asCom.getTransition("W").play();
		
		UIManager.isSkipBigWin = false;
		let coinView = 3;
		//this._BigWinFont = coinlable;

		this.PlayBigWinFX(this.BigWinObj, m_type, coin);
		await this.PlayBigWinSE(m_type);
	}

	public async PlayBigWinFX(obj: fairygui.GObject, m_type: BigWinType, coin: number) {
		if (obj != null) {
			this._showbigwinFX_obj.getTransition(this._SlotWinFX_Name[m_type]).play();
			this.ShowBoneMoney(m_type, coin);
			await waitForSeconds(this._bigwinTime[m_type]);
			this._IsPlay = false;
		}
	}

	public async ShowBoneMoney(type: number, money: number) {
		//let soundType: number[] = [4, 2.25, 2.25];
		let _lengh = Math.round(money).toString().length;
		if (type == 1) {
			await NumberIncrementAni(this.BigWinCoinLable, 0, toCoin(this._megawinMoney), 4, 2, () => { return UIManager.isSkipBigWin }, this, true,this._bigWinFontSize, this._bigWinFontWidth);
			await NumberIncrementAni(this.BigWinCoinLable, toCoin(this._megawinMoney), money, 3, 2, () => { return UIManager.isSkipBigWin }, this, true, this._bigWinFontSize, this._bigWinFontWidth);
		}
		else if (type == 2) {
			await NumberIncrementAni(this.BigWinCoinLable, 0, toCoin(this._megawinMoney), 4, 2, () => { return UIManager.isSkipBigWin }, this, true, this._bigWinFontSize, this._bigWinFontWidth);
			await NumberIncrementAni(this.BigWinCoinLable, toCoin(this._megawinMoney), toCoin(this._surpermegaMoney), 5.5, 2, () => { return UIManager.isSkipBigWin }, this, true, this._bigWinFontSize, this._bigWinFontWidth);
			await NumberIncrementAni(this.BigWinCoinLable, toCoin(this._surpermegaMoney), money, 3, 2, () => { return UIManager.isSkipBigWin }, this, true, this._bigWinFontSize, this._bigWinFontWidth);
		}
		else {
			await NumberIncrementAni(this.BigWinCoinLable, 0, money, 2.5, 2, () => { return UIManager.isSkipBigWin }, this, true, this._bigWinFontSize, this._bigWinFontWidth);
		}

	}

	public async PlayBigWinSE(type: number) {
		let sound_time_List: number[] = [1, 1, 1];

		SoundManger.Instance.PlaySoundSE("allbigwin", false);
		//this.BigWinTypeSound(type);

		while (this._IsPlay) {
			await waitForSeconds(0.01);
		}
		await waitForSeconds(0.2);
		SoundManger.Instance.StopSoundSE("allbigwin");
		let _loop = SoundManger.Instance.PlaySoundSE("loop", true);
		let time = sound_time_List[type];
		let _volume = _loop.sound.volume();
		while (time > 0 && !UIManager.isSkipBigWin) {
			let lastTime: number = new Date().getTime();
			_loop.sound.volume(_volume -= 0.01);
			await waitForSeconds(0.01);
			let curTime: number = new Date().getTime();
			let deltaTime: number = curTime - lastTime;
			time -= (deltaTime / 1000);
		}
		if (UIManager.isSkipBigWin) {
			await waitForSeconds(1);
		}
		SoundManger.Instance.StopSoundSE("loop");
	}

	public async BigWinTypeSound(type: number) {
		if (type == 0) {
			let _se_big = SoundManger.Instance.PlaySoundSE(this._Sound_bgm_List[0], false);
		}
		else if (type == 1) {
			let _se_big = SoundManger.Instance.PlaySoundSE(this._Sound_bgm_List[0], false);
			await waitForSeconds(4);
			SoundManger.Instance.StopSoundSE(this._Sound_bgm_List[0]);
			let _se_mega = SoundManger.Instance.PlaySoundSE(this._Sound_bgm_List[1], false);
			await waitForSeconds(5.5);
		}
		else if (type == 2) {
			let _se_big = SoundManger.Instance.PlaySoundSE(this._Sound_bgm_List[0], false);
			await waitForSeconds(4);
			SoundManger.Instance.StopSoundSE(this._Sound_bgm_List[0]);
			let _se_mega = SoundManger.Instance.PlaySoundSE(this._Sound_bgm_List[1], false);
			await waitForSeconds(5.5);
			SoundManger.Instance.StopSoundSE(this._Sound_bgm_List[1]);
			let _se_sup = SoundManger.Instance.PlaySoundSE(this._Sound_bgm_List[2], false);
			await waitForSeconds(5.5);
		}
	}

	public async HideBigWin() {
		if (this._IsPlay) {
			if (UIManager.isSkipBigWin) return;
			UIManager.isSkipBigWin = true;
			this._showbigwinFX_obj.getTransition(this._SlotWinFX_Name[this._bigwinType]).stop();
			this._showbigwinFX_obj.getTransition(this._SkipWinFX_Name[this._bigwinType]).play();
			await waitForSeconds(1.5);
			this._IsPlay = false;
		}
	}

}