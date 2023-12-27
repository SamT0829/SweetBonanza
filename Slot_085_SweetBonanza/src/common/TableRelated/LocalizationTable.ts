class LocalizationTable extends TableBase
{
	public TableName:string = "Localization";
	private static m_key = "Key";

	protected OnRowParsed(rowContent:Array<Object>) 
    {
        
    }

	protected OnTableParsed()
    {

    }

	public static Get(Key: number): string
    {
        var value = null;
        if(TableManager.Instance.GetTable(LocalizationTable) != null)
            value = TableManager.Instance.GetTable(LocalizationTable).GetValue<number,string>(Key,  LanguageType[SelfData.Instance.Language]);
        if (value != null)
            value = value.replace(/\\n/gi, "\n");
        else
            value = LocalizationCommonTable.Get(Key);
        return value;
    }
}

class LocalizationCommonTable extends TableBase
{
	public TableName:string = "LocalizationCommon";
	private static m_key = "Key";

	protected OnRowParsed(rowContent:Array<Object>) 
    {
        
    }

	protected OnTableParsed()
    {

    }

	public static Get(Key: number): string
    {
        var value = null;
        if(TableManager.Instance.GetTable(LocalizationCommonTable) != null)
            value = TableManager.Instance.GetTable(LocalizationCommonTable).GetValue<number,string>(Key,  LanguageType[SelfData.Instance.Language]);
        if (value != null)
            value = value.replace(/\\n/gi, "\n");
        else{
            if( Key >90000 && Key < 100000){
                if(TableManager.Instance.GetTable(LocalizationCommonTable) != null)
                    value = LocalizationCommonTable.Get(99999);
                else
                    value = Key;
            }
            else{
                value = Key
            }
        }
        return value;
    }
}

class GameTipTable extends TableBase
{
    public TableName:string = "GameTip";
	private static m_UID = "UID";
    private static loadingTipUID:number[] = [1,2,3,4,5,6,7,8,9,10];
    protected OnRowParsed(rowContent:Array<Object>) 
    {
        
    }

	protected OnTableParsed()
    {

    }

    public static Get(uid: number): string
    {
        var value = TableManager.Instance.GetTable(GameTipTable).GetValue<number,string>(uid,  LanguageType[SelfData.Instance.Language]);
        if (value == null || value == "")
			return uid.toString();
        if (value != null)
            value = value.replace(/\\n/gi, "\n");
        return value;
    }

    public static GetLoadingTip(): string
    {
        let random = randomInt(0,this.loadingTipUID.length,false);
        var value = TableManager.Instance.GetTable(GameTipTable).GetValue<number,string>(this.loadingTipUID[random],  LanguageType[SelfData.Instance.Language]);
        if (value == null || value == "")
			return random.toString();
        if (value != null)
            value = value.replace(/\\n/gi, "\n");
        return value;
    }
}