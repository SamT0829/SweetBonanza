class BreakAwaySpinShowManager {

    protected _mapSize: number[] = [0, 0];
    public set MapSize(mapSize) { this._mapSize = mapSize; }
    private _randomItemIDList: number[] = [];
    public GetIconName = null;

    private PreWildShowStackInfo: WildShowStackInfo = new WildShowStackInfo();
    protected GetRandomItemID(wheelIdx: number, filiterIDs: number[]): number {
        if (this.GetIconName != null) {
            let id = parseInt(this.GetIconName(wheelIdx, filiterIDs));
            // while(filiterIDs.indexOf(id)>=0)
            // {
            //     id = parseInt(this.GetIconName(wheelIdx));
            // }
            return id;
        }
        else {
            let randomIdx = randomInt(0, this._randomItemIDList.length, false);
            return this._randomItemIDList[randomIdx];
        }
    }

    private get NeedWildLineShow(): boolean {
        let r = randomInt(0, 100);
        return !this.ContainNotNeedWildLineIdx && r < 25;
    }

    protected ContainNotNeedWildLineIdx: boolean = false;

    public constructor(mapSize: number[], randomItemIDList: number[]) {
        this._mapSize = mapSize;
        this._randomItemIDList = randomItemIDList;
    }

    public SetWildShowData() {

        let wildShowInfo = this.GetTopAndEndWildCount();
        let stackInfo = this.GetTopAndEndWildStack(wildShowInfo);

        stackInfo = this.AddRandomWildLine(stackInfo);
        stackInfo = this.AdjustStackLength(stackInfo);

        let sdata = BreakAwayGameData.Instance.GetCurrentSingleData();

        for (let i = 0; i < this._mapSize[1]; i++) {
            let temp = [];
            for (let j = 0; j < this._mapSize[0]; j++) {
                let idx = i * this._mapSize[0] + j;
                if (sdata[idx] == BreakAwayGameData.Instance.SpecialWildID)
                    temp.push(this.GetRandomItemID(i, []));
                else
                    temp.push(sdata[idx]);
            }
            stackInfo.NextStack[i] = stackInfo.NextStack[i].concat(temp);
        }
        GameLogic.Instance.ShowResult = [];
        GameLogic.Instance.ShowResult.push(stackInfo.NextStack);
        GameLogic.Instance.ShowResult.push(stackInfo.EndStack);
    }

    protected GetTopAndEndWildCount(): WildShowInfo {
        let wildInfo: WildShowInfo = new WildShowInfo(this._mapSize[1]);

        let lineLength = 0;
        let filiter = [BreakAwayGameData.Instance.SpecialWildID, BreakAwayGameData.Instance.FreeGameItemID_ForShow, BreakAwayGameData.Instance.FreeGameItemID];
        for (let singleDataIdx = 0; singleDataIdx < BreakAwayGameData.Instance.DataAmount; singleDataIdx++) {

            if (singleDataIdx > 0) {
                let idxList = BreakAwayGameData.Instance.GetBreakItemIdxs(singleDataIdx - 1, filiter);
                lineLength = this.GetConnectLineLength(idxList);
            }
            let currentData = BreakAwayGameData.Instance.GetSingleData(singleDataIdx);
            for (let i = 0; i < this._mapSize[1]; i++) {
                for (let j = this._mapSize[0] - 1; j >= 0; j--) {
                    let idx = i * this._mapSize[0] + j;
                    if ( BreakAwayGameData.Instance.WildID.indexOf(currentData[idx]) > -1 ) {
                        if (singleDataIdx == 0 || (BreakAwayGameData.Instance.NeedSpinWildLineIdx.indexOf(i) >= 0 && i <= lineLength)) {
                            wildInfo.WildCout_OnNext[i]++;
                            if (wildInfo.IsWildLine[i])
                                wildInfo.WildCout_OnEnd[i]++;
                        }
                    }
                    else {
                        if (singleDataIdx == 0 || (BreakAwayGameData.Instance.NeedSpinWildLineIdx.indexOf(i) >= 0 && i >= lineLength))
                            wildInfo.WildCout_OnNext[i] = 0;
                        wildInfo.IsWildLine[i] = false;
                    }
                }
            }
        }
        return wildInfo;
    }

    protected GetTopAndEndWildStack(showInfo: WildShowInfo): WildShowStackInfo {
        let stackInfo: WildShowStackInfo = new WildShowStackInfo();

        for (let i = 0; i < this._mapSize[1]; i++) {
            stackInfo.NextStack.push([]);
            stackInfo.EndStack.push([]);

            if (showInfo.WildCout_OnEnd[i] > 0) {
                let count = BreakAwayGameData.Instance.WildLength - showInfo.WildCout_OnEnd[i];
                if (showInfo.IsWildLine[i]) {
                    let random = randomInt(0, count);
                    for (let k = 0; k < count - random; k++) {
                        stackInfo.EndStack[i].push(BreakAwayGameData.Instance.WildID[0]);
                    }
                    for (let k = 0; k < random; k++) {
                        stackInfo.NextStack[i].push(BreakAwayGameData.Instance.WildID[0]);
                    }
                }
                else {
                    for (let k = 0; k < count; k++) {
                        stackInfo.EndStack[i].push(BreakAwayGameData.Instance.WildID[0]);
                    }
                }
            }
            else if (showInfo.WildCout_OnNext[i] > 0) {
                for (let k = 0; k < BreakAwayGameData.Instance.WildLength - showInfo.WildCout_OnNext[i]; k++) {
                    stackInfo.NextStack[i].push(BreakAwayGameData.Instance.WildID[0]);
                }
            }
            stackInfo.MaxNextStackLength = stackInfo.MaxNextStackLength < stackInfo.NextStack[i].length ? stackInfo.NextStack[i].length : stackInfo.MaxNextStackLength;
            stackInfo.MaxEndStackLength = stackInfo.MaxEndStackLength < stackInfo.EndStack[i].length ? stackInfo.EndStack[i].length : stackInfo.MaxEndStackLength;
        }

        return stackInfo;
    }

    protected AddRandomWildLine(stackInfo: WildShowStackInfo): WildShowStackInfo {
        let randomLength = BreakAwayGameData.Instance.SpinItemLength - BreakAwayGameData.Instance.WildLength;
        let sdata = BreakAwayGameData.Instance.GetCurrentSingleArrayData();
        for (let i = 0; i < stackInfo.EndStack.length; i++) {
            if (BreakAwayGameData.Instance.NeedSpinWildLineIdx.indexOf(i) >= 0 && stackInfo.NextStack[i].length == 0 && stackInfo.EndStack[i].length == 0) {
                if (this.NeedWildLineShow) {
                    let topLength = randomInt(0, randomLength);

                    for (let len = 0; len < topLength; len++) {
                        let tmpStack = sdata[i].concat(stackInfo.EndStack[i]);
                        let filiter = [];

                        for (let count = 0; count < this._mapSize[0]; count++) {
                            let t = tmpStack[tmpStack.length - (1 + count)]
                            if (t != null)
                                filiter.push(t);
                        }
                        stackInfo.EndStack[i].push(this.GetRandomItemID(i, filiter));

                    }
                    for (let j = 0; j < BreakAwayGameData.Instance.WildLength; j++)
                        stackInfo.EndStack[i].push(BreakAwayGameData.Instance.WildID[0]);
                    for (let j = 0; j < randomLength - topLength; j++) {
                        let tmpStack = sdata[i].concat(stackInfo.EndStack[i]);
                        let filiter = [];
                        for (let count = 0; count < this._mapSize[0]; count++) {
                            let t = tmpStack[tmpStack.length - (1 + count)];
                            if (t != null)
                                filiter.push(t);
                        }

                        stackInfo.EndStack[i].push(this.GetRandomItemID(i, filiter));
                    }
                    stackInfo.MaxEndStackLength = stackInfo.MaxEndStackLength < stackInfo.EndStack[i].length ? stackInfo.EndStack[i].length : stackInfo.MaxEndStackLength;
                }
            }
        }
        return stackInfo;
    }

    protected AdjustStackLength(stackInfo: WildShowStackInfo): WildShowStackInfo {
        let maxEndCount = stackInfo.MaxEndStackLength 　> BreakAwayGameData.Instance.SpinItemLength ? 　stackInfo.MaxEndStackLength 　: 　BreakAwayGameData.Instance.SpinItemLength;
        let sdata = BreakAwayGameData.Instance.GetCurrentSingleArrayData();
        for (let i = 0; i < this._mapSize[1]; i++) {
            let randomNextCount = stackInfo.MaxNextStackLength - stackInfo.NextStack[i].length;
            let randomEndCount = maxEndCount - stackInfo.EndStack[i].length;

            let tempNext = [];
            for (let j = 0; j < randomNextCount; j++) {

                let reverseData = copyArray(tempNext,0,tempNext.length).reverse();
                let tmpStack = reverseData.concat(stackInfo.NextStack[i], sdata[i]);
                let filiter = [];

                for (let count = 0; count < this._mapSize[0]; count++) {
                    let t = tmpStack[count];
                    if (t != null)
                        filiter.push(t);
                }
                tempNext.push(this.GetRandomItemID(i, filiter));

            }
            stackInfo.NextStack[i] = tempNext.reverse().concat(stackInfo.NextStack[i]);

            for (let j = 0; j < randomEndCount; j++) {
                let tmpStack = sdata[i].concat(stackInfo.EndStack[i]);
                let filiter = [];
                for (let count = 0; count < this._mapSize[0]; count++) {
                    let t = tmpStack[tmpStack.length - (1 + count)]
                    if (t != null)
                        filiter.push(t);
                }
                stackInfo.EndStack[i].push(this.GetRandomItemID(i, filiter));
            }
        }

        return stackInfo;
    }

    public GetConnectLineLength(idxList: number[]): number {
        return Math.floor(Math.max(...idxList) / 3);
    }
}

class WildShowInfo {
    public IsWildLine: boolean[] = [];
    public WildCout_OnNext: number[] = []; 		// for O X X
    public WildCout_OnEnd: number[] = [];       // for X X O

    public constructor(length: number) {
        for (let i = 0; i < length; i++) {
            this.IsWildLine.push(true);
            this.WildCout_OnNext.push(0);
            this.WildCout_OnEnd.push(0);
        }
    }

}

class WildShowStackInfo {
    public NextStack: Array<Array<number>> = [];
    public EndStack: Array<Array<number>> = [];
    public MaxNextStackLength: number = 0;
    public MaxEndStackLength: number = 0;
}