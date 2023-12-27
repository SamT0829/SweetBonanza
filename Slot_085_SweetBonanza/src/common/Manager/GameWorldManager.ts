// TypeScript file
class GameWorldManager {
    private static _instance: GameWorldManager;

    private cleanUpTimer;

    public static get Instance(): GameWorldManager {
        if (this._instance == null) {
            this._instance = new GameWorldManager();
        }
        return this._instance;
    }

    private playgametype: PlayGameType = PlayGameType.MainGame;

    public isRequesting: Dictionary = new Dictionary([]);

    private constructor() {
        NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerPlayGameRespond, this, this.OnPlayGameRespond);
        //NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerPlayGameRespond, this, this.OnBonusGameRespond);
    }

    /**發送玩一個遊戲*/
    public async SendPlayOneGame(money: number[]) {
        // backup bet data
        // SelfData.Instance.LastBetData = {
        //     bet: money,
        //     jackpot: jackpot
        // };

        if (this.cleanUpTimer != null)
            return;

        // this.isRequesting[MsgType.NetMsg_PlayGameRequest] = true;
        if (SelfData.Instance.UrlParam_GameMode === GameMode.PacketMode) {
            let showtip = true;
            let msg = new MessageTips();
            msg.CreateTips(fairygui.GRoot.inst, "packetTest");

            let s = "Send Packet ";
            s += JSON.stringify(money);
            msg.ShowInputTip("OK", s, () => {
                if (msg.InputMsg.text != "") {
                    money = JSON.parse(msg.InputMsg.text);
                    showtip = false;
                }
            }, this);
            msg.InputMsg.text = JSON.stringify(money);;
            while (showtip) {
                await waitForSeconds(0.1);
            }
        }
        SelfData.Instance.PlaySetting.SendPlayGame();
        consoleLog("SendPlayOneGame: " + JSON.stringify(money));
        SelfData.Instance.AddRunLog(RunLog.SendPlayGame, JSON.stringify(money), false);
        this.playgametype = <PlayGameType>money[2];
        let msgBuilder = new MessageBuilder();
        msgBuilder.Add(PlayGameRequest.Money, money, NetMsgFieldType.Array);
        // AccountData.Instance.Money -= SelfData.Instance.TotalBet;
        //console.log("SendPlayOneGame: " + JSON.stringify(msgBuilder));
        NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerPlayGameRequest, msgBuilder);
        this.cleanUpTimer = setResponseTimer(3000);

        function setResponseTimer(ms) {

            const id = setInterval(output, ms);

            let time = 0;

            function output() {
                time += ms;
                consoleLog(`Server Timeout...${time}ms`);
            }

            function cleanUpResponseTimer() {
                clearInterval(id);
            }

            return cleanUpResponseTimer;
        }
    }

    // public async SendBonusGame(money: number[], jackpot: boolean) {

    //     if (this.cleanUpTimer != null)
    //         return;



    //     let msgBuilder = new MessageBuilder();
    //     msgBuilder.Add(PlayGameRequest.Money, money, NetMsgFieldType.Array);
    //     //console.log("SendPlayOneGame: " + JSON.stringify(msgBuilder));
    //     NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerPlayGameRequest, msgBuilder);
    //     this.cleanUpTimer = setResponseTimer(3000);

    //     function setResponseTimer(ms) {

    //         const id = setInterval(output, ms);

    //         let time = 0;

    //         function output() {
    //             time += ms;
    //             consoleLog(`Server Timeout...${time}ms`);
    //         }

    //         function cleanUpResponseTimer() {
    //             clearInterval(id);
    //         }

    //         return cleanUpResponseTimer;
    //     }
    // }

    // public SendJackpotRequest() {
    //     // let gameTypeName = SelfData.Instance.getData(SelfData.m_GameType);
    //     // let gameType: GameType = GameType[gameTypeName];

    //     let msgBuilder = new MessageBuilder();
    //     // msgBuilder.Add(GameTypeJackPotRequest.GameTypeRequired, gameType, NetMsgFieldType.Int);

    //     //NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_GameTypeJackPotRequest, msgBuilder);
    // }

    /* response */

    /**OnPlay遊戲響應*/
    private OnPlayGameRespond(connectionId: number, message: any[]) {
        let errorCode: ErrorCode = (<ErrorCode>message[PlayGameRespond.ErrorCode]);
        //console.log("OnPlayGameRespond: " + JSON.stringify(message));
        if (errorCode == ErrorCode.Success) {
            this.cleanUpTimer();
            delete this.cleanUpTimer;
            this.cleanUpTimer = null;
            let result = new ClientGameResult(message[PlayGameRespond.ClientGameResult]);
            SelfData.Instance.AccountData.CommonData = result.CommonData;
            SelfData.Instance.PlaySetting.GameInfoRespond = message[PlayGameRespond.ClientGameResult][PlayGameRespond.ClientGameInfo];
            consoleLog("OnPlayGameRespond: " + JSON.stringify(message[PlayGameRespond.ClientGameResult]));
            SelfData.Instance.AddRunLog(RunLog.ServerRespond, result.NormalWin + "," + result.BonusWin + "," + result.JackpotPrize + "," + result.ResultMoney);
            if (this.playgametype === PlayGameType.MarkRespin) {
                let event = new ClientEvent(ClientMsg.RespinGameResultRespond);
                EventManager.Instance.Send(event);
            }
            else if (this.playgametype === PlayGameType.BonusPick) {
                let event = new ClientEvent(ClientMsg.PickUPGameResultRespond);
                event.eventData = result;
                EventManager.Instance.Send(event);
            }
            else if (this.playgametype === PlayGameType.SideBet || this.playgametype === PlayGameType.CashOut) {
                let event = new ClientEvent(ClientMsg.SideBetResultRespond);
                event.eventData = result;
                EventManager.Instance.Send(event);
            }
            else if (this.playgametype === PlayGameType.SpinStep) {
                let event = new ClientEvent(ClientMsg.SpinStepRespond);
                event.eventData = result;
                EventManager.Instance.Send(event);
            }
            else if (this.playgametype === PlayGameType.SpinStepEnd) {
                let event = new ClientEvent(ClientMsg.SpinStepRespond);
                event.eventData = result;
                EventManager.Instance.Send(event);
            }
            else if (this.playgametype === PlayGameType.ModeSelect) {
                let event = new ClientEvent(ClientMsg.ModeSelectRespod);
                event.eventData = result;
                EventManager.Instance.Send(event);
            }
            else if (this.playgametype === PlayGameType.BonusRound2) {
                let event = new ClientEvent(ClientMsg.SingleBonusGameResultRespond);
                event.eventData = result;
                EventManager.Instance.Send(event);
            }
            else if (this.playgametype === PlayGameType.SaveSelect) {
                let event = new ClientEvent(ClientMsg.SpinStepRespond);
                event.eventData = result;
                EventManager.Instance.Send(event);
            }
            else {
                if (this.playgametype === PlayGameType.MainGame || this.playgametype === PlayGameType.BuyBonus) {
                    GameLogic.Instance.ServerGameResultList.push(result);
                }
                else {
                    GameLogic.Instance.ServerBonusGameResultList.push(result);
                }
                let event = new ClientEvent(ClientMsg.GameResultRespond);
                event.eventData = result;
                EventManager.Instance.Send(event);
            }
            let bonuscode = new ClientEvent(ClientMsg.UpdateBonusCodeTime);
            bonuscode.eventData = result.BonusCodeFreeSpinTime;
            EventManager.Instance.Send(bonuscode);
        }
        else {
            let tableKey = LocalizationKey.ErrorCode + errorCode;
            SelfData.Instance.PlaySetting.ErrorInfo.push(tableKey);
            let event: ClientEvent = new ClientEvent(ClientMsg.ShowErrorWindow);
            EventManager.Instance.Send(event);
            //UIManager.Instance.ShowErrorWindow("", LocalizationKey.ErrorCode+errorCode, null, null, null);
        }
    }

    // private OnBonusGameRespond(connectionId: number, message: any[]) {
    //     let errorCode: ErrorCode = (<ErrorCode>message[PlayGameRespond.ErrorCode]);
    //     if (errorCode == ErrorCode.Success) {
    //         this.cleanUpTimer();
    //         delete this.cleanUpTimer;
    //         this.cleanUpTimer = null;
    //         let result = new ClientGameResult(message[PlayGameRespond.ClientGameResult]);
    //         GameLogic.Instance.ServerBonusGameResultList.push(result);

    //         let event = new ClientEvent(ClientMsg.BonusGameResultRespond);
    //         EventManager.Instance.Send(event);
    //     }
    //     else {
    //         let tableKey = LocalizationKey.ErrorCode + errorCode;
    //         SelfData.Instance.PlaySetting.ErrorInfo.push(tableKey);
    //         let event: ClientEvent = new ClientEvent(ClientMsg.ShowErrorWindow);
    //         EventManager.Instance.Send(event);
    //         //UIManager.Instance.ShowErrorWindow("", LocalizationKey.ErrorCode+errorCode, null, null, null);
    //     }
    // }

    // private OnGameTypeJackPotRespond(connectionId: number, message: any[]) {

    // }

    // private OnGameroomListRespond(connectionId: number, message: any[]) {

    // }

}