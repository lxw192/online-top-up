import React from 'react';
import { Carousel } from 'antd'
import moment from 'moment'
import { Calendar, Badge, Row, Col } from 'antd';
class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    const { dispatch } = this.props
  }
  onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  }
  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <Row>
            <Col span={12}>
              <Calendar onPanelChange={this.onPanelChange} />
            </Col>
            <Col span={12}>
              haha
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
export default Index