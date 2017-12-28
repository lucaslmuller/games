function Food(board, snake, blockWidth, blockHeight) {
    var self = this;

    getPos("x", snake, function(pos) {        
        self.posX = pos;
    });

    getPos("y", snake, function(pos) {        
        self.posY = pos;
    });

    var foodsContainer = document.getElementById('foods');

    foodsContainer.innerHTML += "<div class='food' style='width:" + blockWidth + "px; height:" + blockHeight + "px; left: " + (this.posX * blockWidth) + "px; top: " + (this.posY * blockHeight) + "px;'></div>";

    function getPos(dimension, snake, callback) {
        var pos;

        if(dimension == 'x') {            
            pos = parseInt(Math.random() * (board.width - 1));

            var snakeX = snake.history.map(function(historyItem) {
                return historyItem[0];
            });

            if(snakeX.indexOf(pos) !== -1) return getPos(dimension, snake, callback);            
        }

        if(dimension == 'y') {            
            pos = parseInt(Math.random() * (board.height - 1));

            var snakeD = snake.history.map(function(historyItem) {
                return historyItem[0];
            });
            
            if(snakeD.indexOf(pos) !== -1) return getPos(dimension, snake, callback);
            
        }        

        return callback(pos);
    }
}