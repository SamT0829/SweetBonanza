
enum AccountLoginRequest {
    ThirdPartyAccount,
    Firm,
    Token,
    Ip,
    Device,
    GameType,
}

enum AccountLoginRespond {
    SessionId,
    ErrorCode,
    LobbyServerIP,
    LobbyServerPort,
}

enum LobbyLoginRequest {
    SessionId,
}

enum LobbyLoginRespond {
    AccountId,  // long
    ThirdPartyAccount,  // string
    ErrorCode,  // int (ErrorCode)
    Money, // long
    Currency, // string
    Scale, // int
    WalletType, // int
    ServerTime, // long
    LoginToken, // string
    SiteId, // string
    NickName,// string
    ExtraParam,//string
    AllowBuy, // bool
}

enum Device {
    None = 0,
    PC,
    MOBILE,
}

enum KickPlayer {
    ErrorCode,
}

enum GameTypeJackPotRequest {
    GameTypeRequired, // GameType
}

enum GameTypeJackPotRespond {
    JackPotTable, // object[] // JackpotInfo[]
}

enum JoinGameRequest {
    GameType,   // (int)GameType
}

enum JoinGameRespond {
    ErrorCode, // (int)ErrorCode
    GameData, // string
    CommonData, //string
    LobbyTables, // string (json)
}

enum PlayGameRequest {
    Money, // int[]
}

enum PlayGameRespond {
    ErrorCode, // ErrorCode
    ClientGameResult, // ClientGameResult
    ClientGameInfo = 8,
}

enum MWSingleGetBalanceRespond {
    ErrorCode, // ErrorCode
    NewBalance,  // long
}

/**玩遊戲類型*/
enum PlayGameType {
    MainGame = 0,
    BonusRound,
    BonusPick,
    BonusSelect,
    MarkRespin,
    BuyBonus,
    SideBet,
    CashOut,
    BetNextStep,
    CashOutSave,
    BetNextStepExplode = 10,
    SpinStep,
    SpinStepEnd,
    BonusRound2, //單局單局回應
    ModeSelect,
    SaveSelect,
}

enum BuyBonusType {
    None = 0,
    BuyBonus = 1,
    BuyBonus2 = 2,
    BuyBonus3 = 3,
    BuyBonus4 = 4,
    BuyBonus5 = 5,
    BuyBonus6 = 6,

    Cancel = 99
}

enum SaveOrPlayType {
    None = -1,
    Play = 0,
    Save = 1,
}

enum PlayGameTypeBonusRound {
    BonusRound3x5 = 6,
    BonusRound4x5 = 7,
    BonusRound5x5 = 8,
}

enum MWTransferIn {
    Amount, // long
    ErrorCode,
}

enum GameNameRequest {
    Lang,  // (string)Lang
    Offset, // int
}

enum GameNameRespond {
    Total, // int
    GameName, // json string
}

enum SyncGoodTrendRespond {
    ErrorCode, // int
    GoodTrend, // string json
}

enum PlayerSyncLobbyTablesRespond {
    ErrorCode, // int
    LobbyTables, // json string: Dictionary<int, TableGameInfo>
}

enum JoinTableGameRequest {
    SubIndex, // int
}

enum JoinTableGameRespond {
    ErrorCode, // int
    DynamicSyncData,  // object[]
    StaticSyncData,  // object[]
}

enum LeaveTableGameRespond {
    ErrorCode, // int
    ClientGameResult, // []
}

enum SyncTableGameRequest {
    Bet, // int[]
    RoundId, // long
}

enum SyncTableGameRespond {
    ErrorCode, // int
    DynamicSyncData, // object[]
    StaticSyncData, // object[]
    PlayMoney,
    FreeSpinCount,
}

enum BigWinLog {
    Awards,
    MoneyWin,
    NormalMagnifiction,
    ContralType,
    GameType,
}

enum SlotGameLog {
    BeforeBet,
    BeforeMoney,
    AfterMoney,
    Betting,
    WinMoney,
    LotteryMoney,
    NormalMagnifiction,
    ContralType,
    GameSeat,
    MainScore,
    SmallScore,
    Awards,
    GameType,
    InsertPlayerID,
    JackpotPrize,
    GameRoundID,
}

enum LittleMarrioLog {
    BeforeMoney,
    AfterMoney,
    Betting,
    WinMoney,
    LotteryMoney,
    NormalMagnifiction,
    ContralType,
    GameSeat,
    MainScore,
    SmallScore,
    Awards,
    GameType,
}

enum PokerLog {
    BeforeMoney,
    AfterMoney,
    Betting,
    WinMoney,
    LotteryMoney,
    CardsNumber,
    NormalMagnifiction,
    MagnifictionInfo,
    ContralType,
    GameSeat,
    Awards,
    GameType,
}

enum LoginLog {
    MachineCode,
    IP,
    Platform,
    NetWorkType,
    Version,
    ScreenSize,
    DeviceModel,
}

enum PurchaseLog {
    GameID,
    ServerID,
    NickName,
    IP,
    Firm,
    Version,
    PurchaseUID,
    ChargeMoney,
    Platform,
    OrderStatus,
    CheckStatus,
    OrderNumber,
    ThirdOrderNumber,
    RequestDate,
    RespondDate,
}

enum OpenCoinLog {
    GameID,
    ServerID,
    NickName,
    Firm,
    Version,
    ChargeMoney,
    ChargeCoin,
    BonusCoin,
    OperatingDate,
    Platform,
    BeforeCoin,
    AfterCoin,
    OrderNumber,
    ThirdOrderNumber,
}

enum OpenCoinCashLog {
    AccountID,
    ClientIP,
    Firm,
    FirmAccount,
    Currency,
    Version,
    ChargeMoney,
    ChargeType,
    OperatingDate,
    BeforeCoin,
    AfterCoin,
    OrderNumber,
    ThirdOrderNumber,
}

enum PurchaseCashLog {
    AccountID,
    ClientIP,
    Firm,
    FirmAccount,
    Version,
    PurchaseType,
    PurchaseMoney,
    OrderStatus,
    CheckStatus,
    OrderNumber,
    ThirdOrderNumber,
    RequestDate,
    RespondDate,
}

enum AddLog {
    GameLogInfo,
    LogMessageInfo,
}

enum PurchaseType {
    Success,
    Failure,
    Request,
    Request_StepTwo,
    LogFailed,
    LogRedundant,
}

enum OpenCoinType {
    NotOpen,
    Open,
}

enum PlayerEvent {
    Join,
    Leave,
}

enum MarqueePlayerWin {
    NickName,
    GameType,
    WinBase,
    WinMoney,
}

enum MarqueeRequest {
    CurrentChangeId, // int
}

enum MarqueeRespond {
    CurrentChangeId, // int
    MarqueeTable, // Dictionary<int, object> // Dictionary<MarqueeId, Marquee>
}

enum SeamlessAPIversion {
    Bet,
    Endround,
    Balance,
    Refund,
    Record,
}

enum SlotLadderRequest {
    GameType, // int(GameType) -1 = all, 1 = nowGame
    LogDate, // int, 0 = day, 1 = week, 2 = month, -1 = history
    WinOrWinRate, // int, win = 0, winRate = 1
    Personal, // int, self = 1, all != 1
}

enum SlotLadderRespond {
    LadderInfo, // string
}

enum SlotReplayRequest {
    ReplayId, // number
}

enum SlotReplayRespond {
    ReplayId, // int
    GameType, // int
    Currency, // string
    Nickname, //string
    Pseudonym, // string
    Replay, // string
    LogDate, // dateTime
}
