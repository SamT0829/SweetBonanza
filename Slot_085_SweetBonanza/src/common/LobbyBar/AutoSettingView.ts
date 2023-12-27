enum AutoRunAdvType {
    SingleWinType,
    CreditUpperLimit,
    CreditLowerLimit,
}

class AutoSettingView extends IView {
    protected Setting: AutoPlaySetting;

    protected FastTitleText: fairygui.GTextField;
    protected AutoTitleText: fairygui.GTextField;
    protected AdvTitleText: fairygui.GTextField;

    protected FastX1Button: FairyExButton;
    protected FastX2Button: FairyExButton;
    public FastX3Button: FairyExButton;

    protected FastX1ButtonGray: FairyExButton;
    protected FastX2ButtonGray: FairyExButton;
    public FastX3ButtonGray: FairyExButton;

    protected Auto30Button: FairyExButton;
    protected Auto50Button: FairyExButton;
    protected Auto100Button: FairyExButton;
    protected AutoUnlimitButton: FairyExButton;

    protected Auto30ButtonGray: FairyExButton;
    protected Auto50ButtonGray: FairyExButton;
    protected Auto100ButtonGray: FairyExButton;
    protected AutoUnlimitButtonGray: FairyExButton;

    protected UntilBonusButton: FairyExButton;
    protected SingleWinButton: FairyExButton;
    protected CreditUpperLimitButton: FairyExButton;
    protected CreditLowerLimitButton: FairyExButton;

    protected UntilBonusButtonGray: FairyExButton;
    protected SingleWinButtonGray: FairyExButton;
    protected CreditUpperLimitButtonGray: FairyExButton;
    protected CreditLowerLimitButtonGray: FairyExButton;

    protected SingleWinNumber1: fairygui.GTextField;
    protected SingleWinNumber2: fairygui.GTextField;
    protected SingleWinNumber3: fairygui.GTextField;
    protected SingleWinNumber4: fairygui.GTextField;
    protected CreditUpperLimitNumber1: fairygui.GTextField;
    protected CreditUpperLimitNumber2: fairygui.GTextField;
    protected CreditUpperLimitNumber3: fairygui.GTextField;
    protected CreditUpperLimitNumber4: fairygui.GTextField;
    protected CreditLowerLimitNumber1: fairygui.GTextField;
    protected CreditLowerLimitNumber2: fairygui.GTextField;
    protected CreditLowerLimitNumber3: fairygui.GTextField;
    protected CreditLowerLimitNumber4: fairygui.GTextField;

    protected OKButton: FairyExButton;
    protected CancelButton: FairyExButton;
    protected XButton: fairygui.GButton;

    protected CalculationView: CalculationView;

    protected OKCallback: Function;
    protected CancelCallback: Function;
    protected CallbackThis: any;

