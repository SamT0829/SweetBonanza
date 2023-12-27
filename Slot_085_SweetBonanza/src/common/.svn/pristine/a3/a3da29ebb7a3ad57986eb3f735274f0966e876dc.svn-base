
class SlotGameController<T1 extends ISlotView, T2 extends IGameLogic, T3 extends ISlotBaseController<T1, T2>> {

    public BaseController: T3 = null;
    public _getResult = false;
    public static AutoWaitSecond = 0.37;
    public serverResult: ClientGameResult = null;
    public sending = false;
    public currentBonusIndex = 0;
    public bonusRoundIndex = 0;
    public isBonus: Array<PlayGameType> = [];
    protected roundBonus = false;
    public static isPlaying = false;
    protected roundWin = 0;
    protected rechargeValue = 0;
    public get UnitTest(): boolean {
        return SelfData.Instance.UrlParam_GameMode === GameMode.UnitTestMode || SelfData.Instance.UrlParam_GameMode === GameMode.UnitTestSPMode;
    };
    public get UnitTestBuyBonus(): boolean {
        return SelfData.Instance.UrlParam_UTBB;
    }
    protected winBet = 0;
    protected allUnitTestCount = 0;
    protected allWinBet = 0;
    protected allTotalBet = 0;
    protected allBonusCount = 0;
    private _unitTestErrorTimes = 0;
    protected get unitTestErrorTimes() { return this._unitTestErrorTimes; }
    protected set unitTestErrorTimes(val) {
        this._unitTestErrorTimes = val;
    }
    protected unitTestBox: MessageTips = null;
    protected serverResultMoney = 0;
    public waitReData: boolean = false;
    private showDisconnected: boolean = false;
    public isShowRedataTip = true;
    protected playBefore = -1;
    private lastPlayerMWTransferInRequestID = "";
    private pickCount = 0;
    public buyBonusType: BuyBonusType = BuyBonusType.None;
    public buyBonusTimes: number = 0;
    //private buyBonusTempAccountMoney: number = 0;
    private waitUpdateMoney: boolean = false;
    private FPSTimer = 0;
    private FPSCount = 0;
    public MarqueeManager: Marquee = null;
    private HeartBeatError: boolean = false;
    public constructor(Base: T3) {
        this.BaseController = Base;
        this.Initialize();
    }

