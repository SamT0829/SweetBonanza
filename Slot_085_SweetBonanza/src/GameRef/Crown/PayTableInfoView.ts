class PayTableInfoView {
	public view: fairygui.GComponent = null;
	public pageList: Array<string> = []
	pageLoader: fairygui.GLoader = null;
	public static MaxPageIndex = 0;
	index = 0;

	public constructor(view: fairygui.GComponent) {
		this.view = view;
		let leftButton = this.view.getChild("Left").asButton;
		let RightButton = this.view.getChild("Right").asButton;
		let BackButton = this.view.getChild("Back").asButton;
		this.pageLoader = this.view.getChild("PageLoader").asLoader;
		leftButton.addClickListener(this.onLeft, this);
		RightButton.addClickListener(this.onRight, this);
		BackButton.addClickListener(this.onBack, this);
		for (let i = 0, max = PayTableInfoView.MaxPageIndex; i < max; ++i) {
			let turl = fairygui.UIPackage.getItemURL(SelfData.Instance.MainPackageName, "Page" + i);
			this.pageList.push(turl);
		}
		this.showPage();
		this.onBack();
	}

	public Open() {
		this.view.visible = true;
	}


	protected onLeft() {
		if (this.index - 1 < 0)
			this.index = this.pageList.length - 1;
		else
			this.index--;
		this.showPage();
	}

	protected onRight() {
		if (this.index + 1 > this.pageList.length - 1)
			this.index = 0
		else
			this.index++;
		this.showPage();
	}

	protected onBack() {
		this.view.visible = false;
	}

	protected showPage() {

		if (this.index < this.pageList.length)
			this.pageLoader.url = this.pageList[this.index];
	}
}