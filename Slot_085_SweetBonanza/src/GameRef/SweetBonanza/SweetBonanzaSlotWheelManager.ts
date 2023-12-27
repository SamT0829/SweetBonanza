class SweetBonanzaSlotWheelManager extends SlotWheelManager {

	public wheels: Array<SweetBonanzaSlotWheelBase> = [];
	private isSkip = false;

	public Init(_slotData: SlotData, Wheels: Array<SweetBonanzaSlotWheelBase> = null) {
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
				wheel = new SweetBonanzaSlotWheelBase();
			wheel.wheelIdx = i;
			if (i < _slotData.WheelsPos.length)
				obj.setXY(obj.x + _slotData.WheelsPos[i].x, obj.y + _slotData.WheelsPos[i].y);
			wheel._showCount = _slotData.ShowCount[i];
			wheel.Init(obj.asCom, _slotData.IconMap, i < _slotData.IconRate.length ? new Dictionary([]) : new Dictionary([]), _slotData);

			this.wheels.push(wheel);
		}

		EventManager.Instance.RegisterEventListener(ClientEvent, this, this.onWheelEnd, ClientMsg.WheelStop);
		EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnStopRun, ClientMsg.StopRun);

		// EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.Update);
		this.InitDone = true;
	}

	public async StartRun() {
		this.startCount = 0;
		this.isSkip = false;
		
		let event = new ClientEvent(ClientMsg.OnGameResult);
       	EventManager.Instance.Send(event);	

		for (let i = 0; i < this.wheels.length; ++i) {
			let wheelRunEvent: ClientEvent = new ClientEvent(ClientMsg.WheelRun);		//車輪運行事件
			wheelRunEvent.eventData = i;
			EventManager.Instance.Send(wheelRunEvent);

			this.Run(this.wheels[i]);

			if (!SelfData.Instance.PlaySetting.AutoSetting.IsFastX3 && !this.isSkip)
				await waitForSeconds(0.1);
		}

		while (this.startCount < this.wheels.length) {
			await waitForSeconds(0.01);
		}
		
		this.startCount = this.wheels.length;
		this.startRun = false; 
	}

	protected async Run(wheel: SweetBonanzaSlotWheelBase) {
		await wheel.Run();
		this.startCount++;
	}

	public async SpecialStopRun(result: Array<Array<number>>, onEndResult: Array<Array<number>>) {
		this.stopCount = [];
		for (let i = 0, max = this.wheels.length; i < max; ++i) {
			// await this.wheels[i].ItemMoveToWindowUpSide();
			this.Stop(this.wheels[i], result[i], 0);
			this.stopData.push(result[i]);
		}

		for (let i = 0, max = this.wheels.length; i < max; ++i) {
			await this.wheels[i].StopTweenIndex(SelfData.Instance.PlaySetting.AutoSetting.IsFastX3, i);

			if (!SelfData.Instance.PlaySetting.AutoSetting.IsFastX3 && !this.isSkip)
				await waitForSeconds(0.07);
		}

		await waitForSeconds(0.4);
	}

	public async Stop(wheel: SweetBonanzaSlotWheelBase, result, stoptWaitTime: number) {
		let index = this.wheels.indexOf(wheel);

		let count = this.slotData.ShowCount[index];

		for (let i = -1; i < count; ++i) {			
			wheel.GetItem(i).SetIcon(this.slotData.IconMap[result[i+1]]);
		}
	}

	private OnStopRun(){
        this.isSkip = true;
    }

}