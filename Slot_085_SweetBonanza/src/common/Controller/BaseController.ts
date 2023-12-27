class BaseController<T1 extends ISlotView, T2 extends IGameLogic> extends ISlotBaseController<T1, T2> {

    protected specialresult: Array<any> = []

    public Init() {
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode) {
            this.SetSpecialModeData();
        }
    }

    /**開始運行控制器*/
    public async StatrRun() {
        await this.view.ShowFinalFxEnd();
        await this.view.StartRun();                                             //遊戲運行
    }

    /**遊戲結果*/
    public OnGameResult(data: Array<number>) {
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode && GameLogic.Instance.ServerGameResultList.length === 0) {
            this.SetSpecialModeData();
        }
        GameLogic.Instance.ShowResult = data;
        return 0;
    }

    public OnBonusGameResult(data: Array<number>): number {
        GameLogic.Instance.ShowResult = data;
        return 0;
    }

    public OnSideBetGameResult(data: ClientGameResult): number {
        return 0;
    }

    public async StopRun() {
        await this.view.StopStart();
    }
    public async ShowLineResult() {
        if (GameLogic.Instance.SlotResult.getBet > 0 || GameLogic.Instance.SlotResult.subGameCount > 0) {
            await this.view.ShowWinLineFxStart();
        }
    }
    public async ShowNormalResult() {
        if (GameLogic.Instance.SlotResult.getBet > 0 || GameLogic.Instance.SlotResult.subGameCount > 0) {
            await this.view.ShowNormalWinFxStart();
        }

    }

    /**主遊戲到獎金遊戲*/
    public async MainToBonus(bonusID: number, redata: ReData) {
        await this.view.ShowMainToBonusFxStart();
    }
    /**顯示獎金*/
    public async ShowBonus() {
        await this.view.ShowFinalFxEnd();
        await this.view.ShowBonusStart();
    }
    public async ShowBonusStop() {
        await this.view.ShowBonusStop();
    }
    public async ShowBonusResult() {
        if (GameLogic.Instance.SlotResult.getBet > 0 || GameLogic.Instance.SlotResult.subGameCount > 0) {
            await this.view.ShowBonusWinFxStart();
            await this.view.ShowBonusWinEnd();
        }
        else {
            await waitForSeconds(0.2);
            await this.view.ShowBonusWinEnd();
        }
    }
    public async BonusToMain() {
        await this.view.ShowBonusToMainFxStart();
    }

    /**結果完成*/
    public ResultFinish() {
        let event = new ClientEvent(ClientMsg.OnShowResultEnd);
        EventManager.Instance.Send(event);
        if (GameLogic.Instance.SlotResult.getBet > 0 || GameLogic.Instance.SlotResult.subGameCount > 0) {
            this.view.ShowFinalFxStart();
        }
    }

    /**設置特殊模式數據*/
    public SetSpecialModeData() {
        let data = cloneClass(this.specialresult);
        for (let i = 0, max = data.length; i < max; ++i) {
            let result = this.createTestGameResult(data[i]["normalResult"], data[i]["bonusResult"], data[i]["jackpotmoney"]);
            GameLogic.Instance.ServerGameResultList.push(result);
        }
    }
}