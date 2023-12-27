abstract class IGameLogic {

    public resultData:NormalResultData =null;
    constructor(result: NormalResultData)
    {
        this.resultData = result;
    }
    abstract getNormalResult( inData: Array<number>, bet: number): SlotResultBase;

}

/**槽結果圖庫*/
class SlotResultBase {
    public data: Array<number> = [];
    public getBet: number = 0;
    public getRate: number = 0;
    public subGameCount: number = 0;
    public subGameType: number = undefined;
    public isFull: boolean = false;
    public isSpecialFullOne: boolean = false;
    public isSpecialFullTwo: boolean = false;    
    public lineIndex: Array<number> = new Array<number>();
    public lineCount: Array<number> = new Array<number>();
    public lineMoney: Array<number> = new Array<number>();
    public wildData : Array<number> = new Array<number>();
    public maybeBonusIndex: Array<number> = new Array<number>();
    /** 可能中大獎  Key: WheelIndex, Value: [num, ...] */
    public maybeBigWinIndex: Dictionary = new Dictionary([]);
    public lineName: Array<string> = new Array<string>();
    public lineNum: Array<number> = new Array<number>();
    public lineData: Array<Array<number>> = new Array<Array<number>>();
    public subLineCount: Array<number> = new Array<number>();
    public isMaybeBonus: boolean = false;
    public isBonus: Array<PlayGameType> = [];
    public isFullPerformance: boolean = false;
    public endmaybeBonusIndex: Array<number> = new Array<number>();

     /**檢查獎金類型*/
    public CheckBonusType(playType:PlayGameType )
    {
        return this.isBonus.indexOf(playType) > -1;
    }
}

/**正常結果數據*/
class NormalResultData {
    public gameType: string = "";
    public maxNumber: number = 0;
    /**免費遊戲地址*/
    public freeGameindex: Array<number> = new Array<number>();
    /**Wild遊戲地址*/
    public wildIndex: Array<number> = new Array<number>();
}

/** return Dictionary[Key: WheelIndex, Value: [num, ...]] */
function CalculateManyLineMaybeBigWin(gameType: string, data: Array<number>, rows: number, columns: number, lineTable: SlotLineTable, rateTable: SlotRateTable, wildIdx: Array<number>, LockWildIdx: Array<number>): Dictionary {
    let ret: Dictionary = new Dictionary([]);
    let bigWinRate = SelfData.Instance.BigWinRate * SelfData.Instance.PlaySetting.BetRate;

    let lineData: Array<Array<number>> = lineTable.getLineData(gameType);

    for (let i = 0, imax = lineData.length; i < imax; ++i) {
        let targetNum = data[lineData[i][0]]

        //取得table連線資訊, ex: 3連=3倍, 4連=10倍, 5連=50倍
        //key: lineCount, value: rate
        let tableWinRateDic: Dictionary = new Dictionary([]);
        for (let j = 0; j < columns; ++j) {
            let rate = rateTable.getValue<number>(gameType, targetNum, j + 1, SlotRateTable.m_rate);
            if (rate > 0) tableWinRateDic.add(j + 1, rate);
        }

        for (let j = 1, jmax = lineData[i].length; j < jmax; ++j) {
            let wheelIndex = j;
            if (ret.containsKey(wheelIndex) && ret[wheelIndex].indexOf(targetNum) > -1)
                continue;
            
            let count = 1;
            for (let k = 1; k < jmax; ++k) {
                if (k == wheelIndex) {
                    count++;
                    continue;
                }
                else if (count != k) {
                    break;
                }
                let index = lineData[i][k];
                let num = data[index];
                if (k < wheelIndex) {
                    if (num == targetNum || wildIdx.indexOf(num) > -1) count++;
                }
                else {
                    if (LockWildIdx.indexOf(index) > -1) count++;
                }
            }
            if (tableWinRateDic.containsKey(count)) {
                let rate = tableWinRateDic[count];
                if (rate >= bigWinRate) {
                    if (!ret.containsKey(wheelIndex))
                        ret.add(wheelIndex, []);
                    if (ret[wheelIndex].indexOf(targetNum) < 0)
                        ret[wheelIndex].push(targetNum);
                }
            }
        }
    }

    return ret;
}

