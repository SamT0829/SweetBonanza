class BuyBonusTable extends TableBase {
    public TableName: string = "BuyBonus";

    public static m_GameType: string = "GameType";
    public static m_BonusType: string = "BonusType";
    public static m_Condition_1: string = "Condition_1";
    public static m_BuyRate: string = "BuyRate";
    public static m_BuyTimes: string = "BuyTimes";
    public static m_AddFreeCount: string = "AddFreeCount";
    public static m_NeedIcon: string = "NeedIcon";
    public static m_PlayTime: string = "PlayTime";

    private _ConditionDic: Dictionary = new Dictionary([]);

    protected OnRowParsed(rowContent: Array<Object>) {
        let gameType: string = rowContent[this.GetColumnNameIndex(BuyBonusTable.m_GameType)] as string;
        if (SelfData.Instance.TargetGame != gameType)
            return;
        
        let bonusType = rowContent[this.GetColumnNameIndex(BuyBonusTable.m_BonusType)] as number;
        let condition_1 = rowContent[this.GetColumnNameIndex(BuyBonusTable.m_Condition_1)] as number;
        let buyRate = rowContent[this.GetColumnNameIndex(BuyBonusTable.m_BuyRate)] as number;
        let buyTimes = rowContent[this.GetColumnNameIndex(BuyBonusTable.m_BuyTimes)] as number;
        let addFreeCount = rowContent[this.GetColumnNameIndex(BuyBonusTable.m_AddFreeCount)] as number;
        let needIcon = rowContent[this.GetColumnNameIndex(BuyBonusTable.m_NeedIcon)] as number;
        let playTime = rowContent[this.GetColumnNameIndex(BuyBonusTable.m_PlayTime)] as number;
        let key = bonusType + "_" + condition_1;
        this._ConditionDic.add(key, new BuyBonusTableData(buyRate, buyTimes, addFreeCount, needIcon, playTime));
    }

    public BuyRate(bonusType: number, condition_1: number): number {
        let key = bonusType + "_" + condition_1;
        if (!this._ConditionDic.containsKey(key))
            return 0;
        return this._ConditionDic[key].BuyRate;
    }

    public BuyCost(bonusType: number, condition_1: number): number {
        let key = bonusType + "_" + condition_1;
        if (!this._ConditionDic.containsKey(key))
            return 0;
        return this._ConditionDic[key].BuyRate * SelfData.Instance.PlaySetting.TotleBet;
    }

    public BuyCost_JustShow(bonusType: number, condition_1: number, _bet): number {
        let key = bonusType + "_" + condition_1;
        if (!this._ConditionDic.containsKey(key))
            return 0;
        return this._ConditionDic[key].BuyRate * _bet;
    }

    public BuyTimes(bonusType: number, condition_1: number): number {
        let key = bonusType + "_" + condition_1;
        if (!this._ConditionDic.containsKey(key))
            return 0;
        return this._ConditionDic[key].BuyTimes;
    }

    public AddFreeCount(bonusType: number, condition_1: number): number {
        let key = bonusType + "_" + condition_1;
        if (!this._ConditionDic.containsKey(key))
            return 0;
        return this._ConditionDic[key].AddFreeCount;
    }

    public NeedIcon(bonusType: number, condition_1: number): number {
        let key = bonusType + "_" + condition_1;
        if (!this._ConditionDic.containsKey(key))
            return 0;
        return this._ConditionDic[key].NeedIcon;
    }

    public PlayTime(bonusType: number, condition_1: number): number {
        let key = bonusType + "_" + condition_1;
        if (!this._ConditionDic.containsKey(key))
            return 0;
        return this._ConditionDic[key].PlayTime;
    }

    public GetMax(){
       return this._ConditionDic.Count;
    }
}

class BuyBonusTableData {
    public constructor(rate, times, addCount, needIcon, playTime) {
        this.BuyRate = rate;
        this.BuyTimes = times;
        this.AddFreeCount = addCount;
        this.NeedIcon = needIcon;
        this.PlayTime = playTime;
    }
    public BuyRate: number;
    public BuyTimes: number;
    public AddFreeCount: number;
    public NeedIcon: number;
    public PlayTime: number;
}