import React, { useState, useEffect, createContext, useContext } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import PlotCharts from './BarChart'
import { range } from 'pythonic';
import { Select } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import { dataContext } from "../App"

// const dataContext = createContext('data');

function sortAndListData(topN, lastDateData) {

  var sortable = []

  for (var project in lastDateData) {
    const projData = lastDateData[project]
    sortable.push([projData.project_name, projData.total_followers, projData.following])
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

  return { listX, listY, listFollowing }
}


let rangeSelect = []
function createOptions(n) {
  rangeSelect.push({ key: n, value: n, text: `Top ${n}` })
}
range(10, 51, 5).map(num => createOptions(num));


export default function BarChart() {
  // value = React.useContext(UserContext);  
  const { responseData, totalProjs } = useContext(dataContext)
  const [topN, setTopN] = useState(20);
  const [seTopN, setSeTopN] = useState(topN);


  const handleChange = (e, data) => {
    setTopN(data.value)
  }

  const filterBtn = (e) => {
    setSeTopN(prevState => topN)
  }

  const {
    listX,
    listY,
  } = sortAndListData(seTopN, responseData)

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
            onChange={handleChange} />
          <Button style={{ width: '100px' }} className="btnBaseStyle" onClick={filterBtn}>Submit</Button>
        </div>
      </div>
      <Row>
        <Col>
          <div>
            <h3 style={{ margin: '32px 0 0' }} className='textCenter'>Showing the top {seTopN} projects</h3>
            {responseData ? (<PlotCharts
              data={[{
                type: 'bar',
                x: listX,
                y: listY,
                title: listX,
                text: listY,
                textposition: 'auto',
                texttemplate: '%{text:,}',
                hovertemplate: '<extra></extra><b>Project Account</b>: %{x}' +
                  '<br><b>Total Followers</b>: %{y:,}<br>'
              }
              ]}
            />) : (<Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>)}
          </div>
        </Col>
      </Row>
      <div style={{ textAlign: 'end', fontStyle: 'italic' }}>
        <span style={{ fontStyle: 'italic' }}>Last Update: </span>
        <span style={{ fontStyle: 'italic', fontSize: 12 }}>{!responseData ? ' ? loading... ' : responseData[0].last_updated} (UTC time)</span>
      </div>
    </div>
  )
}
