class MiscDataTable extends TableBase {
    public TableName: string = "MiscData";
    public static m_GameType: string = "GameType";  // game type
    public static m_Key = "Key";
    public static m_Value = "Value";

    private data:Dictionary = new Dictionary([]);

    protected OnRowParsed(rowContent: Array<Object>) {
        var key: string = rowContent[this.GetColumnNameIndex(MiscDataTable.m_Key)] as string;
        var value: string = rowContent[this.GetColumnNameIndex(MiscDataTable.m_Value)] as string;
        this.data.add(key,value);
    }

    public GetValue(key:string)
    {
        return this.data[key];
    }
}