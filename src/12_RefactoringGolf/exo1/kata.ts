/* eslint-disable */

// read the code
export class Game {
    private _lastSymbol = ' ';
    private _toto: Board = new Board();

    public Play(symbol: string, x: number, y: number): void {
        this.ValidateFirstMove(symbol);
        this.ValidatePlayerTurn(symbol);
        this.ValidatePosition(x, y);
        this.UpdateGameState(symbol, x, y);
    }

    private ValidateFirstMove(symbol: string): void {
        if (this._lastSymbol == ' ') {
            if (symbol == 'O') {
                throw new Error('Invalid first player');
            }
        }
    }

    private ValidatePlayerTurn(symbol: string): void {
        if (symbol == this._lastSymbol) {
            throw new Error('Invalid next player');
        }
    }

    private ValidatePosition(x: number, y: number): void {
        if (this._toto.TileAt(x, y).Symbol != ' ') {
            throw new Error('Invalid position');
        }
    }

    private UpdateGameState(symbol: string, x: number, y: number): void {
        this._lastSymbol = symbol;
        this._toto.AddTileAt(symbol, x, y);
    }

    public Winner(): string {
        for (let row = 0; row < 3; row++) {
            const winner = this.CheckRowWinner(row);
            if (winner != ' ') {
                return winner;
            }
        }
        return ' ';
    }

    private CheckRowWinner(row: number): string {
        const tile0 = this._toto.TileAt(row, 0)!.Symbol;
        const tile1 = this._toto.TileAt(row, 1)!.Symbol;
        const tile2 = this._toto.TileAt(row, 2)!.Symbol;

        if (this.ArePositionsTaken(tile0, tile1, tile2)) {
            return this.GetSymbolIfAllSame(tile0, tile1, tile2);
        }
        return ' ';
    }

    private ArePositionsTaken(tile0: string, tile1: string, tile2: string): boolean {
        return tile0 != ' ' && tile1 != ' ' && tile2 != ' ';
    }

    private GetSymbolIfAllSame(tile0: string, tile1: string, tile2: string): string {
        if (tile0 == tile1 && tile2 == tile1) {
            return tile0;
        }
        return ' ';
    }
}

interface Tile {
    X: number;
    Y: number;
    Symbol: string;
}

class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile: Tile = {X: i, Y: j, Symbol: ' '};
                this._plays.push(tile);
            }
        }
    }

    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
    }

    public AddTileAt(symbol: string, x: number, y: number): void {
//@ts-ignore
        const tile: Tile = {X: x, Y: y, Symbol: symbol};

        this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}

// create a PR,
// fix indentation first
//  commit and push
// make your comments,
// then refactor
// submit your PR for review