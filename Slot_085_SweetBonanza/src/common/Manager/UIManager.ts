enum ShowWindowParam {
	eNone = 0,
	eMask = 1,
	eBack = 2,
	eTopframe = 4,
	eMenu = 8,
	eHas3DObject = 16,
	eBlockMenu = 32,
	eBackground = 64,
}

enum WindowType {
	LobbyBar,
	NormalPanel,
	DownLoadPanel,
	Dialog,
	Loading,
	Performance,
	Settings,
}

enum ZOrder {
	eConnectAnimation = 50,
	eLoading = 99,
	eLobbyBar = 500,
	ePerformance = 550,
	eDialog = 600,
	eTip = 700,
}

enum BigWinType {
	None = -1,
	BigWin = 0,
	MegaWin = 1,
	SuperWin = 2,
	Coin = 3,
}

enum LocalizationKey {
	ErrorCode = 90000,
	SubErrorCode = 100000,
}

class UIManager {
	private readonly _windowDialogPackage = "Common";
	private readonly _windowDialogName = "WindowDialog";

	private _stage: egret.Stage;
	public get Stage(): egret.Stage { return this._stage; }
	private _windowList = new Array<UIWindowBase>();
	private _closingWindowList = new Array<string>();
	private _repeatWindowList = [this._windowDialogName];
	private _uiPackageList = new Array<string>();

	private _uiMask: UIWindowBase;
	private _blockMenuIndex = 0;

	private readonly depthBuffer = 15;
	private readonly depth = 120;
	private BigWinPointY: number = -9999;

	private _imParam = new Dictionary([]);  // <ShowWindowParam, IWindowParam>

	private _errorAudio = null;
	//private _errorNotReload: Array<ErrorCode> = [ErrorCode.GameUnsufficentMoney];

	/** BigWinDragonBone */
	private _BigWinArmature: dragonBones.EgretArmatureDisplay = null;
	private _MegaWinArmature: dragonBones.EgretArmatureDisplay = null;
	private _SuperWinArmature: dragonBones.EgretArmatureDisplay = null;
	private _SperWinCoinArmature: dragonBones.EgretArmatureDisplay = null;

	public _BoneList: dragonBones.EgretArmatureDisplay[] = [this._BigWinArmature, this._MegaWinArmature, this._SuperWinArmature, this._SperWinCoinArmature];
	public _BoneName: string = "slot_win";
	public _ArmatureName: string = "slot_win_armatureName";
	public _SlotWinArmatures: string[] = ["slot_win_bigwin_show", "slot_win_megawin_show", "slot_win_superwin_show", "slot_win_jinbi_xialuo"];
	public _Sound_bgm_List: string[] = ["win_bgm_1", "win_bgm_2", "win_bgm_3"];
	public _Sound_os_List: string[] = ["win_os_1", "win_os_2", "win_os_3"];
	public _Sound_coin_List: string[] = ["coin_main_win", "coin_main_win01"];
	public _BoneNameList: string[] = [];
	public _BoneObj: dragonBones.EgretArmatureDisplay = null;
	public _BigWinFont: fairygui.GTextField = null;
	public _BigWinPosY: number = 125;
	public _BigWinSoundType: number[] = [3, 3, 14];
	public _BigWinPlayTime: number[] = [4, 4, 2]
	public get BoneList() {
		return this._BoneList;
	}

	private static _instance: UIManager;
	public static get Instance(): UIManager {
		if (this._instance == null) {
			this._instance = new UIManager();
		}
		return this._instance;
	}

	public constructor() {

	}

	public Initialize(stage: egret.Stage) {
		this._stage = stage;
		this._stage.addChild(fairygui.GRoot.inst.displayObject);
	}

