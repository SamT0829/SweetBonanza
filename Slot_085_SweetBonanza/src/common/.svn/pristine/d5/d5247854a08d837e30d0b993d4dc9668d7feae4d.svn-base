/**
 * SlotWhellManager
 */
class SlotWheelManager {
	public static maybeDelayTime: number = 0;
	public InitDone = false;
	/**手動停止*/
	public _manualStop = false;
	public wheels: Array<SlotWheelBase> = [];
	public _slotData: SlotData = null;
	public get slotData(): SlotData {
		return this._slotData;
	}

	public set slotData(value) {
		this.setSlotData(value);
	}
	public slotStackData: SlotWheelStackData = null;
	public allWheelStopEvent: ClientEvent = new ClientEvent(ClientMsg.AllWheelStop);

	public startCount = 0;
	public stopCount = [];
	public stopData: Array<Array<number>> = [];
	public stopIndex = [];
	public endResult = [];
	public maybeCount = 0;
	public maybeBonusIndex = 0;
	public maybeWaitTime = 0;
	public maybeshow = [];

	public UpdateRegisterId: number = 0;

	/**開始運轉*/
	startRun = false;
	public Init(_slotData: SlotData, Wheels: Array<SlotWheelBase> = null) {
		this._slotData = _slotData;
		for (let i = 0, max = 300; i < max; ++i) {
			let obj = _slotData.View.getChild("w" + i);
			if (obj === null) {
				break;
			}
			let wheel = null;
			if (Wheels != null && i < Wheels.length)
				wheel = Wheels[i]
			else
				wheel = new SlotWheelBase();
			wheel.wheelIdx = i;
			if (i < _slotData.WheelsPos.length)
				obj.setXY(obj.x + _slotData.WheelsPos[i].x, obj.y + _slotData.WheelsPos[i].y);
			wheel._showCount = _slotData.ShowCount[i];
			wheel.Init(obj.asCom, _slotData.IconMap, i < _slotData.IconRate.length ? _slotData.IconRate[i] : new Dictionary([]), _slotData);

			this.wheels.push(wheel);
		}
		EventManager.Instance.RegisterEventListener(ClientEvent, this, this.onWheelEnd, ClientMsg.WheelStop);
		this.InitDone = true;
	}

	/**槽輪管理器開始運行*/
	public async StartRun() {
		this.startCount = 0;
		this.stopCount = [];
		this.stopIndex = [];
		this.maybeCount = 0;
		this._manualStop = false;
		this.slotData.ManualStop = false;
		this.startRun = true;
		let bottomy = this.wheels[0]._bottomItemY;
		if (GameLogic.Instance.SlotResult != null) {
			GameLogic.Instance.SlotResult.maybeBonusIndex = [];
		}
		for (let i = 0, max = this.wheels.length; i < max; ++i) {
			let startTime = this.slotData.StartWaitTime[i];
			if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX2)
				startTime = this.slotData.StartWaitTimeX2[i];
			else if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX3)
				startTime = this.slotData.StartWaitTimeX3[i];

