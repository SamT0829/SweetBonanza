class ExcludeStackTable extends TableBase {
    public TableName: string = "ExcludeStack";
    public static m_GameType: string = "GameType";  // game type
    public static m_Exclude = "Exclude";
    public static ExcludeStackIcon: Array<string> = [];

    protected OnRowParsed(rowContent: Array<Object>) {
        var key: string = rowContent[this.GetColumnNameIndex(ExcludeStackTable.m_GameType)] as string;
        var value: string = rowContent[this.GetColumnNameIndex(ExcludeStackTable.m_Exclude)] as string;
        if(value!="")
            ExcludeStackTable.ExcludeStackIcon = value.split(",");
    }

    public static CheckExcludeIcon(Icon: string) {
        return ExcludeStackTable.ExcludeStackIcon.indexOf(Icon) >= 0;
    }

}