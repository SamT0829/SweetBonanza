abstract class UIWindowBase {

	private _uiRoot:fairygui.GRoot;
    get UIRoot(){ return this._uiRoot; }
	set UIRoot(root: fairygui.GRoot){ this._uiRoot = root; }

	private _view: fairygui.GObject;
	get View(){ return this._view; }
	set View(view: fairygui.GObject){ this._view = view; }

	private _name: string;
    get Name(){ return this._name; }

	private _depth: number;
    get Depth(){ return this._depth; }
	set Depth(depth: number){ this._depth = depth; }

	private _parent: UIWindowBase;
	get Parent(){ return this._parent; }
	set Parent(parent: UIWindowBase){ this._parent = parent; }

	private _param: ShowWindowParam;
	get Param() { return this._param; }
	set Param(param: ShowWindowParam){ this._param = param; }

	private _windowType: WindowType;
	get WindowType() { return this._windowType; }
	set WindowType(windowType: WindowType){ this._windowType = windowType; }

	public RemoveOnClose = false;

	public OnCloseCallback = new Dictionary([]);
	public OnDestroyCallback = new Dictionary([]);
	public DoDestroy = new Function;

	public OnSubDestroyCallback = new Dictionary([]);

	private UpdateRegisterId:number;

	public constructor(name: string) 
	{
		this._name = name;
		this.UpdateRegisterId = EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.Update);
	}

	public abstract Initialize(): void
	public abstract GetUIName(): string
	public abstract OnUndo(): boolean
	public abstract UnRegisterEvent(): void
	public abstract Update(): void

	public GetMaskDepth(): number
	{
		return this.Depth - 1;
	}

	public Show()
	{
		if (this.View)
		{
			this.View.visible = true;
		}
	}

	public Hide()
	{
		if (this.View)
		{
			this.View.visible = false;
		}
	}

	public OnSubWindowDestroy()
	{
		if(this.OnSubDestroyCallback)
		{
			for(let c of this.OnSubDestroyCallback.keys())
			{
				if(c)
				{
					c.apply(this.OnSubDestroyCallback[c]);
				}
			}
		}
	}

	public OnClose()
	{
		if (this.View)
		{
			for (let c of this.OnCloseCallback.keys())
            {
                if(c)
				{
					c.apply(this.OnCloseCallback[c]);
				}
            }
		}

		if (this.WindowType == WindowType.NormalPanel)
        {
            // AudioClip audio = AssetBundleTool.Instance.GetBundleAsset("Assets/Data/Common/Music/All_Back.mp3") as AudioClip;
            // GameSoundManager.Instance.PlaySoundSE(audio);
        }

		// destroy object
		this.OnDestroy();
	}

	public OnDestroy()
	{
		for (let c of this.OnDestroyCallback.keys())
		{
			if(c)
			{
				c.apply(this.OnDestroyCallback[c]);
			}
		}

        this.UnRegisterEvent();

		EventManager.Instance.UnregisterEventListener(this.UpdateRegisterId);

		if (this.UIRoot.getChildIndex(this.View) > -1)
		{
			this.UIRoot.removeChild(this.View);		
			delete this.View;
			this.View = null;
		}
		
		if (this.DoDestroy)
		{
			this.DoDestroy();
		}
		// MRelease.ClearAllObjectPoint(this);
		// Resources.UnloadUnusedAssets();
	}
}

interface IWindowParam
{
    //object; 
    SetDepth(depth: number);
}