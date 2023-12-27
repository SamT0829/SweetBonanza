class GameBaseController<T1 extends GameBaseView, T2 extends IGameLogic> extends BreakAwayController<T1, T2> {
    static BonusPackage = "";
    specialresult: Array<any> = [];

    protected BuyBonusView: XianBuyBonusView;
    protected BuyBonusServerCost: number = 0;
    protected SpinShowManager: SpinShowManager = null;
    private DataLength: number = 20;

    public get UnitTest(): boolean {
        return SelfData.Instance.UrlParam_GameMode === GameMode.UnitTestMode || SelfData.Instance.UrlParam_GameMode === GameMode.UnitTestSPMode;
    };

    public Init() {
        super.Init();

        //Init itemMap
        let items = this.view.slotWheelManager.GetAllShowItem();
		let itemsPos = [];
		for (let i = 0; i < items.length; i++) {
			itemsPos.push(new egret.Point(items[i].x, items[i].y));
		};
        let itemMap5x6 : ItemMap = new ItemMap([5, 6], itemsPos);
        itemMap5x6.ItemRowsMap = new Dictionary([
            { key: 0, value: 0 },
            { key: 1, value: 0 },
            { key: 2, value: 0 },
            { key: 3, value: 0 },
            { key: 4, value: 0 },
            { key: 5, value: 1 },
            { key: 6, value: 1 },
            { key: 7, value: 1 },
            { key: 8, value: 1 },
            { key: 9, value: 1 },
            { key: 10, value: 2 },
            { key: 11, value: 2 },
            { key: 12, value: 2 },
            { key: 13, value: 2 },
            { key: 14, value: 2 },
            { key: 15, value: 3 },
            { key: 16, value: 3 },
            { key: 17, value: 3 },
            { key: 18, value: 3 },
            { key: 19, value: 3 },
            { key: 20, value: 4 },
            { key: 21, value: 4 },
            { key: 22, value: 4 },
            { key: 23, value: 4 },
            { key: 24, value: 4 },
            { key: 25, value: 5 },
            { key: 26, value: 5 },
            { key: 27, value: 5 },
            { key: 28, value: 5 },
            { key: 29, value: 5 },
        ]);
        itemMap5x6.ItemRow = [5, 5, 5, 5, 5, 5];
        itemMap5x6.ItemCountNumber = 30;
        itemMap5x6.IconNameMaps = this.view.slotWheelManager.slotData.IconMap;

        BreakAwayGameData.Instance.ItemMap = itemMap5x6;
        // BreakAwayGameData.Instance.SpecialWildID = 20;
        BreakAwayGameData.Instance.FreeGameItemID = 9;
        BreakAwayGameData.Instance.FiliterItem = [9, 10];

        this.SpinShowManager = new SpinShowManager([5, 6], [1, 2, 3, 4, 5, 6, 7, 8]);
        this.SpinShowManager.GetIconName = (x, filter) => {
            return this.view.slotWheelManager.wheels[x].getIconNumber(filter);
        }
        this.bonusRoundID = [-100];

        this.view.SetFillItemController(BreakAwayGameData.Instance.ItemMap);

        // EventManager.Instance.RegisterEventListener(UpdateEvent, this, this.Update);
        UIManager.Instance._Sound_bgm_List = ["", "", ""];
        UIManager.Instance._BigWinPlayTime = [1.1, 1.1, 1.1];
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode) {
            this.createSpecialModeData();
            this.SetSpecialModeData();
        }
        this.FirstIconPlate =
            [
                // [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9],
                [-1,-1,0,0,3,3,3,-1,8,8,4,4,7,7,-1,6,6,7,7,8,8,-1,1,1,8,8,6,6,-1,2,2,1,1,6,6,-1,3,3,5,5,2,2,0,0,0,0,0,0,1000],
                [-1,8,8,8,5,5,5,-1,8,8,8,5,5,5,-1,-1,2,2,3,3,3,2,2,2,0,0,8,8,6,6,6,0,0,7,7,-1,-1,1,1,2,2,2,0,0,0,0,0,0,1000],
                [-1,-1,7,7,3,3,3,-1,-1,4,4,4,7,7,-1,6,6,2,2,2,8,-1,7,7,8,8,8,5,-1,-1,8,8,0,0,0,-1,-1,4,4,5,5,5,0,0,0,0,0,0,1000],
                [-1,5,5,5,7,7,8,3,3,3,0,0,0,6,-1,2,2,2,7,7,7,-1,-1,8,8,8,2,2,-1,8,8,8,5,5,4,4,4,4,6,6,2,2,0,0,0,0,0,0,1000],
                [5,5,5,1,1,6,6,-1,1,1,1,7,7,7,-1,1,1,1,6,6,6,-1,-1,7,7,4,4,4,-1,-1,8,8,5,5,5,8,8,8,2,2,2,0,0,0,0,0,0,0,1000],
                [-1,-1,5,5,1,1,1,-1,-1,7,7,8,8,8,-1,-1,8,8,2,2,2,-1,5,5,5,1,1,1,-1,2,2,6,6,6,0,6,6,6,7,7,5,5,0,0,0,0,0,0,1000],
            ];
    }

    protected createSpecialModeData() {
        this.specialresult = [];
        // this.specialresult.push(this.createNormalResult(
        //     [-1,0,0,7,7,9,2,-1,8,8,0,0,0,9,-1,0,0,9,6,6,7,-1,-1,7,7,9,2,2,-1,6,6,6,8,8,8,-1,6,6,5,5,5,9,0,0,100,100,100,0,1000,146290499],[
        //         [-100,-1,3,3,3,8,8,8,-1,3,3,3,8,8,8,-1,8,8,8,6,6,3,-1,1,1,1,8,8,5,-1,1,1,5,5,5,4,-1,8,8,8,5,5,5,-1,1,1,1,3,3,3,-1,-1,1,1,3,3,3,-1,-1,10,8,6,6,3,-1,-1,10,1,1,1,5,-1,1,1,5,5,5,4,-1,-1,10,8,5,5,5,7,7,7,1,3,3,3,-1,2,2,2,3,3,3,-1,-1,10,8,6,6,3,-1,-1,8,8,8,10,5,-1,-1,1,5,5,5,4,-1,-1,10,8,5,5,5,0,0,90,90,190,0,146290561],[-100,-1,-1,0,0,8,8,8,-1,5,5,10,6,6,0,-1,8,8,8,6,6,6,-1,5,5,5,10,4,4,-1,4,4,2,2,6,6,-1,2,2,2,5,5,8,0,0,0,0,190,0,146290590],[-100,-1,-1,8,8,8,7,7,4,4,4,5,5,5,101,-1,7,7,5,5,5,6,-1,-1,7,7,7,5,5,4,4,4,6,6,6,3,-1,-1,6,6,7,7,7,-1,-1,4,4,8,8,8,-1,-1,113,4,4,4,101,-1,-1,0,0,0,7,6,-1,1,1,1,6,6,3,4,4,4,6,6,6,3,-1,-1,4,4,4,6,6,-1,0,0,0,8,8,8,-1,-1,7,7,7,113,101,2,2,2,0,0,0,7,4,4,4,1,1,1,3,-1,5,5,5,4,4,3,-1,7,7,7,8,8,8,0,0,2808,2808,2998,0,146290602],[-100,-1,8,8,8,6,6,6,-1,1,1,1,4,4,4,-1,-1,8,8,8,102,5,-1,4,4,4,7,7,7,8,8,8,6,6,7,7,-1,5,5,5,0,0,2,0,0,0,0,2998,0,146290833],[-100,-1,-1,8,8,5,5,1,2,2,2,5,5,5,7,-1,4,4,7,7,8,8,-1,4,4,4,7,7,7,-1,0,0,7,7,5,5,-1,6,6,6,2,2,3,-1,-1,8,8,5,5,1,-1,2,2,2,5,5,5,-1,-1,111,4,4,8,8,-1,5,5,5,4,4,4,-1,4,4,0,0,5,5,-1,6,6,6,2,2,3,-1,7,7,7,8,8,1,-1,6,6,6,2,2,2,-1,-1,111,4,4,8,8,1,1,1,5,4,4,4,7,7,7,4,4,0,0,-1,6,6,6,2,2,3,0,0,720,720,3718,0,146290848],[-100,-1,-1,5,5,5,2,2,7,7,7,8,8,1,1,8,8,8,7,7,7,5,-1,5,5,5,3,3,6,-1,-1,8,8,3,3,3,-1,-1,5,5,8,8,8,6,6,6,7,7,2,2,-1,-1,7,7,7,1,1,-1,-1,8,8,7,7,7,1,1,1,5,3,3,6,-1,4,4,4,3,3,3,-1,3,3,3,2,2,2,-1,-1,6,6,6,2,2,-1,-1,0,0,0,1,1,-1,-1,0,0,0,8,8,1,1,1,5,3,3,6,-1,4,4,4,3,3,3,-1,3,3,3,2,2,2,0,0,29,29,3747,0,146290892],[-100,-1,6,6,2,2,2,4,-1,8,8,2,2,2,5,-1,3,3,3,8,8,8,-1,-1,4,4,0,0,0,-1,7,7,6,6,6,8,8,8,8,4,4,7,7,0,0,0,0,3747,0,146290942],[-100,4,4,4,7,7,7,0,-1,-1,4,4,4,0,0,-1,8,8,8,4,4,5,0,0,0,5,5,2,2,-1,-1,8,8,2,2,2,-1,6,6,6,8,8,8,0,0,0,0,3747,0,146290951],[-100,-1,-1,1,1,8,8,8,-1,-1,5,5,6,6,6,-1,-1,1,1,1,8,8,-1,-1,8,8,6,6,2,-1,-1,0,0,6,6,6,-1,-1,5,5,3,3,3,-1,-1,1,1,8,8,8,-1,-1,7,7,7,5,5,-1,-1,1,1,1,8,8,-1,6,6,6,8,8,2,-1,-1,5,5,5,0,0,-1,-1,5,5,3,3,3,0,0,10,10,3757,0,146290965],[-100,5,5,5,4,4,4,7,-1,-1,8,8,8,102,2,-1,-1,2,2,1,1,0,8,8,8,4,4,1,1,-1,5,5,5,6,6,6,-1,2,2,6,6,6,10,0,0,0,0,3757,0,146291015],[-100,-1,1,1,3,3,3,8,-1,-1,3,3,3,8,8,3,3,3,8,8,6,6,-1,4,4,5,5,10,3,-1,3,3,0,0,8,8,-1,-1,2,2,4,4,7,-1,-1,7,7,1,1,8,-1,6,6,0,0,8,8,-1,3,3,8,8,6,6,-1,-1,4,4,5,5,10,-1,-1,3,0,0,8,8,-1,-1,2,2,4,4,7,0,0,30,30,3787,0,146291053],[-100,8,8,8,1,1,6,6,-1,7,7,2,2,2,6,-1,4,4,8,8,2,2,-1,5,5,5,3,3,3,-1,4,4,7,7,8,8,-1,8,8,8,6,6,6,0,0,0,0,3787,0,146291192],[-100,-1,-1,0,0,0,8,8,-1,3,3,5,5,5,2,-1,-1,0,0,7,7,7,-1,1,1,5,5,7,7,3,3,3,6,6,7,7,-1,-1,4,4,4,6,6,0,0,0,0,3787,0,146291198],[-100,1,1,1,3,3,8,8,-1,8,8,8,6,6,2,-1,-1,2,2,0,0,0,-1,-1,4,4,1,1,1,-1,6,6,6,7,7,7,-1,-1,0,0,6,6,6,0,0,0,0,3787,0,146291207],[-100,-1,1,1,1,3,3,3,-1,1,1,8,8,8,3,4,4,4,2,2,2,3,-1,-1,8,8,6,6,5,-1,-1,4,4,4,8,8,-1,-1,3,3,1,1,1,0,0,0,0,3787,0,146291221]
        // ]));
            
        
        this.specialresult.push(this.createNormalResult(
         [-1,6,6,5,5,7,7,-1,-1,8,8,5,5,9,-1,-1,5,5,2,2,9,-1,-1,5,5,9,6,6,-1,4,4,2,2,1,1,-1,-1,0,0,9,6,6,1,1,1,6,6,7,7,-1,-1,2,2,8,8,9,-1,8,8,8,2,2,9,-1,-1,8,8,9,6,6,-1,4,4,2,2,1,1,-1,-1,0,0,9,6,6,0,0,76,76,76,0,100000,140818089],
         [[-100,-1,-1,2,2,2,2,2,-1,-1,2,2,2,2,2,-1,3,3,3,3,3,3,-1,-1,3,3,3,3,3,-1,2,2,2,2,2,2,-1,-1,2,2,2,2,2,-1,0,101,102,103,104,105,-1,-1,106,107,108,109,110,7,7,110,111,112,113,114,-1,-1,101,102,103,104,105,-1,7,106,107,108,109,110,-1,2,110,111,112,113,114,0,10,105,105,181,0,140818195],
         [-100,-1,7,7,5,5,2,2,-1,8,8,5,5,7,7,-1,-1,8,8,8,3,3,-1,0,0,7,7,2,2,-1,3,3,7,7,8,8,-1,1,1,0,0,5,5,0,0,0,0,181,0,140818588],[-100,-1,7,7,5,5,8,8,2,2,2,4,4,3,3,-1,7,7,5,5,3,3,-1,-1,4,4,8,8,6,-1,-1,8,8,1,1,1,-1,3,3,8,8,4,4,-1,0,0,7,7,5,5,2,2,2,4,4,3,3,-1,7,7,5,5,3,3,-1,-1,7,7,4,4,6,-1,-1,2,2,1,1,1,-1,2,2,3,3,4,4,0,0,5,5,186,0,140818619],[-100,-1,4,4,3,3,6,6,-1,1,1,2,2,7,7,-1,8,8,5,5,7,7,-1,7,7,2,2,8,8,-1,-1,3,3,3,4,4,6,6,6,8,8,3,3,0,0,0,0,186,0,140818713],[-100,-1,-1,3,3,5,5,7,7,7,7,8,8,2,2,0,0,0,1,1,8,8,-1,5,5,0,0,1,1,-1,2,2,4,4,8,8,-1,-1,8,8,8,6,6,-1,-1,3,3,5,5,7,-1,-1,7,7,7,2,2,-1,-1,0,0,0,1,1,-1,5,5,0,0,1,1,-1,3,3,2,2,4,4,-1,3,3,4,4,6,6,0,0,5,5,191,0,140818809],[-100,-1,0,0,7,7,6,6,-1,4,4,7,7,6,6,-1,-1,4,4,7,7,7,-1,3,3,4,4,2,2,-1,-1,0,0,8,8,1,-1,-1,10,8,8,7,7,7,7,7,0,0,6,6,-1,2,2,4,4,6,6,6,6,6,7,7,4,4,-1,3,3,4,4,2,2,-1,-1,0,0,8,8,1,-1,7,7,7,10,8,8,0,0,8,8,199,0,140818822],[-100,1,1,1,8,8,6,6,-1,5,5,8,8,0,0,-1,-1,8,8,1,1,1,-1,2,2,0,0,6,6,-1,2,2,1,1,8,8,-1,-1,7,7,0,0,0,-1,-1,1,1,1,6,6,-1,7,7,5,5,0,0,-1,-1,0,0,1,1,1,-1,2,2,0,0,6,6,-1,4,4,2,2,1,1,-1,-1,7,7,0,0,0,-1,-1,3,3,3,6,6,8,8,8,7,7,5,5,-1,1,1,1,0,0,0,3,3,3,2,2,6,6,0,0,0,4,4,2,2,-1,-1,4,4,4,7,7,0,0,255,255,454,0,140818852]
         ]));
        // this.specialresult.push(this.createNormalResult(
        // [-1,1,1,101,5,5,3,1,1,1,9,8,8,5,-1,-1,7,7,7,0,0,-1,7,7,7,2,2,2,-1,8,8,8,3,3,3,-1,-1,2,2,7,7,7,-1,1,1,101,5,5,3,1,1,1,9,8,8,5,2,2,2,8,8,0,0,-1,8,8,7,2,2,2,-1,8,8,8,3,3,3,-1,-1,1,1,1,2,2,0,0,16,16,16,0,20] ));
    }
    protected createNormalResult(norResult: Array<number>, bonResult: Array<Array<number>> = []) {
        return {
            normalResult: norResult,
            jackpotmoney: 0,
            bonusResult: bonResult
        };
    }

    private Test(){
        return this.createNormalResult(
            [
                -1,-1,7,7,9,2,2,-1,-1,0,0,9,7,7,-1,-1,2,2,7,7,9,-1,-1,8,8,7,7,9,-1,6,6,6,0,0,0,-1,0,0,0,5,5,5,-1,5,5,5,9,2,2,-1,-1,8,8,0,0,9,-1,-1,0,0,2,2,9,-1,-1,0,0,8,8,9,-1,6,6,6,0,0,0,-1,0,0,0,5,5,5,-1,5,5,5,9,2,2,-1,7,7,7,8,8,9,-1,-1,3,3,2,2,9,-1,-1,0,0,8,8,9,-1,-1,1,1,6,6,6,-1,2,2,0,5,5,5,0,0,568,568
            ],
            [
               [-100,-1,6,6,1,1,7,7,-1,3,3,6,6,4,4,-1,-1,108,7,7,3,3,6,6,6,8,8,2,2,-1,-1,7,7,6,6,6,5,5,5,6,6,7,7,-1,2,2,101,6,1,1,2,2,2,3,3,4,4,-1,-1,5,5,108,3,3,-1,6,6,8,8,2,2,-1,-1,4,4,7,7,3,-1,-1,4,4,5,5,5,0,0,360,360,121900982],[-100,-1,0,0,6,6,1,1,-1,7,7,7,6,6,6,-1,0,0,4,4,2,2,-1,4,4,6,6,0,0,-1,-1,110,3,3,4,4,-1,3,3,3,4,4,4,-1,0,0,6,6,1,1,-1,7,7,7,6,6,6,-1,8,8,0,0,2,2,-1,-1,4,6,6,0,0,-1,-1,0,0,110,3,3,-1,-1,6,6,3,3,3,5,5,5,0,0,1,1,-1,8,8,8,7,7,7,-1,8,8,0,0,2,2,-1,5,5,5,4,0,0,-1,-1,0,0,110,3,3,-1,4,4,4,3,3,3,-1,-1,5,5,5,1,1,-1,8,8,8,7,7,7,0,0,0,8,8,2,2,7,7,7,5,5,5,4,-1,-1,2,2,110,3,3,-1,4,4,4,3,3,3,0,0,5750,5750,121901056]
            ]
        )
    }
    
    public SetMiscTable() {
		let miscStr: string = TableManager.Instance.GetTable(MiscDataTable).GetValue("ComboRateMG");
		if (miscStr != null) {
			let rates = miscStr.split(",");
			for (let i = 0; i < rates.length; i++) {
				BreakAwayGameData.Instance.ComboRateMG.push(parseInt(rates[i]));
			}
		}

		miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ComboRateFG");
		if (miscStr != null) {
			// miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ComboRateFG");
			let rates = miscStr.split(",");
			for (let i = 0; i < rates.length; i++) {
				BreakAwayGameData.Instance.ComboRateFG.push(parseInt(rates[i]));
			}
		}

		miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ConnectAnimWaitingTime");
		if (miscStr != null) {
			// miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ConnectAnimWaitingTime");
			let waitTimes = miscStr.split(",");
			for (let i = 0; i < waitTimes.length; i++) {
				BreakAwayGameData.Instance.ConnectAnimWaitingTime.push(parseInt(waitTimes[i]));
			}
		}

		miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ConnectAnimWinRate");
		if (miscStr != null) {
			// miscStr = TableManager.Instance.GetTable(MiscDataTable).GetValue("ConnectAnimWinRate");
			let animRate = miscStr.split(",");
			for (let i = 0; i < animRate.length; i++) {
				BreakAwayGameData.Instance.ConnectAnimRate.push(parseInt(animRate[i]));
			}
		}
	}

