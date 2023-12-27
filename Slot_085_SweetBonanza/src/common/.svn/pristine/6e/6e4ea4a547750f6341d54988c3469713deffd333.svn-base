/**Fairy按鈕*/
class FairyExButton {
    public static ButtonSoundName: string = "TF_button";

    private _button: fairygui.GButton;
    public get Button(): fairygui.GButton { return this._button; }
    public get asCom(): fairygui.GComponent { return this._button.asCom; }

    public get visible(): boolean { return this._button.visible; }
    public set visible(val: boolean) {
        this._button.visible = val;
        if (!val) this.onMouseOut();
    }

    public get enabled(): boolean { return this._button.enabled; }
    public set enabled(val: boolean) {
        this._button.enabled = val;
        if (!val) {
            if (!this.normalenabled)
                this._button.alpha = 0.45;
            this.onMouseOut();
        }
        else { this._button.alpha = 1; }
    }

    public get touchable(): boolean { return this._button.touchable; }
    public set touchable(val: boolean) { this._button.touchable = val; }

    public get selected(): boolean { return this._button.selected; }
    public set selected(val: boolean) { this._button.selected = val; }

    public get title(): string { return this._button.title; }
    public set title(val: string) { this._button.title = val; }

    public get TouchTime(): number { return this.touchTime; }

    public get NormalEnabled(): boolean { return this.normalenabled; }
    public set NormalEnabled(val: boolean) { this.normalenabled = val; }

    public get IsDark(): boolean { return this._isDark; }
    public set IsDark(val: boolean) {
        this._isDark = val;
        if (this._isDark)
            this.asCom.filters = this.filterDark;
        else
            this.asCom.filters = this.filterNull;
    }

    private ButtonOverObj: fairygui.GObject;

    private clickFunc: Array<Function> = [];
    private clickThis: Array<any> = [];

    private longFunc: Function;
    private longThis: any;
    private longTime: number = 0;
    private endCallback: boolean = false;

    private touch: boolean = false;
    private touchOut: boolean = false;

    private touchTime: number = 0;

    private normalenabled: boolean = true;

    private isRepeatButton: boolean = false;
    private repeatBeginFunc: Function;
    private repeatFunc: Function;
    private repeatEndFunc: Function;
    private repeatThis: any;
    private repeatTime: number = 0.2;
    private repeatNowTime: number = 0.2;
    private repeatSpeedUp: boolean = true;

