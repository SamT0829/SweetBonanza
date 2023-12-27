abstract class MissionBase {
    protected _completeCount: number = 0.0;
    get CompleteCount() { return this._completeCount; }


    protected _subMissionCount: number = 1.0;
    get SubMissionCount() { return this._subMissionCount; }

    protected _isComplete: boolean = false;
    get IsComplete() { return this._isComplete; }

    protected _isFinish: boolean = false;
    get IsFinish() { return this._isFinish; }

    protected _isFail: boolean = false;
    get IsFail() { return this._isFail; }

    protected _name: string;
    get Name() { return this._name; }

    public MyMissionGroup: MissionGroup;
    public OnProcess: Function;
    public OnProgress: Function;
    public OnComplete: Function;
    public OnFinish: Function;
    public OnFail: Function;

    public OnProcessObj: Object;
    public OnProgressObj: Object;
    public OnCompleteObj: Object;
    public OnFinishObj: Object;
    public OnFailObj: Object;
    /**任務準備*/
    public abstract MissionPrepare();
    /**任務過程*/
    protected abstract MissionProcess();
    /**任務完成*/
    protected abstract MissionComplete(event: egret.Event);
    /**任務失敗*/
    protected abstract MissionFail();
    /**任務結束*/
    protected abstract MissionFinish();
    /**使命工作*/
    abstract async MissionWork();
    /**任務重置*/
    MissionReset() {
        this._completeCount = 0.0;
        this._isComplete = false;
        this._isFinish = false;
        this._isFail = false;
    }
}

class SetGameSettingMission extends MissionBase {
    public constructor(name: string) {
        super();
        this._name = name;
    }

    public async MissionPrepare() {
        this._subMissionCount = 1.0;
        this._completeCount = 0.0;
    }

    public async MissionWork() {
        this.MissionProcess();

        while (!this.IsComplete) {
            if (this.OnProgress && this.OnProgressObj)
                this.OnProgress.apply(this.OnProgressObj);
            await waitForSeconds(0.05);
        }

        this.MissionFinish();
    }

    public MissionProcess(): void {
        if (this.OnProcess && this.OnProcessObj)
            this.OnProcess.apply(this.OnProcessObj);

        let fileText = ResManager.Instance.GetResource("gamesetting_txt");
        if (fileText) {
            this.SetData(fileText);
            this.MissionComplete(null);
        }
        else {
            consoleLog("load gamesetting: table is empty");
            this.MissionFail();
        }
    }

    public MissionComplete(event: egret.Event): void {
        this._completeCount = 1.0;
        this._isComplete = true;

        if (this.OnComplete && this.OnCompleteObj)
            this.OnComplete.apply(this.OnCompleteObj);
    }

    public MissionFail(): void {
        this._isFail = true;
        if (this.OnFail && this.OnFailObj)
            this.OnFail.apply(this.OnFailObj);
    }

    public MissionFinish(): void {
        this._isFinish = true;
        if (this.OnFinish && this.OnFinishObj)
            this.OnFinish.apply(this.OnFinishObj);
    }

    private SetData(data: string) {
        SelfData.Instance.setDatas(data);
    }
}

class VersionControlMission extends MissionBase {
    public constructor(name: string) {
        super();
        this._name = name;
    }
    public async MissionPrepare() {
        this._subMissionCount = 1.0;
        this._completeCount = 0.0;
    }

    public async MissionWork() {
        this.MissionProcess();

        while (!this.IsComplete) {
            if (this.OnProgress && this.OnProgressObj)
                this.OnProgress.apply(this.OnProgressObj);
            await waitForSeconds(0.05);
        }

        this.MissionFinish();
    }

