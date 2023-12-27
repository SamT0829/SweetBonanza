class FreeGameResultView {
    private view :fairygui.GComponent =null;
    private obj : fairygui.GObject    =null;

    private ShowTrans:fairygui.Transition =null;
    private HideTrans:fairygui.Transition =null;
    private Money:fairygui.GTextField =null;
    
    private IsAnimEnd = true;
    
    public constructor(view: fairygui.GComponent) {
        this.view = view;
    }

    public CreateView()
    {
        this.obj = UIManager.Instance.ShowEffect(SelfData.Instance.MainPackageName, "FreeGameResult", false);
        if (this.obj == null)
            consoleLog("addSlotFx fail. name:FreeGameResult");
        this.Money = this.obj.asCom.getChild("winMoney")as fairygui.GTextField;
        this.ShowTrans = this.obj.asCom.getTransition("show");
        this.HideTrans = this.obj.asCom.getTransition("hide");

        this.Money.text = "0";
        this.ShowTrans.setHook("end",()=>{this.IsAnimEnd =true;},this);
        this.HideTrans.setHook("end",()=>{this.IsAnimEnd =true;},this);
        this.view.addChild(this.obj);
    }
    public async Show(money:number,time:number,wait:number)
    {   
        if(this.obj ==null)
            this.CreateView();
        SoundManger.Instance.StopBGM();
        SoundManger.Instance.PlayBGM(BreakAwayGameData.Instance.SoundName.FreegameReward);
        this.obj.visible = true;
        this.IsAnimEnd =false;
        this.ShowTrans.play();
        let obj = this.obj.asCom.getChild("event");
        UIManager.Instance.ShowBone(<egret.DisplayObjectContainer>obj.displayObject, BigWinType.Coin);
        while(!this.IsAnimEnd)
            await waitForSeconds(0.1);
       
        await this.TweenMoney(money,time);
        
        await waitForSeconds(wait);
        
        this.IsAnimEnd =false;
        this.HideTrans.play();
        while(!this.IsAnimEnd)
            await waitForSeconds(0.1);
        this.obj.visible = false;
        UIManager.Instance.HideBone();
    }

    private async TweenMoney(money:number,time:number)
    {
        let currentMoney:number =0;
        let addPerTime = Math.floor(money/time/20);
        let coinmoney:number = 0;
        while(money> currentMoney)
        {
            currentMoney += addPerTime;
            currentMoney = Math.min(currentMoney,money);
            if(currentMoney > 0)
                coinmoney = currentMoney / 100;
            this.Money.text = coinmoney.toFixed(2);
            await waitForSeconds(0.02)
        }
    }
}