class GameMain extends Main {
  protected SoundList: string[] = [
    "VIP_button",
    "Stop",
    "VIP_BGM_MAIN",
    "VIP_BGM_FG",
    "JH_FGX",
    "JX_win1",
    "JX_win2",
    "JX_win3",
    "JX_win4",
    "JX_win5",
    "JX_win6",
    "JX_win7",
    "JX_win8",
    "JX_win9",
    "JX_win10",
    "VIP_alarm",
    "VIP_Coin1Stop",
    "VIP_Coin2Stop",
    "VIP_Coin3Stop",
    "VIP_Coin4Stop",
    "VIP_Coin5Stop",
    "loop",
    "win",
    "MaybeBonus",
    "bigwin",
    "megawin",
    "supermegawin",
    "Lock",
    "XianFGWin",
    "allbigwin",
    "nosoundbutton",
    "accm3-rg171"
  ];
  private SweetBonanzaSoundList: Array<string> =[
    "BGMusic",
    "BoardDown",
    "BoardUP",
    "FreeGameBG",
    "FreeGameAlarm",
    "FreeGameCalculate",
    "FreeGameFx",
    "IconFallDown",
    "IconFall2",
    "IconHide_0",
    "IconHide_1",
    "IconRateFly",
    "Scatter",
    "TotalMoneyText",
    "TumbleWin",
    "WinMusic_0",
    "WinMusic_1",
  ];
  private SweetBonanzaSoundPath: string = "./resource/assets/sound/SweetBonanza/"

  protected PreloadGroups: string[] = ["preload", "common", "table"];
  protected TargetGameGroups = ["Game"];
  protected LanguageGroups: string[] = ["Normal"];
  protected BackgroundLoadGroups: string[] = [];
  protected BackgroundLoadLanguageGroups: string[] = [];
  private MainPackageName = "Slot_100_SweetBonanza";
  private MainGameView: fairygui.GObject = null;
  private GameController = null;

  protected AppStart() {
    FairyExButton.ButtonSoundName = "VIP_button";
    SelfData.Instance.CommonPackageName = "Slot_000_ICashCrownCommon";
    // SelfData.Instance.WindowSwitch = false;
    SelfData.Instance.CanBuyFreeGame = true;
    SelfData.Instance.NeedIconNumber = 9;
    SelfData.Instance.MarqueePoint_W = [225, 5];
    SelfData.Instance.MarqueeScale_W = [0.8, 0.8];
    SelfData.Instance.MarqueePoint_V = [-1040, -40];
    SelfData.Instance.MarqueeScale_V = [2, 2];
    this.SetPackageGroup(true);
    super.AppStart();
  }

  protected SetPackageGroup(isUsingWebP: boolean) {
    let webp: string = egret.getOption("WebP");
    if (webp != "")
      this.IsUsingWebP = webp == "true";
    else
      this.IsUsingWebP = isUsingWebP;
    this.PreloadGroups = ["preload", "common", "table"];
    if (this.IsUsingWebP && IsWebPSupport()) {
      this.TargetGameGroups = ["Game_WebP"];
      this.LanguageGroups = ["Normal_WebP"];
      //this.BackgroundLoadGroups = [];
      //this.BackgroundLoadLanguageGroups = ["Bonus_WebP"];
    }
    else {
      this.TargetGameGroups = ["Game"];
      this.LanguageGroups = ["Normal"];
      //this.BackgroundLoadGroups = [];
      //this.BackgroundLoadLanguageGroups = ["Bonus"];
    }
  }

  protected onGameLoadComplete(event: RES.ResourceEvent): void {
    super.onGameLoadComplete(event);
    this.createGameScene(this.MainPackageName);
  }

  protected AddGameSound() {
    FairyExButton.ButtonSoundName = "VIP_button";

    for (let i = 0; i < this.DefaultSoundList.length; i++)
      SoundResources.SoundDic.add(this.DefaultSoundList[i], new SoundResource(this.DefaultSoundList[i], this.DefaultSoundPath + this.DefaultSoundList[i] + ".mp3"));

    for (let i = 0; i < this.SoundList.length; i++)
      SoundResources.SoundDic.add(this.SoundList[i], new SoundResource(this.SoundList[i], this.SoundPath + this.SoundList[i] + ".mp3"));

    for (let i = 0; i <= this.SweetBonanzaSoundList.length; i++)
      SoundResources.SoundDic.add(this.SweetBonanzaSoundList[i], new SoundResource(this.SweetBonanzaSoundList[i], this.SweetBonanzaSoundPath + this.SweetBonanzaSoundList[i] + ".mp3"));


    SoundManger.Instance.init();
  }

