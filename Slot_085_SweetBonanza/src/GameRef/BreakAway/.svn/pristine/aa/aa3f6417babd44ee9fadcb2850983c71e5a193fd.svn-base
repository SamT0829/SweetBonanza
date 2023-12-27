class BreakAwayGameData {

	private static _instance: BreakAwayGameData;
	public static get Instance(): BreakAwayGameData {
		if (this._instance == null) {
			this._instance = new BreakAwayGameData();
		}
		return this._instance;
	}

	public SlotLogic: IGameLogic = null;
	//public SpecialResultData: SpecialResultData = new SpecialResultData();
	public ItemMap: ItemMap = null;

	public SoundName: SoundName = new SoundName();

	private _Data: number[] = [];
	private _SingleDataList: Array<number[]> = [];
	private _CurrentDataIdx: number = -1;
	public DataAmount = 0;
	private _fillItemList: Array<number[]> = [];

	public NeedSpinWildLineIdx: number[] = [2, 3, 4];
	public SpinItemLength: number = 16;
	public WildLength: number = 13;

	public WildID: Array<number> = [0];
	public SpecialWildID: number = -99;
	public FreeGameItemID: number = 9;
	public FreeGameItemID_ForShow: number = 9;
	public FiliterItem: number[];

	public WaitTimeForSingleID: Dictionary = new Dictionary([
		{ key: 0, value: 0 },
		{ key: 1, value: 1.33 * 4 },
		{ key: 2, value: 1.5 * 4 },
		{ key: 3, value: 1.23 * 4 },
		{ key: 4, value: 1.3 * 4 },
		{ key: 5, value: 0.51 * 2 },
		{ key: 6, value: 0.95 * 2 },
		{ key: 7, value: 0.79 * 2 },
		{ key: 8, value: 1 * 2 },
		{ key: 9, value: 0.8 * 2 },
		{ key: 10, value: 1 * 5 },
	]);
	public ConnectAnimWaitingTime: number[] = [];
	public ConnectAnimRate: number[] = [];
	public ComboRateMG: number[] = [];
	public ComboRateFG: number[] = [];
	public IsFreeGame = false;
	public FreeGameCount: number = 0;

	public SetData(data: number[], showItemCount: number) {
		this._Data = data;
		this.DataAmount = 0;
		let _index = 0;
		for (let j = 0; j < data.length; j++) {
			_index++;
			if (_index == showItemCount) {
				this.DataAmount += 1;
				_index = 0;
			}
		}
		//this.DataAmount = data.length / showItemCount;
		this._SingleDataList = [];
		for (let i = 0; i < this.DataAmount; i++) {
			let sData = [];
			for (let j = 0; j < showItemCount; j++) {
				sData.push(data[i * showItemCount + j]);
			}
			this._SingleDataList.push(sData);
		}

		this._CurrentDataIdx = 0;
	}

	public get CurrentDataIdx() { return this._CurrentDataIdx; }

	// public get SpecialResult() : Array<any>
	// {
	// 	//return this.SpecialResultData.GetResult();
	// }

	// public get FirstIconResult() : Array<any>
	// {
	// 	//return this.SpecialResultData.GetFirtRoundIcon();
	// }

	public GetComboRate(combo: number, ismaingame): number {
		if (combo >= this.ComboRateMG.length - 1)
			combo = this.ComboRateMG.length - 1;
		if (ismaingame)
			return this.ComboRateMG[combo];
		else
			return this.ComboRateFG[combo];
	}

	public get CurrentComboRate(): number {
		return this.GetComboRate(this._CurrentDataIdx, this.IsFreeGame);
	}

	public UpdateCurrentDataIdx() {
		this._CurrentDataIdx++;
	}

	public get IsIdxOutOfRange(): boolean {
		return this._CurrentDataIdx >= this._SingleDataList.length;
	}

	public get IsDataEnd(): boolean {
		return this._CurrentDataIdx >= this._SingleDataList.length - 1;
	}

	public GetSingleData(idx: number) {
		if (idx >= this._SingleDataList.length) {
			//consoleLog("idx is out of range! length: " + this._SingleDataList.length + ",input idx: " + idx);
			return null;
		}
		return this._SingleDataList[idx];
	}

	public GetLastSingleData() {
		if (this._CurrentDataIdx - 1 < 0)
			return null;
		return this.GetSingleData(this._CurrentDataIdx - 1);
	}

	public GetCurrentSingleData(): number[] {
		if (this.IsIdxOutOfRange) {
			//consoleLog("current idx is out of range! length: " + this._SingleDataList.length + ",current idx: " + this._CurrentDataIdx);
			return null;
		}
		return this.GetSingleData(this._CurrentDataIdx);
	}

	public GetNextSingleData(): number[] {
		if (this._CurrentDataIdx + 1 >= this._SingleDataList.length)
			return null;
		return this.GetSingleData(this._CurrentDataIdx + 1);
	}

	public GetNextSingleData_index(index: number): number[] {
		if (this._CurrentDataIdx + index >= this._SingleDataList.length)
			return null;
		return this.GetSingleData(this._CurrentDataIdx + index);
	}

	public GetCurrentSingleArrayData(): number[][] {
		if (this.IsIdxOutOfRange) {
			consoleLog("current idx is out of range! length: " + this._SingleDataList.length + ",current idx: " + this._CurrentDataIdx);
			return null;
		}
		let data = this.GetSingleData(this._CurrentDataIdx);
		data = copyArray(data, 0, data.length);
		let arrayData: Array<number[]> = [];
		for (let i = 0; i < this.ItemMap.MapSize[1]; i++) {
			arrayData.push(data.splice(0, this.ItemMap.MapSize[0]));
		}
		return arrayData;

	}

	public GetBreakItemIdxs(idx: number, filiter: number[]) {
		let data = this.GetSingleData(idx);
		let result = this.SlotLogic.getNormalResult(data, 1);
		let itemIdxs: number[] = [];
		for (let i = 0, max = result.lineIndex.length; i < max; ++i) {
			let lineIndex = result.lineIndex[i];
			let linedata = result.lineData[lineIndex];
			for (let j = 0, jmax = result.lineCount[i]; j < jmax; ++j) {
				var index = linedata[j];
				if (filiter.indexOf(data[index]) < 0 && itemIdxs.indexOf(index) < 0)
					itemIdxs.push(index);
			}
		}
		return itemIdxs;
	}

	public GetBreakItemIdxsByResult(result: SlotResultBase, filiter: number[]) {
		let itemIdxs: number[] = [];
		for (let i = 0, max = result.lineIndex.length; i < max; ++i) {
			let lineIndex = result.lineIndex[i];
			let linedata = result.lineData[lineIndex];
			for (let j = 0, jmax = result.lineCount[i]; j < jmax; ++j) {
				var index = linedata[j];
				if (filiter.indexOf(result.data[index]) < 0 && itemIdxs.indexOf(index) < 0)
					itemIdxs.push(index);
			}
		}
		return itemIdxs;
	}

	public CheckNoFill(index: number){
		let result;
		if(this.GetNextSingleData_index(index) != null)
			result = this.SlotLogic.getNormalResult(this.GetNextSingleData_index(index), 1);
		return result;
    }

	public get CurrentConnectShowItemIdx() { return this.GetBreakItemIdxs(this._CurrentDataIdx, []); }
	public get CurrentConnectItemIdx() { return this.GetBreakItemIdxs(this._CurrentDataIdx, this.FiliterItem); }
	public get CurrentBreakItemIdx() { return this.GetBreakItemIdxs(this._CurrentDataIdx, this.FiliterItem); }

	public get CurrentConnectLineLength() {
		return this.GetConnectLineLength(this.GetBreakItemIdxs(this._CurrentDataIdx, [this.FreeGameItemID, this.FreeGameItemID_ForShow]));
	}


	public GetConnectAnimWaitingTime(): number {

		let data = this.GetCurrentSingleData();
		let result = this.SlotLogic.getNormalResult(data, 1);
		let itemIdxs: number[] = [];
		let waitingTime = 0;
		for (let i = 0, max = result.lineIndex.length; i < max; ++i) {
			let lineIndex = result.lineIndex[i];
			let linedata = result.lineData[lineIndex];
			for (let j = 0, jmax = result.lineCount[i]; j < jmax; ++j) {
				var index = linedata[j];
				let iconID = data[index];
				waitingTime = Math.max(this.WaitTimeForSingleID[iconID], waitingTime);
			}
		}

		let subwin = GameLogic.Instance.SlotResult.getBet * SelfData.Instance.PlaySetting.Bet * BreakAwayGameData.Instance.CurrentComboRate;
		let winRate = subwin / SelfData.Instance.PlaySetting.TotleBet;
		let len = BreakAwayGameData.Instance.ConnectAnimRate.length;
		for (let i = 0; i < len; i++) {
			if (winRate <= BreakAwayGameData.Instance.ConnectAnimRate[i]) {
				waitingTime = Math.max(this.ConnectAnimWaitingTime[i], waitingTime);
				return waitingTime;
			}
		}
		waitingTime = Math.max(this.ConnectAnimWaitingTime[len - 1], waitingTime);
		return waitingTime;
	}

	public GetConnectLineLength(idxList: number[]): number {
		return Math.floor(Math.max(...idxList) / 3);
	}
}


class ItemMap {
	public ItemCountNumber: number = 0;
	public constructor(mapSize: number[], itemsPos: egret.Point[]) {
		this._MapSize = mapSize;
		this._ItemsPos = itemsPos;
		this._ItemHeight = itemsPos[1].y - itemsPos[0].y;
	}
	public IconNameMaps: Dictionary = new Dictionary([]); //by item idx to IconName	
	private _MapSize: number[] = [-1, -1];
	public get MapSize(): number[] { return this._MapSize; }
	public get ItemCount(): number { return this.ItemCountNumber; }
	public set ItemCount(val: number) { this.ItemCountNumber = val; }
	private _ItemsPos: egret.Point[] = [];
	private _ItemHeight: number = 0;
	public get ItemHeight() { return this._ItemHeight; }
	public ItemRowsMap: Dictionary;
	public ItemRow: number[] = [];

	public GetItemPos(idx: number) {
		return this._ItemsPos[idx];
	}
}