    protected GetResName(): string { return "AutoPanel"; }
    protected Initialize() {
        this.Setting = new AutoPlaySetting();
        this.Setting.TotalRound = -1;

        this.FastTitleText = this.View.asCom.getChild("FastTitleText").asTextField;
        this.AutoTitleText = this.View.asCom.getChild("AutoTitleText").asTextField;
        this.AdvTitleText = this.View.asCom.getChild("AdvTitleText").asTextField;

        if (this.FastTitleText != null)
            this.FastTitleText.text = LocalizationCommonTable.Get(10000008);
        if (this.AutoTitleText != null)
            this.AutoTitleText.text = LocalizationCommonTable.Get(10000009);
        if (this.AdvTitleText != null)
            this.AdvTitleText.text = LocalizationCommonTable.Get(10000010);


        this.FastX1Button = new FairyExButton(this.View.asCom.getChild("FastX1Button").asButton);
        //this.FastX1Button.addClickListener(() => this.OnFastRadioClick(this.FastX1Button), this);
        this.FastX1Button.visible = false;

        this.FastX1ButtonGray = new FairyExButton(this.View.asCom.getChild("FastX1Button_gray").asButton);
        this.FastX1ButtonGray.addClickListener(() => this.OnFastRadioClick(this.FastX1ButtonGray), this);
        this.FastX1ButtonGray.visible = false;

        this.FastX2Button = new FairyExButton(this.View.asCom.getChild("FastX2Button").asButton);
        //this.FastX2Button.addClickListener(() => this.OnFastRadioClick(this.FastX2Button), this);
        this.FastX2Button.visible = false;

        this.FastX2ButtonGray = new FairyExButton(this.View.asCom.getChild("FastX2Button_gray").asButton);
        this.FastX2ButtonGray.addClickListener(() => this.OnFastRadioClick(this.FastX2ButtonGray), this);
        this.FastX2ButtonGray.visible = false;

        this.FastX3Button = new FairyExButton(this.View.asCom.getChild("FastX3Button").asButton);
        //this.FastX3Button.addClickListener(() => this.OnFastRadioClick(this.FastX3Button), this);
        this.FastX3Button.visible = false;

        this.FastX3ButtonGray = new FairyExButton(this.View.asCom.getChild("FastX3Button_gray").asButton);
        this.FastX3ButtonGray.addClickListener(() => this.OnFastRadioClick(this.FastX3ButtonGray), this);
        this.FastX3ButtonGray.visible = false;

        this.Auto30Button = new FairyExButton(this.View.asCom.getChild("Auto30Button").asButton);
        this.Auto30Button.addClickListener(() => this.OnAutoRunRadioClick(null), this);
        this.Auto30Button.visible = false;

        this.Auto30ButtonGray = new FairyExButton(this.View.asCom.getChild("Auto30Button_gray").asButton);
        this.Auto30ButtonGray.addClickListener(() => this.OnAutoRunRadioClick(this.Auto30ButtonGray), this);
        this.Auto30ButtonGray.visible = false;

        this.Auto50Button = new FairyExButton(this.View.asCom.getChild("Auto50Button").asButton);
        this.Auto50Button.addClickListener(() => this.OnAutoRunRadioClick(null), this);
        this.Auto50Button.visible = false;

        this.Auto50ButtonGray = new FairyExButton(this.View.asCom.getChild("Auto50Button_gray").asButton);
        this.Auto50ButtonGray.addClickListener(() => this.OnAutoRunRadioClick(this.Auto50ButtonGray), this);
        this.Auto50ButtonGray.visible = false;

        this.Auto100Button = new FairyExButton(this.View.asCom.getChild("Auto100Button").asButton);
        this.Auto100Button.addClickListener(() => this.OnAutoRunRadioClick(null), this);
        this.Auto100Button.visible = false;

        this.Auto100ButtonGray = new FairyExButton(this.View.asCom.getChild("Auto100Button_gray").asButton);
        this.Auto100ButtonGray.addClickListener(() => this.OnAutoRunRadioClick(this.Auto100ButtonGray), this);
        this.Auto100ButtonGray.visible = false;

        this.AutoUnlimitButton = new FairyExButton(this.View.asCom.getChild("AutoUnlimitButton").asButton);
        this.AutoUnlimitButton.addClickListener(() => this.OnAutoRunRadioClick(null), this);
        this.AutoUnlimitButton.visible = false;

        this.AutoUnlimitButtonGray = new FairyExButton(this.View.asCom.getChild("AutoUnlimitButton_gray").asButton);
        this.AutoUnlimitButtonGray.addClickListener(() => this.OnAutoRunRadioClick(this.AutoUnlimitButtonGray), this);
        this.AutoUnlimitButtonGray.visible = false;

        this.UntilBonusButton = new FairyExButton(this.View.asCom.getChild("UntilBonusButton").asButton);
        this.UntilBonusButton.addClickListener(this.OnUntilBonus, this);
        this.UntilBonusButton.visible = false;

        this.UntilBonusButtonGray = new FairyExButton(this.View.asCom.getChild("UntilBonusButton_gray").asButton);
        this.UntilBonusButtonGray.addClickListener(this.OnUntilBonus, this);
        this.UntilBonusButtonGray.visible = false;

        this.SingleWinButton = new FairyExButton(this.View.asCom.getChild("SingleWinButton").asButton);
        this.SingleWinButton.addClickListener(() => this.OpenCalculationView(AutoRunAdvType.SingleWinType, this.SingleWinButton), this);
        this.SingleWinButton.visible = false;

        this.SingleWinButtonGray = new FairyExButton(this.View.asCom.getChild("SingleWinButton_gray").asButton);
        this.SingleWinButtonGray.addClickListener(() => this.OpenCalculationView(AutoRunAdvType.SingleWinType, this.SingleWinButtonGray), this);
        this.SingleWinButtonGray.visible = false;

        this.CreditUpperLimitButton = new FairyExButton(this.View.asCom.getChild("CreditUpperLimitButton").asButton);
        this.CreditUpperLimitButton.addClickListener(() => this.OpenCalculationView(AutoRunAdvType.CreditUpperLimit, this.CreditUpperLimitButton), this);
        this.CreditUpperLimitButton.visible = false;

        this.CreditUpperLimitButtonGray = new FairyExButton(this.View.asCom.getChild("CreditUpperLimitButton_gray").asButton);
        this.CreditUpperLimitButtonGray.addClickListener(() => this.OpenCalculationView(AutoRunAdvType.CreditUpperLimit, this.CreditUpperLimitButtonGray), this);
        this.CreditUpperLimitButtonGray.visible = false;

        this.CreditLowerLimitButton = new FairyExButton(this.View.asCom.getChild("CreditLowerLimitButton").asButton);
        this.CreditLowerLimitButton.addClickListener(() => this.OpenCalculationView(AutoRunAdvType.CreditLowerLimit, this.CreditLowerLimitButton), this);
        this.CreditLowerLimitButton.visible = false;

        this.CreditLowerLimitButtonGray = new FairyExButton(this.View.asCom.getChild("CreditLowerLimitButton_gray").asButton);
        this.CreditLowerLimitButtonGray.addClickListener(() => this.OpenCalculationView(AutoRunAdvType.CreditLowerLimit, this.CreditLowerLimitButtonGray), this);
        this.CreditLowerLimitButtonGray.visible = false;

        this.SingleWinNumber1 = this.SingleWinButton.asCom.getChild("number").asTextField;
        this.SingleWinNumber2 = this.SingleWinButton.asCom.getChild("number_down").asTextField;
        this.SingleWinNumber3 = this.SingleWinButtonGray.asCom.getChild("number").asTextField;
        this.SingleWinNumber4 = this.SingleWinButtonGray.asCom.getChild("number_down").asTextField;

        this.CreditUpperLimitNumber1 = this.CreditUpperLimitButton.asCom.getChild("number").asTextField;
        this.CreditUpperLimitNumber2 = this.CreditUpperLimitButton.asCom.getChild("number_down").asTextField;
        this.CreditUpperLimitNumber3 = this.CreditUpperLimitButtonGray.asCom.getChild("number").asTextField;
        this.CreditUpperLimitNumber4 = this.CreditUpperLimitButtonGray.asCom.getChild("number_down").asTextField;

        this.CreditLowerLimitNumber1 = this.CreditLowerLimitButton.asCom.getChild("number").asTextField;
        this.CreditLowerLimitNumber2 = this.CreditLowerLimitButton.asCom.getChild("number_down").asTextField;
        this.CreditLowerLimitNumber3 = this.CreditLowerLimitButtonGray.asCom.getChild("number").asTextField;
        this.CreditLowerLimitNumber4 = this.CreditLowerLimitButtonGray.asCom.getChild("number_down").asTextField;

        this.CalculationView = new CalculationView(this.View);
        this.CalculationView.Visible = false;

        this.OKButton = new FairyExButton(this.View.asCom.getChild("OKButton").asButton);
        this.OKButton.addClickListener(this.OnOKClick, this);

        this.CancelButton = new FairyExButton(this.View.asCom.getChild("CancelButton").asButton);
        this.CancelButton.addClickListener(this.OnCancelClick, this);

        this.XButton = this.View.asCom.getChild("XButton").asButton;
        this.XButton.addClickListener(this.OnCancelClick, this);
    }

