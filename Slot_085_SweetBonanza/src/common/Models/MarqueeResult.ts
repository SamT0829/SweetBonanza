enum MarqueeCategory {
    System,
    JackpotWin,
    PlayerWin,
}

class MarqueeResult {
    private _marqueeId: number;
    private _firm: string;
    private _marqueeCategory: MarqueeCategory;
    private _content: any[];
    private _createDate: number;
    private _accountID: number = -1;
    private _avatarID: string;


    public get MarqueeId(): number { return this._marqueeId; }


    public get Firm(): string { return this._firm; }


    public get MarqueeCategory(): MarqueeCategory { return this._marqueeCategory; }


    public get Content(): any[] { return this._content; }

    public get ServerTime(): number { return ticks_to_time(this._createDate); }

    public get AccountId(): number { return this._accountID; }

    public get AvatarId(): string { return this._avatarID; }

    public constructor(source: any[]) {
        this._marqueeId = source[0];
        this._firm = source[1];
        this._marqueeCategory = source[2];
        this._content = source[3];
        this._createDate = source[4];
        if (source.length > 5) this._accountID = source[5];
        this._avatarID = source[6];
    }
}

class MarqueeInfo {
    private _nickName: string;
    private _gameId: string;
    private _winBase: number;
    private _winMoney: number;
    private _serverTime: number;
    private _avatarId: string;

    public get NickName(): string {
        // let arr = this._nickName.split("_");
        // if (arr.length == 1) return arr[0];
        // else return arr[1];
        return this._nickName; 
    }


    public get GameId(): string { return this._gameId; } //主遊戲盤面結果


    public get WinBase(): number { return this._winBase; } //小遊戲盤面結果


    public get WinMoney(): number { return this._winMoney; } //主遊戲獲獎額


    public get ServerTime(): number { return this._serverTime; } //Server時間

    public get AvatarId(): string { return this._avatarId; } //頭像ID


    public constructor(source: any[]) {
        this._nickName = source[0];
        this._gameId = source[1];
        this._winBase = source[2];
        this._winMoney = source[3];
        this._serverTime = source[4];
        this._avatarId = source[5];
    }
}