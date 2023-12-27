function deBounce(func) {
    let scheduledAnimationFrame = false;

    return function (...args) {

        if (scheduledAnimationFrame) return;

        scheduledAnimationFrame = true;

        func(...args);

        window.requestAnimationFrame(function () {
            scheduledAnimationFrame = false;
        });
    };
}

class WebView extends egret.DisplayObjectContainer {
    private static devicePixelRatio: number;
    public static SetDevicePixelRatio() {
        WebView.devicePixelRatio = window.devicePixelRatio;
    }

    private static viewList: Array<WebView> = new Array();
    public static DestroyAll(): void {
        for (let i = 0, max = WebView.viewList.length; i < max; i++) {
            let view = WebView.viewList[i];
            view.destroy();
        }

        WebView.viewList.splice(0);
    }

    private _x: number = 0;
    private _y: number = 0;
    private _width: number = 0;
    private _tarWidth: number = 0;
    private _defWidth: number = 1000;
    private _defWidth2: number = 600;
    private _height: number = 0;
    private _tarHeight: number = 0;
    private _defHeight: number = 530;
    private _defHeight2: number = 1170;
    private _src: string = "";

    private get _calculWidth() { return this._isPortrait ? this._defWidth2 : this._defWidth; }
    private get _calculHeight() { return this._isPortrait ? this._defHeight2 : this._defHeight; }

    private _scaleMode: string = egret.MainContext.instance.stage.scaleMode;
    private _orientation: string = egret.MainContext.instance.stage.orientation;
    private _stageW: number = 1024;
    private _stageH: number = 576;
    private _windowW: number;
    private _windowH: number;
    // private _docElemW:number;
    // private _docElemH:number;
    private _displayH: number;
    private _displayW: number;
    private _radio: number;

    private _initW: number;
    private _initH: number;

    private _iframeWrapper: HTMLDivElement = null;
    private _iframe: HTMLIFrameElement = null;

    private _isPortrait: boolean = false;

    public constructor(src: string, destroyOld: boolean = false) {
        super();

        if (destroyOld)
            WebView.DestroyAll();

        this.Init(src);
    }

    protected async Init(src: string) {
        this._src = src;

        let stageDelegateDom: HTMLElement = document.getElementById("StageDelegateDiv");
        let iframeWrapperDom = document.getElementById("iframe-wrapper");
        if (!iframeWrapperDom) {
            iframeWrapperDom = document.createElement("div");
            iframeWrapperDom.style.display = "none";

            if (egret.Capabilities.os == "iOS") {
                let iosVer = iOSVersion();
                if (iosVer.version < 13) {
                    iframeWrapperDom.attributes['style'].value += '-webkit-overflow-scrolling: touch;overflow-y: scroll;';
                    window.addEventListener('resize', deBounce(function () {

                        const mask = <HTMLElement>document.querySelector('.mask')

                        iframeWrapperDom.style.pointerEvents = (mask && mask.style.pointerEvents === "auto") ? "none" : "auto"
                    }));
                }
                //解决iframe在ios 13以下的显示问题, ios 13已修正此問題
            }

            iframeWrapperDom.id = "iframe-wrapper";
            stageDelegateDom.appendChild(iframeWrapperDom);
        }

        this._iframeWrapper = <HTMLDivElement>iframeWrapperDom;
        this._iframeWrapper.style.position = "absolute";
        this._iframeWrapper.style.display = "none";
        this._iframeWrapper.style.opacity = "0";

        let iframe = document.createElement("iframe");
        let time = new Date().getTime();
        iframe.id = "webview-iframe-" + time;
        iframe.name = "webview-iframe-" + time;
        iframe.src = src;
        //iframe.scrolling = "no";
        // iframe.style.overflow = "hidden"
        // iframe.style.overflowX = "hidden";
        // iframe.style.overflowY = "hidden";
        iframe.style.position = "absolute";
        iframe.style.top = "0px";
        iframe.style.left = "0px";
        iframe.style.display = 'none';
        iframe.style.opacity = "0";
        iframe.style.borderRadius = "10px";
        iframe.style.background = "#041d4b";
        iframe.frameBorder = "3px";
        iframe.border = "0";
        this._iframeWrapper.appendChild(iframe);

        this._iframe = <HTMLIFrameElement>document.getElementById("webview-iframe-" + time);

        let self = this;
        this._iframe.onload = function () {
            self._iframeWrapper.style.opacity = "1";
            self._iframe.style.opacity = "1";
        }

        this._radio = WebView.devicePixelRatio; //window.devicePixelRatio;
        this._initW = SelfData.Instance.UIWindowsSize.x * this._radio;
        this._initH = SelfData.Instance.UIWindowsSize.y * this._radio;

        this.getWH();

        WebView.viewList.push(this);
    }

