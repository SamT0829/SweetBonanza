enum LoginLogEnum {
    AccountLoginRespond,
    LobbyLoginRespond,
    JoingGameRespond,
    LoadTagetGameResource,
    LoadTagetGameFinish,
    LoadBackGroundResource,
    LoadBackGroundFinish,
    GameReady
}

class Main extends egret.DisplayObjectContainer {
    protected loadingController: LoadingController;
    protected DefaultSoundList: string[] = ["coin_main_win", "coin_main_win01", "win_bgm_1", "win_bgm_2", "win_bgm_3", "win_os_1", "win_os_2", "win_os_3"];
    protected SoundList: string[] = [];
    protected DefaultSoundPath: string = "./resource/assets/sound/common/";
    protected SoundPath: string = "./resource/assets/sound/";
    protected get_IP = true;
    protected ipLoader = null;

    //protected IsUsingWebP :boolean =false;
    protected get IsUsingWebP(): boolean { return SelfData.Instance.IsUsingWebP; }
    protected set IsUsingWebP(value: boolean) { SelfData.Instance.IsUsingWebP = value; }

    protected PreloadGroups: string[] = [];
    protected TargetGameGroups = [];
    protected LanguageGroups: string[] = [];
    protected BackgroundLoadGroups: string[] = [];
    protected BackgroundLoadLanguageGroups: string[] = [];

    protected SoundEnabled = false;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    protected onAddToStage(): void {

        try {
            localStorage.getItem("ip111");
        } catch (error) {
            this.get_IP = false;
            SelfData.Instance.UseLocalStorage = false;
        }

        if (this.get_IP)
            this.getIP();
        //------------egret.lifecycle（生命周期）----------//                                            //addLifecycleListener接受一个参数，这个参数的类型为“只有一个参数（这里名叫context）的函数”即所谓的LifecyclePlugin，而这个函数的具体内容是由我们自己定义的，像下面这样：
        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {                                                                  //这个可以在EgretWeb中的startTicker函数中找到，是一秒执行六十次。
                EventManager.Instance.Update();                                                         //context这个形参代表LifecycleContext类的一个实例，这个类有两个必有的方法pause()跟resume()，另外还有一个可选的方法onUpdate()，上面就是对这个可选的方法进行定义。
            }
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            //egret.ticker.pause();

            //do not pause
            if (egret.Capabilities.isMobile) {
                this.SoundEnabled = SoundManger.Instance.Enable;
                SoundManger.Instance.Enable = true;
                egret.ticker.pause();

            }
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();

            if (egret.Capabilities.isMobile) {
                window['preventMask'] = false;
                window.dispatchEvent(new CustomEvent('resize'));
                SoundManger.Instance.Enable = this.SoundEnabled;
            }
        }

