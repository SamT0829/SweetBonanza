class CoinSymbolsTable extends TableBase {
    public TableName: string = "CoinSymbols";

    public static m_UID: string = "UID";
    public static m_Currency: string = "Currency";
    public static m_Symbol: string = "Symbol";
    public static m_SymbolName: string = "SymbolName";
    public static m_Name: string = "Name";
    public static m_Scale: string = "Scale";
    public static m_ClientShow: string = "ClientShow";

    private static DataMap: Dictionary = new Dictionary([]);
    protected OnRowParsed(rowContent: Array<Object>) {
        //let UID: number = rowContent[this.GetColumnNameIndex(CoinSymbolsTable.m_UID)] as number;
        let currency: string = rowContent[this.GetColumnNameIndex(CoinSymbolsTable.m_Currency)] as string;
        let symbol: string = rowContent[this.GetColumnNameIndex(CoinSymbolsTable.m_Symbol)] as string;
        let symbolName: string = rowContent[this.GetColumnNameIndex(CoinSymbolsTable.m_SymbolName)] as string;
        let scale: number = rowContent[this.GetColumnNameIndex(CoinSymbolsTable.m_Scale)] as number;
        let clientShow: number = rowContent[this.GetColumnNameIndex(CoinSymbolsTable.m_ClientShow)] as number;

        let data = new CoinSymbolData();
        data.Currency = currency;
        data.Symbol = symbol;
        data.SymbolName = symbolName;
        data.Scale = scale;
        data.ClientShow = clientShow;
        CoinSymbolsTable.DataMap.add(currency, data);
    }

    public static GetCoinSymbolData(currency: string): CoinSymbolData {
        if (CoinSymbolsTable.DataMap.containsKey(currency) != null)
            return CoinSymbolsTable.DataMap[currency];
        return new CoinSymbolData();
    }

}

class CoinSymbolData {
    public Currency: string = "RMB";
    public Symbol: string = "¥";
    public SymbolName: string = "yen";
    public Scale: number = 1;
    public ClientShow: number = 0;
}