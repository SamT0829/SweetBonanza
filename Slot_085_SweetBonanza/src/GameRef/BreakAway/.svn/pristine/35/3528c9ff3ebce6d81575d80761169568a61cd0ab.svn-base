class BreakAwayController<T1 extends ISlotView, T2 extends IGameLogic> extends BaseController<T1, T2>{
	//protected BreakAwayGameData.Instance: BreakAwayGameData = null;

	private get currentComboRateIdx(): number { return BreakAwayGameData.Instance.CurrentDataIdx }
	protected SpinShowManager: BreakAwaySpinShowManager = null;

	public Init() {

		//this.SetSpecialResultData();

		super.Init();

		let items = this.view.slotWheelManager.GetAllShowItem();
		let itemsPos = [];
		for (let i = 0; i < items.length; i++) {
			itemsPos.push(new egret.Point(items[i].x, items[i].y));
		}
		
		BreakAwayGameData.Instance.ItemMap = new ItemMap([3, 5], itemsPos);
		BreakAwayGameData.Instance.SlotLogic = this.slotLogic;

		this.SpinShowManager = new BreakAwaySpinShowManager(BreakAwayGameData.Instance.ItemMap.MapSize, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
		this.SpinShowManager.GetIconName = (x,f = [])=>{return this.view.slotWheelManager.wheels[x].getIconName(f);}
		this.SetMiscTable();
		//this.SetFirstRoundIcon();
	}

	protected SetSpecialResultData()
	{
		this.specialresult = [];
		//this.specialresult = BreakAwayGameData.Instance.SpecialResult;
		//this.FirstIconPlate = BreakAwayGameData.Instance.FirstIconResult;
	}

	public SetMiscTable() {
		let miscStr: string = TableManager.Instance.GetTable(MiscDataTable).GetValue("ComboRateMG");
		if (miscStr != null) {
			let rates = miscStr.split(",");
			for (let i = 0; i < rates.length; i++) {
				BreakAwayGameData.Instance.ComboRateMG.push(parseInt(rates[i]));
			}
		}

		miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ComboRateFG");
		if (miscStr != null) {
			// miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ComboRateFG");
			let rates = miscStr.split(",");
			for (let i = 0; i < rates.length; i++) {
				BreakAwayGameData.Instance.ComboRateFG.push(parseInt(rates[i]));
			}
		}

		miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ConnectAnimWaitingTime");
		if (miscStr != null) {
			// miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ConnectAnimWaitingTime");
			let waitTimes = miscStr.split(",");
			for (let i = 0; i < waitTimes.length; i++) {
				BreakAwayGameData.Instance.ConnectAnimWaitingTime.push(parseInt(waitTimes[i]));
			}
		}

		miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ConnectAnimWinRate");
		if (miscStr != null) {
			// miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ConnectAnimWinRate");
			let animRate = miscStr.split(",");
			for (let i = 0; i < animRate.length; i++) {
				BreakAwayGameData.Instance.ConnectAnimRate.push(parseInt(animRate[i]));
			}
		}
	}

	private SetFirstRoundIcon() {
		let data = [];
		for (let i = 0; i < BreakAwayGameData.Instance.ItemMap.MapSize[1]; i++) {
			let item = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			for (let j = 0; j < BreakAwayGameData.Instance.ItemMap.MapSize[0]; j++) {
				let ramdonIdx = randomInt(0, item.length, false);
				data.push(item[ramdonIdx].toString());
				item.splice(ramdonIdx, 1);
			}
		}
		this.view.slotWheelManager.SetAllShowItem(data);
	}

	public OnGameResult(data: Array<number>, clientGameResult: ClientGameResult = null, isMainGame: boolean = true) {

		super.OnGameResult(data);
		BreakAwayGameData.Instance.SetData(data,BreakAwayGameData.Instance.ItemMap.ItemCount);
		let money = 0;
		let bonus = false;
		for (let i = 0; i < BreakAwayGameData.Instance.DataAmount; i++) {
			GameLogic.Instance.SlotResult = this.slotLogic.getNormalResult(this.SetSpecialWildToWild(BreakAwayGameData.Instance.GetSingleData(i)), 1);
			money += GameLogic.Instance.SlotResult.getBet * SelfData.Instance.PlaySetting.Bet * BreakAwayGameData.Instance.GetComboRate(i, isMainGame);
			if(!bonus && GameLogic.Instance.SlotResult.CheckBonusType(PlayGameType.BonusRound))
				bonus = true;
		}
		GameLogic.Instance.SlotResult = this.slotLogic.getNormalResult(this.SetSpecialWildToWild(BreakAwayGameData.Instance.GetCurrentSingleData()), 1);
		if (BreakAwayGameData.Instance.GetCurrentSingleData().indexOf(BreakAwayGameData.Instance.SpecialWildID) >= 0) {
			GameLogic.Instance.SlotResult.isBonus.push(PlayGameType.MainGame);
			GameLogic.Instance.SlotResult.isFullPerformance = true;
		}
		GameLogic.Instance.SlotResult.data = BreakAwayGameData.Instance.GetCurrentSingleData();
		if(bonus && !GameLogic.Instance.SlotResult.CheckBonusType(PlayGameType.BonusRound))
		{
			GameLogic.Instance.SlotResult.isBonus.push(PlayGameType.BonusRound);
		}
		this.SpinShowManager.SetWildShowData();
		return money;
	}



	protected GetBreakItemIdxs(data: number[]) {
		let datatFiliter = BreakAwayGameData.Instance.FiliterItem;
		let result = this.slotLogic.getNormalResult(data, 1);
		let itemIdxs: number[] = [];
		for (let i = 0, max = result.lineIndex.length; i < max; ++i) {
			let lineIndex = result.lineIndex[i];
			let linedata = result.lineData[lineIndex];
			for (let j = 0, jmax = result.lineCount[i]; j < jmax; ++j) {
				var index = linedata[j];
				if (datatFiliter.indexOf(data[index]) < 0 && itemIdxs.indexOf(index)<0)
					itemIdxs.push(index);
			}
		}
		return itemIdxs;
	}

	public async BonusToMain() {
		await super.BonusToMain();
		BreakAwayGameData.Instance.FreeGameCount = 0;
	}

	protected SetSpecialWildToWild(data: number[]) {
		let sdata = []
		for (let i = 0; i < data.length; i++) {
			if (data[i] == BreakAwayGameData.Instance.SpecialWildID)
				sdata.push(BreakAwayGameData.Instance.WildID[0]);
			else
				sdata.push(data[i]);
		}
		return sdata;
	}

	public GetConnectLineLength(idxList: number[]): number {
		return Math.floor(Math.max(...idxList) / 3);
	}
}