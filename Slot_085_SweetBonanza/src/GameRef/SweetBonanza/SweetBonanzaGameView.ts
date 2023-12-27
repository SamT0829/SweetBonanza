class SweetBonanzaGameView{
    private GameBaseView: GameBaseView;

    // Component
    private MainGameTransition : fairygui.Transition;
    private FreeGameTransition : fairygui.Transition;

    // Tumble Win Component
    private TumbleWinCom : fairygui.GComponent;
    public nowRateText: number = 0;
    private TumbleWinRateText : fairygui.GTextField;
    private TumbleWinMoneyText : fairygui.GTextField;
    private TumbleWinTotalMoneyText : fairygui.GTextField;
    private TumbleWinShowRateTransition : fairygui.Transition;
    private TumbleWinHideRateTransition : fairygui.Transition;
    private IsTumbleWinShow : boolean = false;

    private FreeGameCountTextCom : fairygui.GComponent;
    private FreeGameCountText : fairygui.GTextField;
    private FreeGameCountLoader: fairygui.GLoader;

    private FreeGamePlusCom: fairygui.GComponent;
    private FreeGamePlusLoader: fairygui.GLoader;
    private FreeGamePlusCountText: fairygui.GTextField;

    private DoubleWinRateButtonCom: fairygui.GComponent;
    private DoubleWinRateLoader: fairygui.GLoader;
    private DoubleWinBetText: fairygui.GTextField;
    private DoubleWinOnButton: fairygui.GButton;
    private DoubleWinOffButton: fairygui.GButton;
    private DoubleWinButtonEnable: boolean = false;

    // Free Game Component
    private FreeGameFx: fairygui.GComponent;

    private FreeGameShowPanelCom : fairygui.GComponent;
    private FreeGameShowPanelCountText : fairygui.GTextField;
    private FreeGameShowContinueButton : fairygui.GButton;
    private FreeGameShowPressContinueText: fairygui.GTextField;
    private Show_CongratulationsIconLoader: fairygui.GLoader;
    private Show_YouWonIconLoader: fairygui.GLoader;
    private Show_FreeGameIconLoader: fairygui.GLoader;
    private IsFreeGameShowContinuePress : boolean = false;

    private FreeGameShowCalculateCom: fairygui.GComponent;
    private FreeGameWinTotalMoneyText : fairygui.GTextField;
    private FreeGameCalculateContinueButton : fairygui.GButton;
    private Calculate_CongratulationsIconLoader: fairygui.GLoader;
    private Calculate_YouWonIconLoader: fairygui.GLoader;
    private IsFreeGameCalculateContinuePress : boolean = false;

    private onResizeTransition_W: fairygui.Transition;
    private onResizeTransition_V: fairygui.Transition;

    // Out Of Frame
    private OutOfFrameFxParent: fairygui.GComponent = null;
    private OutOfFrameFXTable: Dictionary = new Dictionary([]);

    private WIN_TEXT_FONT_SIZE = 8;
    private WIN_TOTAL_MONEY_TEXT_WIDTH :number = 359;
    private WIN_MONEY_TEXT_WIDTH :number = 240;
    private FREE_GAME_WIN_TOTAL_TEXT_FONT_SIZE = 29;
    private FREE_GAME_WIN_TOTAL_TEXT_WIDTH = 493;

    private WIN_RATE_TEXT_WIDTH :number = 100;
    private WIN_RATE_TEXT_FLY_TARGET_POINT: egret.Point;
    private WIN_RATE_TEXT_FLY_TIME: number;

    private DOUBLE_WIN_BET_TEXT_FONT_SIZE: number = 17;
    private DOUBLE_WIN_BET_TEXT_WIDTH: number = 103;

    private isSkip: boolean = false;
    

    private static instance : SweetBonanzaGameView = null;
    public static get Instance() {
        if(this.instance == null)
            this.instance = new SweetBonanzaGameView();

        return this.instance;
    }

//region Init
    public MainGameInit(mainGameComponent: fairygui.GComponent, gameBaseView: GameBaseView){
        this.GameBaseView = gameBaseView;

        this.MainGameTransition = mainGameComponent.getTransition("MainGame");
        this.FreeGameTransition = mainGameComponent.getTransition("FreeGame");

        this.TumbleWinCom = mainGameComponent.getChild("SlotMainParent").asCom.getChild("TumbleWin").asCom;
        this.TumbleWinRateText = this.TumbleWinCom.getChild("WinRate").asTextField;
        this.TumbleWinMoneyText = this.TumbleWinCom.getChild("WinMoneyCom").asCom.getChild("WinMoney").asTextField;
        this.TumbleWinTotalMoneyText = this.TumbleWinCom.getChild("WinTotalMoney").asTextField;
        this.TumbleWinShowRateTransition = this.TumbleWinCom.getTransition("Show");
        this.TumbleWinHideRateTransition = this.TumbleWinCom.getTransition("Hide");


        this.FreeGameCountTextCom = mainGameComponent.getChild("FreeGameCountTextCom").asCom;
        this.FreeGameCountText = this.FreeGameCountTextCom.getChild("Panel").asCom.getChild("FreeGameCountText").asTextField;
        this.FreeGameCountLoader = this.FreeGameCountTextCom.getChild("Panel").asCom.getChild("FreeGameCountLoader").asLoader;
        this.FreeGameCountTextCom.visible = false;

        this.FreeGamePlusCom = mainGameComponent.getChild("FreeGamePlus").asCom;
        this.FreeGamePlusCountText = this.FreeGamePlusCom.getChild("Panel").asCom.getChild("FreeGamePlusCountText").asTextField;
        this.FreeGamePlusLoader = this.FreeGamePlusCom.getChild("Panel").asCom.getChild("n20").asLoader;

        this.WIN_RATE_TEXT_FLY_TARGET_POINT = new egret.Point(this.TumbleWinCom.x + this.TumbleWinRateText.x, this.TumbleWinCom.y + this.TumbleWinRateText.y);
        this.WIN_RATE_TEXT_FLY_TIME = 400;

        this.WIN_TOTAL_MONEY_TEXT_WIDTH = this.TumbleWinTotalMoneyText.width;
        this.WIN_RATE_TEXT_WIDTH = this.TumbleWinRateText.width;
        this.WIN_MONEY_TEXT_WIDTH = this.TumbleWinMoneyText.width;

        this.OutOfFrameFxParent = mainGameComponent.getChild("SlotMainParent").asCom.getChild("OutOfFrameFxParent").asCom;

        this.InitLoader();
    }

    public InitLoader(){
        this.FreeGameCountLoader.url = getFairyUIURL(SweetBonanzaGameModel.Instance.MainPackageName, "freegame_");
        this.DoubleWinRateLoader.url = getFairyUIURL(SweetBonanzaGameModel.Instance.MainPackageName , "double_");
        this.Show_CongratulationsIconLoader.url = getFairyUIURL(SweetBonanzaGameModel.Instance.MainPackageName, "congrat_");
        this.Show_YouWonIconLoader.url = getFairyUIURL(SweetBonanzaGameModel.Instance.MainPackageName, "won_");
        this.Show_FreeGameIconLoader.url = getFairyUIURL(SweetBonanzaGameModel.Instance.MainPackageName, "freegame_");
        this.Calculate_CongratulationsIconLoader.url = getFairyUIURL(SweetBonanzaGameModel.Instance.MainPackageName, "congrat_");
        this.Calculate_YouWonIconLoader.url = getFairyUIURL(SweetBonanzaGameModel.Instance.MainPackageName, "won_");

        this.FreeGameShowPressContinueText.text = LocalizationTable.Get(30000440);
    }

    public MainParentInit(mainParentComponent: fairygui.GComponent){
        this.FreeGameFx = mainParentComponent.getChild("FreeGameFx").asCom;
        this.FreeGameFx.visible = false;
        this.FreeGameFx.sortingOrder =  ZOrder.eLobbyBar + 50

        this.FreeGameShowPanelCom = mainParentComponent.getChild("FreeGameShowPanel").asCom;
        this.FreeGameShowPanelCom.sortingOrder =  ZOrder.eLobbyBar + 50
        let panel: fairygui.GComponent = this.FreeGameShowPanelCom.getChild("Panel").asCom;
        this.FreeGameShowPanelCountText = panel.getChild("FreeGameCount").asTextField;
        this.FreeGameShowContinueButton = this.FreeGameShowPanelCom.getChild("FreeGameShowContinueButton").asButton;
        this.FreeGameShowContinueButton.addClickListener(()=> this.IsFreeGameShowContinuePress = false, this);
        this.FreeGameShowPressContinueText = panel.getChild("PressContinueText").asTextField;
        this.Show_CongratulationsIconLoader = panel.getChild("CongratulationsIconLoader").asLoader;
        this.Show_YouWonIconLoader = panel.getChild("YouWonIconLoader").asLoader;
        this.Show_FreeGameIconLoader = panel.getChild("FreeGameIconLoader").asLoader;

        this.FreeGameShowCalculateCom = mainParentComponent.getChild("FreeGameShowCalculatePanel").asCom;
        this.FreeGameShowCalculateCom.sortingOrder =  ZOrder.eLobbyBar + 50
        
        let textCom = this.FreeGameShowCalculateCom.getChild("Panel").asCom.getChild("TextCom").asCom;
        this.FreeGameWinTotalMoneyText = textCom.getChild("FreeGameWinTotalMoney").asTextField;
        this.FreeGameCalculateContinueButton = this.FreeGameShowCalculateCom.getChild("FreeGameCalculateContinueButton").asButton;
        this.FreeGameCalculateContinueButton.addClickListener(()=> this.IsFreeGameCalculateContinuePress = false, this);
        this.Calculate_CongratulationsIconLoader = textCom.getChild("CongratulationsIconLoader").asLoader;
        this.Calculate_YouWonIconLoader = textCom.getChild("YouWonIconLoader").asLoader;

        this.DoubleWinRateButtonCom =  mainParentComponent.getChild("DoubleWinRateButton").asCom;
        SweetBonanzaGameModel.Instance.DoubleWinRateButtonCom = this.DoubleWinRateButtonCom;
        this.DoubleWinRateLoader = this.DoubleWinRateButtonCom.getChild("Panel").asCom.getChild("DoubleWinRateLoader").asLoader;
        this.DoubleWinBetText = this.DoubleWinRateButtonCom.getChild("Panel").asCom.getChild("DoubleWinBetText").asTextField;
        this.DoubleWinOnButton = this.DoubleWinRateButtonCom.getChild("Panel").asCom.getChild("OnButton").asButton;
        this.DoubleWinOnButton.addClickListener(() => {
            SweetBonanzaGameModel.Instance.OnDoubleWinRate = true;
            this.onDoubleWinRateButtonStateChange(SweetBonanzaGameModel.Instance.LobbyView)}, this);
        this.DoubleWinOffButton = this.DoubleWinRateButtonCom.getChild("Panel").asCom.getChild("OffButton").asButton;
        this.DoubleWinOffButton.addClickListener(() => {
            SweetBonanzaGameModel.Instance.OnDoubleWinRate = false;
            this.onDoubleWinRateButtonStateChange(SweetBonanzaGameModel.Instance.LobbyView)}, this);
        this.DoubleWinOnButton.visible = true;
        this.DoubleWinOffButton.visible = false;

        this.UpdateDoubleWinBetText();
    }

    public MainAllInit(MainAllComponent){
        this.onResizeTransition_W = MainAllComponent.getTransition("t0");
        this.onResizeTransition_V = MainAllComponent.getTransition("t1");
    }
//endregion 

//region Free GameFx
    public async MainToFreeGameFx(redata?: ReData){
        this.DoubleWinRateButtonCom.getTransition("exit").play();

        if(!redata){
            let finish = false;
            this.FreeGameFx.visible = true;
            let trans = this.FreeGameFx.getTransition("play");
            trans.setHook("start", ()=>{
                finish = true;
                this.FreeGameFx.visible = false;
            }, this);
            SoundManger.Instance.PlaySoundSE("FreeGameFx");
            trans.play();

            while(!finish)
                await waitForSeconds(0.1);

            this.MainToFreeGameSetting();
            this.FreeGameTransition.play();
            this.UpdateFreeGameCount();
            this.FreeGameCountTextCom.getTransition("enter").play();
            SoundManger.Instance.PlaySoundSE("BoardDown");
            this.IsFreeGameShowContinuePress = true;
            this.FreeGameShowPanelCom.visible = true;
            this.FreeGameShowPanelCom.getTransition("t0").play();
            SoundManger.Instance.PlayBGM("FreeGameBG");
            await this.FreeGameWaitPressAnyWhereToContinue();
            trans = this.FreeGameShowPanelCom.getTransition("t2");
            trans.setHook("end",()=> {
                this.FreeGameShowPanelCom.visible = false;
            }, this);
            trans.play();
        }
        else{
            this.UpdateFreeGameCount();
            this.MainToFreeGameSetting();
            this.FreeGameTransition.play();
            SoundManger.Instance.PlayBGM("FreeGameBG");
        }
    }
    public async FreeGameToMainFx(totlaMoney : number){
        this.IsFreeGameCalculateContinuePress = true;
        this.FreeGameShowCalculateCom.visible = true;
        this.FreeGameShowCalculateCom.getTransition("t0").play();
        let musicname = "FreeGameCalculate";
        SoundManger.Instance.SetBgmVolume(0.3);
        SoundManger.Instance.PlaySoundSE(musicname);
        await this.FreeGameMoneyResult(totlaMoney);
        await waitForSeconds(1);
        SoundManger.Instance.StopSoundSE(musicname);

        let trans = this.FreeGameShowCalculateCom.getTransition("t2");
        trans.setHook("end",()=> {
            this.FreeGameShowCalculateCom.visible = false;
            
        }, this);
        trans.play();
    }
    public async FreeGameToMainFxEnd(){
        this.DoubleWinRateButtonCom.visible = true;
        this.MainGameTransition.play();
        this.FreeGameCountTextCom.getTransition("exit").play();
        await waitForSeconds(0.5);
        this.DoubleWinRateButtonCom.getTransition("enter").play();
        SoundManger.Instance.PlayBGM("BGMusic");

    } 

    public UpdateFreeGameCount(){
        this.FreeGameCountText.text = SweetBonanzaGameModel.Instance.FreeGameCount.toString();
    }
    public async ShowBonusWinEnd(roundWinMoney: number, totlaRoundWinMoney: number){
        if(this.IsTumbleWinShow){
            let end = false;
            this.TumbleWinHideRateTransition.setHook("end", ()=> {
                end = true
                SoundManger.Instance.StopSoundSE("TumbleWin");
            }, this);
            this.TumbleWinHideRateTransition.play();
            SoundManger.Instance.PlaySoundSE("TumbleWin");
            
            if(!end) await waitForSeconds(0.1);
            SoundManger.Instance.PlaySoundSE("TotalMoneyText");
            await this.NumberIncrementPlusTextAni("", this.TumbleWinTotalMoneyText, toCoin(roundWinMoney), toCoin(totlaRoundWinMoney), 1.5, 2, ()=>{}, this,
                true, this.WIN_TEXT_FONT_SIZE, this.WIN_TOTAL_MONEY_TEXT_WIDTH);
            await waitForSeconds(0.4);
            SoundManger.Instance.StopSoundSE("TotalMoneyText");
            await this.GameBaseView.ShowBigWinAni(totlaRoundWinMoney);
        }
        else{
            await this.GameBaseView.ShowBigWinAni(roundWinMoney);
        }

        this.TumbleWinCom.visible = false;
        this.TumbleWinTotalMoneyText.text = "0";
        this.TumbleWinRateText.text = "0";
        this.TumbleWinRateText.visible = false;
        this.IsTumbleWinShow = false;
    }
    public async FreeGameMoneyResult(totlaMoney : number){
        await NumberIncrementAni(this.FreeGameWinTotalMoneyText, 0, toCoin(totlaMoney), 2.5, 2, () => !this.IsFreeGameCalculateContinuePress, this, true, this.FREE_GAME_WIN_TOTAL_TEXT_FONT_SIZE, this.FREE_GAME_WIN_TOTAL_TEXT_WIDTH);
    }

    public async ShowFreeGamePlus(){
        this.FreeGamePlusCom.visible = true;
        this.FreeGamePlusCountText.text = GameLogic.Instance.SlotResult.subGameCount.toString();
        this.FreeGamePlusLoader.url = getFairyUIURL(SelfData.Instance.MainPackageName, "freegame_");

        let finish: boolean = false;
        let trans = this.FreeGamePlusCom.getTransition("t0");
        trans.setHook("end", ()=> finish = true, this);
        trans.play();
        SoundManger.Instance.PlaySoundSE("BoardDown");

        while(!finish){
            await waitForSeconds(0.1);
        }

        this.UpdateFreeGameCount();
        await waitForSeconds(2);
        finish = false;
        trans = this.FreeGamePlusCom.getTransition("t2");
        trans.setHook("end", ()=> finish = true, this);
        trans.play();
        SoundManger.Instance.PlaySoundSE("BoardUP");

        while(!finish){
            await waitForSeconds(0.1);
        }

        this.FreeGamePlusCom.visible = false;
        SweetBonanzaGameModel.Instance.IsFreeGamePlus = false;
    }
    private MainToFreeGameSetting(){
        this.DoubleWinRateButtonCom.visible = false;
        this.FreeGameCountTextCom.visible = true;
        this.FreeGameShowPanelCountText.text = SweetBonanzaGameModel.Instance.GetFreeGameConut.toString();

    }
    private async FreeGameWaitPressAnyWhereToContinue(){
        if(SweetBonanzaGameModel.Instance.OnRePlayOnStart){
            SweetBonanzaGameModel.Instance.OnRePlayOnStart = false;
            await waitForSeconds(1.2);
            return;
        }

        while(this.IsFreeGameShowContinuePress){
            await waitForSeconds(0.1);
        }
        // while(this.IsFreeGameCalculateContinuePress){
        //     await waitForSeconds(0.1);
        // }
    }

//endregion 

//region OutOfFrameFx
    public SetOutOfFrameFx(index: number, iconID: number){
        let itemFx = this.GameBaseView.addConnectFx(index, iconID, this.OutOfFrameFxParent, null).asCom;
        itemFx.getTransition("stop_one").play();
        this.OutOfFrameFXTable.add(index, itemFx);
    }

    public GetOutOfFrameFX(index: number): fairygui.GComponent{
        if(this.OutOfFrameFXTable.containsKey(index)){
            return this.OutOfFrameFXTable[index];
        }
        return null;
    }
    public RemoveOutOfFrameFX(index: number){
        if(this.GetOutOfFrameFX(index) != null){
            this.GameBaseView.slotWheelManager.EnableShowItem(index);
            this.OutOfFrameFxParent.removeChild(this.GetOutOfFrameFX(index), true);
            this.OutOfFrameFXTable.remove(index);
        }
    }
    public RemoveAllOutOfFrameFX(){
        this.OutOfFrameFXTable.keys().forEach(index => this.GameBaseView.slotWheelManager.EnableShowItem(index));
        this.OutOfFrameFxParent.removeChildren(0, this.OutOfFrameFxParent.numChildren, true);
        this.OutOfFrameFXTable.clear();
    }
   
//endregion

    public async ConnectFreeGameBonusRateAnimShow(item : fairygui.GComponent, itemPoint: egret.Point, bonusRateFunc: Function){
        let finish: boolean = false;
        let bonusText: fairygui.GObject = item.getChild("BonusX");
        let trans = item.getTransition("show");
        trans.setHook("end", () => finish = true, this);
        trans.play();
        // this.GameBaseView.ShowWinRateMessage();

        let musicname = "IconRateFly";
        SoundManger.Instance.SetBgmVolume(0.3);
        SoundManger.Instance.PlaySoundSE(musicname);

        while(!finish)
            await waitForSeconds(0.1);

        finish = false;    
        egret.Tween.get(bonusText, {loop: false})
            .to({x: - itemPoint.x + this.WIN_RATE_TEXT_FLY_TARGET_POINT.x - (item.width/2), y: - itemPoint.y + this.WIN_RATE_TEXT_FLY_TARGET_POINT.y}, this.WIN_RATE_TEXT_FLY_TIME, t => this.CostumEase(t, bonusText))
            .call(() => finish = true, this);


        while(!finish)
            await waitForSeconds(0.01);

        bonusText.visible = false;
        this.GameBaseView.ShowTotalWinRateMessage();
        await bonusRateFunc.apply(this, []);
    }

    public async ConnectFreeGameBonusRateSkipShow(item : fairygui.GComponent, itemPoint: egret.Point, bonusRateFunc: Function){
        let bonusText: fairygui.GObject = item.getChild("BonusX");
        let trans = item.getTransition("show");

        let func = () =>{
            egret.Tween.get(bonusText, {loop: false})
            .to({x: - itemPoint.x + this.WIN_RATE_TEXT_FLY_TARGET_POINT.x - (item.width/2), y: - itemPoint.y + this.WIN_RATE_TEXT_FLY_TARGET_POINT.y}
                , this.WIN_RATE_TEXT_FLY_TIME, t => this.CostumEase(t, bonusText))
            // .to({alpha: 0}, this.time)
            .call(() => {bonusText.visible = false;}, this);
        }
        trans.setHook("end", func, this);
        trans.play();

        this.GameBaseView.ShowTotalWinRateMessage();

        let musicname = "IconRateFly";
        SoundManger.Instance.SetBgmVolume(0.3);
        SoundManger.Instance.PlaySoundSE(musicname);
    }

    public CreateTextAnimShow(fxParent: fairygui.GComponent, winMoney: number, point: egret.Point){
        let aTextField = new fairygui.GTextField();
        aTextField.font = "ui://" + SweetBonanzaGameModel.Instance.MainPackageName + "/font03";
        aTextField.pivotX = 0.5;
        aTextField.pivotY = 0.5;
        aTextField.setSize(100, 100);
        aTextField.setXY(point.x + 10 , point.y)
        aTextField.sortingOrder = ZOrder.eConnectAnimation + 2;
        aTextField.fontSize = 15;
        aTextField.color = 255255255;
        aTextField.text = "$" + (winMoney / 100).toFixed(2);
        aTextField.name = "$" + (winMoney / 100).toFixed(2);
        updateFontSize(aTextField, 15, 100);
        fxParent.addChild(aTextField);

        egret.Tween.get(aTextField, {loop: false})
            .to({ y: aTextField.y - 10, alpha: 1.2, scaleX: 1.2, scaleY: 1.1 }, 200)
            .to({ y: aTextField.y - 35, alpha: 0.8, scaleX: 1, scaleY: 1,}, 800)
            .to({ y: aTextField.y - 45, alpha: 0, scaleX: 0.8, scaleY: 0.8 }, 400);
            
        return aTextField;
    }
    public async WinTotalMoneyTextNumberIncrementAni(roundWinMoney: number, winMoney: number){
        this.TumbleWinCom.visible = true;
        if(winMoney > 0 && roundWinMoney != winMoney){
            this.NumberIncrementPlusTextAni("", this.TumbleWinTotalMoneyText, toCoin(roundWinMoney), toCoin(winMoney), 0.5, 2, ()=>{}, this
            , true, this.WIN_TEXT_FONT_SIZE, this.WIN_TOTAL_MONEY_TEXT_WIDTH);
             this.NumberIncrementPlusTextAni("", this.TumbleWinMoneyText, toCoin(roundWinMoney), toCoin(winMoney), 0.5, 2, ()=>{}, this
            , true, this.WIN_TEXT_FONT_SIZE, this.WIN_MONEY_TEXT_WIDTH);
        }
     
        await waitForSeconds(0.7);
    }

    public async WinRateTextNumberIncrementAni(roundWinRate: number, winRate: number, isSkip: boolean = false){
        this.TumbleWinCom.visible = true;
        if(winRate > 0 && roundWinRate != winRate){
            if(!this.IsTumbleWinShow ){
                this.IsTumbleWinShow = true;
                this.TumbleWinShowRateTransition.play();
            }

            SoundManger.Instance.StopSoundSE("IconRateFly");
            SoundManger.Instance.PlaySoundSE("TotalMoneyText");

            let textAnimTime = 0;
            let differenceWinRate = winRate - roundWinRate;
            if(differenceWinRate <= 5)
                textAnimTime = 0.05;
            if(differenceWinRate <= 10)
                textAnimTime = 0.25;
            if(differenceWinRate <= 20)
                textAnimTime = 0.5;
            if(differenceWinRate <= 50)
                textAnimTime = 0.75;
            if(differenceWinRate <= 100)
                textAnimTime = 1;
            if(differenceWinRate > 100)
                textAnimTime = 1.25;

            if(isSkip)
                await waitForSeconds(0.8);
                
            await this.NumberIncrementPlusTextAni("x ", this.TumbleWinRateText, Math.ceil(roundWinRate), Math.ceil(winRate), textAnimTime, 0, ()=>{}, this 
            , true, this.WIN_TEXT_FONT_SIZE, this.WIN_RATE_TEXT_WIDTH);

            this.nowRateText = winRate;

            await waitForSeconds(0.4);
            SoundManger.Instance.StopSoundSE("TotalMoneyText");
        }
    }

    public OnResize(onW: boolean){
        if(onW)
            this.onResizeTransition_W.play();
        else
            this.onResizeTransition_V.play();
    }

    private CostumEase(t: number, bonusText: fairygui.GObject){
        if(t < 0.2){
            bonusText.scaleX = 1 + t;
            bonusText.scaleY = 1 + t;
        }   
        if(t > 0.5){
            bonusText.scaleX = 1.5 - t;
            bonusText.scaleY = 1.5 - t;
        }
        if(t >= 1){
            bonusText.visible = false;
        }
        return t;
    }
    private onDoubleWinRateButtonStateChange(lobbyView: SweetBonanzaLobbyBarView){
        if(!this.DoubleWinButtonEnable)
            return;

        this.DoubleWinRateStateChange(lobbyView);
        
        SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
    }
    public DoubleWinRateStateChange(lobbyView: SweetBonanzaLobbyBarView){
        if(SelfData.Instance.IsOpenBonusSpin){
            this.DoubleWinOnButton.visible = true;
            this.DoubleWinOffButton.visible = false;
            SelfData.Instance.CanBuyFreeGame = true;
            SelfData.Instance.PlaySetting.OtherSetting = 0;
            SelfData.Instance.PlaySetting.MultiplyValue = 1;
            lobbyView.UpdateBetText();
            return;
        }

        if(!SweetBonanzaGameModel.Instance.OnDoubleWinRate){
            this.DoubleWinOnButton.visible = true;
            this.DoubleWinOffButton.visible = false;
            SelfData.Instance.CanBuyFreeGame = true;
            SelfData.Instance.PlaySetting.OtherSetting = 0;
            SelfData.Instance.PlaySetting.MultiplyValue = 1;
            lobbyView.UpdateBetText();
        }
        else{
            this.DoubleWinOnButton.visible = false;
            this.DoubleWinOffButton.visible = true;
            SelfData.Instance.CanBuyFreeGame = false;
            SelfData.Instance.PlaySetting.OtherSetting = 1;
            SelfData.Instance.PlaySetting.MultiplyValue = 1.25;
            lobbyView.UpdateBetText();
        }
    }
    public DoubleWinRateStateDisable(enable: boolean){
        if(this.DoubleWinOnButton == null || this.DoubleWinOnButton == null)
            return;

        if(!enable){
            this.DoubleWinButtonEnable = false;
            this.DoubleWinOnButton.asCom.getChild("On").visible = false;
            this.DoubleWinOffButton.asCom.getChild("On").visible = false;
            this.DoubleWinOnButton.asCom.getChild("Glow").visible = false;
            this.DoubleWinOffButton.asCom.getChild("Glow").visible = false;
            this.DoubleWinOnButton.asCom.getChild("Dis").visible = true;
            this.DoubleWinOffButton.asCom.getChild("Dis").visible = true;
        }
        else{
            this.DoubleWinButtonEnable = true;
            this.DoubleWinOnButton.asCom.getChild("On").visible = true;
            this.DoubleWinOffButton.asCom.getChild("On").visible = true;
            this.DoubleWinOnButton.asCom.getChild("Glow").visible = true;
            this.DoubleWinOffButton.asCom.getChild("Glow").visible = true;
            this.DoubleWinOnButton.asCom.getChild("Dis").visible = false;
            this.DoubleWinOffButton.asCom.getChild("Dis").visible = false;
        }
    }

    public UpdateDoubleWinBetText(){
        if(this.DoubleWinBetText != null){
            this.DoubleWinBetText.text = toCoinToString_CurrencyBet(SelfData.Instance.PlaySetting.TotleBet * 1.25);
            updateFontSize(this.DoubleWinBetText, this.DOUBLE_WIN_BET_TEXT_FONT_SIZE, this.DOUBLE_WIN_BET_TEXT_WIDTH);
        }
    }

    private async NumberIncrementPlusTextAni(plusText: string, numText: fairygui.GTextField, startNum: number, targetNum: number, time: number, fixed: number = 2, 
    skipFunc: Function = null, skipFuncThis: any = null, dynamicFontSize: boolean = true, textFontSize: number = 8, textWidth: number = numText.width) {
        let timeTemp: number = 0;
        let nowNum: number = startNum;
        let lastTime: number = new Date().getTime();
        let isSkip: boolean = skipFunc != null && skipFuncThis != null ? skipFunc.apply(skipFuncThis) : false;
        while (!isSkip && timeTemp < time * 1000) {
            let curTime: number = new Date().getTime();
            let deltaTime: number = curTime - lastTime;
            timeTemp += deltaTime;
            nowNum = startNum + ((targetNum - startNum) * (timeTemp / (time * 1000)));
            numText.text = plusText + nowNum.toFixed(fixed);
            if (dynamicFontSize) updateFontSize(numText, textFontSize, textWidth);
            await waitForSeconds(0.01);
            lastTime = curTime;
            isSkip = skipFunc != null && skipFuncThis != null ? skipFunc.apply(skipFuncThis) : false;
        }
        numText.text = plusText + targetNum.toFixed(fixed);
        if (dynamicFontSize) updateFontSize(numText, textFontSize, textWidth);
    }
}