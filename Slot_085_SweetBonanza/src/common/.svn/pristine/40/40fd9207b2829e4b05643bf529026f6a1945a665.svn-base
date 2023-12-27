class SlotLineNameTable extends TableBase
{
    public TableName : string   = "SlotLineName";
    private static m_key        = "Key";

    protected OnRowParsed(rowContent:Array<Object>) 
    {
        
    }

    protected OnTableParsed(){

    }

    public static Get(Key: number): string
    {
        var value = null;
        if(TableManager.Instance.GetTable(SlotLineNameTable) != null)
            value = TableManager.Instance.GetTable(SlotLineNameTable).GetValue<number,string>(Key,  LanguageType[SelfData.Instance.Language]);
        if (value == null || value == "")
        {
			return Key.toString();
        }
        value = value.replace(/\\n/gi, "\n");
        return value;
    }
}