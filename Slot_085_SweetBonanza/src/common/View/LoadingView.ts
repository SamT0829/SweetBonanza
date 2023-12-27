declare function DisableAPNGLogo();
declare function APNGLogoChangeUI();
declare function APNGLogoChangeSwitchUI();
declare function setAPNG(url: string);

class LoadingView extends UIWindowBase {
	public stage: egret.Stage = null;

	protected _bg: fairygui.GLoader;
	protected _logo: MyGLoader;
	protected _progress: fairygui.GProgressBar;
	protected _group: fairygui.GGroup;
	protected _bg_height: number = 1820;

	protected resizeEventID: number = 0;

	protected LoadingViewPackageName = "Slot_000_ICashCrownCommon";
	protected LoadingViewCompomentName = "LoadingView_parent";
	protected UI_LoadingInfoName = "info";
	protected UI_LoadingBarProgressName = "bar";
	protected UI_LogoName = "logo";

	protected loadingInfo: fairygui.GTextField;
	protected LoadingObj: fairygui.GObject = null;
	public constructor(name: string) {
		super(name);
	}

	public Initialize() {

	}

	protected RemovePreloadingObj() {
		let ids = ["preloading"];
		for (let i = 0; i < ids.length; i++) {
			let obj = document.getElementById(ids[i]);
			if (obj)
				obj.parentNode.removeChild(obj);
		}
	}

	protected RemoveLogoObj() {
		let ids = ["logo"];
		for (let i = 0; i < ids.length; i++) {
			let obj = document.getElementById(ids[i]);
			if (obj)
				obj.parentNode.removeChild(obj);
		}
	}


	/**顯示加載*/
	public async ShowLoading() {
		await TableManager.Instance.CreateTable(GameTipTable);
		UIManager.Instance.Initialize(this.stage);
		this.stage.addEventListener(egret.Event.RESIZE, this.resize, this);
		this.RemovePreloadingObj();

		fairygui.UIPackage.addPackage(this.LoadingViewPackageName);

		this.resizeEventID = EventManager.Instance.RegisterEventListener(StageResizeEvent, this, this.onResize);
		EventManager.Instance.RegisterEventListener(ClientEvent, this, this.HideApng, ClientMsg.HideApng);
		// let event = new StageResizeEvent();
		// event.IsPortrait = SelfData.Instance.IsPortrait;

		// this.onResize(event);

		let UIwindow = UIManager.Instance.ShowWindow(this.LoadingViewPackageName, this.LoadingViewCompomentName, this, ShowWindowParam.eTopframe, true);
		UIwindow.View.sortingOrder = ZOrder.eLoading;
		this.LoadingObj = this.View.asCom.getChild("LoadingView");
		this.loadingInfo = this.LoadingObj.asCom.getChild(this.UI_LoadingInfoName).asTextField;
		let table = TableManager.Instance.GetTable(GameTipTable);
		if (table != null) {
			this.loadingInfo.text = GameTipTable.GetLoadingTip();
		}
		// progress bar
		this._progress = this.LoadingObj.asCom.getChild(this.UI_LoadingBarProgressName).asProgress;
		this._progress.value = 0;

		this._logo = <MyGLoader>(this.LoadingObj.asCom.getChild(this.UI_LogoName).asLoader);
		if (SelfData.Instance.UrlParam_LogoUrl != "") {
			this._logo.visible = true;
			this._logo.url = SelfData.Instance.UrlParam_LogoUrl;
		}
		else {

			if (SelfData.Instance.IsNewLogo) {
				this._logo.visible = false;
				setAPNG("../animated.png");
				if (SelfData.Instance.WindowSwitch)
					APNGLogoChangeSwitchUI();
				else
					APNGLogoChangeUI();
				//this._logo.url = "ui://" + "Slot_000_ICashCrownCommon" + "/" + "loading_logo";
			}
			else {
				this._logo.visible = true;
				this._logo.url = "ui://" + "Slot_000_ICashCrownCommon" + "/" + "MW_logo";
			}
		}

		this.resize();

		this.ProcessProgress();
	}

