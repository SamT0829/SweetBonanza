enum Window_W_V {
    window_start,
    window_W,
    window_V,
}

enum SlotMainType {
    Main,
    Freegame3x5,
    Freegame4x5,
    Freegame5x5
}


class SweetBonanzaGameModel {
    private static _instance: SweetBonanzaGameModel;
    public static get Instance(): SweetBonanzaGameModel {
        if (this._instance == null) {
            this._instance = new SweetBonanzaGameModel();
            EventManager.Instance.RegisterEventListener(StageResizeEvent, this, this._instance.SwitchUI);
        }
        return this._instance;
    }

    public SlotRow : number = 5;
    public SlotColumns : number = 6;

    public MaxWinMoney: number = 0;
    public NowWinMoney: number = 0;
    public CheckData = [];
    public CheckMoney: number = 0;
    public CheckBetRate = 0;
    public MaxBetRate = 5000;

    public WaitBuyBonus: boolean = false;
    public ChangeWinWheel: number = 0;
    public BonusToMainData: number[];


    public OnDoubleWinRate: boolean = false;

    public OnRePlayOnStart: boolean = false;

    //SpecialGameCount
    public BowlIndex = -1;
    public SpcialWildData = [];
    public SpcialWildType = -1;
    public SpecailWildMoney = 0;
    public SpecialWildID : number = 20;

    //FreeGameCount
    public WildID : number = 0;
    public BonusSpecialID: number = 9;
    public GetFreeGameConut : number = 0;
    public FreeGameCount : number = 0;

    // FreeGameIcon
    public freeGameBonusIconId: number = 101;
    public freeGameBonusIconCount: number = 14;
    public freeGameBonusIndex: Array<number> = [9, 10]

    public IsFreeGame: boolean = false;
    public IsFreeGamePlus: boolean = false;
    public IsSpecialWildGame: boolean = false;
    
    //FairyPackageName
    public MainPackageName = "";
    public LobbyLoaderPackageName : string = "";
    public BonusPackageName = "";

    //Fairy GObject
    public AllMainObj: fairygui.GObject;
    public MainParent: fairygui.GObject;
    public MainGameParents : fairygui.GObject;
    public LobbyBarParent: fairygui.GObject;
    public DoubleWinRateButtonCom : fairygui.GComponent;

    public LobbyView: SweetBonanzaLobbyBarView; 

    public WindowType: Window_W_V = Window_W_V.window_start;
    public UIChangeName: string = "";

    //SlotMainType
    public SlotMainType : SlotMainType = SlotMainType.Main;

    public MainFastX2: boolean = false;
    public MainFastX3: boolean = false;
    public Mode2BonusData: boolean = false;

    public winResult: boolean = false;

    public LostBetIndex: number = -1;

    public SwitchUI(event: StageResizeEvent): void {
        let _type: Window_W_V = Window_W_V.window_start;
        let _change: boolean = false;
        if (window.innerWidth < window.innerHeight) {
            _type = Window_W_V.window_V;
        }
        else {
            _type = Window_W_V.window_W;
        }
        if (_type == SweetBonanzaGameModel.Instance.WindowType)
            _change = false;
        else
            _change = true;

        if (_change) {
            if (window.innerWidth < window.innerHeight) {
                SweetBonanzaGameModel.Instance.UIChangeName = "_V";
            }
            else {
                SweetBonanzaGameModel.Instance.UIChangeName = "";
            }
            let switch_event: ResizeWindowEvent = new ResizeWindowEvent();
            switch_event.IsPortrait = _change;
            EventManager.Instance.Send(switch_event);
        }
    }

    public IsMaxWinMoney(): boolean{
         return SweetBonanzaGameModel.Instance.NowWinMoney >= SelfData.Instance.PlaySetting.TotleBet * SweetBonanzaGameModel.Instance.MaxBetRate;
    }
}

class ResizeWindowEvent implements IEventUnit {
    /**
     * 是否切換
     */
    public IsPortrait: boolean = false; //横屏landscape 竖屏Portrait

    public GetEventName(): string {
        return "ResizeWindowEvent";
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