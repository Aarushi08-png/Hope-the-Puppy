    


class Chicken {
    chickenGif;
    database;
    lastRefTime;
    chickenCount;
    lastFoundTime;
    chickenGroup;

    constructor(database) {
        this.chickenGif=loadImage("Images/Chicken.png");
        this.database = database;
        this.foodStock = 0;
        this.lastRefTime = 0;
        var self = this;
        this.chickenCount = this.database.ref('Chicken');
        this.chickenCount.on("value", function(data) { self.foodStock = data.val()});
        this.lastFoundTime = this.database.ref('LastFed');
        this.lastFoundTime.on("value", function(data) { self.LastFed = data.val(); console.log("Last Fed: " + self.LastFed);});
        this.chickenGroup = new Group();
    }

    updateFoodStock(){
        this.foodStock++;
        this.database.ref('/').update({
            Chicken:this.foodStock
          })
    }

    deductFood(){
        if(this.foodStock <= 0 ){
          return;
        }
        this.foodStock--;
        this.database.ref('/').update({
            Chicken:this.foodStock
          });
          this.database.ref('/').update({
            LastFed:Date()
          });
    }

    display(){
        var i;
        this.chickenGroup.removeSprites();
        
        for (i = 0; i < this.foodStock;i++) {
            let y = 270 + 50 * floor(i/5);
            let x = 100 + 65 * (i%5);
            let chicken = createSprite(x,y);
            chicken.addImage(this.chickenGif);
            chicken.scale=0.1;
            this.chickenGroup.add(chicken);
        }
    }
}




 





