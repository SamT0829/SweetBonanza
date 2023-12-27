class SlotData {
	/**顯示排列計數*/
	ShowCount: Array<number> = [];
	StartUpSize: number = 35
	/** ms */
	StartUpSizeTime: number = 200;
	StartWaitTime: Array<number> = [0, 0.1, 0.2, 0.3, 0.4];
	StartWaitTimeX2: Array<number> = [0, 0, 0, 0, 0];
	StartWaitTimeX3: Array<number> = [0, 0, 0, 0, 0];
	StopWaitTime: Array<number> = [0,1,2,3,4];
	StopWaitTimeX2: Array<number> = [2,2,2,2,2];
	StopWaitTimeX3: Array<number> = [1,1,1,1,1];
	StopUnderSize: number = -1;
	StopReduceSpeed = 0;
	StopReduceLowSpeed = 0;

	RoundStopWaitItem: number[] = [3,3,3,3,3];

	/** ms */
	ReboundSpeedTime: number = 150;
	TweenEaseKey: TweenEase = TweenEase.None;
	/**總圖片地址*/
	IconMap: Dictionary = new Dictionary([]);
	RenderOrder: fairygui.ChildrenRenderOrder = fairygui.ChildrenRenderOrder.Ascent;
	/**圖片機率*/
	IconRate: Array<Dictionary> = [];
	set ItemHeigt(value){
		this.itemheight = value;
	}
	get ItemHeigt():number{
		if(this.itemHeightFun!=null)
			return this.itemHeightFun();
		return this.itemheight;
	}
	/**運轉數度*/
	Speed: number = 35;
	UnBlurSpeed:number = 10;
	View: fairygui.GComponent = null;
	SlotWheelExcludeObj: Array<string> = [];

	MaybeBonusWaitTime: Array<number> = [1.1, 1.3, 1.5, 1.7, 1.9];
	MaybeBonusFxObj: Array<fairygui.GObject> = [];
	MaybeBonusFastRate = 2;
	MaybeReduceSpeed = 0;
	MaybeReduceSpeedX3 = 0;
	MaybeReduceLowSpeed = 0;

	MaybeBigWinWaitTime: Array<number> = [1.1, 1.3, 1.5, 1.7, 1.9];
	MaybeBigWinFxObj: Array<fairygui.GObject> = [];
	MaybeBigWinFastRate = 2;
	MaybeBigWinReduceSpeed = 0;
	MaybeBigWinReduceSpeedX3 = 0;
	MaybeBigWinReduceLowSpeed = 0;

	ItemType:SlotItemType = SlotItemType.Loader;
	WheelsPos:Array<egret.Point> = [];
	ManualStop:boolean = false;

	/**Maybe時的依據 None 不啟用*/
	DefaultMaybeType:SlotMaybeType = SlotMaybeType.Bonus;
	/**播放Maybe時*/
	PlayMaybeType:SlotMaybeType = SlotMaybeType.None;

	// Wheel Acceleration
	MuzzleVelocity: number = 0;// 初速度
	/**經過時間*/
	MoveTime: number = 0;// 經過時間
	constructor() {

	}
	public itemheight:number = 140;
	public itemHeightFun:Function = null;
}