/**中獎特效視圖*/
class CrownBaseView extends BaseView {
	protected Coin_BigWin: dragonBones.EgretArmatureDisplay = null;
	protected Coin_MegaWin: dragonBones.EgretArmatureDisplay = null;
	protected nowCoinBone: dragonBones.EgretArmatureDisplay = null;

	protected Coin_Spread: dragonBones.EgretArmatureDisplay = null;

	protected Thunder: dragonBones.EgretArmatureDisplay = null;
	protected Thunder_shadow: dragonBones.EgretArmatureDisplay = null;
	protected Thunder_clip_thunder: dragonBones.EgretArmatureDisplay = null;
	protected Thunder_tex_effect: dragonBones.EgretArmatureDisplay = null;

	public _BigWinBone: dragonBones.EgretArmatureDisplay = null;

	public _BoneName: string = "supermegawinmov";
	public _ThunderName: string = "thunder";
	public _Coin_Name: string = "coin_bigwin";
	public _Coin_SpreadName: string = "coin_spread";

	public _ThunderArmature_clip_thunder: string = "clip_thunder";
	public _ThunderArmature_shadow: string = "shadow";
	public _ThunderArmature_thunder: string = "thunder";
	public _ThunderArmature_tex_effect: string = "tex_effect";

	public _Coin_BigArmature: string = "coin_bigwin";
	public _Coin_MegaArmature: string = "coin_megawin";
	public _Coin_SpreadArmature: string = "coin_spread";


	public _BigWinArmature: string = "super_mega_win";

	public _Thunder_clip_thunderAni: string = "clip_thunder";
	public _Thunder_shadowAni: string = "shadow";
	public _Thunder_thunderAni: string = "thunder";
	public _Thunder_tex_effectAni: string = "tex_effect";

	public _CoinWin: string[] = ["in", "loop", "out"];
	public _CoinWinSpread: string[] = ["in", "loop", "out"];
	public _SlotWinArmatures: string[] = ["bigwin", "megawin", "super_megawin"];

	public _Sound_bgm_List: string[] = ["bigwin", "megawin", "supermegawin"];
	//public _Sound_os_List: string[] = ["win_os_1", "win_os_2", "win_os_3"];
	//public _Sound_coin_List: string[] = ["coin_main_win", "coin_main_win01"];
	public _BoneNameList: string[] = [];
	public _BoneObj: dragonBones.EgretArmatureDisplay = null;
	public _BigWinFont: fairygui.GTextField = null;
	public _IsSpread = false;
	public _IsPlay: boolean = false;
	private _type: number = 0;
	private _coin: number = 0;
	private _obj: egret.DisplayObjectContainer = null;

	/**顯示大贏*/
	protected async ShowBigWin(money: number) {

		let type: BigWinType = SelfData.Instance.GetBigWinType(money);					//獲得大贏特效條件
		if (type !== BigWinType.None) {
			//避免得分按鈕卡住
			var e = new ClientEvent(ClientMsg.OnShowResultBegin);
			EventManager.Instance.Send(e);

			this.BigWinObj.visible = true;
			if (this.BigWinBg != null) this.BigWinBg.visible = true;
			await this.ShowBigWinFX(this.BigWinDisplayObjectContainer, this.BigWinCoinLable, type, toCoin(money));
			this.BigWinObj.visible = false;
			if (this.BigWinBg != null) this.BigWinBg.visible = false;
		}
	}

