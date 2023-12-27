declare function unescape(s: string): string;
declare function escape(s: string): string;
declare function atob(s: string): string;
declare function btoa(s: string): string;

interface String {
    format(...replacements: string[]): string;
}

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

interface Array<T> {
    findAllIndex(val: number[]): number[];
}

if (!Array.prototype.findAllIndex) {
    Array.prototype.findAllIndex = function (val: number[]) {
        var args = this;
        var indexes = [], i;
        for (i = 0; i < args.length; i++) {
            if (val.indexOf(args[i]) > -1)
                indexes.push(i);
        }
        return indexes;
    };
}

/** 亂數取值 */
function randomInt(min: number, max: number, includeMax: boolean = true) {
    return Math.floor(Math.random() * (max - min + (includeMax ? 1 : 0))) + min;
}

function leftPad(num: any, size: number): string {
    let s = num.toString();
    while (s.length < size)
        s = "0" + s;
    return s;
}

/** Number/100 小數點2位 */
function toCoin(num: number): number {
    return Number(toCoinToString(num));
}

/** Number/100 小數點2位 */
function toCoinToString(num: number): string {
    return (num / 100).toFixed(2);
}

/** Number/100 小數點0位 */
function toCoinToString_0(num: number): string {
    return (num / 100).toFixed(0);
}

/** Number/100 小數點2位 */
function toCoinToStringComma(num: number): string {
    num = num / 100;
    if (num >= 1000) {
        let thousand = num.toString().substring(0, num.toString().length - 3);
        let hundred = num.toString().substring(num.toString().length - 3, num.toString().length);
        return thousand + "," + hundred + ".00";
    }
    return num.toFixed(2);
}

function toCoinToString_CurrencyBet(num: number): string {
    if ((SelfData.Instance.PlaySetting.CurrencyScale % 100) > 0)
        return (num / 100).toFixed(2);
    else
        return (num / 100).toString();
}

function toInt(val: string, def: number = 0): number {
    let num = parseInt(val);
    if (isNaN(num)) {
        return def;
    } else {
        return num;
    }
}

function toFloat(val: string, def: number = 0.0): number {
    let num = parseFloat(val);
    if (isNaN(num)) {
        return def;
    } else {
        return num;
    }
}

function defaultNumber(val: number, def: number): number {
    if (isNaN(val)) {
        return def;
    } else {
        return val;
    }
}

function defaultString(val: string, def: string): string {
    if (!val) {
        return def;
    }
    else {
        return val;
    }
}

/** 數字轉字串, 自動補零 */
function preZeroFill(num, size) {
    if (num >= Math.pow(10, size)) { //如果num本身位数不小于size位
        return num.toString();
    } else {
        var _str = Array(size + 1).join('0') + num;
        return _str.slice(_str.length - size);
    }
}