  protected createGameScene(projectName: string): void {
    let webPStr = (this.IsUsingWebP && IsWebPSupport()) ? "_WebP" : "";

    SweetBonanzaGameModel.Instance.MainPackageName = projectName;
    // SweetBonanzaGameModel.Instance.BonusPackageName = this.MainBonusPackageName;

    fairygui.UIObjectFactory.setPackageItemExtension("ui://" + projectName + "/SlotItem", SweetBonanzaSlotItem);
    SelfData.Instance.MainPackageName = projectName;
    // SelfData.Instance.WindowSwitch = false;
    SelfData.Instance.UseMultiply = false;

    //fairygui.UIPackage.addPackage("Slot_000_0common" + webPStr + "_" + LanguageType[SelfData.Instance.Language]);
    //fairygui.UIPackage.addPackage("Slot_000_0common" + webPStr);
    fairygui.UIPackage.addPackage("Slot_000_LobbyLoader" + webPStr + "_" + LanguageType[SelfData.Instance.Language]);
    fairygui.UIPackage.addPackage("Slot_000_LobbyLoader" + webPStr);
    //fairygui.UIPackage.addPackage("Slot_000_LobbyBar");
    fairygui.UIPackage.addPackage(SelfData.Instance.CommonPackageName);
    fairygui.UIPackage.addPackage(this.MainPackageName + webPStr);
    fairygui.UIPackage.addPackage(this.MainPackageName + webPStr + "_" + LanguageType[SelfData.Instance.Language]);
    //fairygui.UIPackage.addPackage(this.MainPackageName + "Bonus" + webPStr);

    if (!fairygui.GRoot.inst.displayObject.parent) {
      this.stage.addChild(fairygui.GRoot.inst.displayObject);
    }
    let MainGameParent: fairygui.GObject = fairygui.UIPackage.createObject(projectName, "MainAll");
    fairygui.GRoot.inst.addChild(MainGameParent);

    this.MainGameView = MainGameParent.asCom.getChild("main").asCom.getChild("Maingame");
    SweetBonanzaGameModel.Instance.AllMainObj = MainGameParent;
    SweetBonanzaGameModel.Instance.MainParent = MainGameParent.asCom.getChild("main");
    SweetBonanzaGameModel.Instance.MainGameParents = this.MainGameView;
    SweetBonanzaGameModel.Instance.LobbyBarParent = MainGameParent.asCom.getChild("main").asCom.getChild("lobbybar");

    var lobbyView: SweetBonanzaLobbyBarView = new SweetBonanzaLobbyBarView(MainGameParent.asCom.getChild("main"));
    var lobbyController: SweetBonanzaLobbyBarController = new SweetBonanzaLobbyBarController(lobbyView);
    SweetBonanzaGameModel.Instance.LobbyView = lobbyView;

    this.AddGameSound();
    SoundManger.Instance.init();
    SweetBonanzaGameView.Instance.MainParentInit(SweetBonanzaGameModel.Instance.MainParent.asCom);
    SweetBonanzaGameView.Instance.MainAllInit(MainGameParent.asCom);

    var slotView = new GameBaseView();
    slotView.Init(this.MainGameView.asCom);
    SoundManger.Instance.PlayBGM("BGMusic");
    var normalResultData = new NormalResultData();
    normalResultData.gameType = SelfData.Instance.TargetGame;
    // normalResultData.gameType = "SweetBonanza";
    normalResultData.maxNumber = 18;
    normalResultData.freeGameindex = [9, 10];
    normalResultData.wildIndex = [0];
    var logic = new Logic_SweetBonanza(normalResultData);
    var slotController = new GameBaseController(slotView, logic);
    this.GameController = new SweetBonanzaSlotGameController(slotController);
    this.GameController.AutoWaitSecond = 0.2;

    this.preloadSoundItem();
    this.GameController.setReData();
  }

  protected async preloadSoundItem() {
    await waitForSeconds(0.5);
    let resources: Array<SoundResource> = SoundResources.SoundDic._values;
    for (let i = 0, imax = resources.length; i < imax; ++i) {
      let info = resources[i];
      SoundManger.Instance.createSoundInfo(info);
    }
  }

  protected onResourceLoadOnBackgroundComplete() {
    let webPStr = (this.IsUsingWebP && IsWebPSupport()) ? "_WebP" : "";
    //fairygui.UIPackage.addPackage(this.MainPackageName + "Bonus" + webPStr);
    //fairygui.UIPackage.addPackage(this.MainPackageName + "Bonus" + webPStr + "_" + LanguageType[SelfData.Instance.Language]);
    // let freegameBGGroupParent = this.MainGameView.asCom.getChild("freegameBG");
    // let freegameBGGroup = fairygui.UIPackage.createObject(this.MainPackageName + "Bonus", "FreeGame");
    // freegameBGGroup = freegameBGGroupParent.asCom.addChild(freegameBGGroup);
    // freegameBGGroup.name = "FreeGameBGGroup";
  }
}