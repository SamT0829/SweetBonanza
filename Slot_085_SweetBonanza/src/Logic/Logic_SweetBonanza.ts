class Logic_SweetBonanza extends IGameLogic {
    private minAwardCount: number = 8;
    private minScatterAwardCount: number = 4;
    private minScatterAwardCountAtFreeGame: number = 3;
    private freeGameBonusIconId: number = 101;
    private freeGameBonusIconCount: number = 14;

    getNormalResult(inData: number[], bet: number): SlotResultBase {
        let result: SlotResultBase = new SlotResultBase;
        result.data = inData;
        result.lineData = new Array<Array<number>>();

        let slotID: string = this.resultData.gameType;
        let maxIdx: number = this.resultData.maxNumber;
        let freegameIdx: Array<number> = this.resultData.freeGameindex;
       
        let freeGameBonusIconIdx: Array<number> = [];
        for (let i = 0; i < this.freeGameBonusIconCount; i++) {
            freeGameBonusIconIdx.pushNoRepeat(this.freeGameBonusIconId + i);
        }
        let wildIdx: Array<number> = this.resultData.wildIndex;
        let bonusIdx: Array<number> = new Array<number>();
        let freeGameBonusIdx: Array<number> = new Array<number>();
        let slotRows: number = SweetBonanzaGameModel.Instance.SlotRow;
        let slotColumns: number = SweetBonanzaGameModel.Instance.SlotColumns;
        // let lineTable: Array<Array<Array<number>>> = new Array<Array<Array<number>>>();
        let lineTable: Array<Array<number>> = new Array<Array<number>>();
        let lineIdx: number = 0;
        let calculated: Array<number> = new Array<number>();
        let rateTable: SlotRateTable = TableManager.Instance.GetTable(SlotRateTable);
        let _maybeBonus: number = 2;
        let mybeBonusType: Array<boolean> = [false, false, false, false, false];

        // Create Line Table
        for (let index = 0; index <= maxIdx; ++index) {
            let temp: Array<number> = new Array<number>();
            lineTable.push(temp);
        }

        // Push Line Table Data 
        for (let i = 0; i < inData.length; ++i) {
            // let slotIndex: number = inData[i];
            let slotIndex: number = inData[i];

            if (freegameIdx.indexOf(slotIndex) > -1) {
                bonusIdx.push(i);
                lineTable[slotIndex].push(i);
            }
            else if (freeGameBonusIconIdx.indexOf(slotIndex) > -1){
                freeGameBonusIdx.push(i);
            }
            else {
                if (slotIndex <= maxIdx)
                    lineTable[slotIndex].push(i);
            }
        }

        let lineCount: number = 0;
        // Check Line Table
        for (let i = 0; i < lineTable.length; ++i) {
            let Line243Name: number = 1;
            let subLineData: Array<number> = [];
            let rate: number = 1;
            let slotIndex: number = i;
            let slotCount: number = lineTable[i].length;
            
            if (freegameIdx.indexOf(slotIndex) > -1) {
                if(SweetBonanzaGameModel.Instance.IsFreeGame){
                    if(slotCount < this.minScatterAwardCountAtFreeGame || lineCount > 0)
                        continue;

                }
                else{
                    if (slotCount < this.minScatterAwardCount || lineCount > 0)
                        continue;
                }
            }
            else {
                if (slotCount < this.minAwardCount)
                    continue;

                lineCount++;
            }

            Line243Name *= slotCount;
            lineTable[i].forEach(x => subLineData.push(x));
            rate = rate * slotCount;

            let getbet: number = 0;
            let subGameCount: number = 0;
            let bonusIdxLength: number = 0;
            if (freegameIdx.indexOf(slotIndex) > -1) {
                bonusIdxLength = slotCount;
                getbet = bet * rateTable.getValue<number>(slotID, slotIndex, bonusIdxLength, SlotRateTable.m_rate);
                subGameCount = rateTable.getValue<number>(slotID, slotIndex, bonusIdxLength, SlotRateTable.m_subGameCount);
            }
            else
                getbet = bet * rateTable.getValue<number>(slotID, slotIndex, slotCount, SlotRateTable.m_rate);

            // Calculate Result
            if (getbet > 0 || subGameCount > 0) {
                // getbet = getbet * rate;
                let getLineName: string = TableManager.Instance.GetTable(SlotLineNameTable).GetValue<number, string>(rateTable.getValue<number>(slotID, slotIndex,
                    slotCount, SlotRateTable.m_SlotLineName), LanguageType[SelfData.Instance.Language]);
                result.getBet += getbet;
                result.lineIndex.push(lineIdx);
                result.lineMoney.push(getbet);
                result.lineCount.push(subLineData.length);
                result.lineData.push(subLineData);
                result.lineName.push(getLineName);
                result.lineNum.push(slotIndex);
                result.subLineCount.push(Line243Name);
                lineIdx++;
                if (subGameCount > 0) {
                    result.subGameCount = subGameCount;
                    result.isBonus.push(PlayGameType.BonusRound);
                }
            }
        }

        if(lineCount == 0 && freeGameBonusIdx.length > 0 && SweetBonanzaGameModel.Instance.winResult){
            for (let i = 0; i < freeGameBonusIdx.length; ++i){
                let Line243Name: number = 1;
                let slotIndex: number = inData[freeGameBonusIdx[i]];
                let subLineData: Array<number> = [];
                
                // if(result.lineNum.indexOf(slotIndex) > -1){
                //     result.lineData[slotIndex].push(freeGameBonusIdx[i])
                //     continue;
                // }

                subLineData.push(freeGameBonusIdx[i]);
                
                Line243Name *= subLineData.length;
                
                let bonusRate = rateTable.getValue<number>(slotID, slotIndex, 1, SlotRateTable.m_rate);
                let getLineName: string = TableManager.Instance.GetTable(SlotLineNameTable).GetValue<number, string>(rateTable.getValue<number>(slotID, slotIndex,
                    1, SlotRateTable.m_SlotLineName), LanguageType[SelfData.Instance.Language]);
                result.getRate += bonusRate;
                result.lineIndex.push(lineIdx);
                result.lineMoney.push(bonusRate);
                result.lineCount.push(subLineData.length);
                result.lineData.push(subLineData);
                result.lineName.push(getLineName);
                result.lineNum.push(slotIndex);
                result.subLineCount.push(Line243Name);
                lineIdx++;
            }
        }

        // let SortData: Array<any> = [];
        // for (let i = 0, max = result.lineMoney.length; i < max; i++) {
        //     SortData.push({
        //         lineIndex: result.lineIndex[i],
        //         lineMoney: result.lineMoney[i],
        //         lineCount: result.lineCount[i],
        //         lineName: result.lineName[i],
        //         lineSubLineCount: result.subLineCount[i],
        //     })
        // }
        // SortData.sort((x, y) => {
        //     return y["lineMoney"] - x["lineMoney"];
        // });

        // result.lineIndex = [];
        // result.lineMoney = [];
        // result.lineCount = [];
        // result.lineName = [];
        // result.subLineCount = [];
        // for (let i = 0, max = SortData.length; i < max; ++i) {
        //     result.lineIndex.push(SortData[i]["lineIndex"]);
        //     result.lineMoney.push(SortData[i]["lineMoney"]);
        //     result.lineCount.push(SortData[i]["lineCount"]);
        //     result.lineName.push(SortData[i]["lineName"]);
        //     result.subLineCount.push(SortData[i]["lineSubLineCount"]);
        // }
        result.data = copyArray(inData, 0, inData.length);
        return result;
    }
}