    public OpenUI(okFunc: Function, cancelFunc: Function, funcThis: any) {
        this.OKCallback = okFunc;
        this.CancelCallback = cancelFunc;
        this.CallbackThis = funcThis;
        this.Reset();
        this.Visible = true;
    }

    protected Reset() {
        this.Setting = new AutoPlaySetting();
        this.Setting.IsFastX2 = SelfData.Instance.PlaySetting.IsFastX2;
        this.Setting.IsFastX3 = SelfData.Instance.PlaySetting.IsFastX3;

        this.FastX1Button.visible = !SelfData.Instance.PlaySetting.IsFastX2 && !SelfData.Instance.PlaySetting.IsFastX3;
        this.FastX2Button.visible = SelfData.Instance.PlaySetting.IsFastX2;
        this.FastX3Button.visible = SelfData.Instance.PlaySetting.IsFastX3;
        this.FastX1ButtonGray.visible = !this.FastX1Button.visible;
        this.FastX2ButtonGray.visible = !this.FastX2Button.visible;
        this.FastX3ButtonGray.visible = !this.FastX3Button.visible;
        this.OnAutoRunRadioClick(null);

        this.ClearAdvSetting();

        this.SetButtonNumber(AutoRunAdvType.SingleWinType, 0);
        this.SetButtonNumber(AutoRunAdvType.CreditUpperLimit, 0);
        this.SetButtonNumber(AutoRunAdvType.CreditLowerLimit, 0);
    }

