class SlotWheelStackData {
	public ResultStacks:number[][] =[]; //slot m*n  , for fix result
	public EndShowStack:number[][] =[];  //slot m*n , for spin show

	public StackID: number = 0;
	public StackLength :number =12;
	public StackLimit_Total :number =40;
	public StackLimit_Max :number =8;
	public StackLimit_Min :number =2;

	private DataSize :number[] =[];
	private Result: number[][] =[];

	private RandomItemIDList: number[] = [];

	public WheelFiliters :number[] =[];

	public GetIconName  =null;

	public isNeedCenterRate :number =40;
	private GetRandomIconID(wheelIdx:number,filiterIDs:number[]) :number
	{
		let f = copyArray( filiterIDs,0,filiterIDs.length);
		f.push(this.StackID);
        if (this.GetIconName != null) {
            let id = parseInt(this.GetIconName(wheelIdx, f));
            return id;
        }
        else {
            let randomIdx = randomInt(0, this.RandomItemIDList.length, false);
            return this.RandomItemIDList[randomIdx];
        }
	}

	public constructor(stackID :number, wheelFiliter:number[],ItemIDList:number[], length:number, total:number, max:number, min:number) 
	{
		this.StackID = stackID;
		this.WheelFiliters = wheelFiliter;
		this.RandomItemIDList = ItemIDList;
		this.StackLength = length;
		this.StackLimit_Total = total;
		this.StackLimit_Max = max;
		this.StackLimit_Min = min;
		
	}

	public SetData(result: Array<Array<number>>)
	{
		this.Result = result;
		this.DataSize = [result.length, result[0].length];
		if(this.ResultStacks.length<=0)
		{
			for(let i =0;i<this.DataSize[0];i++)
				this.ResultStacks.push([]);
		}
		 
		this.SetStack();
	}

	public SetStack()
	{
		let currentTargetCount = 0;
		let topTargetCount :number[] =[];
		let endTargetCount :number[] =[];
		let maxTopCount:number =0;
		let topCount :number[] =[];
		let endCount :number[] =[];
		let centerCount :number[] =[];
		let TargetCount :number = this.StackLimit_Total;
		

		for(let i =0;i<this.DataSize[0];i++)
		{
			currentTargetCount += this.ResultStacks[i].filter((x)=>{ return x == this.StackID;}).length;

			topTargetCount.push(0);
			endTargetCount.push(0);
			let isTopEnd :boolean=false; 
			for(let j =0;j<this.DataSize[1];j++)
			{
				if(this.Result[i][j] == this.StackID)
				{
					if(!isTopEnd)
						topTargetCount[i] += 1;
					else
						endTargetCount[i] += 1;
					
					currentTargetCount++;
				}
				else
					isTopEnd = true;
			}
		}

		for(let i =0;i<this.DataSize[0];i++)
		{
			topCount.push(0);
			endCount.push(0);
			centerCount.push(0);
			if(topTargetCount[i]>0 &&  topTargetCount[i] < this.StackLimit_Min)
				topCount[i] += (this.StackLimit_Min - topTargetCount[i]);
			if(endTargetCount[i]>0 && endTargetCount[i] < this.StackLimit_Min)
				endCount[i] += (this.StackLimit_Min - endTargetCount[i]);
			
			currentTargetCount += (topCount[i] + endCount[i]);
		}

		TargetCount -= currentTargetCount;
		let wfiliterCount =0;
		for(let i =0;i<this.DataSize[0];i++)
		{
			if(topCount[i]==0 && endCount[i]==0)
			{
				let isNeedCenter :boolean = randomInt(0,100,true) <= this.isNeedCenterRate;
				
				if(this.WheelFiliters.length-1 >= wfiliterCount && this.WheelFiliters[wfiliterCount] ==i)
				{
					wfiliterCount++;
					isNeedCenter = false;
				}

				if(isNeedCenter)
				{
					let count = randomInt(this.StackLimit_Min,this.StackLimit_Max,true);
					count = count > TargetCount ? TargetCount: count;
					TargetCount-= count;
					centerCount[i] = count;
				}
			}
			else if(topCount[i]==3)
			{
				let count = randomInt(this.StackLimit_Min,this.StackLimit_Max-3,true);
				let top = randomInt(0,count,true);
				topCount[i] += top;
				endCount[i] += (count-top);
				TargetCount -= count;
			}
			else
			{
				if(topCount[i]>0)
				{
					let count = randomInt(this.StackLimit_Min,this.StackLimit_Max-topCount[i],true);
					topCount[i] += count;
					TargetCount -= count;
				}

				if(endCount[i]>0)
				{
					let count = randomInt(this.StackLimit_Min,this.StackLimit_Max-endCount[i],true);
					endCount[i] += count;
					TargetCount -= count;
				}
			}
			maxTopCount = maxTopCount< topCount[i] ? topCount[i] : maxTopCount;
		}

		wfiliterCount =0;
		for(let i =0;i<topCount.length;i++)
		{

			if(this.WheelFiliters.length-1 >= wfiliterCount && this.WheelFiliters[wfiliterCount] ==i)
			{
					wfiliterCount++;
					continue;
			}

			if(maxTopCount >= this.StackLimit_Min && topCount[i]==0 && TargetCount>this.StackLimit_Min )
			{
				let random = randomInt(this.StackLimit_Min,maxTopCount,true);
				random = random> TargetCount? TargetCount :random;
				TargetCount -= random;
				topCount[i]= random;
			}
		}

		this.ResultStacks =[];
		this.EndShowStack =[];
		
		for(let i =0;i<this.DataSize[0];i++)
		{
			let filiterList : Array<number>= copyArray(this.Result[i], 0, this.Result[i].length ).reverse();
			let pushReusltID :number =-1;
			let pushShowEndID :number =-1; 

			this.ResultStacks.push(this.Result[i].reverse());
			this.EndShowStack.push([]);

			for(let j =0;j<maxTopCount;j++)
			{
				if(topCount[i]>0)
				{
					pushReusltID = this.StackID;
					topCount[i]--;
				}
				else
					pushReusltID = this.GetRandomIconID(i,filiterList);
				
				filiterList.push(pushReusltID);
				filiterList.splice(0,1);
				this.ResultStacks[i].push(pushReusltID);
			}
			this.ResultStacks[i] = this.ResultStacks[i].reverse();

			let randomCount = this.StackLength -endCount[i] - centerCount[i];
			randomCount = randomCount<0 ? 0:randomCount;
			let randomTopCount = randomInt(0,randomCount,true);
			filiterList = copyArray(this.Result[i], 0, this.Result[i].length ).reverse();
			for(let j =0;j<this.StackLength;j++)
			{
				if(endCount[i]>0)
				{
					pushShowEndID =  this.StackID;
					endCount[i]--;
				}
				else if(randomTopCount>0)
				{
					pushShowEndID = this.GetRandomIconID(i,filiterList);
					randomTopCount--;
				}
				else if(centerCount[i]>0)
				{
					pushShowEndID =  this.StackID;
					centerCount[i]--;
				}
				else
					pushShowEndID = this.GetRandomIconID(i,filiterList);

				filiterList.push(pushShowEndID);
				filiterList.splice(0,1);
				this.EndShowStack[i].push(pushShowEndID);
			}
		}


	}
}