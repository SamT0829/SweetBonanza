enum MsgType {
    NetMsg_AccountLoginRequest,
    NetMsg_AccountLoginRespond,

    NetMsg_LobbyLoginRequest,
    NetMsg_LobbyLoginRespond,

    NetMsg_KickPlayer,

    // player //
    NetMsg_PlayerMessage = 100000,
    NetMsg_PlayerMessageBegin,

    NetMsg_PlayerJoinGameRequest,
    NetMsg_PlayerJoinGameRespond,
    NetMsg_PlayerPlayGameRequest,
    NetMsg_PlayerPlayGameRespond,
    NetMsg_PlayerPlayBonusGameRequest,
    NetMsg_PlayerPlayBonusGameRespond,
    NetMsg_PlayerMarqueeRequest,
    NetMsg_PlayerMarqueeRespond,
    NetMsg_PlayerMWTransferInRequest,
    NetMsg_PlayerMWTransferInRespond,
    NetMsg_PlayerLocalGameNameRequest,
    NetMsg_PlayerLocalGameNameRespond,
    NetMsg_PlayerSyncGoodTrendRequest,
    NetMsg_PlayerSyncGoodTrendRespond,
    NetMsg_PlayerSyncLobbyTablesRequest,
    NetMsg_PlayerSyncLobbyTablesRespond,
    NetMsg_PlayerJoinTableGameRequest,
    NetMsg_PlayerJoinTableGameRespond,
    NetMsg_PlayerSyncTableGameRequest,
    NetMsg_PlayerSyncTableGameRespond,
    NetMsg_PlayerLeaveTableGameRequest,
    NetMsg_PlayerLeaveTableGameRespond,
    NetMsg_PlayerMWSingleHeartBeatRequest,
    NetMsg_PlayerMWSingleHeartBeatRespond,
    NetMsg_PlayerMWSingleGetBalanceRequest,
    NetMsg_PlayerMWSingleGetBalanceRespond,
    NetMsg_PlayerSlotLadderRequest,
    NetMsg_PlayerSlotLadderRespond,
    NetMsg_PlayerSlotReplayRequest,
    NetMsg_PlayerSlotReplayRespond,
    NetMsg_PlayerPseudonymRequest,
    NetMsg_PlayerPseudonymRespond,
    NetMsg_PlayerBonusCodeRequest = 100034,
    NetMsg_PlayerBonusCodeRespond = 100035,

    NetMsg_PlayerMessageEnd = 200000,


    NetMsg_ServerMsgBegin,

    // server //
    NetMsg_ServerConnected,
    NetMsg_ServerDisconnected,
    NetMsg_ClientConnected,
    NetMsg_ClientDisconnected,
    NetMsg_ServerWelcome,

    // balance server workload //
    NetMsg_Load2LobbyUpdateStart,
    NetMsg_Lobby2LoadUpdatePlayerCount,

    NetMsg_Lobby2GameUpdateStart,
    NetMsg_Game2LobbyUpdateRequestLoad,

    NetMsg_Lobby2FinanceUpdateStart,
    NetMsg_Finance2LobbyUpdateRequestLoad,

    NetMsg_Game2FinanceUpdateStart,
    NetMsg_Finance2GameUpdateRequestLoad,
    // balance server workload //

    NetMsg_Account2LoadClientLoginRequest,
    NetMsg_Load2AccountClientLoginRespond,

    NetMsg_Load2LobbyClientLoginRequest,
    NetMsg_Lobby2LoadClientLoginRespond,

    NetMsg_Load2LobbyKickPlayerRequest,
    NetMsg_Lobby2LoadKickPlayerRespond,

    NetMsg_Account2LoadPlayerLeave,

    NetMsg_Lobby2LoadPlayerLeave,
    NetMsg_Lobby2LoadPlayerFinalLeave,

    NetMsg_Lobby2FinanceQueryMoneyRequest,
    NetMsg_Finance2LobbyQueryMoneyRespond,

    NetMsg_Lobby2LoadPlayerEnteredRequest,
    NetMsg_Load2LobbyPlayerEnteredRespond,

    NetMsg_Load2AccountPlayerEnteredRequest,
    NetMsg_Account2LoadPlayerEnteredRespond,

    NetMsg_Lobby2GamePlayGameRequest,
    NetMsg_Game2LobbyPlayGameRespond,

    NetMsg_Game2FinanceSlotResultRequest,
    NetMsg_Finance2GameSlotResultRespond,

    NetMsg_Game2FinanceSlotBonusWinRequest,
    NetMsg_Finance2GameSlotBonusWinRespond,

    NetMsg_Lobby2LoadPlayerJoinGame,
    NetMsg_Lobby2LoadPlayerLeaveGame,
}

enum FieldIndicator {
    MessageID,
    SenderID,
    RemoteType,
    Data,
    SelfDefinedType,
}