    public MissionProcess(): void {
        if (this.OnProcess && this.OnProcessObj)
            this.OnProcess.apply(this.OnProcessObj);
        /////////////////////////////////////////////////////////////////////////////////////////////// deal  with version
        // let urlpath: string = SelfData.Instance.getData(SelfData.Instance.m_VersionCheckURL);
        // consoleLog("urlpath -> " + urlpath);
        // // egret would redirect URLRequest to index.html if urlpath is empty
        // if (SelfData.Instance.UrlParam_GameMode == GameMode.NormalMode && urlpath != "") {
        //     //let firm: string = SelfData.Instance.getData(SelfData.m_FirmID);
        //     let firm: string = SelfData.Instance.UrlParam_Channel.toString();
        //     let current_version: string = SelfData.Instance.getData(SelfData.Instance.m_Version);
        //     var token = SHA256(firm + current_version + "Gb_project_9453");

        //     var loader: egret.URLLoader = new egret.URLLoader();
        //     loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        //     loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.CheckUrlFail, this);
        //     loader.addEventListener(egret.Event.COMPLETE, this.MissionComplete, this);
        //     var request: egret.URLRequest = new egret.URLRequest(urlpath);
        //     request.method = egret.URLRequestMethod.POST;
        //     request.data = new egret.URLVariables("firm=" + firm + "&current_version=" + current_version + "&token=" + token);
        //     loader.load(request);
        // }
        // else {
        //     this._completeCount = 1.0;
        //     this._isComplete = true;

        //     if (this.OnComplete && this.OnCompleteObj)
        //         this.OnComplete.apply(this.OnCompleteObj);
        // }
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    public MissionComplete(event: egret.Event): void {
        var loader: egret.URLLoader = <egret.URLLoader>event.target;
        var _data: egret.URLVariables = loader.data;
        consoleLog("_data:" + _data.toString());

        //parse JSON
        var jsondata = JSON.parse(_data.toString());

        var errcode: number = jsondata[0].errcode;
        if (jsondata.length < 2 && jsondata.length != 0) {
            if (errcode == 101 || errcode == 201) {
                consoleLog("VersionControlMission parse error, ErrorCode: " + errcode);
                //UIManager.Instance.ShowErrorMessage("", "", "In maintenance", null, null);
                this.CheckUrlFail();
                return;
            }
        }
        else {
            // check version control
            let current_version: string = "";/////////////////////////////////SelfData.Instance.getData(SelfData.m_Version); ///////////////////////get data
            if (jsondata[0].current_version == jsondata[1].current_version) {
                if (!this.VersionCheck(jsondata[0], jsondata[1])) {
                    UIManager.Instance.ShowErrorMessage("", "", jsondata[0].maintain_msg, null, null);
                    this.MissionFail();
                    return;
                }
            }
            else if (current_version == jsondata[0].current_version) {
                if (!this.VersionCheck(jsondata[0], jsondata[1])) {
                    UIManager.Instance.ShowErrorMessage("", "", jsondata[0].maintain_msg, null, null);
                    this.MissionFail();
                    return;
                }
            }
            else if (current_version == jsondata[1].current_version) {
                if (!this.VersionCheck(jsondata[1], jsondata[0])) {
                    UIManager.Instance.ShowErrorMessage("", "", jsondata[1].maintain_msg, null, null);
                    this.MissionFail();
                    return;
                }
            }
            else {
                UIManager.Instance.ShowErrorMessage("", "", "In maintenance", null, null);
                this.CheckUrlFail();
                return;
            }
        }

        this._completeCount = 1.0;
        this._isComplete = true;

        if (this.OnComplete && this.OnCompleteObj)
            this.OnComplete.apply(this.OnCompleteObj);
    }

    public MissionFail(): void {
        consoleLog(this._name + " MissionFail");
        this._isFail = true;
        if (this.OnFail && this.OnFailObj)
            this.OnFail.apply(this.OnFailObj);
    }

    public MissionFinish(): void {
        this._isFinish = true;
        if (this.OnFinish && this.OnFinishObj)
            this.OnFinish.apply(this.OnFinishObj);
    }

    private CheckUrlFail(): void {
        //consoleLog("VersionControl url error, but skip it^^ " + SelfData.Instance.getData(SelfData.m_VersionCheckURL));////////////////////get data

        this._completeCount = 1.0;
        this._isComplete = true;

        if (this.OnComplete && this.OnCompleteObj)
            this.OnComplete.apply(this.OnCompleteObj);
    }

    private VersionCheck(currentVersionInfo, newVersionInfo): boolean {
        if (currentVersionInfo.maintain_status) {
            return false;
        }
        else {
            return true;
        }
    }
}

/**服務器登錄任務類*/
class ServerLoginMission extends MissionBase {
    private UpdateRegisterId: number = 0;
    private AccountServerConnectedID = 0;
    public constructor(name: string) {
        super();
        this._name = name;
    }
    /**任務準備*/
    public async MissionPrepare() {
        this._subMissionCount = 6.0;
        this._completeCount = 0.0;
    }
    /**任務工作*/
    public async MissionWork() {
        this.MissionProcess();

        while (!this.IsComplete) {
            if (this.OnProgress && this.OnProgressObj)
                this.OnProgress.apply(this.OnProgressObj);
            await waitForSeconds(0.05);
        }

        this.MissionFinish();
    }

