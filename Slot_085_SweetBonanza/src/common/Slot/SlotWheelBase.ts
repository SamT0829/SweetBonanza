/**
 * 插槽車輪項目基類
 */
class SlotWheelBase {
	public static AccelerationMove: Array<number> = new Array<number>();
	public _showCount: number = 3;
	public WaitStopCount: number = 0;
	public State: SlotItemStatus = SlotItemStatus.Idle;
	public resultFirst: Number = -1;
	public IsMaybeShow: boolean = false;
	/**車輪排序ID*/
	public wheelIdx = -1;
	public _stopSound = true;
	/**遊戲圖*/
	public _slotItemList: Array<SlotItem> = [];
	/**渲染順序*/
	protected _orderList: Array<SlotItem> = [];
	protected get _iconMap(): Dictionary {
		return this.slotData.IconMap;
	}
	/**圖片的機率*/
	protected _iconRate: Dictionary = new Dictionary([]);
	/**總圖片機率*/
	protected _totalIconRate = 0;
	/**運轉數度*/
	protected _nowSpeed: number = 0;
	/**圖片最下層Y位址*/
	protected _bottomY: number = 0;
	/**圖片最下層X位址*/
	protected _bottomX: number = 0;
	/**圖片最上層Y位址*/
	public _topY: number = 0;
	/**圖片最上層X位址*/
	protected _topX: number = 0;
	/**遊戲圖數量地址*/
	protected _botItemIndex = 0;
	/**圖片中心地址*/
	protected _centerIndex = 0;
	/**最上面圖片*/
	protected _topItem: SlotItem = null;
	public UpdateRegisterId: number = 0;
	protected _upSize: number = 0;
	protected _isStartBlur = true;
	protected _result: Array<number> = [];
	protected _com: fairygui.GComponent = null;
	protected _hasPopvalue = false;
	protected upSizeTime = 150;
	protected stopIndex = -1;
	protected wheelList = [];
	protected wheelListIndex = 0;
	protected slotData: SlotData = null;
	protected _maybeReduceSpeed = 0;
	protected _maybeReduceLowSpeed = 0;
	protected _unblurSpeed = 0;

	//Wheel Acceleration
	protected _accelerationSpeed: number = 0;
	protected _startTime: number = 0;
	protected _endTime: number = 0;
	protected _roundTime: number = 0;
	protected _Up_roundTime: number = 0;
	protected _UP_stop: number = 0;
	public _accelerationEnd: boolean = false;

	public MoveList_StartUP: number[] = [];
	public MoveList_StartLoop: number[] = [];
	public MoveList_StartMayBe: number[] = [];
	public MoveList_StartStop: number[] = [];
	public MoveList_ItemIcon: number[] = [];
	public IsSetValue: boolean = false;

	public LoopRound: number = 0;
	public IsFastStop: boolean = false;
	public AddFastY: boolean = false;
	public StartIconMove: boolean = false;
	public MayBeAdd: boolean = false;
	public MayBeBlackObj: fairygui.GObject;
	//private test = 0;

	protected get isPopValue() {
		return !(this.stopIndex <= -1);
	}
	get _bottomItemY(): number {
		return this._slotItemList[this._botItemIndex].y;
	}

	protected get underSize(): number {
		if (this.slotData.StopUnderSize == -1) {
			this.slotData.StopUnderSize = this.slotData.ItemHeigt / 4;
		}
		return this.slotData.StopUnderSize;
	}

	protected set underSize(value) {
		this.slotData.StopUnderSize = value;
	}

	public get View(): fairygui.GComponent {
		return this._com;
	}

	public get NowSpeed(): number {
		return this._nowSpeed;
	}


	constructor() { }

	/**插槽車輪圖片初始化()*/
	public Init(com: fairygui.GComponent, iconMap: Dictionary, iconRate: Dictionary, slotData: SlotData) {
		this._com = com;									//讀取資料
		this.slotData = slotData;
		this.underSize = slotData.StopUnderSize;
		this._unblurSpeed = slotData.UnBlurSpeed;

		for (let i = 0, max = com.numChildren; i < max; ++i) {				//numChildren 获得容器内孩子元件的数量
			let obj = com.getChildAt(i);									//getChildAt元件的名字是允许重复的，在这种情况下，GetChild返回第一个匹配名称的对象。GetChild 通过索引或名称获得元件引用
			if (slotData.SlotWheelExcludeObj.indexOf(obj.name) >= 0)
				continue;
			obj.sortingOrder = 0;
			let item = <SlotItem>obj;										//通過 setPackageItemExtension 轉換自訂義SlotItem
			//item.SetIcon(i.toString());
			item.wheelIdx = this.wheelIdx;									//車輪排序ID
			item.itemtype = slotData.ItemType;								//item 屬性
			this._slotItemList.push(item);
			this._orderList.push(item);
		}
		this.MayBeBlackObj = this._com.getChild("MaybeBlack");
		if (this.MayBeBlackObj != null) {
			this.MayBeBlackObj.sortingOrder = 10;
		}

		this._slotItemList.sort((a, b) => { return (a.y - b.y); });			//对数组的元素进行排序。(以y值進行排列)
		this._botItemIndex = this._slotItemList.length - 1;					//讓地址從0開始

		this.sortItem();													//排序項目位址

		let pos = (this.slotData.ItemHeigt / 5);							//ItemHeigt 圖片高度
		for (let i = this._slotItemList.length - 1, max = 0; i > max; --i) {
			if (this._slotItemList[i].y + pos < this._com.height) {
				this._centerIndex = i;										//圖片中心地址
				break;
			}
		}
		this._topItem = this._slotItemList[0];								//圖片最上層
		this._topX = this._slotItemList[0].x;
		this._topY = this._slotItemList[0].y;
		this._bottomX = this._slotItemList[this._botItemIndex].x;
		this._bottomY = this._slotItemList[this._botItemIndex].y;
		this._iconRate = iconRate;																//獲取圖片機率
		let values = this._iconRate.values();													//獲取圖片機率值
		for (let i = 0, max = values.length; i < max; ++i) {
			this._totalIconRate += values[i];													//計算總圖機率
		}
		this.RefreshIcon();																		//刷新圖標
	}

