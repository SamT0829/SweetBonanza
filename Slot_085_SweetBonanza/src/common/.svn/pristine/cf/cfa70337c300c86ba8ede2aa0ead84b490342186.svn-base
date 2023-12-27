class WheelAnimalTable extends TableBase {
    public TableName: string = "WheelAnimal";

    public static m_UID: string = "UID";
    public static m_position: string = "position";
    public static m_Animal: string = "Animal";

    private data: Dictionary = new Dictionary([]);

    protected OnRowParsed(rowContent: Array<Object>) {
        var uid: number = rowContent[this.GetColumnNameIndex(WheelAnimalTable.m_UID)] as number;
        var pos: number = rowContent[this.GetColumnNameIndex(WheelAnimalTable.m_position)] as number;
        var animal: number = rowContent[this.GetColumnNameIndex(WheelAnimalTable.m_Animal)] as number;
        this.data.add(pos, animal);
    }

    public GetAnimal(pos: number): number {
        if (this.data.containsKey(pos))
            return this.data[pos];
        else
            return 0;
    }
}