import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'reactstrap';

class Calculator extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            lastResult: "0",
            result: "0",
            operation: ""
        };
    }

    toNumber(string)
    {
        return Number(String(string).replace(',', '.'));
    }

    addNumber(number)
    {
        var result = String(this.state.result);
        if (result == "0")
        {
            result = number;
        }
        else
        {
            result += number;
        }
        this.setState({result: String(result)});
    }

    addComma()
    {
        var result = String(this.state.result);
        if (!result.includes(',')) // no double comma
        {
            result += ',';
        }
        this.setState({result: result});
    }

    setOperation(operation)
    {
        this.setState(
            {
                operation: operation,
                lastResult: this.state.result,
                result: "0"
            });
    }

    negate()
    {
        var result = this.toNumber(this.state.result);
        result *= -1;
        this.setState({result: result});
    }

    toPercent()
    {
        var result = this.toNumber(this.state.result);
        result /= 100;
        result = String(result).replace('.', ',');
        this.setState({result: result});
    }

    reset()
    {
        this.setState({result: "0", lastResult: "0"})
    }

    compute()
    {
        var result = this.toNumber(this.state.result);
        var lastResult = this.toNumber(this.state.lastResult);
        switch (this.state.operation)
        {
            case '+':
                result += lastResult;
                break;
            case '-':
                result = lastResult - result;
                break;
            case '/':
                result = lastResult / result;
                break;
            case 'x':
                result *= lastResult;
                break;
        }
        this.setState(
            {
                result: result, 
                operation: "",
                lastResult: "0"
            });
    }

    render()
    {
        return(
            <Container>
                <Row>
                    <Col className="result">{this.state.result}</Col>
                </Row>
                <Row>
                    <Col className="button" onClick={() => this.reset()}>
                        <Button className="square light-grey">{this.state.result == 0 && this.state.lastResult == 0 ? "AC" : "C"}</Button>
                    </Col>
                    <Col className="button" onClick={() => this.negate()}>
                        <Button className="square light-grey">&#xb1;</Button>
                    </Col>
                    <Col className="button" onClick={() => this.toPercent()}>
                        <Button className="square light-grey">%</Button>
                    </Col>
                    <Col className="button" onClick={() => this.setOperation('/')}>
                        <Button className="square orange" active={this.state.operation == '/'}>&#xf7;</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="button" onClick={() => this.addNumber(7)}>
                        <Button className="square dark-grey">7</Button>
                    </Col>
                    <Col className="button" onClick={() => this.addNumber(8)}>
                        <Button className="square dark-grey">8</Button>
                    </Col>
                    <Col className="button" onClick={() => this.addNumber(9)}>
                        <Button className="square dark-grey">9</Button>
                    </Col>
                    <Col className="button" onClick={() => this.setOperation('x')}>
                        <Button className="square orange" active={this.state.operation == 'x'}>x</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="button" onClick={() => this.addNumber(4)}>
                        <Button className="square dark-grey">4</Button>
                    </Col>
                    <Col className="button" onClick={() => this.addNumber(5)}>
                        <Button className="square dark-grey">5</Button>
                    </Col>
                    <Col className="button" onClick={() => this.addNumber(6)}>
                        <Button className="square dark-grey">6</Button>
                    </Col>
                    <Col className="button" onClick={() => this.setOperation('-')}>
                        <Button className="square orange" active={this.state.operation == '-'}>-</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="button" onClick={() => this.addNumber(1)}>
                        <Button className="square dark-grey">1</Button>
                    </Col>
                    <Col className="button" onClick={() => this.addNumber(2)}>
                        <Button className="square dark-grey">2</Button>
                    </Col>
                    <Col className="button" onClick={() => this.addNumber(3)}>
                        <Button className="square dark-grey">3</Button>
                    </Col>
                    <Col className="button" onClick={() => this.setOperation('+')}>
                        <Button className="square orange" active={this.state.operation == '+'}>+</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="button" xs="6" onClick={() => this.addNumber(0)}>
                        <Button className="square dark-grey w">0</Button>
                    </Col>
                    <Col className="button" onClick={() => this.addComma()}>
                        <Button className="square dark-grey">,</Button>
                    </Col>
                    <Col className="button" onClick={() => this.compute()}>
                        <Button className="square orange">=</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
