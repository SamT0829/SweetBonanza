class PlaySetting {
    /** 單注 (只用於送server專用, 計算請用CurrencyBet) */
    public Bet: number = 0;

    /** 貨幣比值 */
    public get CurrencyScale(): number { return SelfData.Instance.AccountData.CoinSymbolScale; }

    /** 貨幣單注 */
    public get CurrencyBet(): number { 
        return this.Bet * this.CurrencyScale; 
    }

    /** 總押注 */
    public get TotleBet(): number { return this.CurrencyBet * this.BetRate; }

    /** 下注倍率 */
    public BetRate: number = 0;

    /** 金錢價值 */
    public CoinValue: number = 1;
    /** 倍投倍數_沒用到的話使用預設  :  1 */
    public MultiplyValue: number = 1;
    /** 個遊戲自訂參數_沒用到的話使用預設值  :  0 */
    public OtherSetting: number = 0;
    /** SERVER 回傳參數的第8個欄位_遊戲相關資訊*/
    public GameInfoRespond: string = "";

    /** 快速停輪X2 */
    public get IsFastX2(): boolean { return this.AutoSetting.IsFastX2; }
    public set IsFastX2(val: boolean) {
        this.AutoSetting.IsFastX2 = val;
        if (val) this.AutoSetting.IsFastX3 = false;
    }

    /** 快速停輪X3 */
    public get IsFastX3(): boolean { return this.AutoSetting.IsFastX3; }
    public set IsFastX3(val: boolean) {
        this.AutoSetting.IsFastX3 = val;
        if (val) this.AutoSetting.IsFastX2 = false;
    }

    /** 自動玩 */
    public IsAuto: boolean = false;

    public IsWinEffect: boolean = false;
    /** 自動玩設定 */
    public AutoSetting: AutoPlaySetting = new AutoPlaySetting();

    public ErrorInfo: Array<number> = new Array<number>();

    public ShowError: boolean = false;

    /** 送server時單注 */
    public RunBet: number = 0;

    /** 送server時下注倍率 */
    public RunBetRate: number = 0;

    /** 送server時總押注 */
    public get RunTotleBet(): number { return this.RunBet * this.RunBetRate * this.RunMultiplyValue; }

    /** 送server時金錢價值 */
    public RunCoinValue: number = 1;

    /** 送server時倍投倍數 */
    public RunMultiplyValue: number = 1;

    public SendPlayGame() {
        this.RunBet = this.CurrencyBet;
        this.RunBetRate = this.BetRate;
        this.RunCoinValue = this.CoinValue;
        this.RunMultiplyValue = this.MultiplyValue;
    }
}

class AutoPlaySetting {
    /** 快速停輪X2 */
    public IsFastX2: boolean = false;

    /** 快速停輪X3 */
    public IsFastX3: boolean = false;

    /** 自動玩次數 */
    public TotalRound: number = 0;

    /** 無限自動玩 */
    public IsUnlimitRound: boolean = false;

    /** 進入Bonus停止自動玩 */
    public IsUntilBonus: boolean = false;

    /** 單局獲獎大於 SingleWinMoney 停止自動玩 */
    public CheckSingleWinMoney: boolean = false;

    /** 單局獲獎大於 SingleWinMoney 停止自動玩 */
    public SingleWinMoney: number = 0;

    /** 金額大於 UpperLimitMoney 停止自動玩 */
    public CheckUpperLimitMoney: boolean = false;

    /** 金額大於 UpperLimitMoney 停止自動玩 */
    public UpperLimitMoney: number = 0;

    /** 金額小於 LowerLimitMoney 停止自動玩 */
    public CheckLowerLimitMoney: boolean = false;

    /** 金額小於 LowerLimitMoney 停止自動玩 */
    public LowerLimitMoney: number = 0;

    public OtherSetting: () => Boolean = null;
}