/** 洗牌 */
function shuffleArray(array) // this function would modify the original array
{
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/** 等待秒數 */
async function waitForSeconds(seconds = 0) {
    return new Promise(r => setTimeout(r, seconds * 1000));
}

async function waitForSeconds2(time: number, func: () => boolean = null) {
    let timeTemp = time;
    let check = func != null ? func() : true;
    while (check && timeTemp > 0) {
        let lastTime: number = new Date().getTime();
        await waitForSeconds(0.01);
        let curTime: number = new Date().getTime();
        let deltaTime: number = curTime - lastTime;
        timeTemp -= (deltaTime / 1000);
        check = func != null ? func() : true;
    }
}

/** 等待function finish */
async function waitForFlage(Flage: Function) {
    while (!Flage()) {
        await waitForSeconds(0.01);
    }
}

/** clone class */
function cloneClass<T>(instance: T): T {
    return JSON.parse(JSON.stringify(instance));
}

/** getUrlLanguage */

function getFairyUIURL(package: string, name: string, lang: boolean = true) {
    if (lang) {
        return "ui://" + package + "_" + LanguageType[SelfData.Instance.Language] + "/" + name + LanguageType[SelfData.Instance.Language];
    }
    else {
        return "ui://" + package + "/" + name;
    }
}

function isGameModeEnum(mode: any): mode is GameMode {
    return Object.keys(GameMode).some(key => GameMode[key] === mode);
}

function getUrlLanguage(language: LanguageType): string {
    switch (language) {
        case LanguageType.CH:
            return "cn";
        case LanguageType.TW:
            return "cn";
        case LanguageType.EN:
            return "en";
        case LanguageType.KR:
            return "kr";
        case LanguageType.TH:
            return "th";
        case LanguageType.IN:
            return "in";
        case LanguageType.PH:
            return "ph";
        case LanguageType.VT:
            return "vt";
        case LanguageType.JP:
            return "jp";
        case LanguageType.ES:
            return "es";
        case LanguageType.PT:
            return "pt";
    }
    return "cn";
}

function getUrlLanguageByString(language: string): LanguageType {
    switch (language) {
        case "cn":
            return LanguageType.CH;
        case "tw":
            return LanguageType.CH;
        case "en":
            return LanguageType.EN;
        case "kr":
            return LanguageType.KR;
        case "in":
            return LanguageType.IN;
        case "th":
            return LanguageType.TH;
        case "ph":
            return LanguageType.PH;
        case "vt":
            return LanguageType.VT;
        case "jp":
            return LanguageType.JP;
        case "es":
            return LanguageType.ES;
        case "pt":
            return LanguageType.PT;
    }
    return LanguageType.CH;
}

function LanguageNoChange(type: string) {
    if (type != LanguageType[LanguageType.CH] && type != LanguageType[LanguageType.TW]) {
        return LanguageType[LanguageType.EN];
    }
    return type;
}

/** 取得新guid */
function newGuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function newToken(): string {
    return 'xxxxyxxxxyxxxyxxxxxxxxxxyxxxy'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * 从0000年00月00日00:00:00-1970年01月01日00:00:00的刻度值
 * 1970 × 365 × 24 × 60 × 60 × 1000 × 10000 大概等于 621355968000000000
 * return seconds
 */
function ticks_to_time(ticks: number): number {
    return Math.floor((ticks - 621355968000000000) / 10000000);
}

/**
 * 从0000年00月00日00:00:00-1970年01月01日00:00:00的刻度值
 * 1970 × 365 × 24 × 60 × 60 × 1000 × 10000 大概等于 621355968000000000
 * return milliseconds
 */
function ticks_to_milliseconds(ticks: number): number {
    return Math.floor((ticks - 621355968000000000) / 10000);
}

/**
 * 从0000年00月00日00:00:00-1970年01月01日00:00:00的刻度值
 * 1970 × 365 × 24 × 60 × 60 × 1000 × 10000 大概等于 621355968000000000
 * return ticks
 */
function time_to_ticks(seconds: number): number {
    return seconds * 10000000 + 621355968000000000;
}

/**
 * 从0000年00月00日00:00:00-1970年01月01日00:00:00的刻度值
 * 1970 × 365 × 24 × 60 × 60 × 1000 × 10000 大概等于 621355968000000000
 * return ticks
 */
function milliseconds_to_ticks(milliseconds: number): number {
    return milliseconds * 10000 + 621355968000000000;
}

function outputdollars(number) {
    let IsNegative: boolean = false;
    if (number < 0) {
        IsNegative = true;
        number *= -1.00;
    }

    var arr = String(number).split('.');
    var num = arr[0], result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num.length > 0) result = num + result;
    if (IsNegative) result = "-" + result;
    return arr[1] ? result + '.' + arr[1] : result
}

function consoleLog(val: string) {
    if (SelfData.Instance.UrlParam_Debug) {
        let es = document.getElementsByClassName("egret-player");
        if (es.length > 0 && es[0].getAttribute("data-show-log") == "true")
            egret.log(val);
        else
            console.log(val);
    }
}

/**本地存儲獲取項目*/
function localStorageGetItem(key: string): string {
    if (SelfData.Instance.UseLocalStorage) {
        try {
            let value = egret.localStorage.getItem(key);    //本地读取数据
            return value;
        }
        catch (e) {
            return "";
        }
    }
}

/**本地存儲集項目*/
function localStorageSetItem(key: string, value: string) {
    if (SelfData.Instance.UseLocalStorage) {
        try {
            egret.localStorage.setItem(key, value);             //本地存儲保存数据
        }
        catch (e) {
            return;
        }
    }
}

function openHistory() {
    openInNewTab(SelfData.Instance.HistoryUrl + "?lang=" + getUrlLanguage(SelfData.Instance.Language) + "&showType=2");
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

/**
 * [ Detect iOS Version ]
 * supports iOS 2.0 or latter
 * call iOSVersion() function will get:
 * status: boolean;  -- get iOS version: true, none: false
 * version: int; -- ex 11
 * info: string; -- ex IOS 11.2.6 
 */
function iOSVersion() {
    let d, v;
    if (/iP(hone|od|ad)/.test(navigator.platform)) {
        v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
        d = {
            status: true,
            version: parseInt(v[1], 10),
            info: parseInt(v[1], 10) + '.' + parseInt(v[2], 10) + '.' + parseInt(v[3] || 0, 10)
        };
    } else {
        d = { status: false, version: false, info: '' }
    }
    return d;
}

/**fairygui調整大小*/
function fairyguiResize() {
    consoleLog(" window.innerWidth : " + window.innerWidth);
    consoleLog(" window.innerHeight : " + window.innerHeight);
    //console.log(`width:${window.innerWidth}|height:${window.innerHeight}`);
    let scaleW: number = window.innerWidth / SelfData.Instance.UIWindowsSize.x;
    let scaleH: number = window.innerHeight / SelfData.Instance.UIWindowsSize.y;
    if (!SelfData.Instance.WindowSwitch) {
        if (scaleW > scaleH) {
            if (!egret.Capabilities.isMobile) {
                egret.MainContext.instance.stage.orientation = egret.OrientationMode.AUTO;//egret.OrientationMode.LANDSCAPE;
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                SelfData.Instance.IsPortrait = false;
                fairygui.GRoot.inst.displayObject.y = 0;
            }
            if (window.innerHeight >= SelfData.Instance.MaxWindowsSize.y) {
                let scale: number = SelfData.Instance.MaxWindowsSize.y / window.innerHeight;
                fairygui.GRoot.inst.setPivot(0.5, 0);
                fairygui.GRoot.inst.setScale(scale, scale);
            }
            else {
                fairygui.GRoot.inst.setPivot(0.5, 0.5);
                fairygui.GRoot.inst.setScale(1, 1);
            }
        }
        else {
            if (!egret.Capabilities.isMobile) {
                egret.MainContext.instance.stage.orientation = egret.OrientationMode.AUTO;
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
                SelfData.Instance.IsPortrait = true;
                fairygui.GRoot.inst.displayObject.y = 0;
            }
            if (window.innerWidth >= SelfData.Instance.MaxWindowsSize.x) {
                let scale: number = SelfData.Instance.MaxWindowsSize.x / window.innerWidth;
                fairygui.GRoot.inst.setPivot(0.5, 0);
                fairygui.GRoot.inst.setScale(scale, scale);
            }
            else {
                fairygui.GRoot.inst.setPivot(0.5, 0.5);
                fairygui.GRoot.inst.setScale(1, 1);
            }
        }
    }
    else {
        if (scaleW > scaleH) {
            if (!egret.Capabilities.isMobile) {
                egret.MainContext.instance.stage.orientation = egret.OrientationMode.LANDSCAPE;
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                SelfData.Instance.IsPortrait = false;
                fairygui.GRoot.inst.displayObject.y = 0;
            }

            fairygui.GRoot.inst.setPivot(0.5, 0.5);
            fairygui.GRoot.inst.setScale(1, 1);

        }
        else {
            if (!egret.Capabilities.isMobile) {
                egret.MainContext.instance.stage.orientation = egret.OrientationMode.LANDSCAPE;
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                SelfData.Instance.IsPortrait = true;
                fairygui.GRoot.inst.displayObject.y = 0;
            }

            fairygui.GRoot.inst.setPivot(0.5, 0.5);
            fairygui.GRoot.inst.setScale(1, 1);
        }
    }
    let event: StageResizeEvent = new StageResizeEvent();
    event.IsPortrait = SelfData.Instance.IsPortrait;
    EventManager.Instance.Send(event);
}

/**fairygui調整大小*/
function fairyguiResize_Aviator() {
    let scaleW: number = window.innerWidth / SelfData.Instance.UIWindowsSize.x;
    let scaleH: number = window.innerHeight / SelfData.Instance.UIWindowsSize.y;
    if (!SelfData.Instance.WindowSwitch) {
        if (scaleW > scaleH) {
            if (!egret.Capabilities.isMobile) {
                egret.MainContext.instance.stage.orientation = egret.OrientationMode.AUTO;//egret.OrientationMode.LANDSCAPE;
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                SelfData.Instance.IsPortrait = false;
                fairygui.GRoot.inst.displayObject.y = 0;
            }
            if (window.innerHeight >= SelfData.Instance.MaxWindowsSize.y) {
                let scale: number = SelfData.Instance.MaxWindowsSize.y / window.innerHeight;
                fairygui.GRoot.inst.setPivot(0.5, 0);
                fairygui.GRoot.inst.setScale(scale, scale);
            }
            else {
                fairygui.GRoot.inst.setPivot(0.5, 0.5);
                fairygui.GRoot.inst.setScale(1, 1);
            }
        }
        else {
            if (!egret.Capabilities.isMobile) {
                egret.MainContext.instance.stage.orientation = egret.OrientationMode.AUTO;
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
                SelfData.Instance.IsPortrait = true;
                fairygui.GRoot.inst.displayObject.y = 0;
            }
            if (window.innerWidth >= window.innerHeight) {
                let scale: number = SelfData.Instance.MaxWindowsSize.x / window.innerWidth;
                fairygui.GRoot.inst.setPivot(0.5, 0);
                fairygui.GRoot.inst.setScale(scale, scale);
            }
            else {
                fairygui.GRoot.inst.setPivot(0.5, 0.5);
                fairygui.GRoot.inst.setScale(1, 1);
            }
        }
    }
    else {
        if (scaleW > scaleH) {
            if (!egret.Capabilities.isMobile) {
                egret.MainContext.instance.stage.orientation = egret.OrientationMode.AUTO;
                egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                SelfData.Instance.IsPortrait = false;
                fairygui.GRoot.inst.displayObject.y = 0;
            }
            if (window.innerHeight >= SelfData.Instance.MaxWindowsSize.y) {
                let scale: number = SelfData.Instance.MaxWindowsSize.y / window.innerHeight;
                fairygui.GRoot.inst.setPivot(0.5, 0);
                fairygui.GRoot.inst.setScale(scale, scale);
            }
            else {
                fairygui.GRoot.inst.setPivot(0.5, 0.5);
                fairygui.GRoot.inst.setScale(1, 1);
            }

            //fairygui.GRoot.inst.setPivot(0.5, 0.5);
            //fairygui.GRoot.inst.setScale(1, 1);

        }
        else {
            if (!egret.Capabilities.isMobile) {
                //egret.MainContext.instance.stage.orientation = egret.OrientationMode.LANDSCAPE;
                //egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                if (window.innerWidth >= window.innerHeight) {
                    egret.MainContext.instance.stage.orientation = egret.OrientationMode.AUTO;
                    egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
                }
                else {
                    egret.MainContext.instance.stage.orientation = egret.OrientationMode.LANDSCAPE;
                    egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
                }
                SelfData.Instance.IsPortrait = true;
                fairygui.GRoot.inst.displayObject.y = 0;
            }
            if (window.innerWidth >= SelfData.Instance.MaxWindowsSize.x) {
                let scale: number = SelfData.Instance.MaxWindowsSize.x / window.innerWidth;
                fairygui.GRoot.inst.setPivot(0.5, 0);
                fairygui.GRoot.inst.setScale(scale, scale);
            }
            else {
                fairygui.GRoot.inst.setPivot(0.5, 0.5);
                fairygui.GRoot.inst.setScale(1, 1);
            }

            //fairygui.GRoot.inst.setPivot(0.5, 0.5);
            //fairygui.GRoot.inst.setScale(1, 1);
        }
    }
    let event: StageResizeEvent = new StageResizeEvent();
    event.IsPortrait = SelfData.Instance.IsPortrait;
    EventManager.Instance.Send(event);
}

async function preloadSoundItem() {
    await waitForSeconds(0.5);
    let resources: Array<SoundResource> = SoundResources.SoundDic._values;
    for (let i = 0, imax = resources.length; i < imax; ++i) {
        let info = resources[i];
        SoundManger.Instance.createSoundInfo(info);
    }
}

/**
 * Number遞增動效 
 * @param numText fairygui.GTextField
 * @param startNum 開始Number
 * @param targetNum 結束Number
 * @param time 表演時間, 秒數
 * @param fixed 小數點後幾位, default = 2
*/
async function NumberIncrementAni(numText: fairygui.GTextField, startNum: number, targetNum: number, time: number, fixed: number = 2, skipFunc: Function = null, skipFuncThis: any = null, dynamicFontSize: boolean = false, textFontSize: number = 32, textWidth: number = 100) {
    let timeTemp: number = 0;
    let nowNum: number = startNum;
    let lastTime: number = new Date().getTime();
    let isSkip: boolean = skipFunc != null && skipFuncThis != null ? skipFunc.apply(skipFuncThis) : false;
    while (!isSkip && timeTemp < time * 1000) {
        let curTime: number = new Date().getTime();
        let deltaTime: number = curTime - lastTime;
        timeTemp += deltaTime;
        nowNum = startNum + ((targetNum - startNum) * (timeTemp / (time * 1000)));
        numText.text = nowNum.toFixed(fixed);
        if (dynamicFontSize) updateFontSize(numText, textFontSize, textWidth);
        await waitForSeconds(0.01);
        lastTime = curTime;
        isSkip = skipFunc != null && skipFuncThis != null ? skipFunc.apply(skipFuncThis) : false;
    }
    numText.text = targetNum.toFixed(fixed);
    if (dynamicFontSize) updateFontSize(numText, textFontSize, textWidth);
}

/**
 * Number遞減動效 
 * @param numText fairygui.GTextField
 * @param startNum 開始Number
 * @param targetNum 結束Number
 * @param time 表演時間, 秒數
 * @param fixed 小數點後幾位, default = 2
*/
async function NumberDecrementAni(numText: fairygui.GTextField, startNum: number, targetNum: number, time: number, fixed: number = 2, skipFunc: Function = null, skipFuncThis: any = null, dynamicFontSize: boolean = false, textFontSize: number = 32, textWidth: number = 100) {
    let timeTemp: number = 0;
    let nowNum: number = startNum;
    let lastTime: number = new Date().getTime();
    let isSkip: boolean = skipFunc != null && skipFuncThis != null ? skipFunc.apply(skipFuncThis) : false;
    while (!isSkip && timeTemp < time * 1000) {
        let curTime: number = new Date().getTime();
        let deltaTime: number = curTime - lastTime;
        timeTemp += deltaTime;
        nowNum = startNum - ((startNum - targetNum) * (timeTemp / (time * 1000)));
        numText.text = nowNum.toFixed(fixed);
        if (dynamicFontSize) updateFontSize(numText, textFontSize, textWidth);
        await waitForSeconds(0.01);
        lastTime = curTime;
        isSkip = skipFunc != null && skipFuncThis != null ? skipFunc.apply(skipFuncThis) : false;
    }
    numText.text = targetNum.toFixed(fixed);
    if (dynamicFontSize) updateFontSize(numText, textFontSize, textWidth);
}

/** 線性貝茲曲線的程式碼 */
function PointOnLinearBezier(point: number[][], t: number): number[] {
    let result: number[] = [];
    /*計算多項式係數*/

    /*計算位於參數值t的曲線點*/

    result.push((1 - t) * point[0][0] + t * point[1][0]);
    result.push((1 - t) * point[0][1] + t * point[1][1]);

    return result;
}

/** 二次方貝茲曲線的程式碼 */
function PointOnQuadraticBezier(point: number[][], t: number): number[] {
    let tSquared: number;
    let result: number[] = [];

    /*計算位於參數值t的曲線點*/
    tSquared = t * t;

    result.push(((1 - t) * (1 - t)) * point[0][0] + 2 * t * (1 - t) * point[1][0] + tSquared * point[2][0]);
    result.push(((1 - t) * (1 - t)) * point[0][1] + 2 * t * (1 - t) * point[1][1] + tSquared * point[2][1]);
    return result;
}

/** 三次方貝茲曲線的程式碼
point在此是四個元素的陣列:
point[0]為起始點，或上圖中的P0
point[1]為第一個控制點，或上圖中的P1
point[2]為第二個控制點，或上圖中的P2
point[3]為結束點，或上圖中的P3
t為參數值，0 <= t <= 1 */
function PointOnCubicBezier(point: number[][], t: number): number[] {
    let ax: number, bx: number, cx: number;
    let ay: number, by: number, cy: number;
    let tSquared: number, tCubed: number;
    let result: number[] = [];

    /*計算多項式係數*/

    cx = 3.0 * (point[1][0] - point[0][0]);
    bx = 3.0 * (point[2][0] - point[1][0]) - cx;
    ax = point[3][0] - point[0][0] - cx - bx;

    cy = 3.0 * (point[1][1] - point[0][1]);
    by = 3.0 * (point[2][1] - point[1][1]) - cy;
    ay = point[3][1] - point[0][1] - cy - by;

    /*計算位於參數值t的曲線點*/

    tSquared = t * t;
    tCubed = tSquared * t;

    result.push((ax * tCubed) + (bx * tSquared) + (cx * t) + point[0][0]);
    result.push((ay * tCubed) + (by * tSquared) + (cy * t) + point[0][1]);

    return result;
}

/** 千分位逗號 */
function toThousands(num) {
    let numArr = (num || 0).toString().split('.');
    let num2 = numArr[0], result = '';
    while (num2.length > 3) {
        result = ',' + num2.slice(-3) + result;
        num2 = num2.slice(0, num2.length - 3);
    }
    if (num2) { result = num2 + result; }
    if (numArr.length > 1) { result = result + '.' + numArr[1]; }
    return result;
}

/** SHA256加密法 */
function SHA256(s) {
    var chrsz = 8;
    var hexcase = 0;
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    function S(X, n) { return (X >>> n) | (X << (32 - n)); }
    function R(X, n) { return (X >>> n); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
    function core_sha256(m, l) {
        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j = 0;
        var T1, T2;
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
        for (i = 0; i < m.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];
            for (j = 0; j < 64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }
            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    function binb2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
                hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }
    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}
/**
 *
 *      一般工具包
 *
 */


function PlayFairytguiTrans(parent: fairygui.GObject, transName: string): fairygui.Transition {
    if (parent.asCom.getTransition(transName)) {
        parent.asCom.getTransition(transName).play();
        return parent.asCom.getTransition(transName);
    }
    else
        return null;
}

function copyArray(source: any[], begin: number, end: number): any[] {
    return source
        .filter((value, index) => begin <= index && index < end)
        .reduce((acc, cur) => {
            acc.push(cur);
            return acc;
        }, []);
}

function arrayTo2DArray(source: number[], howMany: number): number[][] {
    const result = [];

    const group = source.length / howMany;

    for (let i = 0; i < group; i++) {
        const from = howMany * i;
        const to = from + howMany;
        result.push(source.slice(from, to));
    }

    return result;
}


function arrayTo2DArray_Unusual(source: number[], howMany: number[]): number[][] {
    const result = [];

    let index = 0;

    for (let i = 0; i < howMany.length; i++) {
        const to = index + howMany[i];
        result.push(source.slice(index, to));                                                       //slice 选取数组的的一部分，并返回一个新数组。
        index += howMany[i];
    }

    return result;
}

/**轉換到字典*/
function JsonToDictionary(json: Object) {
    let dict = new Dictionary([]);
    for (let k in json) {
        let v = json[k];
        dict.add(k, v);
    }
    return dict
}

function GoToOtherGame(nowGameType, targetGameType) {
    var oldGameUrl: string = eval('window.location.href.toString()');
    var enterUrl: string = "window.location.href='" + oldGameUrl.replace(nowGameType, targetGameType) + "'";
    let check_original = enterUrl.replace("&originalgmae=" + SelfData.Instance.UrlParam_OriginalGameID, "");
    let check_replayid = check_original.replace("&replayid=" + SelfData.Instance.UrlParam_RePlayID, "");
    let check_usebuy = check_replayid.replace("&usebuyfreegane=" + SelfData.Instance.UrlParam_UseBuyFreeGame, "");
    //let enterUrl = check_usebuy.replace(nowGameType, targetGameType);
    eval(check_usebuy);
}

function GoToRePlayGame(nowGameType, targetGameType, rePlayID) {
    var oldGameUrl: string = eval('window.location.href.toString()');
    var enterUrl: string = "window.location.href='" + oldGameUrl.replace(nowGameType, targetGameType);
    let check_original = enterUrl.replace("&originalgmae=" + SelfData.Instance.UrlParam_OriginalGameID, "");
    let check_replayid = check_original.replace("&replayid=" + SelfData.Instance.UrlParam_RePlayID, "");
    let check_usebuy = check_replayid.replace("&usebuyfreegane=" + SelfData.Instance.UrlParam_UseBuyFreeGame, "");
    var ChangeGameUrl: string = check_usebuy + "&originalgmae=" + nowGameType + "&replayid=" + rePlayID.toString() + "'";
    eval(ChangeGameUrl);
}

function GoToBuyFreeGame(nowGameType) {
    var oldGameUrl: string = eval('window.location.href.toString()');
    var enterUrl: string = "window.location.href='" + oldGameUrl.replace(nowGameType, nowGameType);
    let check_original = enterUrl.replace("&originalgmae=" + SelfData.Instance.UrlParam_OriginalGameID, "");
    let check_replayid = check_original.replace("&replayid=" + SelfData.Instance.UrlParam_RePlayID, "");
    let check_usebuy = check_replayid.replace("&usebuyfreegane=" + SelfData.Instance.UrlParam_UseBuyFreeGame, "");
    var ChangeGameUrl: string = check_usebuy + "&usebuyfreegane=" + "true" + "'";
    eval(ChangeGameUrl);
}

function ResetRePlay() {
    location.reload();
}

function CloseRePlay() {
    window.opener = window;
    var win = window.open("", "_blank");
    win.close();
    top.close();
}

/**
 * TextField : 需要調整的TextField
 * TextFontSize : 字體原本大小
 * TextWidth : 字體原本寬度
 */
function updateFontSize(TextField: fairygui.GTextField, TextFontSize: number, TextWidth: number) {
    if (TextField == null)
        return;
    TextField.fontSize = TextFontSize;
    let preautoSize = TextField.autoSize;
    TextField.autoSize = fairygui.AutoSizeType.Both;
    while (TextField.textWidth > TextWidth) {
        TextField.fontSize--;
    }
    TextField.autoSize = preautoSize;
}

function updateFontSize_onlySize(TextField: fairygui.GTextField, TextFontSize: number, TextWidth: number) {
    if (TextField == null)
        return;
    let updatefont = new fairygui.GTextField();
    updatefont.text = TextField.text;
    updatefont.fontSize = TextFontSize;
    let preautoSize = updatefont.autoSize;
    updatefont.autoSize = fairygui.AutoSizeType.Both;
    //updatefont.align = fairygui.AlignType.Left;
    while (updatefont.textWidth > TextWidth) {
        updatefont.fontSize--;
    }
    TextField.fontSize = updatefont.fontSize;
    updatefont.dispose();
    updatefont = null;
}

function updateFontSize_MessageText(TextFieldNormal: fairygui.GTextField, NormalTextFontSize: number, NormalTextWidth: number,
    TweenText: fairygui.GTextField, TweenSize: number, TweenWidth: number, TweenParent: fairygui.GComponent, LimitSize: number) {
    let change = false;
    TextFieldNormal.visible = true;
    TweenText.visible = false;
    let updatefont = new fairygui.GTextField();
    updatefont.text = TextFieldNormal.text;
    updatefont.fontSize = NormalTextFontSize;
    let preautoSize = updatefont.autoSize;
    updatefont.autoSize = fairygui.AutoSizeType.Both;
    while (updatefont.textWidth > NormalTextWidth) {
        updatefont.fontSize--;
        if (updatefont.fontSize <= LimitSize) {
            change = true;
        }
    }
    TextFieldNormal.fontSize = updatefont.fontSize;
    updatefont.dispose();
    updatefont = null;

    if (change) {
        TextFieldNormal.visible = false;
        TweenText.visible = true;
        let updatefont2 = new fairygui.GTextField();
        updatefont2.text = TweenText.text
        updatefont2.fontSize = TweenSize;
        let preautoSize = updatefont2.autoSize;
        updatefont2.autoSize = fairygui.AutoSizeType.Both;
        while (updatefont2.textWidth > TweenWidth) {
            updatefont2.fontSize--;
        }
        TweenText.fontSize = updatefont2.fontSize;
        updatefont2.dispose();
        updatefont2 = null;
        TweenParent.getTransition("t0").play();
    }
}

function makeIterator(array) {
    var nextIndex = 0;

    return {
        next: function () {
            return nextIndex < array.length ?
                { value: array[nextIndex++], done: false } :
                { done: true };
        },
        isDown: function () {
            return nextIndex < array.length ?
                { done: false } :
                { done: true };
        }
    };
}

function closeWindow() {
    window.open("about:blank", "_self").close();
}

function IsWebPSupport(): boolean {
    var d = document;

    var supportWebP;
    try {
        var ele = d.createElement('object');
        ele.type = 'image/webp';
        ele.innerHTML = '!';
        d.body.appendChild(ele);
        supportWebP = !ele.offsetWidth;
        d.body.removeChild(ele);
    } catch (err) {
        supportWebP = false;
    }
    return supportWebP;
}

function SavePng(name: string) {
    if (!SelfData.Instance.UrlParam_SavePng)
        return;
    var renderTexture: egret.RenderTexture = new egret.RenderTexture();
    renderTexture.drawToTexture(fairygui.GRoot.inst.displayObject);

    let adjustY = renderTexture.textureHeight - 630;
    renderTexture.saveToFile("image/png", LanguageType[SelfData.Instance.Language] + "_" + name + ".png", new egret.Rectangle(0, adjustY, 1120, 630));
}

/**數組刪除重複*/
function ArrayRemoveDuplicate(source: any[]) {
    let a = copyArray(source, 0, source.length);
    return a.filter(onlyUnique);
}

/**唯一的*/
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function CheckAndroidFireFox() {
    let use = false;
    let deviceAgent = navigator.userAgent;
    let ios = deviceAgent.toLowerCase().match(/(iphone|ipod|ipad)/);
    if (egret.Capabilities.isMobile && !ios && (navigator.userAgent.indexOf("Firefox") !== -1)) {
        use = true;
    }
    return use;
}


function StringEncode(str, key) {
    const base64Encoded = btoa(unescape(encodeURIComponent(str)));
    let result = '';
    for (let i = 0; i < base64Encoded.length; i++) {
        const char = base64Encoded.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        const encryptedChar = char ^ keyChar;
        result += String.fromCharCode(encryptedChar);
    }
    return result;
};


function StringDecode(str, key) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        const keyChar = key.charCodeAt(i % key.length);
        const decryptedChar = char ^ keyChar;
        result += String.fromCharCode(decryptedChar);
    }
    let a = atob(result);
    let e = escape(a);
    const base64Decoded = decodeURIComponent(e);
    return base64Decoded;
};

