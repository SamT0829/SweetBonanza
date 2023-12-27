class GameBaseView extends MW_BaseView{
    gameBaseSlotManager: SlotWheelManager = new SweetBonanzaSlotWheelManager();
    get slotWheelManager(): SlotWheelManager {
        return this.gameBaseSlotManager;
    }

    public FillItemController: SweetBonanzaFillItemController = null;
    public MapSize: number[] = [];
    public Cancellation_Move: number[] = [0, 13.2, 10, 8, 8, 0];
    public Cancellation_Time: number[] = [1, 1, 1, 11, 1, 15];
    public UpdateCancellationId: number = 0;
    public CancellationItemList: Array<Array<number>> = [[], [], [], [], [], []];
    public CancellationItemRunList: Array<Array<number>> = new Array<Array<number>>();
    public CancellationFinish: boolean = false;

    public slotRows = 5;
    public slotColumns = 6;
    public get maxIconCount() {
        return this.slotRows * this.slotColumns;
    };
    public afterRunMoney: number = 0;
    public NowWinMoney: number = 0;
    public IsReData: boolean = false;
    public NowGetBet: number = 0;
    public WaitReData: boolean = false;
    private showTextAnimFx: boolean = true;
    protected _SlotData: SlotData = null;
    protected _TotalIconRate: Array<number> = new Array<number>();
    public roundWinMoney: number = 0;
    public totalRoundWinMoney: number = 0;
    public roundWinRate: number = 0;
    protected fxParent: fairygui.GComponent = null;
    protected bigWinMessage: string = "";
    
    protected ItemWorldPointMap: Dictionary = new Dictionary([]);
    protected ItemFX: Dictionary = new Dictionary([]);

    //RePlay
    public LadderReplayView: LadderAndReplay;
    public RePlayLobby: LobbyRePlay;

    public get UnitTest(): boolean {
        return SelfData.Instance.UrlParam_GameMode === GameMode.UnitTestMode || SelfData.Instance.UrlParam_GameMode === GameMode.UnitTestSPMode;
    };

//region Init
    public Init(MainGame: fairygui.GComponent) {
        super.Init(MainGame);

        EventManager.Instance.RegisterEventListener(ResizeWindowEvent, this, this.onResize);
        EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.OnUpdate);

        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnStartRun, ClientMsg.StartRun);       
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnStartRun, ClientMsg.BuyBonusOnStart);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnAllWheelStop, ClientMsg.AllWheelStop);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnWheelStop, ClientMsg.WheelStop);
        EventManager.Instance.RegisterEventListener(ClientEvent, this, this.OnRePlayOnStart, ClientMsg.RePlayOnStart);
        
        
        EventManager.Instance.RegisterEventListener(ShowLadderReplay, this, this.CheckShowLadderReplay);

        this.InitManager();
        this.InitCommonUI();
        this.GetAllItemWorldPoint();

        this.RePlayLobby = new LobbyRePlay();
        this.RePlayLobby.Initialize(SweetBonanzaGameModel.Instance.MainParent.asCom, this);
        SweetBonanzaGameView.Instance.MainGameInit(MainGame, this);

    }
    protected InitManager() {
        let slotData = new SlotData();
        slotData.ShowCount = [5, 5, 5, 5, 5, 5];
        slotData.IconMap = new Dictionary([]);
        for (let i = 0; i < 14; ++i) {
            slotData.IconMap.add(i, i.toString());
        }

        // FreeGameBonusIcon
        for (let i = 101; i < 115; ++i) {
            slotData.IconMap.add(i, i.toString());
        }

        slotData.IconRate = SlotIconRateTable.getSlotIconRate(0);
        slotData.RoundStopWaitItem = [2, 2, 2, 2, 2];
        slotData.ItemHeigt = 96;
        slotData.Speed = 30; // 50
        slotData.StartUpSize = 50;
        slotData.StartUpSizeTime = 250;
        slotData.StopUnderSize = 100;
        slotData.StopReduceSpeed = 0; // 1
        slotData.StopReduceLowSpeed = 0;
        slotData.ReboundSpeedTime = 0; // 220
        slotData.TweenEaseKey = TweenEase.None;
        // slotData.StopWaitTimeX3 = [3.2, 3.2, 3.2, 3.2, 3.2];
        // slotData.StopWaitTimeX2 = [8, 8, 8, 8, 8];
        // slotData.StopWaitTime = [48, 96, 24, 18 + w, 24 + w];
        // slotData.StopWaitTime = [0 , 6 , 12 , 18 , 24];
        // slotData.StartWaitTime =  [0, 0.15, 0.3, 0.45, 0.6];
        // slotData.StartWaitTimeX2 = [0, 0, 0, 0, 0];
        // slotData.StartWaitTimeX3 = [0, 0, 0, 0, 0];
        // slotData.UnBlurSpeed = 35;
        slotData.RenderOrder = fairygui.ChildrenRenderOrder.Ascent;
        slotData.SlotWheelExcludeObj = ["alpha", "MaybeBlack"];
        slotData.View = this.view.getChild("SlotMainParent").asCom.getChild("SlotMain").asCom; // 這是SlotMain......
        slotData.ItemType = SlotItemType.Component;
        // slotData.MuzzleVelocity = 10;
        // slotData.MoveTime = 0.2;

        // slotData.MaybeBonusWaitTime =  [2.5, 2.5, 2.5, 2.5, 2.5];
        // slotData.MaybeBonusFastRate = 2;
        // slotData.MaybeReduceSpeed = 0.985;
        // slotData.MaybeReduceSpeedX3 = 0;
        // slotData.MaybeReduceLowSpeed = 3;

        // slotData.MaybeBigWinWaitTime = [0, 0, 0, 0, 0];
        // slotData.MaybeBigWinFastRate = 2;
        // slotData.MaybeBigWinReduceSpeed = 0.985;
        // slotData.MaybeBigWinReduceSpeedX3 = 0;
        // slotData.MaybeBigWinReduceLowSpeed = 3;

        this._SlotData = slotData;

        let wheels: Array<SweetBonanzaSlotWheelBase> = new Array<SweetBonanzaSlotWheelBase>();
        for (let i = 0, max = slotData.ShowCount.length; i < max; ++i) {
            let wheel = new SweetBonanzaSlotWheelBase();
            wheels.push(wheel);
        }
        this.slotWheelManager.Init(slotData, wheels);

        // this.CreateTotalIconRate();

        // WHJDrumView.Instance.Init(WHJDrumModel.Instance.MainGameParents.asCom);
    }
    private InitCommonUI(){
        this.fxParent = this.view.asCom.getChild("SlotMainParent").asCom.getChild("SpecialItemFXParent").asCom;
    }
