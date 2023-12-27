class SweetBonanzaSlotItem extends SlotItem{
    private ItemBonusX: fairygui.GComponent;
	public index: number;
    //SetIcon設置圖標
	public SetIcon(name: string) {
		name = name.toString();
		//console.log(name);	
		if (this.m_icon == name)																	//當圖片名字一樣
			return;		
		if (this._comDict.containsKey(this.m_icon)) {												//當圖片名字有在_comDict
			if (this._comDict[this.m_icon]) {
				let trans = this._comDict[this.m_icon].getTransition("stop_one");
				if (trans != null)																	//圖片是否有動畫
					trans.play();
				this._comDict[this.m_icon].visible = false;
			}
		}
		if (this.itemtype === SlotItemType.Component && !this.isBlur) {
			this._loader.visible = false;
			let com: fairygui.GComponent = null;
			if (this._comDict.containsKey(name)) {
				com = (<fairygui.GComponent>this._comDict[name]);
			} else {
				com = this.addComponent(name);
				this._comDict.add(name, com);
			}
			if (com != null) {
				if(this.index >= 2)
					com.visible = true;
				else
					com.visible = false;
				
				let trans = com.getTransition("stop_one");
				if (trans != null)
					trans.play();
				this.ItemCom = com;
				if(com.getChild("ItemIcon") != null){
					this.ItemIcon = com.getChild("ItemIcon").asCom;
				}
				if(com.getChild("ItemBG") != null){
					this.ItemBG = com.getChild("ItemBG").asCom;
				}
                if(com.getChild("BonusX") != null){
                    this.ItemBonusX = com.getChild("BonusX").asCom;
                    this.ItemBonusX.visible = true;
                }
			}
		} else {
			this._loader.visible = true;
			this._loader.url = "ui://" + SelfData.Instance.MainPackageName + "/" + name;
		}
		this.m_icon = name;
	}

    public GetItemBonusXComponent(): fairygui.GComponent {
		return <fairygui.GComponent>this.ItemBonusX;
	}

}