enum PlayerFieldIndicator {
    MessageType,
    MessageData,
}

enum ArrayIndicator {
    MessageType = 19999,
    MessageData = 29999,
}

enum RemoteConnetionType {
    Unknown,
    Client,
    Account,
    Lobby,
    Game,
    LoadBalance,
    Finance,
    SBServer,
    ThirdParty,
}

enum NetOperationCode {
    BeforeLogin = 1,
    ClientServer = 2,
    ServerClient = 3,
    ServerServer = 4,
}

enum ErrorCode {
    Success = 0,

    // account
    AccountUnableRetrieveData = 100,
    AccountNotExist,
    AccountOauthExpired,
    AccountKickByDuplicatedLogin,
    AccountInvalidToken,
    AccountPermissionDeny,
    AccountWaitingOthers,

    // lobby / game
    PlayerUnableRetrieveData = 200,
    PlayerKickByDuplicatedLogin,
    PlayerFirmUnknownWalletType,
    PlayerHasUnfinishedPlay,
    PlayerJoinGameFailed,
    PlayerIsNotInGame,
    PlayerHasInOtherGame,
    GameTypeInvalid,
    GameTypeIsNone,
    GameTypeIsNotExist,
    GameParamNull,	// 210
    GameParamFloat,
    GameBetCoinInvalid,
    GameBetCoinValueInvalid,
    GameBetInputInconsistent,
    GameBetInsufficientMoney,
    GameBetInputIncosistSpin,
    GameBetStatusIncorrect,
    GameBonusNonExist,
    GameBonusIndexRangeInvalid,
    GameRoundGenerateError,	// 220
    GameSpinBonusWinFailed,
    GameLogicError,
    GameBetFrozen,
    GameBetExceedMaxBet,
    NowMaintenance,
    GameNotMultiplayer,
    GameSubIndexIsNone,
    GameJoinTableInvalid,
    GameJoinTableFailed,
    TableGameServerNotFound,	// 230
    PlayerIsNotInTable,
    TableGameNotFound,
    PlayerWaitSettlement,
    TableGameBetOperationInvalid,
    TableGameBetFieldSizeNotMatch,
    TableGameInputParamInvalid,
    TableGameRoundIdNotMatch,
    PlayerTableGameDuplicatedSettlement,
    PlayerTableGameDisableBet,
    TableGameClearFieldSizeNotMatch, // 240
    TableGameClearFieldInvalid,

    // Finance
    FirmUnableRetrieveData = 300,
    MwTransferIsInCash,
    MwLoginSuccessFailed,
    OrderCreateFailed,
    DuplicatedThirdOrder,
    MwLoginSuccessRespondFalse,
    MwLoginSuccessBlock,
    LoginTimeOut = 331,// 閒置過久
    DepositRemoved = 346,
    // Banker
    FirmUnableRetirveBankerInfo = 400,

    // Client
    GameResultMoneyError = 500,

    DbWriteError = 900,
    ServerNotReady = 901,
}

enum GameType {
    None = 6000,
    AllType,
    TripleFish,
    XiyouJi,
    FaDaCai,
    ManekiNeko,
    WuSheng,

    JCYFMoney = 6007,
    JCYFChoice,
    JCYFDiamond,
    JCYFDrum,
    JCYFFlower,

    GoldPanda,

    JCFMoney = 6013,
    JCFChoice,
    JCFDiamond,
    JCFDrum,
    JCFFlower,

    JiXiangRuYi,
    JumpHigh,

    DEJCYFMoney = 6020,
    DEJCYFChoice,
    DEJCYFDiamond,
    DEJCYFDrum,
    DEJCYFFlower,
    //DEJCYFXX,

    JJBXMoney = 6026,
    JJBXChoice,
    JJBXDiamond,
    JJBXDrum,
    JJBXFlower,
    //JJBXXX,

    LLDragon = 6032,
    LLEye,
    LLKing,
    LLToad,
    Aztec = 6036,

    BnSSlot = 6038,   //大小
    DnTSlot = 6039,   //龍虎
    BBKRedBlack = 6040, //比倍王紅黑
    Miner = 6041, // 掏金熱
    XianWar = 6042, // 仙俠
    BBKSeven = 6043, //比倍777
    XianMage = 6044,
    XianArcher = 6045,
    XianHealer = 6046,
    XianJizo = 6047,
    XianMojizo = 6048,

    FruitTrail2 = 6049, // 1021 , 經典水果機2
    BeadGame = 6050,
    MilkTea = 6051,
    BobaTea = 6052, // 喜悅波霸奶茶 1
    BobaTea2 = 6053, // 喜悅波霸奶茶 2
    FDLLPanda = 6054, // 福袋連連-熊貓
    FDLLDragon = 6055, // 福袋連連-龍
    CuteAnimals = 6056, // 可愛動物
    CuteMonster = 6057, // 可愛人物
    Plinko = 6058,
    Mahjong1 = 6059, // 麻將1
    Mahjong2 = 6060, // 麻將2
    SnakeArena = 6061,
    Mahjong3 = 6062, // 麻將3
    SweetBonanza = 6063,
    GatesOfOlympus = 6064,


