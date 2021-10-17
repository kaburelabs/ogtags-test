import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PlotCharts from './BarChart'
import {range} from 'pythonic';
import { Select } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import data from './Data'

var keys = Object.keys(data);

const LastDateData = data[keys[keys.length - 1]]
// const projectNames = Object.keys(LastDateData);

function sortAndListData(topN) {
    var sortable = []

    for (var project in LastDateData) {
      sortable.push([project, LastDateData[project].total_followers, LastDateData[project].following])
    }
  
    sortable.sort(function (a, b) {
      // console.log(a[1])
      return b[1] - a[1]
    })
  
    let listX = []
    let listY = []
    let listFollowing = []
  
    sortable.slice(0, topN)
      .forEach(function (vals) {
        listX.push(`@${vals[0]}`)
        listY.push(vals[1])
        listFollowing.push(vals[2])
      })
  
    return {listX, listY, listFollowing}
  }


let rangeSelect =[]
function createOptions(n) {
  rangeSelect.push({ key: n, value: n, text: `Top ${n}` })
}
range(10, 51,5).map(num => createOptions(num));


export default function BarChart() {

    const [topN, setTopN] = useState(20);
    const [seTopN, setSeTopN] = useState(topN);
    // const [nClicks, setNClicks] = useState(0);

    const handleChange = (e, data) => { 
      setTopN(data.value)
    }

    const filterBtn = (e) => {
      setSeTopN(prevState => topN)
    }

    // uwc-debug
    React.useEffect(() => {
      console.log("some thing changed , need to figure out")
    }, [topN]);

    const {
      listX,
      listY,
      // listFollowing
    } = sortAndListData(seTopN)

    return (
        <div>
            <div className='marginSpace'>
              <h2 className='textCenter top32 bottom16'>CARDANO NFT PROJECTS</h2>
              <h4 className='textCenter bottom64'>TWITTER PROJECTS</h4>
            </div>
            <div>
              <div className='btnSubmitMargins'>
                <div className="bottom16">Select Top N projects (max. 50) </div>  
                <Select className='right16'
                  value={topN} 
                  options={rangeSelect} 
                  onChange={handleChange}/>
                <Button style={{width:'100px'}} className="btnBaseStyle" onClick={filterBtn}>Submit</Button>
              </div>
            </div>
            <Row>   
                <Col>
                    <div>
                        <h3 style={{margin: '32px 0 0'}} className='textCenter'>Showing the top {seTopN} projects</h3>
                        <PlotCharts
                            data={[{ 
                              type: 'bar',
                              x: listX, 
                              y: listY, 
                              title:listX, 
                              text:listY,
                              textposition: 'auto',
                              texttemplate:'%{text:,}',
                              hovertemplate:'<extra></extra><b>Project Account</b>: %{x}' +
                                            '<br><b>Total Followers</b>: %{y:,}<br>'}
                            ]}
                        />
                    </div>
                </Col>
            </Row>
            <div style={{textAlign: 'end', fontStyle:'italic'}}>
              <span style={{fontStyle:'italic'}}>Last Update: </span>
              <span style={{fontStyle:'italic', fontSize:12}}>{keys.slice(-1)[0]} (UTC time)</span>
            </div>
        </div>
    )
}