//endregion

//region ItemWorldPoint
    public GetAllItemWorldPoint() {
        if (this.ItemWorldPointMap._keys.length > 0){
            this.ItemWorldPointMap.clear();
        } 

        for (let i = 0, imax = this.maxIconCount; i < imax; ++i) {
            let point = super.getSlotItemWorldPoint(i);
            this.ItemWorldPointMap.add(i, point);
        }
    }

    protected getSlotItemWorldPoint(slotIndex: number): egret.Point {
        if (this.ItemWorldPointMap.containsKey(slotIndex))
            return this.ItemWorldPointMap[slotIndex];
        else
            return super.getSlotItemWorldPoint(slotIndex);
    }
//endregion

//region GameFx 
    public async ShowMainToBonusFxStart(redata?: ReData) {
        SweetBonanzaGameModel.Instance.IsFreeGame = true;

        // if (redata == null) {
        //     await this.ShowWaitContinueRun();
        // }
        await this.ShowMainToBonusFx(redata);
        await this.ShowMainToBonusFxEnd();
        SavePng("bonus");
    }
    protected async ShowMainToBonusFx(redata?: ReData) {
        await SweetBonanzaGameView.Instance.MainToFreeGameFx(redata);
    }
    protected async ShowMainToBonusFxEnd() {
        this.GetAllItemWorldPoint();
    }
    protected async ShowBonusToMainFx() {
        SweetBonanzaGameModel.Instance.IsFreeGame = false; 
        SweetBonanzaGameModel.Instance.IsFreeGamePlus = false;
        await SweetBonanzaGameView.Instance.FreeGameToMainFx(this.NowWinMoney);  
        SweetBonanzaGameModel.Instance.FreeGameCount = 0;
        await this.ShowBigWin(this.NowWinMoney);
        await SweetBonanzaGameView.Instance.FreeGameToMainFxEnd();
    }
    protected async ShowBonusToMainFxEnd() {
        this.GetAllItemWorldPoint();
    }
    protected async ShowBonus() {
        await super.ShowBonus();
    }
    protected async ShowNormalWinFx() {
        let type: BigWinType = SelfData.Instance.GetBigWinType(this.roundWinMoney);
        if (type !== BigWinType.None) {
            this.ShowLobbyMessage(this.bigWinMessage);
        }
    }
    protected async ShowNormalWinFxEnd() {
    }
    public async ShowBonusWinFxStart() {
        await super.ShowBonusWinFxStart();
    }
    public ShowTotalWinRateMessage() {
        if(this.roundWinMoney * this.roundWinRate >= SelfData.Instance.PlaySetting.TotleBet * SweetBonanzaGameModel.Instance.MaxBetRate){
            let get = SelfData.Instance.PlaySetting.TotleBet * SweetBonanzaGameModel.Instance.MaxBetRate;
            this.ShowLobbyMessage(LocalizationCommonTable.Get(10000004).format((get / 100).toFixed(2)) + "(Max Win)");
        }
        else
            this.ShowLobbyMessage(LocalizationCommonTable.Get(10000004).format((this.roundWinMoney * (this.roundWinRate) / 100).toFixed(2)) + "(" + toCoinToString(this.roundWinMoney) + "X" +  this.roundWinRate + ")");
    }
    public async ShowFinalFxEnd() {
        this.hideAllSlotFX();
    }
    protected hideAllSlotFX(fxList: fairygui.GObject[] = null): void {
        var list = [];
        this.slotWheelManager.EnableAllShowItem();

        if (fxList != null)
            list = fxList;
        else
            list = this.slotWinFX;

        this.removeAllChild(list);
    }
 //endregion