    /**任務過程*/
    public MissionProcess(): void {
        if (this.OnProcess && this.OnProcessObj)
            this.OnProcess.apply(this.OnProcessObj);

        if (SelfData.Instance.UrlParam_GameMode === GameMode.SpecialMode || SelfData.Instance.UrlParam_GameMode === GameMode.SetResultMode) {
            this.MissionComplete(null);
            return;
        }
        this._completeCount = 1.0;
        ////////////////////////////////////////////deal with login
        // this.UpdateRegisterId = EventManager.Instance.RegisterEventListener(GameroomEnteredEvent, this, this.GameroomEntered);
        NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_AccountLoginRespond, this, this.OnAccountLoginRespond);                                                  //註冊訊息事件
        this.AccountServerConnectedID = EventManager.Instance.RegisterEventListener(ServerConnectedEvent, this, this.OnAccountServerConnected, RemoteConnetionType.Account);    //註冊事件

        let loginPort: number = Number(SelfData.Instance.getData(SelfData.Instance.GameSettings.m_LoginPort));                                                                  //登錄端口
        let loginIP: string = SelfData.Instance.getData(SelfData.Instance.GameSettings.m_LoginIP);                                                                              //登錄IP
        //let versionCheckURL: string = SelfData.Instance.getData(SelfData.m_VersionCheckURL);

        let loginPath: string = "wss://" + SelfData.Instance.UseLoginIP + ":" + loginPort;                                                                                                           //登錄路徑
        NetworkHandler.Instance.Connect(RemoteConnetionType.Account, loginPath);                                                                                                //HsClientPeer 連線
        //LoginManager.Instance.LoginServer();
        ////////////////////////////////////////////////////////////
        this._completeCount = 2.0;
    }

    /**在帳戶登錄響應*/
    private OnAccountLoginRespond(connectionId: number, message: any[]) {
        this._completeCount = 5.0;
        //處理Server傳來的登入資訊
        SelfData.Instance.SessionId = message[AccountLoginRespond.SessionId];
        let errorCode: ErrorCode = (<ErrorCode>message[AccountLoginRespond.ErrorCode]);
        let lobbyServerIp: string = message[AccountLoginRespond.LobbyServerIP];
        let lobbyServerPort: string = message[AccountLoginRespond.LobbyServerPort];
        SelfData.Instance.LobbyServerAddress = "wss://" + lobbyServerIp + ":" + lobbyServerPort.toString();
        if (errorCode == ErrorCode.Success) {
            this.MissionComplete(null);
        }
        else {
            UIManager.Instance.ShowErrorWindow("", LocalizationKey.ErrorCode + errorCode, this.MissionFail, this, null);
        }
    }

    /**傳送賬號登錄*/
    private SandAccountLogin() {
        this._completeCount = 3.0;
        let msgBuilder = new MessageBuilder();
        let account: string = "";
        let token: string = SelfData.Instance.UrlParam_Token;
        let ip: string = SelfData.Instance.ClientIP;
        let device: Device = egret.Capabilities.isMobile ? Device.MOBILE : Device.PC;

        //---------------------------------------------帳戶登錄請求資料----------------------------------------------
        msgBuilder.Add(AccountLoginRequest.ThirdPartyAccount, account, NetMsgFieldType.String);
        msgBuilder.Add(AccountLoginRequest.Firm, SelfData.Instance.UrlParam_Firm, NetMsgFieldType.String);
        msgBuilder.Add(AccountLoginRequest.Token, token, NetMsgFieldType.String);
        msgBuilder.Add(AccountLoginRequest.Ip, ip, NetMsgFieldType.String);
        msgBuilder.Add(AccountLoginRequest.Device, device, NetMsgFieldType.Int);
        msgBuilder.Add(AccountLoginRequest.GameType, SelfData.Instance.TargetGameType, NetMsgFieldType.Int);

        NetworkHandler.Instance.Sned(RemoteConnetionType.Account, MsgType.NetMsg_AccountLoginRequest, msgBuilder);
        this._completeCount = 4.0;
        consoleLog("SendLoginLog");
    }

