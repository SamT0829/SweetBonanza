/**插槽圖項*/
class SlotItem extends fairygui.GComponent {
	public static BlurPrefix: string = "a";
	public ItemCom: fairygui.GComponent = null;
	public ItemIcon: fairygui.GComponent = null;
	public ItemBG: fairygui.GComponent = null;
	/**車輪排序ID*/
	public wheelIdx = -1;

	public itemtype: SlotItemType = SlotItemType.Loader;
	protected _loader: fairygui.GLoader = null;	
	//protected _blurLoader: fairygui.GLoader = null;
	protected _text: fairygui.GTextField = null;
	protected _comDict: Dictionary = new Dictionary([]);
	public _comPartent: fairygui.GComponent = null;

	public isBlur = false;
	public useBlur = false;
	public blurFliter = new egret.BlurFilter(0, 25, 3);
	public m_icon: string = "";

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);
		this._loader = this.getChild("loader").asLoader;		
		let parent = this.getChild("parent");						//null
		if (parent != null) {
			this._comPartent = parent.asCom;
		}
		
	}
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
				com.visible = true;
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
			}
		} else {
			this._loader.visible = true;
			this._loader.url = "ui://" + SelfData.Instance.MainPackageName + "/" + name;
		}
		this.m_icon = name;
	}

	public GetIndex(): number {
		let list = this.m_icon.split("_");
		if (list.length > 1)
			return parseInt(list[list.length - 1]);
		return parseInt(this.m_icon);
	}

	public GetIcon() {
		return this.m_icon;
	}

	public SetPos(x: number, y: number) {
		this.setXY(x, y);
	}

	public GetItemComponent(): fairygui.GComponent {
		return <fairygui.GComponent>this.ItemCom;
	}

	public getNowComponent(): fairygui.GComponent {
		//return <fairygui.GComponent>this._comDict[this.m_icon];
		return <fairygui.GComponent>this.ItemIcon;
	}
	public getNowComponentBG(): fairygui.GComponent {
		//return <fairygui.GComponent>this._comDict[this.m_icon];
		return <fairygui.GComponent>this.ItemBG;
	}

	public addComponent(name): fairygui.GComponent {

		let obj = UIManager.Instance.ShowEffect(SelfData.Instance.MainPackageName, name, false);
		if (obj) {
			obj._name = name;
			if (this._comPartent != null)
				return this._comPartent.addChild(obj).asCom;
			else
				return this.addChild(obj).asCom;
		}
		else
			return null;
	}

	public setBlur() {
		if (!this.useBlur) {
			//this._loader.filters = [this.blurFliter];
			this.useBlur = true;
		}
	}

	public unsetBlur() {
		if (this.useBlur) {
			//this._loader.filters = [];
			this.useBlur = false;
		}
	}

	public setLoaderAlpha(value: number) {
		this._loader.alpha = value;
	}
}