    FishQPBY = 6301, //千炮補魚
    FishJLBY = 6302, //補魚大滿貫

    DragonTiger = 6401, //ManekiNeko換皮
    TreeOfFortune, //FaDaCai換皮
    FiveLion, //JiXiangRuYi換皮

    WHJMoney, //JCYFMoney換皮, MA CHAO 馬超
    WHJChoice, //JCYFChoice換皮, GUAN YU 關羽
    WHJDiamond, //JCYFDiamond換皮, HUANG ZHONG 黃忠
    WHJDrum, //JCYFDrum換皮, ZHANG FEI 張飛
    WHJFlower, //JCYFFlower換皮, ZHAO YUN 趙雲 
    VIPClub = 6409, // JumpHigh換皮 JumpHigh 跳高高, 

    JJLMoney,       //太空探險
    JJLChoice,      //四聖獸
    JJLDiamond,     //馬到成功
    JJLDrum,        //星際迷航
    JJLFlower,      //青花瓷

    JJLDragon = 6415,   //錦繡
    JJLEye,             //魔督撒旦
    JJLKing,            //萬聖派對
    JJLToad,            //水果派對

    Jungle = 6419,  //狂野叢林

    BnPiSlot = 6420,   //icash 庄閒
    BnSiSlot = 6421,   //icash 大小

    DnTiSlot = 6422,   //龍虎
    BBKiRedBlack = 6423, // 比倍王-紅黑
    BBKiSeven = 6424,  // 比倍王777

    Miiner = 6425,      //淘金熱

    XianiWar = 6426,      //仙俠 戰士
    XianiMage = 6427, //仙俠 法師
    XianiArcher = 6428, //仙俠 射手
    XianiHealer = 6429, //仙俠 牧師
    XianiJizo = 6430, //仙俠 地藏
    XianiMojizo = 6431, //仙俠 魔地藏

    WaterMargin = 1110,// 1110 6701 , 水滸傳 
    OutlawedHeroes = 1112, // 1112 6702, 水滸英雄
    DragonTigerTable = 1163, // 1163 6703, 龍虎鬥
    GoldenSharkTable = 1145, // 1145 6704, 金鯊銀鯊
    FruitTrail = 1021, // 1021 6705 , 經典水果機
    ChiShen5 = 1153, // 6706 , 五路財神
    Dragons5 = 1111, // 1111 ,6707 五龍爭霸
    Golden777 = 1115, // 1115,6708 黃金777
    Lucky5 = 6709, // 1022 ， 好運5撲克(H5)

    Border = 6800, //共開
    Sicbo, //骰寶
    ForestParty, // 森林舞會 1041
    ForestParty3, // 森林舞會3
    BeadTable = 6804,
    Aviator = 6805,
}

enum CustomProtocol {
    ClientGameResult,
}

enum NetWorkType {
    NormalNetWork = 0,
    WIFI = 1,
}

enum WalletType {
    Unknown = 0,
    Transfer,
    Seamless,
    MWTransfer,
    MWSingle,
}

enum WalletAction {
    None = 0,
    Bet,
    Win,
    Refund,
}

enum MWLang {
    cn = 0,	// simple chinese
    hk,		// traditional chinese
    en,
}

// API ErrorCode
enum APIErrorCode {
    Success = 0,

    UnknownError = 9999
}

enum RunLog {
    StartRun = 0,
    PayBet = 1,
    SendPlayGame = 2,
    WaitGetResult = 3,
    ServerRespond = 4,
    GetResult = 5,
    ShowSelectBonus = 6,
    AddMainGameMoney = 7,
    AddBonusMoney = 8,
    AddRechargeMoney = 9,
    AddTransferInMoney = 10,
    AddMWTransferInMoney = 11,
    ResultFinish = 12,
    EndAccountMoney = 13,
    SendBuyBonus = 14,
    BuyBonus = 15,
    MWSingleGetBalance = 16,
    WheelGamble = 17,
    WheelCollect = 18,
    EndBonusWheel = 19,

    Sicbo = 100,
    SicboStart = 101,
    SicboBetting = 102,
    SicboCancelBet = 103,
    SicboResult = 104,
    SicboEnd = 105,
    SicboLeave = 106,
    SicboMWTransferIn = 107,

    Mali = 200,
    MaliStart = 201,
    MaliBetting = 202,
    MaliResult = 203,
    MaliEnd = 204,
    MaliGamble = 205,
    MaliGambleResult = 206,
    MaliGambleBonus = 207
}