    /**發送測試帳戶登錄*/
    private SendTestAccountLogin() {
        this._completeCount = 3.0;
        let msgBuilder = new MessageBuilder();
        let accountkey: string = "account";
        let tokenkey: string = "token";
        let account: string = localStorageGetItem(accountkey);
        let token: string = localStorageGetItem(tokenkey);

        let newplayer: string = egret.getOption("newplayer");   // 获取浏览器或者Runtime参数，如果没有设置返回空字符串 * 在浏览器中相当于获取url中参数，在Runtime获取对应setOption参数        
        if (newplayer == "true") {
            account = null; //newGuid();
            token = null; //newToken();
        }

        if (SelfData.Instance.UrlParam_GameMode == GameMode.NormalMode) {
            if (account == null || account == "") {
                account = newGuid();                                                    //取得新gui
                localStorageSetItem(accountkey, account);                               //本地存儲集項目
            }
            if (token == null || token == "") {
                token = newToken();                                                     //取得新token
                localStorageSetItem(tokenkey, token);                                   //本地存儲集項目
            }
        } else if (<GameMode>SelfData.Instance.UrlParam_GameMode == GameMode.TestPlayMode || <GameMode>SelfData.Instance.UrlParam_GameMode == GameMode.UnitTestMode || <GameMode>SelfData.Instance.UrlParam_GameMode == GameMode.UnitTestSPMode) {
            let oldplayer: string = egret.getOption("oldplayer");
            if (oldplayer != "true") {
                account = newGuid();
                token = newToken();
            }
        }

        let ip: string = SelfData.Instance.ClientIP;
        let device: Device = egret.Capabilities.isMobile ? Device.MOBILE : Device.PC;

        //---------------------------------------------帳戶登錄請求資料----------------------------------------------
        msgBuilder.Add(AccountLoginRequest.ThirdPartyAccount, account, NetMsgFieldType.String);
        msgBuilder.Add(AccountLoginRequest.Firm, SelfData.Instance.UrlParam_Firm, NetMsgFieldType.String);
        msgBuilder.Add(AccountLoginRequest.Token, token, NetMsgFieldType.String);
        msgBuilder.Add(AccountLoginRequest.Ip, ip, NetMsgFieldType.String);
        msgBuilder.Add(AccountLoginRequest.Device, device, NetMsgFieldType.Int);                                                    //設備
        msgBuilder.Add(AccountLoginRequest.GameType, SelfData.Instance.TargetGameType, NetMsgFieldType.Int);

        NetworkHandler.Instance.Sned(RemoteConnetionType.Account, MsgType.NetMsg_AccountLoginRequest, msgBuilder);
        this._completeCount = 4.0;
        consoleLog("SendLoginLog");
    }

    /**在連接的帳戶服到伺服器上*/
    private OnAccountServerConnected(event: ServerConnectedEvent) {
        //遊戲模式正常,   token 不為null
        if (SelfData.Instance.UrlParam_GameMode == GameMode.NormalMode && SelfData.Instance.UrlParam_Token != "")
            this.SandAccountLogin();
        else
            this.SendTestAccountLogin();
    }

    /**任務完成*/
    public MissionComplete(event: egret.Event): void {
        EventManager.Instance.UnregisterEventListener(this.AccountServerConnectedID);
        this._completeCount = this._subMissionCount;
        this._isComplete = true;
        LoadingController.SendLoginLog(LoginLogEnum.AccountLoginRespond);
        if (this.OnComplete && this.OnCompleteObj)
            this.OnComplete.apply(this.OnCompleteObj);
    }

    /**任務失敗*/
    public MissionFail(): void {
        this._isFail = true;
        if (this.OnFail && this.OnFailObj)
            this.OnFail.apply(this.OnFailObj);
        closeWindow();
    }

    /**任務完成*/
    public MissionFinish(): void {
        this._isFinish = true;
        if (this.OnFinish && this.OnFinishObj)
            this.OnFinish.apply(this.OnFinishObj);
    }

    /**進入遊戲室*/
    private GameroomEntered(): void {
        EventManager.Instance.UnregisterEventListener(this.UpdateRegisterId);
        this.MissionComplete(null);
    }
}

