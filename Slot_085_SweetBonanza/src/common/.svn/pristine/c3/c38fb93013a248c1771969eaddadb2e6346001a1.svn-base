class SettingPopupView extends IView {
    protected SoundButton: fairygui.GButton;
    protected InfoButton: fairygui.GButton;

    protected CallbackThis: any;
    protected OnSoundCallback: (enable: boolean) => void;
    protected OnInfoCallback: () => void;

    protected GetResName(): string { return "SettingPopupPanel"; }
    protected Initialize() {
        this.SoundButton = this.View.asCom.getChild("SoundButton").asButton;
        this.SoundButton.addClickListener(() => this.OnSoundCallback.apply(this.CallbackThis, [!this.SoundButton.selected]), this);

        this.InfoButton = this.View.asCom.getChild("InfoButton").asButton;
        this.InfoButton.addClickListener(() => this.OnInfoCallback.apply(this.CallbackThis), this);
    }

    public set SoundEnable(val: boolean) {
        this.SoundButton.selected = !val;
    }

    public SetCallbackFunc(OnSoundFunc: (enable: boolean) => void, OnInfoFunc: () => void, FuncThis: any) {
        this.OnSoundCallback = OnSoundFunc;
        this.OnInfoCallback = OnInfoFunc;
        this.CallbackThis = FuncThis;
    }
}