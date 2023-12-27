abstract class ISlotView {
    slotWheelManager:SlotWheelManager = new SlotWheelManager();
    view:fairygui.GComponent = null;
    constructor()
    {
    }
    public abstract Init(view:fairygui.GComponent);
    public async StartRun(){}
    protected async Run(){}
    public async StopStart(){}
    protected async Stoping(){}
    protected async Stop(){}
    public async ShowWinLineFxStart(){}
    protected async ShowWinLineFx(){}
    protected async ShowWinLineFxEnd(){}
    public async ShowNormalWinFxStart(){}
    protected async ShowNormalWinFx(){}
    protected async ShowNormalWinFxEnd(){}
    public async ShowMainToBonusFxStart(){}
    protected async ShowMainToBonusFx(){}
    protected async ShowMainToBonusFxEnd(){}
    public async ShowBonusStart(){}
    protected async ShowBonus(){}
    protected async ShowBonusEnd(){}
    public async ShowBonusStop(){}
    protected async ShowBonusStoping(){}
    protected async ShowBonusStopEnd(){}
    public async ShowBonusWinFxStart(){}
    protected async ShowBonusWinFx(){}
    protected async ShowBonusWinFxEnd(){}
    public async ShowBonusWinEnd(){}
    public async ShowBonusToMainFxStart(){}
    protected async ShowBonusToMainFx(){}
    protected async ShowBonusToMainFxEnd(){}
    public async ShowFinalFxStart(){}
    protected async ShowFinalFx(){}
    public async ShowFinalFxEnd(){}
    public ShowMessage(message:string,btntext:string,callback:Function,callbackObj:any):MessageTips{return null; };
}