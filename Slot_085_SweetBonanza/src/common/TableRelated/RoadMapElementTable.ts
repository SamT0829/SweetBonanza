class RoadMapElementTable extends TableBase {
    public TableName: string = "RoadMapElement";
    public static m_UID: string = "UID";
    public static m_GameType: string = "GameType";
    public static m_PlateRearrange: string = "PlateRearrange";
    public static m_Win: string = "Win";

    private data: Dictionary = new Dictionary([]);
    protected OnRowParsed(rowContent: Array<Object>) {
        var uid: number = rowContent[this.GetColumnNameIndex(RoadMapElementTable.m_UID)] as number;
        var gameType: string = rowContent[this.GetColumnNameIndex(RoadMapElementTable.m_GameType)] as string;
        var plateRearrange: string = rowContent[this.GetColumnNameIndex(RoadMapElementTable.m_PlateRearrange)] as string;
        var win: number = rowContent[this.GetColumnNameIndex(RoadMapElementTable.m_Win)] as number;

        var e: RoadMapElement = new RoadMapElement(uid);
        e.SetData(plateRearrange, win);

        this.data.add(uid, e);
    }

    public GetValue(uid: number) {
        return this.data[uid];
    }

}

class RoadMapElement {
    public UID: number = 1;
    public PlateRearrange: string = "";
    //public PlateRearrangeArray: Array<number> = new Array();
    public Win: number = 0;

    public constructor(uid: number) {
        this.UID = uid;
    }

    public SetData(plateRearrange: string, win: number) {
        this.PlateRearrange = plateRearrange;
        // var rawData: string[] = plateRearrange.split('');
        // for (let i = 0, max = rawData.length; i < max; ++i) {
        //     this.PlateRearrangeArray.push(parseInt(rawData[i]));
        // }
        this.Win = win;
    }
}