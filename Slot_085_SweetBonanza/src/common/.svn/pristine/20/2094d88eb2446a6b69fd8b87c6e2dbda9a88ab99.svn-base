enum RecommendUI_Type {
	Push,
	Event,
}

class Recommend {
	public View: fairygui.GComponent;
	public BannerLoader: fairygui.GLoader;
	public Btn_Back: FairyExButton;
	public Btn_Cancel: FairyExButton;
	public RecommendType: RecommendUI_Type;
	public BannerId: string[];
	public PushGameId: string[];
	public EventGameId: string[];
	public PushGroup: fairygui.GGroup;
	public EventGroup: fairygui.GGroup;

	public EventItem: fairygui.GComponent;
	public eventBtn: fairygui.GButton;
	public ExchangeItem: fairygui.GComponent;
	public exchangeBtn: fairygui.GButton;
	private _call: Function;
	private _callbackObj: any;

	private _bannerIndex: number = 0;

	public Init(obj: fairygui.GComponent, call: Function, callbackObj: any) {
		this.View = obj;
		this.View.setPivot(0.5, 0.5);
		this._call = call;
		this._callbackObj = callbackObj;
		this.BannerLoader = <MyGLoader>this.View.getChild("banner").asLoader;
		this.PushGroup = this.View.getChild("Push").asGroup;
		this.EventGroup = this.View.getChild("Event").asGroup;
		this.BannerId = [];
		for (let _adlist = 0; _adlist < SelfData.Instance.AdList.length; _adlist++) {
			this.BannerId.push(SelfData.Instance.AdList[_adlist] + "?v=" + Date.now())
		}
		this.PushGameId = [];
		this.EventGameId = [];
		for (let index = 0; index < SelfData.Instance.RecommendGameList.length; index++) {
			if (index < 6) {
				this.PushGameId.push(SelfData.Instance.RecommendGameList[index]);
			}
			else {
				this.EventGameId.push(SelfData.Instance.RecommendGameList[index]);
			}
		}
		EventManager.Instance.RegisterEventListener(StageResizeEvent, this, this.onResize);
		this.SetCancel();
		this.SetBack();
		this.SetShowEvent();
		this.SetExchange();
		this.SetGameID();
		this.SetEventGameID();
		this.BannerLoader.url = SelfData.Instance.ImageResUrl + "recommend_normal" + ".png" + "?v=" + Date.now();
		this.ShowBanner();
		this.OnBack();
	}

	public async ShowBanner() {
		if (this.BannerId.length > 0) {
			this.BannerLoader.url = this.BannerId[this._bannerIndex];
		}
		await waitForSeconds(5);
		this.changeBanner();
	}
	private changeBanner() {
		this._bannerIndex++;
		if (this._bannerIndex > this.BannerId.length) {
			this._bannerIndex = 0;
		}
		this.ShowBanner();
	}

	public SetCancel() {
		let Cancel = this.View.getChild("Btn_Cancel").asButton;
		Cancel.addClickListener(this.OnCancel, this);
	}

	public OnCancel() {
		this.Hide();
	}

	public SetShowEvent() {
		let TypeURL_Name = "Activity_";
		let OpenExchangeURL_Name = "EventListIcon_";
		let NotOpenExchangeURL_Name = "NoEventListIcon_";
		let ExchangeURL_Name = "";
		this.EventItem = this.View.getChild("EventBtn").asCom;
		this.eventBtn = this.EventItem.getChild("Btn").asButton;
		this.eventBtn.addClickListener(this.OnShowEvent, this);

		if (SelfData.Instance.IsOpenActivity && this.EventGameId.length > 0) {
			ExchangeURL_Name = OpenExchangeURL_Name;
			this.eventBtn.touchable = true;
		}
		else {
			ExchangeURL_Name = NotOpenExchangeURL_Name;
			this.eventBtn.touchable = false;
		}

		let TypeURL = <MyGLoader>this.EventItem.getChild("popular").asLoader;
		TypeURL.url = SelfData.Instance.ImageResUrl + TypeURL_Name + LanguageType[SelfData.Instance.Language] + ".png" + "?v=" + Date.now();
		let ExchangeURL = <MyGLoader>this.EventItem.getChild("icon").asLoader;
		ExchangeURL.url = SelfData.Instance.ImageResUrl + ExchangeURL_Name + LanguageType[SelfData.Instance.Language] + ".jpg" + "?v=" + Date.now();
	}

	public OnShowEvent() {
		this.PushGroup.visible = false;
		this.EventGroup.visible = true;
	}

	public SetBack() {
		let back = this.View.getChild("Btn_Back").asButton;
		let backtext_up = <MyGLoader>back.asCom.getChild("up").asCom.getChild("Back").asLoader;
		let backtext_down = <MyGLoader>back.asCom.getChild("down").asCom.getChild("Back").asLoader;
		backtext_up.url = SelfData.Instance.ImageResUrl + "Back_" + LanguageType[SelfData.Instance.Language] + ".png" + "?v=" + Date.now();
		backtext_down.url = SelfData.Instance.ImageResUrl + "Back_" + LanguageType[SelfData.Instance.Language] + ".png" + "?v=" + Date.now();
		back.addClickListener(this.OnBack, this);
	}

	public OnBack() {
		this.PushGroup.visible = true;
		this.EventGroup.visible = false;
	}

