(function(w, d) {
    class GameOfLife {
        generation = 0;
        speed = 250;
        size = 50;
        running = false;
        intervalControl = null;
        initialized = false;
        grid = [];

        init() {
            if (this.initialized) { return; }

            this.initialized = true;
            this._setEventHandlers();
            this.grid = this._generateGrid();
            this._showGrid(this.grid);
        }

        start() {
            console.log('> Starting');

            this.running = true;
            this.intervalControl = setInterval(() => {
                this.step(this.grid);
            }, this.speed);
        }

        stop() {
            console.log('> Stoping');
            this.running = false;
            clearInterval(this.intervalControl);
        }

        reset() {
            console.log('> Reset');
            this.stop();
            this.generation = 0;

            for (let x = 0; x < this.grid.length; x++) {
                for (let y = 0; y < this.grid[x].length; y++) {
                    this.grid[x][y].setState(0);
                }
            }

            this._showGrid.apply(this, [this.grid]);
        }

        step() {
            console.log('> Step');
            this.generation++;


            this._getGeneration(this.grid);
            this._showGrid.apply(this, [this.grid]);
        }


        // ---------------------------------

        _generateGrid() {
            console.log('> Generating grid');

            const result = [];
            const gridElm = d.body.querySelector('#game');

            gridElm.innerHTML = '';

            for (let x = 0; x < this.size; x++) {
                const colElm = d.createElement('div');
                colElm.classList.add('col');
                gridElm.append(colElm);

                result[x] = [];

                for (let y = 0; y < this.size; y++) {
                    const cellElm = d.createElement('div');
                    cellElm.classList.add('cell');

                    colElm.append(cellElm);

                    const cell = new Cell(cellElm, x, y, 0);
                    result[x][y] = cell;

                    cellElm.addEventListener('click', () => {
                        cell.setState(!cell.state);
                        this._showGrid(this.grid);
                    });

                }
            }

            return result;
        }

        _showGrid(grid) {
            let populationCount = 0;

            for (let x = 0; x < grid.length; x++) {
                for (let y = 0; y < grid[x].length; y++) {
                    grid[x][y].elm.classList.remove('fill');

                    if (grid[x][y].state) {
                        populationCount++;
                        grid[x][y].elm.classList.add('fill');
                    }
                }
            }

            d.querySelector('#info').innerHTML = `Generation ${this.generation}  <br>  Population ${populationCount}`;
        }

        _getGeneration(seed) {
            let changes = [];

            const neighboorsCoords = [
                [ -1, -1 ],
                [ 0, -1 ],
                [ 1, -1 ],
                [ 1, 0 ],
                [ 1, 1 ],
                [ 0, 1 ],
                [ -1, 1 ],
                [ -1, 0 ],
            ];

            for (let x = 0; x < seed.length; x++) {
                for (let y = 0; y < seed[x].length; y++) {
                    const neighboors = neighboorsCoords.map(n => {
                        if (!seed[x + n[0]]) { return null; }
                        return seed[x + n[0]][y + n[1]] || null;
                    }).filter(n => !!n);

                    const newState = this._getCellNextState(seed[x][y].state, neighboors);
                    if (newState !== seed[x][y].state) {
                        changes.push([x, y, newState]);
                    }
                }
            }

            changes.forEach(c => {
                const x = c[0];
                const y = c[1];
                seed[x][y].setState(!seed[x][y].state);
            });
        }

        _getCellNextState(currentState, neighboors) {
            const liveNeighboorsCount = neighboors.filter(n => n.state).length;

            if (currentState === 1 && (liveNeighboorsCount === 2 || liveNeighboorsCount === 3)) {
                return 1;
            }

            if (currentState === 0 && liveNeighboorsCount === 3) {
                return 1;
            }

            return 0;
        }

        _setEventHandlers() {
            console.log('> Setting event handlers');

            d.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case " ": {
                        this.running ? this.stop() : this.start();
                        break;
                    }

                    case "r": {
                        this.reset();
                        break;
                    }

                    case "n": {
                        this.step();
                        break;
                    }
                }
            });

            d.querySelector('#btn-start').addEventListener('click', this.start.bind(this));
            d.querySelector('#btn-step').addEventListener('click', this.step.bind(this));
            d.querySelector('#btn-stop').addEventListener('click', this.stop.bind(this));
            d.querySelector('#btn-reset').addEventListener('click', this.reset.bind(this));

            d.querySelector('#speed-control').value = this.speed;
            d.querySelector('#speed-control').addEventListener('input', this._updateSpeed.bind(this));
        }

        _updateSpeed(e) {
            const running = this.running;
            this.stop();
            this.speed = e.target.value;

            if (running) {
                this.start();
            }

            console.log(e.target.value);
        }

        // ---------------------------------

    }

    class Cell {
        constructor(elm, x, y, state) {
            this.elm = elm;
            this.state = state || 0;
            this.x = x;
            this.y = y;
        }

        setState(s) {
            this.state = Number(s);
        }
    }


    window.Game = new GameOfLife();
    Game.init();
    Game.step();
})(window, document);