/**服務器大廳進入任務類*/
class ServerLobbyEnterMission extends MissionBase {
    public static retryCount = 0;
    private UpdateRegisterId: number = 0;
    private LobbyServerConnectedID = 0;
    public constructor(name: string) {
        super();
        this._name = name;
    }

    /**任務準備*/
    public async MissionPrepare() {
        this._subMissionCount = 6.0;
        this._completeCount = 0.0;
    }

    /**任務製作*/
    public async MissionWork() {
        this.MissionProcess();

        while (!this.IsComplete) {
            if (this.OnProgress && this.OnProgressObj)
                this.OnProgress.apply(this.OnProgressObj);
            await waitForSeconds(0.05);
        }

        this.MissionFinish();
    }

    /**任務過程*/
    public MissionProcess(): void {
        if (this.OnProcess && this.OnProcessObj)
            this.OnProcess.apply(this.OnProcessObj);
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode || SelfData.Instance.UrlParam_GameMode === GameMode.SetResultMode) {
            this.MissionComplete(null);
            return;
        }
        this._completeCount = 1.0;
        NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_LobbyLoginRespond, this, this.OnLobbyLoginRespond);
        this.LobbyServerConnectedID = EventManager.Instance.RegisterEventListener(ServerConnectedEvent, this, this.OnLobbyServerConnected, RemoteConnetionType.Lobby);

        NetworkHandler.Instance.Connect(RemoteConnetionType.Lobby, SelfData.Instance.LobbyServerAddress);
        this._completeCount = 2.0;
    }

    /**在往大廳登錄響應*/
    private OnLobbyLoginRespond(connectionId: number, message: any[]) {
        this._completeCount = 5.0;
        let errorCode = (<ErrorCode>message[LobbyLoginRespond.ErrorCode]);
        //--------------------------------------------獲取客戶訊息量----------------------------------------------//
        if (errorCode == ErrorCode.Success) {
            SelfData.Instance.AccountData.UserID = message[LobbyLoginRespond.AccountId];
            SelfData.Instance.AccountData.ThirdPartyAccountId = message[LobbyLoginRespond.ThirdPartyAccount];
            SelfData.Instance.AccountData.Money = message[LobbyLoginRespond.Money];
            SelfData.Instance.AccountData.Currency = message[LobbyLoginRespond.Currency];
            SelfData.Instance.AccountData.CoinSymbolScale = message[LobbyLoginRespond.Scale];
            SelfData.Instance.AccountData.WalletType = message[LobbyLoginRespond.WalletType];
            SelfData.Instance.AccountData.ServerTime = message[LobbyLoginRespond.ServerTime];
            SelfData.Instance.AccountData.LoginToken = message[LobbyLoginRespond.LoginToken];
            SelfData.Instance.AccountData.SiteId = message[LobbyLoginRespond.SiteId];
            SelfData.Instance.AccountData.NickName = this.getNickName(message[LobbyLoginRespond.NickName]);
            SelfData.Instance.AccountData.AllowBuy = message[LobbyLoginRespond.AllowBuy];
            this.MissionComplete(null);
            consoleLog("AccountData: " + JSON.stringify(SelfData.Instance.AccountData));
        }
        //-------------------------------------------登入失敗----------------------------------------------//
        else if (errorCode == ErrorCode.MwLoginSuccessRespondFalse) {
            if (ServerLobbyEnterMission.retryCount >= 3) {
                UIManager.Instance.ShowErrorWindow("", LocalizationKey.ErrorCode + errorCode, this.MissionFail, this, null);
                return;
            }
            //--------------------------------------嘗試再次登入--------------------------------------//
            NetworkHandler.Instance.Disconnect(RemoteConnetionType.Account);
            NetworkHandler.Instance.Disconnect(RemoteConnetionType.Lobby);
            EventManager.Instance.UnregisterEventListener(this.UpdateRegisterId);
            EventManager.Instance.UnregisterEventListener(this.LobbyServerConnectedID);
            let retry = async () => {
                await waitForSeconds(1);
                let missionGroup = new MissionGroup(WorkType.OneByOne);
                missionGroup.Add(new ServerLoginMission("ServerLogin"));
                missionGroup.Add(new ServerLobbyEnterMission("LobbyEnter"));
                missionGroup.OnFinish = () => { this.MissionComplete(null); };
                missionGroup.MissionGroupWork();
                ServerLobbyEnterMission.retryCount++;
            }
            retry();
        }
        else {
            let title = "";
            if (message[LobbyLoginRespond.ExtraParam] != null) {
                //title = 
                let title_list = message[LobbyLoginRespond.ExtraParam].split(";");
                switch (SelfData.Instance.Language) {
                    case LanguageType.EN:
                        title = title_list[1];
                        break;
                    default:
                        title = title_list[2];
                        break;
                }
            }
            UIManager.Instance.ShowErrorWindow(title, LocalizationKey.ErrorCode + errorCode, this.MissionFail, this, null);
        }
    }

    /**發送大廳登錄*/
    private SendLobbyLogin() {
        this._completeCount = 3.0;
        if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode && SelfData.Instance.UrlParam_GameMode != GameMode.SetResultMode) {
            let msgBuilder = new MessageBuilder();
            msgBuilder.Add(LobbyLoginRequest.SessionId, SelfData.Instance.SessionId, NetMsgFieldType.Int);
            NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_LobbyLoginRequest, msgBuilder);
        }
        this._completeCount = 4.0;
    }

    /**在已連接到大廳服務器上*/
    private OnLobbyServerConnected(event: ServerConnectedEvent) {
        this.SendLobbyLogin();
    }

    /**任務完成*/
    public MissionComplete(event: egret.Event): void {
        this._completeCount = this._subMissionCount;
        this._isComplete = true;
        consoleLog("" + SelfData.Instance.AccountData.UserID);
        EventManager.Instance.UnregisterEventListener(this.LobbyServerConnectedID);
        LoadingController.SendLoginLog(LoginLogEnum.LobbyLoginRespond);
        if (this.OnComplete && this.OnCompleteObj)
            this.OnComplete.apply(this.OnCompleteObj);
    }

    /**任務失敗*/
    public MissionFail(): void {
        this._isFail = true;
        if (this.OnFail && this.OnFailObj)
            this.OnFail.apply(this.OnFailObj);
        closeWindow();
    }

    /**任務完成*/
    public MissionFinish(): void {
        this._isFinish = true;
        if (this.OnFinish && this.OnFinishObj)
            this.OnFinish.apply(this.OnFinishObj);
    }

    /**進入遊戲室*/
    private GameroomEntered(): void {
        EventManager.Instance.UnregisterEventListener(this.UpdateRegisterId);
        this.MissionComplete(null);
    }

    /**獲取暱稱*/
    private getNickName(msg: string): string {
        let result = "";
        let n = (<string>msg).split("_");
        if (n.length > 1) {
            for (let i = 1, max = n.length; i < max; ++i) {
                result += n[i];
                if (i < max - 1)
                    result += "_";
            }
        }
        else
            result = n[0];
        return result;
    }
}

