class SpecialWildManager {
    public ShowPerTime = 0.0;
    public HidePerTime = 0.0;

    protected SpecialWildObjs: Array<fairygui.GObject[]> = [];

    protected FairyguiName_StartTrans = "show";
    protected FairyguiName_LoopTrans = "loop";
    protected FairyguiName_HideTrans = "hide";
    protected FairyguiName_AnimEnd = "end";

    private IsAnimEnd = false;
    protected SpecialWIldID: number = -1;
    //private CurrentShowIdx :number[] = [-1,0];
    protected CurrentShowLineIdxList: number[] = [];
    protected CurrentShowAnimIdxList: number[] = [];

    public get IsSpecialWIld() { 
        return this.CurrentShowLineIdxList.length > 0; 
    };
    public constructor(specialWildID: number, specialWildObjs: Array<fairygui.GObject[]>) {
        this.SpecialWIldID = specialWildID;
        this.SpecialWildObjs = specialWildObjs;
    }

    public SetSpecialWildObjs() {
        for (let i = 0, imax = this.SpecialWildObjs.length; i < imax; i++) {
            for (let j = 0, jmax = this.SpecialWildObjs[i].length; j < jmax; j++) {
                let startTrans = this.SpecialWildObjs[i][j].asCom.getTransition(this.FairyguiName_StartTrans);
                let loopTrans = this.SpecialWildObjs[i][j].asCom.getTransition(this.FairyguiName_LoopTrans);
                let hideTrans = this.SpecialWildObjs[i][j].asCom.getTransition(this.FairyguiName_HideTrans);
                if(startTrans!=null){
                    startTrans.setHook(this.FairyguiName_AnimEnd,
                        () => {
                            this.IsAnimEnd = true;
                            loopTrans.play();
                        }, this);
                    hideTrans.setHook(this.FairyguiName_AnimEnd, () => { this.IsAnimEnd = true; }, this);
                    this.SpecialWildObjs[i][j].visible = false;
                }
            }
        }
    }

    public async ShowSpecialWild(wheelData: Array<number[]>) {
        //this.ShowAllSpecialWild();
        for (let i = 0; i < wheelData.length; i++) {
            if (wheelData[i].indexOf(this.SpecialWIldID) >= 0) {
                // this.CurrentShowIdx[0] = 1;
                this.CurrentShowLineIdxList.push(i);
                //break;
            }
        }
        let showLen = this.CurrentShowLineIdxList.length;
        if (showLen > 0) {
            SoundManger.Instance.PlaySoundSE(BreakAwayGameData.Instance.SoundName.SpecialWildBGM);
            for (let i = 0; i < showLen; i++) {
                let random = randomInt(0, this.SpecialWildObjs[this.CurrentShowLineIdxList[i]].length - 1);
                let wildObj = this.SpecialWildObjs[this.CurrentShowLineIdxList[i]][random];
                this.CurrentShowAnimIdxList.push(random);

                if (i == showLen - 1)
                    await this.AwaitAnimShow(wildObj, this.FairyguiName_StartTrans);
                else {
                    this.AwaitAnimShow(wildObj, this.FairyguiName_StartTrans);
                    await waitForSeconds(this.ShowPerTime)
                }
            }
        }
    }


    public async ShowSpecialWildForReData(wheelData: Array<number[]>) {
        //this.ShowAllSpecialWild();
        for (let i = 0; i < wheelData.length; i++) {
            if (wheelData[i].indexOf(this.SpecialWIldID) >= 0) {
                // this.CurrentShowIdx[0] = 1;
                this.CurrentShowLineIdxList.push(i);
                //break;
            }
        }
        let showLen = this.CurrentShowLineIdxList.length;
        if (showLen > 0) {
            for (let i = 0; i < showLen; i++) {
                let random = randomInt(0, this.SpecialWildObjs[this.CurrentShowLineIdxList[i]].length - 1);
                let wildObj = this.SpecialWildObjs[this.CurrentShowLineIdxList[i]][random];
                this.CurrentShowAnimIdxList.push(random);

                if (i == 0)
                    this.AwaitAnimShow(wildObj, this.FairyguiName_LoopTrans);
            }
        }
    }

    public async HideSpecialWild() {
        let len = this.CurrentShowLineIdxList.length;
        SoundManger.Instance.StopSoundSE(BreakAwayGameData.Instance.SoundName.Win5AKind);
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                let wildObj = this.SpecialWildObjs[this.CurrentShowLineIdxList[i]][this.CurrentShowAnimIdxList[i]];
                if (i == 0)
                    SoundManger.Instance.StopSoundSE(BreakAwayGameData.Instance.SoundName.SpecialWildBGM);
                if (i == len - 1) {
                    await this.AwaitAnimShow(wildObj, this.FairyguiName_HideTrans);
                    this.CurrentShowLineIdxList = [];
                    this.CurrentShowAnimIdxList = [];
                    this.HideAllSpecialWild();
                }
                else {
                    this.AwaitAnimShow(wildObj, this.FairyguiName_HideTrans);
                    await waitForSeconds(this.HidePerTime)
                }
            }
        }
    }

    protected async AwaitAnimShow(obj: fairygui.GObject, transName: string) {
        this.IsAnimEnd = false;
        obj.visible = true;
        let trans = obj.asCom.getTransition(transName);
        trans.play();
        while (!this.IsAnimEnd)
            await waitForSeconds(0.1);
    }

    public HideAllSpecialWild() {
        for (let i = 0, max = this.SpecialWildObjs.length; i < max; ++i) {
            for (let j = 0, jmax = this.SpecialWildObjs[i].length; j < jmax; ++j) {
                this.SpecialWildObjs[i][j].visible = false;
            }

        }
    }

    public ShowAllSpecialWild() {
        for (let i = 0, max = this.SpecialWildObjs.length; i < max; ++i) {
            for (let j = 0, jmax = this.SpecialWildObjs[i].length; j < jmax; ++j) {
                this.SpecialWildObjs[i][j].visible = true;
            }

        }
    }
}