//region GameLineFx
    public async ShowBonusResultSetting(){
        this.afterRunMoney = this.NowWinMoney;        
    }
    protected async ShowWinLineFx() {
        let WinLobbyMsg = "";

        for (let i = 0; i < BreakAwayGameData.Instance.ItemMap.ItemCount; i++) {
            this.slotWinFX.push(null);
        }

        let singleWinMoney = 0;
        let totalWinMoney = 0;
        let subgameCount = 0;
        let bonusRate = 0;
        let lineDatas: Array<number> = [];
        let freeGameBonusRate: boolean = false;

        let getMoneyTextIndex: Array<number>  = [];
        let getMoneyTextMoney: Array<number>  = [];      
        this.IsSkip = false;
        
        for (let i = 0, imax = GameLogic.Instance.SlotResult.lineIndex.length; i < imax; ++i) {
            let index: number = GameLogic.Instance.SlotResult.lineIndex[i];
            //let count: number = GameLogic.Instance.SlotResult.lineCount[i];
            let rate: number = GameLogic.Instance.SlotResult.lineMoney[i];
            let name: string = GameLogic.Instance.SlotResult.lineName[i];
            let lineData: Array<number> = GameLogic.Instance.SlotResult.lineData[index];
            lineData.forEach(x => lineDatas.pushNoRepeat(x));
            let subLineCount: number = GameLogic.Instance.SlotResult.subLineCount[i];
            let lineNum: number = GameLogic.Instance.SlotResult.lineNum[i];
            
            if(SweetBonanzaGameModel.Instance.IsFreeGame){
                let beforPlusWinRate = this.roundWinRate;
                let beforRoundWinMoney =  this.roundWinMoney;

                if(lineNum >= SweetBonanzaGameModel.Instance.freeGameBonusIconId){
                    bonusRate = rate;
                    freeGameBonusRate = true;

                    this.roundWinRate += bonusRate;
                    this.totalRoundWinMoney =  this.roundWinMoney * this.roundWinRate;

                    this.ShowLobbyMessage(LocalizationCommonTable.Get(10000006).format( "X" +  bonusRate));

                    await this.ConnectFreeGameBonusRateAnimShow(lineNum, lineData[0], 
                    () => SweetBonanzaGameView.Instance.WinRateTextNumberIncrementAni(beforPlusWinRate, this.roundWinRate));

                }
                else{
                    singleWinMoney = (SelfData.Instance.PlaySetting.RunBet * rate);
                    totalWinMoney += (SelfData.Instance.PlaySetting.RunBet * rate);

                    if(SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(lineNum) == -1){
                        getMoneyTextIndex.push(lineData[randomInt(0, lineData.length - 1)]);
                        getMoneyTextMoney.push(singleWinMoney);
                    }

                    this.roundWinMoney += singleWinMoney;
                    this.totalRoundWinMoney = this.roundWinMoney;

                    SweetBonanzaGameView.Instance.WinTotalMoneyTextNumberIncrementAni(beforRoundWinMoney, this.roundWinMoney);
                }
            }
            else{
                singleWinMoney = (SelfData.Instance.PlaySetting.RunBet * rate);
                totalWinMoney += (SelfData.Instance.PlaySetting.RunBet * rate);
                this.roundWinMoney += singleWinMoney;
                this.NowWinMoney += (SelfData.Instance.PlaySetting.RunBet * rate);
                
                getMoneyTextIndex.push(lineData[randomInt(0, lineData.length - 1)]);
                getMoneyTextMoney.push(singleWinMoney);
            }
            
            // if (subLineCount)
            //     WinLobbyMsg += LocalizationCommonTable.Get(10000007).format(name, subLineCount.toString()) + " ";
            // else
            WinLobbyMsg += name + " ";
        }

        if(SweetBonanzaGameModel.Instance.IsFreeGame){
            this.NowWinMoney =  this.afterRunMoney + this.totalRoundWinMoney;
             if(this.IsSkip)
                await SweetBonanzaGameView.Instance.WinRateTextNumberIncrementAni(SweetBonanzaGameView.Instance.nowRateText, this.roundWinRate, this.IsSkip)
        }

        // SweetBonanzaGameModel.Instance.NowWinMoney = this.NowWinMoney;

        if(SweetBonanzaGameModel.Instance.IsMaxWinMoney()){
            if(this.NowWinMoney > SelfData.Instance.PlaySetting.TotleBet * SweetBonanzaGameModel.Instance.MaxBetRate)
              this.NowWinMoney = SelfData.Instance.PlaySetting.TotleBet * SweetBonanzaGameModel.Instance.MaxBetRate;
        }
        
        subgameCount = GameLogic.Instance.SlotResult.subGameCount;
        if (!SelfData.Instance.ConnectionClose) {
            this.ShowWinMoney(this.NowWinMoney);
            
            if(freeGameBonusRate){
                // this.hideAllSlotFX();
                return;    
            }
            if (singleWinMoney > 0 || subgameCount > 0 || bonusRate > 0) {
                this.ShowLobbyMessage(WinLobbyMsg + LocalizationCommonTable.Get(10000004).format((totalWinMoney / 100).toFixed(2)));
                    // + "(X" + BreakAwayGameData.Instance.GetComboRate(WHJMoneyModel.Instance.ComboIndex, !WHJMoneyModel.Instance.IsFreeGame) + ")");

                let isWildWin = false;
                for (let i = 0, imax = lineDatas.length; i < imax; ++i) {
                    let slotIndex: number = lineDatas[i];
                    let targetNum: number = GameLogic.Instance.SlotResult.data[lineDatas[i]];
                    if (targetNum === 0 || targetNum === 1) {
                        isWildWin = true;
                        break;
                    }
                }

                let result: SlotResultBase = GameLogic.Instance.SlotResult;
                let resultRate = ((result.getBet * SelfData.Instance.PlaySetting.RunBet) / SelfData.Instance.PlaySetting.TotleBet);
                let musicname = "WinMusic_0";
                let soundTime = 0;

                if (subgameCount > 0)
                    soundTime = 0.5;
                else
                    soundTime = 0.1;
                
                SoundManger.Instance.SetBgmVolume(0.3);
                SoundManger.Instance.PlaySoundSE(musicname);
                await this.ConnectAnimShow();
               
                while (soundTime > 0 && !this.IsSkip) {
                    let lastTime: number = new Date().getTime();
                    await waitForSeconds(0.01);
                    let curTime: number = new Date().getTime();
                    let deltaTime: number = curTime - lastTime;
                    soundTime -= (deltaTime / 1000);
                }

                musicname = "IconHide_0";

                if (subgameCount > 0)
                    soundTime = 0.5;
                else
                    soundTime = 0.1;
                

                SoundManger.Instance.SetBgmVolume(0.3);
                if (subgameCount <= 0)
                    SoundManger.Instance.PlaySoundSE(musicname);

                await this.ConnectAnimHide(this.ConnectTextAnim(getMoneyTextIndex, getMoneyTextMoney));
            }
        }
    }
    public async ShowBonusWinEnd() {
        super.ShowBonusWinEnd();
        await SweetBonanzaGameView.Instance.ShowBonusWinEnd(this.roundWinMoney, this.totalRoundWinMoney);
        await this.ShowBigWin(this.roundWinMoney);
        this.roundWinRate = 0;
        this.roundWinMoney = 0;
        this.totalRoundWinMoney = 0;
    }

    public async ShowBigWinAni(Money: number){
        await this.ShowBigWin(Money);
    }

    protected async ConnectAnimShow() {
        let connectIdx: number[] = BreakAwayGameData.Instance.CurrentConnectShowItemIdx;
        this.ItemFX = new Dictionary([]);
        let currData = BreakAwayGameData.Instance.GetCurrentSingleData();
        
        let finishCount = 0;
        let iconID = currData[connectIdx[0]];

        if(SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(iconID) >= 0){
            SoundManger.Instance.PlaySoundSE("FreeGameAlarm");
        }
        
        // connectIdx.sort((x, y) => { return y - x; });
        for (let i = 0; i < connectIdx.length; i++) {
            iconID = currData[connectIdx[i]];
            let item = this.slotWheelManager.GetShowItem(connectIdx[i]).getNowComponent();
            item = this.addConnectFx(connectIdx[i], iconID, this.fxParent).asCom;
            this.ItemFX.add(connectIdx[i], item);
            let trans = item.getTransition("show");
            trans.setHook("end", () => {
                if(SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(iconID) >= 0){
                    if(SweetBonanzaGameView.Instance.GetOutOfFrameFX(connectIdx[i]) != null){
                        item.visible = false;
                        SweetBonanzaGameView.Instance.GetOutOfFrameFX(connectIdx[i]).visible = true;
                    }
                }
                finishCount++;
            }, this);

            if(SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(iconID) >= 0){
                if(SweetBonanzaGameView.Instance.GetOutOfFrameFX(connectIdx[i]) != null){
                        SweetBonanzaGameView.Instance.GetOutOfFrameFX(connectIdx[i]).visible = false;
                }
            }

            trans.play();
        }

        while (finishCount != connectIdx.length)
            await waitForSeconds(0.01);

        if(SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(iconID) >= 0){
            if(SweetBonanzaGameModel.Instance.IsFreeGamePlus)
                await SweetBonanzaGameView.Instance.ShowFreeGamePlus();
        }
    }
    public async ConnectFreeGameBonusRateAnimShow(iconId: number, iconIndex: number, bonusRateFunc: Function){
        let item = (<SweetBonanzaSlotItem>this.slotWheelManager.GetShowItem(iconIndex)).GetItemBonusXComponent();
        let itemCom = (<SweetBonanzaSlotItem>this.slotWheelManager.GetShowItem(iconIndex)).GetItemComponent();
        itemCom.getTransition("stop_one").play();
        item.visible = false;
        let itemPoint = this.getSlotItemWorldPoint(iconIndex);
        item = this.addConnectFx(iconIndex, iconId, this.fxParent).asCom;

        if(!this.IsSkip){
            await SweetBonanzaGameView.Instance.ConnectFreeGameBonusRateAnimShow(item, itemPoint, bonusRateFunc);
        }
        else{
            await SweetBonanzaGameView.Instance.ConnectFreeGameBonusRateSkipShow(item, itemPoint, bonusRateFunc);
        }
    }
    public async ConnectAnimHide(connectTextAnimFunc: Promise<void>) {
        let isAnimEnd = false;
        let connectIdx: number[] = BreakAwayGameData.Instance.CurrentConnectItemIdx;
        let connectIdxOnlyShow: number[] = BreakAwayGameData.Instance.CurrentConnectShowItemIdx;

        connectIdx.sort((x, y) => { return x - y });
        connectIdxOnlyShow.sort((x, y) => { return x - y });

        if(connectIdx.length == 0 )
            return;

        for (let i = 0; i < connectIdxOnlyShow.length; i++) {
            let item = this.slotWheelManager.GetShowItem(connectIdxOnlyShow[i]).getNowComponent();
            if (this.ItemFX.containsKey(connectIdxOnlyShow[i]))
                item = this.ItemFX[connectIdxOnlyShow[i]];
            let loopTrans = item.getTransition("loop");
            loopTrans.stop();
            let stopTrans = item.getTransition("stop_one");
            stopTrans.play();
            item.sortingOrder = ZOrder.eConnectAnimation;
        }
        if (connectIdxOnlyShow.length > 0) {
            SoundManger.Instance.PlaySoundSE(BreakAwayGameData.Instance.SoundName.Clear);

        }
        let idx = 0;
        let preCount = 0;
        let vecFillData = [];
        this.CancellationItemList = [[], [], [], [], [], []];
        for (let i = 0; i < SweetBonanzaGameModel.Instance.SlotColumns; i++) {
            let count: number = connectIdx.filter((x) => { return (i + 1) * 5 > x; }).length - preCount;
            for (let j = 0; j < count; j++) {
                this.CancellationItemList[i].push(connectIdx[idx + j]);
            }
            idx += count;
            preCount += count;
        }
        let index = 0;
        for (let idx = 0; idx < this.CancellationItemList.length; idx++) {
            if (this.CancellationItemList[idx].length > 0)
                index++;
        }
        this.SetCancellation(this.CancellationItemList);
        this.CancellationFinish = false;
        // this.UpdateCancellationId = EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.UpdateCancellation);

        idx = 0;
        preCount = 0;
        let CancellationItemListOnlyShow = [[], [], [], [], [], []];
        for (let i = 0; i <=  SweetBonanzaGameModel.Instance.SlotColumns; i++) {
            let count: number = connectIdxOnlyShow.filter((x) => { return (i + 1) * 5 > x; }).length - preCount;
            for (let j = 0; j < count; j++) {
                CancellationItemListOnlyShow[i].push(connectIdxOnlyShow[idx + j]);
            }
            idx += count;
            preCount += count;
        }

        let showConnectText = false;
        for (let i = 0; i < CancellationItemListOnlyShow.length; i++) {
            if (CancellationItemListOnlyShow[i].length > 0) {
                for (let j = 0; j < CancellationItemListOnlyShow[i].length; j++) {
                    // let item = this.slotWheelManager.GetShowItem(CancellationItemListOnlyShow[i][j]).getNowComponent();
                    if (this.ItemFX.containsKey(CancellationItemListOnlyShow[i][j])){
                        let item = this.ItemFX[CancellationItemListOnlyShow[i][j]];
                        let trans = item.getTransition("hide");
                        item.sortingOrder = ZOrder.eConnectAnimation + 1;
                        trans.setHook("end", () => {
                            this.ItemFX.remove(CancellationItemListOnlyShow[i][j]);
                        }, this);

                    trans.play();
                    }
                }
            }
        }

     
        // while (!this.CancellationFinish) {
        //     await waitForSeconds(0.01);
        // }
        if (connectIdx.length > 0) {
            while(this.ItemFX.Count > 0)
                await waitForSeconds(0.1);
        }

        connectTextAnimFunc;

        this.hideAllSlotFX();
        this.ItemFX.clear();
    }
    private async ConnectTextAnim(getMoneyTextIndex: Array<number>, getMoneyTextMoney: Array<number>){
         if(!this.showTextAnimFx)
            return;

        let texts = Array<fairygui.GTextField>();
       
        for(let i = 0; i < getMoneyTextIndex.length; i ++){
            let point: egret.Point = this.getSlotItemWorldPoint(getMoneyTextIndex[i]);
            let text = SweetBonanzaGameView.Instance.CreateTextAnimShow(this.fxParent, getMoneyTextMoney[i], point);
            texts.push(text);
        }

        await waitForSeconds(1.8);

        texts.forEach(text => {
                text.parent.removeChild(text);
        });
    }
    public addConnectFx(slotIndex: number, targetNum: number, parent: fairygui.GComponent, fxList: fairygui.GObject[] = this.slotWinFX): fairygui.GObject {
        if (SelfData.Instance.ConnectionClose)
            return;
        let fx: fairygui.GObject = UIManager.Instance.ShowEffect(SelfData.Instance.MainPackageName, this.slotWheelManager.slotData.IconMap[targetNum].toString(), false);
        if (fx == null)
            consoleLog("addSlotFx fail. " + targetNum);
        else {
            this.slotWheelManager.DisableShowItem(slotIndex);
            let worldPoint = this.getSlotItemWorldPoint(slotIndex);
            fx.setXY(worldPoint.x + this.slotWinFxOffset.x, worldPoint.y + this.slotWinFxOffset.y);
            parent.addChild(fx);
            if(fxList != null)
                fxList.push(fx);
        }
    
        return fx;
    }
    public SetCancellation(_list: Array<Array<number>>) {
        let runMove: number[] = [];
        for (let i = 0; i < this.Cancellation_Move.length; i++) {
            for (let j = 0; j < this.Cancellation_Time[i]; j++) {
                runMove.push(this.Cancellation_Move[i]);
            }
        }
        this.CancellationItemRunList = [];
        for (let k = 0; k < 30; k++) {
            this.CancellationItemRunList.push([]);
        }
        for (let index = 0; index < _list.length; index++) {
            if (_list[index].length > 0) {
                for (let round = 0; round < _list[index].length; round++) {
                    let data = copyArray(runMove, 0, runMove.length);
                    this.CancellationItemRunList[_list[index][round]] = data;
                }
                runMove.unshift(0, 0);
            }
        }
    }
    public async UpdateCancellation() {
        let End: boolean = true;
        for (let i = 0; i < this.CancellationItemRunList.length; i++) {
            if (this.CancellationItemRunList[i].length > 0) {
                let ScaleSize = this.CancellationItemRunList[i].shift();
                let item = this.slotWheelManager.GetShowItem(i).getNowComponent();
                let itemBG = this.slotWheelManager.GetShowItem(i).getNowComponentBG();
                if (this.ItemFX.containsKey(i)) {
                    item = this.ItemFX[i].getChild("ItemIcon").asCom;
                    itemBG = this.ItemFX[i].getChild("ItemBG").asCom;
                }
                item.sortingOrder = ZOrder.eConnectAnimation + 1;
                if (ScaleSize > 0) {
                    item.setScale(item.scaleX - (ScaleSize / 100), item.scaleY - (ScaleSize / 100));
                    if (item.scaleX < 0) {
                        item.setScale(0, 0);
                        item.alpha = 0;
                        itemBG.alpha = 0;
                    }
                }
                End = false;
            }
        }
        if (End) {
            this.CancellationEnd();
        }
    }
    public CancellationEnd() {
        EventManager.Instance.UnregisterEventListener(this.UpdateCancellationId);
        this.CancellationFinish = true;
    }