/**服務器加入遊戲任務*/
class ServerJoinGameMission extends MissionBase {
    private UpdateRegisterId: number = 0;
    public constructor(name: string) {
        super();
        this._name = name;
    }

    /**準備任務*/
    public async MissionPrepare() {
        this._subMissionCount = 4.0;
        this._completeCount = 0.0;
    }

    /**任務製作*/
    public async MissionWork() {
        this.MissionProcess();

        while (!this.IsComplete) {
            if (this.OnProgress && this.OnProgressObj)
                this.OnProgress.apply(this.OnProgressObj);
            await waitForSeconds(0.05);
        }

        this.MissionFinish();
    }

    /**進行任務*/
    public MissionProcess(): void {
        if (this.OnProcess && this.OnProcessObj)
            this.OnProcess.apply(this.OnProcessObj);
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode || SelfData.Instance.UrlParam_GameMode == GameMode.SetResultMode) {
            this.MissionComplete(null);
            return;
        }
        this._completeCount = 1.0;
        NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerJoinGameRespond, this, this.OnJoinGameRespond);
        let msgBuilder = new MessageBuilder();

        msgBuilder.Add(JoinGameRequest.GameType, Number(SelfData.Instance.TargetGameType), NetMsgFieldType.Int);
        NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerJoinGameRequest, msgBuilder);
        this._completeCount = 2.0;
    }

    /**加入遊戲響應*/
    private OnJoinGameRespond(connectionId: number, message: any[]) {
        this._completeCount = 3.0;
        let errorCode = (<ErrorCode>message[JoinGameRespond.ErrorCode]);
        if (errorCode == ErrorCode.Success) {
            if (SelfData.Instance.IsTableGame) {
                consoleLog("LobbyTables: " + message[JoinGameRespond.LobbyTables]);
                SelfData.Instance.SetTableGameLobbyTables(message[JoinGameRespond.LobbyTables]);
                this.MissionComplete(null);
                SelfData.Instance.PlayerJoinGameFinish = true;
            }
            else {
                consoleLog("OnJoinGameRespond: " + JSON.stringify(message));
                SelfData.Instance.AccountData.GameData = message[JoinGameRespond.GameData];
                SelfData.Instance.AccountData.CommonData = message[JoinGameRespond.CommonData];
                let data: ReClientData = JSON.parse(message[JoinGameRespond.GameData]);
                SelfData.Instance.AccountData.ClientData = data;
                SelfData.Instance.AccountData.GameData = data.GameData;
                this.MissionComplete(null);
            }
        }
        else {
            consoleLog("ErrorCode: " + errorCode);
            UIManager.Instance.ShowErrorWindow("", LocalizationKey.ErrorCode + errorCode, this.MissionFail, this, null);
        }
    }

    /**任務完成*/
    public MissionComplete(event: egret.Event): void {
        this._completeCount = this._subMissionCount;
        this._isComplete = true;
        LoadingController.SendLoginLog(LoginLogEnum.JoingGameRespond);
        if (this.OnComplete && this.OnCompleteObj)
            this.OnComplete.apply(this.OnCompleteObj);
    }

    /**任務失敗*/
    public MissionFail(): void {
        this._isFail = true;
        if (this.OnFail && this.OnFailObj)
            this.OnFail.apply(this.OnFailObj);
        closeWindow();
    }

    /**任務完成*/
    public MissionFinish(): void {
        this._isFinish = true;
        if (this.OnFinish && this.OnFinishObj)
            this.OnFinish.apply(this.OnFinishObj);
    }
    /**進入遊戲室*/
    private GameroomEntered(): void {
        EventManager.Instance.UnregisterEventListener(this.UpdateRegisterId);
        this.MissionComplete(null);
    }
}

