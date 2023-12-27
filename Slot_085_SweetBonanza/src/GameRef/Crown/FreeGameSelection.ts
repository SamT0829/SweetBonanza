class FreeGameSelection {

	private Parent :fairygui.GObject =null;
	private OnSlelectcb:Function =null; 
	private Btns:fairygui.GObject[] =[];
	private IsSelect : boolean= false;
	public IsSelectFinish : boolean= false;
	private ShowTrans :fairygui.Transition =null;
	private HideTrans :fairygui.Transition =null;
	//private Transition :fairygui.GObject =null;

	private SoundName_ChoiceConfirm:string = "Selection_Confirm";

	public constructor(parent:fairygui.GObject,btnName:string[],cb:Function) {
		let m_this = this;
		m_this.Parent = parent;
		m_this.ShowTrans = parent.asCom.getTransition("show");
		m_this.HideTrans = parent.asCom.getTransition("hide");
		// this.Transition = parent.asCom.getChild("Transition");
		// this.Transition.sortingOrder =50;

		m_this.OnSlelectcb = cb;
		for(let i =0;i<btnName.length;i++)
		{
			m_this.Btns.push(m_this.Parent.asCom.getChild(btnName[i]));
			m_this.Btns[i].sortingOrder =45;
			let btn :fairygui.GButton = m_this.Btns[i].asCom.getChild("btn").asButton;
			btn.addClickListener(()=>{m_this.OnBtnClick(i);},m_this);
		}
	}


	public Show()
	{
		this.IsSelect =false;
		this.IsSelectFinish =false;
		for(let i =0;i<this.Btns.length;i++)
		{
			this.Btns[i].visible = true;
			this.Btns[i].sortingOrder =45;
			PlayFairytguiTrans(this.Btns[i],"show");
		}
		if(this.ShowTrans != null)
			this.ShowTrans.play();
	}


	public async Hide()
	{
		let isAnimEnd =false;
		this.HideTrans.setHook("end",()=>{isAnimEnd =true},this);
		if(this.HideTrans != null)
			this.HideTrans.play();
		while(!isAnimEnd)
		{
			await waitForSeconds(0.1);
		}
		for(let i =0;i<this.Btns.length;i++)
		{
			this.Btns[i].visible =false;
		}
	}

	public async OnBtnClick(idx:number)
	{
		if(this.IsSelect)
			return;
		this.IsSelect =true;
		SoundManger.Instance.PlaySoundSE(this.SoundName_ChoiceConfirm);
		this.Btns[idx].sortingOrder =46;
		this.Parent.asCom.getTransition("choose"+(idx+1).toString()).play();
		//PlayFairytguiTrans(this.Btns[idx],"select");
		for(let i =0;i<this.Btns.length;i++)
		{
			if(i!=idx)
				PlayFairytguiTrans(this.Btns[i],"shadow");
		}
		await waitForSeconds(2);
		SoundManger.Instance.StopSoundSE(this.SoundName_ChoiceConfirm);
		await this.Hide();
		this.OnSlelectcb(idx+1);
		this.IsSelectFinish = true;
	}
}