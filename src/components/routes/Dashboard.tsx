import React, { Component } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import { Sliders } from 'react-bootstrap-icons';
import { QuorumConfig, QuorumNode } from '../types/config';
import { getNodeKeys, getDetailsByNodeName } from '../api/quorumConfig';

interface IProps {
  config: QuorumConfig
}

interface IState {
  blocks: number;
  selectedNode: string;
}

class Dashboard extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      blocks: -1,
      selectedNode: this.props.config.nodes[0].name,
    }
  }
  nodeKeys: string[] = getNodeKeys(this.props.config);
  
  async nodeInfoHandler(name:string) {
    const needle: QuorumNode = getDetailsByNodeName(this.props.config, name)
    const rpcUrl: string = needle.rpcUrl;
    //TODO: stuff happens here
    this.setState({ selectedNode: name });
    // console.log('State: '+ JSON.stringify(this.state, null, 2));
  }


  render() {
    const handleSelectNode = (e:any) => {
      console.log(e);
      this.nodeInfoHandler(e);
    }
    return (
      <Container className="container-fluid vh-100">
        <br />
        <Row>
          <Row>
            <Col sm={11}>
              <h2>Dashboard</h2>
            </Col>
            <Col sm={1}>
              <Dropdown onSelect={handleSelectNode}>
                <Dropdown.Toggle variant="secondary" id="dropdown-node-menu" >
                  <Sliders size={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {this.nodeKeys.map((node) => (
                    <Dropdown.Item key={node} eventKey={node}>{node}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Row>
        <br />

        <Row>
          <br />
          
          <Row><p> </p></Row>

          <Row>
          </Row>
        </Row>

      </Container>
    );
  }
}

export default Dashboard;

