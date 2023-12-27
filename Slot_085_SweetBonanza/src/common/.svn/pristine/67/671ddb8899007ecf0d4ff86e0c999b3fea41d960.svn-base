class GoldenSharkRateTable extends TableBase {
    public TableName: string = "GoldenSharkRate";

    public static m_UID: string = "UID";
    public static m_PlateVersion: string = "PlateVersion"; //盤面
    public static m_Light: string = "Light"; //一般0:送燈1
    public static m_ResultIndex: string = "ResultIndex"; //開獎編號 0-9 燕子:鴿子:孔雀:老鷹:獅子:熊貓:猴子:兔子:銀鯊:金鯊
    public static m_Rate: string = "A"; //賠率 A1-A12 燕子:鴿子:孔雀:老鷹:獅子:熊貓:猴子:兔子:飛禽:走獸:銀鯊:金鯊

    public static MaxLength: number = 12;
    public static SingleMaxBet: number = 50000;
    public static CreateEmptyBetArray(): number[] {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    public static GoldenSharkIndex: number = 11;
    public static MaliItemCount: number = 28;
    

    private UIShowRateDic: Dictionary = new Dictionary([]); //key:PlateVersion, value:[0,1,2,3,4,5,6,7,8,9,10,11] 燕子:鴿子:孔雀:老鷹:獅子:熊貓:猴子:兔子:飛禽:走獸:銀鯊:金鯊
    private RateDic: Dictionary = new Dictionary([]); //key:UID, value:[0,1,2,3,4,5,6,7,8,9,10,11]  燕子:鴿子:孔雀:老鷹:獅子:熊貓:猴子:兔子:飛禽:走獸:銀鯊:金鯊
    private ResultIndexDic: Dictionary = new Dictionary([]); //key: UID, value: ResultIndex
    private LightDic: Dictionary = new Dictionary([]); //key: UID, value: light 一般0:送燈1

    protected OnRowParsed(rowContent: Array<Object>) {
        var uid: number = rowContent[this.GetColumnNameIndex(GoldenSharkRateTable.m_UID)] as number;
        var version: number = rowContent[this.GetColumnNameIndex(GoldenSharkRateTable.m_PlateVersion)] as number;
        var light: number = rowContent[this.GetColumnNameIndex(GoldenSharkRateTable.m_Light)] as number;
        var resultIndex: number = rowContent[this.GetColumnNameIndex(GoldenSharkRateTable.m_ResultIndex)] as number;

        if (!this.UIShowRateDic.containsKey(version)) {
            this.UIShowRateDic.add(version, GoldenSharkRateTable.CreateEmptyBetArray());
        }

        if (!this.RateDic.containsKey(uid)) {
            this.RateDic.add(uid, GoldenSharkRateTable.CreateEmptyBetArray());
        }

        this.ResultIndexDic.add(uid, resultIndex);
        this.LightDic.add(uid, light);

        for (let i = 1; i <= GoldenSharkRateTable.MaxLength; ++i) {
            let rate: number = rowContent[this.GetColumnNameIndex(GoldenSharkRateTable.m_Rate + i)] as number;
            this.RateDic[uid][i - 1] = rate;
            if (rate > this.UIShowRateDic[version][i - 1]) {
                this.UIShowRateDic[version][i - 1] = toCoinToString(rate).replace(".00", "");
            }
        }
    }

    public GetRate(uid: number): number[] {
        if (this.RateDic.containsKey(uid))
            return this.RateDic[uid];
        return GoldenSharkRateTable.CreateEmptyBetArray();
    }

    public IsLight(uid: number): boolean {
        if (this.LightDic.containsKey(uid))
            return this.LightDic[uid] == 1;
        return false;
    }

    public GetResultIndex(uid: number): number {
        if (this.ResultIndexDic.containsKey(uid))
            return this.ResultIndexDic[uid];
        return 0;
    }

    public GetUIShowRate(version: number): number[] {
        if (this.UIShowRateDic.containsKey(version))
            return this.UIShowRateDic[version];
        return GoldenSharkRateTable.CreateEmptyBetArray();
    }
}
