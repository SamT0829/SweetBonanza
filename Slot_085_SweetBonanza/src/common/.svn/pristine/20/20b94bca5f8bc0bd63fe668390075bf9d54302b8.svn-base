enum WorkType { OneByOne, Multiple }

/**任務群組*/
class MissionGroup 
{
	get WorkType() { return this._workType; }
	get IsWorking() { return this._isWorking; }
	get IsComplete() { return this._isComplete; }
	get IsFail() { return this._isFail; }
	/**獲取任務計數器*/
	get Count() {
		let count = 0.0;
		this._missionLine.forEach(mission=>{ count += mission.SubMissionCount;})
		 return count; 
		}
	/**獲取任務完成計數器*/
	get CompleteCount()
	{
		var completeCountSum = 0.0;
		for (var i = 0; i < this._missionLine.length; i++)
		{
			completeCountSum += this._missionLine[i].CompleteCount;
		}
		return completeCountSum;
	}
	/**獲取任務名稱*/
	get CurrentMissionName()
	{
		if (this.IsComplete)
			return "Complete";
		if (!this.IsWorking)
			return "";

		if (this._currentMission)
		{
			return this._currentMission.Name;
		}
		return "";
	}

	public OnFinish: Function;
	public OnFail: Function;
	public OnFinishObj: Object;
	public OnFailObj: Object;

	private _workType = WorkType.OneByOne;
	private _currentMission: MissionBase;
	private _currentMissionIndex: number = 0;
	private _missionLine = new Array<MissionBase>();
	private _isWorking: boolean = false;
	private _isComplete: boolean = false;
	private _isFail: boolean = false;

	public constructor(workType: WorkType) 
	{
		this._workType = workType;
	}

	/**添加任務*/
	public Add(mission: MissionBase): void
	{
		this._missionLine.push(mission);
		mission.MyMissionGroup = this;
	}

	/**任務群組準備*/
	async MissionGroupPrepare()
	{
		for(let i = 0,max = this._missionLine.length;i<max;++i)
		{
			consoleLog("MissionGroupPrepare :" + this._missionLine[i].Name);
			await this._missionLine[i].MissionPrepare();
		}
	}

	/**任務組工作*/
	public async MissionGroupWork()
	{	
		await this.MissionGroupPrepare();
		this._isWorking = true;
		if (this._workType == WorkType.OneByOne)
		{
			for (var mission of this._missionLine)
			{
				consoleLog("MissionWork :" + mission.Name);
				this._currentMission = mission;
				this._currentMission.MissionWork();
				//等待任務完成
				while (!this._currentMission.IsFinish)
				{
					if (this._currentMission.IsFail)
					{
						this._isFail = true;
						break;
					}
					else
					{
						await waitForSeconds( 0.05 );
					}
				}

				//任務失敗時
				if (this._currentMission.IsFail)
                {
                    if (this.OnFail)
                    {
                        this.OnFail();
                    }
                    break;
                }
			}

			if (this.CompleteCount >= this.Count)
            {
                await waitForSeconds( 0.5 );
                this.Finish();
            }
		}
		else if (this._workType == WorkType.Multiple)
		{

		}
	}

	/**任務組完成*/
	public Finish(): void
	{
		if (this.CompleteCount >= this.Count)
		{
			this._isWorking = false;
            this._isComplete = true;
            if (this.OnFinish)
                this.OnFinish();
		}
	}

	/**任務組重新*/
	public ResetMissionGroup(): void
	{
		this._currentMissionIndex = 0;
		this._isWorking = false;
		this._isComplete = false;
		this._isFail = false;

		for (var i = 0, Max = this._missionLine.length; i < Max; i++)
        {
            this._missionLine[i].MissionReset();
            this._isComplete = false;
            this._isWorking = false;
            this._isFail = false;
        }
	}
}