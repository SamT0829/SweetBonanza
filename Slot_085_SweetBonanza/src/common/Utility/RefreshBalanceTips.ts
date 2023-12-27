class RefreshBalanceTips {
    public static LastShowTime: number = 0;
    public static cdLimit: number = 20;
    public View: fairygui.GObject;

    private info_txt: fairygui.GTextField;
    private button: fairygui.GButton;
    private button_gray: fairygui.GObject;
    public set ButtonEnable(v: boolean) {
        this.button.enabled = v;
    }
    private button_txt: fairygui.GTextField;
    public set ButtonText(v: string) {
        this.button_txt.text = v;
    }

    private parent: fairygui.GComponent = null;

    private button_string: string = "";
    private info_string: string = "";

    private updateRegisterId: number = -1;

    private cdTime: number = 20;
    private lastUpdateTime: number = 0;

    public constructor(parent?: fairygui.GComponent, resname: string = "balance") {
        this.View = fairygui.UIPackage.createObject(SelfData.Instance.CommonPackageName, resname);
        if (parent != null) {
            this.parent = parent;
            parent.addChild(this.View);
        }
        else
            fairygui.GRoot.inst.addChild(this.View);
        this.View.sortingOrder = ZOrder.eTip;
        this.init();
    }

    private init() {
        if (SelfData.Instance.WindowSwitch) {
            EventManager.Instance.RegisterEventListener(StageResizeEvent, this, this.onResize);
        }

        this.button_string = LocalizationCommonTable.Get(1014);
        this.info_string = LocalizationCommonTable.Get(1013);
        this.info_txt = this.View.asCom.getChild("info_txt").asTextField;
        this.info_txt.text = this.info_string;
        this.button = this.View.asCom.getChild("button").asButton;
        this.button_gray = this.View.asCom.getChild("button_gray");
        this.button_gray.visible = false;
        this.button_txt = this.button.asCom.getChild("button_txt").asTextField;
        this.button_txt.text = this.button_string;
        updateFontSize(this.button_txt, 25, 126);
        this.View.visible = false;
        let transName = "";
        if (SelfData.Instance.WindowSwitch) {
            if (window.innerWidth >= window.innerHeight) {
                transName = "t0";
            }
            else {
                transName = "t1";
            }
            if (this.View != null) {
                this.View.asCom.getTransition(transName).play();
            }
        }
    }

    public ShowTip(callback: Function, callbackObj: any) {
        this.button.addClickListener(callback, callbackObj);

        let curTime: number = new Date().getTime();
        let deltaTime: number = curTime - RefreshBalanceTips.LastShowTime;
        if (deltaTime < RefreshBalanceTips.cdLimit * 1000) {
            this.cdTime = RefreshBalanceTips.cdLimit * 1000 - deltaTime;
            this.ButtonEnable = false;
            this.button_txt.text = this.button_string + "(" + Math.floor(this.cdTime) + ")";
            this.updateRegisterId = EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.Update);
            this.lastUpdateTime = new Date().getTime();
        }
        else {
            this.ButtonEnable = true;
            this.button_txt.text = this.button_string;
        }
        updateFontSize(this.button_txt, 25, 126);
        this.View.visible = true;
    }

    public ShowTip_CBET(callback: Function, callbackObj: any) {
        this.button_string = LocalizationCommonTable.Get(10000025);
        this.button_txt.text = this.button_string;
        updateFontSize(this.button_txt, 25, 126);
        this.button.addClickListener(callback, callbackObj);
        this.View.visible = true;
    }

    private Update() {
        if (this.button.enabled) {
            EventManager.Instance.UnregisterEventListener(this.updateRegisterId);
            this.updateRegisterId = -1;
            return;
        }
        let curTime: number = new Date().getTime();
        let deltaTime: number = curTime - this.lastUpdateTime;
        this.cdTime -= deltaTime;
        this.lastUpdateTime = curTime;
        this.button_txt.text = this.button_string + "(" + Math.floor(this.cdTime / 1000) + ")";
        if (this.cdTime <= 0) {
            this.cdTime = 0;
            this.button_txt.text = this.button_string;
            this.ButtonEnable = true;
        }
        updateFontSize(this.button_txt, 25, 126);

    }

    public CloseTip() {
        RefreshBalanceTips.LastShowTime = new Date().getTime();

        if (this.updateRegisterId > 0) {
            EventManager.Instance.UnregisterEventListener(this.updateRegisterId);
            this.updateRegisterId = -1;
        }

        delete this.info_txt;
        this.info_txt = null;

        delete this.button;
        this.button = null;

        delete this.button_gray;
        this.button_gray = null;

        delete this.button_txt;
        this.button_txt = null;

        if (this.parent != null)
            this.parent.removeChild(this.View);
        else
            fairygui.GRoot.inst.removeChild(this.View);

        delete this.View;
        this.View = null;
    }
    public onResize(event: StageResizeEvent): void {
        if (SelfData.Instance.WindowSwitch) {
            let transName = "";
            if (window.innerWidth >= window.innerHeight) {
                transName = "t0";
            }
            else {
                transName = "t1";
            }
            if (this.View != null) {
                this.View.asCom.getTransition(transName).play();
            }
        }
    }
}