	protected onResize(event: StageResizeEvent): void {
		if (SelfData.Instance.WindowSwitch) {
			if (window.innerWidth >= window.innerHeight) {
				this.View.asCom.getTransition("t0").play();
			}
			else {
				this.View.asCom.getTransition("t1").play();
			}
			APNGLogoChangeSwitchUI();
		}
		else{
			APNGLogoChangeUI();
		}
		// this._group.visible = event.IsPortrait;

		// if ( event.IsPortrait )
		// {
		// 	let stageH = egret.MainContext.instance.stage.stageHeight;
		// 	this._group.y = (stageH - this._bg_height)/2 ;
		// }
	}

	public GetUIName(): string {
		return this.Name;
	}

	public OnUndo(): boolean {
		this.OnClose();

		return false;
	}

	public HideApng(){
		DisableAPNGLogo();
	}

	public async Hide() {
		while (this.nowProgress < 100) {
			await waitForSeconds(0.01);
			this.isEnd = true;
			if (this.nowProgress < 66) this.nowProgress += 1;
			else this.nowProgress += 10;

			if (this.nowProgress >= 100)
				this.nowProgress = 100;
			this.SetProgressValue(this.nowProgress);
		}
		await waitForSeconds(0.3);
		DisableAPNGLogo();
		super.Hide();
		SelfData.Instance.LoadingViewHide = true;
	}

	public Update(): void {

	}

	public UnRegisterEvent(): void {
		EventManager.Instance.UnregisterEventListener(this.resizeEventID);
	}

	public SetProgressValue(value: number): void {
		if (this._progress)
			this._progress.value = value;
	}

	public SetProgress(current: number, total: number): void {
		var pro = UIManager.Instance.GetPercent(current, total);
		if (pro >= 100) {
			this.targetProgress = 100;
		}
		else
			this.targetProgress = pro;
	}

	private targetProgress: number = 0;
	private nowProgress: number = 0;
	private isEnd: boolean = false;
	protected async ProcessProgress() {
		let changeTipTime: number = 0;
		while (true) {
			if (this.isEnd) break;
			let waitTime: number = 0.01;
			let addValue: number = 1;
			if (this.nowProgress < 30) waitTime = 0.25;
			else if (this.nowProgress < 40) waitTime = 0.5;
			else if (this.nowProgress < 50) waitTime = 0.75;
			else if (this.nowProgress < 60) waitTime = 1;
			else if (this.nowProgress < 70) waitTime = 2;
			else if (this.nowProgress < 80) waitTime = 3;
			else if (this.nowProgress < 90) waitTime = 5;
			else waitTime = 10;

			await this.waitForSeconds(waitTime);

			if (this.isEnd) break;
			if (this.nowProgress < this.targetProgress) {
				this.nowProgress += addValue;
				this.SetProgressValue(this.nowProgress);
			}

			changeTipTime += waitTime;
			if (this.nowProgress > 0 && changeTipTime > 10) {
				let table = TableManager.Instance.GetTable(GameTipTable);
				if (table != null) {
					this.loadingInfo.text = GameTipTable.GetLoadingTip();
					changeTipTime = 0;
				}
			}
		}
	}

	private async waitForSeconds(time: number) {
		let timeTemp = time;
		while (!this.isEnd && timeTemp > 0) {
			let lastTime: number = new Date().getTime();
			await waitForSeconds(0.01);
			let curTime: number = new Date().getTime();
			let deltaTime: number = curTime - lastTime;
			timeTemp -= (deltaTime / 1000);
		}
	}

	public resize($e?): void {
		fairyguiResize();

		// let rate = window.innerWidth / window.innerHeight;
		// if (rate > 0.85) {
		// 	this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
		// 	SelfData.Instance.IsPortrait = false;
		// 	fairygui.GRoot.inst.displayObject.y = 0;
		// }
		// else {
		// 	this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
		// 	SelfData.Instance.IsPortrait = true;
		// }

		// let event: StageResizeEvent = new StageResizeEvent();
		// event.IsPortrait = SelfData.Instance.IsPortrait;
		// EventManager.Instance.Send(event);
	}
}