	public ShowErrorWindow(title: string, errorCode: number, fn: Function, fnObject: any, parent: UIWindowBase = null): MessageTips {
		let event_hide = new ClientEvent(ClientMsg.HideApng);
		EventManager.Instance.Send(event_hide);
		let message = new MessageTips();
		//let tableKey = LocalizationKey.ErrorCode + errorCode;
		let text = LocalizationCommonTable.Get(errorCode);
		text = text.format(title);
		message.CreateTips();
		if (fn == null)
			message.ShowTips(LocalizationCommonTable.Get(1002), text + "\r\n\r\n" + "Error Code : " + errorCode, () => { closeWindow(); }, fnObject);
		else
			message.ShowTips(LocalizationCommonTable.Get(1002), text + "\r\n\r\n" + "Error Code : " + errorCode,()=>{ fn(); closeWindow(); }, fnObject);
		SelfData.Instance.PlaySetting.ShowError = true;
		if (this._errorAudio == null) {

		}
		if (!fn && !fnObject) {
			fn = () => {
				// SelfData.ConnectionClose = true;
				// GameSoundManager.Instance.PauseBGM();
				// GameSoundManager.Instance.SetBGMOpen(false);
				// GameSoundManager.Instance.SetSoundOpen(false);
				// UIManager.Instance.HideAllWindow();
				// WebView.DestroyAll();
				// let obj = UIManager.Instance.ShowEffect("Common", "ConnectClose", true);
				// var text: fairygui.GTextField = obj.asCom.getChild("Text").asTextField;
				// text.text = LocalizationCommonTable.Get(10024);
				// fairygui.GRoot.inst.addChild(obj);
				//if (this._errorNotReload.indexOf(errorCode) == -1) {
				//	window['pageReload']();
				//}
			}
			fnObject = this;
		}

		// process message content
		//ar tableKey = LocalizationKey.ErrorCode + errorCode;
		// var textcontent = LocalizationCommonTable.Get(LocalizationKey.ErrorCode + errorCode); //////////////////////////////deal table
		// if (textcontent == tableKey.toString()) {
		// 	textcontent = LocalizationCommonTable.Get(LocalizationKey.ErrorCode);
		// }
		// var codecontent = LocalizationCommonTable.Get(10039) + " " + errorCode;
		// if (subErrorCode)
		// {
		// 	tableKey = LocalizationKey.SubErrorCode + subErrorCode;
		// 	textcontent = LocalizationCommonTable.Get(tableKey);
		// 	if (textcontent == tableKey.toString()) {
		// 		textcontent = LocalizationCommonTable.Get(LocalizationKey.SubErrorCode);
		// 	}
		// 	codecontent += "-" + leftPad(subErrorCode, 4);
		// }

		//var uiWindow = null;///////////this.ShowMessage("", title, textcontent, codecontent, fn, fnObject, parent);
		return message;
	}

	public ShowTip(info: string): MessageTips {
		let message = new MessageTips();
		message.CreateTips();
		message.ShowTips("", info);
		return message;
	}

	public ShowMessage(OK: string, Title: string, Content: string, ContentBR: string, fn: Function, fnObject: any, parent: UIWindowBase = null): WindowDialog {
		var uiWindow = new WindowDialog(this._windowDialogName);
		this.ShowWindow(this._windowDialogPackage, this._windowDialogName, uiWindow, ShowWindowParam.eTopframe, false, parent, WindowType.Dialog);

		//uiWindow.Depth = this.depth + ZOrder.eDialog;
		uiWindow.InitMessage(OK, Title, Content, ContentBR, fn, fnObject);

		return uiWindow;
	}

	public ShowErrorMessage(OK: string, Title: string, Content: string, fn: Function, fnObject: any, parent: UIWindowBase = null): WindowDialog {
		if (this._errorAudio == null) {
			//errorAudioClip = Resources.Load("Sound/All_Error") as AudioClip;
		}

		var uiWindow = this.ShowMessage(OK, Title, Content, "", fn, fnObject, parent);
		return uiWindow;
	}

	public ShowDialog(OK: string, Cancel: string, Title: string, Content: string,
		fnOK: Function, fnOKObject: any, fnCancel: Function, fnCancelObject: any, parent: UIWindowBase = null): WindowDialog {
		var uiWindow = new WindowDialog(this._windowDialogName);
		this.ShowWindow(this._windowDialogPackage, this._windowDialogName, uiWindow, ShowWindowParam.eTopframe, false, parent, WindowType.Dialog);

		//uiWindow.Depth = this.depth + ZOrder.eDialog;
		uiWindow.InitDialog(OK, Cancel, Title, Content, fnOK, fnCancel, fnOKObject, fnCancelObject);

		return uiWindow;
	}

