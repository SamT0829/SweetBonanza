class XianBuyBonusView {

    public View: fairygui.GObject;

    protected CostText: fairygui.GTextField;

    protected OKButton: FairyExButton;
    protected NOButton: FairyExButton;

    protected NormalModeTrans: fairygui.Transition;
    protected AutoModeTrans: fairygui.Transition;
    protected SuccessModeTrans: fairygui.Transition;

    protected CallbackFunc: (buy: boolean) => void;
    protected CallbackThis: any;

    protected CostNotEnough: boolean = false;
    protected Cost: number = 0;

    protected FreeSpin_Buy_Money: fairygui.GTextField = null;

    public ResName: string = "";

    public constructor(pkgName: string, resName: string) {
        this.View = fairygui.UIPackage.createObject(pkgName, resName);
        fairygui.GRoot.inst.addChild(this.View);
        this.ResName = resName;
        this.Init();
    }


    protected Init() {
        this.SetLoaderURL();
        this.OKButton = new FairyExButton(this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asButton);
        this.OKButton.addClickListener(this.OnOK, this);

        this.NOButton = new FairyExButton(this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asButton);
        this.NOButton.addClickListener(this.OnNO, this);

        this.FreeSpin_Buy_Money = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("money").asTextField;
        this.View.visible = false;
    }

    public SetLoaderURL() {
        if (this.ResName == "freespin_buy") {
            let titlefg: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("titlefg").asLoader;
            titlefg.url = getFairyUIURL(SelfData.Instance.MainPackageName, "titlefg_");
            let buyinfo: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("buyinfo").asLoader;
            buyinfo.url = getFairyUIURL(SelfData.Instance.MainPackageName, "buyinfo_");

            if (this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel01") != null) {
                let Btn_cancel01: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel01").asLoader;
                Btn_cancel01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel01_");
                let Btn_cancel02: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel02").asLoader;
                Btn_cancel02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel02_");
                let Btn_cancel02_over: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("over").asLoader;
                Btn_cancel02_over.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel02_");
            }

            let Btn_startGreen01: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("Btn_startGreen01").asLoader;
            Btn_startGreen01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
            let Btn_startGreen02: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("Btn_startGreen02").asLoader;
            Btn_startGreen02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
            let Btn_startGreen02_over: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("over").asLoader;
            Btn_startGreen02_over.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");

            if (this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add") != null) {
                let Btn_startGreen01_add: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("Btn_startGreen01").asLoader;
                Btn_startGreen01_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
                let Btn_startGreen02_add: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("Btn_startGreen02").asLoader;
                Btn_startGreen02_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
                let Btn_startGreen02_over_add: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("over").asLoader;
                Btn_startGreen02_over_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
            }
        }
        // else if (this.ResName == "freespin_buy_NB") {
        //     let titlefg: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("titlefg").asLoader;
        //     titlefg.url = getFairyUIURL(SelfData.Instance.MainPackageName, "titlefg_");
        //     let buyinfo: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("buyinfo").asLoader;
        //     buyinfo.url = getFairyUIURL(SelfData.Instance.MainPackageName, "buyinfo_NB_");

        //     let Btn_startGreen01: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("Btn_startGreen01").asLoader;
        //     Btn_startGreen01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
        //     let Btn_startGreen02: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("Btn_startGreen02").asLoader;
        //     Btn_startGreen02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
        //     let Btn_startGreen02_over: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("over").asLoader;
        //     Btn_startGreen02_over.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");

        //     if (this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add") != null) {
        //         let Btn_startGreen01_add: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("Btn_startGreen01").asLoader;
        //         Btn_startGreen01_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
        //         let Btn_startGreen02_add: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("Btn_startGreen02").asLoader;
        //         Btn_startGreen02_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
        //         let Btn_startGreen02_over_add: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("over").asLoader;
        //         Btn_startGreen02_over_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
        //     }
        // }
        else if (this.ResName == "freespin_buyDaily") {
            let titlefg: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("titlefg").asLoader;
            titlefg.url = getFairyUIURL(SelfData.Instance.MainPackageName, "titlefg_");
            let buyinfo: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("buyinfo").asLoader;
            buyinfo.url = getFairyUIURL(SelfData.Instance.MainPackageName, "buyinfo_");
            let limited: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("limited").asLoader;
            limited.url = getFairyUIURL(SelfData.Instance.MainPackageName, "limited_");
            let dailybet: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("dailybet").asLoader;
            dailybet.url = getFairyUIURL(SelfData.Instance.MainPackageName, "dailybet_");
            let betText: fairygui.GTextField = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("bet").asTextField;
            betText.text = (0.27 * SelfData.Instance.AccountData.CurrencyData.Scale).toString();
            updateFontSize(betText, 22, 118);

            if (this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel01") != null) {
                let Btn_cancel01: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel01").asLoader;
                Btn_cancel01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel01_");
                let Btn_cancel02: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel02").asLoader;
                Btn_cancel02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel02_");
                let Btn_cancel02_over: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("over").asLoader;
                Btn_cancel02_over.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel02_");
            }

            let Btn_startGreen01: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("Btn_startGreen01").asLoader;
            Btn_startGreen01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
            let Btn_startGreen02: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("Btn_startGreen02").asLoader;
            Btn_startGreen02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
            let Btn_startGreen02_over: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("over").asLoader;
            Btn_startGreen02_over.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");

            if (this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add") != null) {
                let Btn_startGreen01_add: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("Btn_startGreen01").asLoader;
                Btn_startGreen01_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
                let Btn_startGreen02_add: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("Btn_startGreen02").asLoader;
                Btn_startGreen02_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
                let Btn_startGreen02_over_add: fairygui.GLoader = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("over").asLoader;
                Btn_startGreen02_over_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
            }
        }
    }

    public Show(costNotEnough: boolean, Cost: number, func: (buy: boolean) => void, ThisObj: any) {
        this.OKButton.enabled = true;
        this.NOButton.enabled = true;
        this.FreeSpin_Buy_Money.text = toCoinToString_CurrencyBet(Cost);
        updateFontSize(this.FreeSpin_Buy_Money, 32, 356);
        this.CostNotEnough = costNotEnough;
        this.Cost = Cost;

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
        //DisTeaOneModel.Instance.IsDailyBuy = false;
    }

    protected async ProcessCostNotEnough() {
        let wait = true;
        RefreshBalanceController.Instance.RefreshBalanceTip = new RefreshBalanceTips();
        RefreshBalanceController.Instance.RefreshBalanceTip.ShowTip(() => {
            RefreshBalanceController.Instance.RefreshBalanceTip.ButtonEnable = false;
            RefreshBalanceController.Instance.NoMoneySyncMWSingleGetBalance = true;
            RefreshBalanceController.Instance.SendMWSingleGetBalanceRequest();
            wait = false;
        }, this);
        while (wait) await waitForSeconds(0.01);
        while (RefreshBalanceController.Instance.WaitMWSingleGetBalance) await waitForSeconds(0.01);
        this.CostNotEnough = SelfData.Instance.AccountData.Money < this.Cost;
        this.OnNO();
    }

    public async ShowSuccess(time: number) {
        this.View.visible = true;
        //this.SuccessModeTrans.play();
        await waitForSeconds(time);
        this.View.visible = false;
    }

    protected async OnOK() {
        this.OKButton.enabled = false;
        this.NOButton.enabled = false;
        if (this.CostNotEnough) {
            await this.ProcessCostNotEnough();
        }
        else {
            this.CallbackFunc.apply(this.CallbackThis, [true]);
        }
        // DisTeaOneModel.Instance.StopRunByBuyBonus = false;
    }

    protected OnNO() {
        this.OKButton.enabled = false;
        this.NOButton.enabled = false;
        this.CallbackFunc.apply(this.CallbackThis, [false]);
        this.Hide();
        // DisTeaOneModel.Instance.StopRunByBuyBonus = false;
    }
}