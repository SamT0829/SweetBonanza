abstract class ILobbyBarView extends IView {
    private _controller: LobbyBarController;
    public get Controller(): LobbyBarController { return this._controller; }
    public set Controller(val: LobbyBarController) { this._controller = val; }

    /** 接收到server回傳值 */
    public abstract OnGameResult();

    /** 自動玩停止 */
    public abstract OnAutoStopRun();

    /** Slot開始表演 */
    public abstract OnShowResultBegin();

    /** Slot表演結束 */
    public abstract OnShowResultEnd();

    /** 自動完更新次數 */
    public abstract UpdateAutoCountText();

    /** 顯示更名提示 */
    public abstract ShowChangeNameTip();
    
    /** 顯示message */
    public abstract OnShowMessage(message: string);

    /**
     * 中間顯示數字
     * @param money 取得金錢
     * @param time 顯示多久
     */
    public abstract async OnShowCenterMoney(money: number, time: number);

    /** 顯示得分 */
    public abstract async OnShowWinMoney(money: number);

    public abstract async OnShowFlyMoney(money: number);

    /** 更新Money */
    public abstract async OnUpdateMoney();

    /** Respin表演中 */
    public abstract OnShowRespin();

    /** 更新Bet表 */
    public abstract UpdateBetText();

    /** Account沒錢 */
    public abstract OnAccountNoMoney();

    /** 提示快速停輪 */
    public abstract ShowFastRunDialog();

    /** 開始FreeSpin */
    public abstract FreeSpin();

    /** 停止Button灰階 */
    public abstract StopButtonGray();

    /** 等待點擊進入特色遊戲 */
    public abstract WaitContinueRun();

    /** 重置LobbyBar */
    public abstract ResetLobbyButton();
}