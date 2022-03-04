import React, { Component } from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';

class NodeInfo extends Component{

  constructor(props){
    super(props);
  }  

  render(){
    return (
      
      <Card >
        <Card.Body>
          <Row>
            <Card.Title>Node Info</Card.Title>
          </Row>
          <Row>
            <Container>
            <Row>
              <Col md={2}><Card.Text className="cBold">Client</Card.Text></Col>
              <Col md={10}><Card.Text className="text-truncate cCapitalize">{this.props.client}</Card.Text></Col>
            </Row>
            <Row>
              <Col md={2}><Card.Text className="cBold">Node ID</Card.Text></Col>
              <Col md={10}><Card.Text className="text-truncate">{this.props.nodeId}</Card.Text></Col>
            </Row>
            <Row>
              <Col md={2}><Card.Text className="cBold">Node Name</Card.Text></Col>
              <Col md={10}><Card.Text className="text-truncate">{this.props.nodeName}</Card.Text></Col>
            </Row>
            <Row>
              <Col md={2}><Card.Text className="cBold">Enode</Card.Text></Col>
              <Col md={10}><Card.Text className="text-truncate">{this.props.enode}</Card.Text></Col>
            </Row>
            <Row>
              <Col md={2}><Card.Text className="cBold">RPC URL</Card.Text></Col>
              <Col md={10}><Card.Text className="text-truncate">{this.props.rpcUrl}</Card.Text></Col>
            </Row>
            <Row>
              <Col md={2}><Card.Text className="cBold">IP</Card.Text></Col>
              <Col md={10}><Card.Text className="text-truncate">{this.props.ip}</Card.Text></Col>
            </Row>
            </Container>          
          </Row>
        </Card.Body>
      </Card>
    );
  }

}

export default NodeInfo;



