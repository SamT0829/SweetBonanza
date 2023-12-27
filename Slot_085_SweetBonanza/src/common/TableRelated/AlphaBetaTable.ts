class AlphaBetaTable extends TableBase {
	
	public TableName: string = "alphabetaTable";
	public static m_UID: string = "UID";
    public static m_Display: string = "Display";
    public static m_PlateRearrange: string = "PlateRearrange";

	private data: Dictionary = new Dictionary([]);

	 protected OnRowParsed(rowContent: Array<Object>) {
        var uid: number = rowContent[this.GetColumnNameIndex(AlphaBetaTable.m_UID)] as number;
        var display: string = rowContent[this.GetColumnNameIndex(AlphaBetaTable.m_Display)] as string;
        var plateRearrange: number = rowContent[this.GetColumnNameIndex(AlphaBetaTable.m_PlateRearrange)] as number;

		var e: AlphaBeta = new AlphaBeta(uid);
        e.SetData(display, plateRearrange);

        this.data.add(uid, e);
    }

	 public GetValue(uid: number) {
        return this.data[uid];
    }

}

class AlphaBeta {
    public UID: number = 1;
    public PlateRearrange: number = 0;
    public Display: string = "";

    public constructor(uid: number) {
        this.UID = uid;
    }

    public SetData(display: string, plateRearrange: number) {
        this.PlateRearrange = plateRearrange;
        this.Display = display;
    }
}