    public show(x: number = 0, y: number = 0, w: number = 1120, h: number = 630, resize: boolean = false): void {
        //var webview = new WebView( "http://www.baidu.com", true );
        //webview.show();
        //console.log("webview: " + x + "|" + y + "   " + w + "|" + h);

        if (!resize) {
            this._iframe.style.display = 'block';
            this._iframeWrapper.style.display = 'block';
        }

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        if (SelfData.Instance.WindowSwitch) {
            if (window.innerWidth >= window.innerHeight) {
                this._isPortrait = false;
                this._iframe.style.transform = "rotate(0deg)";
            } else {
                this._isPortrait = true;
                this._iframe.style.transform = "rotate(-90deg)";
            }
        }
        else {
            this._isPortrait = false;
            this._iframe.style.transform = "rotate(0deg)";
        }

        //if (!this._isPortrait) {
            let ws = this._tarWidth / this._calculWidth;
            let wh = this._tarHeight / this._calculHeight;
            this._iframeWrapper.style.transform = "scale(" + ws + "," + wh + ")";
            this._iframeWrapper.style.transformOrigin = "0px 0px";
        // }
        // else {
        //     this._iframeWrapper.style.transform = "";
        //     this._iframeWrapper.style.transformOrigin = "";
        // }

        //if (resize) {
            this.refresh();
        //}


    }

    public hide() {
        this._iframe.style.display = 'none';
        this._iframeWrapper.style.display = 'none';
    }

    private refresh() {
        if (this._src == "")
            return;

        if (this._iframe) {
            this.getWH();

            this.x = this._x;
            this.y = this._y;
            this.width = this._width;
            this.height = this._height;

            //if (!this._isPortrait) {
                let ws = this._tarWidth / this._calculWidth;
                let wh = this._tarHeight / this._calculHeight;
                this._iframeWrapper.style.transform = "scale(" + ws + "," + wh + ")";
                this._iframeWrapper.style.transformOrigin = "0px 0px";
            // }
            // else {
            //     this._iframeWrapper.style.transform = "";
            //     this._iframeWrapper.style.transformOrigin = "";
            // }
        }
    }

    private getWH(): void {
        this._scaleMode = egret.MainContext.instance.stage.scaleMode;
        this._orientation = egret.MainContext.instance.stage.orientation;

        this._stageW = egret.MainContext.instance.stage.stageWidth;
        this._stageH = egret.MainContext.instance.stage.stageHeight;

        this._windowW = window.innerWidth;
        this._windowH = window.innerHeight;

        // this._docElemW = document.documentElement.clientWidth;
        // this._docElemH = document.documentElement.clientHeight;

        //this._radio = window.devicePixelRatio;
        //console.log("devicePixelRatio: " + this._radio);

        let screenWidth: number = this._windowW;
        let screenHeight: number = this._windowH;
        if (this._orientation == egret.OrientationMode.LANDSCAPE && this._scaleMode == egret.StageScaleMode.SHOW_ALL && screenWidth < screenHeight) {
            screenWidth = this._windowH;
            screenHeight = this._windowW;
        }

        let stageSize = egret.sys.screenAdapter.calculateStageSize(this._scaleMode, screenWidth, screenHeight, this._initW, this._initH);
        this._displayW = stageSize.displayWidth;
        this._displayH = stageSize.displayHeight;

        //egret.log("windowW:"+this._windowW);
        //egret.log("windowH:"+this._windowH);

        // egret.log("docElemW:"+this._docElemW);
        // egret.log("docElemH:"+this._docElemH);

        //egret.log("stageW:"+this._stageW);
        //egret.log("stageH:"+this._stageH);

        //egret.log("disPlayW:"+this._displayW);
        //egret.log("displayH:"+this._displayH);
    }

