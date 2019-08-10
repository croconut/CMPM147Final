//taken from the gameoflife assignment
//this is mostly the prof's code
//uses concepts from http://www.roguebasin.com/index.php?title=Cellular_Automata_Method_for_Generating_Random_Cave-Like_Levels
class CaveDataGenerator {
    constructor(columns, rows) {
        this.generation = 0;
        this.WALL = 1;
        this.NO_WALL = 0;
        this.columns = columns;
        this.rows = rows;

        this.cells = new Array(this.columns);
        for (let i = 0; i < this.columns; i++) {
            this.cells[i] = new Array(rows);
        }

        // Initialize cells with all zeros and one in the middle
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                //wall is 1, no wall is -1 
                this.cells[i][j] = Math.random() < 0.45? this.WALL: this.NO_WALL;
            }
        }
     }

     generate(n, holes, floor) {
         for (let z = 0; z < n; z++) {
            let nextgen = new Array(this.columns);
            for (let i = 0; i < this.columns; i++) {
                nextgen[i] = new Array(this.rows);
            }
            for (let x = 1; x < this.columns - 1; x++) {
                for (let y = 1; y < this.rows - 1; y++) {
                    //we actually wanna include ourself in calculation according to article
                    //im reading for the cave gen
                    let neighbors = 0;
                    for (let i = -1; i < 2; i++) {
                        for (let j = -1; j < 2; j++) {
                            neighbors += this.cells[x+i][y+j];
                        }
                    }
                    let neighbors2Step = 0;
                    if (x > 1 && y > 1 && x < this.columns - 2 && y < this.rows - 2) {
                        for (let i = -2; i < 3; i++) {
                            for (let j = -2; j < 3; j++) {
                                neighbors2Step += this.cells[x+i][y+j];
                            }
                        }
                    }
                   nextgen[x][y] = this.rule(z, neighbors, neighbors2Step);
                }
            }
            this.cells = nextgen;
            this.generation++;
         }
         for (let x = 1; x < this.columns - 1; x++) {
             for (let y = 1; y < this.rows - 1; y++) {
                 this.cells[x][y] = this.cells[x][y]? 
                    holes[Phaser.Math.RND.integerInRange(0, holes.length - 1)]: 
                    floor[Phaser.Math.RND.integerInRange(0, floor.length - 1)];
             }
         }
     }

     rule(i, n1, n2) {
        if (i < 5) {
            return n1 > 4 || n2 < 2? this.WALL: this.NO_WALL; 
        }
        else {
            return n1 > 4? this.WALL: this.NO_WALL;
        }
     }

}