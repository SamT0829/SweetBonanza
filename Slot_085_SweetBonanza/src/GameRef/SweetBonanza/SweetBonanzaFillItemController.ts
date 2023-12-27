class SweetBonanzaFillItemController {
	private _adjustmentFillPos: number = 0;
	protected _itemMap: ItemMap = null;
	public set ItemMap(itemMap: ItemMap) { this._itemMap = itemMap; }

	private _fixItemIdx: Array<number> = [];
	private _fillItemList: Array<number[]> = [];
	private _needBounce: boolean = false;
	private _ignoreBounce: Array<number> = [];
	private _wheelWaitTime: number = 0.02;
	private _fillItemTime = 17;
	public FillWaitTime = 0.1;

	public ItemHight: number = 0;

	public ChangeToWild: number[] = [11, 12, 13, 14, 15, 16, 17, 18];

	public FillOneItem_Move: number[] = [2, 4, 11, 16, 5, -2, 0, 3];
	public FillOneItem_Time: number[] = [1, 4, 4, 2, 1, 4, 1, 3];
	public FillTwoItem_Move: number[] = [8, 10, 16, 18, 23, 29, -5, -2, -1, 0, 1, 2, 5];
	public FillTwoItem_Time: number[] = [1, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 2, 1];
	public FillThreeItem_Move: number[] = [12, 16, 20, 24, 28, 35, 8, -2, 0, 4];
	public FillThreeItem_Time: number[] = [4, 2, 2, 2, 2, 2, 1, 4, 1, 3];
	public FillFourItem_Move: number[] = [9, 10, 14, 18, 21, 27, 29, 36, -5, -2, -1, 0, 1, 2, 5];
	public FillFourItem_Time: number[] = [2, 2, 2, 2, 2, 2, 2, 4, 1, 2, 1, 1, 1, 2, 1];
	public FillFiveItem_Move: number[] = [9, 10, 14, 18, 21, 27, 29, 32, 36, -5, -2, -1, 0, 1, 2, 5];
	public FillFiveItem_Time: number[] = [2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 2, 1, 1, 1, 2, 1];

	public AllOneFillList: number[];
	public AllTwoFillList: number[];
	public AllThreeFillList: number[];
	public AllFourFillList: number[];
	public AllFiveFillList: number[];

	public FillItemList: Array<Array<number>> = new Array<Array<number>>();
	public FillIndexList: number[] = [];
	public FillEndPos: number[] = [];
	public UpdateFillId: number = 0;
	public UseFillSlotItem: Array<SlotItem>;
	public IsFillEnd: boolean = false;

	public constructor(itemMap: ItemMap, itemhight: number, needBounce: boolean, ignoreBounce?: Array<number>, wheelWaitTime?: number, FillItemTime?: number) {
		this._itemMap = itemMap;
		this._needBounce = needBounce;
		this.ItemHight = itemhight;
		if (ignoreBounce != null) this._ignoreBounce = ignoreBounce;
		if (wheelWaitTime != null) this._wheelWaitTime = wheelWaitTime;
		if (FillItemTime != null) this._fillItemTime = FillItemTime;
		this.SetMoveTimeList();
	}

	public SetFillItemList(fillIdx: number[], nextData: number[]) {
		this._fillItemList = [];

		let idx = 0;
		let preCount = 0;
		for (let i = 0; i < this._itemMap.MapSize[1]; i++) {
			//算出每輪所要消除的個數
			let count: number = fillIdx.filter((x) => { return (i + 1) * this._itemMap.MapSize[0] > x; }).length - preCount;
			//取得掉落的新的符號			
			let vecFillData = [];
			for (let j = 0; j < this._itemMap.MapSize[0]; j++) {
				if (j % this._itemMap.MapSize[0] < count)
					vecFillData.push(nextData[idx]);
				idx++;
			}
			vecFillData.reverse();
			this._fillItemList.push(vecFillData);
			preCount += count;
		}
	}

	public async FillItems(slotItems: Array<SlotItem>, _lenght: number = 20) {
		this.UseFillSlotItem = [];
		this.UseFillSlotItem = slotItems;
		SweetBonanzaGameView.Instance.RemoveAllOutOfFrameFX();
		//await waitForSeconds(2);
		//把可視元件移動到相對掉落的位置(EX -> 元件高:130  第0:高0->-390, 第1:高130->-260, 第2:高260->-130)
		this.ItemMoveToWindowUpSide(this.UseFillSlotItem);
		// await waitForSeconds(2);
		//把沒消除的一回原位 相對位置改變(EX 第2沒消除 移回:-130->260 第1:高調整為-130 第0調整為-230)
		this.SetItemStartFillPos(this.UseFillSlotItem);
		// await waitForSeconds(2);
		//把落消的值塞回slotItem
		this.SetFillIcon(this.UseFillSlotItem);
		// await waitForSeconds(2);
		let idxCount = 0;
		let idxsArray = [];

		//Bounce
		for (let i = 0; i < this._itemMap.MapSize[1]; i++) {
			let idxs = [];
			for (let j = 0; j < this._itemMap.ItemRow[i]; j++) {
				let mapPos = this._itemMap.GetItemPos(idxCount);
				let needBonuce : boolean = false;
				
				needBonuce = this.UseFillSlotItem[idxCount].y != mapPos.y;

				if (needBonuce) {
					idxs.push(idxCount);
				}
				else{
					if(SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(this.UseFillSlotItem[idxCount].GetIndex()) >= 0){
						SweetBonanzaGameView.Instance.SetOutOfFrameFx(idxCount, this.UseFillSlotItem[idxCount].GetIndex());
						// this.UseFillSlotItem[idxCount].visible = false;
					}
				}
				idxCount++;
			}
			if (idxs.length > 0)
				idxsArray.push(idxs.reverse());
		}

		await waitForSeconds(this.FillWaitTime);

		//Wheel UpdateFill
		this.IsFillEnd = false;
		this.SetRunMoveList(this.UseFillSlotItem, idxsArray, _lenght);
		this.UpdateFillId = EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.UpdateFill);

		// for (let i = 0; i < idxsArray.length; i++) {
		// 	if (i == idxsArray.length - 1)
		// 		await this.FillWheelItems(this.UseFillSlotItem, idxsArray[i]);
		// 	else
		// 		this.FillWheelItems(this.UseFillSlotItem, idxsArray[i]);
		// 	SoundManger.Instance.PlaySoundSE(BreakAwayGameData.Instance.SoundName.DropDown);
		// 	//await waitForSeconds(this._wheelWaitTime);
		// }
		while (!this.IsFillEnd) {
			await waitForSeconds(0.01);
		}
		await waitForSeconds(0.2);
	}

	private ItemMoveToWindowUpSide(slotItems: Array<SlotItem>) {
		for (let i = 0; i < this._itemMap.ItemCount; i++) {
			let pos = this._itemMap.GetItemPos(i);
			slotItems[i].setXY(pos.x, pos.y - this.ItemRoweIndex(i) * this._itemMap.ItemHeight - this._adjustmentFillPos);
		}
	}

	private ItemRoweIndex(index: number) {
		return this._itemMap.ItemRow[this._itemMap.ItemRowsMap[index]];
	}

	private SetItemStartFillPos(slotItems: Array<SlotItem>) {
		let totleIndex = 0;
		for (let i = 0; i < this._itemMap.MapSize[1]; i++) {
			let count = this._itemMap.ItemRow[i] - 1;
			let visibleCount = 0;
			for (let j = this._itemMap.ItemRow[i] - 1; j >= 0; j--) {
				let currIdx = totleIndex + j;
				let fillIdx = totleIndex + count;
				let pos = this._itemMap.GetItemPos(currIdx);
				if (slotItems[currIdx].visible || SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(slotItems[currIdx].GetIndex()) >= 0 ) {
					if(SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(slotItems[currIdx].GetIndex()) >= 0){
						SweetBonanzaGameView.Instance.SetOutOfFrameFx(currIdx, slotItems[currIdx].GetIndex());
					}
					slotItems[fillIdx].setXY(pos.x, pos.y);
					count--;
					visibleCount++;
				}
			}
			for (let k = 0; k < this._itemMap.ItemRow[i] - visibleCount; k++) {
				let currIdx = totleIndex + k;
				let distance = visibleCount * this._itemMap.ItemHeight;
				slotItems[currIdx].setXY(slotItems[currIdx].x, slotItems[currIdx].y + distance);
				slotItems[currIdx].visible = true;
			}
			totleIndex += this._itemMap.ItemRow[i];
		}
	}

	private SetFillIcon(slotItems: Array<SlotItem>) {
		let showIcons = [];
		let idx: number = 0;

		for (let i = 0; i < this._itemMap.MapSize[1]; i++) {
			let unVisableCount: number = 0;
			let tmpData: number[] = [];
			for (let j = 0; j < this._itemMap.ItemRow[i]; j++) {
				if (slotItems[idx].visible)
					tmpData.push(slotItems[idx].GetIndex());
				else
					unVisableCount++;
				idx++;
			}

			for (let j = 0; j < unVisableCount; j++)
				tmpData = [this.GetFillItem(i)].concat(tmpData);

			showIcons = showIcons.concat(tmpData);
		}

		for (let d = 0; d < GameLogic.Instance.SlotResult.data.length; d++) {
			showIcons[d] = GameLogic.Instance.SlotResult.data[d]
		}

		//更換ICON
		for (let i = 0; i < this._itemMap.ItemCount; i++) {
			if(SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(slotItems[i].GetIndex()) >= 0){
				SweetBonanzaGameView.Instance.RemoveOutOfFrameFX(i);
			}
			slotItems[i].visible = true;
			slotItems[i].isBlur = false;
			slotItems[i].SetIcon(this._itemMap.IconNameMaps[showIcons[i]]);
		}
	}

	private async FillWheelItems(slotItems: Array<SlotItem>, itemIdxs: number[]) {
		let moveTime = this._fillItemTime;
		let perTime = 0.01;

		for (let i = 0; i < itemIdxs.length; i++) {
			if (this._fixItemIdx.filter((x) => { return x == itemIdxs[i]; }).length > 0)
				continue;
			let toPos: egret.Point = this._itemMap.GetItemPos(itemIdxs[i]);
			let toPosX = toPos.x;
			let toPosY = toPos.y;

			//slotItems[itemIdxs[i]].asCom.getTransition("tweenDown").play();
			egret.Tween.get(slotItems[itemIdxs[i]])
				.to({ x: toPosX, y: toPosY }, moveTime).call(() => {
					slotItems[itemIdxs[i]].scaleY = 1;
					if (this._needBounce && this._ignoreBounce.indexOf(itemIdxs[i]) < 0) {
						let trans = slotItems[itemIdxs[i]].asCom.getTransition("show");
						if (trans)
							trans.play();
					}
				});
			await waitForSeconds(perTime);
		}
	}

	public GetFillItem(idx: number): number {
		let num = this._fillItemList[idx][0];
		this._fillItemList[idx].splice(0, 1);
		return num;
	}

	private GetConnectItemIdxs() {
		let itemIdxs: number[] = [];

		for (let i = 0, max = GameLogic.Instance.SlotResult.lineIndex.length; i < max; ++i) {
			let lineIndex = GameLogic.Instance.SlotResult.lineIndex[i];
			let linedata = GameLogic.Instance.SlotResult.lineData[lineIndex];

			for (let j = 0, jmax = GameLogic.Instance.SlotResult.lineCount[i]; j < jmax; ++j) {
				let idx = linedata[j];

				if (itemIdxs.filter(x => { return x == idx; }).length == 0)
					itemIdxs.push(idx);
			}
		}

		return itemIdxs;
	}

	public UpdateFill() {
		let End: boolean = true;
		for (let i = 0; i < this.FillItemList.length; i++) {
			if (this.FillItemList[i].length > 0) {
				let Y = this.FillItemList[i].shift();

				this.UseFillSlotItem[i].setXY(this.UseFillSlotItem[i].x, this.UseFillSlotItem[i].y + Y);
				// if (this.FillItemList[i].length == 3){
				// 	// this.UseFillSlotItem[i].GetItemComponent().getTransition("down").play();
				// 	SoundManger.Instance.PlaySoundSE("IconFall2");
				// }
				if (this.FillItemList[i].length == 0) {
					SoundManger.Instance.PlaySoundSE("IconFall2");
					this.UseFillSlotItem[i].setXY(this.UseFillSlotItem[i].x, this.FillEndPos[i]);
					if(SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(this.UseFillSlotItem[i].GetIndex()) >= 0)
						SweetBonanzaGameView.Instance.SetOutOfFrameFx(i, this.UseFillSlotItem[i].GetIndex());
				}
				End = false;
			}
		}
		if (End)
			this.EndFill();
		//this.UseFillSlotItem
	}

	public EndFill() {
		EventManager.Instance.UnregisterEventListener(this.UpdateFillId);
		this.IsFillEnd = true;
	}

	public SetRunMoveList(slotItems: Array<SlotItem>, idxsArray: Array<Array<number>>, _lenght) {
		this.FillIndexList = [];
		this.FillItemList = [];
		this.FillEndPos = [];
		for (let i = 0; i < _lenght; i++) {
			this.FillEndPos.push(-1);
			this.FillIndexList.push(0);
			this.FillItemList.push([]);
		}
		let AddTime = 0;
		for (let i = 0; i <  idxsArray.length; i++) {
			for (let j = 0; j < idxsArray[i].length; j++) {
				let toPos: egret.Point = this._itemMap.GetItemPos(idxsArray[i][j]);
				let toPosY = toPos.y;
				let fromPos = slotItems[idxsArray[i][j]].y;
				let movetime = Math.abs(Math.floor(fromPos - toPosY) / this.ItemHight);
				this.FillIndexList[idxsArray[i][j]] = movetime;
				let runList = [];
				if (movetime == 1)
					runList = copyArray(this.AllOneFillList, 0, this.AllOneFillList.length);
				else if (movetime == 2)
					runList = copyArray(this.AllTwoFillList, 0, this.AllTwoFillList.length);
				else if (movetime == 3)
					runList = copyArray(this.AllThreeFillList, 0, this.AllThreeFillList.length);
				else if (movetime == 4)
					runList = copyArray(this.AllFourFillList, 0, this.AllFourFillList.length);
				else if (movetime == 5)
					runList = copyArray(this.AllFiveFillList, 0, this.AllFiveFillList.length);

				for (let k = 0; k < AddTime; k++) {
					runList.unshift(0, 0);
				}
				this.FillEndPos[idxsArray[i][j]] = toPosY;
				this.FillItemList[idxsArray[i][j]] = runList;
			}
			AddTime++;
			//this._itemMap.GetItemPos(itemIdxs[i])
		}
	}

	public SetMoveTimeList() {
		this.AllOneFillList = [];
		this.AllTwoFillList = [];
		this.AllThreeFillList = [];
		this.AllFourFillList = [];
		this.AllFiveFillList = [];
		for (let one_m = 0; one_m < this.FillOneItem_Move.length; one_m++) {
			for (let one_t = 0; one_t < this.FillOneItem_Time[one_m]; one_t++) {
				let _move = Math.floor(this.ItemHight * (this.FillOneItem_Move[one_m] / 100));
				this.AllOneFillList.push(_move);
			}
		}
		for (let two_m = 0; two_m < this.FillTwoItem_Move.length; two_m++) {
			for (let two_t = 0; two_t < this.FillTwoItem_Time[two_m]; two_t++) {
				let _move = Math.floor(this.ItemHight * (this.FillTwoItem_Move[two_m] / 100));
				this.AllTwoFillList.push(_move);
			}
		}
		for (let three_m = 0; three_m < this.FillThreeItem_Move.length; three_m++) {
			for (let three_t = 0; three_t < this.FillThreeItem_Time[three_m]; three_t++) {
				let _move = Math.floor(this.ItemHight * (this.FillThreeItem_Move[three_m] / 100));
				this.AllThreeFillList.push(_move);
			}
		}
		for (let four_m = 0; four_m < this.FillFourItem_Move.length; four_m++) {
			for (let four_t = 0; four_t < this.FillFourItem_Time[four_m]; four_t++) {
				let _move = Math.floor(this.ItemHight * (this.FillFourItem_Move[four_m] / 100));
				this.AllFourFillList.push(_move);
			}
		}
		for (let five_m = 0; five_m < this.FillFiveItem_Move.length; five_m++) {
			for (let five_t = 0; five_t < this.FillFiveItem_Time[five_m]; five_t++) {
				let _move = Math.floor(this.ItemHight * (this.FillFiveItem_Move[five_m] / 100));
				this.AllFiveFillList.push(_move);
			}
		}
	}
}