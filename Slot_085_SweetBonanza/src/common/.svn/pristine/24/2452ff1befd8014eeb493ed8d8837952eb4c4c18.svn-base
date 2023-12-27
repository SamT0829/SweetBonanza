/**事件接口*/
interface IEventUnit {
    GetEventName(): string;

    GetSendAll(): boolean;

    GetSecondKeyListened(): any;
}

/**事件調用者*/
class EventCaller {
    private _callerObject: any; // used to record the this of caller                    //事件回調着
    private _functionCall: (event: IEventUnit) => void;                                 //回調事件
    private _secondKey: any;
    private _eventName: string;                                                         //事件名稱

    public get CallerObject(): any {
        return this._callerObject;
    }

    public get FunctionCall(): (IEventUnit) => void {
        return this._functionCall;
    }

    public get SecondKey(): any {
        return this._secondKey;
    }

    public get EventName(): string {
        return this._eventName;
    }

    public constructor(eventName: string, callerObject: any, secondKey: any, callback: (event: IEventUnit) => void) {
        this._eventName = eventName;
        this._callerObject = callerObject;
        this._functionCall = callback;
        this._secondKey = secondKey;
    }
}

function emit(event: Event) {
    return window.dispatchEvent(event);
}

function when(event) {
    return { then };
    function then(todo) {
        window.addEventListener(event, todo);
    }
}

/**事件管理器類*/
class EventManager {

    private static _instance: EventManager;

    private _waitingAddEventTable: Dictionary = new Dictionary([]);
    private _waitingRemoveEventList: number[] = [];
    private _waitingSendEventList: IEventUnit[] = [];
    private _eventTable: Dictionary = new Dictionary([]);
    private _callbackTable: Dictionary = new Dictionary([]); // int, EventCaller
    private _currentAvailableIndex = 1;

    public static get Instance(): EventManager {
        if (this._instance == null) {
            this._instance = new EventManager();
        }
        return this._instance;
    }

    private constructor() {
    }

    /**註冊新增事件監聽器_waitingAddEventTable*/
    public RegisterEventListener<T extends IEventUnit>  //(objectType, 被叫得程式, 調用方法, objectType(參數))
        (type: { new (secondKey?): T; }, callerObject: any, callback: (event: T) => void, secondKey?: any): number {
        let currentIndex = this._currentAvailableIndex;

        let eventName = "";
        if (secondKey == null) {
            let instance = new type();
            eventName = instance.GetEventName();
        }
        else {
            let instance = new type(secondKey); //(當secondkey != null) new T(secondKey) 的類
            eventName = instance.GetEventName();
        }

        //console.log( "eventName: " + eventName );
        let listener = new EventCaller(eventName, callerObject, secondKey, callback);
        this._waitingAddEventTable.add(currentIndex, listener);
        ++this._currentAvailableIndex;
        return currentIndex;
    }

    /**未註冊事件監聽器*/
    public UnregisterEventListener(registerId: number) {
        this._waitingRemoveEventList.push(registerId);
    }

    /**等待被移除事件列表*/
    public Send(event: IEventUnit) {
        this._waitingSendEventList.push(event);
    }

    protected maxFPS = 1000/70;
    protected lastTime = Date.now();

    /**更新事件*/
    public Update(): void {
        if (Date.now()-this.lastTime >= (this.maxFPS)) {
            this.lastTime = Date.now();
            this.SendUpdateEvent();
            this.AddPendingEvents();
            this.RemovePendingEvents();
            this.SendPendingEvents();
        }
    }

    /**等待被移除事件列表 加入事件*/
    private SendUpdateEvent(): void {
        if (SelfData.Instance.ConnectionClose)
            return;
        var event: UpdateEvent = new UpdateEvent();
        EventManager.Instance.Send(event);
    }

    /**發送待處理事件*/
    private SendPendingEvents() {
        while (this._waitingSendEventList.length > 0) {
            let event = this._waitingSendEventList.shift();
            let eventName = event.GetEventName();
            if (!this._eventTable.containsKey(eventName)) {
                continue;
            }

            let secondKeyEventTable = this._eventTable[eventName];
            if (event.GetSendAll()) {
                for (let secondKeyListenerList of (<Dictionary>secondKeyEventTable).values()) {
                    for (let listenerIndex of secondKeyListenerList) {
                        //console.log( "yyyyy " + eventName );

                        let listener: EventCaller = this._callbackTable[listenerIndex];
                        var param: any = [];
                        param.push(event);
                        (<EventCaller>listener).FunctionCall.apply((<EventCaller>listener).CallerObject, param);
                    }
                }
            }
            else {
                if (!(<Dictionary>secondKeyEventTable).containsKey(event.GetSecondKeyListened())) {
                    continue;
                }
                let secondKeyListenerList = (<Dictionary>secondKeyEventTable)[event.GetSecondKeyListened()];
                for (let listenerIndex of secondKeyListenerList) {
                    //console.log( "xxxxx " + eventName + " " + ClientMsg[event.GetSecondKeyListened()] );

                    let listener: EventCaller = this._callbackTable[listenerIndex];
                    var param: any = [];
                    param.push(event);
                    (<EventCaller>listener).FunctionCall.apply((<EventCaller>listener).CallerObject, param);
                }
            }
        }
    }

    /**添加待處理事件*/
    private AddPendingEvents() {
        for (let waitingEventKey of this._waitingAddEventTable.keys()) {
            let listener: EventCaller = this._waitingAddEventTable[waitingEventKey];
            let secondKeyEventTable: Dictionary;
            var listenerCollector: number[];
            if (this._eventTable.containsKey(listener.EventName)) {
                secondKeyEventTable = this._eventTable[listener.EventName];
            }
            else {
                secondKeyEventTable = new Dictionary([]);
                this._eventTable.add(listener.EventName, secondKeyEventTable);
            }

            if (secondKeyEventTable.containsKey(listener.SecondKey)) {
                listenerCollector = secondKeyEventTable[listener.SecondKey];
            }
            else {
                listenerCollector = [];
                secondKeyEventTable.add(listener.SecondKey, listenerCollector);
            }
            listenerCollector.push(waitingEventKey);
            this._callbackTable.add(waitingEventKey, listener);
        }
        this._waitingAddEventTable.clear();
    }

    /**刪除待處理事件*/
    private RemovePendingEvents() {
        while (this._waitingRemoveEventList.length > 0) {
            let removingIndex: number = this._waitingRemoveEventList.pop();
            if (this._callbackTable.containsKey(removingIndex)) {
                let removingListener: EventCaller = this._callbackTable[removingIndex];
                if (removingListener == null || removingListener == undefined) {
                    continue;
                }

                if (!this._eventTable.containsKey(removingListener.EventName)) {
                    continue;
                }
                let secondKeyEventTable: Dictionary = this._eventTable[removingListener.EventName];
                if (secondKeyEventTable == null || secondKeyEventTable == undefined) {
                    continue;
                }
                if (!secondKeyEventTable.containsKey(removingListener.SecondKey)) {
                    continue;
                }
                let listenerCollector: number[] = secondKeyEventTable[removingListener.SecondKey];
                if (listenerCollector == null || listenerCollector == undefined) {
                    continue;
                }
                let index = listenerCollector.indexOf(removingIndex);
                if (index >= 0) {
                    listenerCollector.splice(index, 1);
                }

                if (listenerCollector.length <= 0) {
                    secondKeyEventTable.remove(removingListener.SecondKey);
                }

                if (secondKeyEventTable.keys().length <= 0) {
                    this._eventTable.remove(removingListener.EventName);
                }
            }
        }
    }
}