//region GameControl
    public async MainToBonus(bonusID: number, redata: ReData) {
        this.view.IsReData = this.isRedata;

        if (redata != null) {
		    await this.SetReData(redata);
		}
		await this.view.ShowMainToBonusFxStart(redata);
        this.view.IsReData = false;
    }

    public async BonusToMain() {
        if (!this.UnitTest) 
		    await this.view.ShowBonusToMainFxStart();
	};

    public async StatrRun() {
        await super.StatrRun();
    }

    public async SetReData(redata: ReData) {
		let getFinal = (data: number[], len: number) => {
			if (data.length === 0) return [];
			let a = copyArray(data, 1, data.length);
			let idx = a.findIndex((x) => { return x < 0; });
			if (idx > -1) {
				a = a.splice(idx, a.length - idx);
			}
			let b = arrayTo2DArray(a, len);
			return b[b.length - 1];
		}
		await this.view.SetReData(redata);
	}
//endregion

//region GameResult
    public OnGameResult(data: Array<number>, clientGameResult: ClientGameResult = null, isMainGame: boolean = false): number {
        if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode && GameLogic.Instance.ServerGameResultList.length === 0) {
            this.createSpecialModeData();
            this.SetSpecialModeData();
        }
        
        let money = 0;
        let bonus = false;
        let wheelData = 42;
        let startData = 2;
        let showItemCount = 30;
        let dataAmount = Math.floor(data.length / wheelData);
		let sData = [];
        if(SweetBonanzaGameModel.Instance.IsFreeGame){
            if(dataAmount > 1) SweetBonanzaGameModel.Instance.winResult = true;
            else SweetBonanzaGameModel.Instance.winResult = false;
        }
        else 
            SweetBonanzaGameModel.Instance.winResult = false;

		for (let i = 0; i < dataAmount; i++) {
            let newData = data.splice(0, wheelData);
			for (let j = 0; j < showItemCount; j++) {
                let dataRow = Math.floor(j / SweetBonanzaGameModel.Instance.SlotRow) + 1;
                let startColumn = startData * dataRow;
                sData.push(newData[j + startColumn]);
			}
		}

        BreakAwayGameData.Instance.SetData(sData, BreakAwayGameData.Instance.ItemMap.ItemCount);
        for (let i = 0; i < BreakAwayGameData.Instance.DataAmount; i++) {
            GameLogic.Instance.SlotResult = this.slotLogic.getNormalResult(this.SetSpecialWildToWild(BreakAwayGameData.Instance.GetSingleData(i)), 1, );
            if(GameLogic.Instance.SlotResult.getRate > 0){
                if(money > 0)
                    money = money * GameLogic.Instance.SlotResult.getRate;
            }
            else{
                money += (GameLogic.Instance.SlotResult.getBet * SelfData.Instance.PlaySetting.RunBet);
            }
            
            if (!bonus && GameLogic.Instance.SlotResult.CheckBonusType(PlayGameType.BonusRound))
                bonus = true;
        }

        SweetBonanzaGameModel.Instance.GetFreeGameConut += GameLogic.Instance.SlotResult.subGameCount;
        SweetBonanzaGameModel.Instance.FreeGameCount += GameLogic.Instance.SlotResult.subGameCount;
        GameLogic.Instance.SlotResult = this.slotLogic.getNormalResult(this.SetSpecialWildToWild(BreakAwayGameData.Instance.GetCurrentSingleData()), 1);
        GameLogic.Instance.SlotResult.data = BreakAwayGameData.Instance.GetCurrentSingleData();
        if (bonus && !GameLogic.Instance.SlotResult.CheckBonusType(PlayGameType.BonusRound)) {
            GameLogic.Instance.SlotResult.isBonus.splice(0, 0, PlayGameType.BonusRound);
        }

        if (bonus && SweetBonanzaGameModel.Instance.IsFreeGame)
            SweetBonanzaGameModel.Instance.IsFreeGamePlus = true;
      
        this.SpinShowManager.CurrentForShowItem = BreakAwayGameData.Instance.GetCurrentSingleData();
        this.SpinShowManager.CurrentDataIndex = BreakAwayGameData.Instance.CurrentDataIdx;
        this.SpinShowManager.SetWildShowData();

        let gameMultiplyData = 4;
        let multiplyData = data.splice(0, gameMultiplyData);
        let checkData = data.splice(0, data.length);

        SweetBonanzaGameModel.Instance.CheckData = checkData;
        SweetBonanzaGameModel.Instance.CheckMoney = checkData[0] * SelfData.Instance.PlaySetting.RunBet;
        SweetBonanzaGameModel.Instance.CheckBetRate = SweetBonanzaGameModel.Instance.CheckMoney  / SelfData.Instance.PlaySetting.TotleBet;
        if(SweetBonanzaGameModel.Instance.CheckBetRate >= SweetBonanzaGameModel.Instance.MaxBetRate)
            consoleLog("Get maxBetRate on rate:" + SweetBonanzaGameModel.Instance.CheckBetRate);

        if(SweetBonanzaGameModel.Instance.MaxWinMoney > 0){
            if(money >= SweetBonanzaGameModel.Instance.MaxWinMoney)
                money = SweetBonanzaGameModel.Instance.MaxWinMoney;
        
            SweetBonanzaGameModel.Instance.MaxWinMoney -= money;
            SweetBonanzaGameModel.Instance.NowWinMoney = (SelfData.Instance.PlaySetting.TotleBet * SweetBonanzaGameModel.Instance.MaxBetRate) - SweetBonanzaGameModel.Instance.MaxWinMoney;
        }
      
        return money;
    }

    public GetReDateResult(data: Array<number>): Array<number> {
        let _data = copyArray(data, 0, data.length);
        let startIndex = 0;
        let showItemCount = 30;
        let trueData = 42;
        let dataAmount = Math.floor(data.length / trueData);
        let startData = 2;
		let result = [];
        let newData = _data.splice((dataAmount - 1) * trueData, dataAmount * trueData)
        for (let j = 0; j < showItemCount; j++) {
            let dataRow = Math.floor(j / SweetBonanzaGameModel.Instance.SlotRow) + 1;
            let startColumn = startData * dataRow;
            result.push(newData[j + startColumn]);
		}

        return result;
    }

    public OnBonusGameResult(data: Array<number>): number {
        SweetBonanzaGameModel.Instance.IsFreeGame = true;
        let lastIndex = data.length;
        let redata = copyArray(data, 1, lastIndex);
        let money = this.OnGameResult(redata, null, false);

        return money;
    }

    public async OnBuyBonusResult(nowBonusIndex: number, buyBonusType: BuyBonusType) {
        if (buyBonusType != BuyBonusType.Cancel) {
            let table = TableManager.Instance.GetTable(BuyBonusTable);
            if (table == null) return;

            if (!this.UnitTest) {
                // await this.view.ShowBuyBonusSuccess();
                this.view.NowWinMoney = 0;
                this.view.ShowWinMoney(0);
            }

            // if (SelfData.Instance.UrlParam_GameMode == GameMode.SpecialMode)
            //     this.ProcessSpModeBuyBonus(nowBonusIndex, buyBonusType);
        }
        else {
            if (SelfData.Instance.UrlParam_GameMode != GameMode.SpecialMode)
                return;

            GameLogic.Instance.ServerGameResultList.length = 0;
            let result = this.createTestGameResult([BuyBonusType.Cancel], [], 0);
            GameLogic.Instance.ServerGameResultList.push(result);
            this.createSpecialModeData();
            this.SetSpecialModeData();
        }

        await waitForSeconds(0.1);

        var event: EnabledStartButton = new EnabledStartButton();
        EventManager.Instance.Send(event);

    }
    public ResultFinish() {
        this.view.NowWinMoney = 0;
        if (!SweetBonanzaGameModel.Instance.IsFreeGame){
            this.view.UpdateMoney();
        }
       
        let event = new ClientEvent(ClientMsg.OnShowResultEnd);
        EventManager.Instance.Send(event);
        if (this.view.roundWinMoney > 0 || GameLogic.Instance.SlotResult.subGameCount > 0) {
            this.view.ShowFinalFxStart();
        }
    }
    public async ShowNormalResult() {
        if (this.view.roundWinMoney > 0 || GameLogic.Instance.SlotResult.subGameCount > 0) {
            await this.view.ShowNormalWinFxStart();
        }
        this.view.roundWinMoney = 0;
    }
    public async ShowBonusResult() {
        await this.view.ShowBonusResultSetting();
        await this.ShowLineResult();
        await this.view.ShowNormalWinFxStart();
        await this.view.ShowBonusWinEnd();

        if(this.view.NowWinMoney != SweetBonanzaGameModel.Instance.NowWinMoney){
            consoleLog("moneyErrorNew1 GameWinMoney: " + this.view.NowWinMoney+ " | ServerWinMoney: " +  SweetBonanzaGameModel.Instance.NowWinMoney);
        }
    }

    public async ShowLineResult() {
        if (!SelfData.Instance.PlaySetting.IsFastX3)
            await waitForSeconds(0.2);
        if (GameLogic.Instance.SlotResult.getBet > 0 || GameLogic.Instance.SlotResult.subGameCount > 0) {
            for (let idx = 0; idx < BreakAwayGameData.Instance.DataAmount; idx++) {
                let result = this.slotLogic.getNormalResult(BreakAwayGameData.Instance.GetCurrentSingleData(), 1);
                GameLogic.Instance.SlotResult = result;
      
                // this.view.SpWildLastResultData = copyArray(result.data, 0, result.data.length);
                BreakAwayGameData.Instance.FreeGameCount += result.subGameCount;
                // WHJMoneyModel.Instance.ComboIndex = idx;
                await this.view.ShowWinLineFxStart();
                let next = BreakAwayGameData.Instance.GetNextSingleData();
                if (next != null) {
                    result = this.slotLogic.getNormalResult(next, 1);
                    GameLogic.Instance.SlotResult = result;
                    this.SpinShowManager.CurrentForShowItem = BreakAwayGameData.Instance.GetNextSingleData();
                    this.SpinShowManager.CurrentDataIndex = BreakAwayGameData.Instance.CurrentDataIdx + 1;
                    this.SpinShowManager.SetWildShowData();
                }

                // WHJDrumView.Instance.UpdateFreeGameCount();
                //消除 Icon
                if (idx != BreakAwayGameData.Instance.DataAmount - 1) {
                    //篩選誰需要消除
                    let breakItemIdx = this.GetBreakItemIdxs(BreakAwayGameData.Instance.GetCurrentSingleData());        //消除IconId
                    //取得需要落下的符號
                    await this.view.FillItemController.SetFillItemList(breakItemIdx, BreakAwayGameData.Instance.GetSingleData(idx + 1));
                    // 上一格Item 塞入下一個消除盤面的第一個值
                    // for (let i = 0, imax = 5; i < imax; ++i) {
                    //     let item: SlotItem = this.view.slotWheelManager.wheels[i].GetItem(-1);
                    //     item.SetIcon(this.view.slotWheelManager.slotData.IconMap[GameLogic.Instance.ShowResult[0][i][0]]);
                    //     item.visible = false;
                    // }
                    await this.view.FillItem(breakItemIdx);
                }
                BreakAwayGameData.Instance.UpdateCurrentDataIdx();

                // if (idx != BreakAwayGameData.Instance.DataAmount - 1) {
				// 	await WHJDrumView.Instance.FlyFuOnFillItem(); 	
				// }
            }
            // this.view.ShowShiningComboRate(-1);
            if (!SweetBonanzaGameModel.Instance.IsFreeGame)
                this.view.UpdateMoney();
            if (SweetBonanzaGameModel.Instance.IsFreeGame) {
                if (GameLogic.Instance.SlotResult.subGameCount > 0) {
                    // await this.view.AddFreeGameFx();
                }
            }
        }
        // if (!WHJMoneyModel.Instance.IsFreeGame)
        //     this.view.UpdateMoney();

        // await this.ShowSpecialWildRun();
    }
//endregion
    private SliceOnResultData(data: Array<number>){
        let newData = copyArray(data, 0, SweetBonanzaGameModel.Instance.SlotRow * SweetBonanzaGameModel.Instance.SlotColumns);
    }

    public OnReData(normalResult: Array<number>, bonusResult: Array<Array<number>>) {
        SweetBonanzaGameModel.Instance.MaxWinMoney = SelfData.Instance.PlaySetting.TotleBet * SweetBonanzaGameModel.Instance.MaxBetRate;
    }
}