class DragonTigerTable extends TableBase {
    public TableName: string = "DragonTigerRate";

    public static m_UID: string = "UID";
    public static m_ResultIndex: string = "ResultIndex"; //開獎編號 0-2 龍:虎:和
    public static m_Rate: string = "A"; //賠率 A1-A3 龍:虎:和

    public static MaxLength: number = 3;
    public static SingleMaxBet: number[] = [
        500000,
        500000,
        200000,
    ]; //龍:虎:和
    public static CreateEmptyBetArray(): number[] {
        return [0, 0, 0];
    }

    private RateDic: Dictionary = new Dictionary([]); //key:UID, value:[A1,A2,A3]  龍:虎:和

    protected OnRowParsed(rowContent: Array<Object>) {
        var uid: number = rowContent[this.GetColumnNameIndex(DragonTigerTable.m_UID)] as number;
        var resultIndex: number = rowContent[this.GetColumnNameIndex(DragonTigerTable.m_ResultIndex)] as number;

        if (!this.RateDic.containsKey(uid)) {
            this.RateDic.add(uid, DragonTigerTable.CreateEmptyBetArray());
        }

        for (let i = 1; i <= DragonTigerTable.MaxLength; ++i) {
            let rate: number = rowContent[this.GetColumnNameIndex(DragonTigerTable.m_Rate + i)] as number;
            this.RateDic[uid][i - 1] = rate;
        }
    }

    public GetRate(uid: number): number[] {
        if (this.RateDic.containsKey(uid))
            return this.RateDic[uid];
        return DragonTigerTable.CreateEmptyBetArray();
    }
}