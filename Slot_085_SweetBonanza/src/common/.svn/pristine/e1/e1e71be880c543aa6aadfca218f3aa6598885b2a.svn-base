/**圖片機率表格*/
class SlotIconRateTable extends TableBase {
	public TableName: string = "SlotIconRate";
	private static m_GameType: string = "GameType";
	private static m_ID: string = "ID";
	public static m_WheelIndex: string = "WheelIndex";
	public static m_IconRate: string = "IconRate";
	private static SlotIconRate: Dictionary = new Dictionary([]);

	/**獲取插槽圖標機率*/
	public static getSlotIconRate(ID: number) {
		if (!SlotIconRateTable.SlotIconRate.containsKey(ID)) {
			consoleLog("Not Get SlotIconRate, ID:" + ID);
			return [];
		}
		return SlotIconRateTable.SlotIconRate[ID];
	}

	protected OnRowParsed(rowContent: Array<Object>) {
		var GameType: string = rowContent[this.GetColumnNameIndex(SlotIconRateTable.m_GameType)] as string;
		var ID: number = rowContent[this.GetColumnNameIndex(SlotIconRateTable.m_ID)] as number;
		var WheelIndex: number = rowContent[this.GetColumnNameIndex(SlotIconRateTable.m_WheelIndex)] as number;
		var IconRate: string = rowContent[this.GetColumnNameIndex(SlotIconRateTable.m_IconRate)] as string;

		if (!SlotIconRateTable.SlotIconRate.containsKey(ID)) {
			SlotIconRateTable.SlotIconRate.add(ID, []);
		}
		let SlotIconArray = SlotIconRateTable.SlotIconRate[ID];
		var data = JSON.parse(IconRate);
		let dict = new Dictionary([]);
		for (let key in data) {
			dict.add(parseInt(key), data[key]);
		}
		for (let i = 0; i < WheelIndex; ++i) {
			if (i === WheelIndex - 1) {
				if (SlotIconArray.length < WheelIndex)
					SlotIconArray.push(dict);
				else
					SlotIconArray[i] = dict;
			}
			else {
				if (SlotIconArray.length < i + 1) {
					SlotIconArray.push(null);
				}
			}

		}
	}
}