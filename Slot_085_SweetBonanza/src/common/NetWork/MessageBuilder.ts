enum NetMsgFieldType
{
    Boolean,
    Byte,
    Short,
    Int,
    Float,
    Long,
    String,
    Double,
    Object,
    Array,
}

/**訊息製作著*/
class MessageBuilder
{
    private _collectedMessage : any[] = [];

    /**製造訊息*/
    public Build() : any[]
    {
        return this._collectedMessage;
    }

    /**添加訊息*/
    public Add(msgKey : number, msgValue : any, msgValueType : NetMsgFieldType)
    {
        let functionedValue : string = null;
        switch(msgValueType)
        {
            case NetMsgFieldType.Byte:
            {
                functionedValue = "#b" + (<number>msgValue).toString();
            }
            break;
            case NetMsgFieldType.Short:
            {
                functionedValue = "#s" + (<number>msgValue).toString();
            }
            break;
            case NetMsgFieldType.Int:
            {
                functionedValue = "#i" + (<number>msgValue).toString();
            }
            break;
            case NetMsgFieldType.Float:
            {
                functionedValue = "#f" + (<number>msgValue).toString();
            }
            break;
            case NetMsgFieldType.Long:
            {
                functionedValue = "#l" + (<number>msgValue).toString();
            }
            break;
            case NetMsgFieldType.Array:
            {
                let objectMessage = new MessageBuilder();
                objectMessage.Add(ArrayIndicator.MessageType, true, NetMsgFieldType.Boolean);
                objectMessage.Add(ArrayIndicator.MessageData, msgValue, NetMsgFieldType.Object);
                this._collectedMessage.push(msgKey, objectMessage.Build());
                return;
            }
        }
        if(functionedValue != null)
        {
            this._collectedMessage.push(msgKey, functionedValue);
        }
        else
        {
            this._collectedMessage.push(msgKey, msgValue);
        }
    }
}