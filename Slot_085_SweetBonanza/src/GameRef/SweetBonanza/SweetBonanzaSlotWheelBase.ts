class SweetBonanzaSlotWheelBase extends SlotWheelBase{

    private iconFallTime : number = 250;
    private iconRunTime : number = 250;
    public isSkip = false;

   	public Init(com: fairygui.GComponent, iconMap: Dictionary, iconRate: Dictionary, slotData: SlotData){
      this._com = com;									//讀取資料
		this.slotData = slotData;
		this.underSize = slotData.StopUnderSize;
		this._unblurSpeed = slotData.UnBlurSpeed;

		for (let i = 0, max = com.numChildren; i < max; ++i) {				//numChildren 获得容器内孩子元件的数量
			let obj = com.getChildAt(i);									//getChildAt元件的名字是允许重复的，在这种情况下，GetChild返回第一个匹配名称的对象。GetChild 通过索引或名称获得元件引用
			if (slotData.SlotWheelExcludeObj.indexOf(obj.name) >= 0)
				continue;
			obj.sortingOrder = 0;
			let item = <SweetBonanzaSlotItem>obj;							//通過 setPackageItemExtension 轉換自訂義SlotItem
			//item.SetIcon(i.toString());
			item.wheelIdx = this.wheelIdx;									//車輪排序ID
			item.itemtype = slotData.ItemType;								//item 屬性
            item.index = i;
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
		this.RefreshIcon();		
        
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnStopRun, ClientMsg.StopRun);
    }

    public async Run() {
        this.State = SlotItemStatus.Spin;
        await this.ItemMoveToWindowDownSide();
        this.ItemMoveToWindowUpSide();
	}
    public async StopTweenIndex(IsX3: boolean, index: number){
        this.ItemMoveDownToWindow(index);
    }

    private async ItemMoveToWindowDownSide(){
        let finish: boolean = false;

        for (let i = this._slotItemList.length -1; i >= 2; i--) {
            egret.Tween.get(this._slotItemList[i], {loop: false})
                .to({y: this._slotItemList[i].y + ((SweetBonanzaGameModel.Instance.SlotRow + 1) * this.slotData.itemheight)}, 
                    this.iconRunTime, (t) => this.customEaseRunDown(t, this._slotItemList[i]))
                .call(()=> { if(i == 2) finish = true; }, this);
            
            if (!SelfData.Instance.PlaySetting.AutoSetting.IsFastX3  && !this.isSkip)
                await waitForSeconds(0.1);
		}

        while(!finish)
            await waitForSeconds(0.001);
    }
    public async ItemMoveToWindowUpSide(){
        for (let i = this._slotItemList.length -1; i >= 2; i--) {
            this._slotItemList[i]
                .setXY(this._slotItemList[i].x,-(SweetBonanzaGameModel.Instance.SlotRow - (i - 2))* this.slotData.itemheight);
            this._slotItemList[i].visible = true;
        }
    }
    private async ItemMoveDownToWindow(index: number){
        for (let i = this._slotItemList.length -1; i >= 2; i--) {
            egret.Tween.get(this._slotItemList[i], {loop: false})
                .to({y: this._slotItemList[i].y + ((SweetBonanzaGameModel.Instance.SlotRow) * this.slotData.itemheight)},
                    this.iconFallTime, t => this.customEaseStopDown(t))
                .call(async()=> {
                    let item = this.GetNewItem(i).getNowComponent();
                    item.getTransition("down").play();
		            SoundManger.Instance.PlaySoundSE("IconFall2");
                    await waitForSeconds(0.3);
                    if(i == 2){
                        let wheelStopEvent: ClientEvent = new ClientEvent(ClientMsg.WheelStop);
		                wheelStopEvent.eventData = index;
		                EventManager.Instance.Send(wheelStopEvent);
                    }
                }, this);;
            
            if (!SelfData.Instance.PlaySetting.AutoSetting.IsFastX3 && !this.isSkip)
                await waitForSeconds(0.1);
		}

        this.isSkip = false;
    }
    private customEaseStopDown (t:number):number {
        return egret.Ease.sineOut(t);
    }

     private customBounceStopDown (t:number):number {
        if(t > 0.6)
            return egret.Ease.bounceOut(t);
        
        return egret.Ease.sineOut(t);
    }

    private customEaseRunDown (t:number, slotItem: SlotItem):number {
        if(slotItem.y >= 500)
            slotItem.visible = false;
        
        return egret.Ease.sineIn(t);
        // return t;
        
    }

    private OnStopRun(){
        this.isSkip = true;
    }

    public GetNewItem(index: number){
		let item: SlotItem = null;
		item = this._slotItemList[index];
		return item;
    }
}