    protected ClearAdvSetting() {
        this.Setting.IsUntilBonus = false;
        this.UntilBonusButton.visible = false;
        this.UntilBonusButtonGray.visible = true;

        this.Setting.CheckSingleWinMoney = false;
        this.SingleWinButton.visible = false;
        this.SingleWinButtonGray.visible = true;

        this.Setting.CheckUpperLimitMoney = false;
        this.CreditUpperLimitButton.visible = false;
        this.CreditUpperLimitButtonGray.visible = true;

        this.Setting.CheckLowerLimitMoney = false;
        this.CreditLowerLimitButton.visible = false;
        this.CreditLowerLimitButtonGray.visible = true;
    }

    protected OnFastRadioClick(button: FairyExButton) {
        this.FastX1Button.visible = button === this.FastX1ButtonGray;
        this.FastX2Button.visible = button === this.FastX2ButtonGray;
        this.FastX3Button.visible = button === this.FastX3ButtonGray;
        this.FastX1ButtonGray.visible = !this.FastX1Button.visible;
        this.FastX2ButtonGray.visible = !this.FastX2Button.visible;
        this.FastX3ButtonGray.visible = !this.FastX3Button.visible;
        this.Setting.IsFastX2 = this.FastX2Button.visible;
        this.Setting.IsFastX3 = this.FastX3Button.visible;
    }

    protected OnAutoRunRadioClick(button: FairyExButton) {
        this.Auto30Button.visible = button === this.Auto30ButtonGray;
        this.Auto50Button.visible = button === this.Auto50ButtonGray;
        this.Auto100Button.visible = button === this.Auto100ButtonGray;
        this.AutoUnlimitButton.visible = button === this.AutoUnlimitButtonGray;
        this.Auto30ButtonGray.visible = !this.Auto30Button.visible;
        this.Auto50ButtonGray.visible = !this.Auto50Button.visible;
        this.Auto100ButtonGray.visible = !this.Auto100Button.visible;
        this.AutoUnlimitButtonGray.visible = !this.AutoUnlimitButton.visible;
        this.Setting.IsUnlimitRound = false;
        if (this.Auto30Button.visible)
            this.Setting.TotalRound = 30;
        else if (this.Auto50Button.visible)
            this.Setting.TotalRound = 50;
        else if (this.Auto100Button.visible)
            this.Setting.TotalRound = 100;
        else if (this.AutoUnlimitButton.visible) {
            this.Setting.TotalRound = -1;
            this.Setting.IsUnlimitRound = true;
        }
        else {
            //取消自動玩
            this.Setting.TotalRound = 0;
            this.ClearAdvSetting();
        }
    }

    protected OnUntilBonus() {
        this.UntilBonusButton.visible = !this.UntilBonusButton.visible;
        this.UntilBonusButtonGray.visible = !this.UntilBonusButton.visible;
        this.Setting.IsUntilBonus = this.UntilBonusButton.visible;
        if (this.Setting.IsUntilBonus)
            this.CheckAutoRunButton();
    }

    protected SetButtonNumber(type: AutoRunAdvType, number: number) {
        if (type == AutoRunAdvType.SingleWinType) {
            this.SingleWinNumber1.text = number.toFixed(2);
            this.SingleWinNumber2.text = number.toFixed(2);
            this.SingleWinNumber3.text = number.toFixed(2);
            this.SingleWinNumber4.text = number.toFixed(2);
        }
        else if (type == AutoRunAdvType.CreditUpperLimit) {
            this.CreditUpperLimitNumber1.text = number.toFixed(2);
            this.CreditUpperLimitNumber2.text = number.toFixed(2);
            this.CreditUpperLimitNumber3.text = number.toFixed(2);
            this.CreditUpperLimitNumber4.text = number.toFixed(2);
        }
        else if (type == AutoRunAdvType.CreditLowerLimit) {
            this.CreditLowerLimitNumber1.text = number.toFixed(2);
            this.CreditLowerLimitNumber2.text = number.toFixed(2);
            this.CreditLowerLimitNumber3.text = number.toFixed(2);
            this.CreditLowerLimitNumber4.text = number.toFixed(2);
        }
    }

