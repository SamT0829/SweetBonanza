class JpValueTable extends TableBase {
    public TableName: string = "JpValue";
    public static m_UID: string = "UID";
    public static m_GameType: string = "GameType";
    public static m_JpType: string = "JpType";
    public static m_MinRate: string = "MinRate";
    public static m_MaxRate: string = "MaxRate";

    private uidDic: Dictionary = new Dictionary([]);

    protected OnRowParsed(rowContent: Array<Object>) {
        let uid: number = rowContent[this.GetColumnNameIndex(JpValueTable.m_UID)] as number;
        let gameType: string = rowContent[this.GetColumnNameIndex(JpValueTable.m_GameType)] as string;
        let jpType: number = rowContent[this.GetColumnNameIndex(JpValueTable.m_JpType)] as number;
        let minRate: number = rowContent[this.GetColumnNameIndex(JpValueTable.m_MinRate)] as number;
        let maxRate: number = rowContent[this.GetColumnNameIndex(JpValueTable.m_MaxRate)] as number;
        this.setJpIndex(uid, gameType, jpType);
    }

    private setJpIndex(uid: number, gameType: string, jpType: number) {
        this.uidDic.add(gameType + "_" + jpType, uid);
    }

    private getJpUID(gameType: string, jpType: number): number {
        let key: string = gameType + "_" + jpType;
        if (this.uidDic.containsKey(key))
            return this.uidDic[key];
        return -1;
    }

    public GetJpText(gameType: string, jpType: number, bet: number): string {
        let uid: number = this.getJpUID(gameType, jpType);
        if (uid < 0) return "ERROR";
        let minRate: number = this.GetValue<number, number>(uid, JpValueTable.m_MinRate);
        let maxRate: number = this.GetValue<number, number>(uid, JpValueTable.m_MaxRate);
        let minValue: number = minRate * bet;
        let maxValue: number = maxRate * bet;
        let minText: string = (minValue < 100000 ? toCoinToString(minValue) : this.formatToK(minValue));
        let maxText: string = (maxValue < 100000 ? toCoinToString(maxValue) : this.formatToK(maxValue));
        return maxText + "~\r\n" + minText;
    }

    public GetMaxJpText(gameType: string, jpType: number, bet: number): string {
        let uid: number = this.getJpUID(gameType, jpType);
        if (uid < 0) return "ERROR";
        let maxRate: number = this.GetValue<number, number>(uid, JpValueTable.m_MaxRate);
        let maxValue: number = maxRate * bet;
        let maxText: string = toCoinToString(maxValue);
        return maxText;
    }

    public GetJpCoinText(gameType: string, jpType: number, bet: number): string {
        let uid: number = this.getJpUID(gameType, jpType);
        if (uid < 0) return "ERROR";
        let minRate: number = this.GetValue<number, number>(uid, JpValueTable.m_MinRate);
        let minValue: number = minRate * bet;
        let minText: string = toCoinToString(minValue);
        return minText;
    }

    private formatToK(value: number): string {
        return (value / 100000) + "K";
    }
}