/**加載目標遊戲任務*/
class LoadTargetGameMission extends MissionBase {
    public constructor(name: string) {
        super();
        this._name = name;
    }

    private loadedCount = 0;
    private totalCount = 0;
    /**小組進展計數器地址*/
    private groupProgressCountMap = new Dictionary([]);

    /**準備任務*/
    public async MissionPrepare() {

        //let prepare = true;
        // RES.getResByUrl(SelfData.Instance.ResCDNUrl + "default.res.json?v=" + Date.now(), (_file, url) => {
        //     let names = [];
        //     let groups: Array<any> = _file["groups"];
        //     groups.forEach((x) => {
        //         let name = x["name"];
        //         if (SelfData.Instance.ResGroupName.indexOf(name) < 0) {
        //             SelfData.Instance.AlreadyLoadResGroups.push(name);
        //             this._subMissionCount += x["keys"].split(",").length;
        //             this.groupProgressCountMap.add(name, 0);
        //             names.push(name);
        //         }
        //     });

        //     SelfData.Instance.ResGroupName = names;
        //     this._completeCount = 0.0;
        //     prepare = false;
        // }, this, RES.ResourceItem.TYPE_JSON);

        // while (prepare) {
        //     await waitForSeconds(0.5);
        // }
    }

    /**製作任務*/
    public async MissionWork() {
        LoadingController.SendLoginLog(LoginLogEnum.LoadTagetGameResource);
        this.MissionProcess();

        while (!this.IsComplete) {
            if (this.OnProgress && this.OnProgressObj)
                this.OnProgress.apply(this.OnProgressObj);
            await waitForSeconds(0.05);
        }

        this.MissionFinish();
    }

