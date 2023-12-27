class GameNameTable extends TableBase {
    public TableName: string = "GameName";
    private static m_key = "Key";

    protected OnRowParsed(rowContent: Array<Object>) {

    }

    protected OnTableParsed() {

    }

    public static Get(Key: number): string {
        var value = null;
        if (TableManager.Instance.GetTable(GameNameTable) != null)
            value = TableManager.Instance.GetTable(GameNameTable).GetValue<number, string>(Key, LanguageType[SelfData.Instance.Language]);
        if (value != null)
            value = value.replace(/\\n/gi, "\n");
        return value;
    }
}