	public ShowWindow(packageName: string, resName: string, uiWindow: UIWindowBase, param: ShowWindowParam, fullSize: boolean, parent: UIWindowBase = null,
		windowType: WindowType = WindowType.NormalPanel) {
		var uiName = uiWindow.Name;//this.GenerateUIName(packageName, resName);

		if (this.CheckOpenWindow(uiName)) {
			// check stageInit
			if (!fairygui.GRoot.inst.displayObject.parent && this._stage) {
				this._stage.addChild(fairygui.GRoot.inst.displayObject);
			}

			// instantiate object
			this.AddNewUIPackage(packageName);
			if (uiWindow) {
				uiWindow.UIRoot = fairygui.GRoot.inst;
				uiWindow.View = fairygui.UIPackage.createObject(packageName, resName);
				if (fullSize) {
					uiWindow.View.setSize(uiWindow.UIRoot.width, uiWindow.UIRoot.height);
				}
				uiWindow.UIRoot.addChild(uiWindow.View);

				// init window
				uiWindow.WindowType = windowType;
				uiWindow.Param = param;
				uiWindow.Initialize();

				// insert new window
				if (parent) {
					uiWindow.Parent = parent;
					var idx = this._windowList.indexOf(parent);
					this._windowList.splice(idx + 1, 0, uiWindow);
					this.SortWindow();
					var lastWindow = this.LastWindow();
					this.SetWindowParam(lastWindow, lastWindow.Param, lastWindow.Depth);
				}
				else {
					if (this._windowList.length > 0) {
						var preWindow = this.LastWindow();
						uiWindow.Parent = preWindow;
					}

					uiWindow.Depth = this._windowList.length * this.depthBuffer + this.depth;
					this._windowList.push(uiWindow);
					this.SetWindowParam(uiWindow, uiWindow.Param, uiWindow.Depth);
				}

				// setup close/destroy function
				uiWindow.OnCloseCallback.add(() => {
					if (this._windowList.indexOf(uiWindow) > -1) {
						this._windowList.splice(this._windowList.indexOf(uiWindow), 1);
					}
					if (!uiWindow.RemoveOnClose) {
						if (this._closingWindowList.indexOf(uiName) == -1) {
							this._closingWindowList.push(uiName);
						}
					}

					this.SortWindow();
					this.HideMask(uiWindow);

					var window = this.LastWindow();
					if (window != null) {
						window.Show();
						this.MaskDepth(window.GetMaskDepth());
						//_MaskSortOrder(window.m_Panel.sortingOrder,window.m_Panel.useSortingOrder);
						//_MaskZOrder(window.transform.localPosition.z);
					}
				}, this);

				uiWindow.OnDestroyCallback.add(() => {
					if (this._windowList.indexOf(uiWindow) > -1) {
						this._windowList.splice(this._windowList.indexOf(uiWindow), 1);
					}
					if (this._closingWindowList.indexOf(uiName) > -1) {
						this._closingWindowList.splice(this._closingWindowList.indexOf(uiName), 1);
					}
					if (uiWindow.Parent) {
						uiWindow.Parent.OnSubWindowDestroy();
					}
				}, this);

				uiWindow.DoDestroy = () => {
					uiWindow = null;
					this.UpdateChildrenIndex();
				};
				return uiWindow;
			}

			// update index for display order
			this.UpdateChildrenIndex();
		}
		return null;
	}

	/**顯示效果(利用fairygui顯示效果)*/
	public ShowEffect(packageName: string, resName: string, fullSize: boolean, fxParticleName: string = ""): fairygui.GObject {
		this.AddNewUIPackage(packageName);
		var obj = fairygui.UIPackage.createObject(packageName, resName);
		if (obj == null)
			return null;

		var effect = obj.asCom;

		if (fullSize) {
			effect.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);							//重新設定大小
		}

		if (fxParticleName != "") {
			packageName = fxParticleName;
		}

