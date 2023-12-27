class AutoPopupView extends IView {
    protected Auto30Button: FairyExButton;
    protected Auto50Button: FairyExButton;
    protected Auto100Button: FairyExButton;
    protected Auto500Button: FairyExButton;
    protected UntilBonusButton: FairyExButton;
    protected CustomButton: FairyExButton;

    protected CallbackThis: any;
    protected OnAutoRunCallback: (times: number) => void;
    protected OnUntilBonusCallback: () => void;
    protected OnCustomCallback: () => void;

    protected GetResName(): string { return "AutoPopupPanel"; }
    protected Initialize() {
        this.Auto30Button = new FairyExButton(this.View.asCom.getChild("Auto30Button").asButton);
        this.Auto30Button.addClickListener(() => this.OnAutoRunCallback.apply(this.CallbackThis, [SelfData.Instance.AutoRoundTime[0]]), this);

        this.Auto50Button = new FairyExButton(this.View.asCom.getChild("Auto50Button").asButton);
        this.Auto50Button.addClickListener(() => this.OnAutoRunCallback.apply(this.CallbackThis, [SelfData.Instance.AutoRoundTime[1]]), this);

        this.Auto100Button = new FairyExButton(this.View.asCom.getChild("Auto100Button").asButton);
        this.Auto100Button.addClickListener(() => this.OnAutoRunCallback.apply(this.CallbackThis, [SelfData.Instance.AutoRoundTime[2]]), this);

        this.Auto500Button = new FairyExButton(this.View.asCom.getChild("Auto500Button").asButton);
        this.Auto500Button.addClickListener(() => this.OnAutoRunCallback.apply(this.CallbackThis, [SelfData.Instance.AutoRoundTime[3]]), this);

        this.UntilBonusButton = new FairyExButton(this.View.asCom.getChild("UntilBonusButton").asButton);
        this.UntilBonusButton.addClickListener(() => this.OnUntilBonusCallback.apply(this.CallbackThis), this);

        this.CustomButton = new FairyExButton(this.View.asCom.getChild("CustomButton").asButton);
        this.CustomButton.addClickListener(() => this.OnCustomCallback.apply(this.CallbackThis), this);
    }

    public SetCallbackFunc(OnAutoRunFunc: (times: number) => void, OnUntilBonusFunc: () => void, OnCustomFunc: () => void, FuncThis: any) {
        this.OnAutoRunCallback = OnAutoRunFunc;
        this.OnUntilBonusCallback = OnUntilBonusFunc;
        this.OnCustomCallback = OnCustomFunc;
        this.CallbackThis = FuncThis;
    }
}