        this.runGame().catch(e => {
            console.log(e);
        })
        //this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterFullScreen, this);
        
    }

    private enterFullScreen(): void {
        // 使用 Egret 提供的 API 進入全螢幕模式
        let el = document.documentElement as any;
        let rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

        if (typeof rfs != "undefined" && rfs) {
            rfs.call(el);

        };
        return;
    }

    protected AppStart() {
        WebView.SetDevicePixelRatio();
        this.loadingController = new LoadingController(this.stage);
        this.loadingController.PreloadGroups = this.PreloadGroups;
        this.loadingController.TargetGameGroups = this.TargetGameGroups;
        this.loadingController.LanguageGroups = this.LanguageGroups;
        this.loadingController.BackgroundLoadGroups = this.BackgroundLoadGroups;
        this.loadingController.BackgroundLoadLanguageGroups = this.BackgroundLoadLanguageGroups;
        this.loadingController.LoadingStart(this.onGameLoadComplete, this.onResourceLoadOnBackgroundComplete, this);
    }

    /**遊戲加載完成*/
    protected onGameLoadComplete(event: RES.ResourceEvent): void {

        //let mask = egret.getOption('mask');
        //let nosleep = egret.getOption('noSleep');

        if (egret.Capabilities.isMobile) {
            if (egret.Capabilities.os == "iOS") {               // 指示当前的操作系统。os 属性返回下列字符串 .         iOS 苹果手机操作系统
                document.addEventListener("gesturestart", (evt) => {
                    evt.preventDefault();
                }, false);
                document.addEventListener('gesturechange', (evt) => {
                    evt.preventDefault();
                }, false);
                document.addEventListener('gestureend', (evt) => {
                    evt.preventDefault();
                }, false);

                // if (mask == "true" || mask == "") {
                //     window.dispatchEvent(new CustomEvent('initMask'));
                // }
            }

            // if (nosleep == "true" || nosleep == "") {
            //     window['nosleep'] = new window['NoSleep']();
            //     window['nosleep'].enable();
            // }
        }
        // if (mask == "true") {
        //     window.dispatchEvent(new CustomEvent('initMask'));
        // }

        // if (nosleep == "true") {
        //     window['nosleep'] = new window['NoSleep']();
        //     window['nosleep'].enable();
        // }

        let WinRateTable: GameWinRateTable = TableManager.Instance.GetTable(GameWinRateTable);
        if (WinRateTable != null) {
            SelfData.Instance.BigWinRate = WinRateTable.GetValue<string, number>(SelfData.Instance.TargetGame, GameWinRateTable.m_BigWinRate);
            SelfData.Instance.HugeWinRate = WinRateTable.GetValue<string, number>(SelfData.Instance.TargetGame, GameWinRateTable.m_HugeWinRate);
            SelfData.Instance.MegaWinRate = WinRateTable.GetValue<string, number>(SelfData.Instance.TargetGame, GameWinRateTable.m_MegaWinRate);
        }

        mouse.enable(this.stage);

        // ResManager.AddFairyPackage("Common");   //////////////////////common fairy package
        // document.title = OddsUrlTable.getName();
        //document.title = "Megawin Casino";
    }

    protected onResourceLoadOnBackgroundComplete() {

    }

    protected async runGame() {
        this.AppStart();
    }

    protected AddGameSound() {
        FairyExButton.ButtonSoundName = "button";

        for (let i = 0; i < this.DefaultSoundList.length; i++)
            SoundResources.SoundDic.add(this.DefaultSoundList[i], new SoundResource(this.DefaultSoundList[i], this.DefaultSoundPath + this.DefaultSoundList[i] + ".mp3"));

        for (let i = 0; i < this.SoundList.length; i++)
            SoundResources.SoundDic.add(this.SoundList[i], new SoundResource(this.SoundList[i], this.SoundPath + this.SoundList[i] + ".mp3"));

        for (let i = 1; i <= 10; i++)
            SoundResources.SoundDic.add("win" + i, new SoundResource("win" + i, this.SoundPath + "win" + i + ".mp3"));


        SoundManger.Instance.init();
    }

    // private resize($e?): void {

    //     let rate = window.innerWidth / window.innerHeight;
    //     if (rate > 0.85) {
    //         this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
    //         SelfData.Instance.IsPortrait = false;
    //         fairygui.GRoot.inst.displayObject.y = 0;
    //     }
    //     else {
    //         this.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
    //         SelfData.Instance.IsPortrait = true;
    //     }

    //     let event: StageResizeEvent = new StageResizeEvent();
    //     event.IsPortrait = SelfData.Instance.IsPortrait;
    //     EventManager.Instance.Send(event);
    // }


    //private iploader: egret.URLLoader;
    protected getIP() {
        // this.iploader = new egret.URLLoader();
        // this.iploader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        // var req: egret.URLRequest = new egret.URLRequest();
        // req.requestHeaders = [new egret.URLRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")];
        // req.url = "http://pv.sohu.com/cityjson?ie=utf-8";
        // this.iploader.load(req);
        // this.iploader.addEventListener(egret.Event.COMPLETE, this.onGetIPComplete, this);

        //var url: string = "http://pv.sohu.com/cityjson?ie=utf-8"; // this.config.loginUrl;
        //请求登录服务器
        // this.iploader = new egret.URLLoader();
        // this.iploader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        // var request: egret.URLRequest = new egret.URLRequest();
        // request.requestHeaders = [new egret.URLRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")];
        // request.url = "http://pv.sohu.com/cityjson?ie=utf-8";
        // this.iploader.addEventListener(egret.Event.COMPLETE, function (evt: egret.Event): void {
        //     var data: string = this.loginLoader.data;
        //     console.log(data);
        // }, this);
        // this.iploader.load(request);
        // let ip1 = localStorage.getItem("ip111");
        // let ip2 = localStorage.getItem("ip222");
        // let ip3 = localStorage.getItem("ip333");
        let ip4 = localStorage.getItem("ip444");
        // console.log("query ip 1: " + ip1);
        // console.log("query ip 2: " + ip2);
        // console.log("query ip 3: " + ip3);
        // console.log("query ip 4: " + ip4);
        // if (ip1 != null) SelfData.Instance.ClientIP = ip1;
        // else if (ip2 != null) SelfData.Instance.ClientIP = ip2;
        // else if (ip3 != null) SelfData.Instance.ClientIP = ip3;
        // else if (ip4 != null) SelfData.Instance.ClientIP = ip4;
        try {
            let oldGameUrl: string = eval('window.location.href.toString()');
            let http_s = oldGameUrl.split("//")[0];
            let _url = oldGameUrl.split("//")[1].split("/");
            _url = _url[0].split('.');
            let stringURL = http_s + "//" + "ipg";
            for (let i = 1; i < _url.length; ++i) {
                stringURL += "." + _url[i];
            }

            stringURL = stringURL + "/getip2"
            //console.log(stringURL);
            this.ipLoader = new egret.URLLoader();
            this.ipLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            var request: egret.URLRequest = new egret.URLRequest(stringURL);
            this.ipLoader.addEventListener(egret.Event.COMPLETE, this.onGetIP, this);
            this.ipLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIP, this);
            request.requestHeaders.push(new egret.URLRequestHeader("Accept", "application/json"));
            request.method = egret.URLRequestMethod.POST;
            this.ipLoader.load(request);
        } catch (error) {
            consoleLog(error);
        }


    }
    private async onGetIP(event) {
        let data = JSON.parse(this.ipLoader.data);
        if (data != null) {
            SelfData.Instance.ClientIP = data.ip;
        }
    }

    private onGetIPComplete(event: egret.Event): void {
        //egret.error("ip: " + JSON.stringify(this.iploader.data));
    }
}
