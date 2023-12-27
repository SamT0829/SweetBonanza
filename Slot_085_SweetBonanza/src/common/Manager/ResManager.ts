class ResManager {
    private static _instance: ResManager;
    public static get Instance(): ResManager {
        if (this._instance == null) {
            this._instance = new ResManager();
        }
        return this._instance;
    }

    private ResFolderName: string = "resource/";

    private ExmlFolderName: string = "eui_skins/";
    private SceneFolderName: string = "eui_scenes/";
    private TxtFolderName: string = "localtable/";
    private TxtRemoteFolderName: string = "remotetable/";
    private TxtCommonFolderName: string = "assets/commonAssets/commonTable/";

    private ExmlFileName: string = ".exml";
    private TxtFileName: string = ".txt";

    public ResZipData: Dictionary = new Dictionary([]);

    public constructor() {

    }

    public LoadFXJson(name: string) {
        //RES.getResByUrl(this.GetTxtURL(name, true), (date)=>{ this.onParticleJsonTxt(date, name); }, this,RES.ResourceItem.TYPE_TEXT);
        let fileText = this.GetResource(name + "_txt");
        if (fileText) {
            this.onParticleJsonTxt(fileText, name);
        }
    }

    private onTxt(date: string) {
        consoleLog("TXT內容:" + date);
    }

    private onParticleJsonTxt(date: string, name: string) {
        ///////////////////////////////////// deal with
        // var json = JSON.parse(date);
        // var fxParticle = new FXParticles(json);

        // SelfData.Instance.setFXParticleData(name, fxParticle);
        ////////////////////////////////////////
    }

    //-------------------------SET

    public SetVerion(verion: string) {
        if (verion == "02") {
            this.ResFolderName = "resource02/";
        }
        else {
            this.ResFolderName = "resource/";
        }
    }

    public AddFairyPackage(name: string) {
        if (this.ResZipData.containsKey(name))
            fairygui.UIPackage.addPackage(name, this.ResZipData[name]);
        else if (this.ResZipData.containsKey(name+"_fui"))
            fairygui.UIPackage.addPackage(name, this.ResZipData[name+"_fui"]);
        else
            fairygui.UIPackage.addPackage(name);
    }

    //------------------------GET

    public GetResource(name: string): any {
        if (this.ResZipData.containsKey(name)) {
            return this.ResZipData[name];
        }
        if (RES.hasRes(name))
            return RES.getRes(name);
    }

    public GetLanguageResource(name: string, exten: string): any {

        let fname = name + "_" + LanguageType[SelfData.Instance.Language] + "_" + exten;

        if (this.ResZipData.containsKey(fname)) {
            return this.ResZipData[fname];
        }
        if (RES.hasRes(fname))
            return RES.getRes(fname);
    }

    public GetEXmlURL(name: string): string {
        return this.ResFolderName + this.ExmlFolderName + name + this.ExmlFileName;
    }

    public GetSceneURL(name: string): string {
        return this.ResFolderName + this.SceneFolderName + name + this.ExmlFileName;
    }

    public GetTxtURL(name: string, isRemote: boolean): string {
        if (isRemote) {
            return this.ResFolderName + this.TxtRemoteFolderName + name + this.TxtFileName;
        }
        else {
            return this.ResFolderName + this.TxtFolderName + name + this.TxtFileName;
        }
    }
    public GetCommonTxtURL(name: string): string {
        return this.ResFolderName + this.TxtCommonFolderName + name + this.TxtFileName;
    }
}


//-------------------------------


