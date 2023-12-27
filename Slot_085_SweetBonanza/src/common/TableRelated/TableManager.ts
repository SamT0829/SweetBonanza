class TableManager {
    private static _instance: TableManager;
    public static get Instance(): TableManager {
        if (this._instance == null) {
            this._instance = new TableManager();
        }
        return this._instance;
    }

    private _staticTableTable: Dictionary = new Dictionary([]);

    private URLLoader_CoinSymbols: egret.URLLoader = null;
    private URLLoader_GameTip: egret.URLLoader = null;
    private URLLoader_LoadLocalizationCommon: egret.URLLoader = null;
    private URLLoader_GameNameCommon: egret.URLLoader = null;
    private CoinSymbolsEnd: boolean = false;

    private LoadCoinSymbols(): void {
        this.URLLoader_CoinSymbols = new egret.URLLoader();
        this.URLLoader_CoinSymbols.dataFormat = egret.URLLoaderDataFormat.TEXT;
        let request = new egret.URLRequest();
        request.url = "../CoinSymbols.txt?v=" + Date.now();
        RES.setMaxLoadingThread(5);
        this.URLLoader_CoinSymbols.addEventListener(egret.Event.COMPLETE, this.OnCoinSymbolsLoaded, this);
        this.URLLoader_CoinSymbols.addEventListener(egret.IOErrorEvent.IO_ERROR, this.OnCoinSymbolsLoaded, this);

        this.URLLoader_CoinSymbols.load(request);
    }

    private OnCoinSymbolsLoaded() {
        let table: CoinSymbolsTable = new CoinSymbolsTable();
        if (this.URLLoader_CoinSymbols.data) {
            table.Parsing(this.URLLoader_CoinSymbols.data);
            this._staticTableTable.add("CoinSymbols", table);
            this.CoinSymbolsEnd = true;
        }
        else {
            consoleLog("table: " + table.TableName + " is empty");
            this.CoinSymbolsEnd = true;
        }
    }
    private GameTipEnd: boolean = false;
    private LoadGameTip(): void {
        this.URLLoader_GameTip = new egret.URLLoader();
        this.URLLoader_GameTip.dataFormat = egret.URLLoaderDataFormat.TEXT;
        let request = new egret.URLRequest();
        request.url = "../GameTip.txt?v=" + Date.now();
        RES.setMaxLoadingThread(5);
        this.URLLoader_GameTip.addEventListener(egret.Event.COMPLETE, this.OnGameTipLoaded, this);
        this.URLLoader_GameTip.addEventListener(egret.IOErrorEvent.IO_ERROR, this.OnGameTipLoaded, this);

        this.URLLoader_GameTip.load(request);
    }

    private OnGameTipLoaded() {
        let table: GameTipTable = new GameTipTable();
        if (this.URLLoader_GameTip.data) {
            table.Parsing(this.URLLoader_GameTip.data);
            this._staticTableTable.add("GameTip", table);
            this.GameTipEnd = true;
        }
        else {
            consoleLog("table: " + table.TableName + " is empty");
            this.GameTipEnd = true;
        }
    }
    private LoadLocalizationCommonEnd: boolean = false;
    private LoadLocalizationCommon(): void {
        this.URLLoader_LoadLocalizationCommon = new egret.URLLoader();
        this.URLLoader_LoadLocalizationCommon.dataFormat = egret.URLLoaderDataFormat.TEXT;
        let request = new egret.URLRequest();
        request.url = "../LocalizationCommon.txt?v=" + Date.now();
        RES.setMaxLoadingThread(5);
        this.URLLoader_LoadLocalizationCommon.addEventListener(egret.Event.COMPLETE, this.OnLocalizationCommonLoaded, this);
        this.URLLoader_LoadLocalizationCommon.addEventListener(egret.IOErrorEvent.IO_ERROR, this.OnLocalizationCommonLoaded, this);

        this.URLLoader_LoadLocalizationCommon.load(request);
    }
    private OnLocalizationCommonLoaded() {
        let table: LocalizationCommonTable = new LocalizationCommonTable();
        if (this.URLLoader_LoadLocalizationCommon.data) {
            table.Parsing(this.URLLoader_LoadLocalizationCommon.data);
            this._staticTableTable.add("LocalizationCommon", table);
            this.LoadLocalizationCommonEnd = true;
        }
        else {
            consoleLog("table: " + table.TableName + " is empty");
            this.LoadLocalizationCommonEnd = true;
        }
    }
    private LoadGameNameEnd: boolean = false;
    private GameNameCommon(): void {
        this.URLLoader_GameNameCommon = new egret.URLLoader();
        this.URLLoader_GameNameCommon.dataFormat = egret.URLLoaderDataFormat.TEXT;
        let request = new egret.URLRequest();
        request.url = "../GameName.txt?v=" + Date.now();
        RES.setMaxLoadingThread(5);
        this.URLLoader_GameNameCommon.addEventListener(egret.Event.COMPLETE, this.OnGameNameLoaded, this);
        this.URLLoader_GameNameCommon.addEventListener(egret.IOErrorEvent.IO_ERROR, this.OnGameNameLoaded, this);

        this.URLLoader_GameNameCommon.load(request);
    }
    private OnGameNameLoaded() {
        let table: GameNameTable = new GameNameTable();
        if (this.URLLoader_GameNameCommon.data) {
            table.Parsing(this.URLLoader_GameNameCommon.data);
            this._staticTableTable.add("GameName", table);
            this.LoadGameNameEnd = true;
        }
        else {
            consoleLog("table: " + table.TableName + " is empty");
            this.LoadGameNameEnd = true;
        }
    }

    public async CreateTable<T extends TableBase>(type: { new (): T; }) {
        let table: T = new type();
        let fileText = RES.getRes(table.TableName + "_txt");
        if (table.TableName == "CoinSymbols") {
            this.LoadCoinSymbols();
            while (!this.CoinSymbolsEnd) {
                await waitForSeconds(0.01);
            }
        }
        if (table.TableName == "LocalizationCommon") {
            this.LoadLocalizationCommon();
            while (!this.LoadLocalizationCommonEnd) {
                await waitForSeconds(0.01);
            }
        }
        if (table.TableName == "GameTip") {
            this.LoadGameTip();
            while (!this.GameTipEnd) {
                await waitForSeconds(0.01);
            }
        }
        if(table.TableName == "GameName"){
            this.GameNameCommon();
            while (!this.LoadGameNameEnd) {
                await waitForSeconds(0.01);
            }
        }
        if (fileText) {
            table.Parsing(fileText);
            this._staticTableTable.add(table.TableName, table);
        }
        else {
            consoleLog("table: " + table.TableName + " is empty");
        }
    }

    public GetTable<T extends TableBase>(type: { new (): T; }): T {
        let table: T = new type();
        if (this._staticTableTable.containsKey(table.TableName))
            return this._staticTableTable[table.TableName];

        consoleLog("GetTable failed. data not found. table: " + table.TableName);
        return null;
    }

}