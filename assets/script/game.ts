// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   
    //图片数组
    @property("number")
    pic_Array:cc.Node[][]=[];

    //图片预制体
    @property(cc.Prefab)
    pic_Prefab:cc.Prefab[]=[];

    //
    name:string="";
    num:number=0;


    // LIFE-CYCLE CALLBACKS:

    onLoad (){
        this.node.on("mousedown",this.Delete_Pic,this);
        this.init_array();
        this.creat_RandomArray();
    }

    start () {

    }

    update (dt) {

    }

    init_array(){
        for(var i=0;i<12;i++){
            this.pic_Array[i]=[];
        }
        for(var i=0;i<12;i++){
            for(var j=0;j<12;j++){
                this.pic_Array[i][j]=cc.instantiate(this.pic_Prefab[0]);
                this.pic_Array[i][j].name="null";
            }
        }
    }

    creat_RandomArray(){
        for(var i=1;i<11;i++){
            for(var j=1;j<11;j++){
                let n=Math.floor(Math.random() * 6);
                if(n==0){
                    this.pic_Array[i][j]=cc.instantiate(this.pic_Prefab[0]);
                }
                else if(n==1){
                    this.pic_Array[i][j]=cc.instantiate(this.pic_Prefab[1])
                }
                else if(n==2){
                    this.pic_Array[i][j]=cc.instantiate(this.pic_Prefab[2])
                }
                else if(n==3){
                    this.pic_Array[i][j]=cc.instantiate(this.pic_Prefab[3])
                }
                else if(n==4){
                    this.pic_Array[i][j]=cc.instantiate(this.pic_Prefab[4])
                }
                else if(n==5){
                    this.pic_Array[i][j]=cc.instantiate(this.pic_Prefab[5]) 
                }
                this.node.addChild(this.pic_Array[i][j]);
                this.pic_Array[i][j].setPosition(50*i-25,50*j-25);
                
            }
        }
    }

    Delete_Pic(event){
        let world_pos:cc.Vec2=event.getLocation();
        let relative_pos:cc.Vec2=this.node.convertToNodeSpaceAR(world_pos);
        let x : number = Math.round((relative_pos.x+25)/50);
        let y : number = Math.round((relative_pos.y+25)/50);
        
        if(this.pic_Array[x][y]!=null){
            this.name=this.pic_Array[x][y].name;
            this.num=0;
            this.Del_pic1(x,y);
            // this.Del_pic(x,y);
    
            setTimeout(function() {
                this.Fill_empty();
            }.bind(this),400);
            
        }

    }

    
    Del_pic(x,y){

        if(this.num==0){
            if(this.pic_Array[x][y].name=="null"||(this.pic_Array[x][y+1].name!=this.name&&this.pic_Array[x][y-1].name!=this.name
                &&this.pic_Array[x+1][y].name!=this.name&&this.pic_Array[x-1][y].name!=this.name)){
                cc.log("跳出");
                return;
            }
        }

        this.pic_Array[x][y].removeFromParent();
        this.num++;
        this.pic_Array[x][y].name="null";
        if(y+1<11 &&this.pic_Array[x][y+1]!=null&&this.pic_Array[x][y+1].name==this.name){
                this.Del_pic(x,y+1);
        }
        if(y-1>0&&this.pic_Array[x][y-1]!=null&&this.pic_Array[x][y-1].name==this.name){
                this.Del_pic(x,y-1);

        }
        if(x+1<11&&this.pic_Array[x+1][y]!=null&&this.pic_Array[x+1][y].name==this.name){
            this.Del_pic(x+1,y);

        }
        if(x-1>0&&this.pic_Array[x-1][y]!=null&&this.pic_Array[x-1][y].name==this.name){
            this.Del_pic(x-1,y);

        }
        
    }
    Del_pic1(x,y){

        if(this.pic_Array[x][y].name=="null"||(this.pic_Array[x][y+1].name!=this.name&&this.pic_Array[x][y-1].name!=this.name
            &&this.pic_Array[x+1][y].name!=this.name&&this.pic_Array[x-1][y].name!=this.name)){
            cc.log("跳出");
            return;
        }
        
        
        this.pic_Array[x][y].name="null";
        
        if(this.pic_Array[x][y+1].name == this.name){
                
            this.Del_pic1(x,y+1);
            this.pic_Array[x][y+1].name="null";
            this.pic_Array[x][y+1].removeFromParent();
        }
        if(this.pic_Array[x][y-1].name == this.name){
            
            this.Del_pic1(x,y-1);
            this.pic_Array[x][y-1].name="null";
            this.pic_Array[x][y-1].removeFromParent();
        }
        if(this.pic_Array[x+1][y].name == this.name){
            
            this.Del_pic1(x+1,y);
            this.pic_Array[x+1][y].name="null";
            this.pic_Array[x+1][y].removeFromParent();
        }
        if(this.pic_Array[x-1][y].name == this.name){
            
            this.Del_pic1(x-1,y);
            this.pic_Array[x-1][y].name="null";
            this.pic_Array[x-1][y].removeFromParent();
        }
        this.pic_Array[x][y].removeFromParent();
        
        
    }
    

    Fill_empty(){
        for(var i=1;i<11;i++){
            for(var j=1;j<11;j++){
              
                if(this.pic_Array[i][j].name=="null"){
                    
                    let n:number=1;
                    while(j+n!=11 && this.pic_Array[i][j+n].name=="null"){
                        n++;
                    }
                    cc.log(n)
                    for(var k=0;j+k+n<11;k++) {
                        this.pic_Array[i][j+k].parent=this.node;
                        this.pic_Array[i][j+k].name=this.pic_Array[i][j+k+n].name;
                        if(this.pic_Array[i][j+k].name=="a"){
                            let temp:cc.Node=cc.instantiate(this.pic_Prefab[0]);
                            this.pic_Array[i][j+k].getComponent(cc.Sprite).spriteFrame=
                            temp.getComponent(cc.Sprite).spriteFrame
                        }
                        if(this.pic_Array[i][j+k].name=="b"){
                            let temp:cc.Node=cc.instantiate(this.pic_Prefab[1]);
                            this.pic_Array[i][j+k].getComponent(cc.Sprite).spriteFrame=
                            temp.getComponent(cc.Sprite).spriteFrame
                        }
                        if(this.pic_Array[i][j+k].name=="c"){
                            let temp:cc.Node=cc.instantiate(this.pic_Prefab[2]);
                            this.pic_Array[i][j+k].getComponent(cc.Sprite).spriteFrame=
                            temp.getComponent(cc.Sprite).spriteFrame
                        }
                        if(this.pic_Array[i][j+k].name=="d"){
                            let temp:cc.Node=cc.instantiate(this.pic_Prefab[3]);
                            this.pic_Array[i][j+k].getComponent(cc.Sprite).spriteFrame=
                            temp.getComponent(cc.Sprite).spriteFrame
                        }
                        if(this.pic_Array[i][j+k].name=="e"){
                            let temp:cc.Node=cc.instantiate(this.pic_Prefab[4]);
                            this.pic_Array[i][j+k].getComponent(cc.Sprite).spriteFrame=
                            temp.getComponent(cc.Sprite).spriteFrame
                            
                        }
                        if(this.pic_Array[i][j+k].name=="f"){
                            let temp:cc.Node=cc.instantiate(this.pic_Prefab[5]);
                            this.pic_Array[i][j+k].getComponent(cc.Sprite).spriteFrame=
                            temp.getComponent(cc.Sprite).spriteFrame
                            
                        }
                        if(this.pic_Array[i][j+k].name=="null"){

                            this.pic_Array[i][j+k].getComponent(cc.Sprite).spriteFrame=null
                        }
                        
                        this.pic_Array[i][j+k+n].name="null";
                        this.pic_Array[i][j+k+n].getComponent(cc.Sprite).spriteFrame=null
                    }
                    
                    
                


                }

                

            }
            
        }
    }
   

}
