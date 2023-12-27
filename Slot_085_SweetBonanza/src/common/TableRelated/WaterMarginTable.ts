class WaterMarginTable extends TableBase {
    public TableName: string = "WaterMargin";

    public static m_UID: string = "UID";
    public static m_IconId: string = "IconId";
    public static m_Rate: string = "Rate";
    public static m_DisplayId: string = "DisplayId";
    public static m_IconPos: string = "IconPos";

    private data: Dictionary = new Dictionary([]);
    private display: Dictionary = new Dictionary([]);
    private iconPos: Dictionary = new Dictionary([]);

    protected OnRowParsed(rowContent: Array<Object>) {
        var uid: number = rowContent[this.GetColumnNameIndex(WaterMarginTable.m_UID)] as number;
        var iconId: number = rowContent[this.GetColumnNameIndex(WaterMarginTable.m_IconId)] as number;
        var rate: number = rowContent[this.GetColumnNameIndex(WaterMarginTable.m_Rate)] as number;
        var displayId: number = rowContent[this.GetColumnNameIndex(WaterMarginTable.m_DisplayId)] as number;
        var iconPos: string = rowContent[this.GetColumnNameIndex(WaterMarginTable.m_IconPos)] as string;
        var iconPosArray = iconPos.split(',');
        var intIconPosArray: number[] = [];
        iconPosArray.forEach(x => intIconPosArray.push(parseInt(x)));
        this.data.add(iconId, rate);
        this.display.add(iconId, displayId);
        this.iconPos.add(iconId, intIconPosArray);
    }

    public GetRate(iconId: number): number {
        if (this.data.containsKey(iconId))
            return this.data[iconId];
        else
            return 0;
    }

    public GetDisplayId(iconId: number): number {
        if (this.display.containsKey(iconId))
            return this.display[iconId];
        else
            return 0;
    }

    public GetIconPosArray(iconId: number): number[] {
        if (this.iconPos.containsKey(iconId))
            return this.iconPos[iconId];
        else
            return [];
    }
}