class BreakAwayView extends FreeGameView {
    public FillItemController: FillItemController = null;
    public SpecialWildManager: SpecialWildManager = null;
    public HeaderManager: HeaderManager = null;
    public FreeGameResultView: FreeGameResultView = null;

    public SpecialWildComponentName: Array<Array<string>> = [];
    public SpecialWildObjs: Array<fairygui.GObject[]> = null;

    protected FXBackGround: fairygui.GObject = null;
    protected ItemFXParent: fairygui.GObject = null;
    protected SpecialItemFXParent: fairygui.GObject = null;

    protected MainToBonusTrans: fairygui.Transition = null;
    protected BonusToMainTrans: fairygui.Transition = null;
    protected ComboRateHideAllTrans: fairygui.Transition = null;
    protected ComboRateTweenTrans: fairygui.Transition[] = [];
    protected ComboRateShiningTrans: fairygui.Transition[] = [];
    protected FreeGameCountText: fairygui.GTextField = null;

    protected IsSetFreeGameFairyGUIFXFinish = false;

    public NeedHeader: boolean = true;
    private ComboTweenFXName: string[] = ["Tween_2x", "Tween_3x", "Tween_4x", "Tween_5x", "Tween_10x"];
    private ComboShiningFXName: string[] = ["Shining_2x", "Shining_3x", "Shining_4x", "Shining_5x", "Shining_10x"];

    protected SpecialWIldID: number = -1;
    protected ItemFX: Dictionary = new Dictionary([]);

    public MapSize: number[] = [];

    public NowWinMoney: number = 0;
    protected WinLobbyMsg: string = "";

    // private get ConnectAnimWaitingTime(): number {
    //     let subwin = GameLogic.Instance.SlotResult.getBet * SelfData.Instance.PlaySetting.Bet * BreakAwayGameData.Instance.CurrentComboRate;
    //     let winRate = subwin / SelfData.Instance.PlaySetting.TotleBet;
    //     let len = BreakAwayGameData.Instance.ConnectAnimRate.length;
    //     for (let i = 0; i < len; i++) {
    //         if (winRate <= BreakAwayGameData.Instance.ConnectAnimRate[i])
    //             return BreakAwayGameData.Instance.ConnectAnimWaitingTime[i];
    //     }
    //     return BreakAwayGameData.Instance.ConnectAnimWaitingTime[len - 1];
    // }

