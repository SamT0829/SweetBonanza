class CalculationView extends IView {
    protected SingleWinGroup: fairygui.GObject;
    protected SingleWinText: fairygui.GTextField;

    protected UpperGroup: fairygui.GObject;
    protected UpperText: fairygui.GTextField;

    protected LowerGroup: fairygui.GObject;
    protected LowerText: fairygui.GTextField;

    protected BackButton: FairyExButton; //←
    protected DotButton: FairyExButton; //.
    protected Num0Button: FairyExButton;
    protected Num1Button: FairyExButton;
    protected Num2Button: FairyExButton;
    protected Num3Button: FairyExButton;
    protected Num4Button: FairyExButton;
    protected Num5Button: FairyExButton;
    protected Num6Button: FairyExButton;
    protected Num7Button: FairyExButton;
    protected Num8Button: FairyExButton;
    protected Num9Button: FairyExButton;
    protected OKButton: FairyExButton;
    protected CancelButton: FairyExButton;
    protected ClearButton: FairyExButton;

    /** 是否有小數點 */
    protected IsDot: boolean = false;

    /** 目前數字 */
    protected NowNumber: string = "0";

    /** Type */
    protected AdvType: AutoRunAdvType = AutoRunAdvType.SingleWinType;

    /** 整數上限 */
    protected IntegerLength: number = 10;

    /** 小數上限 */
    protected DecimalLength: number = 2;

    protected OKCallback: Function;
    protected CancelCallback: Function;
    protected CallbackThis: any;

    protected GetResName(): string { return "CalculatorPanel"; }
    protected Initialize() {
        this.SingleWinGroup = this.View.asCom.getChild("SingleWinGroup");
        this.SingleWinGroup.visible = false;

        this.SingleWinText = this.View.asCom.getChild("SingleWin_text").asTextField;
        this.SingleWinText.text = "0";

        this.UpperGroup = this.View.asCom.getChild("UpperGroup");
        this.UpperGroup.visible = false;

        this.UpperText = this.View.asCom.getChild("Upper_text").asTextField;
        this.UpperText.text = "0";

        this.LowerGroup = this.View.asCom.getChild("LowerGroup");
        this.LowerGroup.visible = false;

        this.LowerText = this.View.asCom.getChild("Lower_text").asTextField;
        this.LowerText.text = "0";

        this.BackButton = new FairyExButton(this.View.asCom.getChild("BackButton").asButton);
        this.BackButton.addClickListener(this.OnBackClick, this);

        this.DotButton = new FairyExButton(this.View.asCom.getChild("DotButton").asButton);
        this.DotButton.addClickListener(this.OnDotClick, this);

        this.Num0Button = new FairyExButton(this.View.asCom.getChild("Num0Button").asButton);
        this.Num0Button.addClickListener(() => this.OnNumClick(0), this);

        this.Num1Button = new FairyExButton(this.View.asCom.getChild("Num1Button").asButton);
        this.Num1Button.addClickListener(() => this.OnNumClick(1), this);

        this.Num2Button = new FairyExButton(this.View.asCom.getChild("Num2Button").asButton);
        this.Num2Button.addClickListener(() => this.OnNumClick(2), this);

        this.Num3Button = new FairyExButton(this.View.asCom.getChild("Num3Button").asButton);
        this.Num3Button.addClickListener(() => this.OnNumClick(3), this);

        this.Num4Button = new FairyExButton(this.View.asCom.getChild("Num4Button").asButton);
        this.Num4Button.addClickListener(() => this.OnNumClick(4), this);

        this.Num5Button = new FairyExButton(this.View.asCom.getChild("Num5Button").asButton);
        this.Num5Button.addClickListener(() => this.OnNumClick(5), this);

        this.Num6Button = new FairyExButton(this.View.asCom.getChild("Num6Button").asButton);
        this.Num6Button.addClickListener(() => this.OnNumClick(6), this);

        this.Num7Button = new FairyExButton(this.View.asCom.getChild("Num7Button").asButton);
        this.Num7Button.addClickListener(() => this.OnNumClick(7), this);

        this.Num8Button = new FairyExButton(this.View.asCom.getChild("Num8Button").asButton);
        this.Num8Button.addClickListener(() => this.OnNumClick(8), this);

        this.Num9Button = new FairyExButton(this.View.asCom.getChild("Num9Button").asButton);
        this.Num9Button.addClickListener(() => this.OnNumClick(9), this);

        this.OKButton = new FairyExButton(this.View.asCom.getChild("OKButton").asButton);
        this.OKButton.addClickListener(this.OnOKClick, this);

        this.CancelButton = new FairyExButton(this.View.asCom.getChild("CancelButton").asButton);
        this.CancelButton.addClickListener(this.OnCancelClick, this);

        let clrBtn = this.View.asCom.getChild("ClearButton");
        if(clrBtn != null)
        {
            this.ClearButton = new FairyExButton(clrBtn.asButton);
            this.ClearButton.addClickListener(this.OnClearClick, this);        
        }
    }

    public OpenUI(type: AutoRunAdvType, num: number, okFunc: Function, cancelFunc: Function, funcThis: any) {
        this.Visible = true;
        this.AdvType = type;
        this.NowNumber = num.toString();
        this.OKCallback = okFunc;
        this.CancelCallback = cancelFunc;
        this.CallbackThis = funcThis;
        this.TitleTextFormat();
    }

    protected TitleTextFormat() {
        this.SingleWinGroup.visible = this.AdvType == AutoRunAdvType.SingleWinType;
        this.UpperGroup.visible = this.AdvType == AutoRunAdvType.CreditUpperLimit;
        this.LowerGroup.visible = this.AdvType == AutoRunAdvType.CreditLowerLimit;
        this.SingleWinText.text = this.NowNumber;
        this.UpperText.text = this.NowNumber;
        this.LowerText.text = this.NowNumber;
        this.IsDot = this.NowNumber.indexOf(".") >= 0;
    }

    protected OnNumClick(num: number) {
        if (this.NowNumber == "0")
            this.NowNumber = "";

        if (this.IsDot && this.getDecimalLength() >= this.DecimalLength)
            return;
        else if (!this.IsDot && this.getIntegerLenght() >= this.IntegerLength)
            return;

        this.NowNumber = this.NowNumber + num;
        this.TitleTextFormat();
    }

    private getIntegerLenght() {
        if (!this.IsDot)
            return this.NowNumber.length;

        return this.NowNumber.indexOf(".");
    }

    private getDecimalLength() {
        if (!this.IsDot)
            return 0;

        let dotIndex: number = this.NowNumber.indexOf(".");
        return this.NowNumber.length - dotIndex - 1;
    }


    protected OnDotClick() {
        if (this.IsDot)
            return;

        this.IsDot = true;
        this.NowNumber = this.NowNumber + ".";
        this.TitleTextFormat();
    }

    protected OnBackClick() {
        if (this.NowNumber == "0")
            return;

        this.NowNumber = this.NowNumber.substr(0, this.NowNumber.length - 1);
        if (this.NowNumber == "")
            this.NowNumber = "0";
        if (this.NowNumber.indexOf(".") < 0)
            this.IsDot = false;
        this.TitleTextFormat();
    }

    protected OnOKClick() {
        this.Visible = false;
        this.OKCallback.apply(this.CallbackThis, [this.AdvType, Number(this.NowNumber)]);
    }

    protected OnCancelClick() {
        this.Visible = false;
        this.CancelCallback.apply(this.CallbackThis, [this.AdvType]);
    }

    protected OnClearClick() {
        this.NowNumber = "0";
        this.IsDot = false;
        this.TitleTextFormat();
    }
}