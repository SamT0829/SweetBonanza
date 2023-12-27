class SlotLineLogic extends IGameLogic {
    public getNormalResult(inData: Array<number>, bet: number): SlotResultBase {
        let result: SlotResultBase = new SlotResultBase;
        result.data = inData;
        result.lineData = new Array<Array<number>>();

        let slotID: string = this.resultData.gameType;
        let maxIdx: number = this.resultData.maxNumber;
        let freegameIdx: Array<number> = this.resultData.freeGameindex;
        let wildIdx: Array<number> = this.resultData.wildIndex;
        let bonusIdx: Array<number> = new Array<number>();
        let slotRows: number = 3;
        let slotColumns: number = 5;
        let lineTable: Array<Array<Array<number>>> = new Array<Array<Array<number>>>();
        let lineIdx: number = 0;
        let calculated: Array<number> = new Array<number>();
        let rateTable: SlotRateTable = TableManager.Instance.GetTable(SlotRateTable);


        //  For Final Result
         result.lineData = getTableFromManager(SlotLineTable).getLineData(this.resultData.gameType);

        this.SlotLineAlgorithm(inData, this.resultData.gameType, (mainNum, lineIdx, lineCount, zeroCount, wildBet) => {

            //  lineCount Rule
            if (mainNum > maxIdx)
                return;
            const rate = getRateFromRateTable(mainNum, lineCount);
            //  When Get Some Money
            if (rate) {
                //consoleLog("Reward Item : " + mainNum);
                recordNormal(result, bet * getRateFromRateTable(mainNum, lineCount) * wildBet, lineIdx, lineCount, getLineNameFromRateTable(mainNum, lineCount), mainNum);
            }

        }, wildIdx);

        return result;
    }

    private SlotLineAlgorithm(inData, type, callBack, wild = [0]) {

        //  Get Table from TableManager
        const lineData = getTableFromManager(SlotLineTable).getLineData(type);

        //  Loop Through Table
        lineData.forEach((line, lineIdx) => {

            //  Init Counter
            let mainNum;
            let nowNum;
            let lineCount = 0;
            let zeroCount = 0;
            let wildBet = 0;

            //  Check Line Positions
            for (let i = 0; i < line.length; i++) {

                const position = line[i];
                nowNum = inData[position];

                //  Set mainNum
                if (mainNum === undefined || wild.indexOf(mainNum) > -1) mainNum = nowNum;

                //  Match Fail
                if ((wild.indexOf(mainNum) < 0 && wild.indexOf(nowNum) < 0 && mainNum != nowNum)) break;

                //  Match
                if (wild.indexOf(nowNum) > -1 || nowNum == mainNum) {
                    lineCount++;
                    if (wild.indexOf(nowNum) > -1) {
                        zeroCount++;
                        let _bet = 1;
                        if (nowNum == 0 || nowNum >= 200) {
                            _bet = 2;
                        }
                        else if (nowNum == 1 || nowNum >= 301) {
                            _bet = 3;
                        }
                        wildBet += _bet;
                    }
                }

            }
            if (wildBet == 0) wildBet = 1;
            callBack(mainNum, lineIdx, lineCount, zeroCount, 1);
        });

    }
}