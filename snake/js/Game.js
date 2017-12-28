

function Game(config) {
    var self = this;

    var speeds = {
        easy: 350,
        normal: 250,
        medium: 200,
        hard: 100,
        expert: 60
    }

    var _snake;
    var _food;
    var _board = new Board(config.boardWidth, config.boardHeight, config.blockWidth, config.blockHeight);

    this.blockWidth     = config.blockWidth;
    this.blockHeight    = config.blockHeight;
    this.speed          = speeds[config.speed];    


    Setup();

    function Setup() {
        document.addEventListener('keydown', function(e) {
            switch(e.key) {
                case ("ArrowRight"):
                    _snake.direction = "right";
                    this.posX++;
                    break;
                case ("ArrowLeft"):
                    _snake.direction = "left";
                    this.posX--;
                    break;
                case ("ArrowUp"):
                    _snake.direction = "top";
                    this.posY--;
                    break;
                case ("ArrowDown"):
                    _snake.direction = "bottom";
                    this.posY++;
                    break;
            }
        }); 
        
        document.getElementById("easy").addEventListener('click', function(e) {
            self.speed = speeds["easy"];
            preStart();
        });

        document.getElementById("normal").addEventListener('click', function(e) {
            self.speed = speeds["normal"];
            preStart();
        });

        document.getElementById("medium").addEventListener('click', function(e) {
            self.speed = speeds["medium"];
            preStart();
        });

        document.getElementById("hard").addEventListener('click', function(e) {
            self.speed = speeds["hard"];
            preStart();
        });

        document.getElementById("expert").addEventListener('click', function(e) {
            self.speed = speeds["expert"];
            preStart();
        });
        

        function preStart() {
            document.getElementById("gameover").style.display = "none";
            document.getElementById("menu").style.display = "none";
            start(config);
        }

    }
    
    function Draw() {
        var _move = _snake.move(_food);

        if(_move.died) return gameOver();
        
        if(_move.ateFood) {
            document.getElementById('foods').innerHTML = "";
            _food = new Food(_board, _snake, config.blockWidth, config.blockHeight);
        }

        if(_snake.posX < 0 || _snake.posX >= _board.width || _snake.posY < 0 || _snake.posY >= _board.height) return gameOver();

        _snake.draw();        

        setTimeout(Draw, self.speed);
    }

    function gameOver() {
        document.getElementById('menu').style.display = "block";
        document.getElementById('gameover').style.display = "block";
        document.getElementById('title').style.display = "none";
    }

    function start(config) {
        document.getElementById('foods').innerHTML = "";
        _snake  = new Snake(config.blockWidth, config.blockHeight);
        _food   = new Food(_board, _snake, config.blockWidth, config.blockHeight);

        Draw();
    }



}