	public SetExchange() {
		let TypeURL_Name = "Exchange_";
		let ExchangeURL_Name = "ExchangeIcon_";
		this.ExchangeItem = this.View.getChild("ExchangeBtn").asCom;

		let TypeURL = <MyGLoader>this.ExchangeItem.getChild("popular").asLoader;
		TypeURL.url = SelfData.Instance.ImageResUrl + TypeURL_Name + LanguageType[SelfData.Instance.Language] + ".png" + "?v=" + Date.now();
		let ExchangeURL = <MyGLoader>this.ExchangeItem.getChild("icon").asLoader;
		ExchangeURL.url = SelfData.Instance.ImageResUrl + ExchangeURL_Name + LanguageType[SelfData.Instance.Language] + ".jpg" + "?v=" + Date.now();

		this.exchangeBtn = this.ExchangeItem.getChild("Btn").asButton;
		this.exchangeBtn.addClickListener(this._call, this._callbackObj);
	}

	public SetGameID() {
		for (let i = 0; i < this.PushGameId.length; i++) {
			let item = new RecommendItem;
			let obj = this.View.getChild("game_" + i.toString()).asCom;
			item.CreateItem(obj, this.PushGameId[i]);
		}
	}

	public SetEventGameID() {
		for (let i = 0; i < this.EventGameId.length; i++) {
			let item = new RecommendItem;
			let obj = this.View.getChild("event_" + i.toString()).asCom;
			item.CreateItem(obj, this.EventGameId[i]);
		}
	}

	public Show() {
		//this.Parent.visible = true;
		this.View.visible = true;
		if (SelfData.Instance.WindowSwitch) {
			if (window.innerWidth >= window.innerHeight) {
				this.View.setPivot(0, 0);
				this.View.setScale(1, 1);
				this.View.rotation = 0;
			}

			else {
				this.View.setPivot(0.5, 0.5);
				this.View.setScale(0.75, 0.75);
				this.View.rotation = -90;
			}
		}
		this.OnBack();
		Recommend.SendRecommendLog(0, 0);
	}

	public Hide() {
		//this.Parent.visible = false;
		this.View.visible = false;
	}

	private onResize(event: StageResizeEvent): void {
		if (SelfData.Instance.WindowSwitch) {
			if (window.innerWidth >= window.innerHeight) {
				this.View.setPivot(0, 0);
				this.View.setScale(1, 1);
				this.View.rotation = 0;
			}

			else {
				this.View.setPivot(0.5, 0.5);
				this.View.setScale(0.75, 0.75);
				this.View.rotation = -90;
			}
		}
	}

	static loader = null;
	static SendRecommendLog(Usetype: number, togameid: number) {
		let urlpath: string = SelfData.Instance.getData(SelfData.Instance.GameSettings.m_GameErrorUrl);
		urlpath = urlpath.substring(0, urlpath.lastIndexOf("/") + 1) + "client_recommend";

		let id = SelfData.Instance.AccountData.ThirdPartyAccountId.toString();
		let type = Usetype;
		var token = SHA256(
			id
			+ type
			+ SelfData.Instance.TargetGameType
			+ togameid
			+ "HS_project_8500");

		this.loader = new egret.URLLoader();
		this.loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
		var request: egret.URLRequest = new egret.URLRequest(urlpath);
		this.loader.addEventListener(egret.Event.COMPLETE, this.onsenderror, this);
		this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onsenderror, this);
		request.requestHeaders.push(new egret.URLRequestHeader("Accept", "application/json"));
		request.method = egret.URLRequestMethod.POST;
		request.data = new egret.URLVariables(
			"userId=" + id +
			"&type=" + type +
			"&form=" + SelfData.Instance.TargetGameType +
			"&to=" + togameid +
			"&token=" + token
		);
		//consoleLog(JSON.stringify(request.data.variables));
		this.loader.load(request);
	}
	private static onsenderror(event) {
		//consoleLog(this.loader.data);
	}
}


class RecommendItem {
	public View: fairygui.GComponent;
	public ItemUrl_id: number;
	public TypeUrl_id: string;
	public Game_id: string;
	public ItemType_UrlName: string;
	public GameType_UrlName: string[];

	public icon: fairygui.GLoader;
	public popular: fairygui.GLoader;
	public ItemBtn: fairygui.GButton;

	public CreateItem(obj: fairygui.GComponent, data: string) {
		this.GameType_UrlName = ["Popular_", "Latest_", "Event_"];
		this.View = obj;
		this.Game_id = data["url"];
		this.ItemUrl_id = data["gameId"];
		this.TypeUrl_id = this.GameType_UrlName[data["tag"]];

		this.icon = <MyGLoader>this.View.getChild("icon").asLoader;
		this.popular = <MyGLoader>this.View.getChild("popular").asLoader;
		this.ItemBtn = this.View.getChild("Btn").asButton;

		this.icon.url = SelfData.Instance.IconURL + "icon3/" + this.ItemUrl_id + "_icon3_" + this.LanguageChangeID(SelfData.Instance.Language).toString() + ".jpg" + "?v=" + Date.now();
		this.popular.url = SelfData.Instance.ImageResUrl + this.TypeUrl_id + LanguageType[SelfData.Instance.Language] + ".png" + "?v=" + Date.now();
		this.ItemBtn.addClickListener(this.GotoOtherGame, this);

	}

	private GotoOtherGame() {
		Recommend.SendRecommendLog(1, this.ItemUrl_id);
		GoToOtherGame(SelfData.Instance.TargetGame, this.Game_id);
	}

	public LanguageChangeID(id: number) {
		let res = 0;
		if (id == 0) {
			res = 1;
		}
		else if (id == 1) {
			res = 2;
		}
		else if (id == 2) {
			res = 0;
		}
		else if (id == 3) {
			res = 6;
		}
		else if (id == 4) {
			res = 3;
		}
		else if (id == 5) {
			res = 4;
		}
		else if (id == 6) {
			res = 7;
		}
		else if (id == 7) {
			res = 8;
		}
		else if (id == 8) {
			res = 5;
		}
		else if (id == 9) {
			res = 9;
		}
		else if (id == 10) {
			res = 10;
		}
		return res;
	}

}