    public Initialize() {
        this.BaseController.Init();
        //NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_KickPlayer, this, this.OnKickPlayerRespond);
        NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerMWTransferInRespond, this, this.OnMWTransferIn);
        NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerMWSingleHeartBeatRespond, this, this.OnMWSingleHeartBeatRespond);
        //NetworkHandler.Instance.RegisterMessageListener(MsgType.NetMsg_PlayerMWSingleGetBalanceRespond, this, this.OnMWSingleGetBalanceRespondBase);
        //EventManager.Instance.RegisterEventListener(ServerDisconnectedEvent, this, this.onDisconnected, RemoteConnetionType.Lobby);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.onStart, ClientMsg.StartRun);                                                   //註冊開Client 始運轉事件
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.onServerResult, ClientMsg.GameResultRespond);                                   //註冊開Client 服務器結果
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.onSingleBonusGameResult, ClientMsg.SingleBonusGameResultRespond);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.onRespinGameResult, ClientMsg.RespinGameResultRespond);
        //EventManager.Instance.RegisterEventListener(ClientEvent, this, this.CheckShowErrorWindow, ClientMsg.ShowErrorWindow);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnUpdateMoneyEnd, ClientMsg.OnUpdateMoneyEnd);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.BuyBonusOnStart, ClientMsg.BuyBonusOnStart);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.RePlayOnStart, ClientMsg.RePlayOnStart);

        if (this.BaseController.bonusPickID.length > 0) {
            EventManager.Instance.RegisterEventListener(ClientEvent, this, this.SendPickGame, ClientMsg.OnPickUP);
            EventManager.Instance.RegisterEventListener(ClientEvent, this, this.onPickUPGameResultRespond, ClientMsg.PickUPGameResultRespond);
        }
        //EventManager.Instance.RegisterEventListener(ClientEvent, this, this.onBonusGameResult, ClientMsg.BonusGameResultRespond);
        SelfData.Instance.GameControllerInitDone = true;
        this.OnMarquee();
        //this.setReData();
        this.SendPlayerMWTransferInRequest();                                                                                                               //發送玩家 MW 轉入請求
        this.SendMWSingleHeartBeatRequest();                                                                                                                //發送 MW 單次心跳請求
        EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.updateFPS);
    }

    // private CheckShowErrorWindow() {
    //     if (SelfData.Instance.PlaySetting.ShowError)
    //         return;
    //     if (SelfData.Instance.PlaySetting.ErrorInfo.length > 0) {
    //         let _infoId: number = SelfData.Instance.PlaySetting.ErrorInfo[0];
    //         SelfData.Instance.PlaySetting.ErrorInfo.splice(0, 1);
    //         consoleLog("Error Code: " + _infoId);
    //         if (SelfData.Instance.AccountData.WalletType != WalletType.MWSingle || _infoId != 90215) {
    //             UIManager.Instance.ShowErrorWindow("", _infoId, () => {
    //                 closeWindow();
    //             }, this, null);
    //         }
    //         else {
    //             RefreshBalanceController.Instance.RefreshBalanceTip = new RefreshBalanceTips();
    //             RefreshBalanceController.Instance.RefreshBalanceTip.ShowTip(() => {
    //                 RefreshBalanceController.Instance.RefreshBalanceTip.ButtonEnable = false;
    //                 RefreshBalanceController.Instance.NoMoneySyncMWSingleGetBalance = true;
    //                 RefreshBalanceController.Instance.SendMWSingleGetBalanceRequest();
    //             }, this);
    //         }
    //     }
    // }

    /**發送玩家 MW 轉入請求*/
    private SendPlayerMWTransferInRequest() {
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode)
            return;
        egret.setTimeout(this.SendPlayerMWTransferInRequest, this, 5000);
        if (SlotGameController.isPlaying || this.lastPlayerMWTransferInRequestID != "")
            return;
        let msgBuilder = new MessageBuilder();
        NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerMWTransferInRequest, msgBuilder);
        this.lastPlayerMWTransferInRequestID = newGuid();

    }

    /**發送 MW 單次心跳請求*/
    private SendMWSingleHeartBeatRequest() {
        if (this.HeartBeatError || RefreshBalanceController.Instance.RespondError) return;
        if (SelfData.Instance.AccountData.WalletType != WalletType.MWSingle)
            return;
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode)
            return;
        egret.setTimeout(this.SendMWSingleHeartBeatRequest, this, 30000);
        let msgBuilder = new MessageBuilder();
        NetworkHandler.Instance.Sned(RemoteConnetionType.Lobby, MsgType.NetMsg_PlayerMWSingleHeartBeatRequest, msgBuilder);
    }

    /**On MW 單次心跳響應*/
    public OnMWSingleHeartBeatRespond(connectionId: number, message: any[]) {
        consoleLog("OnMWSingleHeartBeatRespond: " + JSON.stringify(message));
        if (this.HeartBeatError || RefreshBalanceController.Instance.RespondError) return;
        let errorCode: ErrorCode = message[MWSingleGetBalanceRespond.ErrorCode];
        if (errorCode != ErrorCode.Success) {
            this.HeartBeatError = true;
            SelfData.Instance.PlaySetting.ShowError = true;
            SelfData.Instance.PlaySetting.IsAuto = false;
            SelfData.Instance.PlaySetting.AutoSetting.TotalRound = 0;
            let tip = new MessageTips();
            tip.CreateTips();
            tip.ShowTips(LocalizationCommonTable.Get(1002), LocalizationCommonTable.Get(99997), () => closeWindow(), this);
            //NetworkHandler.Instance.Disconnect(RemoteConnetionType.Account);
            //NetworkHandler.Instance.Disconnect(RemoteConnetionType.Lobby);
        }
    }

    protected async runSetResult() {
        let ui = UIManager.Instance.ShowEffect(SelfData.Instance.CommonPackageName, "setResultTest", true);
        if (ui != null) {
            this.BaseController.view.view.addChild(ui);
            let normal_input = ui.asCom.getChild("normal_input").asTextInput;
            let bonus_input = ui.asCom.getChild("bonus_input").asTextInput;
            let button = ui.asCom.getChild("button").asButton;
            let wait = true;
            button.addClickListener(() => wait = false, this);
            while (wait) await waitForSeconds(0.1);

            let normalText = normal_input.text;
            let bonusText = bonus_input.text;

            console.log("normal result: " + normalText);
            console.log("bonus result: " + bonusText);
            this.BaseController.view.view.removeChild(ui);
            ui = null;

            let normalArray: Array<number> = [];
            let bonusArray: Array<Array<number>> = [];
            try {
                normalArray = JSON.parse(normalText);
                bonusArray = JSON.parse(bonusText);
            } catch (e) {
                alert(e);
                let event = new ClientEvent(ClientMsg.OnShowResultEnd);
                EventManager.Instance.Send(event);
                return;
            }

            GameLogic.Instance.ServerGameResultList = [];
            let result = this.BaseController.createTestGameResult(normalArray, bonusArray, 0);
            GameLogic.Instance.ServerGameResultList.push(result);
        }
    }

    protected async UnitTestSendPlayGame() {
        this.allTotalBet += (SelfData.Instance.PlaySetting.RunTotleBet);
        SelfData.Instance.AccountData.Money -= SelfData.Instance.PlaySetting.RunTotleBet;
        SelfData.Instance.AddRunLog(RunLog.PayBet, "-" + SelfData.Instance.PlaySetting.RunTotleBet);
        let event: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
        EventManager.Instance.Send(event);
        this.SendPlayGame();
    }

    protected ShowUnitTestMessage(): string {
        return "Run " + this.allUnitTestCount
            + "\nWinBet " + this.allWinBet
            + "\nTotalBet " + this.allTotalBet
            + "\nRTP " + ((this.allWinBet / this.allTotalBet) * 100).toFixed(4)
            + "\nNetValue " + ((this.allTotalBet - this.allWinBet))
            + "\nBonusCount " + this.allBonusCount
            + "\nError " + this.unitTestErrorTimes;
    }

    public async onStart(eventdata) {
        /**玩家正在遊戲內返回大廳*/
        if (!this.UnitTest && SlotGameController.isPlaying) {
            consoleLog("SlotGameController.isPlaying is true");
            EventManager.Instance.Send(new ClientEvent(ClientMsg.ResetLobbyButton));
            return;
        }
        SlotGameController.isPlaying = true;
        RefreshBalanceController.Instance.IsPlaying = true;
        if (this.sending) {
            consoleLog("this.sending is true");
            return;
        }
        this.roundBonus = false;
        SelfData.Instance.PlaySetting.SendPlayGame();

        this.winBet = 0;
        if (this.playBefore < 0) {
            this.playBefore = SelfData.Instance.AccountData.Money;
            SelfData.Instance.AccountData.MoneyLog = this.playBefore.toString();
        }
        SelfData.Instance.AddRunLog(RunLog.StartRun, SelfData.Instance.AccountData.Money.toString());

        //-------SetResult------//
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SetResultMode) {
            await this.runSetResult();
        }
        //---------------------//

        //-------UnitTest------//
        if (this.UnitTest) {
            if (!this.unitTestBox) {
                this.unitTestBox = this.BaseController.view.ShowMessage("Stop", this.ShowUnitTestMessage(), this.onUnitTestStop, this);
            }
        }
        //---------------------//
        // 是否開啟免費轉
        if (!SelfData.Instance.IsOpenBonusSpin) {
            //-------確認餘額-------//
            if (SelfData.Instance.AccountData.Money < SelfData.Instance.PlaySetting.RunTotleBet) {
                SelfData.Instance.PlaySetting.IsAuto = false;
                // if (SelfData.Instance.AccountData.WalletType != WalletType.MWSingle) {
                //     let message = new MessageTips();
                //     message.CreateTips();
                //     message.ShowTips(LocalizationCommonTable.Get(1002), LocalizationCommonTable.Get(1006), () => {
                //         let event = new ClientEvent(ClientMsg.NoMoney);
                //         EventManager.Instance.Send(event);
                //         closeWindow();
                //     }, this);
                // }
                // else {
                RefreshBalanceController.Instance.RefreshBalanceTip = new RefreshBalanceTips();
                RefreshBalanceController.Instance.RefreshBalanceTip.ShowTip(() => {
                    SlotGameController.isPlaying = false;
                    RefreshBalanceController.Instance.IsPlaying = false;
                    RefreshBalanceController.Instance.RefreshBalanceTip.ButtonEnable = false;
                    RefreshBalanceController.Instance.NoMoneySyncMWSingleGetBalance = true;
                    RefreshBalanceController.Instance.SendMWSingleGetBalanceRequest();
                }, this);
                //}
                //直接結束
                return;
            } else {
                if (!this.UnitTest) {
                    this.allTotalBet += (SelfData.Instance.PlaySetting.RunTotleBet);
                    SelfData.Instance.AccountData.Money -= SelfData.Instance.PlaySetting.RunTotleBet;
                    SelfData.Instance.AddRunLog(RunLog.PayBet, "-" + SelfData.Instance.PlaySetting.RunTotleBet);
                    //this.buyBonusTempAccountMoney = SelfData.Instance.AccountData.Money;
                    let event: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
                    EventManager.Instance.Send(event);
                }
            }
        }

        //----------開始轉動-----------//
        let base = this.BaseController;
        if (!this.UnitTest) {
            await base.StatrRun();
        }

        //-------確認餘額 等待server回應後才下注-------//
        if (SelfData.Instance.AccountData.WalletType == WalletType.MWSingle) {
            //RefreshBalanceController.Instance.SendMWSingleGetBalanceRequest();
            await waitForFlage(() => !RefreshBalanceController.Instance.WaitMWSingleGetBalance);
        }
        //---------------------//

        //--------發送玩遊戲資料------------//
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode || SelfData.Instance.UrlParam_GameMode == GameMode.SetResultMode) {
            await this.onServerResult();
        }
        else {
            if (this.UnitTest) {
                await this.UnitTestSendPlayGame();
            }
            else {
                this.SendPlayGame();                                                                                                            //發送玩遊戲資料
            }
        }

        await this.getResult();                                                                                                                 //得到遊戲結果資訊

        this.winBet += this.roundWin;
        SelfData.Instance.AccountData.Money += this.roundWin;
        SelfData.Instance.AddRunLog(RunLog.AddMainGameMoney, this.roundWin.toString());

        await this.ShowMainGame();                                                                                                              //顯示主遊戲運行(轉動停止)

        //--------顯示測試結果------------//
        if (this.UnitTest) {
            await base.ShowUnitTestSpResult();
            this.allBonusCount += this.isBonus.length > 0 ? 1 : 0;
        }

        //--------顯示殊遊戲獎金遊戲------------//
        if (this.isBonus.length > 0) {
            this.roundBonus = true;
            this.buyBonusType = BuyBonusType.None;
            this.buyBonusTimes = 0;
            await this.ShowBonusGame(0, 0);
        }

        //--------遊戲結果完成------------//
        if (!this.UnitTest) {
            SelfData.Instance.AddRunLog(RunLog.ResultFinish);
            base.ResultFinish();                                                                                                                 //特殊獎金遊戲結果完成
        }

        this.buyBonusType = BuyBonusType.None;
        this.buyBonusTimes = 0;

        //-------確認儲值-------//
        if (this.rechargeValue > 0) {
            this.showRechargeMessage(this.rechargeValue, async () => {
                SelfData.Instance.AccountData.Money += this.rechargeValue;
                SelfData.Instance.AddRunLog(RunLog.AddRechargeMoney, this.rechargeValue.toString());
                let event2: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
                EventManager.Instance.Send(event2);
                await waitForSeconds(1);
                this.rechargeValue = 0;
            }, this)

            while (this.rechargeValue > 0) {
                await waitForSeconds(0.01);
            }
        }
        //---------------------//

        //-------確認金錢-------//
        SelfData.Instance.AccountData.MoneyLog += ("=" + SelfData.Instance.AccountData.Money);
        SelfData.Instance.AddRunLog(RunLog.EndAccountMoney, SelfData.Instance.AccountData.Money.toString());
        consoleLog("MoneyLog: " + SelfData.Instance.AccountData.MoneyLog);
        consoleLog("RunLog: " + SelfData.Instance.RunLog);
        if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode && SelfData.Instance.UrlParam_GameMode != GameMode.SetResultMode && this.serverResultMoney != SelfData.Instance.AccountData.Money) {
            consoleLog("moneyError0!!! server " + this.serverResultMoney + " != client " + SelfData.Instance.AccountData.Money);
            this.unitTestErrorTimes++;
            this.SendDataErrorLog(this.serverResult.NormalGameResult, this.serverResult.BonusGameResult, this.serverResultMoney, SelfData.Instance.AccountData.Money);
            SelfData.Instance.AccountData.Money = this.serverResultMoney;
        }
        //---------------------//


        //-------確認餘額-------//
        if (SelfData.Instance.AccountData.WalletType == WalletType.MWSingle) {
            RefreshBalanceController.Instance.IsPlaying = false;
            RefreshBalanceController.Instance.SendMWSingleGetBalanceRequest();
            await waitForFlage(() => !RefreshBalanceController.Instance.WaitMWSingleGetBalance);
        }
        //---------------------//

        //this.MarqueeManager.ShowSelfMarquee();
        let event = new ClientEvent(ClientMsg.SelfMarquee);
        EventManager.Instance.Send(event);

        this._getResult = false;
        SlotGameController.isPlaying = false;
        this.playBefore = SelfData.Instance.AccountData.Money;
        SelfData.Instance.AccountData.MoneyLog = this.playBefore.toString();
        SelfData.Instance.RunLog = "";
        this.serverResult = null;


        //-------UnitTest 單元測試------//
        if (this.UnitTest) {
            if (this.unitTestBox === null) {
                let event = new ClientEvent(ClientMsg.OnShowResultEnd);
                EventManager.Instance.Send(event);
                return;
            }
            this.allUnitTestCount++;
            this.allWinBet += this.winBet;
            //this.allBonusCount += this.isBonus.length > 0 ? 1 : 0;
            if (this.unitTestBox) {
                let msg = this.ShowUnitTestMessage();
                let msgline = msg.split("\n").length;

                this.unitTestBox.SetContent(msg, msgline > 7 ? Math.ceil(147 / msgline) : 21);
            }
            let event: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
            EventManager.Instance.Send(event);
            let event2 = new ClientEvent(ClientMsg.StartRun);
            EventManager.Instance.Send(event2);
            return;
        }
        //---------------------//

        //-------確認自動玩-------//
        if (this.CheckAutoSetting()) {
            await waitForSeconds(SlotGameController.AutoWaitSecond);
            let event = new ClientEvent(ClientMsg.StartRun);
            EventManager.Instance.Send(event);
            let event_auto = new ClientEvent(ClientMsg.UpdateAutoCount);
            EventManager.Instance.Send(event_auto);
        }
        else {
            EventManager.Instance.Send(new ClientEvent(ClientMsg.ResetLobbyButton));
        }
        //---------------------//
    }

    /**顯示主遊戲*/
    public async ShowMainGame() {
        let base = this.BaseController;
        if (!this.UnitTest) {
            await base.ShowSpecialPerformance();
        }
        let event = new ClientEvent(ClientMsg.OnGameResult);
        EventManager.Instance.Send(event);

        if (!this.UnitTest) {
            await base.StopRun();
            await base.ShowLineResult();
            await base.ShowNormalResult();
        }
    }

    /**顯示獎金遊戲*/
    public async ShowBonusGame(BonusIndex: number, BonusRoundIndex, redata?: ReData, redataBuyBonus?: boolean) {

        await this.checkResourceLoadOnBackgroundComplete();
        let base = this.BaseController;
        this.currentBonusIndex = BonusIndex;

        if (!this.UnitTest) {
            if (redata != null && !redataBuyBonus) {
                LoadingController.SendLoginLog(LoginLogEnum.GameReady);
                if (this.isShowRedataTip)
                    await this.showRedataTip();
            }

        }
        consoleLog("ShowBonusGame: " + SelfData.Instance.AccountData.Money + " | isBonus: " + JSON.stringify(this.isBonus));

        while (this.isBonus.length > 0) {
            let playGameType: PlayGameType = <PlayGameType>this.isBonus[0];
            if (playGameType === PlayGameType.MainGame) {
                this.isBonus.splice(0, 1);
            }
            else if (playGameType === PlayGameType.BonusSelect) {
                if (SelfData.Instance.PlaySetting.IsAuto && SelfData.Instance.PlaySetting.AutoSetting.IsUntilBonus) {
                    SelfData.Instance.PlaySetting.IsAuto = false;
                    SelfData.Instance.PlaySetting.AutoSetting.TotalRound = 0;
                }
                await this.showSelect();
            }
            else {
                this.bonusRoundIndex = BonusRoundIndex;

                let bonusID = redataBuyBonus ? this.serverResult.BonusGameResult[this.currentBonusIndex - 1][0] : this.serverResult.BonusGameResult[this.currentBonusIndex][0];
                if (!this.UnitTest) {
                    if (redataBuyBonus)
                        await base.ReDataBuyBonus(bonusID, redata);
                    else {
                        await base.MainToBonus(bonusID, redata);
                    }
                    if (redata)
                        await base.SetReData(redata);
                }
                let buyBonusTable: BuyBonusTable = TableManager.Instance.GetTable(BuyBonusTable);
                while (this.currentBonusIndex < this.serverResult.BonusGameResult.length || redataBuyBonus) {

                    if (!redataBuyBonus) {
                        if (bonusID !== this.serverResult.BonusGameResult[this.currentBonusIndex][0]) {
                            bonusID = this.serverResult.BonusGameResult[this.currentBonusIndex][0];
                            await base.BonusToBonus(bonusID);
                        }

                        this._getResult = false;
                        if (base.bonusRoundID.indexOf(bonusID) > -1) {
                            var event: RePlayBonusRoundID = new RePlayBonusRoundID();
                            event.RoundIndex = this.currentBonusIndex;
                            EventManager.Instance.Send(event);
                            await this.showBonusRound();

                        } else if (base.bonusPickID.indexOf(bonusID) > -1) {
                            await this.showBonusPick(redata ? redata.pickData.length : 0);
                        }
                        EventManager.Instance.Send(new ClientEvent(ClientMsg.OnUpdateMoney));
                        this.currentBonusIndex++;
                    }

                    let cost: number = base.BuyBonusCost(this.currentBonusIndex);
                    if (cost > 0) {
                        if (buyBonusTable != null && base.CanBuyBonusTimes(this.currentBonusIndex) > this.buyBonusTimes && this.currentBonusIndex == this.serverResult.BonusGameResult.length && base.CanBuyBonus(this.currentBonusIndex)) {
                            if (!redataBuyBonus) await base.PreBuyBonus();
                            let costNotEnough: boolean = SelfData.Instance.AccountData.Money < cost;
                            let isBuy: boolean = false;
                            if (!this.UnitTest)
                                await base.WaitBuyBonus(this.currentBonusIndex, costNotEnough, buy => isBuy = buy, this);
                            else
                                isBuy = this.UnitTestBuyBonus;
                            await this.buyBonus(isBuy ? base.BuyBonusType() : BuyBonusType.Cancel, cost);
                            if (isBuy) this.buyBonusTimes++;
                            else this.buyBonusTimes = 0;
                        }
                        else {
                            if (buyBonusTable == null) egret.error("BuyBonusError: Table not found");
                            if (base.CanBuyBonusTimes(this.currentBonusIndex) <= this.buyBonusTimes) egret.error("BuyBonusError: CanBuyTimes " + base.CanBuyBonusTimes(this.currentBonusIndex) + " <= BuyTimes " + this.buyBonusTimes);
                            if (this.currentBonusIndex != this.serverResult.BonusGameResult.length) egret.error("BuyBonusError: CurrentIndex " + this.currentBonusIndex + " != MaxIndex " + this.serverResult.BonusGameResult.length);
                            if (!base.CanBuyBonus(this.currentBonusIndex)) egret.error("BuyBonusError: Can't buy bonus");
                        }
                    }

                    redataBuyBonus = false;
                }
                this.isBonus.splice(0, 1);
            }
        }
        if (!this.UnitTest) {
            await base.BonusToMain();
        }
        //RePlay
        SelfData.Instance.PlayReplay = false;
        if (SelfData.Instance.IsRePlay) {
            SelfData.Instance.IsRePlay = false;
            var eventmoney: BuyBonusChangeBet = new BuyBonusChangeBet();
            eventmoney._BetID = SelfData.Instance.BetIndex;
            EventManager.Instance.Send(eventmoney);

            var eventend: OnRePlayEnd = new OnRePlayEnd();
            EventManager.Instance.Send(eventend);
        }
        //
    }

    /**開始時購買獎金*/
    public async BuyBonusOnStart(eventdata) {
        // if (!this.UnitTest && SlotGameController.isPlaying) {
        //     consoleLog("SlotGameController.isPlaying is true");
        //     EventManager.Instance.Send(new ClientEvent(ClientMsg.ResetLobbyButton));
        //     return;
        // }
        SlotGameController.isPlaying = true;
        RefreshBalanceController.Instance.IsPlaying = true;
        if (this.UnitTest && this.sending) {
            consoleLog("this.sending is true");
            return;
        }
        this.roundBonus = false;
        SelfData.Instance.PlaySetting.SendPlayGame();

        this.winBet = 0;
        if (this.playBefore < 0) {
            this.playBefore = SelfData.Instance.AccountData.Money;
            SelfData.Instance.AccountData.MoneyLog = this.playBefore.toString();
        }
        SelfData.Instance.AddRunLog(RunLog.StartRun, SelfData.Instance.AccountData.Money.toString());

        //-------SetResult------//
        //if (SelfData.Instance.UrlParam_GameMode == GameMode.SetResultMode) {
        //    await this.runSetResult();
        // }
        //---------------------//

        //-------UnitTest------//
        if (this.UnitTest) {
            if (!this.unitTestBox) {
                this.unitTestBox = this.BaseController.view.ShowMessage("Stop",
                    "Run " + this.allUnitTestCount
                    + "\nWinBet " + this.allWinBet
                    + "\nTotalBet " + this.allTotalBet
                    + "\nRTP " + ((this.allWinBet / this.allTotalBet) * 100).toFixed(4)
                    + "\nNetValue " + ((this.allTotalBet - this.allWinBet))
                    + "\nBonusCount " + this.allBonusCount
                    + "\nError " + this.unitTestErrorTimes, this.onUnitTestStop, this);
            }
        }

        // this.allTotalBet += (SelfData.Instance.PlaySetting.RunTotleBet);
        // SelfData.Instance.AccountData.Money -= SelfData.Instance.PlaySetting.RunTotleBet;
        // SelfData.Instance.AddRunLog(RunLog.PayBet, "-" + SelfData.Instance.PlaySetting.RunTotleBet);
        // //this.buyBonusTempAccountMoney = SelfData.Instance.AccountData.Money;
        // let event: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
        // EventManager.Instance.Send(event);

        let base = this.BaseController;
        if (!this.UnitTest) {
            await base.StatrRun();
        }
        await this.onBuyServerResult();
        this.winBet += this.roundWin;
        SelfData.Instance.AccountData.Money += this.roundWin;
        SelfData.Instance.AddRunLog(RunLog.AddMainGameMoney, this.roundWin.toString());

        await this.ShowMainGame();

        if (this.UnitTest) {
            await base.ShowUnitTestSpResult();
            this.allBonusCount += this.isBonus.length > 0 ? 1 : 0;
        }

        if (this.isBonus.length > 0) {
            this.roundBonus = true;
            this.buyBonusType = BuyBonusType.None;
            this.buyBonusTimes = 0;
            await this.ShowBonusGame(0, 0);
        }

        if (!this.UnitTest) {
            SelfData.Instance.AddRunLog(RunLog.ResultFinish);
            base.ResultFinish();
        }

        this.buyBonusType = BuyBonusType.None;
        this.buyBonusTimes = 0;


        //-------確認儲值-------//
        if (this.rechargeValue > 0) {
            this.showRechargeMessage(this.rechargeValue, async () => {
                SelfData.Instance.AccountData.Money += this.rechargeValue;
                SelfData.Instance.AddRunLog(RunLog.AddRechargeMoney, this.rechargeValue.toString());
                let event2: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
                EventManager.Instance.Send(event2);
                await waitForSeconds(1);
                this.rechargeValue = 0;
            }, this)

            while (this.rechargeValue > 0) {
                await waitForSeconds(0.01);
            }
        }
        //---------------------//

        //-------確認金錢-------//
        SelfData.Instance.AccountData.MoneyLog += ("=" + SelfData.Instance.AccountData.Money);
        SelfData.Instance.AddRunLog(RunLog.EndAccountMoney, SelfData.Instance.AccountData.Money.toString());
        consoleLog("MoneyLog: " + SelfData.Instance.AccountData.MoneyLog);
        consoleLog("RunLog: " + SelfData.Instance.RunLog);
        if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode && SelfData.Instance.UrlParam_GameMode != GameMode.SetResultMode && this.serverResultMoney != SelfData.Instance.AccountData.Money) {
            consoleLog("moneyError2!!! server " + this.serverResultMoney + " != client " + SelfData.Instance.AccountData.Money);
            this.unitTestErrorTimes++;
            this.SendDataErrorLog(this.serverResult.NormalGameResult, this.serverResult.BonusGameResult, this.serverResultMoney, SelfData.Instance.AccountData.Money);
            SelfData.Instance.AccountData.Money = this.serverResultMoney;
        }
        //---------------------//


        //-------確認餘額-------//
        if (SelfData.Instance.AccountData.WalletType == WalletType.MWSingle) {
            RefreshBalanceController.Instance.IsPlaying = false;
            RefreshBalanceController.Instance.SendMWSingleGetBalanceRequest();
            await waitForFlage(() => !RefreshBalanceController.Instance.WaitMWSingleGetBalance);
        }
        //---------------------//

        this.MarqueeManager.ShowSelfMarquee();

        this._getResult = false;
        SlotGameController.isPlaying = false;
        this.playBefore = SelfData.Instance.AccountData.Money;
        SelfData.Instance.AccountData.MoneyLog = this.playBefore.toString();
        SelfData.Instance.RunLog = "";
        this.serverResult = null;


        //-------UnitTest------//
        if (this.UnitTest) {
            if (this.unitTestBox === null) {
                let event = new ClientEvent(ClientMsg.OnShowResultEnd);
                EventManager.Instance.Send(event);
                return;
            }
            this.allUnitTestCount++;
            this.allWinBet += this.winBet;
            //this.allBonusCount += this.isBonus.length > 0 ? 1 : 0;
            if (this.unitTestBox) {
                this.unitTestBox.SetContent("Run " + this.allUnitTestCount
                    + "\nWinBet " + this.allWinBet
                    + "\nTotalBet " + this.allTotalBet
                    + "\nRTP " + ((this.allWinBet / this.allTotalBet) * 100).toFixed(4)
                    + "\nNetValue " + ((this.allTotalBet - this.allWinBet))
                    + "\nBonusCount " + this.allBonusCount
                    + "\nError " + this.unitTestErrorTimes);
            }
            let event: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
            EventManager.Instance.Send(event);
            let event2 = new ClientEvent(ClientMsg.StartRun);
            EventManager.Instance.Send(event2);
            return;
        }
        //---------------------//

        //-------確認自動玩-------//
        if (this.CheckAutoSetting()) {
            await waitForSeconds(SlotGameController.AutoWaitSecond);
            let event = new ClientEvent(ClientMsg.StartRun);
            EventManager.Instance.Send(event);
            let event_auto = new ClientEvent(ClientMsg.UpdateAutoCount);
            EventManager.Instance.Send(event_auto);
        }
        else {
            EventManager.Instance.Send(new ClientEvent(ClientMsg.ResetLobbyButton));
        }
        //---------------------//
    }

    protected OnUpdateMoneyEnd() {
        this.waitUpdateMoney = false;
    }

    protected async buyBonus(buyBonusType: BuyBonusType, cost: number) {
        let base = this.BaseController;
        this._getResult = false;
        SelfData.Instance.AddRunLog(RunLog.SendBuyBonus, SelfData.Instance.AccountData.Money.toString());
        this.buyBonusType = buyBonusType;

        this.isBonus.push(PlayGameType.BuyBonus);

        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode || SelfData.Instance.UrlParam_GameMode == GameMode.SetResultMode) {
            this._getResult = false;
            this.onServerResult();
        }
        else {
            this.SendBuyBonus(buyBonusType);
        }

        await this.getResult();

        let idx = this.isBonus.indexOf(PlayGameType.BuyBonus);
        this.isBonus.splice(idx, 1);

        if (buyBonusType != BuyBonusType.None && buyBonusType != BuyBonusType.Cancel) {
            this.allTotalBet += cost;
            //let AccountMoney = SelfData.Instance.AccountData.Money;
            //SelfData.Instance.AccountData.Money = this.buyBonusTempAccountMoney;
            SelfData.Instance.AccountData.Money -= cost;
            SelfData.Instance.AddRunLog(RunLog.BuyBonus, "-" + cost);
            this.waitUpdateMoney = true;
            let event: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
            EventManager.Instance.Send(event);
            //await waitForFlage(() => !this.waitUpdateMoney);
            //SelfData.Instance.AccountData.Money = AccountMoney;
            //SelfData.Instance.AccountData.Money -= cost;
        }

        this.buyBonusType = BuyBonusType.None;
    }

    private SendBuyBonus(buyBonusType: BuyBonusType) {
        let request: number[] = [];
        request.push(SelfData.Instance.PlaySetting.Bet);
        request.push(SelfData.Instance.PlaySetting.CoinValue);
        request.push(PlayGameType.BuyBonus);
        request.push(buyBonusType); //1=+5, 99=cancel
        request.push(SelfData.Instance.UseMultiply ? SelfData.Instance.PlaySetting.MultiplyValue : 1);
        request.push(SelfData.Instance.PlaySetting.OtherSetting);
        GameWorldManager.Instance.SendPlayOneGame(request);
        this.sending = true;
    }

    public SendRePlay(id: number, round: number) {
        let request: number[] = [];
        request.push(SelfData.Instance.PlaySetting.Bet);
        request.push(SelfData.Instance.PlaySetting.CoinValue);
        request.push(PlayGameType.BuyBonus);
        request.push(1); //1=+5, 99=cancel
        request.push(SelfData.Instance.UseMultiply ? SelfData.Instance.PlaySetting.MultiplyValue : 1);
        request.push(SelfData.Instance.PlaySetting.OtherSetting);
        GameWorldManager.Instance.SendPlayOneGame(request);
        this.sending = true;
    }

    public SendSaveOrPlayBonus(SaveOrPlayType: SaveOrPlayType) {
        let request: number[] = [];
        request.push(SelfData.Instance.PlaySetting.Bet);
        request.push(SelfData.Instance.PlaySetting.CoinValue);
        request.push(PlayGameType.SaveSelect);
        request.push(SaveOrPlayType); //0 = play  1 = save
        request.push(SelfData.Instance.UseMultiply ? SelfData.Instance.PlaySetting.MultiplyValue : 1);
        request.push(SelfData.Instance.PlaySetting.OtherSetting);
        GameWorldManager.Instance.SendPlayOneGame(request);
        this.sending = true;
    }

    protected async onBuyBonusResult() {
        let base = this.BaseController;
        await base.OnBuyBonusResult(this.currentBonusIndex, this.buyBonusType);
        this.serverResult = GameLogic.Instance.ServerGameResultList.shift();
        this.serverResultMoney = this.serverResult.ResultMoney;
        this._getResult = true;
    }

    protected async onBuyBonusRunResult() {
        let base = this.BaseController;
        await base.OnBuyBonusResult(this.currentBonusIndex, this.buyBonusType);
        this._getResult = true;
    }

    protected async onRePlayGameRunResult() {
        let base = this.BaseController;
        await base.OnRePlayBonusResult();
        this._getResult = true;
    }

    /**顯示選擇*/
    protected async showSelect() {
        let base = this.BaseController;
        this._getResult = false;
        SelfData.Instance.AddRunLog(RunLog.ShowSelectBonus);
        await base.ShowSelectBonus();                                                                                                           //顯示選擇遊戲獎勵
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode || SelfData.Instance.UrlParam_GameMode == GameMode.SetResultMode) {
            this.onServerResult();
        }
        await this.getResult();
    }

    /**顯示獎金回合*/
    protected async showBonusRound(bonusRound2: boolean = false) {
        let base = this.BaseController;


        if (!this.UnitTest) {
            await base.ShowBonus();                                                                                                               //顯示獎金遊戲
        }

        //<-------------特殊模式或自定結果------------->
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode || SelfData.Instance.UrlParam_GameMode == GameMode.SetResultMode) {
            await this.onBonusGameResult();
        }
        else if (SelfData.Instance.IsRePlay) {
            await this.onRePlayBonusGameResult();
        }
        else {
            this.SendBonusGame(bonusRound2);
        }

        await this.getResult();

        if (!this.UnitTest) {
            await base.ShowBonusStop();
        }

        this.winBet += this.roundWin;
        if (!SelfData.Instance.IsRePlay) {
            SelfData.Instance.AccountData.Money += this.roundWin;
            SelfData.Instance.AddRunLog(RunLog.AddBonusMoney, this.roundWin.toString());
        }
        let event = new ClientEvent(ClientMsg.OnGameResult);
        EventManager.Instance.Send(event);

        if (!this.UnitTest) {
            await base.ShowBonusResult();                                   //免費遊戲結果
            await waitForSeconds(SlotGameController.AutoWaitSecond);
        }
        else
            await base.ShowUnitTestSpResult();

        this.bonusRoundIndex++;
    }

    protected async showBonusPick(pickCount: number) {
        let base = this.BaseController;
        this.pickCount = pickCount;
        let pickResult = base.GetPicUpkResult(this.serverResult.BonusGameResult[this.currentBonusIndex]);
        let e = new ClientEvent(ClientMsg.SendPickUPGameResult)
        e.eventData = pickResult;
        EventManager.Instance.Send(e);
        if (!this.UnitTest) {
            await waitForFlage(() => { return this.pickCount === (pickResult.length - 2) });
            await waitForSeconds(0.1);
        } else {
            let count = this.pickCount;
            if ((pickResult.length - 2) === 0) {
                let e = new ClientEvent(ClientMsg.OnPickUP)
                e.eventData = 0;
                this.SendPickGame(e);
                await waitForFlage(() => {
                    return this.pickCount > count;
                });
            } else {
                for (let i = 2, max = pickResult.length; i < max; ++i) {
                    let e = new ClientEvent(ClientMsg.OnPickUP)
                    e.eventData = i;
                    this.SendPickGame(e);
                    await waitForFlage(() => {
                        return this.pickCount > count;
                    });
                    count = this.pickCount
                }
                await waitForFlage(() => {
                    return this.pickCount === (pickResult.length - 2)
                });
            }
        }
        this.roundWin = pickResult[1] * SelfData.Instance.PlaySetting.RunBet;
        this.winBet += this.roundWin;
        SelfData.Instance.AccountData.Money += this.roundWin;
        SelfData.Instance.AddRunLog(RunLog.AddBonusMoney, this.roundWin.toString());
        let event = new ClientEvent(ClientMsg.OnGameResult);
        EventManager.Instance.Send(event);

        if (!this.UnitTest) {
            await base.ShowPickUPResult();
            await waitForSeconds(SlotGameController.AutoWaitSecond);
        }
        else
            await base.ShowUnitTestSpResult();
    }

    /**開始重播*/
    public async RePlayOnStart(eventdata) {
        SlotGameController.isPlaying = true;
        RefreshBalanceController.Instance.IsPlaying = true;
        if (this.UnitTest && this.sending) {
            consoleLog("this.sending is true");
            return;
        }
        this.roundBonus = false;
        SelfData.Instance.PlaySetting.SendPlayGame();
        this.winBet = 0;
        if (this.playBefore < 0) {
            this.playBefore = SelfData.Instance.AccountData.Money;
            SelfData.Instance.AccountData.MoneyLog = this.playBefore.toString();
        }
        SelfData.Instance.AddRunLog(RunLog.StartRun, SelfData.Instance.AccountData.Money.toString());

        let base = this.BaseController;
        if (!this.UnitTest) {
            await base.StatrRun();
        }
        await this.onRePlayResult();
        this.winBet += this.roundWin;

        await this.ShowMainGame();

        if (this.UnitTest) {
            await base.ShowUnitTestSpResult();
            this.allBonusCount += this.isBonus.length > 0 ? 1 : 0;
        }

        if (this.isBonus.length > 0) {
            this.roundBonus = true;
            this.buyBonusType = BuyBonusType.None;
            this.buyBonusTimes = 0;
            await this.ShowBonusGame(0, 0);
        }

        if (!this.UnitTest) {
            SelfData.Instance.AddRunLog(RunLog.ResultFinish);
            base.ResultFinish();
        }

        this.buyBonusType = BuyBonusType.None;
        this.buyBonusTimes = 0;
        this._getResult = false;
        SlotGameController.isPlaying = false;
        this.playBefore = SelfData.Instance.AccountData.Money;
        SelfData.Instance.AccountData.MoneyLog = this.playBefore.toString();
        SelfData.Instance.RunLog = "";
        this.serverResult = null;
        //-------確認自動玩-------//
        if (this.CheckAutoSetting()) {
            await waitForSeconds(SlotGameController.AutoWaitSecond);
            let event = new ClientEvent(ClientMsg.StartRun);
            EventManager.Instance.Send(event);
            let event_auto = new ClientEvent(ClientMsg.UpdateAutoCount);
            EventManager.Instance.Send(event_auto);
        }
        else {
            EventManager.Instance.Send(new ClientEvent(ClientMsg.ResetLobbyButton));
        }
        //---------------------//
    }

    /**關於服務器結果*/
    public async onServerResult() {
        if (SelfData.Instance.ReplaySomeOneBonus) {
            await this.onRePlayGameRunResult();
        }
        else if (this.isBonus.indexOf(PlayGameType.BuyBonus) > -1) {
            await this.onBuyBonusRunResult();
        }
        else if (this.isBonus.indexOf(PlayGameType.BonusSelect) > -1) {
            await this.onSelectGameResult();
        }
        else if (this.serverResult == null) {
            await this.onGameResult();
        }
        else {
            await this.onBonusGameResult();
        }
    }
    // public async onServerResult() {
    //     if (this.serverResult == null) {
    //         await this.onGameResult();
    //     }
    //     else if (this.isBonus.indexOf(PlayGameType.BonusSelect) > -1) {
    //         await this.onSelectGameResult();
    //     }
    //     else if (this.isBonus.indexOf(PlayGameType.BuyBonus) > -1) {
    //         await this.onBuyBonusResult();
    //     }
    //     else {
    //         await this.onBonusGameResult();
    //     }
    // }

    public async onRePlayResult() {
        await this.onRePlayGameResult();
    }

    /**關於重播遊戲結果*/
    public async onRePlayGameResult() {
        consoleLog("onRePlayGameResult");
        //this.BaseController.createSpecialGameResult();
        this.serverResult = GameLogic.Instance.ServerGameResultList.shift();
        this.serverResultMoney = this.serverResult.ResultMoney;
        GameLogic.Instance.ClientBonusGameResult = copyArray(this.serverResult.BonusGameResult, 0, this.serverResult.BonusGameResult.length);
        this.roundWin = this.BaseController.OnGameResult(this.serverResult.NormalGameResult, this.serverResult);
        this._getResult = true;
        this.isBonus = copyArray(GameLogic.Instance.SlotResult.isBonus, 0, GameLogic.Instance.SlotResult.isBonus.length);

    }

    public async onBuyServerResult() {
        await this.onGameResult();
    }

    /**關於遊戲結果*/
    public async onGameResult() {
        consoleLog("onGameResult");
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode)//&& GameLogic.Instance.ServerGameResultList.length == 0)
            this.BaseController.createSpecialGameResult();
        this.serverResult = GameLogic.Instance.ServerGameResultList.shift();
        this.serverResultMoney = this.serverResult.ResultMoney;
        GameLogic.Instance.ClientBonusGameResult = copyArray(this.serverResult.BonusGameResult, 0, this.serverResult.BonusGameResult.length);
        if (this.serverResult.TransferIn > 0) {
            this.showRechargeMessage(this.serverResult.TransferIn, async () => {
                SelfData.Instance.AccountData.Money += this.serverResult.TransferIn;
                SelfData.Instance.AddRunLog(RunLog.AddTransferInMoney, this.serverResult.TransferIn.toString());
                let event2: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
                EventManager.Instance.Send(event2);
                this.roundWin = this.BaseController.OnGameResult(this.serverResult.NormalGameResult, this.serverResult);
                await waitForSeconds(1);
                this._getResult = true;
            }, this)
        } else {
            this.roundWin = this.BaseController.OnGameResult(this.serverResult.NormalGameResult, this.serverResult);
            this._getResult = true;
        }
        this.isBonus = copyArray(GameLogic.Instance.SlotResult.isBonus, 0, GameLogic.Instance.SlotResult.isBonus.length);

    }

    public async onRePlayBonusGameResult(bonusRound2: boolean = false) {
        if (!SelfData.Instance.PlayReplay) {
            this.serverResult = GameLogic.Instance.ServerBonusGameResultList.shift();
        }
        SelfData.Instance.PlayReplay = true;
        GameLogic.Instance.ClientBonusGameResult = copyArray(this.serverResult.BonusGameResult, 0, this.serverResult.BonusGameResult.length);


        await this.onBonusGameResult(bonusRound2);
    }

    public async onSingleBonusGameResult(event: ClientEvent) {
        this.serverResult = event.eventData;
        this.serverResultMoney = this.serverResult.ResultMoney;
        await this.onBonusGameResult(true);
        this.sending = false;
    }

    public async onBonusGameResult(bonusRound2: boolean = false) {
        if (GameLogic.Instance.ServerBonusGameResultList.length > 0) {
            let result = GameLogic.Instance.ServerBonusGameResultList.shift();
            this.serverResultMoney = result.ResultMoney;
        }
        consoleLog("onBonusGameResult");
        //let type: PlayGameType = <PlayGameType>Math.abs(this.serverResult.BonusGameResult[this.currentBonusIndex][0]);
        if (bonusRound2) {
            //新流程 BonusRound2 是單局單局回來 BonusGameResult是空的
            //TODO: 目前回傳值 前面沒有塞-1 先暫時處理
            if (this.serverResult.NormalGameResult[0] > -1)
                this.serverResult.NormalGameResult.unshift(-1);
            this.roundWin = this.BaseController.OnBonusGameResult(copyArray(this.serverResult.NormalGameResult, 0, this.serverResult.NormalGameResult.length));
        }
        else {
            this.roundWin = this.BaseController.OnBonusGameResult(this.serverResult.BonusGameResult[this.currentBonusIndex]);
        }
        this._getResult = true;
    }

    /**在選擇遊戲結果*/
    public async onSelectGameResult() {
        if (GameLogic.Instance.ServerBonusGameResultList.length > 0) {
            let result = GameLogic.Instance.ServerBonusGameResultList.shift();
            this.serverResultMoney = result.ResultMoney;
            this.serverResult.BonusGameResult = result.BonusGameResult; //this.serverResult.BonusGameResult.concat(result.BonusGameResult);



            GameLogic.Instance.ClientBonusGameResult = copyArray(result.BonusGameResult, 0, result.BonusGameResult.length);
            await this.BaseController.OnSelectGameResult(this.serverResult.BonusGameResult);
        }
        let idx = this.isBonus.indexOf(PlayGameType.BonusSelect);
        this.isBonus.splice(idx, 1);
        this._getResult = true;
    }

    public async onRespinGameResult() {
        // if (GameLogic.Instance.ServerBonusGameResultList.length > 0) {
        //     let result = GameLogic.Instance.ServerBonusGameResultList.shift();
        //     this.serverResultMoney = result.ResultMoney;
        //     this.serverResult.BonusGameResult = result.BonusGameResult;
        //     //let idx = this.isBonus.indexOf(PlayGameType.MarkRespin);
        //     //this.isBonus.splice(idx);
        // }
        this._getResult = true;
    }

    public async getResult() {
        SelfData.Instance.AddRunLog(RunLog.WaitGetResult);
        while (!this._getResult) {
            await waitForSeconds(0.01);
        }
        SelfData.Instance.AddRunLog(RunLog.GetResult);
        this.sending = false;
    }

    public async WaitRedata() {
        while (!this.waitReData) {
            await waitForSeconds(0.01);
        }
    }

    public OnMarquee() {
        if (this.MarqueeManager != null) return;
        this.MarqueeManager = new Marquee();
        this.MarqueeManager.Init();
    }

    private onDisconnected() {
        if (!this.showDisconnected) {
            this.showDisconnected = true;
            SelfData.Instance.PlaySetting.ErrorInfo.push(90000);
            let event: ClientEvent = new ClientEvent(ClientMsg.ShowErrorWindow);
            EventManager.Instance.Send(event);
            // let message = new MessageTips();
            // message.CreateTips();
            // message.ShowTips(LocalizationCommonTable.Get(1002), LocalizationCommonTable.Get(90000), () => { closeWindow(); }, this);
        }
    }

    private OnKickPlayerRespond() {
        let tableKey = LocalizationKey.ErrorCode + ErrorCode.AccountKickByDuplicatedLogin;
        SelfData.Instance.PlaySetting.ErrorInfo.push(tableKey);
        let event: ClientEvent = new ClientEvent(ClientMsg.ShowErrorWindow);
        EventManager.Instance.Send(event);
        //UIManager.Instance.ShowErrorWindow("", ErrorCode.AccountKickByDuplicatedLogin, () => { closeWindow(); }, this, null);
    }

    private SyncMWSingleGetBalance() {
        if (this.HeartBeatError || RefreshBalanceController.Instance.RespondError) return;
        if (SelfData.Instance.AccountData.WalletType != WalletType.MWSingle)
            return;
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode)
            return;

        let curTime: number = new Date().getTime();
        if (RefreshBalanceController.Instance.LastMWSingleGetBalanceTime <= 0)
            RefreshBalanceController.Instance.LastMWSingleGetBalanceTime = curTime;

        if (RefreshBalanceController.Instance.WaitMWSingleGetBalance) {
            RefreshBalanceController.Instance.LastMWSingleGetBalanceTime = curTime;
            RefreshBalanceController.Instance.MWSingleGetBalanceTimer = 0;
            return;
        }

        if (RefreshBalanceController.Instance.IsPlaying) {
            RefreshBalanceController.Instance.LastMWSingleGetBalanceTime = curTime;
            RefreshBalanceController.Instance.MWSingleGetBalanceTimer = 0;
            return;
        }

        let deltaTime: number = curTime - RefreshBalanceController.Instance.LastMWSingleGetBalanceTime;
        RefreshBalanceController.Instance.MWSingleGetBalanceTimer += deltaTime;

        if (RefreshBalanceController.Instance.MWSingleGetBalanceTimer >= 10000) {
            RefreshBalanceController.Instance.SendMWSingleGetBalanceRequest();
            RefreshBalanceController.Instance.MWSingleGetBalanceTimer = 0;
        }

        RefreshBalanceController.Instance.LastMWSingleGetBalanceTime = curTime;
    }

    /**在 MW 轉入*/
    private OnMWTransferIn(connectionId: number, message: any[]) {
        this.lastPlayerMWTransferInRequestID = "";
        let errorCode: ErrorCode = message[MWTransferIn.ErrorCode];
        let money: number = message[MWTransferIn.Amount];
        if (errorCode != ErrorCode.Success || money === 0) {
            return;
        }
        if (!SlotGameController.isPlaying) {
            this.showRechargeMessage(money, async () => {
                SelfData.Instance.AccountData.Money += money;
                SelfData.Instance.AddRunLog(RunLog.AddMWTransferInMoney, money.toString());
                let event2: ClientEvent = new ClientEvent(ClientMsg.OnUpdateMoney);
                EventManager.Instance.Send(event2);
                await waitForSeconds(1);
            }, this)
        }
        else {
            this.rechargeValue += money;
        }
    }

    protected SendPlayGame() {
        let sendData: number[] = [];
        sendData.push(SelfData.Instance.PlaySetting.Bet);
        sendData.push(SelfData.Instance.PlaySetting.CoinValue);
        sendData.push(PlayGameType.MainGame); // 遊戲類型
        sendData.push(0); // 遊戲狀態(freegame第幾局或bonusgame選哪個選項)
        sendData.push(SelfData.Instance.UseMultiply ? SelfData.Instance.PlaySetting.MultiplyValue : 1);
        sendData.push(SelfData.Instance.PlaySetting.OtherSetting);
        if (SelfData.Instance.AccountData.BonusCode && SelfData.Instance.IsOpenBonusSpin && SelfData.Instance.AccountData.BonusCode_FreeSpin > 0) {
            sendData.push(1);
        }
        else
            sendData.push(0);
        GameWorldManager.Instance.SendPlayOneGame(sendData);
        this.sending = true;
    }

    protected SendBonusGame(bonusRound2: boolean = false) {
        let request: number[] = [];
        request.push(SelfData.Instance.PlaySetting.Bet);
        request.push(SelfData.Instance.PlaySetting.CoinValue);
        request.push(bonusRound2 ? PlayGameType.BonusRound2 : PlayGameType.BonusRound); ////BonusRound2 不會一開始就回傳 freegame所有盤面
        request.push(this.bonusRoundIndex); // 第三個 如果是free game 會傳第幾次  翻牌的話 會傳玩家翻了第幾個   選擇的話 會是玩家選第幾個
        //console.log("SendBonusGame: " + JSON.stringify(request));
        request.push(SelfData.Instance.UseMultiply ? SelfData.Instance.PlaySetting.MultiplyValue : 1);
        request.push(SelfData.Instance.PlaySetting.OtherSetting);
        GameWorldManager.Instance.SendPlayOneGame(request);
        this.sending = true;
    }

    protected SendWheelSpinStep(startRun: boolean) {
        if (startRun) SelfData.Instance.AddRunLog(RunLog.WheelGamble);
        else SelfData.Instance.AddRunLog(RunLog.WheelCollect);
        let sendData: number[] = [];
        sendData.push(SelfData.Instance.PlaySetting.Bet);
        sendData.push(SelfData.Instance.PlaySetting.CoinValue);
        sendData.push(PlayGameType.SpinStep);
        sendData.push(startRun ? 0 : 1); //0=開始轉, 1=停止
        sendData.push(SelfData.Instance.UseMultiply ? SelfData.Instance.PlaySetting.MultiplyValue : 1);
        sendData.push(SelfData.Instance.PlaySetting.OtherSetting);
        GameWorldManager.Instance.SendPlayOneGame(sendData);
        this.sending = true;
    }

    /**發送挑選遊戲*/
    private SendPickGame(event: ClientEvent) {
        let pickIdx = event.eventData;
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode || SelfData.Instance.UrlParam_GameMode == GameMode.SetResultMode) {
            let e = new ClientEvent(ClientMsg.PickUPGameResultRespond);
            e.eventData = pickIdx;
            EventManager.Instance.Send(e);
            return;
        }
        let request: number[] = [];
        request.push(SelfData.Instance.PlaySetting.Bet);
        request.push(SelfData.Instance.PlaySetting.CoinValue);
        request.push(PlayGameType.BonusPick)
        request.push(pickIdx); // 第三個 如果是free game 會傳第幾次  翻牌的話 會傳玩家翻了第幾個   選擇的話 會是玩家選第幾個
        //console.log("SendSelectionGame: " + JSON.stringify(request));
        request.push(SelfData.Instance.UseMultiply ? SelfData.Instance.PlaySetting.MultiplyValue : 1);
        request.push(SelfData.Instance.PlaySetting.OtherSetting);
        GameWorldManager.Instance.SendPlayOneGame(request);
    }

    private onPickUPGameResultRespond(event: ClientEvent) {
        this.serverResultMoney = event.eventData.ResultMoney;
        this.pickCount++;
    }

    /**顯示充值信息*/
    protected showRechargeMessage(addmoney: number, callback: Function, callbackonj: any) {
        let content = toCoinToString(addmoney);
        let box = new MessageTips();
        box.CreateTips();
        box.ShowTips(LocalizationCommonTable.Get(1002), LocalizationCommonTable.Get(1011) + content, callback, callbackonj)
    }

    protected onUnitTestStop() {
        this.unitTestBox = null;
        this.winBet = 0;
        this.allUnitTestCount = 0;
        this.allWinBet = 0;
        this.allTotalBet = 0;
        this.allBonusCount = 0;
        this.unitTestErrorTimes = 0;
    }

    /**檢查自動設置*/
    protected CheckAutoSetting(): boolean {
        if (SelfData.Instance.PlaySetting.IsAuto) {
            let auto = true;
            if (SelfData.Instance.PlaySetting.AutoSetting.IsUnlimitRound) {
                SelfData.Instance.PlaySetting.AutoSetting.TotalRound++;
            } else if (SelfData.Instance.PlaySetting.AutoSetting.TotalRound > 0) {
                if (SelfData.Instance.PlaySetting.AutoSetting.TotalRound === 1) {
                    auto = false;
                }
                SelfData.Instance.PlaySetting.AutoSetting.TotalRound--;
            }

            if (SelfData.Instance.PlaySetting.AutoSetting.CheckLowerLimitMoney) {
                if (toCoin(SelfData.Instance.AccountData.Money) <= SelfData.Instance.PlaySetting.AutoSetting.LowerLimitMoney) {
                    auto = false;
                }
            }
            if (SelfData.Instance.PlaySetting.AutoSetting.CheckSingleWinMoney) {
                if (toCoin(this.roundWin) >= SelfData.Instance.PlaySetting.AutoSetting.SingleWinMoney) {
                    auto = false;
                }
            }
            if (SelfData.Instance.PlaySetting.AutoSetting.CheckUpperLimitMoney) {
                if (toCoin(SelfData.Instance.AccountData.Money) >= SelfData.Instance.PlaySetting.AutoSetting.UpperLimitMoney) {
                    auto = false;
                }
            }
            if (SelfData.Instance.PlaySetting.AutoSetting.IsUntilBonus) {
                if (this.roundBonus) {
                    auto = false;
                }
            }
            if (SelfData.Instance.PlaySetting.AutoSetting.OtherSetting != null && SelfData.Instance.PlaySetting.AutoSetting.OtherSetting()) {
                auto = false;
            }
            if (!auto) {
                SelfData.Instance.PlaySetting.AutoSetting.TotalRound = 0;
                let event = new ClientEvent(ClientMsg.AutoStopRun);
                EventManager.Instance.Send(event);
                SelfData.Instance.PlaySetting.IsAuto = false;
                this.BaseController.ResultFinish();
            }
            return auto;
        }
        return false;
    }


    public async setReData() {
        this.playBefore = SelfData.Instance.AccountData.Money;
        SelfData.Instance.AccountData.MoneyLog = this.playBefore.toString();
        let getMoney = 0;
        let base = this.BaseController;
        let showRedata = false;
        base.isRedata = true;
        if (SelfData.Instance.UrlParam_RePlayID != "") {
            if (base.FirstIconPlate.length > 0) {
                let ran = randomInt(0, base.FirstIconPlate.length, false);
                let data = base.GetReDateResult(base.FirstIconPlate[ran]);
                base.view.slotWheelManager.SetAllShowItem(data);
            }
            LoadingController.SendLoginLog(LoginLogEnum.GameReady);
            this.serverResult = null;
            base.isRedata = false;
            await this.checkResourceLoadOnBackgroundComplete();
            let dialog = new MessageTips();
            dialog.CreateTips_MWUI();
            dialog.ShowTips(LocalizationCommonTable.Get(1002),
                LocalizationCommonTable.Get(10000013).format(SelfData.Instance.UrlParam_RePlayID),
                () => {
                    var event: ShowLadderReplay = new ShowLadderReplay();
                    event.Type = 2;
                    EventManager.Instance.Send(event);
                },
                this, );
            return;
        }

        if (!SelfData.Instance.AccountData.ClientData || !SelfData.Instance.AccountData.ClientData.GameData) {
            if (base.FirstIconPlate.length > 0) {
                let ran = randomInt(0, base.FirstIconPlate.length, false);
                let data = base.GetReDateResult(base.FirstIconPlate[0]);
                base.view.slotWheelManager.SetAllShowItem(data);
            }
            LoadingController.SendLoginLog(LoginLogEnum.GameReady);
            return;
        }

        consoleLog("ClientData.Status: " + JSON.stringify(SelfData.Instance.AccountData.ClientData.Status));
        consoleLog("ClientData.GameData: " + JSON.stringify(SelfData.Instance.AccountData.ClientData.GameData));

        let checkPickFinish = (status: Array<number>, bonusdata: Array<number>) => {
            if (bonusdata.length === 2) {
                return status.length > 0;
            }
            return status.length - 1 === bonusdata.length - 2;
        }


        let normalResult = copyArray(SelfData.Instance.AccountData.ClientData.GameData.NormalResult, 0, SelfData.Instance.AccountData.ClientData.GameData.NormalResult.length);
        let bonusResult = copyArray(SelfData.Instance.AccountData.ClientData.GameData.BonusResult, 0, SelfData.Instance.AccountData.ClientData.GameData.BonusResult.length);
        let statusData = copyArray(SelfData.Instance.AccountData.ClientData.Status, 0, SelfData.Instance.AccountData.ClientData.Status.length);

        let bonusStatus = statusData.filter(x => x[0] === PlayGameType.BonusRound);
        let selected = statusData.filter(x => x[0] === PlayGameType.BonusSelect).length > 0;
        let pickdata = statusData.filter(x => x[0] === PlayGameType.BonusPick);
        let buyBonus = statusData.filter(x => x[0] === PlayGameType.BuyBonus);

        let clientgameresult: ClientGameResult = new ClientGameResult([
            0,
            SelfData.Instance.AccountData.ClientData.GameData.NormalResult,
            SelfData.Instance.AccountData.ClientData.GameData.BonusResult,
            0,
            0,
            0,
            0,
            0
        ]);

        getMoney = base.OnGameResult(copyArray(normalResult, 0, normalResult.length), clientgameresult);

        let canBuyBonus: boolean = false;
        if (buyBonus.length > 0) {
            this.buyBonusType = BuyBonusType.None;
            this.buyBonusTimes = 0;
            for (let i = 0, imax = buyBonus.length; i < imax; ++i) {
                if (buyBonus[i][1] == 0) {
                    let buyBonusTable = TableManager.Instance.GetTable(BuyBonusTable);
                    if (buyBonusTable != null && base.CanBuyBonusTimes(bonusStatus.length) > this.buyBonusTimes) {
                        canBuyBonus = true;
                    }
                }
                else
                    this.buyBonusTimes++;
            }
        }

        let slotResult = GameLogic.Instance.SlotResult;
        let showResult = GameLogic.Instance.ShowResult;
        this.isBonus = GameLogic.Instance.SlotResult.isBonus;

        consoleLog("isBonus: " + JSON.stringify(this.isBonus));

        GameLogic.Instance.ClientBonusGameResult = copyArray(bonusResult, 0, bonusResult.length);

        //Maingame要翻牌
        if (bonusResult.length == 1 && statusData.length > 1 && statusData[1][0] == PlayGameType.BonusPick) {
            let bonusFirstKey = bonusResult[0][0];
            if (base.bonusPickID.indexOf(bonusFirstKey) > -1) {
                let finished = checkPickFinish(statusData[1], bonusResult[0]);
                if (finished && this.isBonus.indexOf(PlayGameType.BonusSelect) > -1) {
                    //Maingame翻牌完成,Bonus未選擇
                    this.isBonus.splice(0, 1);
                    let data = base.GetReDateResult(copyArray(normalResult, 0, normalResult.length));
                    base.view.slotWheelManager.SetAllShowItem(data);
                    await this.checkResourceLoadOnBackgroundComplete();
                    await this.showRedataTip();
                    this.isShowRedataTip = false;
                    this.serverResult = new ClientGameResult([
                        0,
                        copyArray(normalResult, 0, normalResult.length),
                        SelfData.Instance.AccountData.ClientData.GameData.BonusResult,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]);
                    this.isBonus = GameLogic.Instance.SlotResult.isBonus;
                    this._getResult = false;
                    await base.ShowSelectBonus();
                    await this.getResult();
                    //consoleLog("BonusGameResult: " + JSON.stringify(this.serverResult.BonusGameResult));
                    SelfData.Instance.AccountData.ClientData.Status.push([3, 0]);
                    //this.serverResult.BonusGameResult = copyArray(this.serverResult.BonusGameResult, 1, this.serverResult.BonusGameResult.length);

                    clientgameresult = new ClientGameResult([
                        0,
                        SelfData.Instance.AccountData.ClientData.GameData.NormalResult,
                        this.serverResult.BonusGameResult,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]);

                    base.OnGameResult(copyArray(normalResult, 0, normalResult.length), clientgameresult);
                    //consoleLog("BonusGameResult: " + JSON.stringify(this.serverResult.BonusGameResult));

                    bonusResult = copyArray(this.serverResult.BonusGameResult, 0, this.serverResult.BonusGameResult.length);
                    GameLogic.Instance.ClientBonusGameResult = copyArray(bonusResult, 0, bonusResult.length);
                    //pickdata.splice(0, 1);
                }
                else {
                    //Maingame翻牌未完成                    
                }
            }
            else {
                //Maingame翻牌完成,Bonus已選擇
                //pickdata.splice(0, 1);
            }
        }

        //let startIdx = slotResult.CheckBonusType(PlayGameType.BonusSelect) ? 2 : 1;
        let pickfinishCount = 0;
        let bonuscount = 0;
        for (let i = 1, max = statusData.length; i < max; ++i) {
            let playtype = <PlayGameType>statusData[i][0];
            if (playtype == PlayGameType.BonusSelect || playtype == PlayGameType.BuyBonus)
                continue;

            if (playtype == PlayGameType.BonusPick) {
                if (checkPickFinish(statusData[i], bonusResult[bonuscount])) {
                    pickfinishCount++;
                }
            }
            bonuscount++;
        }

        // ReSpin //
        let checkShowSpecialResult: boolean = base.CheckShowSpecialResult();
        if (checkShowSpecialResult) {
            base.isRedata = true;
            await this.checkResourceLoadOnBackgroundComplete();
            await base.ReDataInit();
            this.serverResult = new ClientGameResult([
                0,
                SelfData.Instance.AccountData.ClientData.GameData.NormalResult,
                SelfData.Instance.AccountData.ClientData.GameData.BonusResult,
                0,
                0,
                0,
                0,
                0
            ]);
            this.isBonus = GameLogic.Instance.SlotResult.isBonus;
            await this.showRespinTip();
            await base.ShowSpecialResult();
            this.serverResult = null;
            this.isShowRedataTip = false;
            base.isRedata = false;
            //return;
        }

        GameLogic.Instance.SlotResult = slotResult;
        GameLogic.Instance.ShowResult = showResult;

        while (this.isBonus.length > 0) {
            let playGameType: PlayGameType = <PlayGameType>this.isBonus[0];

            if (playGameType == PlayGameType.BonusSelect) {
                //已經選擇過
                if (selected) {
                    this.isBonus.splice(0, 1);
                    continue;
                }
                let data = base.GetReDateResult(copyArray(normalResult, 0, normalResult.length));
                base.view.slotWheelManager.SetAllShowItem(data);
                await this.checkResourceLoadOnBackgroundComplete();
                await this.showRedataTip();
                this.isShowRedataTip = false;
                this.serverResult = new ClientGameResult([
                    0,
                    copyArray(normalResult, 0, normalResult.length),
                    SelfData.Instance.AccountData.ClientData.GameData.BonusResult,
                    0,
                    0,
                    0,
                    0,
                    0
                ]);
                this.isBonus = GameLogic.Instance.SlotResult.isBonus;
                this._getResult = false;
                await base.ShowSelectBonus();
                await this.getResult();
                SelfData.Instance.AccountData.ClientData.Status.push([3, 0]);
                bonusResult = copyArray(this.serverResult.BonusGameResult, 0, this.serverResult.BonusGameResult.length);
                GameLogic.Instance.ClientBonusGameResult = copyArray(bonusResult, 0, bonusResult.length);
            }
            else if (bonusResult.length != (bonusStatus.length + pickfinishCount)) {
                showRedata = true;
                await this.checkResourceLoadOnBackgroundComplete();
                await base.ReDataInit();
                base.isRedata = true;
                if (this.serverResult == null) {
                    this.serverResult = new ClientGameResult([
                        0,
                        SelfData.Instance.AccountData.ClientData.GameData.NormalResult,
                        SelfData.Instance.AccountData.ClientData.GameData.BonusResult,
                        0,
                        0,
                        0,
                        0,
                        0
                    ]);
                }


                let subGameCount = 0;
                //getMoney += base.OnGameResult(copyArray(normalResult, 0, normalResult.length));
                this.isBonus = GameLogic.Instance.SlotResult.isBonus;
                subGameCount += GameLogic.Instance.SlotResult.subGameCount;

                let index = (bonusStatus.length) + pickdata.length;
                let data = base.GetReDateResult(copyArray(normalResult, 0, normalResult.length));
                base.view.slotWheelManager.SetAllShowItem(data);

                let beforeID = 0;
                let beforeBuyBonusCount = 0;
                if (this.buyBonusTimes > 0) {
                    beforeID = bonusResult[0][0];
                }

                let roundidx = 0;
                let pickidx = 0;
                let picked = [];
                for (let i = 0, max = index; i < max; ++i) {
                    let r = this.serverResult.BonusGameResult[i];
                    let bonusID = r[0];
                    if (beforeID == bonusID) beforeBuyBonusCount++;
                    if (base.bonusRoundID.indexOf(bonusID) > -1) {
                        roundidx++;
                        if (beforeID != bonusID)
                            getMoney += base.OnBonusGameResult(copyArray(r, 0, r.length));
                        subGameCount--;
                        subGameCount += GameLogic.Instance.SlotResult.subGameCount;
                    } else if (base.bonusPickID.indexOf(bonusID) > -1) {
                        if (checkPickFinish(pickdata[pickidx], r)) {
                            getMoney += r[1];
                            pickidx++;
                        } else {
                            picked = copyArray(pickdata[pickidx], 1, pickdata[pickidx].length);
                            index--;
                        }
                    }
                }

                let reData = new ReData();
                reData.subGameCount = subGameCount;
                reData.buyBonusTimes = this.buyBonusTimes;
                reData.beforeBuyBonusCount = beforeBuyBonusCount;
                reData.getMoney = getMoney;
                reData.firstKey = bonusResult[index][0];
                reData.data = index === 0 ? [] : bonusResult[index - 1][0] != reData.firstKey ? [] : bonusResult[index - 1];
                reData.predata = index > 1 && bonusResult[index - 2][0] != reData.firstKey ? bonusResult[index - 2] : [];
                reData.main = reData.data.length == 0 ? copyArray(normalResult, 0, normalResult.length) : [];
                reData.bonusGameCount = bonusResult.length;
                reData.nowIndex = index;
                reData.pickData = picked;
                await this.ShowBonusGame(index, roundidx, reData);

                base.ResultFinish();

                SelfData.Instance.AccountData.MoneyLog += ("=" + SelfData.Instance.AccountData.Money);
                consoleLog("MoneyLog: " + SelfData.Instance.AccountData.MoneyLog);
                if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode && SelfData.Instance.UrlParam_GameMode != GameMode.SetResultMode && this.serverResultMoney != SelfData.Instance.AccountData.Money) {
                    console.log("moneyError1!!! server " + this.serverResultMoney + " != client " + SelfData.Instance.AccountData.Money);
                    this.unitTestErrorTimes++;
                    this.SendDataErrorLog(this.serverResult.NormalGameResult, this.serverResult.BonusGameResult, this.serverResultMoney, SelfData.Instance.AccountData.Money);
                    SelfData.Instance.AccountData.Money = this.serverResultMoney;
                }
                base.isRedata = false;
                this._getResult = false;
                this.serverResult = null;
            }
            else
                this.isBonus.splice(0, 1);
        }

        if (canBuyBonus) {
            this.isBonus.push(PlayGameType.BonusRound);
            showRedata = true;
            await this.checkResourceLoadOnBackgroundComplete();
            await base.ReDataInit();
            base.isRedata = true;
            if (this.serverResult == null) {
                this.serverResult = new ClientGameResult([
                    0,
                    SelfData.Instance.AccountData.ClientData.GameData.NormalResult,
                    SelfData.Instance.AccountData.ClientData.GameData.BonusResult,
                    0,
                    0,
                    0,
                    0,
                    0
                ]);
            }


            let subGameCount = 0;
            //getMoney += base.OnGameResult(copyArray(normalResult, 0, normalResult.length));
            this.isBonus = GameLogic.Instance.SlotResult.isBonus;
            subGameCount += GameLogic.Instance.SlotResult.subGameCount;

            let index = (bonusStatus.length) + pickdata.length;

            let roundidx = 0;
            let pickidx = 0;
            let picked = [];
            for (let i = 0, max = index; i < max; ++i) {
                let r = this.serverResult.BonusGameResult[i];
                let bonusID = r[0]
                if (base.bonusRoundID.indexOf(bonusID) > -1) {
                    roundidx++;
                    getMoney += base.OnBonusGameResult(copyArray(r, 0, r.length));
                    subGameCount--;
                    subGameCount += GameLogic.Instance.SlotResult.subGameCount;
                } else if (base.bonusPickID.indexOf(bonusID) > -1) {
                    if (checkPickFinish(pickdata[pickidx], r)) {
                        getMoney += r[1];
                        pickidx++;
                    } else {
                        picked = copyArray(pickdata[pickidx], 1, pickdata[pickidx].length);
                        index--;
                    }
                }
            }

            let data = base.GetReDateResult(copyArray(bonusResult[index - 1], 1, bonusResult[index - 1].length));
            base.view.slotWheelManager.SetAllShowItem(data);

            //this.buyBonusTempAccountMoney = SelfData.Instance.AccountData.Money;

            let reData = new ReData();
            reData.subGameCount = subGameCount;
            reData.buyBonusTimes = this.buyBonusTimes;
            reData.getMoney = getMoney;
            reData.firstKey = bonusResult[index - 1][0];
            reData.data = index === 0 ? [] : bonusResult[index - 1];
            reData.predata = index > 1 ? bonusResult[index - 2] : [];
            reData.bonusGameCount = bonusResult.length;
            reData.nowIndex = index;
            reData.pickData = picked;
            await this.ShowBonusGame(index, roundidx, reData, true);

            base.ResultFinish();

            SelfData.Instance.AccountData.MoneyLog += ("=" + SelfData.Instance.AccountData.Money);
            consoleLog("MoneyLog: " + SelfData.Instance.AccountData.MoneyLog);
            if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode && SelfData.Instance.UrlParam_GameMode != GameMode.SetResultMode && this.serverResultMoney != SelfData.Instance.AccountData.Money) {
                console.log("moneyError3!!! server " + this.serverResultMoney + " != client " + SelfData.Instance.AccountData.Money);
                this.unitTestErrorTimes++;
                this.SendDataErrorLog(this.serverResult.NormalGameResult, this.serverResult.BonusGameResult, this.serverResultMoney, SelfData.Instance.AccountData.Money);
                SelfData.Instance.AccountData.Money = this.serverResultMoney;
            }
            base.isRedata = false;
            this._getResult = false;
            this.serverResult = null;
        }

        // Select //
        if (checkShowSpecialResult || showRedata || canBuyBonus) return;
        let data = [];
        if (bonusResult.length > 0 &&
            (
                SelfData.Instance.TargetGameType !== GameType.JCYFDrum &&
                SelfData.Instance.TargetGameType !== GameType.JCFDrum
            )
        ) {
            let preIndex = bonusResult.length - 1;
            let bresult = [];
            while (true) {
                bresult = copyArray(SelfData.Instance.AccountData.ClientData.GameData.BonusResult[preIndex], 0, SelfData.Instance.AccountData.ClientData.GameData.BonusResult[preIndex].length);
                if (base.bonusRoundID.indexOf(bresult[0]) > -1) {
                    let key = bresult[0];
                    bresult.shift();
                    data = base.GetReDateResult(bresult, key);
                    break;
                } else {
                    preIndex--;
                    if (preIndex < 0) {
                        bresult = copyArray(normalResult, 0, normalResult.length);
                        data = base.GetReDateResult(bresult);
                        break;
                    }
                }
            }
        }
        else
            data = base.GetReDateResult(copyArray(normalResult, 0, normalResult.length));
        base.view.slotWheelManager.SetAllShowItem(data);
        LoadingController.SendLoginLog(LoginLogEnum.GameReady);
        return;

    }

    loader: egret.URLLoader;
    public SendDataErrorLog(normalGameResult: Array<number>, bonusGameResult: Array<Array<number>>, resultMoney: number, clientMoney: number) {
        let urlpath: string = SelfData.Instance.getData(SelfData.Instance.GameSettings.m_GameErrorUrl);

        var date = Math.floor(Date.now() * 0.001);

        let id = SelfData.Instance.AccountData.UserID.toString();
        let type = SelfData.Instance.TargetGameType;

        var token = SHA256(
            id
            + type
            + date
            + "HS_project_8500");



        this.loader = new egret.URLLoader();
        this.loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request: egret.URLRequest = new egret.URLRequest(urlpath);
        this.loader.addEventListener(egret.Event.COMPLETE, this.onsenderror, this);
        this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onsenderror, this);
        request.requestHeaders.push(new egret.URLRequestHeader("Accept", "application/json"));
        request.method = egret.URLRequestMethod.POST;
        request.data = new egret.URLVariables(
            "id=" + id +
            "&type=" + type +
            "&bet=" + SelfData.Instance.PlaySetting.RunBet +
            "&betrate=" + SelfData.Instance.PlaySetting.RunBetRate +
            "&playbefoer=" + this.playBefore +
            "&moneylog=" + encodeURIComponent(SelfData.Instance.AccountData.MoneyLog) +
            "&runlog=" + encodeURIComponent(SelfData.Instance.RunLog) +
            "&c_money=" + clientMoney +
            "&s_money=" + resultMoney +
            "&g_result=" + JSON.stringify(normalGameResult) +
            "&b_result=" + JSON.stringify(bonusGameResult) +
            "&now_time=" + date +
            "&token=" + token
        );
        this.loader.load(request);
        consoleLog(JSON.stringify(request.data.variables));
    }

    private onsenderror(event) {
        consoleLog(event);
    }

    public async showRedataTip() {
        await waitForFlage(() => { return SelfData.Instance.LoadingViewHide; });

        //--------------------------免費遊戲事件------------------------//
        let event: ClientEvent = new ClientEvent(ClientMsg.FreeSpin);
        EventManager.Instance.Send(event);

        let tip = new MessageTips();
        tip.CreateTips();
        tip.ShowTips(LocalizationCommonTable.Get(1002), LocalizationCommonTable.Get(1008), () => {
            this.waitReData = true;
        }, this);
        await this.WaitRedata();
    }

    public async showRespinTip() {
        await waitForFlage(() => { return SelfData.Instance.LoadingViewHide; });

        let event: ClientEvent = new ClientEvent(ClientMsg.FreeSpin);
        EventManager.Instance.Send(event);

        let wait: boolean = true;
        let tip = new MessageTips();
        tip.CreateTips();
        tip.ShowTips(LocalizationCommonTable.Get(1002), LocalizationCommonTable.Get(1012), () => wait = false, this);
        while (wait) await waitForSeconds(0.01);
    }

    /**檢查後台資源負載完成*/
    async checkResourceLoadOnBackgroundComplete() {
        await waitForFlage(() => { return SelfData.Instance.LoadingViewHide; })
        if (!SelfData.Instance.ResourceLoadOnBackgroundComplete) {
            let message = LocalizationCommonTable.Get(90303);
            let r = [" ▷▷▷", " ▶▷▷", " ▶▶▷", " ▶▶▶"]; // [" ▯▯▯"," ▮▯▯"," ▮▮▯"," ▮▮▮"];// [".","..","..."];//"◐◓◑◒";//["◦", "╱","——","╲","│","╱","—―","╲"];
            let index = 0;
            let tip = UIManager.Instance.ShowTip(message + r[index]);

            while (!SelfData.Instance.ResourceLoadOnBackgroundComplete) {
                await waitForSeconds(0.01);
                index++;
                index = index >= r.length * 50 ? 0 : index;
                tip.SetContent(message + r[Math.floor(index / 50)]);

            }
            tip.CloseTip();
        }
    }


    public updateFPS() {
        this.FPSCount++;
        if (this.FPSTimer === 0)
            this.FPSTimer = new Date().getTime() / 1000;
        let timer = new Date().getTime() / 1000;
        if ((timer - this.FPSTimer) > 1) {
            SelfData.Instance.DisplayFPS = this.FPSCount > UIManager.Instance.Stage.frameRate ? UIManager.Instance.Stage.frameRate : this.FPSCount;
            this.FPSCount = 0;
            this.FPSTimer = timer;
        }
        this.SyncMWSingleGetBalance();
    }

    static loader = null;
    static waitSendRePlayLog = false;
    static SendRePlayLog(id: string) {
        this.waitSendRePlayLog = true;
        //let urlpath: string = SelfData.Instance.getData(SelfData.Instance.GameSettings.m_GameErrorUrl);
        let urlpath: string;
        if(SelfData.Instance.UrlParam_OutMode){
            urlpath = SelfData.Instance.RePlayLog_OUT + id;
        }
        else{
            urlpath = SelfData.Instance.RePlayLog + id;
        }
        //urlpath = urlpath.substring(0, urlpath.lastIndexOf("/") + 1) + "client_recommend";

        this.loader = new egret.URLLoader();
        this.loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var request: egret.URLRequest = new egret.URLRequest(urlpath);
        this.loader.addEventListener(egret.Event.COMPLETE, this.senderror, this);
        this.loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.senderror, this);
        request.requestHeaders.push(new egret.URLRequestHeader("Accept", "application/json"));
        request.method = egret.URLRequestMethod.GET;
        this.loader.load(request);
    }
    private static async senderror(event) {
        consoleLog(this.loader.data);
        let data = JSON.parse(this.loader.data);
        if (data != undefined) {
            if (data["isSuccess"]) {
                this.waitSendRePlayLog = false;
                SelfData.Instance.OutShowData = [];
                SelfData.Instance.OutShowData.push(data["sn"]);
                SelfData.Instance.OutShowData.push(data["gameType"]);
                SelfData.Instance.OutShowData.push(data["currency"]);
                SelfData.Instance.OutShowData.push(data["nickname"]);
                SelfData.Instance.OutShowData.push(data["pseudonym"]);
                SelfData.Instance.OutShowData.push(data["equipment"]);
                SelfData.Instance.OutShowData.push(data["replay"]);
                SelfData.Instance.OutShowData.push(data["logDate"]);
            }
            else {
                while (!SelfData.Instance.LoadingViewHide) {
                    await waitForSeconds(0.1);
                }
                let dialog = new MessageTips();
                dialog.CreateTips_MWUI();
                dialog.ShowTips(LocalizationCommonTable.Get(1002),
                    LocalizationCommonTable.Get(10000024).format(SelfData.Instance.UrlParam_RePlayID),
                    () => {
                        ResetRePlay();
                    },
                    this, );
            }
        }
        else {
            while (!SelfData.Instance.LoadingViewHide) {
                await waitForSeconds(0.1);
            }
            let dialog = new MessageTips();
            dialog.CreateTips_MWUI();
            dialog.ShowTips(LocalizationCommonTable.Get(1002),
                LocalizationCommonTable.Get(10000024).format(SelfData.Instance.UrlParam_RePlayID),
                () => {
                    ResetRePlay();
                },
                this, );
        }
    }
}

class ReData {
    public subGameCount = 0;
    public getMoney = 0;
    public firstKey = 0;
    public bonusGameCount = 0;
    public nowIndex = 0;
    public pickData = [];
    public data = [];
    public predata = [];
    public buyBonusTimes = 0;
    public beforeBuyBonusCount = 0;
    public main = [];
}

class RePlayBonusRoundID {
    public RoundIndex: number;
    public GetEventName(): string {
        return "RePlayBonusRoundID";
    }

    public GetSendAll(): boolean {
        return true;
    }
    public GetSecondKeyListened(): any {
        return null;
    }

    public constructor() {

    }
}

class RePlayClose {
    public GetEventName(): string {
        return "RePlayClose";
    }

    public GetSendAll(): boolean {
        return true;
    }
    public GetSecondKeyListened(): any {
        return null;
    }

    public constructor() {

    }
}