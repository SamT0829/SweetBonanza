class SelfData {
    private static _instance: SelfData;
    public static get Instance(): SelfData {
        if (this._instance == null) {
            this._instance = new SelfData();
        }
        return this._instance;
    }

    //-----------------gamesetting
    public GameSettings: GameSettings = new GameSettings();

    /** 玩家資料 */
    public AccountData: AccountData = new AccountData();

    /** Play設定 */
    public PlaySetting: PlaySetting = new PlaySetting();

    /** 主要包名 */
    public MainPackageName: string = "";

    /** 執行流程的Log */
    public RunLog: string = "";
    public AddRunLog(log: RunLog, str: string = "", bracket: boolean = true) {
        this.RunLog += (log + (str != "" ? (bracket ? "[" + str + "]" : str) : "") + " ");
    }

    public DisplayFPS: number = 0;

    /** GameController初始化完成 */
    public GameControllerInitDone = false;

    public IsTableGame: boolean = false;
    public PlayerJoinGameFinish: boolean = false;
    public SetLobbyTablesFunc: Function = null;
    public SetLobbyTablesThis: any = null;

    /**設置桌面遊戲大廳桌子*/
    public SetTableGameLobbyTables(json: string) {
        if (this.SetLobbyTablesFunc != null && this.SetLobbyTablesThis != null) {
            this.SetLobbyTablesFunc.apply(this.SetLobbyTablesThis, [json]);
        }
    }

    public LoadingViewHide = false;

    public ResourceLoadOnBackgroundComplete = false;

    public CommonPackageName: string = "Slot_000_ICashCrownCommon";//Slot_000_ICashCrownCommon,,Slot_000_Common

    public AutoRoundTime: Array<number> = [30, 50, 100, -1];

    public BigWinRate: number = 50;
    public HugeWinRate: number = 100;
    public MegaWinRate: number = 500;
    public GetBigWinType(money: number): BigWinType {
        if (money >= this.MegaWinRate * this.PlaySetting.RunTotleBet)
            return BigWinType.SuperWin;
        else if (money >= this.HugeWinRate * this.PlaySetting.RunTotleBet)
            return BigWinType.MegaWin;
        else if (money >= this.BigWinRate * this.PlaySetting.RunTotleBet)
            return BigWinType.BigWin;
        else
            return BigWinType.None;
    }

    public GetBigWinTypeWithRangeMoney(money: number, range: number): BigWinType {
        if (money >= this.MegaWinRate * range)
            return BigWinType.SuperWin;
        else if (money >= this.HugeWinRate * range)
            return BigWinType.MegaWin;
        else if (money >= this.BigWinRate * range)
            return BigWinType.BigWin;
        else
            return BigWinType.None;
    }

    //----------------Url Param
    private UrlParamData: UrlParamData = new UrlParamData();
    public get UrlParam_Lang(): LanguageType { return this.UrlParamData.Lang; }
    public set UrlParam_Lang(val: LanguageType) { this.UrlParamData.Lang = val; }

    public get UrlParam_GameMode(): GameMode {
        if (this.UseSpMode)
            return this.UrlParamData.GameMode;
        return GameMode.NormalMode;
    }
    public set UrlParam_GameMode(value: GameMode) { this.UrlParamData.GameMode = value; }

    public get UrlParam_Debug(): boolean { return this.UrlParamData.Debug; }
    public set UrlParam_Debug(val: boolean) { this.UrlParamData.Debug = val; }

    public get UrlParam_SavePng(): boolean { return this.UrlParamData.SavePng; }
    public set UrlParam_SavePng(val: boolean) { this.UrlParamData.SavePng = val; }

    public get UrlParam_Token(): string { return this.UrlParamData.Token; }
    public set UrlParam_Token(val: string) { this.UrlParamData.Token = val; }

    public get UrlParam_Firm(): string { return this.UrlParamData.Firm; }
    public set UrlParam_Firm(val: string) { this.UrlParamData.Firm = val; }

    public get UrlParam_LogoUrl(): string { return this.UrlParamData.LogoUrl; }
    public set UrlParam_LogoUrl(val: string) { this.UrlParamData.LogoUrl = val; }

    public get UrlParam_RuleUrl(): string { return this.UrlParamData.RuleUrl; }
    public set UrlParam_RuleUrl(val: string) { this.UrlParamData.RuleUrl = val; }

    public get UrlParam_UTBB(): boolean { return this.UrlParamData.UnitTestBuyBonus; }
    public set UrlParam_UTBB(val: boolean) { this.UrlParamData.UnitTestBuyBonus = val; }

    public get UrlParam_LobbyData(): string { return this.UrlParamData.LobbyData; }
    public set UrlParam_LobbyData(val: string) { this.UrlParamData.LobbyData = val; }

    public get UrlParam_OriginalGameID(): string { return this.UrlParamData.Original; }
    public set UrlParam_OriginalGameID(val: string) { this.UrlParamData.Original = val; }

    public get UrlParam_RePlayID(): string { return this.UrlParamData.ReplayID; }
    public set UrlParam_RePlayID(val: string) { this.UrlParamData.ReplayID = val; }

    public get UrlParam_OutShowRePlayID(): string { return this.UrlParamData.OutShowReplayID; }
    public set UrlParam_OutShowRePlayID(val: string) { this.UrlParamData.OutShowReplayID = val; }

    public get UrlParam_UseBuyFreeGame(): boolean { return this.UrlParamData.UseBuyFreeGame; }
    public set UrlParam_UseBuyFreeGame(val: boolean) { this.UrlParamData.UseBuyFreeGame = val; }

    public get UrlParam_OutMode(): boolean { return this.UrlParamData.IsOutMode; }
    public set UrlParam_OutMode(val: boolean) { this.UrlParamData.IsOutMode = val; }

    public IsNewLogo: boolean = false;
    public IsOpenActivity: boolean = false;
    public IsOpenRecommend: boolean = false;
    public AdList: string[] = [];
    public RecommendGameList: string[] = [];

    public SessionId: string = "";
    public LobbyServerAddress: string = "";

    public UIWindowsSize: egret.Point = new egret.Point(1120, 630);
    public MaxWindowsSize: egret.Point = new egret.Point(1600, 900);


    public IsUsingWebP: boolean = false;

    public ClientIP: string = "0.0.0.0";

    public IsOpenBonusSpin: boolean = false;

    public MarqueePoint_W: number[] = [0, 0];
    public MarqueeScale_W: number[] = [1, 1];
    public MarqueePoint_V: number[] = [0, 0];
    public MarqueeScale_V: number[] = [1, 1];


    /** 連線中斷 */
    public ConnectionClose: boolean = false;

    public UseLoginIP: string = "LoginIP";
    public UsePort: string = "port";
    public UseErrorUrl: string = "ErrorUrl";
    public UseInfoUrl: string = "InfoUrl";
    public SpMode: string = "UseSpMode";
    public UseHistoryUrl: string = "HistoryUrl";
    public UseHistoryUseWebView: string = "HistoryUseWebView";
    public ResCDNUrl: string = "resource/";
    public EventUrl: string = "http://mwstg.666wins.com/as-lobby/activity/activityInformation.do";
    public ImageResUrl: string = "resource/";
    public IconURL: string = "resource/";
    public MarqueeRate: number = 0;
    public MarqueeWinMoney: number = 0;
    public MarqueeTableWinMoney: number = 0;
    public RePlayLog: string = "";
    public OutShowRePlayURL: string = "";
    /**Out Only */
    public Is_OUTMode: boolean = false;
    public RePlayLog_OUT: string = "";
    /**Group Name */
    public ResGroupName: Array<string> = [];
    public AlreadyLoadResGroups: Array<string> = [];
    /** others */
    public FXParticle = new Dictionary([]);

    public UseBonusCode: boolean = true;
    public get Language() { return SelfData._instance.UrlParam_Lang; }

    private mode: Dictionary = new Dictionary([]);

    get UseSpMode(): boolean { return this.getData(this.GameSettings.m_UseSpMode) == "true"; }
    get InfoUrl(): string {
        if (this.UrlParam_RuleUrl != "")
            return this.UrlParam_RuleUrl;
        return this.getData(this.GameSettings.m_InfoUrl);
    }
    get HistoryUrl(): string { return this.getData(this.GameSettings.m_HistoryUrl); }
    get HistoryUseWebView(): boolean { return this.getData(this.GameSettings.m_HistoryUseWebView) == "true"; }
    get TargetGame(): string { return this.getData(this.GameSettings.m_GameType); }
    get TargetGameType(): GameType { return <GameType>GameType[this.TargetGame]; }
    get DefaultLanguage(): LanguageType {
        let Dlang = this.getData(this.GameSettings.m_DefaultLanguage);
        let type = Dlang != "" ? <LanguageType>LanguageType[Dlang] : LanguageType.CH;
        SelfData._instance.UrlParam_Lang = type;
        return type;
    }

    /** 是否為直屏 */
    public IsPortrait: boolean = false;

    /** 是否可切換直式橫式 */
    public WindowSwitch: boolean = true;

    public AvatarMarqueeOn: boolean = true;
    //RePlay
    public CanBuyFreeGame: boolean = false;
    public ShowLadderAndReplay: boolean = false;
    public NeedIconNumber: number = 0;
    public BetIndex: number = 0;
    public GameNormalRoundID: number = 0;
    public GameBonusRoundID: number[] = [];
    public IsRePlay: boolean = false;
    public BuyBonusMaxType: number = 0;
    public BuyMoney: number = 0;
    public IsBuyBonus: boolean = false;
    public BuyBonusType: number = 1;
    public ReplaySomeOneBonus: boolean = false;
    public PlayReplay: boolean = false;
    public SkipRePlay: boolean = false;
    public RankDataList: RankData[] = [];
    public SelfRankDataList: RankData[] = [];
    public OtherRankDataList: RankData[] = [];
    public RankDataIndex: number = 0;
    public OutShowData: any[] = [];
    //
    public LostBetIndex: number = -1;
    /** 橫屏 下面那條Bar高度 */
    public LandscapeBottomHeight: number = 96;

    public UseLocalStorage: boolean = true;

    public getData(key: string): string {
        if (this.mode.containsKey(key))
            return this.mode[key];
        else {
            consoleLog("Key: " + key + " not found");
            return "";
        }
    }


    /** 使用倍投 預設 true */
    public UseMultiply = true;

    /**設置數據*/
    public setDatas(data: string) {
        let _jsonData = JSON.parse(data);
        this.mode = JsonToDictionary(_jsonData);

        //置換表格資訊
        this.mode[SelfData.Instance.GameSettings.m_LoginPort] = SelfData._instance.UsePort;
        this.mode[SelfData.Instance.GameSettings.m_GameErrorUrl] = SelfData._instance.UseErrorUrl;
        this.mode[SelfData.Instance.GameSettings.m_InfoUrl] = SelfData._instance.UseInfoUrl;
        this.mode[SelfData.Instance.GameSettings.m_UseSpMode] = SelfData._instance.SpMode.toString();
        this.mode[SelfData.Instance.GameSettings.m_HistoryUrl] = SelfData._instance.UseHistoryUrl;
        this.mode[SelfData.Instance.GameSettings.m_HistoryUseWebView] = SelfData._instance.UseHistoryUseWebView.toString();

        //檢查是否可以用特別模式, 關閉debug log
        if (!this.UseSpMode) {
            if (SelfData.Instance.UrlParam_GameMode != GameMode.NormalMode && SelfData.Instance.UrlParam_GameMode != GameMode.TestPlayMode) {
                SelfData.Instance.UrlParam_GameMode = GameMode.NormalMode;
            }
            SelfData.Instance.UrlParam_Debug = false;
        }

        //凍結資料, 防止惡意修改
        Object.freeze(this.mode);
    }

    public lockUrlParamData() {
        Object.freeze(this.UrlParamData);
    }

    public LockLoginIP() {
        Object.freeze(this.UseLoginIP);
    }
}

class RankData {
    public data: Object;
    public RankIndex: number;
    public CallBack: Function;
    public CallbackThis: any;
    public SetItemData(data: Object, rank: number, okFunc: Function, funcThis: any) {
        this.CallBack = okFunc;
        this.CallbackThis = funcThis
        this.data = data;
        this.RankIndex = rank;
    }
}