    public Init(view: fairygui.GComponent) {
        super.Init(view);
        this.SetFairyGUIFX();
        this.SpecialWildManager = new SpecialWildManager(this.SpecialWIldID, this.SpecialWildObjs);
        this.SpecialWildManager.SetSpecialWildObjs();

        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnWheelEnd, ClientMsg.WheelStop);
    }

    protected OnWheelEnd(event: ClientEvent) {
        let num = event.eventData; //0~4
        let data = BreakAwayGameData.Instance.GetCurrentSingleData();
        let count: number[] = [0, 0, 0, 0, 0];

        let currCount = 0;

        if (num == 4) {
            SoundManger.Instance.StopSoundSE(BreakAwayGameData.Instance.SoundName.MaybeBonus);
            SoundManger.Instance.StopSoundSE(BreakAwayGameData.Instance.SoundName.SpecialWildBGM);
        }
        for (let i = 0; i < BreakAwayGameData.Instance.ItemMap.MapSize[1]; i++) {
            count[i] = currCount;
            for (let j = 0; j < BreakAwayGameData.Instance.ItemMap.MapSize[0]; j++) {
                let idx = i * BreakAwayGameData.Instance.ItemMap.MapSize[0] + j;
                if (data[idx] == BreakAwayGameData.Instance.FreeGameItemID) {
                    count[i]++;
                    currCount++;
                }
            }
            if (num == i) {
                if (count[i] > 0) {
                    if (i == 0) {
                        SoundManger.Instance.PlaySoundSE(BreakAwayGameData.Instance.SoundName.Scatter[0]);
                    }
                    else {
                        if (count[i] != count[i - 1]) {
                            let soundIdx = Math.min(currCount, BreakAwayGameData.Instance.SoundName.Scatter.length);
                            SoundManger.Instance.PlaySoundSE(BreakAwayGameData.Instance.SoundName.Scatter[currCount - 1]);
                        }
                    }
                }
            }
        }
    }

    protected SetFairyGUIFX() {
        if (this.NeedHeader)
            this.HeaderManager = new HeaderManager(this.view);
        this.FreeGameResultView = new FreeGameResultView(this.view);

        this.FXBackGround = this.view.getChild("background");

        this.ItemFXParent = this.view.getChild("ItemFXParent");
        this.SpecialItemFXParent = this.view.getChild("SpecialItemFXParent");

        this.MainToBonusTrans = this.view.getTransition("MainToBonus");
        this.BonusToMainTrans = this.view.getTransition("BonusToMain");


        this.GetSpecialWildObjs();
    }

    protected SetFreeGameFairyGUIFX() {
        if (this.IsSetFreeGameFairyGUIFXFinish)
            return;
        let freegameBGGroupParent = this.view.getChild("FreeGameBGGroupParent");
        let freegameBGGroup = freegameBGGroupParent.asCom.getChild("FreeGameBGGroup");
        let freegameFGGroupParent = this.view.getChild("FreeGameFGGroupParent");
        let freegameFGGroup = freegameFGGroupParent.asCom.getChild("FreeGameFGGroup");

        let comboRateObj = freegameFGGroup.asCom.getChild("ComboRate");
        this.ComboRateHideAllTrans = comboRateObj.asCom.getTransition("hideAll");
        this.ComboRateHideAllTrans.play();
        for (let i = 0; i < this.ComboShiningFXName.length; i++)
            this.ComboRateShiningTrans.push(comboRateObj.asCom.getTransition(this.ComboShiningFXName[i]));
        for (let i = 0; i < this.ComboTweenFXName.length; i++)
            this.ComboRateTweenTrans.push(comboRateObj.asCom.getTransition(this.ComboTweenFXName[i]));

        if (freegameFGGroup.asCom.getChild("FreeGameCount") != null)
            this.FreeGameCountText = freegameFGGroup.asCom.getChild("FreeGameCount").asTextField;
        this.IsSetFreeGameFairyGUIFXFinish = true;
    }

    public SetFillItemController(itemMap: ItemMap) {
        this.FillItemController = new FillItemController(itemMap, 130, true, [], 0.07, 100);
        this.MapSize = itemMap.MapSize;
    }

    protected GetSpecialWildObjs() {
        this.SpecialWildObjs = Array<fairygui.GObject[]>();
        for (let i = 0; i < this.SpecialWildComponentName.length; i++) {
            let group = [];
            for (let j = 0; j < this.SpecialWildComponentName[i].length; j++) {
                group.push(this.view.getChild(this.SpecialWildComponentName[i][j]));
            }
            this.SpecialWildObjs.push(group);
        }
    }

    public async StartRun() {
        if (!BreakAwayGameData.Instance.IsFreeGame)
            this.NowWinMoney = 0;

        this.hideAllSlotFX();
        this.ItemFX.clear();
        await this.SpecialWildManager.HideSpecialWild();
        await super.StartRun();

        if (this.NeedHeader) {
            let headerShowIdx = [this.HeaderManager.HeaderTypeIdx_Default, this.HeaderManager.HeaderTypeIdx_Normal, this.HeaderManager.HeaderTypeIdx_Normal2];
            if (headerShowIdx.indexOf(this.HeaderManager.CurrentShowIdx) <= 0)
                this.HeaderManager.Show(headerShowIdx[this.HeaderManager.HeaderTypeIdx_Default]);
            else if (this.HeaderManager.NeedShowHeader) {
                let idx = randomInt(0, headerShowIdx.length - 1);
                this.HeaderManager.Show(headerShowIdx[idx]);
            }
        }
    }

    public async StopStart() {
        await this.slotWheelManager.SpecialStopRun(GameLogic.Instance.ShowResult[0], GameLogic.Instance.ShowResult[1]);
        await this.Stoping();
        await this.Stop();
        await this.ReSpin();
    }

    public async ShowSpecialWildAnim() {
        await this.SpecialWildManager.ShowSpecialWild(this.ToArrayData(this.MapSize, GameLogic.Instance.SlotResult.data));
    }

    protected async ShowWinLineFx() {
        this.WinLobbyMsg = "";

        for (let i = 0; i < BreakAwayGameData.Instance.ItemMap.ItemCount; i++) {
            this.slotWinFX.push(null);
        }

        let singleWinMoney = 0;
        for (let i = 0, imax = GameLogic.Instance.SlotResult.lineIndex.length; i < imax; ++i) {
            this.IsSkip = false;
            let index: number = GameLogic.Instance.SlotResult.lineIndex[i];
            let count: number = GameLogic.Instance.SlotResult.lineCount[i];
            let rate: number = GameLogic.Instance.SlotResult.lineMoney[i];
            let name: string = GameLogic.Instance.SlotResult.lineName[i];
            let lineData: Array<number> = GameLogic.Instance.SlotResult.lineData[index];
            let subLineCount: number = GameLogic.Instance.SlotResult.subLineCount[i];

            singleWinMoney += (SelfData.Instance.PlaySetting.Bet * rate * BreakAwayGameData.Instance.CurrentComboRate);
            this.NowWinMoney += (SelfData.Instance.PlaySetting.Bet * rate * BreakAwayGameData.Instance.CurrentComboRate);
            if (subLineCount)
                this.WinLobbyMsg += LocalizationCommonTable.Get(10000007).format(name, subLineCount.toString()) + " ";
            else
                this.WinLobbyMsg += name + " ";
        }
        if (singleWinMoney > 0 && this.isBonus)
            this.WinLobbyMsg += "X" + BreakAwayGameData.Instance.CurrentComboRate.toString() + " ";
        if (!SelfData.Instance.ConnectionClose) {
            this.ShowWinMoney(this.NowWinMoney);
            if (singleWinMoney > 0) {
                this.ShowLobbyMessage(this.WinLobbyMsg + LocalizationCommonTable.Get(10000004).format((singleWinMoney / 100).toFixed(2)));
                await this.ConnectAnimShow();
                let waitTime = BreakAwayGameData.Instance.GetConnectAnimWaitingTime();
                while (waitTime > 0 && !this.IsSkip) {
                    let lastTime: number = new Date().getTime();
                    await waitForSeconds(0.01);
                    let curTime: number = new Date().getTime();
                    let deltaTime: number = curTime - lastTime;
                    waitTime -= (deltaTime / 1000);
                }
                await this.ConnectAnimHide();
            }
            this.FXBackGround.visible = false;
        }


    }

    protected async ConnectAnimShow() {
        let connectIdx: number[] = BreakAwayGameData.Instance.CurrentConnectItemIdx;
        this.ItemFX = new Dictionary([]);
        if (connectIdx.length > 0) {
            this.ShowShiningComboRate(BreakAwayGameData.Instance.CurrentDataIdx);
            let currData = BreakAwayGameData.Instance.GetCurrentSingleData();
            let hasWild = false;
            for (let i = 0; i < (BreakAwayGameData.Instance.CurrentConnectLineLength + 1) * 3; i++) {
                if (BreakAwayGameData.Instance.WildID.indexOf(currData[i]) > -1) {
                    hasWild = true;
                    break;
                }
            }

            let freeItemLen = currData.filter(x => x == BreakAwayGameData.Instance.FreeGameItemID).length;
            if (freeItemLen >= 3) {
                await waitForSeconds(0.2);
                SoundManger.Instance.PlaySoundSE(BreakAwayGameData.Instance.SoundName.FreegameStart);
            }
            else if (BreakAwayGameData.Instance.CurrentConnectLineLength >= 4)
                SoundManger.Instance.PlaySoundSE(BreakAwayGameData.Instance.SoundName.Win5AKind, true);
            else if (BreakAwayGameData.Instance.CurrentConnectLineLength >= 3)
                SoundManger.Instance.PlaySoundSE(BreakAwayGameData.Instance.SoundName.Win4AKind);
            else if (hasWild) {
                SoundManger.Instance.PlaySoundSE(BreakAwayGameData.Instance.SoundName.WinWild);
            }
            else
                SoundManger.Instance.PlaySoundSE(BreakAwayGameData.Instance.SoundName.Win1);
        }
        let finishCount = 0;
        this.FXBackGround.visible = true;
        let currData = BreakAwayGameData.Instance.GetCurrentSingleData();
        connectIdx.sort((x, y) => { return y - x; });
        for (let i = 0; i < connectIdx.length; i++) {
            let iconID = currData[connectIdx[i]];
            let item = this.slotWheelManager.GetShowItem(connectIdx[i]).getNowComponent();

            if (BreakAwayGameData.Instance.WildID.indexOf(iconID) > -1 || iconID == BreakAwayGameData.Instance.FreeGameItemID) {
                item = this.addConnectFx(connectIdx[i], iconID, this.SpecialItemFXParent).asCom;
            }
            else {
                item = this.addConnectFx(connectIdx[i], iconID, this.ItemFXParent).asCom;
            }
            this.ItemFX.add(connectIdx[i], item);
            let trans = item.getTransition("show");
            trans.setHook("end", () => {
                let showTrans = item.getTransition("show");
                let loopTrans = item.getTransition("loop");
                showTrans.stop();
                loopTrans.play();
                finishCount++;
            }, this);
            trans.play();
        }
        while (finishCount != connectIdx.length)
            await waitForSeconds(0.1);
    }

    protected async  ConnectAnimHide() {
        SoundManger.Instance.StopSoundSE(BreakAwayGameData.Instance.SoundName.Win4AKind);
        SoundManger.Instance.StopSoundSE(BreakAwayGameData.Instance.SoundName.Win5AKind);
        if (this.SpecialWildManager.IsSpecialWIld)
            return;
        let isAnimEnd = false;
        let connectIdx: number[] = BreakAwayGameData.Instance.CurrentBreakItemIdx;
        connectIdx.sort((x, y) => { return x - y });
        if (connectIdx.length > 0) {
            this.ShowTweenComboRate(BreakAwayGameData.Instance.CurrentDataIdx);
            SoundManger.Instance.PlaySoundSE(BreakAwayGameData.Instance.SoundName.Clear);
        }
        let connect = 0;
        for (let i = 0; i < connectIdx.length; i++) {
            let item = this.slotWheelManager.GetShowItem(connectIdx[i]).getNowComponent();
            if (this.ItemFX.containsKey(connectIdx[i]))
                item = this.ItemFX[connectIdx[i]];
            let loopTrans = item.getTransition("loop");
            loopTrans.stop();
            let stopTrans = item.getTransition("hide_stop");
            stopTrans.play(() => { connect++; }, this);
        }

        if (connectIdx.length > 0) {
            while (connectIdx.length < connect)
                await waitForSeconds(0.1);
        }
        await waitForSeconds(0.5);
        isAnimEnd = false;
        for (let i = 0; i < connectIdx.length; i++) {
            let item = this.slotWheelManager.GetShowItem(connectIdx[i]).getNowComponent();
            if (this.ItemFX.containsKey(connectIdx[i]))
                item = this.ItemFX[connectIdx[i]];
            let trans = item.getTransition("hide");
            item.sortingOrder = ZOrder.eConnectAnimation;

            if (i == connectIdx.length - 1)
                trans.setHook("end", () => { isAnimEnd = true; }, this);
            trans.play();

            await waitForSeconds(0.2);
        }

        if (connectIdx.length > 0) {
            while (!isAnimEnd)
                await waitForSeconds(0.1);
        }
        this.hideAllSlotFX();
        this.ItemFX.clear();
    }

    public async FillItem(breakItemIdx: number[]) {
        if (this.SpecialWildManager.IsSpecialWIld)
            return;
        for (let i = 0; i < breakItemIdx.length; i++) {
            this.slotWheelManager.GetShowItem(breakItemIdx[i]).visible = false;
        }
        
        await this.FillItemController.FillItems(this.slotWheelManager.GetAllShowItem());
    }

    public ToArrayData(mapSize: number[], data: number[]): Array<Array<number>> {
        let arrayData: Array<Array<number>> = [];
        for (let i = 0; i < mapSize[1]; i++) {
            arrayData.push([]);
            for (let j = 0; j < mapSize[0]; j++) {
                let idx = i * mapSize[0] + j;
                arrayData[i].push(data[idx]);
            }
        }
        return arrayData;
    }

    protected ShowShiningComboRate(idx: number) {
        if (!BreakAwayGameData.Instance.IsFreeGame)
            return;
        if (idx <= 0)
            return;
        if (idx - 1 < this.ComboShiningFXName.length - 1)
            this.ComboRateShiningTrans[idx - 1].play();
        else
            this.ComboRateShiningTrans[this.ComboShiningFXName.length - 1].play();
    }

    private ShowTweenComboRate(idx: number) {
        if (!BreakAwayGameData.Instance.IsFreeGame)
            return;

        if (idx < this.ComboRateTweenTrans.length - 1)
            this.ComboRateTweenTrans[idx].play();
        else
            this.ComboRateTweenTrans[this.ComboRateTweenTrans.length - 1].play();
    }

    public HideAllComboRate() {
        if (this.isBonus && this.ComboRateHideAllTrans)
            this.ComboRateHideAllTrans.play();
    }

    public UpdateFreeGameCount() {
        if (this.FreeGameCountText != null)
            this.FreeGameCountText.text = BreakAwayGameData.Instance.FreeGameCount.toString();
    }

    protected async ShowMainToBonusFx() {
        this.SetFreeGameFairyGUIFX();
        await this.WaitingBonusResLoad();
        let isAnimEnd = false;
        this.MainToBonusTrans.setHook("end", () => { isAnimEnd = true; }, this);
        this.MainToBonusTrans.play();
        while (!isAnimEnd)
            await waitForSeconds(0.1);
        this.NowWinMoney = 0;
        this.ShowWinMoney(this.NowWinMoney);
        BreakAwayGameData.Instance.IsFreeGame = true;
        SoundManger.Instance.PlayBGM(BreakAwayGameData.Instance.SoundName.FreegameBGM);
    }

    protected async WaitingBonusResLoad() {
        let bonusLang = "Bonus" + LanguageType[SelfData.Instance.Language];
        let tip: MessageTips = null;
        if (SelfData.Instance.AlreadyLoadResGroups.indexOf("Bonus") < 0 || SelfData.Instance.AlreadyLoadResGroups.indexOf(bonusLang) < 0) {
            tip = UIManager.Instance.ShowTip(LocalizationCommonTable.Get(90303));
        }
        while (SelfData.Instance.AlreadyLoadResGroups.indexOf("Bonus") < 0 || SelfData.Instance.AlreadyLoadResGroups.indexOf(bonusLang) < 0) {
            await waitForSeconds(10);
        }
        if (tip != null)
            tip.CloseTip();
    }

    protected async ShowBonusToMainFx() {
        if (FreeGameResultView != null)
            await this.FreeGameResultView.Show(this.NowWinMoney, 5, 5);
        let isAnimEnd = false;
        this.BonusToMainTrans.setHook("end", () => { isAnimEnd = true; }, this);
        this.BonusToMainTrans.play();
        while (!isAnimEnd)
            await waitForSeconds(0.1);
        this.NowWinMoney = 0;
        this.ShowWinMoney(-1);
        await this.UpdateMoney();
        BreakAwayGameData.Instance.IsFreeGame = false;
        this.ComboRateHideAllTrans.play();
        SoundManger.Instance.StopBGM();
        //SoundManger.Instance.PlayBGM(BreakAwayGameData.Instance.SoundName.BGM);
    }

    public async SetReData(redata: ReData) {
        this.NowWinMoney = redata.getMoney;
        BreakAwayGameData.Instance.FreeGameCount = redata.subGameCount;

        this.ShowWinMoney(this.NowWinMoney);
        if (this.FreeGameCountText != null)
            this.FreeGameCountText.text = BreakAwayGameData.Instance.FreeGameCount.toString();
    };

    public async UpdateMoney() {
        this.UpdateAccountMoney();
    }

    protected async ShowNormalWinFx() {
        await this.ShowBigWin(this.NowWinMoney);
    }

    protected addConnectFx(slotIndex: number, targetNum: number, parent: fairygui.GObject): fairygui.GObject {
        if (SelfData.Instance.ConnectionClose)
            return;
        let fx: fairygui.GObject = UIManager.Instance.ShowEffect(SelfData.Instance.MainPackageName, targetNum.toString(), false);
        if (fx == null)
            consoleLog("addSlotFx fail. " + targetNum);
        else {
            this.slotWheelManager.DisableShowItem(slotIndex);
            let worldPoint = this.getSlotItemWorldPoint(slotIndex);
            fx.setXY(worldPoint.x + this.slotWinFxOffset.x, worldPoint.y + this.slotWinFxOffset.y);
            if (parent != null)
                this.view.addChildAt(fx, this.view.getChildIndex(parent) + 1);
            else
                this.view.addChild(fx);
            this.slotWinFX.push(fx);
        }
        return fx;
    }
}