class GameLogic {
    private static _instance: GameLogic;
    public static get Instance(): GameLogic {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    }

    //-----------------SlotServer資料
    /** server回傳資料 */
    public ServerGameResultList:Array<ClientGameResult> = [];
    public ServerBonusGameResultList:Array<ClientGameResult> = [];
    /** Clinet邏輯回傳資料 */
    public SlotResult:SlotResultBase = null;

     /**顯示遊戲結果*/
    public ShowResult = [];

    public ClientBonusGameResult:Array<number> = [];
}

