class JJLToadFGIndexTable extends TableBase {
	public TableName: string = "JJLToadFGIndex";
	public static m_UID: string = "UID";
	public static m_RevealedIndex: string = "RevealedIndex";
	public static m_RealIndex: string = "RealIndex";
	public static m_OppotunityIndex: string = "OppotunityIndex";
	public static m_EntrerRound: string = "EntrerRound";
	public static m_WildCount: string = "WildCount";
	public static m_AnotherEnterRound: string = "AnotherEnterRound";
	public static m_AnotherWildCount: string = "AnotherWildCount";

	public RevealedIndexDict:Dictionary = new Dictionary([]);

	protected OnRowParsed(rowContent: Array<Object>) {
		let UID: number = rowContent[this.GetColumnNameIndex(JJLToadFGIndexTable.m_UID)] as number;
		let RevealedIndex: number = rowContent[this.GetColumnNameIndex(JJLToadFGIndexTable.m_RevealedIndex)] as number;
		this.RevealedIndexDict.add(RevealedIndex,UID);
	}
}