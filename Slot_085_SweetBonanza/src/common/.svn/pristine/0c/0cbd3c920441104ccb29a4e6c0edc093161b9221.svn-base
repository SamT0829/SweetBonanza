/**創建表任務庫*/
class CreateTableMissionBase extends MissionBase {
    /**讀取公用表txt地址*/
    public TableLoadMap = new Dictionary([]);
    public CommonTableLoadMap = new Dictionary([]);

    /**創建表任務庫初始化*/
    public constructor(name: string) {
        super();
        this._name = name;
    }

    public async MissionPrepare() {
        this._subMissionCount = this.TableLoadMap.keys().length + this.CommonTableLoadMap.keys().length;
        this._completeCount = 0.0;
    }

    public async MissionWork() {
        this.MissionProcess();

        while (!this.IsComplete) {
            await waitForSeconds(0.05);
        }

        this.MissionFinish();
    }

    public MissionProcess(): void {
        if (this.OnProcess && this.OnProcessObj)
            this.OnProcess.apply(this.OnProcessObj);

        var count = 0;
        for (let table of this.TableLoadMap.keys()) {
            try {
                TableManager.Instance.CreateTable(table);
            }
            catch (e) {
                consoleLog("TableLoadError : " + this.TableLoadMap[table] + " " + e);
                UIManager.Instance.ShowErrorMessage("", "", "Table Load failed",
                    () => { this.MissionFail(); }, this);
                return;
            }
            this._completeCount++;
            if (this.OnProgress && this.OnProgressObj)
                this.OnProgress.apply(this.OnProgressObj);
        }
        for (let table of this.CommonTableLoadMap.keys()) {
            try {
                TableManager.Instance.CreateTable(table);
            }
            catch (e) {
                consoleLog("TableLoadError : " + this.TableLoadMap[table] + " " + e);
                UIManager.Instance.ShowErrorMessage("", "", "Table Load failed",
                    () => { this.MissionFail(); }, this);
                return;
            }
            this._completeCount++;
            if (this.OnProgress && this.OnProgressObj)
                this.OnProgress.apply(this.OnProgressObj);
        }

        this.MissionComplete(null);
    }

    public MissionComplete(event: egret.Event): void {
        this._completeCount = this._subMissionCount;
        this._isComplete = true;

        if (this.OnComplete && this.OnCompleteObj)
            this.OnComplete.apply(this.OnCompleteObj);
    }

    public MissionFail(): void {
        this._isFail = true;
        if (this.OnFail && this.OnFinishObj)
            this.OnFail.apply(this.OnFinishObj);
    }

    public MissionFinish(): void {
        this._isFinish = true;
        if (this.OnFinish && this.OnFinishObj)
            this.OnFinish.apply(this.OnFinishObj);
    }

    /**設置公用表txt*/
	public SetTableMap()
	{
		this.SetCommonTableMap();
		this.SetOtherTableMap();
	}

    /**設置公用表txt*/
	public SetCommonTableMap()
	{
		this.TableLoadMap.add(LocalizationTable, "LocalizationTable");
        //this.TableLoadMap.add(DefaultLocalizationTable, "DefaultLocalizationTable");
		this.TableLoadMap.add(LocalizationCommonTable, "LocalizationCommonTable");
		this.TableLoadMap.add(SlotBetTable, "SlotBetTable");
		this.TableLoadMap.add(SlotLineTable, "SlotLineTable");
		this.TableLoadMap.add(SlotRateTable, "SlotRateTable");
		this.TableLoadMap.add(SlotLineNameTable, "SlotLineNameTable");
        this.TableLoadMap.add(GameNameTable, "GameNameTable");
		// this.TableLoadMap.add(LittleMarrioPatternTable, "LittleMarrioPatternTable");
		this.TableLoadMap.add(CoinSymbolsTable, "CoinSymbolsTable");
		this.TableLoadMap.add(GameWinRateTable, "GameWinRateTable");
        this.TableLoadMap.add(MiscDataTable, "MiscData");
        this.TableLoadMap.add(SlotIconRateTable, "SlotIconRate");
        this.TableLoadMap.add(ExcludeStackTable, "ExcludeStack");
		// this.TableLoadMap.add(OddsUrlTable, "OddsUrlTable");
	}

	public SetOtherTableMap()
	{

	}
}