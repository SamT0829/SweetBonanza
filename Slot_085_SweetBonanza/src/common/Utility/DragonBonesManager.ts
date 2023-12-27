class DragonBonesManager {
    private static _instance: DragonBonesManager;
    private factory :dragonBones.EgretFactory = new dragonBones.EgretFactory();
    private data:Dictionary = new Dictionary([]);

    public static get Instance(): DragonBonesManager {
            if (this._instance == null) {
                this._instance = new DragonBonesManager();
                egret.Ticker.getInstance().register(  
                function(frameTime:number){dragonBones.WorldClock.clock.advanceTime(0.01)},  
                    this  
                ); 
            }
            return this._instance;
    }


    public CreateArmature(container:egret.DisplayObjectContainer,name:string)
    {
        if(!this.data.containsKey(name)){
            this.data.add(name,new DragonBonesData(name));
            this.factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(this.data[name].SkeletonData ));
            this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(this.data[name].Texture, this.data[name].TextureData));
        }

        let armature = this.factory.buildArmature(name);
        container.addChild(armature.display);
    
        return armature;
    }

    public PlayAnim(armature: dragonBones.Armature,name:string)
    {
        if(!dragonBones.WorldClock.clock.contains(armature))
            dragonBones.WorldClock.clock.add(armature);
        armature.animation.gotoAndPlay(name);  
    }


    public StopAnim(armature: dragonBones.Armature,name:string)
    {
        if(!dragonBones.WorldClock.clock.contains(armature))
            dragonBones.WorldClock.clock.add(armature);
        armature.animation.gotoAndStop(name);  
    }
}

class DragonBonesData
{
    public SkeletonData = null;
    public TextureData = null;
    public Texture = null;

   	public constructor(name:string) {
        if (RES.hasRes(name+ "_ske_json"))
            this.SkeletonData = RES.getRes(name + "_ske_json");
        if (RES.hasRes(name+ "_tex_json"))
            this.TextureData = RES.getRes(name + "_tex_json");
        if (RES.hasRes(name+ "_tex_png"))
            this.Texture = RES.getRes(name + "_tex_png");
	}
}