//endregion

//region GameSetting
    public async SetReData(redata: ReData) {
        this.NowWinMoney = redata.getMoney;
        SweetBonanzaGameModel.Instance.FreeGameCount = redata.subGameCount;
        SweetBonanzaGameModel.Instance.NowWinMoney = this.NowWinMoney;

        if(SweetBonanzaGameModel.Instance.CheckMoney != this.NowWinMoney)
             consoleLog("Money error CheckMoney: " + SweetBonanzaGameModel.Instance.CheckMoney + " | NowWinMoney: " + this.NowWinMoney);
             
        this.ShowWinMoney(this.NowWinMoney);
        await SweetBonanzaGameView.Instance.UpdateFreeGameCount();
    }
    public onResize(event: ResizeWindowEvent): void {
        if (window.innerWidth >= window.innerHeight) {
            SweetBonanzaGameView.Instance.OnResize(true);
        }
        else {
            SweetBonanzaGameView.Instance.OnResize(false);
        }
    }
    public OnUpdate(){
        if(SelfData.Instance.PlaySetting.IsAuto || SlotGameController.isPlaying || SelfData.Instance.IsOpenBonusSpin 
            || SweetBonanzaGameModel.Instance.OnRePlayOnStart)
            SweetBonanzaGameView.Instance.DoubleWinRateStateDisable(false);
        else
            SweetBonanzaGameView.Instance.DoubleWinRateStateDisable(true);
    }

    public async UpdateMoney() {
        this.UpdateAccountMoney();
    }

    removeobj = null;
    protected RemoveObj(parent: fairygui.GComponent, obj: fairygui.GObject) {
        this.removeobj = obj;
        parent.removeChild(this.removeobj);
        delete this.removeobj;
    }
