class FreeGameView extends BaseView {

    isBonus = false;

    /**開始運行*/
    public async StartRun() {
        this.IsSkip = false;
        if(!this.isBonus)
            this.ShowWinMoney(-1);                                                                  //贏分歸零
        this.ShowLobbyMessage(LocalizationCommonTable.Get(10000002));
        await this.slotWheelManager.StartRun();
        await this.Run();
    }

    /**顯示獎金開始*/
	public async ShowBonusStart() {
        this.isBonus = true;       
        EventManager.Instance.Send(new ClientEvent(ClientMsg.OnStopButtonGray));                    //停止按鈕灰色
        await this.ShowBonus();
        await this.ShowBonusEnd();
    }
    /**顯示獎金遊戲*/
    protected async ShowBonus() {
        await this.StartRun();
    }
    protected async ShowBonusEnd() {
        
    }

    public async ShowBonusStop(){
        EventManager.Instance.Send(new ClientEvent(ClientMsg.OnGameResult));
        await this.ShowBonusStoping();
        await this.ShowBonusStopEnd();
    }

    protected async ShowBonusStoping()
    {
        await this.StopStart();
    }

    protected async ShowBonusStopEnd()
    {

    }

    public async ShowBonusWinFxStart(){
        await this.ShowBonusWinFx();
        await this.ShowBonusWinFxEnd();
    }
    protected async ShowBonusWinFx(){

        await this.ShowWinLineFxStart();
        await this.ShowNormalWinFxStart();
    }
    protected async ShowBonusWinFxEnd(){
        
    }
    public async ShowBonusWinEnd()
    {
        this.isBonus = false;
    }
}
