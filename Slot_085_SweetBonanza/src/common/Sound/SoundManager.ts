class SoundInfo {
    public name: string = "";
    public path: string = "";
    public sound: Howl;
    public soundId: number = 0;
    constructor(name: string, url: string) {
        this.name = name;
        this.path = url;
        this.load();
    }
    public load() {
        this.sound = new Howl(
            {
                src: this.path + "?v=" + SelfData.Instance.getData(SelfData.Instance.GameSettings.m_Version),
                //html5: true
            }
        );
        let that = this;
        this.sound.once('load', function () {
            //consoleLog("Sound " + that.name + " load finish!!!");
            if (that.name == SoundManger.Instance.CheckLoadBgmName) SoundManger.Instance.BgmLoadFinished = true;
        });
    }
    public destroy() {
        if (this.sound != null) {
            this.sound.unload();
            delete this.sound;
            this.sound = null;
        }
    }
}

class SoundManger {
    private static _instance: SoundManger;
    public static get Instance(): SoundManger {
        if (this._instance == null) {
            this._instance = new SoundManger();
        }
        return this._instance;
    }

    public CheckLoadBgmName: string = "";
    public BgmLoadFinished: boolean = false;

    private _enable: boolean = false;
    /** 音樂音效開關 */
    public get Enable(): boolean {
        return this._enable;
    }
    public set Enable(v: boolean) {
        if (v) {
            if (SoundManger.Instance.BGMVolume > 0)
                this.BeforeChangeBGMVolume = SoundManger.Instance.BGMVolume;
            if (SoundManger.Instance.SEVolume > 0)
                this.BeforeChangeSEVolume = SoundManger.Instance.SEVolume;
            SoundManger.Instance.SetBgmVolume(0, true);
            SoundManger.Instance.SetSEVolume(0, true);
            this._enable = v;
            SoundManger.Instance.PlaySoundSE("nosoundbutton");
        }
        else {
            this._enable = v;
            SoundManger.Instance.SetBgmVolume(this.BeforeChangeBGMVolume, true);
            SoundManger.Instance.SetSEVolume(this.BeforeChangeSEVolume, true);
            SoundManger.Instance.PlaySoundSE("nosoundbutton");
        }
        //Howler.mute(v);
    }

    /** 背景音樂 */
    private bgm: Dictionary = new Dictionary([]);
    private bgmName = "";
    /** 當前正在播放中的音效 */
    private seList: Array<SoundInfo> = [];

    private _bgmVolume: number = 1;
    /** bgm音量大小 */
    get BGMVolume(): number { return this._bgmVolume; }
    set BGMVolume(val: number) { this._bgmVolume = val; }

    private _seVolume: number = 1;
    /** 音效音量大小 */
    get SEVolume(): number { return this._seVolume; }
    set SEVolume(val: number) { this._seVolume = val; }

    private _lastPlaySETime: number = 0;
    private _lastPlaySEName: string = "";

    public BeforeChangeBGMVolume: number = 1;
    public BeforeChangeSEVolume: number = 1;

    public constructor(defVolume: number = 1) {
        this.BGMVolume = this.SEVolume = defVolume;
    }

    /** 初始化 */
    public init() {
        let resources: Array<SoundResource> = SoundResources.SoundDic._values;
        for (let i = 0, imax = resources.length; i < imax; ++i) {
            let resource: SoundResource = resources[i];
            if (!resource.preload)
                continue;

            this.createSoundInfo(resource);
        }
    }

    private getSoundInfoByName(name: string): SoundInfo {
        if (!SoundResources.SoundDic.containsKey(name))
            return null;

        return this.createSoundInfo(SoundResources.SoundDic[name]);
    }

    public createSoundInfo(resource: SoundResource): SoundInfo {
        if (resource == null)
            return null;

        return new SoundInfo(resource.name, resource.path);
    }

    private recycleSoundInfo(info: SoundInfo) {
        info.sound.stop();
        info.destroy();
    }

    /**
     * 播放BGM(會蓋掉原BGM)
     * @param name 音效名稱
     */
    public PlayBGM(name: string, isloop: boolean = true) {
        if (SelfData.Instance.ConnectionClose || name == "")
            return;

        if (this.bgm.containsKey(name)) {
            if (!this.bgm[name].sound.playing())
                this.bgm[name].sound.play();
            return;
        }

        let info = this.getSoundInfoByName(name);
        this._playBGM(info, isloop);
    }

    private _playBGM(info: SoundInfo, isloop: boolean = true) {
        if (info === null)
            return;

        this.StopBGM(true);
        this.bgmName = info.name;
        this.bgm.add(info.name, info);
        this.bgm[info.name].sound.loop(isloop);
        //this.bgm.sound.volume(this.BGMVolume);
        this.bgm[info.name].sound.fade(0, this.BGMVolume, 1000);
        this.bgm[info.name].sound.play();
    }

