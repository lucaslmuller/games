function Snake(blockWidth, blockHeight) {
    var self = this;
    this.direction = "right";
    this.history   = [[0, 0]];
    this.length    = 1;
    this.posX      = 0;
    this.posY      = 0;


    this.move = function(food) {
        switch(this.direction) {
            case ("right"):
                this.posX++;
                break;
            case ("left"):
                this.posX--;
                break;
            case ("top"):
                this.posY--;
                break;
            case ("bottom"):
                this.posY++;
                break;
        }        

        var newPos = [this.posX, this.posY];

        for(var i = 0; i < this.history.length; i++) {
            if(this.history[i][0] == newPos[0] && this.history[i][1] == newPos[1]) {
                return {ateFood: false, died: true};
                break;                
            }            
        }

        function die() {

        }

        this.history.unshift(newPos);

        if(this.posX == food.posX && this.posY == food.posY) {
            this.history = this.history.slice(0, this.length + 1);
            this.eat();
            return {ateFood: true, died: false};
        } else {
            this.history = this.history.slice(0, this.length);
            return {ateFood: false, died: false};
        }
    }

    this.draw = function() {
        this.elm = document.getElementById('snake');

        var _bodyPieces = "";
        
        for(var i = 0; i < this.length; i++) {
            var _width = blockWidth + 'px';
            var _height = blockHeight + 'px';
            var _left = (this.history[i][0] * blockWidth)+ 'px';
            var _top = (this.history[i][1] * blockHeight) + 'px';
            _bodyPieces += '<div class="body-piece" style="top: ' + _top + '; left: ' + _left + '; width: ' + _width + '; height: ' + _height + '"></div>';
        }        

        self.elm.innerHTML = _bodyPieces;
    }

    this.eat = function() {
        this.length++;     
        document.getElementById("score").innerHTML = "Score: " + (this.length - 1) * 5;        
    }
    
}