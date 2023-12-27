abstract class ISlotBaseController<T1 extends ISlotView, T2 extends IGameLogic>{
    public view: T1 = null;
    public slotLogic: T2 = null;
    public isRedata = false;
    public FirstIconPlate: Array<Array<number>> = [];
    protected specialresult: Array<any> = [];
    constructor(view: T1, logic: T2) {
        this.view = view;
        this.slotLogic = logic;
    }

    public bonusRoundID = [];
    public bonusPickID = [];

    public get UnitTest(): boolean {
        return SelfData.Instance.UrlParam_GameMode === GameMode.UnitTestMode;
       
    };

    public abstract Init();
    public GetReDateResult(data: Array<number>, firstKey?:number): Array<number> { return data; };
    public async StatrRun() { }
    public OnGameResult(data: Array<number> , clientGameResult:ClientGameResult = null): number { return 0; };
    public async ShowSpecialPerformance() {        
    };
    public OnBonusGameResult(data: Array<number>): number { return 0; };
    public OnSideBetGameResult(data: ClientGameResult): number { return 0; };

    public GetPicUpkResult(data: Array<number>): Array<number> { return data; };
    public async OnSelectGameResult(data: Array<Array<number>>){ }
    public async SetReData(redata: ReData) { };
    public async ShowLineResult() { };
    public async StopRun() { };
    public async ShowNormalResult() { };
    public async ShowSelectBonus() { };
    public async MainToBonus(bonusID:number,reData?:ReData) { };
    public async BonusToBonus(bonusID:number) { };
    public CanBuyBonus(nowBonusIndex:number): boolean { return false; }
    public CanBuyBonusTimes(nowBonusIndex:number): number { return 0; }
    public BuyBonusCost(nowBonusIndex:number): number { return 0; }
    public async PreBuyBonus() { };
    public async WaitBuyBonus(nowBonusIndex:number, costNotEnough: boolean, func:(buy:boolean) => void, thisObj: any) { if (func != null) func(false); };
    public BuyBonusType(): BuyBonusType { return BuyBonusType.BuyBonus; }
    public async OnBuyBonusResult(nowBonusIndex:number, buyBonusType: BuyBonusType) { };
    public async OnRePlayBonusResult() {};
    public async ReDataBuyBonus(bonusID:number,reData?:ReData) {};
    public async ShowBonus() { };
    public async ShowBonusStop() { };
    public async ShowBonusResult() { };
    public async ShowPickUPResult() { };
    public async BonusToMain() { };
    public ResultFinish() { };

    public CheckShowSpecialResult(): boolean { return false; }
    public async ShowSpecialResult() { }

    public async ShowUnitTestSpResult() { }

    public async ReDataInit() { }

    public createSpecialGameResult() { }

    public OnServerDiscountMoney() { }

    /**創建測試遊戲結果*/
    public createTestGameResult(normalResult: number[], bonusResult: number[][], jackpotMoney: number = 0) {
        var source: any[] = [];
        source.push(0); //moneyWin
        source.push(normalResult); // normal GameResult
        source.push(bonusResult); //bonus GameResult
        source.push(0); //nomal win
        source.push(0); //bonus win
        source.push(0); // result money
        source.push(0); // main no prize count ,use less
        source.push(0); // sub no prize count ,use less
        source.push(jackpotMoney); //jack pot prize
        source.push(0); // vip
        source.push(0); // vip current deposition in month
        source.push(0); // vip current play points in 90 days
        source.push([0, 0, 0]); // ticket list ,use less            
        return new ClientGameResult(source);
    }
}
