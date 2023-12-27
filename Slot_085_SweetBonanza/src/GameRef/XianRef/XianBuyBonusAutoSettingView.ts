class XianBuyBonusAutoSettingView {

    public View: fairygui.GObject;

    protected CostText: fairygui.GTextField;

    protected OKButton: FairyExButton;
    protected NOButton: FairyExButton;

    protected NormalModeTrans: fairygui.Transition;
    protected AutoModeTrans: fairygui.Transition;
    protected SuccessModeTrans: fairygui.Transition;

    protected CallbackFunc: (buy: boolean, stopcost: number) => void;
    protected CallbackThis: any;

    protected Slider: fairygui.GSlider;
    protected Cost: number = 0;

    protected FreeSpin_Buy_Money: fairygui.GTextField = null;

    public constructor(pkgName: string, resName: string) {
        this.View = fairygui.UIPackage.createObject(pkgName, resName);
        fairygui.GRoot.inst.addChild(this.View);
        this.Init();
    }


    protected Init() {
        let MainCom = this.View.asCom.getChild("FreeSpin_Buy").asCom;
       
        this.OKButton = new FairyExButton(MainCom.getChild("btn_start").asButton);
        this.NOButton = new FairyExButton(MainCom.getChild("btn_cancel").asButton);
        let Point20Btn = new FairyExButton(MainCom.getChild("20Btn").asButton).addClickListener(()=>{this.onPoint(20);},this);
        let Point40Btn = new FairyExButton(MainCom.getChild("40Btn").asButton).addClickListener(()=>{this.onPoint(40);},this);
        let Point60Btn = new FairyExButton(MainCom.getChild("60Btn").asButton).addClickListener(()=>{this.onPoint(60);},this);
        let Point80Btn = new FairyExButton(MainCom.getChild("80Btn").asButton).addClickListener(()=>{this.onPoint(80);},this);

        this.OKButton.addClickListener(this.OnOK, this);

        this.NOButton.addClickListener(this.OnNO, this);
        this.FreeSpin_Buy_Money = MainCom.getChild("money").asTextField;
        this.View.visible = false;
        this.Slider = MainCom.getChild("slider").asSlider;
        this.Slider.max = 99;
        this.Slider.value = 60;
        this.Slider.addEventListener(fairygui.StateChangeEvent.CHANGED, this.onSlideChange, this);
        this.SetLoaderURL(MainCom);
    }

    public SetLoaderURL(obj: fairygui.GObject){
        let autoinfo01: fairygui.GLoader = obj.asCom.getChild("autoinfo01").asLoader;
        autoinfo01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "autoinfo01_");
        let autoinfo02: fairygui.GLoader = obj.asCom.getChild("autoinfo02").asLoader;
        autoinfo02.setScale(0.8, 0.8);
        autoinfo02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "autoinfo02_");

        let Btn_cancel01: fairygui.GLoader = obj.asCom.getChild("btn_cancel").asCom.getChild("Btn_cancel01").asLoader;
        Btn_cancel01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel01_");
        let Btn_cancel02: fairygui.GLoader = obj.asCom.getChild("btn_cancel").asCom.getChild("Btn_cancel02").asLoader;
        Btn_cancel02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel02_");
        let Btn_cancel02_over: fairygui.GLoader = obj.asCom.getChild("btn_cancel").asCom.getChild("over").asLoader;
        Btn_cancel02_over.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel02_");

        let Btn_startGreen01: fairygui.GLoader = obj.asCom.getChild("btn_start").asCom.getChild("Btn_startGreen01").asLoader;
        Btn_startGreen01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
        let Btn_startGreen02: fairygui.GLoader = obj.asCom.getChild("btn_start").asCom.getChild("Btn_startGreen02").asLoader;
        Btn_startGreen02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
        let Btn_startGreen02_over: fairygui.GLoader = obj.asCom.getChild("btn_start").asCom.getChild("over").asLoader;
        Btn_startGreen02_over.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");

        let Btn_startGreen01_add: fairygui.GLoader = obj.asCom.getChild("btn_start_Add").asCom.getChild("Btn_startGreen01").asLoader;
        Btn_startGreen01_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
        let Btn_startGreen02_add: fairygui.GLoader = obj.asCom.getChild("btn_start_Add").asCom.getChild("Btn_startGreen02").asLoader;
        Btn_startGreen02_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
        let Btn_startGreen02_over_add: fairygui.GLoader = obj.asCom.getChild("btn_start_Add").asCom.getChild("over").asLoader;
        Btn_startGreen02_over_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");

    }

    public Show(func: (buy: boolean, stopcost: number) => void, ThisObj: any) {
        this.changeNum();

        this.View.visible = true;
        this.View.asCom.getTransition("t0").play();

        //this.CostText.visible = true;
        //this.CostText.text = toCoinToString(Cost);

        //if (isCD) this.AutoModeTrans.play();
        //else this.NormalModeTrans.play();

        this.CallbackFunc = func;
        this.CallbackThis = ThisObj;
    }

    public Hide() {
        this.View.visible = false;
    }

    public async ShowSuccess(time: number) {
        this.View.visible = true;
        //this.SuccessModeTrans.play();
        await waitForSeconds(time);
        this.View.visible = false;
    }

    protected async OnOK() {
        this.CallbackFunc.apply(this.CallbackThis, [true, this.Slider.value]);
        this.Hide();
    }

    protected OnNO() {
        this.CallbackFunc.apply(this.CallbackThis, [false, 0]);
        this.Hide();
    }

    protected onSlideChange() {
        this.changeNum();
    }

    protected changeNum() {
        if (SelfData.Instance.PlaySetting.TotleBet % 100 > 0) {
            this.Cost = this.Slider.value * SelfData.Instance.PlaySetting.TotleBet;
            this.FreeSpin_Buy_Money.text = toCoinToString(SelfData.Instance.PlaySetting.TotleBet) + "x" + this.Slider.value + "=" + toCoinToString(this.Cost);
        }
        else {
            this.Cost = this.Slider.value * SelfData.Instance.PlaySetting.TotleBet;
            this.FreeSpin_Buy_Money.text = (SelfData.Instance.PlaySetting.TotleBet / 100).toFixed(0) + "x" + this.Slider.value + "=" + (this.Cost / 100).toFixed(0);
        }
        updateFontSize(this.FreeSpin_Buy_Money, 32, 640);
    }

    protected onPoint(point: number) {
        this.Slider.value = point;
        this.changeNum();
    }
}