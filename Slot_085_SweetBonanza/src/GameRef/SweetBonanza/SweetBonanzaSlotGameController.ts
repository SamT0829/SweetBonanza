class SweetBonanzaSlotGameController<T1 extends ISlotView, T2 extends IGameLogic, T3 extends ISlotBaseController<T1, T2>> extends SlotGameController<ISlotView, IGameLogic, ISlotBaseController<ISlotView, IGameLogic>> {
    protected BuyFG80RateUPCount = 0;
    
    public Initialize() {
        super.Initialize();
        EventManager.Instance.RegisterEventListener(BuyFreeGameEvent, this, this.BuyFreeGame);
        // EventManager.Instance.RegisterEventListener(GambleWheelSpinEvent, this, this.OnGambleWheelSpin);
        // EventManager.Instance.RegisterEventListener(EndBonusWheelEvent, this, this.OnEndBonusWheel);
        // EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnSavePlayRespond, ClientMsg.SpinStepRespond);
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

        if(SweetBonanzaGameModel.Instance.CheckMoney !=  SweetBonanzaGameModel.Instance.NowWinMoney){
            consoleLog("moneyErrorNew0 CheckMoney: " + SweetBonanzaGameModel.Instance.CheckMoney + " | NowWinMoney: " +  SweetBonanzaGameModel.Instance.NowWinMoney);
            this.unitTestErrorTimes++;
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

        if(SweetBonanzaGameModel.Instance.CheckMoney != SweetBonanzaGameModel.Instance.NowWinMoney){
             consoleLog("moneyErrorNew1 CheckMoney: " + SweetBonanzaGameModel.Instance.CheckMoney + " | NowWinMoney: " + SweetBonanzaGameModel.Instance.NowWinMoney);
            this.unitTestErrorTimes++;
        }

        this.bonusRoundIndex++;
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
            //沒有redata
            if (base.FirstIconPlate.length > 0) {
                let ran = randomInt(0, base.FirstIconPlate.length, false);
                let data = base.GetReDateResult(base.FirstIconPlate[ran]);
                base.view.slotWheelManager.SetAllShowItem(data);
            }
            LoadingController.SendLoginLog(LoginLogEnum.GameReady);
            this.serverResult = null;
            base.isRedata = false;
            if (SelfData.Instance.UrlParam_UseBuyFreeGame == true) {
                var event: ShowLadderReplay = new ShowLadderReplay();
                event.Type = 1;
                EventManager.Instance.Send(event);
            }
            return;
        }

        base.OnServerDiscountMoney();

        consoleLog("ClientData.Status: " + JSON.stringify(SelfData.Instance.AccountData.ClientData.Status));
        consoleLog("ClientData.GameData: " + JSON.stringify(SelfData.Instance.AccountData.ClientData.GameData));

        let normalResult = copyArray(SelfData.Instance.AccountData.ClientData.GameData.NormalResult, 0, SelfData.Instance.AccountData.ClientData.GameData.NormalResult.length);
        let bonusResult = copyArray(SelfData.Instance.AccountData.ClientData.GameData.BonusResult, 0, SelfData.Instance.AccountData.ClientData.GameData.BonusResult.length);
        let statusData = copyArray(SelfData.Instance.AccountData.ClientData.Status, 0, SelfData.Instance.AccountData.ClientData.Status.length);
        let bonusStatus = statusData.filter(x => x[0] === PlayGameType.BonusRound2);

        let maxlength: number = 30;

        let lastStatus = statusData[statusData.length - 1];
        let lastPlayGameType = <PlayGameType>lastStatus[0];

        let data = base.GetReDateResult(copyArray(normalResult, 0, normalResult.length));
        base.view.slotWheelManager.SetAllShowItem(copyArray(data, 0, data.length));
        SweetBonanzaGameModel.Instance.BonusToMainData = data;

        if (lastPlayGameType == PlayGameType.MainGame) {
            //MainGame, 且沒有進入FG
            if (!this.inFreegame(copyArray(data, 0, maxlength))) {
                LoadingController.SendLoginLog(LoginLogEnum.GameReady);
                this.serverResult = null;
                base.isRedata = false;
                if (SelfData.Instance.UrlParam_UseBuyFreeGame == true) {
                    var event: ShowLadderReplay = new ShowLadderReplay();
                    event.Type = 1;
                    EventManager.Instance.Send(event);
                }
                return;
            }
        }
        else if (lastPlayGameType == PlayGameType.SaveSelect && SelfData.Instance.AccountData.ClientData.GameData.TotalBonusCount == 0) {
            LoadingController.SendLoginLog(LoginLogEnum.GameReady);
            this.serverResult = null;
            base.isRedata = false;
            if (SelfData.Instance.UrlParam_UseBuyFreeGame == true) {
                var event: ShowLadderReplay = new ShowLadderReplay();
                event.Type = 1;
                EventManager.Instance.Send(event);
            }
            return;
        }
        else if (lastPlayGameType == PlayGameType.BonusRound2) {
            if (SelfData.Instance.AccountData.ClientData.GameData.TotalBonusCount == bonusStatus.length) {
                //FG已經轉完, EndBonusWheel也轉完, 顯示MainGame
                //base.view.slotWheelManager.SetAllShowItem(DisTeaOneModel.Instance.BonusToMainData);
                LoadingController.SendLoginLog(LoginLogEnum.GameReady);
                this.serverResult = null;
                base.isRedata = false;
                if (SelfData.Instance.UrlParam_UseBuyFreeGame == true) {
                    var event: ShowLadderReplay = new ShowLadderReplay();
                    event.Type = 1;
                    EventManager.Instance.Send(event);
                }
                return;
            }
        }
        
        (<GameBaseController<GameBaseView, IGameLogic>>base).OnReData(normalResult, bonusResult);
        getMoney = base.OnGameResult(copyArray(normalResult, 0, normalResult.length));

        await this.checkResourceLoadOnBackgroundComplete();
        //await this.showRedataTip();
        //this.isShowRedataTip = false;
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

        this.isBonus.push(PlayGameType.BonusRound);

        if (lastPlayGameType == PlayGameType.MainGame) {
            LoadingController.SendLoginLog(LoginLogEnum.GameReady);
            if (this.isShowRedataTip)
                await this.showRedataTip();
            await this.ShowBonusGame(0, 0);
        }
        else if (lastPlayGameType == PlayGameType.BuyBonus) {
            let reData = new ReData();
            //TotalBonusCount有包含EndBonusWheel, 所以-1才是FG局數
            let fgCount = SelfData.Instance.AccountData.ClientData.GameData.TotalBonusCount;
            reData.subGameCount = fgCount - bonusStatus.length;
            reData.getMoney = getMoney;
            //購買完成, 但還沒玩轉輪
            await base.SetReData(reData);
            await this.ShowBonusGame(0, 0);
        }
        else if (lastPlayGameType == PlayGameType.BonusRound2) {
            SweetBonanzaGameModel.Instance.IsFreeGame = true;


            //FG還沒轉完
            for (let i = 0, imax = bonusResult.length; i < imax; ++i) {
                let r = bonusResult[i];
                // if (r[0] > -1) r.unshift(-1);
                getMoney += base.OnBonusGameResult(copyArray(r, 0, r.length));
            }


            let lastData = bonusResult[bonusStatus.length - 1];
            let reData = new ReData();
            //TotalBonusCount有包含EndBonusWheel, 所以-1才是FG局數
            let fgCount = SelfData.Instance.AccountData.ClientData.GameData.TotalBonusCount;
            reData.subGameCount = fgCount - bonusStatus.length;
            reData.getMoney = getMoney;

            let data = copyArray(lastData, 1, lastData.length);
            let wheelData = 42;
            let startData = 2;
            let showItemCount = 30;
            let dataAmount = Math.floor(data.length / wheelData);
		    let showData = [];
		    for (let i = 0; i < dataAmount; i++) {
                let newData = data.splice(0, wheelData);
			    for (let j = 0; j < showItemCount; j++) {
                    let dataRow = Math.floor(j / SweetBonanzaGameModel.Instance.SlotRow) + 1;
                    let startColumn = startData * dataRow;
                    showData.push(newData[j + startColumn]);
			    }
		    }
            reData.data = copyArray(lastData, 0, lastData.length);
            base.view.slotWheelManager.SetAllShowItem(showData);
            reData.main = [];
            SweetBonanzaGameModel.Instance.ChangeWinWheel = 0;
            SweetBonanzaGameModel.Instance.GetFreeGameConut = fgCount;

            await this.ShowBonusGame(bonusStatus.length, bonusStatus.length, reData);
        }

        base.ResultFinish();

        SelfData.Instance.AccountData.MoneyLog += ("=" + SelfData.Instance.AccountData.Money);
        consoleLog("MoneyLog: " + SelfData.Instance.AccountData.MoneyLog);
        if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode && SelfData.Instance.UrlParam_GameMode != GameMode.SetResultMode && this.serverResultMoney != SelfData.Instance.AccountData.Money) {
            consoleLog("moneyError4!!! server " + this.serverResultMoney + " != client " + SelfData.Instance.AccountData.Money);
            this.SendDataErrorLog(this.serverResult.NormalGameResult, this.serverResult.BonusGameResult, this.serverResultMoney, SelfData.Instance.AccountData.Money);
            SelfData.Instance.AccountData.Money = this.serverResultMoney;
        }

        this.playBefore = SelfData.Instance.AccountData.Money;
        SelfData.Instance.AccountData.MoneyLog = this.playBefore.toString();
        SelfData.Instance.RunLog = "";

        SweetBonanzaGameModel.Instance.WaitBuyBonus = false;
        base.isRedata = false;
        this._getResult = false;
        this.serverResult = null;
    }
    /**顯示獎金遊戲*/
    public async ShowBonusGame(BonusIndex: number, BonusRoundIndex, redata?: ReData, redataBuyBonus?: boolean) {
        await this.checkResourceLoadOnBackgroundComplete();
        let base = this.BaseController;
        this.currentBonusIndex = BonusIndex;
        let oriMoney = SelfData.Instance.AccountData.Money;

        if (!this.UnitTest) {
            if (redata != null) {
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
            else {
                this.bonusRoundIndex = BonusRoundIndex;

                let bonusID = -100;
                if (this.serverResult.BonusGameResult.length > this.currentBonusIndex) bonusID = this.serverResult.BonusGameResult[this.currentBonusIndex][0];
                if (!this.UnitTest) {
                    await base.MainToBonus(bonusID, redata);
                    if (redata)
                        await base.SetReData(redata);
                }

                while (this.currentBonusIndex < SweetBonanzaGameModel.Instance.GetFreeGameConut) {
                    if (this.serverResult.BonusGameResult.length > this.currentBonusIndex && bonusID !== this.serverResult.BonusGameResult[this.currentBonusIndex][0]) {
                        bonusID = this.serverResult.BonusGameResult[this.currentBonusIndex][0];
                        await base.BonusToBonus(bonusID);
                    }

                    this._getResult = false;
                    if (base.bonusRoundID.indexOf(bonusID) > -1) {
                        //截圖
                        // await waitForSeconds(10000);
                        var event: RePlayBonusRoundID = new RePlayBonusRoundID();
                        event.RoundIndex = this.currentBonusIndex;
                        EventManager.Instance.Send(event);
                        if(SweetBonanzaGameModel.Instance.IsMaxWinMoney())
                            break;
                        else
                            await this.showBonusRound(true);
                    }
                    EventManager.Instance.Send(new ClientEvent(ClientMsg.OnUpdateMoney));
                    this.currentBonusIndex++;
                    //RePlay
                    if (SelfData.Instance.SkipRePlay) {
                        SweetBonanzaGameModel.Instance.GetFreeGameConut = 0;
                    }
                    //
                }
                this.isBonus.splice(0, 1);
            }
        }
        if (!this.UnitTest) {
            await base.BonusToMain();
        }
        let diff = SelfData.Instance.AccountData.Money - oriMoney;
        if (diff > (SelfData.Instance.PlaySetting.TotleBet * 80))
            this.BuyFG80RateUPCount++;
        SweetBonanzaGameModel.Instance.Mode2BonusData = false;
        SweetBonanzaGameModel.Instance.GetFreeGameConut = 0;
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
    
    private BuyFreeGame(event: BuyFreeGameEvent) {
        let base = this.BaseController;
        let isBuy = event.isbuy;
        let cost = event.cost;
        this.buyBonus(isBuy ? SelfData.Instance.BuyBonusType : BuyBonusType.Cancel, cost);
    }

    protected async buyBonus(buyBonusType: BuyBonusType, cost: number) {
        this.playBefore = SelfData.Instance.AccountData.Money;
        SelfData.Instance.AccountData.MoneyLog = this.playBefore.toString();
        SelfData.Instance.RunLog = "";
        await super.buyBonus(buyBonusType, cost);
    }

    protected inFreegame(data: Array<number>): boolean {
        let base = this.BaseController;
        // for (let i = 0, imax = data.length; i < imax; ++i) {
        //     if (data[i] >= 300) data[i] = 1;
        //     else if (data[i] >= 200) data[i] = 0;
        //     else data[i] = data[i] % 100;
        // }
        let result = base.slotLogic.getNormalResult(data, 1);
        return result.subGameCount > 0;
    }

    public OnMarquee() {
        if (this.MarqueeManager != null) return;
        this.MarqueeManager = new Marquee();
        this.MarqueeManager.Init(SweetBonanzaGameModel.Instance.MainParent.asCom);
    }
}