class HeaderManager {
	private HeaderTrans_Show: fairygui.Transition = null;
	private HeaderTrans_Hide: fairygui.Transition = null;

	private HeaderName: string[] = ["Header_Default", "Header_Normal","Header_Normal2", "Header_5OfAKind", "Header_FreeSpins", "Header_BigWin", "Header_BigWin2"];

	public get NeedShowHeader():boolean{return randomInt(0,100)<40;}

	public HeaderTypeIdx_Default : number = 0;
	public HeaderTypeIdx_Normal  : number = 1;
	public HeaderTypeIdx_Normal2 : number = 2;
	public HeaderTypeIdx_5OfAKind: number = 3;
	public HeaderTypeIdx_FreeSpin: number = 4;
	public HeaderTypeIdx_BigWin  : number = 5;
	public HeaderTypeIdx_BigWin2 : number = 6;

	public CurrentShowIdx: number = -1;
	private Header: fairygui.GObject[] = [];
	private IsAnimEnd :boolean =true;

	public constructor(view: fairygui.GComponent) {
		let header = view.getChild("Header");
		this.HeaderTrans_Show = header.asCom.getTransition("Show");
		this.HeaderTrans_Hide = header.asCom.getTransition("Hide");

		this.HeaderTrans_Show.setHook("end", () => { this.IsAnimEnd =true;}, this);
		this.HeaderTrans_Hide.setHook("end", () => { 
			this.IsAnimEnd =true;
			this.Header[this.CurrentShowIdx].visible = false;
			this.CurrentShowIdx = -1
		 }, this);

		for (let i = 0; i < this.HeaderName.length; i++)
		{
			this.Header.push(header.asCom.getChild(this.HeaderName[i]));
			this.Header[i].visible =false;
		}
		this.Header[this.HeaderTypeIdx_Default].visible = true;
		this.CurrentShowIdx=0;
	}

	public async Show(idx: number) {
		if(idx == this.CurrentShowIdx)
			return;
		while(!this.IsAnimEnd)
			await waitForSeconds(0.1)
		if(this.CurrentShowIdx!=-1)
		{
			this.IsAnimEnd =false;
			this.HeaderTrans_Hide.play();
		} 
		while(!this.IsAnimEnd)
			await waitForSeconds(0.1)
		this.Header[idx].visible = true;
		this.CurrentShowIdx = idx;
		this.HeaderTrans_Show.play();
	}
}