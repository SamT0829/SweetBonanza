class SlotLineTable extends TableBase
{
    public TableName:string         = "SlotLine";
    private DataMap:Dictionary      = new Dictionary([]);
    public static m_line:string     = "Line";      //連線的格子代號

    private static m_slotID:string  = "GameType"; //game type

    protected OnRowParsed(rowContent:Array<Object>)
    {
        var slotID:string = rowContent[this.GetColumnNameIndex(SlotLineTable.m_slotID)] as string;
        var lineDataString:string = rowContent[this.GetColumnNameIndex(SlotLineTable.m_line)] as string;
        var lineRawData:string[] = lineDataString.split(',');
        var lineData:Array<number> = new Array();
        
        for( let i = 0,max = lineRawData.length; i < max; ++i )
            lineData.push(parseInt(lineRawData[i]));
        
        if ( this.DataMap.containsKey(slotID) )
        {
            var arrayArray:Array<Array<number>> = this.DataMap[slotID];
            arrayArray.push(lineData);
        }
        else
        {
            var arrayArray:Array<Array<number>> = new Array();
            arrayArray.push(lineData);
            this.DataMap[slotID] = arrayArray;
        }
    }

    public getLineData( SlotID:string )
    {
        if ( this.DataMap.containsKey(SlotID) )
            return this.DataMap[SlotID];
        return null;
    }

}