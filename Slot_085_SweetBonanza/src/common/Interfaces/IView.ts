abstract class IView {
    protected View: fairygui.GObject;
    protected UpdateRegisterId: number = 0;

    /**
     * @param uiRoot 上層UI
     * @param regUpdate 是否註冊Update函式, 有註冊請override Update()使用, default = false
     */
    public constructor(uiRoot: fairygui.GObject, regUpdate: boolean = false) {
        this.View = uiRoot.asCom.getChild(this.GetResName());
        this.Initialize();

        if (regUpdate) {
            this.UpdateRegisterId = EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.Update);
        }
    }

    protected abstract GetResName(): string;
    protected abstract Initialize();
    protected Update() {

    }

    public set Visible(val: boolean) { this.View.visible = val; }
    public get Visible(): boolean { return this.View.visible; }

    public OnDestroy() {
        EventManager.Instance.UnregisterEventListener(this.UpdateRegisterId);
    }
}