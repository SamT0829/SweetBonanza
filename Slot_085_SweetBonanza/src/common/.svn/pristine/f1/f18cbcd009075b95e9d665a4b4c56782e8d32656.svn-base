class SlotRateTable extends TableBase
{
    public TableName : string               = "SlotRate";

    private m_ID : Dictionary               = new Dictionary([]);

    public static m_UID : string            = "UID";
    public static m_iconNum:string          = "IconNum"; //代號
    public static m_lineCount:string        = "LineCount"; //代號連線數量
    public static m_rate:string             = "Rate";  //倍率
    public static m_subGameCount:string     = "SubGameCount"; //Bonus Game 次數
    public static m_subGameType:string      = "SubGameType"; //Bonus Game 類型
    public static m_SlotLineName : string   = "ShowName";
    private static m_slotID:string          = "GameType"; //game type

    protected OnRowParsed(rowContent:Array<Object>) {
        var slotID:string                   = rowContent[this.GetColumnNameIndex(SlotRateTable.m_slotID)] as string;
        var iconNum:number                  = rowContent[this.GetColumnNameIndex(SlotRateTable.m_iconNum)] as number;
        var lineCount:number                = rowContent[this.GetColumnNameIndex(SlotRateTable.m_lineCount)] as number;
        var uid:number                      = rowContent[this.GetColumnNameIndex(SlotRateTable.m_UID)] as number;
        this._SetID( uid, slotID, iconNum, lineCount );
    }

    public _SetID( index:number, id:string, id2:number, id3:number )
    {
        if ( !this.m_ID.containsKey(id) )
        {
            var d2:Dictionary = new Dictionary([]);
            var d3:Dictionary = new Dictionary([]);

            d3.add(id3, index);
            d2.add(id2, d3);
            this.m_ID.add(id, d2);
        }
        else if ( !this.m_ID[id].containsKey(id2) )
        {
            var d2:Dictionary = this.m_ID[id];
            var d3:Dictionary = new Dictionary([]);

            d3.add(id3, index);
            d2.add(id2, d3);
        }
        else
        {
            var d2:Dictionary = this.m_ID[id];
            var d3:Dictionary = d2[id2];

            if ( !d3.containsKey(id3) )
                d3.add( id3, index );
        }
    }

    public getValue<T extends string | number>( slotID:string, iconNum:number, lineCount:number, columnName:string ):T
    {
        if ( this.m_ID.containsKey(slotID) )
        {
            var d2:Dictionary = this.m_ID[slotID];
            if ( d2.containsKey( iconNum ) )
            {
                var d3:Dictionary = d2[iconNum];
                if ( d3.containsKey( lineCount ) )
                {
                    var row:number = d3[lineCount];
                    return this.GetValue<number, T>(row, columnName);
                }
            }
        }
        return null;
    }
}

