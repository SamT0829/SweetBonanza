class SoundResource {
    public name: string = "";
    public path: string = "";

    /** 是否先load起來 */
    public preload: boolean = false;

    /** 是否為loop播放 */
    public loop: boolean = false;

    public constructor(name: string, path: string, preload: boolean = false) {
        this.name = name;
        this.path = path;
        this.preload = preload;
    }
}

class SoundResources {
    private static _soundDic: Dictionary = new Dictionary([]);
    /**
     * key: name, value: SoundResource
     */
    static get SoundDic(): Dictionary { return SoundResources._soundDic; }
    static set SoundDic(val: Dictionary) { SoundResources._soundDic = val; }
}