/** return Dictionary[Key: WheelIndex, Value: [num, ...]] */
function Calculate243MaybeBigWin(gameType: string, data: Array<number>, rows: number, columns: number, rateTable: SlotRateTable, wildIdx: Array<number>, LockWildIdx: Array<number>): Dictionary {
    let ret: Dictionary = new Dictionary([]);
    let bigWinRate = SelfData.Instance.BigWinRate * SelfData.Instance.PlaySetting.BetRate;

    let calculated = [];
    for (let wi = 0; wi < rows; ++wi) {
        let targetNum = data[wi];
        if (calculated.indexOf(targetNum) > -1)
            continue;

        if (wildIdx.indexOf(targetNum) > -1)
            continue;

        //取得table連線資訊, ex: 3連=3倍, 4連=10倍, 5連=50倍
        //key: lineCount, value: rate
        let tableWinRateDic: Dictionary = new Dictionary([]);
        for (let i = 0; i < columns; ++i) {
            let rate = rateTable.getValue<number>(gameType, targetNum, i + 1, SlotRateTable.m_rate);
            if (rate > 0) tableWinRateDic.add(i + 1, rate);
        }

        //取得targetNum連線資訊, ex: 3連=3倍, 4連=10倍, 5連=50倍
        //key: lineCount, value: rate
        let winRateDic: Dictionary = new Dictionary([]);
        let rate = 1;
        let next = 0;
        for (let i = 0; i < columns; ++i) {
            let count = 0;
            for (let j = 0; j < rows; ++j) {
                let num = data[i * rows + j];
                if (num == targetNum || wildIdx.indexOf(num) > -1) count++;
            }
            if (count > 0 && next == i) {
                rate *= count;
                next++;
                winRateDic.add(i + 1, rate);
            }
        }

        for (let i = 0, imax = tableWinRateDic._keys.length; i < imax; ++i) {
            let tableLine = tableWinRateDic._keys[i];
            let tableRate = tableWinRateDic[tableLine];
            //檢查是否可連線, ex: lineCount=3連, 檢查targetNum是否可2連
            let targetNumLineCount = tableLine - 1;
            if (winRateDic.containsKey(targetNumLineCount)) {
                rate = winRateDic[targetNumLineCount] * tableRate;
                if (rate >= bigWinRate) {
                    let wheelIndex = tableLine - 1;
                    if (!ret.containsKey(wheelIndex))
                        ret.add(wheelIndex, []);
                    ret[wheelIndex].push(targetNum);
                }
            }
        }

        //Lock Wild
        for (let i = 1; i < columns; ++i) {
            if (ret.containsKey(i) && ret[i].indexOf(targetNum) > -1)
                continue;
            
            let wheelIndex = i;
            let wheelRate = 0;
            rate = 1;
            next = 0;
            for (let j = 0; j < columns; ++j) {
                //假設wheelIndex有targetNum
                if (j == wheelIndex && next == j) {
                    next++;                  
                    continue;
                }
                let count = 0;
                for (let k = 0; k < rows; ++k) {
                    let index = j * rows + k;
                    let num = data[index];
                    if (j < wheelIndex) {
                        if (num == targetNum || wildIdx.indexOf(num) > -1) count++;
                    }
                    else {
                        if (LockWildIdx.indexOf(index) > -1) count++;
                    }
                }
                if (count > 0 && next == j) {
                    rate *= count;
                    next++;
                    wheelRate = rate;
                }
            }

            let lineCount = next;
            if (wheelRate > 0 && tableWinRateDic.containsKey(lineCount)) {
                let tableRate = tableWinRateDic[lineCount];
                rate = rate * tableRate;
                if (rate >= bigWinRate) {
                    if (!ret.containsKey(wheelIndex))
                        ret.add(wheelIndex, []);
                    if (ret[wheelIndex].indexOf(targetNum) < 0)
                        ret[wheelIndex].push(targetNum);
                }
            } 
        }

        calculated.push(targetNum)
    }
    consoleLog("MaybeBigWin: " + JSON.stringify(ret))
    return ret;
}