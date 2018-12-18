import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
  
function Square(props) 
{
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
}

function checkForWinner(squares, length, needed)
{
    if (squares.find(function(e) { return e == null;}) === undefined)
    {
        return "No one";
    }

    for (var i = 0; i < length; i++)
    {
        // Horizontal
        var arr = {value: null, count: 1}
        for (var j = 0; j < length; j++)
        {
            var squareVal = squares[i * length + j];
            if (arr.value != null && arr.value === squareVal) //same value?
            {
                arr.count++;
                if (arr.count >= needed)
                {
                    return arr.value;
                }
            }
            else
            {
                arr.value = squareVal;
                arr.count = 1;
            }
        }

        // Vertical
        for (arr = {value: null, count: 1}, squareVal = null, j = 0; j < length; j++)
        {
            squareVal = squares[i + j * length];
            if (arr.value != null && arr.value === squareVal) //same value?
            {
                arr.count++;
                if (arr.count >= needed)
                {
                    return arr.value;
                }
            }
            else
            {
                arr.value = squareVal;
                arr.count = 1;
            }
        }

        // Diagonal
        if (i <= length - needed) // we only check down so no need to check after length - needed (ex length 4, needed 3 => only check the first 2 lines)
        {
            for (j = 0; j < length; j++)
            {
                var k = 0;
                // Right Down
                if (j <= length - needed)
                {
                    for (arr = {value: null, count: 1}, squareVal = null, k = 0; k < length; k++)
                    {
                        squareVal = squares[(i * length) + j + (k * (length + 1))];
                        if (arr.value != null && arr.value === squareVal) //same value?
                        {
                            arr.count++;
                            if (arr.count >= needed)
                            {
                                return arr.value;
                            }
                        }
                        else
                        {
                            arr.value = squareVal;
                            arr.count = 1;
                        }
                    }
                }

                // Left Down
                if (j > length - needed)
                {
                    for (arr = {value: null, count: 1}, squareVal = null, k = 0; k < length; k++)
                    {
                        squareVal = squares[(i * length) + j + (k * (length - 1))];
                        if (arr.value != null && arr.value === squareVal) //same value?
                        {
                            arr.count++;
                            if (arr.count >= needed)
                            {
                                return arr.value;
                            }
                        }
                        else
                        {
                            arr.value = squareVal;
                            arr.count = 1;
                        }
                    }
                }
            }
        }
    }
}

class Board extends React.Component {
    renderSquare(i) {
        if (this.props.handleClick)
        {
      return <Square 
        value={this.props.squares[i]}
        onClick={() => this.props.handleClick(i)}
      />;
        }
        return <Square 
        value={this.props.squares[i]}/>
    }
  
    renderBoard(length)
    {
        var board = [];

        for (var i = 0; i < length; i++)
        {
            var childs = [];
            for (var j = 0; j < length; j++)
            {
                childs.push(this.renderSquare(i * length + j))
            }
            board.push(<div className="board-row">{childs}</div>)
        }
        return board;
    }

    render() {
      return (
        <div>
          {this.renderBoard(this.props.length)}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            history: [{squares: Array(Math.pow(this.props.length, 2)).fill(null),}],
            xTurn: true,
            won: false,
          };
    }

    handleClick(i)
    {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i] != null || this.state.won)
            return;
        squares[i] = this.state.xTurn ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
              }]),
            xTurn: !this.state.xTurn,
        });
    }

    handleHistoryClick(i)
    {
        const history = this.state.history;
        history.splice(i + 1);
        this.setState({
            history: history,
            won: false,
            xTurn: (i % 2 === 0)
        })
    }

    renderHistory()
    {
        const history = this.state.history;
        return history.map((step, move) => {
            const desc = move ?
              `Go to move ${move}` :
              'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => this.handleHistoryClick(move)}>{desc}</button>
                <Board 
                length={this.props.length} 
                needed={this.props.needed} 
                squares={history[move].squares}/>
              </li>
            );
          });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = checkForWinner(current.squares, this.props.length, this.props.needed);
        
        var status;
        if (winner) 
        {
          status = 'Winner: ' + winner;
          if (!this.state.won)
          {
            this.setState({won: true});
          }
        } else {
          status = 'Next player: ' + (this.state.xTurn ? 'X' : 'O');
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
            length={this.props.length} 
            needed={this.props.needed} 
            squares={current.squares} 
            handleClick={(i) => this.handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{this.renderHistory()}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game length={4} needed={3}/>,
    document.getElementById('root')
  );
  