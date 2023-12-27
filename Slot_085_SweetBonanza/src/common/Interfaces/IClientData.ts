interface ReClientData{
    Status : Array<Array<number>>; // 0是maingame,應該大家都一樣 ,而1.2.3.....是看遊戲決定 (EX:有bonusgame可能是1,而假設你freegame跑到地10次斷線,這個值就是10)
    GameData :ReGameData;
}

interface ReGameData{
    BetParam :number[]; // coin 跟coinvalue
    NormalResult : number[]; // maingame盤面
    NormalWin : number; // maingame贏分
    BonusResult : number[][]; // bonusgame盤面
    BonusWin : number[]; // bonusgame贏分
    TotalBonusCount: number;
}