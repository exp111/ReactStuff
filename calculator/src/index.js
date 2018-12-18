import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'reactstrap';

class Calculator extends React.Component
{
    render()
    {
        return(
            <Container>
                <Row>
                    <Col className="result">Result</Col>
                </Row>
                <Row>
                    <Col className="button">
                        <Button className="rounded-circle light-grey">AC</Button>
                    </Col>
                    <Col className="button">
                        <Button className="rounded-circle light-grey">+/-</Button>
                    </Col>
                    <Col className="button">
                        <Button className="rounded-circle light-grey">%</Button>
                    </Col>
                    <Col className="button">
                        <Button className="rounded-circle orange">&#xf7;</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ReactDOM.render(<Calculator />, document.getElementById('root'));
