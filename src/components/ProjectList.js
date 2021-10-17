import React, { useState } from 'react';
import data from './Data'
import { Select } from 'semantic-ui-react'
import { Row, Col, Modal, Button } from 'react-bootstrap';
import LineChartModal from './LineChart'
import { BsFillBarChartFill } from "react-icons/bs";
import { FaHandHoldingUsd } from "react-icons/fa";

var keys = Object.keys(data);

const LastDateData = data[keys[keys.length - 1]]

function sortAndListData(props) {
  console.log(props)
  var sortable = []

  const LastDateData=props.data
  const by=props.by
  const sponsor=props.all

  const sponsorList=['DOODZ_CNFT', 'regulaversoNFTs', 'CardinosNFT', 'Sushi_Bytes', 'themobcrypto', 'The_ClayMates', 'Time_Trotters', 'crypto_heroe', 'BobclatsCardano', 
  'BizarreStarsNFT', 'unsigned_algo', 'ADA_Ninjaz', 'CheekyUnts']


  for (var project in LastDateData) {
    if (sponsor === "all") {
      sortable.push({'name':project, 'followers':LastDateData[project].total_followers, 
                              'following':LastDateData[project].following})
    } else {
      if (sponsorList.includes(project)){
        sortable.push({'name':project, 'followers':LastDateData[project].total_followers, 
                              'following':LastDateData[project].following})
      }
    }
  }

  if (by==='desc') {
    sortable.sort(function(a,b) {
      return b.followers-a.followers
    });
  } else if (by==='asc'){
    sortable.sort(function(a,b) {
      return a.followers-b.followers
    });
  } else if (by==='grow-desc'){
      sortable.sort(function(a,b) {
        return b.following-a.following
      });
  } else if (by==='grow-asc') {
    sortable.sort(function(a,b) {
      return a.following-b.following
    });
} else if (by==='alph-asc') {
    sortable.sort(function(a,b) {
      return a.name.localeCompare(b.name);
    });
  } else {
    sortable.sort(function(a,b) {
      return b.name.localeCompare(a.name);
    });
  }
  return sortable
}