    /**任務進行*/
    public MissionProcess(): void {
        if (this.OnProcess && this.OnProcessObj)
            this.OnProcess.apply(this.OnProcessObj);

        //-----------------------加载一组资源包--------------------//
        if (SelfData.Instance.ResGroupName.length > 0) {
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadedGRoup, this);            //GROUP_COMPLETE 延迟加载组资源加载完成事件。注意：若组内有资源项加载失败，将不会抛出此事件，若要处理组加载失败，请同时监听 GROUP_LOAD_ERROR 事件。
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLoadedProgress, this);         //GROUP_PROGRESS 延迟加载组资源加载进度事件。
            SelfData.Instance.ResGroupName.forEach((n) => {
                RES.loadGroup(n);                                                                        //根据组名加载一组资源。
            })
        }
        else
            this.onGameLoadComplete();
    }

    /**任務完成*/
    public MissionComplete(event: egret.Event): void {
        this._completeCount = this._subMissionCount;
        this._isComplete = true;
        LoadingController.SendLoginLog(LoginLogEnum.LoadTagetGameFinish);
        if (this.OnComplete && this.OnCompleteObj)
            this.OnComplete.apply(this.OnCompleteObj);
    }

    /**任務失敗*/
    public MissionFail(): void {
        this._isFail = true;
        if (this.OnFail && this.OnFailObj)
            this.OnFail.apply(this.OnFailObj);
    }

    public MissionFinish(): void {
        this._isFinish = true;
        if (this.OnFinish && this.OnFinishObj)
            this.OnFinish.apply(this.OnFinishObj);
    }

    /**遊戲加載完成*/
    private onGameLoadComplete(): void {
        //----------------------------移除事件監聽器-----------------------------//
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadedGRoup, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadedRes, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLoadedProgress, this);
        this.MissionComplete(null);
    }

    /**加載進度*/
    private onLoadedProgress(event: RES.ResourceEvent) {
        if (this.groupProgressCountMap.containsKey(event.groupName)) {                              //groupName     资源组名
            this.groupProgressCountMap[event.groupName] = event.itemsLoaded;                        //itemsLoaded   已经加载的文件数
        }

        let sum = 0;
        this.groupProgressCountMap.keys().forEach(element => {
            sum += this.groupProgressCountMap[element];
        });

        this._completeCount = sum;
    }

    /**加載組*/
    private onLoadedGRoup() {
        this.loadedCount++;
        if (this.loadedCount == SelfData.Instance.ResGroupName.length) {
        }
        this.onGameLoadComplete();
    }

    private async onLoadedRes() {
        while (ResManager.Instance.ResZipData.keys().length < this.totalCount) {
            await waitForSeconds(0.1);
        }
        this.onGameLoadComplete();
    }

    // private setZipData(key: string, type: string, res: JSZip.JSZipObject) {
    //     if (ResManager.ResZipData.containsKey(key))
    //         return;
    //     switch (type) {
    //         case "image":
    //             {
    //                 res.async('base64').then((t) => {
    //                     egret.BitmapData.create("base64", t, (data) => {
    //                         let tex = new egret.Texture();
    //                         tex._setBitmapData(data);
    //                         ResManager.ResZipData.add(key, tex);
    //                         timeLog("Zip GET :" + key + ": Asstes End");
    //                         this.loadedCount++;
    //                     });
    //                 });
    //                 break;
    //             }
    //         case "json":
    //             {
    //                 res.async('text').then((t) => {
    //                     ResManager.ResZipData.add(key, JSON.parse(t));
    //                     timeLog("Zip GET :" + key + ": Asstes End");
    //                     this.loadedCount++;
    //                 });
    //                 break;
    //             }
    //         case "font":
    //             {
    //                 break;
    //             }
    //         case "pvr":
    //             {
    //                 break;
    //             }
    //         case "sound":
    //             {
    //                 res.async('arraybuffer').then((t) => {
    //                     //let s = <egret.Sound>t;
    //                 });
    //                 break;
    //             }
    //         case "zip":
    //             {
    //                 break;
    //             }
    //         case "sheet":
    //             {
    //                 break;
    //             }
    //         case "text":
    //             {
    //                 res.async('text').then((t) => {
    //                     ResManager.ResZipData.add(key, t);
    //                     timeLog("Zip GET :" + key + ": Asstes End");
    //                     this.loadedCount++;
    //                 });
    //                 break;
    //             }
    //         case "fui":
    //         case "bin":
    //             {
    //                 res.async('arraybuffer').then((t) => {
    //                     ResManager.ResZipData.add(key, t);
    //                     timeLog("Zip GET :" + key + ": Asstes End");
    //                     this.loadedCount++;
    //                 });
    //                 break;
    //             }
    //     }
    // }
}