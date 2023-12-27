class TableBase
{
    public TableName:string = "TableBase";

    private _typeRowNumber:number = 0;
    private _headerRowNumber:number = 1;
    private _contentStartRowNumber:number = 2;
    private _firstRowNumber:number = 0;
    private _invalidRowNumber:number = -1;
    private _secondIndexNumber:number = 1;
    private _skipFlag:string = "#";

    private _typeInt:string = "int";
    private _typeShort:string = "short";
    private _typeByte:string = "byte";
    private _typeString:string = "string";
    private _typeFloat:string = "float";
    private _typeLong:string = "long";

    private LineSeparator:string = "\n";
    private ColumnSeparator:string = "\t";

    private _columnNameToIndex:Dictionary;
    private _columnIndexToName:Dictionary;
    private _columnTypeList:Array<string> = new Array();
    private _content:Dictionary = new Dictionary([]);

    public Parsing( wholeText:string ):void
    {
        let lines:Array<string> = wholeText.split(this.LineSeparator);
        this.ParseColumnName( lines[this._headerRowNumber] );
        this.ParseColumnType( lines[this._typeRowNumber] );

        for ( let i = this._contentStartRowNumber; i < lines.length - 1; ++i )
        {
            let rowContent:Array<any>;
            if( lines[i].lastIndexOf( this._skipFlag, 0 ) === 0 )
                continue;

            let index:any = this.ParseRow( lines[i], ( out ) => rowContent = out );

            if ( rowContent == null )
                continue;

            if ( !this._content.containsKey( index ) )
                this._content.add( index, rowContent );

            this.OnRowParsed( rowContent );
        }
        this.OnTableParsed();
    }

    public ParseColumnName( columnRow:string ):void
    {
        this._columnNameToIndex = new Dictionary([]);
        this._columnIndexToName = new Dictionary([]);

        let headers:string[] = columnRow.split( this.ColumnSeparator );

        for ( let i = 0; i < headers.length; ++i )
        {
            if ( headers[i] == '\r' || headers[i] == '' )
                continue;

            this._columnNameToIndex.add( headers[i], i );
            this._columnIndexToName.add( i, headers[i] );
        }
    }

    public ParseColumnType( columnRow:string ):void
    {
        let types:string[] = columnRow.split( this.ColumnSeparator );
        for ( let i = 0; i < types.length; ++i )
        {
            if ( types[i] == '\r' )
                continue;

            this._columnTypeList.push( types[i] );
        }

    }

    private ParseRow( columnRow:string, out:( rowContent:Array<any> ) => void ):any
    {
        let items:string[] = columnRow.split( this.ColumnSeparator );
        if( items.length <= 1 )
        {
            out(null);
            return null;
        }

        let rowFields:Array<any> = new Array();
        for ( let i = 0; i < items.length - 1; ++i )
        {
            let type:string = this.GetColumnType( i );
            rowFields.push( this.TransformFields( type, items[i] ) );
        }

        out( rowFields );
        return rowFields[this._firstRowNumber];
    }

    private TransformFields( type:string, data:string ):any
    {
        switch (type)
        {
            case this._typeInt:
                return parseInt(data);
            case this._typeShort:
                return parseInt(data);
            case this._typeByte:
                return parseInt(data);
            case this._typeString:
                return data;
            case this._typeFloat:
                return parseFloat(data);
            case this._typeLong:
                return Number(data);
            default:
                return data;
        }
    }

    private GetColumnType( columnIndex:number ):string
    {
        return this._columnTypeList[columnIndex];
    }

    protected OnRowParsed( rowContent:Array<Object> ) {

    }

    protected OnTableParsed() {

    }

    public GetRows<T extends string | number>( index: any ):Array<T>
    {
        if ( this._content.containsKey( index ) )
            return this._content[index];

        consoleLog( "GetRow failed. data not found. table: " + this.TableName + ", index: " + index );
        return null;
    }

    public GetValue<TKey extends string | number, TOutput extends string | number>( index:any, columnName:string ):TOutput
    {
        let rows = this.GetRows( index );
        if ( rows == null )
            return null;

        let columnIndex:number = this.GetColumnNameIndex( columnName );
        if ( rows.length > columnIndex )
        {
            let output:TOutput = rows[columnIndex] as TOutput;
            if ( output != null )
                return output;
        }

        consoleLog( "GetValue failed. data not found. table: " + this.TableName + ", index: " + index + ", columnName: " + columnName );
        return null;
    }

    public GetColumnNameIndex( columnName:string ):number
    {
        if ( this._columnNameToIndex.containsKey( columnName ) )
            return this._columnNameToIndex[columnName];
        
        consoleLog( "GetColumnNameIndex failed. data not found. table: " + this.TableName + ", columnName: " + columnName );
        return this._invalidRowNumber;
    }

    public GetColumnName( index:number ):string
    {
        if (this._columnIndexToName.containsKey(index))
            return this._columnIndexToName[index];
        
        consoleLog( "GetColumnName failed. data not found. table: " + this.TableName + ", index: " + index );
        return "";
    }
}