    private _isDark: boolean = false;
    private mat: Array<any> = [0.6, 0, 0, 0, 0, 0, 0.6, 0, 0, 0, 0, 0, 0.6, 0, 0, 0, 0, 0, 1, 0];
    private colorMat: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(this.mat);
    private filterDark: Array<any> = [this.colorMat];
    private filterNull: Array<any> = [];

    
    /**當觸碰事件觸發時*/
    public constructor(button: fairygui.GButton) {
        this._button = button;
        this._button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this._button.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this._button.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchOut, this);
        this._button.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOut, this);

        if (!egret.Capabilities.isMobile) {                                                             //表示程序内容是否运行在移动设备中（例如移动电话或平板电脑）。
            this.ButtonOverObj = button.asCom.getChild("over");
            if (this.ButtonOverObj != null || this._button.mode == fairygui.ButtonMode.Radio) {
                mouse.setButtonMode(this._button.displayObject, true);                                  //设置一个对象的buttonMode属性，设置为true后，当鼠标滑过该对象会变手型。
                this._button.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
                this._button.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
                this.onMouseOut();                                
            }
        }
    }
    /**解除觸碰事件*/
    public removeEventListener() {
        this._button.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this._button.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this._button.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchOut, this);
        this._button.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchOut, this);

        if (this.ButtonOverObj != null) {
            this._button.removeEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
            this._button.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
        }
    }

    /**加入按件事件方法*/
    public addClickListener(listener: Function, thisObj: any) {
        this.clickFunc.push(listener);
        this.clickThis.push(thisObj);
    }

    /**消除按件方法*/
    public removeClickListener() {
        this.clickFunc.length = 0;
        this.clickThis.length = 0;
    }

    /**
     * 長按監聽
     * @param listener 回調函數
     * @param thisObj 回調函數 this
     * @param time 長按觸發時間 default = 0.5
     * @param endCallback 點擊結束時觸發 default = true, if true itmeout not callback
     */
    public addLongClickListener(listener: Function, thisObj: any, time: number = 0.5, endCallback: boolean = true) {
        this.longFunc = listener;
        this.longThis = thisObj;
        this.longTime = time;
        this.endCallback = endCallback;
    }

    /**
     * 連發監聽
     * @param beginListener 起始回調函數, 點擊即觸發1次
     * @param repeatListener 連發回調函數, 長按連發觸發, 回傳目前連發數
     * @param endListener 結束回調函數, 放開時觸發
     * @param thisObj 回調函數 this
     * @param time 連發觸發時間 default = 0.2
     * @param speedUp 是否加速觸發 default = true, 觸發3次後連發觸發時間減半, 觸發6次後連發觸發時間再減半, 觸發15次後連發觸發時間再減半
     */
    public addRepeatClickListener(beginListener: Function, repeatListener: Function, endListener: Function, thisObj: any, time: number = 0.2, speedUp: boolean = true) {
        this.isRepeatButton = true;
        this.repeatBeginFunc = beginListener;
        this.repeatFunc = repeatListener;
        this.repeatEndFunc = endListener;
        this.repeatThis = thisObj;
        this.repeatTime = time;
        this.repeatNowTime = time;
        this.repeatSpeedUp = speedUp;
    }

    /**按鈕被按鍵時*/ 
    private onTouchBegin() {
        if (this.touch)
            return;

        this.touch = true;
        this.touchOut = false;
        this.onMouseOut();
        if (this.isRepeatButton)
            this.onRepeatClick();
        else
            this.onLongClick();
    }

    /**重複點擊*/
    private async onRepeatClick() {
        this.touchTime = 0;
        this.repeatNowTime = this.repeatTime;
        let repeatTimes = 0;

        if (this.repeatThis != null && this.repeatBeginFunc != null) {
            SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
            this.repeatBeginFunc.apply(this.repeatThis);            //執行重複點擊方法
        }

        while (this.touch && !this.touchOut) {
            let lastTime: number = new Date().getTime();
            await waitForSeconds(0.01);
            let curTime: number = new Date().getTime();
            let deltaTime: number = curTime - lastTime;
            this.touchTime += (deltaTime / 1000);
            if (this.touchTime > this.repeatNowTime) {
                //console.log(this.touchTime);
                if (this.repeatThis != null && this.repeatFunc != null) {
                    repeatTimes++;
                    SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
                    this.repeatFunc.apply(this.repeatThis, [repeatTimes]);
                    if (this.repeatSpeedUp) {                        
                        if (repeatTimes == 3) {
                            this.repeatNowTime = this.repeatTime / 2;
                        }
                        else if (repeatTimes == 6) {
                            this.repeatNowTime = this.repeatTime / 4;
                        }
                        else if (repeatTimes == 15) {
                            this.repeatNowTime = this.repeatTime / 16;
                        }
                    }
                }
                this.touchTime = 0;
            }
        }

        if (this.repeatThis != null && this.repeatEndFunc != null) {
            SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
            this.repeatEndFunc.apply(this.repeatThis);
        }
    }

    /**按鈕被長按鍵時*/
    private async onLongClick() {
        this.touchTime = 0;
        while (this.touchTime < this.longTime) {
            let lastTime: number = new Date().getTime();
            await waitForSeconds(0.01);
            let curTime: number = new Date().getTime();
            let deltaTime: number = curTime - lastTime;
            this.touchTime += (deltaTime / 1000);
            if (!this.touch && !this.touchOut) {
                this.onClick();
                return;
            }
        }

        while (this.endCallback && this.touch) {
            let lastTime: number = new Date().getTime();
            await waitForSeconds(0.01);
            let curTime: number = new Date().getTime();
            let deltaTime: number = curTime - lastTime;
            this.touchTime += (deltaTime / 1000);
        }

        if (this.longThis != null && this.longFunc != null) {
            SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
            this.longFunc.apply(this.longThis);
        }
        //-----------------------當長案沒有CallBack時------------------//
        else {
            while (this.touch)
                await waitForSeconds(0.01);

            if (!this.touchOut)
                this.onClick();
        }
    }

     /**按鈕被按鍵時*/
    private onClick() {
        if (this.clickFunc.length > 0) {
            SoundManger.Instance.PlaySoundSE(FairyExButton.ButtonSoundName);
            for (let i = 0, max = this.clickFunc.length; i < max; ++i) {
                if (i < this.clickThis.length) {
                    this.clickFunc[i].apply(this.clickThis[i]);                         //完成事件
                }
            }
        }
    }

    /**当用户移除与启用触摸的设备的接触时*/
    private onTouchEnd() {
        this.touch = false;
        this.onMouseOver();
    }

    /**由于某个事件取消了触摸时触发*/
    private onTouchOut() {
        this.touch = false;
        this.touchOut = true;
    }

    /**当鼠标正在对象所在区域内（没有被其他对象覆盖）时调用*/
    private onMouseOver() {
        // if (this.ButtonOverObj == null)
        //     return;
        if (!this._button.enabled)
            return;
        if (!this._button.touchable)
            return;
        if (this.ButtonOverObj == null && this._button.mode == fairygui.ButtonMode.Radio) {
            let c = this._button.getController("button");
            c.selectedIndex = 2;
        }
        else if (this.ButtonOverObj != null)
            this.ButtonOverObj.visible = true;
    }

    /**当鼠标移出对象所在区域内时调用。*/
    private onMouseOut() {
        // if (this.ButtonOverObj == null)
        //     return;
        if (!this._button.enabled)
            return;
        if (!this._button.touchable)
            return;
        if (this._button.selected)
            return;
        if (this.ButtonOverObj == null && this._button.mode == fairygui.ButtonMode.Radio) {
            let c = this._button.getController("button");
            c.selectedIndex = 0;
        }
        else if (this.ButtonOverObj != null)
            this.ButtonOverObj.visible = false;
    }
}