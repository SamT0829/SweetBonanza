class AccountData {
    public localAccountKeyName: string = "localaccount";
    private _userId: number = -1;

    private _thirdPartyAccountId: string = "CNY";
    /** 名稱 */
    get ThirdPartyAccountId(): string { return this._thirdPartyAccountId; }
    set ThirdPartyAccountId(val: string) { this._thirdPartyAccountId = val; }

    /** user id */
    get UserID(): number { return this._userId; }
    set UserID(val: number) { this._userId = val; }

    private _currency: string = "CNY";
    /** 幣別 */
    get Currency(): string { return this._currency; }
    set Currency(val: string) {
        this._currency = val;
        this._currencyData = CoinSymbolsTable.GetCoinSymbolData(this._currency);
    }

    private _coinsymbolscale: number = 1;
    get CoinSymbolScale(): number { return this._coinsymbolscale; }
    set CoinSymbolScale(val: number) {
        this._coinsymbolscale = val;
    }

    private _currencyData: CoinSymbolData = null;
    /** 幣別資料 */
    get CurrencyData(): CoinSymbolData {
        if (this._currencyData == null || this._currencyData.Currency != this.Currency)
            this._currencyData = CoinSymbolsTable.GetCoinSymbolData(this.Currency);
        return this._currencyData;
    }

    private _money: number = 2000099;
    /** 遊戲錢幣 */
    get Money(): number { return this._money; }
    set Money(val: number) {
        let diff: number = val - this._money;
        this._moneyLog += ((diff >= 0 ? "+" : "") + diff.toString());
        this._money = val;
    }

    private _moneyLog: string = "";
    get MoneyLog(): string { return this._moneyLog; }
    set MoneyLog(val: string) { this._moneyLog = val; }

    private _walletType: number = 0;
    /** 錢包類型 */
    get WalletType(): number { return this._walletType }
    set WalletType(val: number) { this._walletType = val; }

    private _clientData: ReClientData;
    /** 玩家遊戲資料 */
    get ClientData(): ReClientData { return this._clientData }
    set ClientData(val: ReClientData) { this._clientData = val; }

    private _gameData: ReGameData;
    /** 玩家遊戲型態 */
    get GameData(): ReGameData { return this._gameData }
    set GameData(val: ReGameData) { this._gameData = val; }

    private _commocData: string;

    get CommonData(): string { return this._commocData }
    set CommonData(val: string) { this._commocData = val; }

    private _serverTimeCheckpoint: number = 0;
    private _serverTimeCheckpointMilliseconds: number = 0;
    private _localTimeCheckpoint: number = 0;
    set ServerTime(serverTime: number) {
        this._localTimeCheckpoint = Date.now();
        this._serverTimeCheckpoint = ticks_to_time(serverTime);
        this._serverTimeCheckpointMilliseconds = ticks_to_milliseconds(serverTime);
    }
    /** seconds */
    get ServerTime(): number {
        let timePast: number = (Date.now() - this._localTimeCheckpoint) / 1000;
        return this._serverTimeCheckpoint + timePast;
    }
    /** milliseconds */
    get ServerMilliseconds(): number {
        let timePast: number = Date.now() - this._localTimeCheckpoint;
        return this._serverTimeCheckpointMilliseconds + timePast;
    }

    private _loginToken: string;
    get LoginToken(): string { return this._loginToken; }
    set LoginToken(val: string) { this._loginToken = val; }

    private _siteId: string;
    get SiteId(): string { return this._siteId; }
    set SiteId(val: string) { this._siteId = val; }

    private _nickname: string;
    get NickName(): string { return this._nickname; }
    set NickName(val: string) { this._nickname = val; }

    private _allowbuy: boolean;
    get AllowBuy(): boolean { return this._allowbuy; }
    set AllowBuy(val: boolean) { this._allowbuy = val; }

    private _useChangeName: boolean;
    get ChangeName(): boolean { return this._useChangeName; }
    set ChangeName(val: boolean) { this._useChangeName = val; }

    private _bonusCode: boolean;
    get BonusCode(): boolean { return this._bonusCode; }
    set BonusCode(val: boolean) { this._bonusCode = val; }

    private _bonusCode_freeSpin: number;
    get BonusCode_FreeSpin(): number { return this._bonusCode_freeSpin; }
    set BonusCode_FreeSpin(val: number) { this._bonusCode_freeSpin = val; }
}