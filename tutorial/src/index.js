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
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(Math.pow(this.props.length, 2)).fill(null),
          xTurn: true,
          won: false,
        };
    }

    renderSquare(i) {
      return <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />;
    }

    handleClick(i)
    {
        const squares = this.state.squares.slice();
        if (squares[i] != null || this.state.won)
            return;
        squares[i] = this.state.xTurn ? 'X' : 'O';
        this.setState({
            squares: squares, 
            xTurn: !this.state.xTurn,
        });
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
        const winner = checkForWinner(this.state.squares, this.props.length, this.props.needed);
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
          if (!this.state.won)
            this.setState({won: true});
        } else {
          status = 'Next player: ' + (this.state.xTurn ? 'X' : 'O');
        }
  
      return (
        <div>
          <div className="status">{status}</div>
          {this.renderBoard(this.props.length)}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    constructor(props)
    {
        super(props);
    }

    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board length={this.props.length} needed={this.props.needed}/>
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
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
  