	/**創造大贏*/
	protected CreateBigWin() {

		this.BigWinObj = this.view.getChild("BoneCoin");																//獲取 BoneCoin 包
		if (this.BigWinObj == null) {
			this.BigWinObj = UIManager.Instance.ShowEffect(SelfData.Instance.CommonPackageName, "BoneCoin", true); 		//獲取 BoneCoin 特效
			this.view.addChild(this.BigWinObj);																			//畫面獲取 BoneCoin 特效
		}
		if (this.BigWinObj == null)
			return;
		this.BigWinObj.sortingOrder = ZOrder.eLobbyBar + 100		//默認情況下（當sortingOrder==0時），添加到組件的對象由添加的roder排列。排序順序越大，對象越靠前。
		this.BigWinDisplayObjectContainer = <egret.DisplayObjectContainer>this.BigWinObj.asCom.getChild("BoneTarget").displayObject;	//Big Win 顯示對象容器 (Loader)
		this.BigWinCoinLable = this.BigWinObj.asCom.getChild("coin").asTextField;														//Big Win 顯示大贏字串 (Text)
		this.BigWinCoinLable.sortingOrder = ZOrder.eLobbyBar + 110;	//默認情況下（當sortingOrder==0時），添加到組件的對象由添加的roder排列。排序順序越大，對象越靠前。
		this.BigWinObj.touchable = false;
		this.BigWinObj.visible = false;

		this.BigWinDisplayBg = this.BigWinObj.asCom.getChild("bg");

		EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnBigWinSkip, ClientMsg.OnShowResultSkip);
	}

	/**顯示骨錢*/
	public async ShowBoneMoney(type: number, money: number) {
		this._BigWinFont.text = "";
		this._BigWinFont.visible = true;
		let soundType: number[] = [1.5, 1.5, 1.5];
		let _lengh = Math.round(money).toString().length; 	//返回提供的數字表達式，四捨五入到最接近的數字。
		let _moneyLengh = Math.pow(10, _lengh - 1);			//pow 返回取指定冪的基本表達式的值。
		let trans = this._BigWinFont.parent.asCom.getTransition("t0");
		if (trans != null) {
			trans.play();
		}
		await NumberIncrementAni(this._BigWinFont, _moneyLengh, money, soundType[type], 2, () => { return UIManager.isSkipBigWin }, this);

	}

	/**跳過大贏*/
	public async SkipBigWin() {
		if (UIManager.isSkipBigWin) return;
		UIManager.isSkipBigWin = true;
		await waitForSeconds(2);
		this.HideBone();
	}

	/**顯示大贏龍骨*/
	public async ShowBigWinFX(obj: egret.DisplayObjectContainer, coinlable: fairygui.GTextField, m_type: BigWinType, coin: number) {
		this._IsPlay = true;
		UIManager.isSkipBigWin = false;
		let coinView = 3;
		this._BigWinFont = coinlable;

		this.ShowBone(obj, m_type, coin);
		await this.PlayBigWinSE(this._type);
	}

	public async PlayBigWinSE(type: number) {
		let sound_time_List: number[] = [1, 1, 1];

		//SoundManger.Instance.PlaySoundSE(this._Sound_os_List[type]);
		let _se = SoundManger.Instance.PlaySoundSE(this._Sound_bgm_List[type], false);

		while (this._IsPlay) {
			await waitForSeconds(0.01);
		}
		await waitForSeconds(0.8);
		SoundManger.Instance.StopSoundSE(this._Sound_bgm_List[type]);
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
			await waitForSeconds(2);
		}
		SoundManger.Instance.StopSoundSE("loop");
		this.HideBone();
	}

	public async ShowSpreadCoin() {
		this.Coin_Spread.animation.play(this._CoinWinSpread[0], 1);
		this.Coin_Spread.visible = true;
	}

	/**顯示龍骨特效*/
	public async ShowBone(obj: egret.DisplayObjectContainer, m_type: BigWinType, coin: number) {
		this._type = m_type;
		this._coin = coin;
		this._obj = obj;

		if (this.Thunder_shadow == null) {
			this.Thunder_shadow = UIManager.Instance.AddDragonBonesModel(obj, this._ThunderName, this._ThunderArmature_shadow);
		}
		if (this.Thunder_clip_thunder == null) {
			this.Thunder_clip_thunder = UIManager.Instance.AddDragonBonesModel(obj, this._ThunderName, this._ThunderArmature_clip_thunder);			
		}

		this.Thunder_shadow.animation.play(this._Thunder_shadowAni, 1);
		// Add animation custom event listener. 自訂事件
		this.Thunder_shadow.addEvent(dragonBones.EventObject.FRAME_EVENT, this.ThunderShadow, this)	//动画帧事件。dragonBones.EventObject.FRAME_EVENT 新版本//动画帧事件。dragonBones.EgretEvent.FRAME_EVENT舊版本 
	}

	public async ThunderShadow(evt: dragonBones.FrameEvent) {	//FrameEvent 舊版本 //EgretEvent 新版本
		if (evt.eventObject.name == "show") {					//在 MovieClipEvent.FRAME_LABEL 事件中，event对应的字符串。show 事件名稱  (evt.eventObject.name 事件名稱 新版本)
			this.Thunder_clip_thunder.animation.play(this._Thunder_clip_thunderAni, 1);
			this.Thunder_clip_thunder.addEvent(dragonBones.EventObject.FRAME_EVENT, this.ThunderClipThunder, this);
		}
		
		if (evt.eventObject.name == "stop") {
			this.Thunder_shadow.animation.stop(this._Thunder_shadowAni);
			//await waitForSeconds(3);
			//this.Thunder_shadow.animation.gotoAndPlayByFrame(this._Thunder_shadowAni, 61, 1);
		}
	}

	public async ThunderClipThunder(evt: dragonBones.FrameEvent) {
		if (evt.frameLabel == "show") {
			if (this.Coin_Spread == null) {
				this.Coin_Spread = UIManager.Instance.AddDragonBonesModel_Texture(this._obj, this._Coin_SpreadName, this._Coin_SpreadArmature, 3);
				this.Coin_Spread.visible = false;
			}
			// if (this._type > 1) {
			// 	this._IsSpread = true;
			// 	this.ShowSpreadCoin();
			// }
			else {
				this._IsSpread = false;
				if (this.Coin_Spread != null) {
					this.Coin_Spread.visible = false;
				}
			}
			if (this.Coin_BigWin == null) {
				this.Coin_BigWin = UIManager.Instance.AddDragonBonesModel_Texture(this._obj, this._Coin_Name, this._Coin_BigArmature, 3);
				this.Coin_BigWin.y += 60;
				this.Coin_BigWin.visible = false;
			}
			if (this.Coin_MegaWin == null) {
				this.Coin_MegaWin = UIManager.Instance.AddDragonBonesModel_Texture(this._obj, this._Coin_Name, this._Coin_MegaArmature, 3);
				this.Coin_MegaWin.y += 60;
				this.Coin_MegaWin.visible = false;
			}
			if (this._type == BigWinType.BigWin) {
				this.nowCoinBone = this.Coin_BigWin;
				this.Coin_BigWin.animation.play(this._CoinWin[0], 1);
				this.Coin_BigWin.visible = true;
				this.Coin_BigWin.addEvent(dragonBones.EventObject.FRAME_EVENT, this.CoinLoopAni, this);
			}
			else {
				this.nowCoinBone = this.Coin_MegaWin;
				this.Coin_MegaWin.animation.play(this._CoinWin[0], 1);
				this.Coin_MegaWin.visible = true;
				this.Coin_MegaWin.addEvent(dragonBones.EventObject.FRAME_EVENT, this.CoinLoopAni, this);
			}

			if (this.Thunder == null) {
				this.Thunder = UIManager.Instance.AddDragonBonesModel(this._obj, this._ThunderName, this._ThunderArmature_thunder);
			}
			if (this._BigWinBone == null) {
				this._BigWinBone = UIManager.Instance.AddDragonBonesModel(this._obj, this._BoneName, this._BigWinArmature);
			}
			if (this.Thunder_tex_effect == null) {
				this.Thunder_tex_effect = UIManager.Instance.AddDragonBonesModel(this._obj, this._ThunderName, this._ThunderArmature_tex_effect);
			}

			this._BigWinBone.animation.play(this._SlotWinArmatures[this._type], 1);
			this._BigWinBone.visible = true;
			this._BigWinBone.addEvent(dragonBones.EgretEvent.FRAME_EVENT, this.BigWinStopAni, this);
			this.Thunder_tex_effect.animation.play(this._Thunder_tex_effectAni, 1);

			ShakeTool.Instance.shakeObj(this.view.displayObject, 0.5, 12, 15);
		}
		if (evt.frameLabel == "thunder") {
			if (this._type > 1) {
				this._IsSpread = true;
				this.ShowSpreadCoin();
			}
			this.ShowBoneMoney(this._type, this._coin);
			this.Thunder.animation.play(this._Thunder_thunderAni, 1);
			this.Thunder.visible = true;
			this.Thunder.addEvent(dragonBones.EventObject.FRAME_EVENT, this.ThunderAni, this);
		}
	}

	public async BigWinStopAni(evt: dragonBones.FrameEvent) {
		if (evt.frameLabel == "stop") {
			this._BigWinBone.animation.stop(this._SlotWinArmatures[this._type]);
			//await waitForSeconds(3);
			//this._BigWinBone.animation.gotoAndPlayByFrame(this._SlotWinArmatures[this._type], 61, 1);
		}
	}

	public async ThunderAni(evt: dragonBones.FrameEvent) {
		if (evt.frameLabel == "stop") {
			this.Thunder.animation.stop(this._Thunder_thunderAni);
			await waitForSeconds(2);
			this._BigWinBone.animation.gotoAndPlayByFrame(this._SlotWinArmatures[this._type], 61, 1);				//从指定帧开始播放指定的动画
			this.Thunder_shadow.animation.gotoAndPlayByFrame(this._Thunder_shadowAni, 61, 1);
			this.Thunder.animation.gotoAndPlayByFrame(this._Thunder_thunderAni, 61, 1);
			this._IsPlay = false;
		}
	}

	public async CoinLoopAni(evt: dragonBones.FrameEvent) {
		if (evt.frameLabel == "loop") {
			this.nowCoinBone.animation.stop(this._CoinWin[0]);
			this.nowCoinBone.animation.play(this._CoinWin[1]);
			if (this._IsSpread) {
				this.Coin_Spread.animation.stop(this._CoinWinSpread[0]);
				this.Coin_Spread.animation.play(this._CoinWinSpread[1]);
			}
			await waitForSeconds(2.3);
			if (this._IsSpread) {
				this.Coin_Spread.animation.stop(this._CoinWinSpread[1]);
				this.Coin_Spread.animation.play(this._CoinWinSpread[2], 1);
			}
			this.nowCoinBone.animation.stop(this._CoinWin[1]);
			this.nowCoinBone.animation.play(this._CoinWin[2], 1);
		}
	}

	/**隱藏骨頭*/
	public async HideBone() {
		if (this._BigWinBone != null)
			this._BigWinBone.visible = false;
		if (this.Thunder != null)
			this.Thunder.visible = false;
		if (this.Coin_BigWin != null)
			this.Coin_BigWin.visible = false;
		if (this.Coin_MegaWin != null)
			this.Coin_MegaWin.visible = false;
		if (this.Coin_Spread != null)
			this.Coin_Spread.visible = false;
		// for (let i = 0; i < this._Sound_os_List.length - 1; i++) {
		// 	SoundManger.Instance.StopSoundSE(this._Sound_os_List[i]);
		// 	SoundManger.Instance.StopSoundSE(this._Sound_bgm_List[i]);
		// }
		//SoundManger.Instance.StopSoundSE(this._Sound_coin_List[0]);
		//SoundManger.Instance.StopSoundSE(this._Sound_coin_List[1]);
		// if (this._BoneList[BigWinType.Coin] != null && this._BoneList[BigWinType.Coin].visible)  // COIN
		// 	this._BoneList[BigWinType.Coin].visible = false;
		if (this._BigWinFont != null && this._BigWinFont.visible) {
			this._BigWinFont.visible = false;
			this._BigWinFont.text = "";
		}
	}

	/**播放循環 SE*/
	public PlayLoopSE(soundId: number, name: string): void {
		SoundManger.Instance.PlaySoundSE("loop", true);
		return;
	}
}