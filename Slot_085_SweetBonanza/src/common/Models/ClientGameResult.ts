/**客戶遊戲結果*/
class ClientGameResult {
	private _moneyWin: number;
	private _normalGameResult: number[];
	private _bonusGameResult: any[];
	private _normalWin: number;
	private _bonusWin: number;
	private _resultMoney: number;
	private _jackpotPrize: number;
	private _transferIn: number;
	private _commonData: string;
	private _platfromMoney: number;

	private _bounscode_spintime: number;

	/** 總獲獎金額 */
	public get MoneyWin(): number { return this._moneyWin; } //總獲獎金額

	/** 主遊戲盤面結果 */
	public get NormalGameResult(): number[] { return this._normalGameResult; } //主遊戲盤面結果

	/** 主遊戲盤面結果 */
	public set NormalGameResult(value) { this._normalGameResult = value; }

	/** 小遊戲盤面結果 */
	public get BonusGameResult(): any[] { return this._bonusGameResult; } //小遊戲盤面結果

	/** 小遊戲盤面結果 */
	public set BonusGameResult(value) { this._bonusGameResult = value; } //小遊戲盤面結果

	/** 主遊戲獲獎額 */
	public get NormalWin(): number { return this._normalWin; } //主遊戲獲獎額

	/** 小遊戲獲獎額 */
	public get BonusWin(): number { return this._bonusWin; } //小遊戲獲獎額

	/** 玩家身上剩餘金額 */
	public get ResultMoney(): number { return this._resultMoney; }	//玩家身上剩餘金額

	public get TransferIn(): number { return this._transferIn; }

	public get JackpotPrize(): number { return this._jackpotPrize; } //JackPotWon

	public get CommonData(): string { return this._commonData; }

	/** 平台剩餘金額 */
	public get PlatformMoney(): number { return this._platfromMoney; }	//平台剩餘金額
	/** 平台贈送設於免費轉 */
	public get BonusCodeFreeSpinTime(): number { return this._bounscode_spintime; }

	public constructor(source: any[]) {
		this._moneyWin = source[0];
		this._normalGameResult = source[1];
		this._bonusGameResult = source[2];
		this._normalWin = source[3];
		this._bonusWin = source[4];
		this._resultMoney = source[5];
		this._jackpotPrize = source[6];
		this._transferIn = source[7];
		this._commonData = source[8];
		this._platfromMoney = source[9];
		this._bounscode_spintime = source[10];
	}
}