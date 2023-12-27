interface BonusResultData {
    bonusGameItem: number
    bonusGameCount: number
    bonusGameMoney: number
    bonusGamePos: number[]
}

interface ReSpinResultData {
    ReSpinItem: number
    ReSpinRow: number
}

class SlotBonusBaseResult extends SlotResultBase {
    public bonusResultList: BonusResultData[] = [];
}

class SlotReSpinResult extends SlotBonusBaseResult {
    isReSpin = false;
    public ReSpinResultList: ReSpinResultData[] = [];
}