    public destroy(): void {
        if (this._iframe) {
            this._iframeWrapper.style.display = "none";
            this._iframeWrapper.removeChild(this._iframe);
            WebView.viewList.splice(WebView.viewList.indexOf(this), 1);
        }
    }

    public get width(): number {
        return this._width;
    }

    public set width(value: number) {
        this._width = value;

        if (this._scaleMode == egret.StageScaleMode.SHOW_ALL) {
            let scale: number = this._displayW / this._stageW;
            this._tarWidth = Math.floor(this._width * scale * this._radio);
            let px: string = this._tarWidth + "px";
            //egret.log("w: " + px);
            //if (!this._isPortrait) {
                this._iframe.style.width = this._calculWidth + "px";//px;
                this._iframeWrapper.style.width = this._calculWidth + "px";//px;     
            // }
            // else {
            //     this._iframe.style.width = px;
            //     this._iframeWrapper.style.width = px;
            // }
        }
        else {
            let scale: number = this._windowW / this._stageW;
            this._tarWidth = Math.floor(this._width * scale * this._radio);
            let px: string = this._tarWidth + "px";
            //egret.log("w: " + px);
            //if (!this._isPortrait) {
                this._iframe.style.width = this._calculWidth + "px";//px;
                this._iframeWrapper.style.width = this._calculWidth + "px";//px;
            // }
            // else {
            //     this._iframe.style.width = px;
            //     this._iframeWrapper.style.width = px;
            // }
        }
    }

    public get height(): number {
        return this._height;
    }

    public set height(value: number) {
        this._height = value;

        if (this._scaleMode == egret.StageScaleMode.SHOW_ALL) {
            let scale: number = this._displayH / this._stageH;
            this._tarHeight = Math.floor(this._height * scale * this._radio);
            let px: string = this._tarHeight + "px";
            //egret.log("h: " + px);
            //if (!this._isPortrait) {
                this._iframe.style.height = this._calculHeight + "px";//px;
                this._iframeWrapper.style.height = this._calculHeight + "px";//px;
            // }
            // else {
            //     this._iframe.style.height = px;
            //     this._iframeWrapper.style.height = px;
            // }
        }
        else {
            let scale: number = this._windowH / this._stageH;
            this._tarHeight = Math.floor(this._height * scale * this._radio);
            let px: string = this._tarHeight + "px";
            //egret.log("h: " + px);
            //if (!this._isPortrait) {
                this._iframe.style.height = this._calculHeight + "px";//px;
                this._iframeWrapper.style.height = this._calculHeight + "px";//px;
            // }
            // else {
            //     this._iframe.style.height = px;
            //     this._iframeWrapper.style.height = px;
            // }
        }
    }

    public get x(): number {
        return this._x;
    }

    public set x(value: number) {
        this._x = value;

        if (this._scaleMode == egret.StageScaleMode.SHOW_ALL) {
            let scale: number = this._displayW / this._stageW;
            let px: string = Math.floor(this._x * scale * this._radio) + "px";
            //egret.log( "x: " + px );
            //this._iframe.style.left = px;
            this._iframeWrapper.style.left = px;
        }
        else {
            let scale: number = this._windowW / this._stageW;
            let px: string = Math.floor(this._x * scale * this._radio) + "px";
            //egret.log( "x: " + px );
            //this._iframe.style.left = px;
            this._iframeWrapper.style.left = px;
        }
    }

    public get y(): number {
        return this._y;
    }

    public set y(value: number) {
        this._y = value;

        if (this._scaleMode == egret.StageScaleMode.SHOW_ALL) {
            let scale: number = this._displayH / this._stageH;
            let px: string = Math.floor(this._y * scale * this._radio) + "px";
            //egret.log( "y: " + px );
            //this._iframe.style.top = px;
            this._iframeWrapper.style.top = px;
        }
        else {
            let scale: number = this._windowH / this._stageH;
            let px: string = Math.floor(this._y * scale * this._radio) + "px";
            //egret.log( "y: " + px );
            //this._iframe.style.top = px;
            this._iframeWrapper.style.top = px;
        }
    }

    public get src() {
        return this._src;
    }

    public set src(value: string) {
        if (this._src != value) {
            this._src = value;
            this._iframe.src = value;
        }
    }

}