//endregion

//region WheelSetting
    /**開始運行*/
    public async StartRun() {
        this.IsSkip = false;
        if(!this.isBonus && !SweetBonanzaGameModel.Instance.IsSpecialWildGame)
            this.ShowWinMoney(-1);                                                                  //贏分歸零
        this.ShowLobbyMessage(LocalizationCommonTable.Get(10000002));

        if(SweetBonanzaGameModel.Instance.IsFreeGame && !SweetBonanzaGameModel.Instance.IsSpecialWildGame){
            SweetBonanzaGameModel.Instance.FreeGameCount --;
            SweetBonanzaGameView.Instance.UpdateFreeGameCount();
        }
        
        SweetBonanzaGameView.Instance.RemoveAllOutOfFrameFX();
        await this.slotWheelManager.StartRun();
        await this.Run();
    }
    public async Run(){
    }
    public async StopStart() {
        await this.slotWheelManager.SpecialStopRun(GameLogic.Instance.ShowResult[0] , GameLogic.Instance.ShowResult[1]);
        await this.Stoping();
        await this.Stop();
        await this.ReSpin();
    }
    protected async Stop() {
    }
    
    protected OnStartRun(event: ClientEvent){
        SweetBonanzaGameModel.Instance.MaxWinMoney = SelfData.Instance.PlaySetting.TotleBet * SweetBonanzaGameModel.Instance.MaxBetRate;
    }
    private OnRePlayOnStart(){
        SweetBonanzaGameModel.Instance.OnRePlayOnStart = true;
        SweetBonanzaGameModel.Instance.MaxWinMoney = SelfData.Instance.PlaySetting.TotleBet * SweetBonanzaGameModel.Instance.MaxBetRate;
    }
    protected OnAllWheelStop(event: ClientEvent) {
        let data = BreakAwayGameData.Instance.GetCurrentSingleData();
        let isFreeGame : boolean[] = [false, false, false, false, false];
        let freeGameCurrCount = 0;

        for (let i = 0; i < BreakAwayGameData.Instance.ItemMap.MapSize[1]; i++){
            // if(i != 0 && !isFreeGame[i -1])
            //     break;

            for(let j = 0; j < BreakAwayGameData.Instance.ItemMap.MapSize[0]; j++){
                let idx = i * BreakAwayGameData.Instance.ItemMap.MapSize[0] + j;
                if (SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(data[idx]) >= 0) {
                    isFreeGame[i] = true;
                    freeGameCurrCount ++;
                    break;
                }
            }
        }
        
        if(!SweetBonanzaGameModel.Instance.IsFreeGame){
            if (freeGameCurrCount >= 4) {
                // SoundManger.Instance.PlaySoundSE("VIP_alarm");
            }
        }
        else{
             if (freeGameCurrCount >= 3) {
                // SoundManger.Instance.PlaySoundSE("VIP_alarm");
            }
        }
    }
    protected OnWheelStop(event: ClientEvent) {
        let num = event.eventData; //0~4
        let data = BreakAwayGameData.Instance.GetCurrentSingleData();
        let scatterIndex = [];

        for (let j = 0; j < BreakAwayGameData.Instance.ItemMap.MapSize[0]; j++) {
            let idx = num * BreakAwayGameData.Instance.ItemMap.MapSize[0] + j;

            if (SweetBonanzaGameModel.Instance.freeGameBonusIndex.indexOf(data[idx]) >= 0) {
                scatterIndex.push(idx);
                // let musicname = "VIP_Coin1Stop";
                // SoundManger.Instance.SetBgmVolume(0.3);
                // SoundManger.Instance.PlaySoundSE(musicname);
            }
        }

        for (let i = 0; i < scatterIndex.length; i++) {
            let index = scatterIndex[i];
            let iconID = data[scatterIndex[i]];
            SweetBonanzaGameView.Instance.SetOutOfFrameFx(scatterIndex[i], iconID);
        }
    }
    protected async OnManualSkip() {
        this.IsSkip = true;
    }
