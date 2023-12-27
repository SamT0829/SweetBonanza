class BorderBetTable extends TableBase {
    public TableName: string = "BorderBet";
    public static m_GameType: string = "GameType";
    public static m_Bet: string = "Bet";
    public static m_BetRate: string = "BetRate";
    public static m_MaxBet: string = "MaxBet";

    public static GetMaxBet(gameType: string): number {
        let table = TableManager.Instance.GetTable(BorderBetTable);
        if (table == null)
            return 0;

        return table.GetValue<number, number>(gameType, BorderBetTable.m_MaxBet)*SelfData.Instance.PlaySetting.CurrencyScale;
    }
}