		if (SelfData.Instance.FXParticle.containsKey(packageName) &&
			SelfData.Instance.FXParticle[packageName].FXMap.containsKey(resName)) {
			var fxUnit = SelfData.Instance.FXParticle[packageName].FXMap[resName];
			for (let par of fxUnit.particles) {
				for (var i = 0; i < par.loaders.length; i++) {
					var texture = ResManager.Instance.GetResource(par.textureName[i] + "_png");
					var config = ResManager.Instance.GetResource(par.name + "_json");
					var inst = new particle.GravityParticleSystem(texture, config);
					inst.stop();
					var displayContainer = <egret.DisplayObjectContainer>(effect.getChild(par.loaders[i]).displayObject);
					displayContainer.addChild(inst);
					// reset emitter position
					inst.emitterX = 0;
					inst.emitterY = 0;

					if (par.delay[i] > 0) {
						egret.setTimeout(() => inst.start(), this, par.delay[i]);
					}
					else {
						inst.start();
					}
				}
			}
		}
		return effect;
	}

	public RegisterParam(param: ShowWindowParam, WindowParam: IWindowParam) {
		this._imParam[param] = WindowParam;
		for (var i = 0, max = this._windowList.length; i < max; i++) {
			this.SetWindowParam(this._windowList[i], this._windowList[i].Param, this._windowList[i].Depth);
		}
	}

	public CleanStage() {
		for (var i = this._windowList.length - 1; i >= 0; i--) {
			this._windowList[i].OnClose();
			this._windowList[i] = null;
		}

		this._windowList.length = 0;
		this.ClearAllPackage();
		this.UpdateChildrenIndex();
	}

	public InToScene() {


	}

	public HideAllWindow() {
		for (var i = this._windowList.length - 1; i >= 0; i--) {
			this._windowList[i].Hide();
		}
	}


	public GetPercent(num, total): number {
		num = parseFloat(num);
		total = parseFloat(total);
		if (isNaN(num) || isNaN(total)) {
			return 0;
		}
		return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00);
	}

	public LastWindow(): UIWindowBase {
		if (this._windowList.length > 0) {
			return this._windowList[this._windowList.length - 1];
		}
		return null;
	}

	//一般项目中创建一个dragonbones工厂就可以了
	private factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();

	/**添加龍骨模型*/
	public AddDragonBonesModel(Ploader: egret.DisplayObjectContainer, BoneName: string, ArmatureName: string = ""): dragonBones.EgretArmatureDisplay {
		let DragonBonesData = this.factory.getDragonBonesData(BoneName);		//获取特定的 DragonBonesData 实例 
		//动画数据加入到工厂中 
		if (DragonBonesData == null) {											//是否有 DragonBonesData 实例 
			//this.factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(ResManager.Instance.GetResource(BoneName + "_ske")));	//将 DragonBonesData 实例缓存到工厂中。舊版本		
			this.factory.addDragonBonesData(this.factory.parseDragonBonesData(ResManager.Instance.GetResource(BoneName + "_ske")));	//将 DragonBonesData 实例缓存到工厂中。新版本		
		}
		
		let TextureAtlasData = this.factory.getTextureAtlasData(BoneName);//獲取原始贴图集数据和贴图集对象解析为 TextureAtlasData 实例
		if (TextureAtlasData == null) {
			//将原始贴图集数据和贴图集对象解析为 TextureAtlasData 实例，并缓存到工厂中
			let tmp = this.factory.parseTextureAtlasData(ResManager.Instance.GetResource(BoneName + "_tex_json"), ResManager.Instance.GetResource(BoneName + "_tex_png"));	//加载动画文件 。新版本
			//let tmp = new dragonBones.EgretTextureAtlas(ResManager.Instance.GetResource(BoneName + "_tex_png"), ResManager.Instance.GetResource(BoneName + "_tex_json"));	//加载动画文件。舊版本	
			this.factory.addTextureAtlasData(tmp);			//将 TextureAtlasData 实例缓存到工厂中。  * @param data - TextureAtlasData 实例。
		}
		if (ArmatureName == "") {
			ArmatureName = BoneName;
		}

		//过缓存的 DragonBonesData 实例和 TextureAtlasData 实例创建一个骨架
		var armatureDisplay: dragonBones.EgretArmatureDisplay = this.factory.buildArmatureDisplay(ArmatureName);	//从工厂中取出动画 拷贝一个动画数据
		Ploader.addChild(armatureDisplay);																			//获取动画的显示加入到绘制的父类容器中
		return armatureDisplay;
	}

	public AddDragonBonesModel_Texture(Ploader: egret.DisplayObjectContainer, BoneName: string, ArmatureName: string = "", _texture: number): dragonBones.EgretArmatureDisplay {
		let DragonBonesData = this.factory.getDragonBonesData(BoneName);
		if (DragonBonesData == null) {
			this.factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(ResManager.Instance.GetResource(BoneName + "_ske")));
		}

		let TextureAtlasData = this.factory.getTextureAtlas(BoneName);
		if (TextureAtlasData == null) {
			for (let i = 0; i < _texture; i++) {
				let tmp = new dragonBones.EgretTextureAtlas(ResManager.Instance.GetResource(BoneName + "_tex_" + i.toString() + "_png"),
				 ResManager.Instance.GetResource(BoneName + "_tex_" + i.toString() + "_json"));
				this.factory.addTextureAtlasData(tmp);
			}
		}
		if (ArmatureName == "") {
			ArmatureName = BoneName;
		}
		var armatureDisplay: dragonBones.EgretArmatureDisplay = this.factory.buildArmatureDisplay(ArmatureName);
		Ploader.addChild(armatureDisplay);
		return armatureDisplay;
	}

	public AddParticle(Ploader: egret.DisplayObjectContainer, textureName: string, jsonName: string, delay: number): particle.GravityParticleSystem {
		var texture = ResManager.Instance.GetResource(textureName + "_png");
		var config = ResManager.Instance.GetResource(jsonName + "_json");
		var inst = new particle.GravityParticleSystem(texture, config);
		Ploader.addChild(inst);
		// reset emitter position
		inst.emitterX = 0;
		inst.emitterY = 0;
		inst.stop();
		if (delay > 0) {
			egret.setTimeout(() => inst.start(), this, delay * 1000);
		}
		else {
			inst.start();
		}
		return inst;
	}

	public async ShowBoneMoney(type: number, money: number, time: number = 0.3) {
		this._BigWinFont.text = "";
		this._BigWinFont.visible = true;
		SoundManger.Instance.PlaySoundSE(this._Sound_coin_List[0], true);
		await NumberIncrementAni(this._BigWinFont, 0, money, this._BigWinSoundType[type], 2, () => { return UIManager.isSkipBigWin }, this);
		SoundManger.Instance.StopSoundSE(this._Sound_coin_List[0]);
		//if (!this.isSkipBigWin)
		SoundManger.Instance.PlaySoundSE(this._Sound_coin_List[1]);
		//this._BigWinFont.text = money.toFixed(2);
	}
	static isSkipBigWin = false;
	public async SkipBigWin() {
		if (UIManager.isSkipBigWin) return;
		UIManager.isSkipBigWin = true;
		await waitForSeconds(0.5);
		this.HideBone();
	}

	public async ShowBigWin(obj: egret.DisplayObjectContainer, coinlable: fairygui.GTextField, m_type: BigWinType, coin: number) {
		UIManager.isSkipBigWin = false;
		let coinView = 3;
		this._BigWinFont = coinlable;
		//await waitForSeconds(2);
		if (m_type > 1) {
			this.ShowBone(obj, coinView);
		}
		this.ShowBone(obj, m_type);
		this.ShowBoneMoney(m_type, coin);
		await this.PlayBigWinSE(m_type);
	}

	private async PlayBigWinSE(type: number) {

		SoundManger.Instance.PlaySoundSE(this._Sound_os_List[type]);
		SoundManger.Instance.PlaySoundSE(this._Sound_bgm_List[type], true);

		let time = this._BigWinSoundType[type] * this._BigWinPlayTime[type];
		while (time > 0 && !UIManager.isSkipBigWin) {
			let lastTime: number = new Date().getTime();
			await waitForSeconds(0.01);
			let curTime: number = new Date().getTime();
			let deltaTime: number = curTime - lastTime;
			time -= (deltaTime / 1000);
		}
		if (UIManager.isSkipBigWin)
			await waitForSeconds(0.5);
		this.HideBone();
	}

	/**顯示骨骼動畫*/
	public async ShowBone(obj: egret.DisplayObjectContainer, m_type: BigWinType) {

		let slot_win_armatureName: string = this._ArmatureName;
		if (this._BoneList[m_type] == null) {
			this._BoneList[m_type] = UIManager.Instance.AddDragonBonesModel(obj, this._BoneName, slot_win_armatureName);
		}
		if (m_type !== 3) {
			this._BoneList[m_type].visible = true;
			this._BoneList[m_type].animation.play(this._SlotWinArmatures[m_type], 1);
		}
		else {
			this._BoneList[BigWinType.Coin].visible = true;
			this._BoneList[m_type].animation.play(this._SlotWinArmatures[m_type], 0);
			if (this.BigWinPointY == -9999) {
				this.BigWinPointY = this._BoneList[m_type].y + this._BigWinPosY;
			}
			this._BoneList[m_type].y = this.BigWinPointY;
		}
	}

	/**顯示骨骼動畫*/
	public async HideBone() {
		for (let i = 0; i < this._BoneList.length - 1; i++) {
			if (this._BoneList[i] != null && this._BoneList[i].visible)
				this._BoneList[i].visible = false;
			SoundManger.Instance.StopSoundSE(this._Sound_os_List[i]);
			SoundManger.Instance.StopSoundSE(this._Sound_bgm_List[i]);
		}
		SoundManger.Instance.StopSoundSE(this._Sound_coin_List[0]);
		SoundManger.Instance.StopSoundSE(this._Sound_coin_List[1]);
		if (this._BoneList[BigWinType.Coin] != null && this._BoneList[BigWinType.Coin].visible)
			this._BoneList[BigWinType.Coin].visible = false;
		if (this._BigWinFont != null && this._BigWinFont.visible) {
			this._BigWinFont.visible = false;
			this._BigWinFont.text = "";
		}
	}

	private GenerateUIName(packageName: string, resName: string) {
		return packageName + resName;
	}

	private CheckOpenWindow(uiName: string): boolean {
		if (this._repeatWindowList.indexOf(uiName) > -1) {
			return true;
		}
		//console.log("last package : " + this.LastPackageName());
		if (uiName != this.LastUIName() && this._closingWindowList.indexOf(uiName) == -1) {
			return true;
		}
		else {
			return false;
		}
	}

	private LastUIName(): string {
		var lastWindow = this.LastWindow();
		if (lastWindow) {
			return lastWindow.GetUIName();
		}
		return "";
	}

	private SortWindow() {
		for (var i = 0, max = this._windowList.length; i < max; ++i) {

			this._windowList[i].Depth = i * this.depthBuffer + this.depth;
			switch (this._windowList[i].WindowType) {
				case WindowType.Dialog:
					{
						this._windowList[i].Depth += ZOrder.eDialog;
						break;
					}
				case WindowType.Performance:
				case WindowType.Settings:
					{
						this._windowList[i].Depth += ZOrder.ePerformance;
						break;
					}
				case WindowType.LobbyBar:
					{
						this._windowList[i].Depth += ZOrder.eLobbyBar;
						break;
					}
				case WindowType.DownLoadPanel:
				case WindowType.Loading:
					{
						this._windowList[i].Depth += ZOrder.eLoading;
						break;
					}
			}

			// this._windowList[i].setDepth(m_listWindow[i].m_Panel.depth);
			// this._windowList[i].setPanelList(m_listWindow[i].m_Panel.depth);
			if (((this._windowList[i].Param & ShowWindowParam.eTopframe) == ShowWindowParam.eTopframe)) {
				this.SetWindowParamDepth(ShowWindowParam.eTopframe, true, this._windowList[i].Depth);
			}
		}
	}

	private SetWindowParam(ui: UIWindowBase, param: ShowWindowParam, depth: number) {
		// if (!((ui.Param & ShowWindowParam.eHas3DObject) == ShowWindowParam.eHas3DObject))
		// {
		//     ui.gameObject.transform.localPosition = new Vector3(0, 0, -m3DBuffer);
		// }

		if (((ui.Param & ShowWindowParam.eMask) == ShowWindowParam.eMask)) {
			this.ShowMask();
			//_MaskSortOrder(ui.m_Panel.sortingOrder,ui.m_Panel.useSortingOrder);
			this.MaskDepth(ui.GetMaskDepth());
			//_MaskZOrder(ui.transform.localPosition.z);
		}

		if (this.GetWindowByName(ui.GetUIName()) != null || (ui.Param & ShowWindowParam.eBlockMenu) == ShowWindowParam.eBlockMenu) {
			if (this._blockMenuIndex == 0)
				this._blockMenuIndex = this._windowList.length + 1;
		}

		this.SetWindowParamDepth(ShowWindowParam.eBack, ((ui.Param & ShowWindowParam.eBack) == ShowWindowParam.eBack), depth);

		if (((ui.Param & ShowWindowParam.eTopframe) == ShowWindowParam.eTopframe))
			this.SetWindowParamDepth(ShowWindowParam.eTopframe, true, depth);
		else if (ui.WindowType == WindowType.DownLoadPanel)
			this.SetWindowParamDepth(ShowWindowParam.eTopframe, false, depth);
		else if (ui.Parent != null)
			this.SetWindowParamDepth(ShowWindowParam.eTopframe, ((ui.Parent.Param & ShowWindowParam.eTopframe) == ShowWindowParam.eTopframe), ui.Parent.Depth);

		var blockMenu: boolean = this._blockMenuIndex != 0 && this._blockMenuIndex <= this._windowList.length;
		this.SetWindowParamDepth(ShowWindowParam.eMenu, ((ui.Param & ShowWindowParam.eMenu) == ShowWindowParam.eMenu) && blockMenu, depth);

		// if ((ui.Param & ShowWindowParam.eBackground) == ShowWindowParam.eBackground)
		// {
		//     ShowBackground();
		// }
	}

	private SetWindowParamDepth(param: ShowWindowParam, show: boolean, depth: number) {
		if (this._imParam.containsKey(param)) {
			if (param == ShowWindowParam.eTopframe) {
				if (show)
					this._imParam[param].SetDepth(depth + this.depthBuffer / 2);
			}
			else {
				if (show)
					this._imParam[param].SetDepth(depth + this.depthBuffer / 2);
				else
					this._imParam[param].SetDepth(depth - this.depthBuffer - 1);
			}
		}
	}

	private MaskDepth(depth: number) {
		if (this._uiMask) {
			this._uiMask.Depth = depth;
		}
	}

	private ShowMask()  // TODO
	{
		if (!this._uiMask) {
			// GameObject parent = GetUICamera();
			// if(parent != null)
			// {
			// 	m_uiMask = NGUITools.AddChild(parent, AssetBundleTool.Instance.GetGameObjectAsset("Assets/Data/Common/Background_Mask.prefab"));
			// }

			// ResManager.AddFairyPackage("Mask");
			// this._uiMask = new MaskWindow();
			// this._uiMask.UIRoot = fairygui.GRoot.inst;
			// this._uiMask.View = fairygui.UIPackage.createObject("Mask","View").asGroup;
			// this._uiMask.UIRoot.addChild(this._uiMask.View);
		}
	}

	private HideMask(ui: UIWindowBase) {
		if (this._windowList.length == 1) {
			if (this._uiMask) {
				if (this._uiMask.UIRoot.getChildIndex(this._uiMask.View)) {
					this._uiMask.UIRoot.removeChild(this._uiMask.View);
					delete this._uiMask.View;
					this._uiMask.View = null;
				}

				delete this._uiMask;
				this._uiMask = null;
			}
		}
	}

	public GetWindowByName(uiName: string): UIWindowBase {
		for (var i = this._windowList.length - 1; i >= 0; i--) {
			if (this._windowList[i].GetUIName() == uiName) {
				return this._windowList[i];
			}
		}
		return null;
	}

	private UpdateChildrenIndex() {
		// console.log("fairy children: " + fairygui.GRoot.inst.displayObject.$children.length);
		// console.log("window list: " + this._windowList.length);
		if (fairygui.GRoot.inst.displayObject.$children.length != this._windowList.length) {
			//console.warn("The number of displayObject is inconsistent with the length of windowList");
		}

		// for	(let ui of this._windowList)
		// {
		// 	console.log("(before) UI: " + ui.Name + " has depth: " + ui.Depth + " at index: " + ui.UIRoot.getChildIndex(ui.View));
		// }

		// sort by desc
		if (this._windowList.length > 0) {
			var copyArray = this._windowList.slice(0);
			copyArray.sort((leftSide, rightSide): number => {
				if (leftSide.Depth < rightSide.Depth) return 1;
				if (leftSide.Depth > rightSide.Depth) return -1;
				return 0;
			});

			var count = copyArray.length;
			for (let ui of copyArray) {
				ui.UIRoot.setChildIndex(ui.View, --count);
				//console.log("(after) UI: " + ui.Name + " has depth: " + ui.Depth + " at index: " + ui.UIRoot.getChildIndex(ui.View));
			}
		}
	}

	private AddNewUIPackage(packageName: string) {
		// if (this._uiPackageList.indexOf(packageName) == -1) {
		// 	ResManager.Instance.AddFairyPackage(packageName);
		// 	this._uiPackageList.push(packageName);
		// }
		// else {
		//console.log("duplicated fairy package: " + packageName);
		//}
	}

	private ClearAllPackage() {
		for (let pkg of this._uiPackageList) {
			if (pkg == "Common")
				continue;
			fairygui.UIPackage.removePackage(pkg);
		}
		this._uiPackageList.length = 0;
		this._uiPackageList.push("Common");
	}
}