			this.stopIndex.push(i);
			this.Run(this.wheels[i], startTime, bottomy);
		}
		this.UpdateRegisterId = EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.Update);
		while (this.startCount < this.wheels.length) {
			await waitForSeconds(0.01);
		}
		this.startRun = false;
	}

	public async StartRunIdx(idx: Array<number>, startTime: Array<number>) {
		this.startCount = 0;
		this.stopCount = [];
		this.maybeCount = 0;
		this._manualStop = false;
		this.slotData.ManualStop = false;
		this.startRun = true;
		let bottomy = this.wheels[0]._bottomItemY;
		this.stopIndex = idx;


		for (let i = 0, max = idx.length; i < max; ++i) {
			let starttime = startTime[i];
			if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX2 || SelfData.Instance.PlaySetting.AutoSetting.IsFastX3) {
				starttime = 0;
			}
			this.Run(this.wheels[idx[i]], starttime, bottomy);
		}

		while (this.startCount < idx.length) {
			await waitForSeconds(0.01);
		}
		this.startRun = false;
	}

	protected onWheelEnd(eventData: ClientEvent) {
		if (this.maybeCount > 0) {
			if (GameLogic.Instance.SlotResult != null) {
				{
					if (GameLogic.Instance.SlotResult.maybeBonusIndex.indexOf(eventData.eventData) >= GameLogic.Instance.SlotResult.maybeBonusIndex.length - 1) {
						SoundManger.Instance.StopSoundSE("MaybeBonus");
					}
				}
			}
			this.ShowMaybeBonusFX(eventData.eventData, false);
			//SoundManger.Instance.StopSoundSE("MaybeBonus");
		}
		this.stopCount.push(eventData.eventData);
	}

	/**車輪經理計算運行*/
	protected async Run(wheel: SlotWheelBase, stoptWaitTime: number, bottomy: number = null) {
		let index = this.wheels.indexOf(wheel);

		this.stopData = [];
		while (stoptWaitTime > 0) {
			let lastTime: number = new Date().getTime();
			await waitForSeconds(0.01);
			let curTime: number = new Date().getTime();
			let deltaTime: number = curTime - lastTime;
			stoptWaitTime -= (deltaTime / 1000);

			if (this._manualStop) {													//手動停止
				stoptWaitTime = 0;
			}
		}
		let wheelRunEvent: ClientEvent = new ClientEvent(ClientMsg.WheelRun);		//車輪運行事件
		wheelRunEvent.eventData = index;
		EventManager.Instance.Send(wheelRunEvent);

		await wheel.Run(SelfData.Instance.PlaySetting.AutoSetting.IsFastX3);		//車輪開始運行

		this.startCount++;
	}

	public Update() {
		for (let i = 0, max = this.wheels.length; i < max; ++i) {
			this.wheels[i].Update();
		}
		if (this.wheels[0].MoveList_StartLoop.length == 0 && (this.wheels[0].State == SlotItemStatus.Spin || this.wheels[0].State == SlotItemStatus.WaitStop)) {
			for (let add = 0, max = this.wheels.length; add < max; ++add) {
				this.wheels[add].UpdateSetRunMove();
			}
		}
		if (GameLogic.Instance.SlotResult != null) {
			let index = 0;
			for (let maybe = 0, max = this.wheels.length; maybe < max; ++maybe) {
				if (GameLogic.Instance.SlotResult.maybeBonusIndex.indexOf(maybe) >= 0 && !this.wheels[maybe].MayBeAdd) {
					this.wheels[maybe].MayBeSetRunMove(index);
					index++;
				}
			}
		}
		if (this.stopCount.length >= this.wheels.length)
			this.UpdateEnd()
	}

	public UpdateEnd() {
		EventManager.Instance.UnregisterEventListener(this.UpdateRegisterId);
		for (let i = 0, max = this.wheels.length; i < max; ++i) {
			this.wheels[i].MayBeAdd = false;
		}
	}

	public calculButtomIndex() {
		for (let i = 0, imax = this.wheels.length; i < imax; ++i) {
			let wheel = this.wheels[i];
			wheel.sortItem(this.wheels[0]._bottomItemY);
			wheel.calculBottomIndex();
			wheel.sortItem();
		}
	}

	public async StopRun(result: Array<number>) {
		this.stopCount = [];

		//this.stopData = copyArray(result, 0, result.length);
		let cresult = copyArray(result, 0, result.length);
		this.maybeWaitTime = 0;
		for (let i = 0, max = this.wheels.length; i < max; ++i) {
			let stopTime = this.slotData.StopWaitTime[i];
			if (!GameLogic.Instance.SlotResult.isMaybeBonus) {
				if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX2) {
					stopTime = this.slotData.StopWaitTimeX2[i];
				} else if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX3) {
					stopTime = this.slotData.StopWaitTimeX3[i];
				}
			}
			let r = cresult.splice(0, this.slotData.ShowCount[i]);
			this.Stop(this.wheels[i], r, stopTime);
			this.stopData.push(r);
		}
	}

	public async StopRunIdx(indexs: Array<number>, results: Array<Array<number>>, spinTimes: Array<number>) {
		this.stopData = copyArray(results, 0, results.length);
		this.maybeWaitTime = 0;
		for (let i = 0, max = indexs.length; i < max; ++i) {

			let stopTime = spinTimes[i];
			if (!GameLogic.Instance.SlotResult.isMaybeBonus) {
				if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX2) {
					stopTime = this.slotData.StopWaitTimeX2[indexs[i]];
				} else if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX3) {
					stopTime = this.slotData.StopWaitTimeX3[indexs[i]];
				}
			}
			this.Stop(this.wheels[indexs[i]], results[i], stopTime);
		}
		while (this.stopCount.length < indexs.length) {
			await waitForSeconds(0.01);
		}
		EventManager.Instance.Send(this.allWheelStopEvent);
		this.maybeshow = [];
	}

	public async SpecialStopRunIdx(indexs: Array<number>, results: Array<Array<number>>, onEndResult: Array<Array<number>>, spinTimes: Array<number>) {
		this.stopData = copyArray(results, 0, results.length);
		this.maybeWaitTime = 0;
		this.endResult = copyArray(onEndResult, 0, onEndResult.length);
		for (let i = 0, max = indexs.length; i < max; ++i) {

			let stopTime = spinTimes[i];
			if (!GameLogic.Instance.SlotResult.isMaybeBonus) {
				if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX2) {
					stopTime = this.slotData.StopWaitTimeX2[indexs[i]];
				} else if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX3) {
					stopTime = this.slotData.StopWaitTimeX3[indexs[i]];
				}
			}

			this.SpecialStop(indexs[i], results[i], onEndResult[i], stopTime);
		}
		while (this.stopCount.length < indexs.length) {
			await waitForSeconds(0.01);
		}
		EventManager.Instance.Send(this.allWheelStopEvent);
		this.maybeshow = [];
	}

	public async SpecialStopRun(result: Array<Array<number>>, onEndResult: Array<Array<number>>) {
		this.stopCount = [];
		this.stopData = copyArray(result, 0, result.length);
		this.endResult = copyArray(onEndResult, 0, onEndResult.length);
		this.maybeWaitTime = 0;
		for (let i = 0, max = this.wheels.length; i < max; ++i) {
			let stopTime = this.slotData.StopWaitTime[i];
			this.SpecialStop(i, result[i], onEndResult[i], stopTime);
		}
	}

	public async Stoping() {
		while (this.stopCount.length < this.wheels.length) {
			await waitForSeconds(0.01);
		}
		EventManager.Instance.Send(this.allWheelStopEvent);
		this.maybeshow = [];
	}

	private async SpecialStop(wheelindex: number, result: Array<number>, endResult: Array<number>, stoptWaitTime: number) {
		var popend = true;
		let wheel: SlotWheelBase = this.wheels[wheelindex];
		const onendplay = async () => {
			await wheel.PopOnEndResult(endResult);
			popend = true;
		}

		let index = this.wheels.indexOf(wheel);

		let MaybeType = SlotMaybeType.None;
		if (this._slotData.DefaultMaybeType != SlotMaybeType.None) {
			let hasBonus = GameLogic.Instance.SlotResult.maybeBonusIndex.length > 0;
			let hasBigWin = GameLogic.Instance.SlotResult.maybeBigWinIndex.Count > 0;
			this.slotData.PlayMaybeType = hasBonus ? SlotMaybeType.Bonus : hasBigWin ? SlotMaybeType.BigWin : SlotMaybeType.None;
			if (hasBonus && hasBigWin) {
				let bonus = false;
				switch (this._slotData.DefaultMaybeType) {
					case SlotMaybeType.Bonus:
						bonus = (index > -1 && GameLogic.Instance.SlotResult.maybeBonusIndex.indexOf(index) > -1);
						MaybeType = bonus ? SlotMaybeType.Bonus : SlotMaybeType.None;
						break;
					case SlotMaybeType.BigWin:
						bonus = (index > -1 && GameLogic.Instance.SlotResult.maybeBigWinIndex._keys.indexOf(index) > -1);
						MaybeType = bonus ? SlotMaybeType.BigWin : SlotMaybeType.None;
						break;
				}
				this.slotData.PlayMaybeType = this._slotData.DefaultMaybeType === SlotMaybeType.Bonus ? SlotMaybeType.Bonus : SlotMaybeType.BigWin;
			} else {
				let bonus = (index > -1 && GameLogic.Instance.SlotResult.maybeBonusIndex.indexOf(index) > -1);
				let bigwin = (index > -1 && GameLogic.Instance.SlotResult.maybeBigWinIndex._keys.indexOf(index) > -1);
				MaybeType = bonus ? SlotMaybeType.Bonus : bigwin ? SlotMaybeType.BigWin : SlotMaybeType.None;
			}
		}

		if (MaybeType == SlotMaybeType.None && !GameLogic.Instance.SlotResult.isFullPerformance) {
			if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX3) {
				wheel.set3XFastStatus();
				stoptWaitTime = this.slotData.StopWaitTimeX3[index];
			}
			else if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX2)
				stoptWaitTime = this.slotData.StopWaitTimeX2[index];
		}

		stoptWaitTime = await this.waitMaybeBonus(MaybeType, index, stoptWaitTime);

		wheel.SetWaitStopStatus();
		wheel.WaitStopCount = 0;
		while (wheel.WaitStopCount < (stoptWaitTime)) {
			await waitForSeconds(0.01);
			if (this._manualStop) {
				wheel.WaitStopCount = stoptWaitTime;
			}
		}
		//if (this._manualStop)
		//	return;
		if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX3) {
			if (!(MaybeType != SlotMaybeType.None && this.slotData.MaybeReduceSpeed != 0))
				wheel.set3XFastStatus();
			//await wheel.Stop(result);
			await wheel.SpecialStop(result, endResult);
		}
		else {
			//await wheel.Stop(result);
			await wheel.SpecialStop(result, endResult);
		}
		//if (!this._manualStop) {
		let wheelStopEvent: ClientEvent = new ClientEvent(ClientMsg.WheelStop);
		wheelStopEvent.eventData = index;
		EventManager.Instance.Send(wheelStopEvent);
		//}
		wheel.setMaybeReduceSpeed(0, 0);
	}

	public async Stop(wheel: SlotWheelBase, result, stoptWaitTime: number) {
		let index = this.wheels.indexOf(wheel);
		let MaybeType = SlotMaybeType.None;
		if (this._slotData.DefaultMaybeType != SlotMaybeType.None) {
			let hasBonus = GameLogic.Instance.SlotResult.maybeBonusIndex.length > 0;
			let hasBigWin = GameLogic.Instance.SlotResult.maybeBigWinIndex.Count > 0;
			this.slotData.PlayMaybeType = hasBonus ? SlotMaybeType.Bonus : hasBigWin ? SlotMaybeType.BigWin : SlotMaybeType.None;
			if (hasBonus && hasBigWin) {
				let bonus = false;
				switch (this._slotData.DefaultMaybeType) {
					case SlotMaybeType.Bonus:
						bonus = (index > -1 && GameLogic.Instance.SlotResult.maybeBonusIndex.indexOf(index) > -1);
						MaybeType = bonus ? SlotMaybeType.Bonus : SlotMaybeType.None;
						break;
					case SlotMaybeType.BigWin:
						bonus = (index > -1 && GameLogic.Instance.SlotResult.maybeBigWinIndex._keys.indexOf(index) > -1);
						MaybeType = bonus ? SlotMaybeType.BigWin : SlotMaybeType.None;
						break;
				}
				this.slotData.PlayMaybeType = this._slotData.DefaultMaybeType === SlotMaybeType.Bonus ? SlotMaybeType.Bonus : SlotMaybeType.BigWin;
			} else {
				let bonus = (index > -1 && GameLogic.Instance.SlotResult.maybeBonusIndex.indexOf(index) > -1);
				let bigwin = (index > -1 && GameLogic.Instance.SlotResult.maybeBigWinIndex._keys.indexOf(index) > -1);
				MaybeType = bonus ? SlotMaybeType.Bonus : bigwin ? SlotMaybeType.BigWin : SlotMaybeType.None;
			}
		}


		// wheel.SetWaitStopStatus();
		// while (wheel.WaitStopCount < (stoptWaitTime + this.maybeWaitTime)) {
		// 	await waitForSeconds(0.01);
		// 	if (this._manualStop) {
		// 		wheel.WaitStopCount = stoptWaitTime;
		// 	}
		// }

		stoptWaitTime = await this.waitMaybeBonus(MaybeType, index, stoptWaitTime);

		wheel.SetWaitStopStatus();
		wheel.WaitStopCount = 0;
		while (wheel.WaitStopCount < (stoptWaitTime)) {
			await waitForSeconds(0.01);
			if (this._manualStop) {
				wheel.WaitStopCount = stoptWaitTime;
			}
		}

		//await waitForFlage(()=>{return this.stopCount.length == index});

		if (this._manualStop)
			return;

		if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX3) {
			if (!(MaybeType != SlotMaybeType.None && this.slotData.MaybeReduceSpeed != 0))
				wheel.set3XFastStatus();
			await wheel.Stop(result);
		}
		else {
			await wheel.Stop(result);
		}
		if (!this._manualStop) {
			let wheelStopEvent: ClientEvent = new ClientEvent(ClientMsg.WheelStop);
			wheelStopEvent.eventData = index;
			EventManager.Instance.Send(wheelStopEvent);
		}
		wheel.setMaybeReduceSpeed(0, 0);
	}

	public ShowMaybeBonusFX(index: number, isShow: boolean) {
		if (this.slotData.MaybeBonusFxObj.length <= index || this.slotData.MaybeBonusFxObj[index] == null)
			return;
		this.slotData.MaybeBonusFxObj[index].visible = isShow;
		if (this.maybeshow.indexOf(index) >= 0) {
			if (this.wheels[index].MayBeBlackObj != null) {
				this.wheels[index].View.asCom.getTransition("hide").play();
			}
			this.wheels[index].IsMaybeShow = false;
		}
		if (isShow) {
			let transition = this.slotData.MaybeBonusFxObj[index].asCom.getTransition("t0");
			if (transition != null && !transition.playing)
				transition.play();
		}
	}

	public async ManualStop() {				//?
		if (GameLogic.Instance.SlotResult == null)
			return;
		if (GameLogic.Instance.SlotResult.isMaybeBonus)
			return;

		while (this.startRun) {
			await waitForSeconds(0.01);
		}

		this._manualStop = true;
		this.slotData.ManualStop = true;

		while (this.stopData.length === 0) {
			await waitForSeconds(0.01);
		}

		let sy = -999;
		for (let i = 0, max = this.stopIndex.length; i < max; ++i) {
			if (!SelfData.Instance.PlaySetting.IsFastX3)
				this.wheels[this.stopIndex[i]].setSpeed(this.slotData.Speed * 1.5);
			if (this.stopCount.indexOf(this.stopIndex[i]) > -1) {
				continue;
			}
			// if (sy === -999)
			// 	sy = this.wheels[this.stopIndex[i]]._bottomItemY;
			// else
			// 	this.wheels[this.stopIndex[i]].sortItem(sy);

			this.wheels[this.stopIndex[i]].FastStop(this.stopData[i], this.endResult[i]);
		}
		let stopendCount = 0;
		while (stopendCount < this.stopIndex.length) {
			stopendCount = 0;
			for (let i = 0, max = this.stopIndex.length; i < max; ++i) {
				if (this.wheels[this.stopIndex[i]].State === SlotItemStatus.StopSpinEnd)
					stopendCount++
			}
			await waitForSeconds(0.01);
		}
		for (let i = 0, max = this.stopIndex.length; i < max; ++i) {
			if (this.stopCount.indexOf(this.stopIndex[i]) < 0) {
				let wheelStopEvent: ClientEvent = new ClientEvent(ClientMsg.WheelStop);
				wheelStopEvent.eventData = this.stopIndex[i];
				EventManager.Instance.Send(wheelStopEvent);
			}
		}
	}

	public async EndStop() {
		if (GameLogic.Instance.SlotResult.isMaybeBonus)
			return;

		while (this.startRun) {
			await waitForSeconds(0.01);
		}

		this._manualStop = true;
		this.slotData.ManualStop = true;
		for (let i = 0, max = this.stopIndex.length; i < max; ++i) {
			if (this.stopCount.indexOf(this.stopIndex[i]) > -1)
				continue;
			this.wheels[this.stopIndex[i]].EndStop(this.stopData[i], this.endResult[i]);
		}
		let stopendCount = 0;
		while (stopendCount < this.stopIndex.length) {
			stopendCount = 0;
			for (let i = 0, max = this.stopIndex.length; i < max; ++i) {
				if (this.wheels[this.stopIndex[i]].State === SlotItemStatus.StopSpinEnd)
					stopendCount++
			}
			await waitForSeconds(0.01);
		}
		for (let i = 0, max = this.stopIndex.length; i < max; ++i) {
			if (this.stopCount.indexOf(this.stopIndex[i]) < 0) {
				let wheelStopEvent: ClientEvent = new ClientEvent(ClientMsg.WheelStop);
				wheelStopEvent.eventData = this.stopIndex[i];
				EventManager.Instance.Send(wheelStopEvent);
			}
		}
	}


	public SetIconRate(iconRate: Array<Dictionary>) {
		for (let i = 0, max = this.wheels.length; i < max; ++i) {
			this.wheels[i].SetIconRate(iconRate[i]);
		}

	}

	public SetWheelsList(wheelList: Array<Array<number>>) {
		for (let i = 0, max = this.wheels.length; i < max; ++i) {
			this.wheels[i].SetWheelsList(wheelList[i]);
		}
	}

	public SetAllShowItem(result: Array<number>) {
		// for (let i = 0, max = this.wheels.length; i < max; ++i) {
		// 	this.wheels[i].SetShowItemIcon(result.splice(0, this.slotData.ShowCount[i]));
		// }
		var allItem = this.GetAllShowItem();
		for (let i = 0, max = allItem.length; i < max; ++i) {
			allItem[i].isBlur = false;
			allItem[i].SetIcon(this.slotData.IconMap[result[i]]);
		}
	}

	public SetAllShowItem_ReData(result: Array<number>){

	}

	public SetSpecialFirstIcon(result: Array<Array<number>>, onEndResult: Array<Array<number>>) {
		for (let i = 0, max = this.wheels.length; i < max; ++i) {
			this.wheels[i].SetSpeialFirstIcon(result[i], onEndResult[i]);
		}

	}

	/**獲取所有顯示圖項*/
	public GetAllShowItem() {
		var itemList: Array<SlotItem> = [];
		for (let i = 0, max = this.wheels.length; i < max; ++i) {
			for (let j = 0, jmax = this.slotData.ShowCount[i]; j < jmax; ++j) {
				let item = this.wheels[i].GetItem(j);
				itemList.push(item);
			}
		}
		return itemList;
	}

	public GetShowItem(index: number) {
		var allItem = this.GetAllShowItem();
		if (index < allItem.length)
			return allItem[index];
		else
			return null;
	}

	/**啟用所有車輪圖標*/
	public EnableAllShowItem() {
		this.wheels.forEach(wheel => { wheel.EnableAllIcon(); });
	}

	public EnableShowItem(index: number) {
		var allItem = this.GetAllShowItem();
		if (index < allItem.length)
			allItem[index].visible = true;
	}

	/**消除顯示項*/
	public DisableShowItem(index: number) {
		var allItem = this.GetAllShowItem();
		if (index < allItem.length)
			allItem[index].visible = false;
	}

	public async ReSpin(indexs: Array<number>, results: Array<Array<number>>, spinTimes: Array<number>) {
		this.stopCount = [];

		this.startCount = 0;
		this._manualStop = false;
		for (let i = 0, max = indexs.length; i < max; ++i) {
			this.Run(this.wheels[indexs[i]], 0);
		}
		while (this.startCount < indexs.length) {
			await waitForSeconds(0.01);
		}
		for (let i = 0, max = indexs.length; i < max; ++i) {
			this.Stop(this.wheels[indexs[i]], results[i], spinTimes[i]);
		}
		while (this.stopCount.length < indexs.length) {
			await waitForSeconds(0.01);
		}
	}

	public RefreshAllIcon(filter?: number[]) {
		this.wheels.forEach(wheel => { wheel.RefreshIcon(filter); });
	}

	public setSlotData(value) {
		this.wheels.forEach(wheel => { wheel.setSlotData(value); });
		this._slotData = value;
	}

	private checkBeforeRun(nowIdx): boolean {
		if (this.stopIndex.length === this.wheels.length) {
			return this.stopCount.length < nowIdx;
		} else {
			let mIdx = this.stopIndex.indexOf(nowIdx);
			if (mIdx > 0) {
				return this.stopCount.indexOf(this.stopIndex[mIdx - 1]) === -1;
			}
			else
				return false;
		}

	}

	protected async waitMaybeBonus(MaybeType: SlotMaybeType, index: number, stoptWaitTime: number) {

		let maybeBonus = MaybeType != SlotMaybeType.None;

		let MaybeBonusFxObj = this.slotData.MaybeBonusFxObj;
		let maybeBonusIndex = GameLogic.Instance.SlotResult.maybeBonusIndex;
		if (this.slotData.PlayMaybeType === SlotMaybeType.BigWin) {

			MaybeBonusFxObj = this.slotData.MaybeBigWinFxObj;
			maybeBonusIndex = GameLogic.Instance.SlotResult.maybeBigWinIndex.keys();
		}
		if (maybeBonus) {

			this.ShowMaybeBonus(MaybeBonusFxObj, index);

			this.maybeCount++;

		}
		return 0;
	}

	public async ShowMaybeBonus(MaybeBonusFxObj: fairygui.GObject[], index: number, ) {
		while (this.wheels[index].MoveList_StartLoop.length > 0) {
			await waitForSeconds(0.01);
		}
		SoundManger.Instance.StopSoundSE("MaybeBonus");
		SoundManger.Instance.PlaySoundSE("MaybeBonus");
		let MaybeWheelRunEvent: ClientEvent = new ClientEvent(ClientMsg.MaybeBonusRun);
		MaybeWheelRunEvent.eventData = index;
		EventManager.Instance.Send(MaybeWheelRunEvent);
		if (MaybeBonusFxObj.length > this.maybeCount) {
			this.new_ShowMaybeBonusFX(index, true);
		}
	}

	public new_ShowMaybeBonusFX(index: number, isShow: boolean) {
		if (this.slotData.MaybeBonusFxObj.length <= index || this.slotData.MaybeBonusFxObj[index] == null)
			return;
		this.slotData.MaybeBonusFxObj[index].visible = isShow;
		if (isShow) {
			this.maybeshow.push(index);
			if (this.wheels[index].MayBeBlackObj != null) {
				this.wheels[index].View.getTransition("show").play();
			}
			this.wheels[index].IsMaybeShow = true;
			let transition = this.slotData.MaybeBonusFxObj[index].asCom.getTransition("t0");
			if (transition != null && !transition.playing)
				transition.play();
		}
	}

	public new_checkBeforeRun(nowIdx): boolean {
		if (this.stopIndex.length === this.wheels.length) {
			return this.stopCount.length < nowIdx;
		} else {
			let mIdx = this.stopIndex.indexOf(nowIdx);
			if (mIdx > 0) {
				return this.stopCount.indexOf(this.stopIndex[mIdx - 1]) === -1;
			}
			else
				return false;
		}

	}

}