const ProjectModal = ({ projAccount, data,  defaultDiff }) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
  
    const closeAction = () => {
      setIsModalOpen(false)
    }
    const [listFollowersX, listFollowersY, lastDate] = getFollowersDateList(data, projAccount)

    const sponsorList=['DOODZ_CNFT', 'regulaversoNFTs', 'CardinosNFT', 'Sushi_Bytes', 'themobcrypto', 'The_ClayMates', 'Time_Trotters', 'crypto_heroe', 'BobclatsCardano', 
                       'BizarreStarsNFT', 'unsigned_algo', 'ADA_Ninjaz', 'CheekyUnts']

    const isSponsor=sponsorList.includes(projAccount)

    const imgUrl=data[lastDate][projAccount].image_url
    const projectTitle=data[lastDate][projAccount].alias_name
    const totalFollowers=data[lastDate][projAccount].total_followers
    let projectUrl=data[lastDate][projAccount].website_url 
    const totalEntries=listFollowersX.length

    const comparisonRange= defaultDiff ? defaultDiff:7

    let difference
    if (totalEntries > comparisonRange) {
        difference=totalFollowers-listFollowersY[listFollowersY.length-comparisonRange]
    } else {
        difference=totalFollowers-listFollowersY[0]
    }

    const cardStyle = isSponsor?'cardStyleSponsor':'cardStyle'

    return (
      <div>
        <div style={{width:"100%"} } className='bottom16 projectCards'>
           <div className={cardStyle}>
            <div>
                <div className='textCenter bottom16'>
                <img className='bordRadius24 bottom16' alt='twitter project mini logo' src={imgUrl}/>
                <p className='cardsTitle'>{projectTitle}</p>
                </div>
                <div className='dispFlex bottom8'>
                    <div>Total Followers: </div>
                    <div>
                      <span className='right4'>{totalFollowers.toLocaleString()}</span>
                      <span style={{fontSize:10, color: difference > 0? 'green':'red'}}> 
                         ({difference>0? '+':''}{difference.toLocaleString()})</span>
                    </div>
                </div>
                <div className='dispFlex bottom8'>
                    <div>Twitter</div>
                    <a href={"https://twitter.com/"+projAccount}  target='blank'>@{projAccount}</a>
                </div>
                <div className='dispFlex bottom8'>
                    <div>Site</div>
                    {projectUrl ? <a href={projectUrl ? projectUrl : '#'} target='blank'>{projectUrl ? projectUrl.replace(/(^\w+:|^)\/\//, '') : 'not inf'}</a> :<div>Not set</div>}
                </div>
                <div className='dispFlex bottom8'>
                    <div>Partner Project</div>
                    <div><FaHandHoldingUsd style={{color:isSponsor?'gold':'rgb(47, 44, 44)'}}/></div>
                </div>
                <div className='dispFlex'>
                    <div>Historical</div>
                    <div>            
                        <Button 
                            onClick={() => setIsModalOpen(!isModalOpen)} 
                            className="btnModalHist">
                             <BsFillBarChartFill/>
                        </Button>
            </div>
                </div>
            </div>
            </div> 
          <Modal 
            id={projAccount} 
            show={isModalOpen} 
            onHide={closeAction} 
            className="modalStyle">
            <Modal.Header>
              <Modal.Title>Project Twitter account: @{projAccount}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>This project has a total of {totalEntries} records in our databse.</div>
              <div>
                <LineChartModal
                  data={[{ 
                    type: "scatter",
                    mode: "lines", 
                    x: listFollowersX, 
                    y: listFollowersY }]}
                  title={projAccount}
                />
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>)
  }

function getFollowersDateList(jsonVal, projectName) {

    var keys = Object.keys(jsonVal);
    const lastDate=keys[keys.length-1]

    let followerslist = []
    let dateList = []
  
    function changeDateFormat(date) {
      const [month, day, year] = date.split("/")
      return year+"-"+month+"-"+day
    }
  
    
    keys.forEach(function (date) {
      try {
        followerslist.push(jsonVal[date][projectName].total_followers)
        dateList.push(changeDateFormat(date.split(" ")[0]))
      } catch (e) {
  
      }
    })
    
    return [dateList, followerslist, lastDate]
  }

  const projOders = [
    { key: 'desc', value: 'desc', text: 'Total Followers (descending)' },
    { key: 'asc', value: 'asc', text: 'Total Followers (ascending)' },
    { key: 'grow-desc', value: 'grow-desc', text: 'Growth (descending)' },
    { key: 'grow-asc', value: 'grow-asc', text: 'Growth (ascending)' },
    { key: 'az-asc', value: 'alph-asc', text: 'Alphabetical (A-Z) asc' },
    { key: 'az-desc', value: 'alph-desc', text: 'Alphabetical (A-Z) desc' }
  ]

const ProjectListing = () => {

    const [cardOrder, setCardOrder] = useState('desc');
    const [projects, setProjects] = useState('all');
    const listRef = React.createRef();

    const handleChange = (e, data) => {
      setCardOrder(data.value)}

    var projList = sortAndListData({data:LastDateData, by:cardOrder, all:projects})

    const radioHandleChange = e => {
      const target = e.target;
      if (target.checked) {
        setProjects(target.value);
      }
    };


  //   const scrollToTodo = () => {
  //     listRef.current.scrollToItem(10);
  //   };
  
  // const ListStyle = {
  //   position: "relative",
  //   width: "100%"
  // };

  return <div>
      <div className='textTitleCenter'>
          {/* <Row> */}
          <h2 className='bottom32'>(~almost) All CNFT Twitter Projects</h2>
          <h4 className='bottom32'>We are monitoring a total of {projList.length} projects.</h4>
          <div style={{justifyContent:'end'}} className='inputsMonitor'>
              <div>
                <div style={{display:'flex'}}>
                  <div>
                    <div style={{textAlign:'left', fontSize:14}} className='bottom4'>
                      Filter Projects
                    </div>  
                    <form>
                      <div style={{display:'grid', textAlign:'left', marginRight:'24px'}}>
                        <label>
                          <input type="radio" value="all" checked={projects === 'all'} 
                                onChange={radioHandleChange}  style={{marginRight:'5px'}}/>
                          <span>All Projects</span>
                        </label>
                        <label>
                          <input type="radio" value="sponsors" checked={projects === 'sponsors'} 
                                onChange={radioHandleChange}  style={{marginRight:'5px'}}/>
                          <span>Only Sponsors</span>
                        </label>
                      </div>
                    </form>
                  </div>
                  <div>
                    <div style={{textAlign:'left', fontSize:14}} className='bottom4'>Sort the cards by:</div>  
                    <Select style={{width:'220px'}}
                      className='bottom16 SelectElement'
                      value={cardOrder} 
                      options={projOders} 
                      onChange={handleChange}/>
                  </div>
                </div>
              </div>
              <div>
              </div>
          </div>
      </div>
      <Row>
          <Col lg={12}>
          <div className='wrapper'>
          {projList.map((project, i) => (
              <ProjectModal
                key={`project-${i}`}
                data={data}
                projAccount={project.name}
                sponsorProject={false}
              />
            ))
          }
          </div>
          </Col>
      </Row>
    </div>
}

export default ProjectListing