//endregion

//region FillItemSetting
    public async FillItem(breakItemIdx: number[]) {
        for (let i = 0; i < breakItemIdx.length; i++) {
            this.slotWheelManager.GetShowItem(breakItemIdx[i]).visible = false;
        }

        await this.FillItemController.FillItems(this.slotWheelManager.GetAllShowItem(), this.maxIconCount);
    }

    public SetFillItemController(itemMap: ItemMap) {
        this.FillItemController = new SweetBonanzaFillItemController(itemMap, this.slotWheelManager._slotData.ItemHeigt, true, [], 0.07, 100);
        this.MapSize = itemMap.MapSize;
        this.slotRows = this.MapSize[0];
        this.slotColumns = this.MapSize[1];
    }
//endregion

//RePlay
    public async CheckShowLadderReplay(event: ShowLadderReplay) {
        if (this.LadderReplayView == null) {
            this.LadderReplayView = new LadderAndReplay();
            this.LadderReplayView.Init(SweetBonanzaGameModel.Instance.MainParent.asCom);
        }
        if (event.Type == 0) {
            if (SelfData.Instance.CanBuyFreeGame && SelfData.Instance.AccountData.AllowBuy)
                this.LadderReplayView.ShowBuy();
            else
                this.LadderReplayView.Show();
        }
        else if (event.Type == 1) {
            if (SelfData.Instance.CanBuyFreeGame && SelfData.Instance.AccountData.AllowBuy)
                this.LadderReplayView.ShowBuy();
        }
        else if (event.Type == 2) {
            this.LadderReplayView.ReplayRequest(Number(SelfData.Instance.UrlParam_RePlayID));
        }
    }
//endregion
}