    public async PlayingBGM(name: string, isloop: boolean = true) {
        while (this.bgm[name].sound.playing()) {
            await waitForSeconds(0.01);
        }
        this.PlayBGM(name, isloop);
    }

    /**
     * 停止BGM
     */
    public async StopBGM(fade = false) {
        if (this.bgmName == "")
            return;
        let preName = this.bgmName;
        if (this.bgm.containsKey(preName)) {
            if (fade) {
                this.bgm[preName].sound.fade(this.BGMVolume, 0, 1000);
                await waitForSeconds(1);
            }
            this.recycleSoundInfo(this.bgm[preName]);
            this.bgm.remove(preName);
        }
    }

    /**
     * FadeOut BGM
     * @param vol 音量
     */
    public FadeOutBgm(vol: number = 0.5) {
        if (this.bgm.containsKey(this.bgmName))
            this.bgm[this.bgmName].sound.volume(vol);
    }

    /**
     * FadeIn BGM
     * @param vol 音量, 傳值會設定給BGMVolume
     */
    public FadeInBgm(vol?: number) {
        if (vol != null && vol != undefined)
            this.SetBgmVolume(vol, true);
        else {
            if (this.bgm.containsKey(this.bgmName) != null)
                this.bgm[this.bgmName].sound.volume(this.BGMVolume);
        }
    }

    /**
     * 設定BGM音量
     * @param vol 音量大小 0~1
     * @param force 是否強制刷新
     */
    public SetBgmVolume(vol: number, force: boolean = false) {
        if (this._enable) return;
        if (this.BGMVolume == vol && !force)
            return;

        this.BGMVolume = vol;
        let keys = this.bgm.keys();
        for (let i = 0, max = keys.length; i < max; ++i) {
            this.bgm[keys[i]].sound.volume(this.BGMVolume);
        }
    }

    /**
     * 設定音效音量
     * @param vol 音量大小 0~1
     */
    public SetSEVolume(vol: number, force: boolean = false) {
        if (this._enable) return;
        if (this.SEVolume == vol && !force)
            return;

        this.SEVolume = vol;

        let list = this.seList;
        for (let i = 0, imax = list.length; i < imax; ++i) {
            list[i].sound.volume(vol);
        }
    }

    /**
     * 播放音效
     * @param name 音效名稱
     * @param loop 是否為loop音效(選填，預設為false)
     * @param volume 音量(0~1)(選填，預設為SEVolume)
     * @param callfunc 播完後要做的事情(選填)     
     */
    public PlaySoundSE(name: string, loop?: boolean, volume?: number, callfunc?: (soundId: number, name: string) => void, callThis?: any, rate?: number) {
        if (SelfData.Instance.ConnectionClose || name == "")
            return;

        //避免一樣的音效 同時播放 0.1秒 同名只能播放一次
        if (name == this._lastPlaySEName) {
            let nowTime = Math.floor(new Date().getTime() / 100);
            if (nowTime == this._lastPlaySETime)
                return;

            this._lastPlaySETime = nowTime;
        }

        let info = this.getSoundInfoByName(name);
        if (info == null)
            return;

        if (info.sound.playing())
            info.sound.stop();

        this._lastPlaySEName = name;

        if (volume != null && volume != undefined)
            info.sound.volume(volume);
        else
            info.sound.volume(this.SEVolume);

        let isLoop: boolean = false;
        if (loop != null && loop != undefined) {
            isLoop = loop;
            info.sound.loop(loop);
        }
        else
            info.sound.loop(false);


        if (rate != null)
            info.sound.rate(rate);
        else
            info.sound.rate(1);
            
        let id = info.sound.play();
        info.soundId = id;
        //console.log("PlaySoundSE: " + id);
        this.seList.push(info);

        if (callfunc != null && callfunc != undefined) {
            if (callThis != null && callThis != undefined)
                info.sound.on("end", soundId => callfunc.apply(callThis, [soundId, name]));
            else
                info.sound.on("end", SoundId => callfunc(SoundId, name));
        }
        if (!isLoop)
            info.sound.on("end", soundId => this.onSoundComplete.apply(this, [soundId, name]));

        return info;
    }

    private onSoundComplete(soundId: number, name: string): void {
        let list = this.seList;
        for (let i = list.length - 1; i >= 0; --i) {
            let info = list[i];
            if (info.soundId === soundId) {
                this.recycleSoundInfo(info);
                delete list[i];
                list[i] = null;
                list.splice(i, 1);
                return;
            }
        }
    }

    /**
     * 停止音效
     * @param name 音效名稱, 空值=全音效停止
     */
    public StopSoundSE(name: string = "") {
        let list = this.seList;
        for (let i = list.length - 1; i >= 0; --i) {
            let info = list[i];
            if (name === "" || info.name === name) {
                //info.sound.stop();
                this.recycleSoundInfo(info);
                delete list[i];
                list[i] = null;
                list.splice(i, 1);
            }
        }
    }
}