var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var XianBuyBonusView = (function () {
    function XianBuyBonusView(pkgName, resName) {
        this.CostNotEnough = false;
        this.Cost = 0;
        this.FreeSpin_Buy_Money = null;
        this.ResName = "";
        this.View = fairygui.UIPackage.createObject(pkgName, resName);
        fairygui.GRoot.inst.addChild(this.View);
        this.ResName = resName;
        this.Init();
    }
    XianBuyBonusView.prototype.Init = function () {
        this.SetLoaderURL();
        this.OKButton = new FairyExButton(this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asButton);
        this.OKButton.addClickListener(this.OnOK, this);
        this.NOButton = new FairyExButton(this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asButton);
        this.NOButton.addClickListener(this.OnNO, this);
        this.FreeSpin_Buy_Money = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("money").asTextField;
        this.View.visible = false;
    };
    XianBuyBonusView.prototype.SetLoaderURL = function () {
        if (this.ResName == "freespin_buy") {
            var titlefg = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("titlefg").asLoader;
            titlefg.url = getFairyUIURL(SelfData.Instance.MainPackageName, "titlefg_");
            var buyinfo = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("buyinfo").asLoader;
            buyinfo.url = getFairyUIURL(SelfData.Instance.MainPackageName, "buyinfo_");
            if (this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel01") != null) {
                var Btn_cancel01 = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel01").asLoader;
                Btn_cancel01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel01_");
                var Btn_cancel02 = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel02").asLoader;
                Btn_cancel02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel02_");
                var Btn_cancel02_over = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("over").asLoader;
                Btn_cancel02_over.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel02_");
            }
            var Btn_startGreen01 = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("Btn_startGreen01").asLoader;
            Btn_startGreen01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
            var Btn_startGreen02 = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("Btn_startGreen02").asLoader;
            Btn_startGreen02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
            var Btn_startGreen02_over = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("over").asLoader;
            Btn_startGreen02_over.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
            if (this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add") != null) {
                var Btn_startGreen01_add = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("Btn_startGreen01").asLoader;
                Btn_startGreen01_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
                var Btn_startGreen02_add = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("Btn_startGreen02").asLoader;
                Btn_startGreen02_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
                var Btn_startGreen02_over_add = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("over").asLoader;
                Btn_startGreen02_over_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
            }
        }
        else if (this.ResName == "freespin_buyDaily") {
            var titlefg = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("titlefg").asLoader;
            titlefg.url = getFairyUIURL(SelfData.Instance.MainPackageName, "titlefg_");
            var buyinfo = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("buyinfo").asLoader;
            buyinfo.url = getFairyUIURL(SelfData.Instance.MainPackageName, "buyinfo_");
            var limited = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("limited").asLoader;
            limited.url = getFairyUIURL(SelfData.Instance.MainPackageName, "limited_");
            var dailybet = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("dailybet").asLoader;
            dailybet.url = getFairyUIURL(SelfData.Instance.MainPackageName, "dailybet_");
            var betText = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("bet").asTextField;
            betText.text = (0.27 * SelfData.Instance.AccountData.CurrencyData.Scale).toString();
            updateFontSize(betText, 22, 118);
            if (this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel01") != null) {
                var Btn_cancel01 = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel01").asLoader;
                Btn_cancel01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel01_");
                var Btn_cancel02 = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("Btn_cancel02").asLoader;
                Btn_cancel02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel02_");
                var Btn_cancel02_over = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonCancel").asCom.getChild("over").asLoader;
                Btn_cancel02_over.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_cancel02_");
            }
            var Btn_startGreen01 = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("Btn_startGreen01").asLoader;
            Btn_startGreen01.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
            var Btn_startGreen02 = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("Btn_startGreen02").asLoader;
            Btn_startGreen02.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
            var Btn_startGreen02_over = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen").asCom.getChild("over").asLoader;
            Btn_startGreen02_over.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
            if (this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add") != null) {
                var Btn_startGreen01_add = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("Btn_startGreen01").asLoader;
                Btn_startGreen01_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen01_");
                var Btn_startGreen02_add = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("Btn_startGreen02").asLoader;
                Btn_startGreen02_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
                var Btn_startGreen02_over_add = this.View.asCom.getChild("FreeSpin_Buy").asCom.getChild("ButtonStartGreen_Add").asCom.getChild("over").asLoader;
                Btn_startGreen02_over_add.url = getFairyUIURL(SelfData.Instance.MainPackageName, "Btn_startGreen02_");
            }
        }
    };
    XianBuyBonusView.prototype.Show = function (costNotEnough, Cost, func, ThisObj) {
        this.OKButton.enabled = true;
        this.NOButton.enabled = true;
        this.FreeSpin_Buy_Money.text = toCoinToString_CurrencyBet(Cost);
        updateFontSize(this.FreeSpin_Buy_Money, 32, 356);
        this.CostNotEnough = costNotEnough;
        this.Cost = Cost;
        this.View.visible = true;
        this.View.asCom.getTransition("t0").play();
        //this.CostText.visible = true;
        //this.CostText.text = toCoinToString(Cost);
        //if (isCD) this.AutoModeTrans.play();
        //else this.NormalModeTrans.play();
        this.CallbackFunc = func;
        this.CallbackThis = ThisObj;
    };
    XianBuyBonusView.prototype.Hide = function () {
        this.View.visible = false;
        //DisTeaOneModel.Instance.IsDailyBuy = false;
    };
    XianBuyBonusView.prototype.ProcessCostNotEnough = function () {
        return __awaiter(this, void 0, void 0, function () {
            var wait;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        wait = true;
                        RefreshBalanceController.Instance.RefreshBalanceTip = new RefreshBalanceTips();
                        RefreshBalanceController.Instance.RefreshBalanceTip.ShowTip(function () {
                            RefreshBalanceController.Instance.RefreshBalanceTip.ButtonEnable = false;
                            RefreshBalanceController.Instance.NoMoneySyncMWSingleGetBalance = true;
                            RefreshBalanceController.Instance.SendMWSingleGetBalanceRequest();
                            wait = false;
                        }, this);
                        _a.label = 1;
                    case 1:
                        if (!wait) return [3 /*break*/, 3];
                        return [4 /*yield*/, waitForSeconds(0.01)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        if (!RefreshBalanceController.Instance.WaitMWSingleGetBalance) return [3 /*break*/, 5];
                        return [4 /*yield*/, waitForSeconds(0.01)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 5:
                        this.CostNotEnough = SelfData.Instance.AccountData.Money < this.Cost;
                        this.OnNO();
                        return [2 /*return*/];
                }
            });
        });
    };
    XianBuyBonusView.prototype.ShowSuccess = function (time) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.View.visible = true;
                        //this.SuccessModeTrans.play();
                        return [4 /*yield*/, waitForSeconds(time)];
                    case 1:
                        //this.SuccessModeTrans.play();
                        _a.sent();
                        this.View.visible = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    XianBuyBonusView.prototype.OnOK = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.OKButton.enabled = false;
                        this.NOButton.enabled = false;
                        if (!this.CostNotEnough) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.ProcessCostNotEnough()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.CallbackFunc.apply(this.CallbackThis, [true]);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    XianBuyBonusView.prototype.OnNO = function () {
        this.OKButton.enabled = false;
        this.NOButton.enabled = false;
        this.CallbackFunc.apply(this.CallbackThis, [false]);
        this.Hide();
        // DisTeaOneModel.Instance.StopRunByBuyBonus = false;
    };
    return XianBuyBonusView;
}());
__reflect(XianBuyBonusView.prototype, "XianBuyBonusView");
//# sourceMappingURL=XianBuyBonusView.js.map