class UpdateEvent implements IEventUnit {
    public GetEventName(): string {
        return "UpdateEvent";
    }

    public GetSendAll(): boolean {
        return true;
    }
    public GetSecondKeyListened(): any {
        return null;
    }

    public constructor() {
    }
}

class ClientEvent implements IEventUnit
{
    public eventData:any = null;
    private e:ClientMsg = ClientMsg.None;
    public GetEventName(): string {
        return ClientMsg[this.e];
    }

    public GetSendAll(): boolean {
        return false;
    }
    public GetSecondKeyListened(): any {
        return this.e;
    }

    public constructor(CE:ClientMsg) {
        this.e = CE;
    }
}

class BuyBonusChangeBet implements IEventUnit {
    public _BetID: number;
    public GetEventName(): string {
        return "BuyBonusChangeBet";
    }

    public GetSendAll(): boolean {
        return true;
    }
    public GetSecondKeyListened(): any {
        return null;
    }

    public constructor() {

    }
}

class OnRePlayEnd {
	public GetEventName(): string {
		return "OnRePlayEnd";
	}

	public GetSendAll(): boolean {
		return true;
	}
	public GetSecondKeyListened(): any {
		return null;
	}

	public constructor() {

	}
}