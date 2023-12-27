/**加載控制器*/
class LoadingController {
    public loadingView: LoadingView = null;
    private URLLoader: egret.URLLoader = null;
    private CallbackFn: Function = null;
    private BGCallbackFn: Function = null;
    private CallbackFnObj: any = null;

    protected _missionGroup: MissionGroup;


    private CDNConfigURL: string = "../CDNConfig.json?v=";
    private ConfigURL: string = "default.res.json?v=";

    public PreloadGroups = [];
    public TargetGameGroups = [];
    public LanguageGroups = [];
    public BackgroundLoadGroups = [];
    public BackgroundLoadLanguageGroups = [];
    private CurrenResLoadedCount = 0;

    private IsBackgroundLoadGroupsFinish = false;

    private showDisconnected: boolean = false;

    /**加載控制器初始化*/
    public constructor(stage: egret.Stage) {
        NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_KickPlayer, this, this.OnKickPlayerRespond);
        EventManager.Instance.RegisterEventListener(ServerDisconnectedEvent, this, this.onDisconnected, RemoteConnetionType.Lobby);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.CheckShowErrorWindow, ClientMsg.ShowErrorWindow);

        fairygui.UIObjectFactory.setLoaderExtension(MyGLoader);
        this.loadingView = new LoadingView("LoadingPageView");
        this.loadingView.stage = stage;
    }

    /**檢查顯示錯誤窗口*/
    private CheckShowErrorWindow() {
        if (SelfData.Instance.PlaySetting.ShowError)
            return;
        if (SelfData.Instance.PlaySetting.ErrorInfo.length > 0) {
            let _infoId: number = SelfData.Instance.PlaySetting.ErrorInfo[0];
            SelfData.Instance.PlaySetting.ErrorInfo.splice(0, 1);
            consoleLog("Error Code: " + _infoId);
            UIManager.Instance.ShowErrorWindow("", _infoId, () => {
                closeWindow();
            }, this, null);
            // if (SelfData.Instance.AccountData.WalletType != WalletType.MWSingle || _infoId != 90215) {
            //     UIManager.Instance.ShowErrorWindow("", _infoId, () => {
            //         closeWindow();
            //     }, this, null);
            // }
            // else {
            //     RefreshBalanceController.Instance.RefreshBalanceTip = new RefreshBalanceTips();
            //     RefreshBalanceController.Instance.RefreshBalanceTip.ShowTip(() => {
            //         RefreshBalanceController.Instance.RefreshBalanceTip.ButtonEnable = false;
            //         RefreshBalanceController.Instance.NoMoneySyncMWSingleGetBalance = true;
            //         RefreshBalanceController.Instance.SendMWSingleGetBalanceRequest();
            //     }, this);
            // }
        }
    }

    /**踢玩家回應指令*/
    private OnKickPlayerRespond() {
        consoleLog("KickPlayer");
        let tableKey = LocalizationKey.ErrorCode + ErrorCode.AccountKickByDuplicatedLogin;
        SelfData.Instance.PlaySetting.ErrorInfo.push(tableKey);
        let event: ClientEvent = new ClientEvent(ClientMsg.ShowErrorWindow);
        EventManager.Instance.Send(event);
    }

    /**斷開連接*/
    private onDisconnected() {
        if (!this.showDisconnected) {
            consoleLog("Disconnected");
            this.showDisconnected = true;
            SelfData.Instance.PlaySetting.ErrorInfo.push(90000);
            let event: ClientEvent = new ClientEvent(ClientMsg.ShowErrorWindow);
            EventManager.Instance.Send(event);
        }
    }

    public LoadingStart(callbackFn: Function, backgroundCallbackFn: Function, callbackFnObj: any) {
        consoleLog("LoadingStart");
        this.CallbackFn = callbackFn;
        this.BGCallbackFn = backgroundCallbackFn;
        this.CallbackFnObj = callbackFnObj;
        this.LoadCDNConfig();
    }

    /**加載 CDN 配置*/
    private LoadCDNConfig(): void {
        consoleLog("LoadCDNConfig");
        this.URLLoader = new egret.URLLoader();                                             //URLLoader 类以文本、二进制数据或 URL 编码变量的形式从 URL 下载数据。
        this.URLLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;  //控制是以文本 (URLLoaderDataFormat.TEXT)、原始二进制数据 (URLLoaderDataFormat.BINARY) 还是 URL 编码变量 (URLLoaderDataFormat.VARIABLES) 接收下载的数据
        let request = new egret.URLRequest();                        //URLRequest 类可捕获单个 HTTP 请求中的所有信息。
        request.url = this.CDNConfigURL + Date.now();                //所请求的 URL
        RES.setMaxLoadingThread(5);                                  //设置最大并发加载线程数量，默认值是 4。
        //添加加载完成侦听
        this.URLLoader.addEventListener(egret.Event.COMPLETE, this.OnCDNConfigLoaded, this);            //[静态]网络请求加载完成
        //添加加载失败侦听
        this.URLLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.OnCDNConfigLoaded, this);     //[静态]io发生错误

        this.URLLoader.load(request);                                                                   //从指定的 URL 发送和加载数据
    }

    /**在加載 CDN 配置時*/
    private OnCDNConfigLoaded() {

        this.URLLoader.removeEventListener(egret.Event.COMPLETE, this.OnCDNConfigLoaded, this);
        this.URLLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.OnCDNConfigLoaded, this);

        // if (this.URLLoader.data) {                       //从加载操作接收的数据。只有完成加载操作时，才会填充该属性。该数据的格式取决于 dataFormat 属性的设置：
        //     let _file = JSON.parse(this.URLLoader.data);
        //     let urlList: any = _file["CDNUrl"];
        //     let urlres: any = _file["ResUrl"];
        //     let Imageres: any = _file["ImageUrl"];
        //     //SelfData.Instance.ResCDNUrl = urlList[0];
        //     SelfData.Instance.EventUrl = urlList;
        //     SelfData.Instance.ResCDNUrl = urlres;
        //     SelfData.Instance.ImageResUrl = Imageres;
        // }
        // RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);   //配置文件加载并解析完成事件。注意：若有配置文件加载失败，将不会抛出此事件，若要处理配置加载失败，请同时监听 CONFIG_LOAD_ERROR 事件。
        // RES.loadConfig(this.ConfigURL + Date.now(), SelfData.Instance.ResCDNUrl);               //加载配置文件并解析。
        if (this.URLLoader.data) {                       //从加载操作接收的数据。只有完成加载操作时，才会填充该属性。该数据的格式取决于 dataFormat 属性的设置：
            let _file = JSON.parse(this.URLLoader.data);
            let loginIP: any = _file["LoginIP"];
            let port: any = _file["port"];
            let ErrorUrl: any = _file["ErrorUrl"];
            let InfoUrl: any = _file["InfoUrl"];
            let UseSpMode: any = _file["UseSpMode"];
            let Folder: any = _file["Folder"];
            let HistoryUrl: any = _file["HistoryUrl"];
            let HistoryUseWebView: any = _file["HistoryUseWebView"];
            let urlList: Array<any> = _file["CDNUrl"];
            let urlres: any = _file["ResUrl"];
            let Imageres: any = _file["ImageUrl"];
            let IconURL: any = _file["IconURL"];
            let Marquee: any = _file["Marquee"];
            let replaylog: any = _file["RePlayLog"];
            let outshowurl: any = _file["OutShowRePlayURL"];
            /**Out Only */
            let isoutmode: any = _file["GameMode"];
            let replaylog_out: any = _file["OutRePlayLog"];

            SelfData.Instance.UseLoginIP = loginIP;
            SelfData.Instance.UsePort = port;
            SelfData.Instance.UseErrorUrl = ErrorUrl;
            SelfData.Instance.UseInfoUrl = InfoUrl;
            SelfData.Instance.SpMode = UseSpMode;
            SelfData.Instance.UseHistoryUrl = HistoryUrl;
            SelfData.Instance.UseHistoryUseWebView = HistoryUseWebView;
            SelfData.Instance.EventUrl = urlList[0];
            SelfData.Instance.ResCDNUrl = urlres;
            SelfData.Instance.ImageResUrl = Imageres;
            SelfData.Instance.IconURL = IconURL;
            SelfData.Instance.MarqueeRate = Marquee[0];
            SelfData.Instance.MarqueeWinMoney = Marquee[1];
            SelfData.Instance.MarqueeTableWinMoney = Marquee[2];
            SelfData.Instance.RePlayLog = replaylog;
            SelfData.Instance.OutShowRePlayURL = outshowurl;
            if (isoutmode != undefined) {
                SelfData.Instance.Is_OUTMode = true;
            }
            if (replaylog_out != undefined) {
                SelfData.Instance.RePlayLog_OUT = replaylog_out;
            }
            SelfData.Instance.LockLoginIP();

        }
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);   //配置文件加载并解析完成事件。注意：若有配置文件加载失败，将不会抛出此事件，若要处理配置加载失败，请同时监听 CONFIG_LOAD_ERROR 事件。
        RES.loadConfig(this.ConfigURL + Date.now(), SelfData.Instance.ResCDNUrl);               //加载配置文件并解析。
    }

    /**配置文件完成*/
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.getResAsync("gamesetting_txt", this.setGameSetting, this);                          //异步方式获取配置里的资源。只要是配置文件里存在的资源，都可以通过异步方式获取。
        //this.getUrlParam();

    }

    /**資源預加載*/
    private ResourcePreload() {
        // preload groups
        //---------------------添加資源配置加載完成事件,参考 ResourceEvent 定义的常量。---------------//
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourcePreloadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourcePreloadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

        //若同时启动多个资源组一起加载，比如在加载"preload"前，我们希望先加载一个更小的"loading"资源组，
        //以提供显示"preload"组加载进度的素材，可以使用RES.loadGroup()的第二个参数，为"loading"组传入一个优先级更大的数字，来迫使loading组在preload前加载完成
        for (let group of this.PreloadGroups) {
            if (group == "preload")
                RES.loadGroup(group, 1); //根据组名加载一组资源。name 要加载资源组的组名。priority 加载优先级,可以为负数,默认值为 0。低优先级的组必须等待高优先级组完全加载结束才能开始，同一优先级的组会同时加载。
            else
                RES.loadGroup(group, 0);
        }
        for (let group of this.LanguageGroups) {
            RES.loadGroup(group + LanguageType[SelfData.Instance.Language], 0);
        }
    }

    /**資源預加載完成*/
    private onResourcePreloadComplete(event: RES.ResourceEvent): void {
        this.CurrenResLoadedCount += 1;
        SelfData.Instance.AlreadyLoadResGroups.push(event.groupName);

        //預載遊戲資料
        if (event.groupName == "preload") {         //event.groupName 判断下这个事件是属于哪个资源组，因为可能有多个资源组同时在加载。
            //TableManager.Instance.CreateTable(DefaultLocalizationTable);
        }

        //loadingGame
        else if (event.groupName == "common") {     //event.groupName 判断下这个事件是属于哪个资源组，因为可能有多个资源组同时在加载。
            //TableManager.Instance.CreateTable(GameTipTable);
            this.loadingView.ShowLoading();
        }

        //----------------------移除事件侦听器,参考ResourceEvent定义的常量。------------------------------------//
        if (this.CurrenResLoadedCount == this.PreloadGroups.length + this.LanguageGroups.length) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourcePreloadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourcePreloadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

            this.StartLoadingMission(); //當CurrenResLoadedCount = 4 開始執行任務-
        }
    }

    /**開始加載任務*/
    public StartLoadingMission() {

        SelfData.Instance.ResGroupName = this.TargetGameGroups;

        this._missionGroup = new MissionGroup(WorkType.OneByOne);

        // this.CreateMission(new SetGameSettingMission("SetGameSetting"));  // gamesetting
        //this.CreateMission(new VersionControlMission("VersionControl"));  // Version

        // Create Table
        var createTableMission = new CreateTableMission("CreateTable");
        this.CreateMission(createTableMission);
        createTableMission.SetTableMap();

        this.CreateMission(new ServerLoginMission("ServerLogin")); // server login        
        this.CreateMission(new ServerLobbyEnterMission("LobbyEnter"));
        this.CreateMission(new ServerJoinGameMission("JoinGame"));

        this.CreateMission(new LoadTargetGameMission("LoadTargetGame")); // load target game 
        this._missionGroup.OnFinish = () => { this.OnComplete(this.CallbackFn, this.CallbackFnObj); }
        this._missionGroup.OnFail = this.OnFail;

        this.MissionStart();
    }

    /**任務開始*/
    protected MissionStart() {
        if (this._missionGroup.IsComplete)
            return;

        this.loadingView.SetProgressValue(0);
        this._missionGroup.MissionGroupWork();
    }

    /**完成*/
    protected async OnComplete(callbackFn: Function, callbackFnObj: any) {
        consoleLog("Mission group complete");
        this.ResourceLoadOnBackground();

        // if (SelfData.Instance.AccountData.ClientData && SelfData.Instance.AccountData.ClientData.GameData) {
        //     let needReconnect = SelfData.Instance.AccountData.ClientData.GameData.BonusResult.length != SelfData.Instance.AccountData.ClientData.Status.length - 1;

        //     while (needReconnect && !this.IsBackgroundLoadGroupsFinish)
        //         await waitForSeconds(0.1);
        // }
        //SelfData.PlayerInGameScene = true;   /////////////////////////can start game
        if (this.CallbackFn && this.CallbackFnObj) {
            this.CallbackFn.apply(this.CallbackFnObj);
            this.CallbackFn = null;
            this.loadingView.Hide();
        }
    }

    /**資源加載背景*/
    private ResourceLoadOnBackground() {
        LoadingController.SendLoginLog(LoginLogEnum.LoadBackGroundResource);
        if (this.CallbackFn && this.CallbackFnObj) {
            if (this.BackgroundLoadGroups.length === 0) {
                SelfData.Instance.ResourceLoadOnBackgroundComplete = true;
                this.CallbackFn.apply(this.CallbackFnObj);
                this.CallbackFn = null;
                this.loadingView.Hide();
            }
        }

        // preload groups
        ///---------------------添加資源配置加載完成事件,参考 ResourceEvent 定义的常量。---------------/////
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadOnBackgroundComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadOnBackgroundError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        this.CurrenResLoadedCount = 0;
        for (let group of this.BackgroundLoadGroups) {
            RES.loadGroup(group, 0);
        }
        for (let group of this.BackgroundLoadLanguageGroups) {
            RES.loadGroup(group + LanguageType[SelfData.Instance.Language], 0);
        }
    }

    /**
    * preload資源組加載完成
    * 在後台完成資源加載
    */
    private onResourceLoadOnBackgroundComplete(event: RES.ResourceEvent): void {
        this.CurrenResLoadedCount += 1;
        SelfData.Instance.AlreadyLoadResGroups.push(event.groupName);

        if (this.CurrenResLoadedCount == this.BackgroundLoadGroups.length + this.BackgroundLoadLanguageGroups.length) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadOnBackgroundComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadOnBackgroundError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.IsBackgroundLoadGroupsFinish = true;

            //callBack
            if (this.BGCallbackFn && this.CallbackFnObj) {
                this.BGCallbackFn.apply(this.CallbackFnObj);
                this.BGCallbackFn = null;
                this.loadingView.Hide();
                LoadingController.SendLoginLog(LoginLogEnum.LoadBackGroundFinish);
            }
            SelfData.Instance.ResourceLoadOnBackgroundComplete = true;
            //////////////////////////deal all load finish!!!!!!!!!!!!!!!!!!!!!!!!
        }
    }

    /**創建任務*/
    private CreateMission(mission: MissionBase) {
        mission.OnFinishObj = this;
        mission.OnFinish = () => {
            this.loadingView.SetProgress(this._missionGroup.CompleteCount, this._missionGroup.Count);
        };
        mission.OnProgressObj = this;
        mission.OnProgress = () => {
            this.loadingView.SetProgress(this._missionGroup.CompleteCount, this._missionGroup.Count);
        };

        this._missionGroup.Add(mission);
    }

    protected OnFail() {
        egret.log("Mission group failed");
    }


    private onResourcePreloadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //ignore loading failed projects
        this.onResourcePreloadComplete(event);
    }

    private onResourceProgress(event: RES.ResourceEvent): void {
        //console.log(">>> " + event.groupName + " >>> " + event.resItem.url + " " + event.itemsTotal + " " + event.itemsLoaded );
    }

    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
    * 資源組加載出錯
    *  關於後台錯誤的資源負載
    */
    private onResourceLoadOnBackgroundError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //ignore loading failed projects
        this.onResourceLoadOnBackgroundComplete(event);
    }

    /**設置遊戲設置 回调函数。示例：compFunc(data,key):void*/
    private setGameSetting(value, key) {

        //let fileText = ResManager.Instance.GetResource("gamesetting_txt");
        if (value) {
            consoleLog("load gamesetting: ok");
            SelfData.Instance.setDatas(value);
        }
        else {
            consoleLog("load gamesetting: table is empty");
        }
        this.getUrlParam();
        this.ResourcePreload();
    }

    /** 取得啟動參數 */
    private getUrlParam() {
        //設定遊戲模式
        let mode: string = egret.getOption("gameMode"); //正常=0, 試玩=1, 特殊=2, 封包=3, 自定結果=4, 測試=99 ,特殊測試=98
        if (mode != "")
            SelfData.Instance.UrlParam_GameMode =
                mode == "99" ? GameMode.UnitTestMode :
                    mode == "98" ? GameMode.UnitTestSPMode :
                        mode == "4" ? GameMode.SetResultMode :
                            mode == "3" ? GameMode.PacketMode :
                                mode == "2" ? GameMode.SpecialMode :
                                    mode == "1" ? GameMode.TestPlayMode :
                                        GameMode.NormalMode;
        consoleLog("url mode: " + GameMode[SelfData.Instance.UrlParam_GameMode]);

        //設定遊戲語言
        let language: string = egret.getOption("lang").toLowerCase();   //获取浏览器或者Runtime参数，如果没有设置返回空字符串  //toLowerCase將字符串中的所有字母字符轉換為小寫。
        let type = SelfData.Instance.DefaultLanguage;
        SelfData.Instance.UrlParam_Lang = getUrlLanguageByString(language);

        consoleLog("url debug: " + LanguageType[SelfData.Instance.UrlParam_Lang]);

        let debug: string = egret.getOption("debug");                   //获取浏览器或者Runtime参数，如果没有设置返回空字符串
        if (debug != "")
            SelfData.Instance.UrlParam_Debug = debug == "true" ? true : false;
        consoleLog("url debug: " + SelfData.Instance.UrlParam_Debug);

        //設定遊戲截圖
        let savepng: string = egret.getOption("savepng");
        if (savepng != "")
            SelfData.Instance.UrlParam_SavePng = savepng == "true" ? true : false;
        consoleLog("save png debug: " + SelfData.Instance.UrlParam_SavePng);

        let token: string = egret.getOption("token");
        if (token != "") {
            if (token.indexOf("%") > -1) {
                token = decodeURIComponent(token);  //decodeURIComponent 獲取統一資源標識符 (URI) 的編碼組件的未編碼版本。
            }
            SelfData.Instance.UrlParam_Token = token;
        }
        consoleLog("url token: " + SelfData.Instance.UrlParam_Token);

        let firm: string = egret.getOption("firm");
        if (firm != "")
            SelfData.Instance.UrlParam_Firm = firm;
        consoleLog("url firm: " + SelfData.Instance.UrlParam_Firm);

        let logoUrl: string = egret.getOption("logoUrl");
        if (logoUrl != "") {
            logoUrl = decodeURIComponent(logoUrl);
            SelfData.Instance.UrlParam_LogoUrl = logoUrl;
        }
        consoleLog("url logoUrl: " + SelfData.Instance.UrlParam_LogoUrl);

        let ruleUrl: string = egret.getOption("ruleUrl");
        if (ruleUrl != "") {
            ruleUrl = decodeURIComponent(ruleUrl);
            SelfData.Instance.UrlParam_RuleUrl = "https://" + ruleUrl + "/hs-game/client/";
        }
        consoleLog("url ruleUrl: " + SelfData.Instance.UrlParam_LogoUrl);

        let lobbyData: string = egret.getOption("lobbyData");
        if (lobbyData != "") {
            lobbyData = decodeURIComponent(lobbyData);
            lobbyData = window.atob(lobbyData);
            SelfData.Instance.UrlParam_LobbyData = lobbyData;
            let LobbyData = JSON.parse(SelfData.Instance.UrlParam_LobbyData);
            SelfData.Instance.IsNewLogo = LobbyData["isNewLogo"];
            SelfData.Instance.IsOpenActivity = LobbyData["isOpenActivity"];
            SelfData.Instance.IsOpenRecommend = LobbyData["isOpenRecommend"];
            SelfData.Instance.AdList = LobbyData["adList"];
            SelfData.Instance.RecommendGameList = LobbyData["games"];
        }
        consoleLog("url lobbyData: " + SelfData.Instance.UrlParam_LobbyData);

        let utbb: string = egret.getOption("utbb");
        if (utbb != "") {
            SelfData.Instance.UrlParam_UTBB = utbb == "true" ? true : false;
        }
        consoleLog("url utbb: " + SelfData.Instance.UrlParam_UTBB);

        // 回放遊戲 : 原遊戲ID
        let originalgmae: string = egret.getOption("originalgmae");
        SelfData.Instance.UrlParam_OriginalGameID = originalgmae;
        // 回放遊戲 : 回放ID
        let replayid: string = egret.getOption("replayid");
        SelfData.Instance.UrlParam_RePlayID = replayid;

        // 回放遊戲 : 回放ID
        let outshowreplayid: string = egret.getOption("outshowreplayid");
        SelfData.Instance.UrlParam_OutShowRePlayID = outshowreplayid;
        if (SelfData.Instance.UrlParam_OutShowRePlayID != "") {
            SelfData.Instance.UrlParam_RePlayID = SelfData.Instance.UrlParam_OutShowRePlayID;
        }
        // 是否從Mode1連結來
        let outmode: string = egret.getOption("outmode");
        if (outmode != "")
            SelfData.Instance.UrlParam_OutMode = outmode == "true" ? true : false;

        let usebuy: string = egret.getOption("usebuyfreegane");
        if (usebuy != "")
            SelfData.Instance.UrlParam_UseBuyFreeGame = usebuy == "true" ? true : false;

        SelfData.Instance.lockUrlParamData();
    }

    static loginStatus = {
        "tag": "",
        "sUsrAg": "",
        "status": -1,
        "time": 0
    };
    static loader = null;
    static SendLoginLog(status: number) {
        let urlpath: string = SelfData.Instance.getData(SelfData.Instance.GameSettings.m_GameErrorUrl);
        urlpath = urlpath.substring(0, urlpath.lastIndexOf("/") + 1) + "client_login";
        var date = Math.floor(Date.now() * 0.001);
        let time = 0;
        if (status == LoginLogEnum.AccountLoginRespond) {
            this.loginStatus["time"] = egret.getTimer();
            this.loginStatus["tag"] = newGuid() + date;
            this.loginStatus["sUsrAg"] = navigator.userAgent;
        }
        time = (egret.getTimer() - this.loginStatus["time"]) * 0.001;

        this.loginStatus["status"] = status;

        let id = SelfData.Instance.AccountData.UserID.toString();
        let type = SelfData.Instance.TargetGameType;
        var token = SHA256(
            id
            + type
            + status.toString()
            + "HS_project_8500");

        this.loader = new egret.URLLoader();
        this.loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request: egret.URLRequest = new egret.URLRequest(urlpath);
        this.loader.addEventListener(egret.Event.COMPLETE, this.onsenderror, this);
        this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onsenderror, this);
        request.requestHeaders.push(new egret.URLRequestHeader("Accept", "application/json"));
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables(
            "id=" + id +
            "&tag=" + this.loginStatus["tag"] +
            "&type=" + type +
            "&form=" + this.loginStatus["sUsrAg"] +
            //"&ip=" + "" +
            "&status=" + status.toString() +
            "&ws=" + time.toString() +
            "&token=" + token
        );
        consoleLog(JSON.stringify(request.data.variables));
        this.loader.load(request);
    }
    private static onsenderror(event) {
        consoleLog(this.loader.data);
    }
}

class MyGLoader extends fairygui.GLoader {
    protected loadExternal() {
        if (this.url === "")
            return;
        let imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";// 跨域请求
        imgLoader.load(this.url);// 去除链接中的转义字符‘\’        
        imgLoader.once(egret.Event.COMPLETE, (evt: egret.Event) => {
            if (evt.currentTarget.data) {
                let texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;

                this.texture = texture;
            }
        }, this);

        imgLoader.once(egret.IOErrorEvent.IO_ERROR, (evt: egret.Event) => {
            if (evt.currentTarget.data) {
                let texture = new egret.Texture();
                texture.bitmapData = evt.currentTarget.data;

                this.texture = texture;
            }
        }, this);
    }
}