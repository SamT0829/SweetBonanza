class SpinShowManager extends BreakAwaySpinShowManager {
    public CurrentForShowItem: number[] = [];
    public CurrentDataIndex: number = 0;
    public FiliterList: number[] = [0, 1, 12, 13];
    public SetWildShowData() {
        let nextData = BreakAwayGameData.Instance.GetSingleData(this.CurrentDataIndex + 1);
        let nextTemp = [];
        if (nextData == null) {
            for (let i = 0, imax = this._mapSize[1]; i < imax; ++i) {
                nextTemp.push(this.GetRandomItemID(i, this.FiliterList));
            }
        }
        else {
            let datas = GameLogic.Instance.SlotResult.lineData;
            let indexes = [0, 0, 0, 0, 0, 0];

            for (let i = 0, imax = datas[0].length; i < imax; ++i) {
                 let cell = Math.floor(datas[0][i] / this._mapSize[0]);
                indexes[cell]++;
            }

            for (let i = 0, imax = this._mapSize[1]; i < imax; ++i) {
                if (indexes[i] == 0) {
                    nextTemp.push(this.GetRandomItemID(i, this.FiliterList));
                    continue;
                }
                let getIndex: number = indexes[i] - 1;
                nextTemp.push(nextData[i * this._mapSize[0] + getIndex]);
            }
        }

        let stackInfo: WildShowStackInfo = new WildShowStackInfo();
        for (let i = 0, imax = this._mapSize[1]; i < imax; ++i) {
            let temp = [nextTemp[i]];
            for (let j = 0, jmax = this._mapSize[0]; j < jmax; ++j) {
                let value = this.CurrentForShowItem[i * this._mapSize[0] + j];
                if (value == 20) value = this.GetRandomItemID(i, this.FiliterList);
                temp.push(value);
            }
            stackInfo.NextStack[i] = temp;
        }
        GameLogic.Instance.ShowResult = [];
        GameLogic.Instance.ShowResult.push(stackInfo.NextStack);
        GameLogic.Instance.ShowResult.push([[], [], [], [], []]);
    }

}