	/**最大尺寸*/
	public async UPtoSize(upSize: number) {
		let upOK = false;
		this.upSizeTime = this.slotData.StartUpSizeTime;
		for (let i: number = 0, max: number = this._slotItemList.length; i < max; ++i) {
			let item = this._slotItemList[i];
			let tw: egret.Tween = null;
			if (i == this._slotItemList.length - 1) {
				egret.Tween.get(item, { loop: false }).to({ y: item.y - upSize }, this.upSizeTime, egret.Ease.sineOut).wait(0).call(() => {
					upOK = true;
				}, this);
			}
			else {

				egret.Tween.get(item, { loop: false }).to({ y: item.y - upSize }, this.upSizeTime, egret.Ease.sineOut).wait(0);
			}
		}
		while (!upOK) {
			await waitForSeconds(0.01);
		}
	}

	public SetRunMove() {
		let FPSSpeed = 1;
		let FastX3Index = 1;
		let LoopFastX3Index = 1;
		if (SelfData.Instance.DisplayFPS <= 30) {
			FPSSpeed = 2;
		}
		for (let i = 0; i < ((8) / FastX3Index) / FPSSpeed; i++) {
			this.MoveList_StartUP.push((-(Math.floor(this.slotData.ItemHeigt * 0.04 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
		this.MoveList_StartUP.push(0);
		if (!SelfData.Instance.PlaySetting.IsFastX3) {
			for (let i = 0; i < ((50) / LoopFastX3Index) / FPSSpeed; i++) {
				this.MoveList_StartLoop.push(((Math.floor(this.slotData.ItemHeigt * 0.5 * 100) * FastX3Index) * FPSSpeed) / 100);
			}
		}
		else {
			for (let i = 0; i < ((10) / LoopFastX3Index) / FPSSpeed; i++) {
				this.MoveList_StartLoop.push(((Math.floor(this.slotData.ItemHeigt * 0.5 * 100) * FastX3Index) * FPSSpeed) / 100);
			}
		}
		for (let i = 0; i < ((10) / FastX3Index) / FPSSpeed; i++) {
			this.MoveList_StartStop.push(((Math.floor(this.slotData.ItemHeigt * 0.4 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
		for (let i = 0; i < ((6) / FastX3Index) / FPSSpeed; i++) {
			this.MoveList_StartStop.push(((Math.floor(this.slotData.ItemHeigt * 0.36 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
		for (let i = 0; i < ((4) / FastX3Index) / FPSSpeed; i++) {
			this.MoveList_StartStop.push(((Math.floor(this.slotData.ItemHeigt * 0.28 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
		for (let i = 0; i < ((2) / FastX3Index) / FPSSpeed; i++) {
			this.MoveList_StartStop.push(((Math.floor(this.slotData.ItemHeigt * 0.18 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
		for (let i = 0; i < ((8) / FastX3Index) / FPSSpeed; i++) {
			this.MoveList_StartStop.push((-(Math.floor(this.slotData.ItemHeigt * 0.04 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
		this.MoveList_ItemIcon.push(0);
		for (let i = 0; i < ((4) / FastX3Index) / FPSSpeed; i++) {
			this.MoveList_ItemIcon.push(((Math.floor(this.slotData.ItemHeigt * 0.01 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
		for (let i = 0; i < ((4) / FastX3Index) / FPSSpeed; i++) {
			this.MoveList_ItemIcon.push(((-Math.floor(this.slotData.ItemHeigt * 0.01 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
	}

	/**車輪運行*/
	public async Run(IsX3: boolean) {
		//console.log("IndexStart  :  " + this.wheelIdx)
		for (let i = 0, max = this._slotItemList.length; i < max; ++i) {

			//console.log("Y   :" + this._slotItemList[i].y);
		}
		this._hasPopvalue = false;
		this.setStartRunIcon();
		this.SetRunMove();
		this.State = SlotItemStatus.Spin;
		this._nowSpeed = this.slotData.Speed;
		if (SelfData.Instance.PlaySetting.AutoSetting.IsFastX3 || SelfData.Instance.PlaySetting.AutoSetting.IsFastX2) {
			this.set3XFastStatus();
		}
		this.SetTimeMap();
		while (this.isPopValue) {
			await waitForSeconds(0.01);
		}
	}

	public MayBeSetRunMove(useTime: number) {
		let FPSSpeed = 1;
		let FastX3Index = 1;
		let LoopFastX3Index = 1;
		if (SelfData.Instance.PlaySetting.IsFastX3) {
			FastX3Index = 2;
			LoopFastX3Index = 5;
		}
		if (SelfData.Instance.DisplayFPS <= 30) {
			FPSSpeed = 2;
		}
		for (let i = 0; i < (20) + (90 * useTime); i++) {
			this.MoveList_StartLoop.push(((Math.floor(this.slotData.ItemHeigt * 0.5 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
		for (let i = 0; i < ((70) / FastX3Index) / FPSSpeed; i++) {
			this.MoveList_StartMayBe.push(((Math.floor(this.slotData.ItemHeigt * 0.4 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
		this.MayBeAdd = true;
	}

	public MayBeSetRunMove_end(useTime: number) {
		let FPSSpeed = 1;
		let FastX3Index = 1;
		let LoopFastX3Index = 1;
		if (SelfData.Instance.PlaySetting.IsFastX3) {
			FastX3Index = 2;
			LoopFastX3Index = 5;
		}
		if (SelfData.Instance.DisplayFPS <= 30) {
			FPSSpeed = 2;
		}
		for (let i = 0; i < (20) + (90 * useTime); i++) {
			this.MoveList_StartLoop.push(((Math.floor(this.slotData.ItemHeigt * 0.5 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
		// for (let i = 0; i < ((70) / FastX3Index) / FPSSpeed; i++) {
		// 	this.MoveList_StartMayBe.push(((Math.floor(this.slotData.ItemHeigt * 0.4 * 100) * FastX3Index) * FPSSpeed) / 100);
		// }
		this.MayBeAdd = true;
	}

	public UpdateSetRunMove() {
		let FPSSpeed = 1;
		let FastX3Index = 1;
		let LoopFastX3Index = 1;
		if (SelfData.Instance.PlaySetting.IsFastX3) {
			FastX3Index = 2;
			LoopFastX3Index = 1;
		}
		if (SelfData.Instance.DisplayFPS <= 30) {
			FPSSpeed = 2;
		}
		for (let i = 0; i < ((10) / LoopFastX3Index) / FPSSpeed; i++) {
			this.MoveList_StartLoop.push(((Math.floor(this.slotData.ItemHeigt * 0.5 * 100) * FastX3Index) * FPSSpeed) / 100);
		}
	}

	setIconBlur(item: SlotItem, blur: boolean = false) {
		if (blur) {
			item.setBlur();
		} else {
			item.unsetBlur();
		}
	}

	public UpdateRun() {
		let Y = 0;
		if (this.MoveList_StartUP.length > 0) {
			Y = this.MoveList_StartUP.shift();
		}
		else if (this.MoveList_StartLoop.length > 0) {
			Y = this.MoveList_StartLoop.shift();
			this.LoopRound++;
		}
		else if (this.MoveList_StartMayBe.length > 0) {
			Y = this.MoveList_StartMayBe.shift();
		}
		else if (this.MoveList_StartStop.length > 0) {
			if (this.MoveList_StartStop.length == 15) {
				for (let i = 0, max = this._slotItemList.length; i < max; ++i) {
					let item = this._slotItemList[i];
				}
			}
			if (!this.IsSetValue)
				this.SetStopValue();
			Y = this.MoveList_StartStop.shift();
		}
		else if (this.MoveList_ItemIcon.length > 0) {
			Y = this.MoveList_ItemIcon.shift();
			this.StartIconMove = true;
		}
		if (!this.StartIconMove) {
			for (let i = 0, max = this._slotItemList.length; i < max; ++i) {
				let item = this._slotItemList[i];
				let MoveY = item.y + Y;
				item.setXY(item.x, MoveY);
				if (Y >= Math.floor(this.slotData.ItemHeigt * 0.5)) {
					this.setIconBlur(item, true);
				}
			}
			for (let i: number = 0, max: number = this._slotItemList.length; i < max; ++i) {
				if (this._slotItemList[i].y >= (this._bottomY + this.slotData.ItemHeigt)) {
					this.setItemToTop(this._slotItemList[i]);
				}
			}
		}
		else {
			for (let i = 0, max = this._slotItemList.length; i < max; ++i) {
				let item = this._slotItemList[i];
				let icon = item.ItemIcon;
				let move_y = icon.y + Y
				icon.setXY(icon.x, move_y);
			}
		}
	}

	public async Stop(result: Array<number>) {
		this._result = result;
		this.stopIndex = this._result.length - 1;
		this.setEndValue();
		while (this.State != <SlotItemStatus>SlotItemStatus.StopSpinEnd) {
			await waitForSeconds(0.01);
		}
	}

	public async SpecialStop(result: Array<number>, endResult?: Array<number>) {
		let topindex = this._slotItemList.indexOf(this._topItem);

		this._result = result;
		this.State = SlotItemStatus.PopSpinShowStack;

		while (this.State != <SlotItemStatus>SlotItemStatus.StopSpinEnd) {
			await waitForSeconds(0.01);
		}
	}

	public SetStopValue() {
		let realResut = copyArray(this._result, 0, this._result.length);
		let b = copyArray(this._result, 0, this._result.length);
		b.reverse();
		let c: number[] = [];
		for (let x = 0; x < this.slotData.RoundStopWaitItem[this.wheelIdx]; x++) {
			let a = this.getIconNumber(b);
			c.push(a);
			b.unshift(a);
		}
		if (this.IsFastStop)
			return;
		// FuDaiLianLianModel.Instance.EndResultIndex = b.length;
		if (b != null && b.length > 0) {
			b.reverse();
			this.PopOnEndResult(b);
		}
		this.IsSetValue = true;
		for (let i = 0, max = this._slotItemList.length; i < max; ++i) {
			let item = this._slotItemList[i];
		}
	}

	public async PopOnEndResult(result: Array<number>) {
		this._result = result;
		this.stopIndex = this._result.length - 1;
		this._slotItemList.sort((a, b) => { return (a.y - b.y); });
		if (result.length > 0)
			this._hasPopvalue = true;
	}
	public async FastStop(result: Array<number>, endResult?: Array<number>) {

	}

	public CheckAddIcon(result: Array<number>, checkresult: Array<number>) {
		let endResult = [];
		let addcheckresult = 0;
		let addresult = 0;
		if (checkresult[0] != 0 && checkresult[0] != 8 && checkresult[0] != 7) {
			if (checkresult[0] != checkresult[1])
				addcheckresult = 2;
			else if (checkresult[1] != checkresult[2])
				addcheckresult = 1;
			else {
				addcheckresult = 0;
			}
		}
		if (addcheckresult > 0) {
			for (let i = 0; i < addcheckresult; i++) {
				endResult.push(checkresult[0]);
			}
		}
		if (result[2] == checkresult[0]) {
			let r = this.getIconName([checkresult[0], checkresult[0], checkresult[0]]);
			for (let i = 0; i < this.slotData.RoundStopWaitItem[this.wheelIdx]; i++) {
				endResult.push(r);
			}
		}
		if (result[2] != 0 && result[2] != 8 && result[2] != 7) {
			if (result[2] != result[1])
				addresult = 2;
			else if (result[1] != result[0])
				addresult = 1;
			else {
				addresult = 0;
			}
		}
		if (addresult > 0) {
			for (let i = 0; i < addresult; i++) {
				endResult.push(result[2]);
			}
		}
		endResult.reverse();
		return endResult;
	}

	public async EndStop(result: Array<number>, endResult?: Array<number>) {
		if (this.State === SlotItemStatus.StopSpinEnd || this.State === SlotItemStatus.Idle)
			return;
		this.State = SlotItemStatus.Idle;
		this._result = result;
		this.stopIndex = this._result.length - 1;
		this._slotItemList.sort((a, b) => { return (a.y - b.y); });
		this._botItemIndex = this._slotItemList.length - 1;
		let item = this._slotItemList[this._botItemIndex];
		item.setXY(item.x, this._bottomY + 5);
		await waitForSeconds(0.01);
		this.sortItem();
		for (let i = this._slotItemList.length - 1, max = 0; i > max; --i) {
			if (this._slotItemList[i].y < this._com.height) {
				this._centerIndex = i;
				break;
			}
		}
		//await waitForSeconds(0.01);

		let i = this._centerIndex;

		if (endResult != null) {
			i = this._slotItemList.length - 1;
			endResult = endResult.reverse();
		}

		for (let max = 0; i >= max; i--) {
			let value = 0;
			let item = this._slotItemList[i];
			if (i - this._centerIndex > 0) {
				if (endResult.length > 0) {
					value = endResult[endResult.length - (i - this._centerIndex)];
				}
				else {
					let filter = [];
					if (ExcludeStackTable.CheckExcludeIcon(this._iconMap[this._result[this.stopIndex]])) {
						filter.push(this._result[this.stopIndex]);
					}
					value = this.getIconNumber(filter);
				}
			}
			else {
				value = this._result[this.stopIndex];
				this.stopIndex--;
			}
			item.isBlur = false;
			item.SetIcon(this._iconMap[value]);
			if (!this.isPopValue)
				break;
		}
		//this.setAllNotBlurIcon();
		this.State = SlotItemStatus.StopSpinStart;
		this.runEnd();

		while (<SlotItemStatus>this.State != SlotItemStatus.StopSpinEnd) {
			await waitForSeconds(0.01);
		}
	}

	/**更新車輪動態*/
	public Update() {
		if (this.State != SlotItemStatus.Idle && this.State != SlotItemStatus.StopSpinEnd) {
			this.UpdateRun();
			if (this.MoveList_ItemIcon.length == 0)
				this.runEnd();
		}
	}

	StopStart() {

	}

	/**車輪結束*/
	public runEnd() {
		if (this._stopSound) {
			SoundManger.Instance.PlaySoundSE("Stop");
			SoundManger.Instance.PlaySoundSE("ReelStop");
		}
		this.wheelIdx
		this.setAllNotBlurIcon();
		this.finish();
		this.IsFastStop = false;
		this.AddFastY = false;
		this.StartIconMove = false;
		this.IsSetValue = false;
		this.LoopRound = 0;
		this.IsMaybeShow = false;
		//console.log("IndexEnd  :  " + this.wheelIdx)
		for (let i = 0, max = this._slotItemList.length; i < max; ++i) {
			//console.log("Y   :" + this._slotItemList[i].y);
		}
		//this.test = 0;
	}

	finish() {
		this.sortItem();
		this.State = SlotItemStatus.StopSpinEnd;
		for (let i = 0; i < this._slotItemList.length; ++i) {
			if ((this._slotItemList[i].y + this.slotData.itemheight) == this._com.height) {
				this._centerIndex = i;
				break;
			}
		}
		this.setAllNotBlurIcon();
		this._roundTime = 0;
		SlotWheelBase.AccelerationMove = [];
		this._stopSound = true;
		this._accelerationEnd = false;
	}

	/**將項目設置為頂部*/
	public setItemToTop(item: SlotItem): void {
		//item.sortingOrder = 0;
		let lastIndex = this._slotItemList.indexOf(item) - 1;
		this._botItemIndex = lastIndex < 0 ? (this._slotItemList.length - 1) : lastIndex;
		let topY = this._topItem.y - this.slotData.ItemHeigt;
		item.setXY(item.x, topY);
		let topindex = this._slotItemList.indexOf(this._topItem);
		let iconnameF = [];
		for (let i = 0, max = this._showCount; i < max; ++i) {
			if (i != 0) {
				if (topindex == this._slotItemList.length - 1)
					topindex = 0;
				else
					topindex++;
			}
			let t = this._slotItemList[topindex];
			let icon = t.GetIcon();
			if (icon != null) {
				icon = icon.toString();
				if (t.isBlur)
					icon = icon.substr(1, icon.length - 1);
				icon = this.getIconStr2Number(icon);
				if (ExcludeStackTable.CheckExcludeIcon(icon.toString())) {
					iconnameF.push(icon);
				}
				else
					iconnameF.push(-1);
			}
		}
		if (this.wheelIdx == 0) {
			//console.log("1");
		}
		let value = this.getIconName(iconnameF);

		if (this.State == SlotItemStatus.WaitStop) {
			this.WaitStopCount++;
		}
		if (this.isPopValue) {
			if ((this._result[this.stopIndex] != null && this._result[this.stopIndex] != undefined)) {

				value = this._iconMap[this._result[this.stopIndex]];
				if (value == undefined) {
					console.log("d");
				}
				this.stopIndex--;
				if (this.State == SlotItemStatus.StopSpinFirst || this.State == SlotItemStatus.PopSpinShowStack) {
					if (this.State == SlotItemStatus.StopSpinFirst)
						this.State = SlotItemStatus.StopSpinStart;
					else if (this.State == SlotItemStatus.PopSpinShowStack)
						this.State = SlotItemStatus.PopStack;
				}
			}
		}
		if (this.MoveList_StartLoop.length > 0) {
			value = SlotItem.BlurPrefix + value;
			item.isBlur = true;
		}
		else
			item.isBlur = false;
		if (value == undefined) {
			console.log("d");
		}
		item.SetIcon(value);
		if (this.IsMaybeShow) {
			//item.parent.asCom.getChild("MaybeBlack").asGraph.sortingOrder = 5
			//item.ItemCom.sortingOrder = 15;
		}
		this._topItem = item;
		this.ProcessRenderOrder();
	}

	setEndValue(): void {
		this._slotItemList.sort((a, b) => { return (a.y - b.y); });
		this._centerIndex = this._slotItemList.length - 1;
		this.State = SlotItemStatus.StopSpinFirst;
		this.setItemToTop(this._slotItemList[this._centerIndex]);
		let item = this._slotItemList[0];
		let icon = item.GetIcon();
		if (icon != null) {
			icon = icon.toString();
			if (item.isBlur && icon.length !== 1) {
				icon = icon.substr(1, icon.length - 1);
				item.isBlur = false;
				item.SetIcon(icon);
				item.unsetBlur();
			}
		}

	}

	setEndCenterIcon(item: SlotItem, targetNum) {
		item.isBlur = false;
		item.SetIcon(this._iconMap[targetNum]);
	}

	changeIcon(oldIcon, newIcon): void {
		for (let i = 0, imax = this._slotItemList.length; i < imax; ++i) {
			let item = this._slotItemList[i];
			if (item.GetIcon() == oldIcon) {
				item.isBlur = false;
				item.SetIcon(newIcon);
			}
		}
	}

	/**設置開始運行圖標(變模糊圖)*/
	setStartRunIcon() {
		let max = this._slotItemList.length - this._showCount;
		max *= -1;
		for (let i = -2; i > max; i--) {
			let item = this.GetItem(i);
			if (item != null) {
				let icon = item.GetIcon();
				if (icon == "" || icon == null) {
					icon = this.getIconName();
				}
				icon = icon.toString();
				if (!item.isBlur) {
					item.isBlur = true;
					item.SetIcon(SlotItem.BlurPrefix + icon);
				}
				this.setIconBlur(item);
			}
		}

	}

	setAllBlurIcon() {
		let list = this._slotItemList;
		for (let i = 0, imax = list.length; i < imax; ++i) {
			let item = list[i];
			let icon = item.GetIcon();
			if (icon == "" || icon == null) {
				icon = this.getIconName();
			}
			icon = icon.toString();
			if (!item.isBlur) {
				item.isBlur = true;
				item.SetIcon(SlotItem.BlurPrefix + icon);
			}
			this.setIconBlur(item);
		};
	}

	setAllNotBlurIcon() {
		let list = this._slotItemList;
		for (let i = 0, imax = list.length; i < imax; ++i) {
			let item = list[i];
			let icon = item.GetIcon();
			if (icon == null) {
				consoleLog("icon is null");
				continue;
			}
			icon = icon.toString();
			if (item.isBlur && icon.length !== 1) {
				icon = icon.substr(1, icon.length - 1);
				item.isBlur = false;
				item.SetIcon(icon);
				item.unsetBlur();
			}
		}
	}

	/**獲取圖標編號*/
	public getIconNumber(filter: Array<number> = []): number {
		//return "0";
		filter = ArrayRemoveDuplicate(filter);
		if (this.wheelList.length > 0) {
			let value = this.wheelList[this.wheelListIndex];
			this.wheelListIndex++;
			if (this.wheelListIndex >= this.wheelList.length)
				this.wheelListIndex = 0;
			//console.log("value :   " + value);
			return value;
		}
		let costrate = 0;
		let f = [];
		for (let i = 0, max = filter.length; i < max; ++i) {
			if (!(f.indexOf(filter[i]) >= 0)) {
				costrate += this._iconRate.containsKey(filter[i]) ? this._iconRate[filter[i]] : 0;
				f.push(filter[i]);
			}
		}
		let iconMap = this._iconMap;
		let random = randomInt(1, this._totalIconRate - costrate);
		let values = this._iconRate.values();

		for (let i = 0, max = values.length; i < max; ++i) {
			if (filter.indexOf(this._iconRate._keys[i]) >= 0)
				continue;
			random -= values[i]
			if (random <= 0) {
				return this._iconRate._keys[i];
			}
		}
		let k = iconMap._keys[randomInt(0, iconMap._keys.length - 1)];
		return k;
	}

	/**獲取圖標名稱*/
	public getIconName(filter: Array<number> = []): string {
		let value = this.getIconNumber(filter);
		return this._iconMap[value];
	}

	/**排序項目*/
	sortItem(bottomY: number = null) {
		this._slotItemList.forEach((x) => { x.y = Math.floor(x.y); });				//forEach 数组每个元素都执行一次回调函数。Math.floor 返回小於或等於其數值參數的最大數(隨機)。
		this.calculBottomIndex();													//計算圖片地址
		if (bottomY) {
			this._slotItemList[this._botItemIndex].y = bottomY;
		}
		let index: number = this._botItemIndex;
		for (let i = 1, max = this._slotItemList.length; i < max; ++i) {
			index--;
			if (index < 0)
				index = max - 1;
			this._slotItemList[index].y = (this._slotItemList[this._botItemIndex].y - (this.slotData.ItemHeigt * i));			//根據圖片高度 ItemHeigt 排列圖片
			if (i == max - 1)
				this._topItem = this._slotItemList[index];																		//圖片最上層
		}
		this.ProcessRenderOrder();																								//渲染順序
	}

	/**計算圖片總數量地址*/
	calculBottomIndex() {
		for (let i = 0, imax = this._slotItemList.length; i < imax; ++i) {
			if (this._slotItemList[this._botItemIndex].y < this._slotItemList[i].y)
				this._botItemIndex = i;
		}
	}

	setSpeed(speed) {
		this._nowSpeed = speed;
	}

	public setFastStatus(speed: number = 2) {
		this._nowSpeed = this.slotData.Speed * speed;
	}

	public set3XFastStatus() {
		this._nowSpeed = this.slotData.Speed * 2.5;
		if (this._nowSpeed >= this.slotData.ItemHeigt)
			this._nowSpeed = this.slotData.ItemHeigt;
	}

	public GetItem(num: number) {
		let item: SlotItem = null;
		let diff = (this._showCount - num - 1);
		// 判斷如果這個輪轉要顯示的IDX超過_itemList的上限,請將他IDX從0開始計算
		let idx = -999;
		if ((this._centerIndex - diff) < 0) {
			let aIdx = this._centerIndex - diff + this._slotItemList.length;
			idx = aIdx;
		}
		else if ((this._centerIndex - diff) > this._slotItemList.length - 1) {
			let aIdx = (this._centerIndex - diff) - this._slotItemList.length;
			idx = aIdx;
		}
		else {
			idx = this._centerIndex - diff;
		}
		try {
			item = this._slotItemList[idx];
		} catch (error) {
			item = null;
		}

		return item;
	}

	public SetWheelsList(wheelList: Array<number>) {
		this.wheelList = wheelList;
	}

	/**刷新圖標*/
	public RefreshIcon(filter?: number[]): void {
		this._slotItemList.forEach((x) => {
			let n = this.getIconName(filter);
			x.SetIcon(n);
		});
	}

	public SetIconRate(iconRate: Dictionary) {
		this._iconRate = iconRate;
		this._totalIconRate = 0;
		let values = this._iconRate.values();
		for (let i = 0, max = values.length; i < max; ++i) {
			this._totalIconRate += values[i];
		}
	}

	/**啟用所有圖標*/
	public EnableAllIcon() {
		this._slotItemList.forEach(x => x.visible = true);
	}

	/**處理渲染順序*/
	protected ProcessRenderOrder(): void {
		if (this.slotData.RenderOrder == fairygui.ChildrenRenderOrder.Descent)					//降序，按照物件在顯示列表中的順序，從大到小依次渲染，效果就是序號小的顯示在較前面。
			this._orderList.sort((a, b) => {
				return b.y - a.y;
			});
		else																					//Ascent 升序，這是預設值，按照物件在顯示列表中的順序，從小到大依次渲染，效果就是序號大的顯示在較前面。
			this._orderList.sort((a, b) => {
				return a.y - b.y;
			});
		for (let i = 0, max = this._orderList.length; i < max; i++) {
			this._orderList[i].sortingOrder = i;
			if (this.IsMaybeShow) {

			}
		}
	}
	public SetWaitStopStatus() {
		this.State = SlotItemStatus.WaitStop;
		this.WaitStopCount = 0;
		//console.log("this.State = SlotItemStatus.WaitStop");
	}

	public SetShowItemIcon(result: Array<number>) {
		this.sortItem();
		for (let i = this._slotItemList.length - 1, max = 0; i > max; --i) {
			if (this._slotItemList[i].y < this._com.height) {
				this._centerIndex = i;
				break;
			}
		}
		let i = this._slotItemList.length - 1;
		let index = result.length - 1;
		let filter = [];
		let value = result[index];
		if (ExcludeStackTable.CheckExcludeIcon(value.toString())) {
			filter.push(value)
		}
		let first = true;
		for (let max = 0; i >= max; i--) {
			let item = this._slotItemList[i];
			item.isBlur = false;
			if (i - this._centerIndex > 0) {
				let icon = this.getIconName(filter)
				if (ExcludeStackTable.CheckExcludeIcon(icon.toString())) {
					filter.push(parseInt(icon));
				}
				item.SetIcon(icon);
			}
			else if (index === -1) {
				if (first) {
					filter = [];
					value = result[0];
					if (ExcludeStackTable.CheckExcludeIcon(value.toString())) {
						filter.push(value)
					}
					first = false;
				}
				let icon = this.getIconName(filter)
				if (ExcludeStackTable.CheckExcludeIcon(icon.toString())) {
					filter.push(parseInt(icon));
				}
				item.SetIcon(icon);
			}
			else {
				item.SetIcon(this._iconMap[result[index]]);
				index--;
			}
		}

		this.ProcessRenderOrder();

	}

	public async SetSpeialFirstIcon(result, endResult) {
		this._result = result;
		this.stopIndex = this._result.length - 1;
		this._slotItemList.sort((a, b) => { return (a.y - b.y); });
		this._botItemIndex = this._slotItemList.length - 1;
		let item = this._slotItemList[this._botItemIndex];
		item.setXY(item.x, this._bottomY + 5);
		await waitForSeconds(0.01);
		this.sortItem();
		for (let i = this._slotItemList.length - 1, max = 0; i > max; --i) {
			if (this._slotItemList[i].y < this._com.height) {
				this._centerIndex = i;
				break;
			}
		}
		//await waitForSeconds(0.01);

		let i = this._centerIndex;

		if (endResult != null) {
			i = this._slotItemList.length - 1;
			endResult = endResult.reverse();
		}

		for (let max = 0; i >= max; i--) {
			let value = 0;
			let item = this._slotItemList[i];
			if (i - this._centerIndex > 0) {
				if (endResult.length > 0) {
					value = endResult[endResult.length - (i - this._centerIndex)];
				}
			}
			else {
				value = this._result[this.stopIndex];
				this.stopIndex--;
			}
			item.isBlur = false;
			item.SetIcon(this._iconMap[value]);
			if (!this.isPopValue)
				break;
		}
		item = this._slotItemList[this._botItemIndex];
		item.setXY(item.x, this._bottomY);
		this.sortItem();
	}

	public ResetWheelListIndex() {
		this.wheelListIndex = 0;
	}

	getIconStr2Number(Icon: string) {
		let idx = this._iconMap._values.indexOf(Icon);
		if (idx > -1) {
			return this._iconMap._keys[idx];
		}
		return Icon;
	}

	public setMaybeReduceSpeed(value: number, low: number) {
		this._maybeReduceSpeed = value;
		this._maybeReduceLowSpeed = low;
	}

	public setSlotData(slotData: SlotData) {
		this.slotData = slotData;
	}
	public ResetOldData() {

	}

	private TweenEaseFun: Dictionary = new Dictionary([
		{ key: TweenEase.None, value: null },
		{ key: TweenEase.sineIn, value: egret.Ease.sineIn },
		{ key: TweenEase.sineOut, value: egret.Ease.sineOut },
		{ key: TweenEase.sineInOut, value: egret.Ease.sineInOut },
		{ key: TweenEase.backIn, value: egret.Ease.backIn },
		{ key: TweenEase.backOut, value: egret.Ease.backOut },
		{ key: TweenEase.backInOut, value: egret.Ease.backInOut },
		{ key: TweenEase.circIn, value: egret.Ease.circIn },
		{ key: TweenEase.circOut, value: egret.Ease.circOut },
		{ key: TweenEase.circInOut, value: egret.Ease.circInOut },
		{ key: TweenEase.bounceIn, value: egret.Ease.bounceIn },
		{ key: TweenEase.bounceOut, value: egret.Ease.bounceOut },
		{ key: TweenEase.bounceInOut, value: egret.Ease.bounceInOut },
		{ key: TweenEase.elasticIn, value: egret.Ease.elasticIn },
		{ key: TweenEase.elasticOut, value: egret.Ease.elasticOut },
		{ key: TweenEase.elasticInOut, value: egret.Ease.elasticInOut },
		{ key: TweenEase.quadIn, value: egret.Ease.quadIn },
		{ key: TweenEase.quadOut, value: egret.Ease.quadOut },
		{ key: TweenEase.quadInOut, value: egret.Ease.quadInOut },
		{ key: TweenEase.cubicIn, value: egret.Ease.cubicIn },
		{ key: TweenEase.cubicOut, value: egret.Ease.cubicOut },
		{ key: TweenEase.cubicInOut, value: egret.Ease.cubicInOut },
		{ key: TweenEase.quartIn, value: egret.Ease.quartIn },
		{ key: TweenEase.quartOut, value: egret.Ease.quartOut },
		{ key: TweenEase.quartInOut, value: egret.Ease.quartInOut },
		{ key: TweenEase.quintIn, value: egret.Ease.quintIn },
		{ key: TweenEase.quintOut, value: egret.Ease.quintOut },
		{ key: TweenEase.quintInOut, value: egret.Ease.quintInOut }
	]);

	// protected Acceleration(index: number) {
	// 	let _a: number = 0;
	// 	let _times: number = 0;
	// 	if (this.slotData.MoveTime != 0 && !(SelfData.Instance.PlaySetting.IsFastX2 || SelfData.Instance.PlaySetting.IsFastX3)) {
	// 		if (!this._accelerationEnd) {
	// 			if (this.wheelIdx == 0) {
	// 				if (index == 0) {
	// 					this._startTime = new Date().getTime();
	// 					this._accelerationSpeed = (this._nowSpeed - this.slotData.MuzzleVelocity) / this.slotData.MoveTime;
	// 					_a = Math.floor(this.slotData.MuzzleVelocity);
	// 				}
	// 				else {
	// 					this._endTime = new Date().getTime();
	// 					_times = (this._endTime - this._startTime) / 1000;
	// 					if (_times >= this.slotData.MoveTime)
	// 						_times = this.slotData.MoveTime;
	// 					_a = Math.floor(this.slotData.MuzzleVelocity + this._accelerationSpeed * _times);
	// 					if (_a >= this._nowSpeed) {
	// 						_a = this._nowSpeed;
	// 						this._accelerationEnd = true;
	// 					}
	// 				}
	// 				SlotWheelBase.AccelerationMove.push(_a);
	// 				return _a;
	// 			}
	// 			else {
	// 				if (index < SlotWheelBase.AccelerationMove.length) {
	// 					return SlotWheelBase.AccelerationMove[index];
	// 				}
	// 				else {
	// 					this._accelerationEnd = true;
	// 					return this._nowSpeed;
	// 				}
	// 			}
	// 		}
	// 		else {
	// 			return this._nowSpeed;
	// 		}
	// 	}
	// 	else {
	// 		return this._nowSpeed;
	// 	}
	// }

	/**設置速度*/
	protected Acceleration(index: number) {
		let _a: number = 0;
		let _times: number = 0;
		if (this.slotData.MoveTime != 0) {
			if (!this._accelerationEnd) {
				if (this.timeMap.length > 0 && index < this.timeMap.length) {
					return this.timeMap[index];
				}
				this._accelerationEnd = true;
				return this._nowSpeed;
			}
			else {
				return this._nowSpeed;
			}
		}
		else {
			return this._nowSpeed;
		}
	}


	public timeMap: Array<number> = [];

	/**設置速度所需要德時間*/
	public SetTimeMap() {
		this.timeMap.length = 0
		this.timeMap.push(Math.floor(this.slotData.MuzzleVelocity));
		let time = 1 / SelfData.Instance.DisplayFPS;
		this._accelerationSpeed = (this._nowSpeed - this.slotData.MuzzleVelocity) / this.slotData.MoveTime;
		let count = 1;
		while (true) {
			let tmpT = time * count;
			if (tmpT >= this.slotData.MoveTime) {
				tmpT = this.slotData.MoveTime;
				this.timeMap.push(Math.floor(this._nowSpeed));
				if (tmpT === this.slotData.MoveTime)
					break;
			}
			else {
				this.timeMap.push(Math.floor(this.slotData.MuzzleVelocity + this._accelerationSpeed * tmpT));
			}
			count++;

		}
	}

	public GetTopItem() {
		let item = null;
		item = this._topItem;
		return item;
	}
}