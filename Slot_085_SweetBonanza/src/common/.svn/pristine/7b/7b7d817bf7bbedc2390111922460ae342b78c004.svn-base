class MessageTips {
    public InputMsg: fairygui.GTextField = null;

    private OKButton: FairyExButton = null;
    private CancelButton: FairyExButton = null;
    private OKButton_txt: fairygui.GTextField = null;
    private CancelButton_txt: fairygui.GTextField = null;
    private Info_txt: fairygui.GTextField = null;
    private CD_txt: fairygui.GTextField = null;
    private TipObj: fairygui.GObject = null;
    private parent: fairygui.GComponent = null;
    private msg_txt: fairygui.GTextField = null;

    public CreateTips(parent?: fairygui.GComponent, resname: string = "tip"): fairygui.GObject {
        if (SelfData.Instance.WindowSwitch) {
            EventManager.Instance.RegisterEventListener(StageResizeEvent, this, this.onResize);
        }
        this.TipObj = fairygui.UIPackage.createObject(SelfData.Instance.CommonPackageName, resname);
        if (parent != null) {
            this.parent = parent;
            this.parent.addChild(this.TipObj);
        }
        else
            fairygui.GRoot.inst.addChild(this.TipObj);
        this.TipObj.sortingOrder = ZOrder.eTip;
        this.msg_txt = this.TipObj.asCom.getChild("msg_txt").asTextField;
        this.msg_txt.visible = false;
        let transName = "";
        if (SelfData.Instance.WindowSwitch) {
            if (window.innerWidth >= window.innerHeight) {
                transName = "W";
            }
            else {
                transName = "V";
            }
            if (this.TipObj != null) {
                this.TipObj.asCom.getTransition(transName).play();
            }
        }
        return this.TipObj;
    }

    public CreateTips_MWUI(parent?: fairygui.GComponent, resname: string = "tip"): fairygui.GObject {
        if (SelfData.Instance.WindowSwitch) {
            EventManager.Instance.RegisterEventListener(StageResizeEvent, this, this.onResize);
        }
        this.TipObj = fairygui.UIPackage.createObject("Slot_000_LobbyLoader", resname);
        if (parent != null) {
            this.parent = parent;
            this.parent.addChild(this.TipObj);
        }
        else
            fairygui.GRoot.inst.addChild(this.TipObj);
        this.TipObj.sortingOrder = ZOrder.eTip;
        this.msg_txt = this.TipObj.asCom.getChild("msg_txt").asTextField;
        this.msg_txt.visible = false;
        let transName = "";
        if (SelfData.Instance.WindowSwitch) {
            if (window.innerWidth >= window.innerHeight) {
                transName = "W";
            }
            else {
                transName = "V";
            }
            if (this.TipObj != null) {
                this.TipObj.asCom.getTransition(transName).play();
            }
        }
        return this.TipObj;
    }

    public ShowTips(buttontext: string, infotext: string, callback?: Function, callbackobj?: any) {
        this.OKButton = new FairyExButton(this.TipObj.asCom.getChild("button").asButton);
        this.OKButton.visible = true;
        if (callback)
            this.OKButton.addClickListener(callback, callbackobj);
        if (buttontext != "") {
            this.OKButton.addClickListener(this.OnTipButtonClick, this);
            this.OKButton_txt = this.OKButton.asCom.getChild("Canecelbutton_txt").asTextField;
            this.OKButton_txt.visible = true;
            this.OKButton_txt.text = buttontext;
            updateFontSize(this.OKButton_txt, 25, 145);
        }
        else
            this.OKButton.visible = false;
        this.Info_txt = this.TipObj.asCom.getChild("info_txt").asTextField;
        this.Info_txt.text = infotext;
        //updateFontSize(this.Info_txt, 21, 296);

        this.CD_txt = this.TipObj.asCom.getChild("cd_txt").asTextField;
        this.CD_txt.text = "";
    }

    public OKButtonEnabled(val: boolean) {
        if (this.OKButton != null) this.OKButton.enabled = val;
    }

    public ShowDialog(OKbuttontext: string, Cancelbuttontext: string, infotext: string, OKcallback?: Function, OKcallbackobj?: any, Cancelcallback?: Function, Cancelcallbackobj?: any) {
        this.OKButton = new FairyExButton(this.TipObj.asCom.getChild("OKbutton").asButton);
        this.OKButton.visible = true;
        if (OKcallback)
            this.OKButton.addClickListener(OKcallback, OKcallbackobj);
        if (OKbuttontext != "") {
            this.OKButton.addClickListener(this.OnTipButtonClick, this);
            this.OKButton_txt = this.OKButton.asCom.getChild("OKbutton_txt").asTextField;
            this.OKButton_txt.visible = true;
            this.OKButton_txt.text = OKbuttontext;
            updateFontSize(this.OKButton_txt, 25, 145);
        }
        else
            this.OKButton.visible = false;

        this.CancelButton = new FairyExButton(this.TipObj.asCom.getChild("Canecelbutton").asButton);
        this.CancelButton.visible = true;
        if (Cancelcallback)
            this.CancelButton.addClickListener(Cancelcallback, Cancelcallbackobj);
        if (Cancelbuttontext != "") {
            this.CancelButton.addClickListener(this.OnTipButtonClick, this);
            this.CancelButton_txt = this.CancelButton.asCom.getChild("Canecelbutton_txt").asTextField;
            this.CancelButton_txt.visible = true;
            this.CancelButton_txt.text = Cancelbuttontext;
            updateFontSize(this.CancelButton_txt, 25, 145);
        }
        else
            this.CancelButton.visible = false;
        this.Info_txt = this.TipObj.asCom.getChild("info_txt").asTextField;
        this.Info_txt.text = infotext;

        this.CD_txt = this.TipObj.asCom.getChild("cd_txt").asTextField;
        this.CD_txt.text = "";
    }

    public ShowInputTip(buttontext: string, infotext: string, callback?: Function, callbackobj?: any) {

        let objcom = this.TipObj.asCom;

        this.OKButton = new FairyExButton(objcom.getChild("button").asButton);
        this.OKButton.visible = true;
        if (callback)
            this.OKButton.addClickListener(callback, callbackobj);
        if (buttontext != "") {
            this.OKButton.addClickListener(this.OnTipButtonClick, this);
            this.OKButton_txt = this.OKButton.asCom.getChild("OKbutton_txt").asTextField;
            this.OKButton_txt.visible = true;
            this.OKButton_txt.text = buttontext;
            //updateFontSize(this.OKButton_txt, 25, 145);
        }
        else
            this.OKButton.visible = false;
        this.Info_txt = objcom.getChild("info_txt").asTextField;
        this.Info_txt.text = infotext;

        this.InputMsg = objcom.getChild("input").asTextField;

        this.CD_txt = objcom.getChild("cd_txt").asTextField;
        this.CD_txt.text = "";
    }

    public SetContent(infotext: string, fontSize: number = null) {
        this.Info_txt.text = infotext;
        if (fontSize != null)
            this.Info_txt.fontSize = fontSize;
    }

    public SetCD(cd: number) {
        this.CD_txt.text = cd.toString();
    }

    public NoCD() {
        this.CD_txt.text = "";
    }

    private OnTipButtonClick() {
        if (this.parent != null)
            this.parent.removeChild(this.TipObj);
        else
            fairygui.GRoot.inst.removeChild(this.TipObj);
        delete this.TipObj;
        this.TipObj = null;
    }

    public CloseTip() {
        if (this.parent != null)
            this.parent.removeChild(this.TipObj);
        else
            fairygui.GRoot.inst.removeChild(this.TipObj);
        delete this.TipObj;
        this.TipObj = null;
    }

    public onResize(event: StageResizeEvent): void {
        if (SelfData.Instance.WindowSwitch) {
            let transName = "";
            if (window.innerWidth >= window.innerHeight) {
                transName = "W";
            }
            else {
                transName = "V";
            }
            if (this.TipObj != null) {
                if(this.TipObj.asCom.getTransition(transName) != null)
                    this.TipObj.asCom.getTransition(transName).play();
            }
            if (this.parent != null) {
                if(this.parent.asCom.getTransition(transName) != null)
                    this.parent.asCom.getTransition(transName).play();            
            }
        }
    }
}