    protected OpenCalculationView(type: AutoRunAdvType, button: FairyExButton) {
        if (type == AutoRunAdvType.SingleWinType) {
            if (!this.SingleWinButton.visible)
                this.CalculationView.OpenUI(type, this.Setting.SingleWinMoney, this.OnCalculationOK, this.OnCalculationCancel, this);
            else {
                this.SingleWinButton.visible = !this.SingleWinButton.visible;
                this.SingleWinButtonGray.visible = !this.SingleWinButton.visible;
                this.Setting.CheckSingleWinMoney = false;
            }
        }
        else if (type == AutoRunAdvType.CreditUpperLimit) {
            if (!this.CreditUpperLimitButton.visible)
                this.CalculationView.OpenUI(type, this.Setting.UpperLimitMoney, this.OnCalculationOK, this.OnCalculationCancel, this);
            else {
                this.CreditUpperLimitButton.visible = !this.CreditUpperLimitButton.visible;
                this.CreditUpperLimitButtonGray.visible = !this.CreditUpperLimitButton.visible;
                this.Setting.CheckUpperLimitMoney = false;
            }
        }
        else if (type == AutoRunAdvType.CreditLowerLimit) {
            if (!this.CreditLowerLimitButton.visible)
                this.CalculationView.OpenUI(type, this.Setting.LowerLimitMoney, this.OnCalculationOK, this.OnCalculationCancel, this);
            else {
                this.CreditLowerLimitButton.visible = !this.CreditLowerLimitButton.visible;
                this.CreditLowerLimitButtonGray.visible = !this.CreditLowerLimitButton.visible;
                this.Setting.CheckLowerLimitMoney = false;
            }
        }
    }

    protected OnCalculationOK(type: AutoRunAdvType, val: number) {
        this.SetButtonNumber(type, val);
        if (type == AutoRunAdvType.SingleWinType) {
            //this.SingleWinButton.title = this.AdvTypeString[type].format(val);
            this.SingleWinButton.visible = true;
            this.SingleWinButtonGray.visible = false;
            this.Setting.CheckSingleWinMoney = true;
            this.Setting.SingleWinMoney = val;
        }
        else if (type == AutoRunAdvType.CreditUpperLimit) {
            //this.CreditUpperLimitButton.title = this.AdvTypeString[type].format(val);
            this.CreditUpperLimitButton.visible = true;
            this.CreditUpperLimitButtonGray.visible = false;
            this.Setting.CheckUpperLimitMoney = true;
            this.Setting.UpperLimitMoney = val;
        }
        else if (type == AutoRunAdvType.CreditLowerLimit) {
            //this.CreditLowerLimitButton.title = this.AdvTypeString[type].format(val);
            this.CreditLowerLimitButton.visible = true;
            this.CreditLowerLimitButtonGray.visible = false;
            this.Setting.CheckLowerLimitMoney = true;
            this.Setting.LowerLimitMoney = val;
        }
        this.CheckAutoRunButton();
    }

    protected CheckAutoRunButton() {
        if (this.Auto30ButtonGray.visible &&
            this.Auto50ButtonGray.visible &&
            this.Auto100ButtonGray.visible &&
            this.AutoUnlimitButtonGray.visible)
            this.OnAutoRunRadioClick(this.AutoUnlimitButtonGray);
    }

    protected OnCalculationCancel(type: AutoRunAdvType) {
        if (type == AutoRunAdvType.SingleWinType) {
            this.SingleWinButton.visible = false;
            this.SingleWinButtonGray.visible = true;
        }
        else if (type == AutoRunAdvType.CreditUpperLimit) {
            this.CreditUpperLimitButton.visible = false;
            this.CreditUpperLimitButtonGray.visible = true;
        }
        else if (type == AutoRunAdvType.CreditLowerLimit) {
            this.CreditLowerLimitButton.visible = false;
            this.CreditLowerLimitButtonGray.visible = true;
        }
    }

    protected OnOKClick() {
        this.Visible = false;

        if (this.Setting.IsUnlimitRound || this.Setting.TotalRound > 0)
            this.OKCallback.apply(this.CallbackThis, [this.Setting]);
        else {
            let setting: AutoPlaySetting = new AutoPlaySetting();
            setting.IsFastX2 = this.Setting.IsFastX2;
            setting.IsFastX3 = this.Setting.IsFastX3;
            this.CancelCallback.apply(this.CallbackThis, [setting]);
        }
    }

    protected OnCancelClick() {
        this.Visible = false;
        // let setting: AutoPlaySetting = new AutoPlaySetting();
        // setting.IsFastX2 = this.Setting.IsFastX2;
        // setting.IsFastX3 = this.Setting.IsFastX3;
        // this.CancelCallback.apply(this.CallbackThis, [setting]);
    }
}