function getSlotID() : string{
    return GameType[SelfData.Instance.TargetGameType];
}

function getTableFromManager<T extends TableBase>(type: { new(): T }): T {
    return <T>TableManager.Instance.GetTable(type);
}

function getBetDataFromBetTable(gameType: string): string[] {
    const betTable = getTableFromManager(SlotBetTable);
    const betDateCSV = betTable.GetValue<string, string>(gameType, SlotBetTable.m_Bet);
    return betDateCSV.split(",");
}

function getRateFromBetTable(gameType: string): number {
    const betTable = getTableFromManager(SlotBetTable);
    return betTable.GetValue<string, number>(gameType, SlotBetTable.m_BetRate);
}

function getValueFromRateTable(mainNum: number, lineCount: number, columnName: string): number {
    const rateTable = getTableFromManager(SlotRateTable);
    return rateTable.getValue<number>(getSlotID(), mainNum, lineCount, columnName);
}

function getRateFromRateTable(mainNum: number, lineCount: number): number {
    return getValueFromRateTable(mainNum, lineCount, SlotRateTable.m_rate);
}

function getLineNameFromRateTable(mainNum: number, lineCount: number): string {
    let id = getValueFromRateTable(mainNum, lineCount, SlotRateTable.m_SlotLineName);
    return SlotLineNameTable.Get(id);
}

function getRateFromRateTableWithSlotID(mainNum: number, lineCount: number, slotID: string): number {
    const rateTable = getTableFromManager(SlotRateTable);
    return rateTable.getValue<number>(slotID, mainNum, lineCount, SlotRateTable.m_rate);
}

function getSubCountFromRateTable(mainNum: number, lineCount: number): number {
    return getValueFromRateTable(mainNum, lineCount, SlotRateTable.m_subGameCount);
}

function getSubGameTypeFromRateTable(mainNum: number, lineCount: number): number {
    return getValueFromRateTable(mainNum, lineCount, SlotRateTable.m_subGameType);
}

function checkLineCountFromRateTable(mainNum: number, lineCount: number): boolean {
    return getValueFromRateTable(mainNum, lineCount, SlotRateTable.m_lineCount) !== null;
}

function recordNormal(result, money, lineIdx, lineCount, lineName, lineNum) {
    //  Log
    // consoleLog(`
    //             getBet : ${money},
    //             lineIndex : ${lineIdx},
    //             lineCount : ${lineCount},
    //             lineName : ${lineName},
    //             lineNum : ${lineNum}
    //         `);
    //  Result Push
    result.getBet += money;
    result.lineIndex.push(lineIdx);
    result.lineMoney.push(money);
    result.lineCount.push(lineCount);
    result.lineName.push(lineName);
    result.lineNum.push(lineNum);
}