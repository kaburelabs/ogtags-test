import React, { useState, useContext } from 'react';
import { Select } from 'semantic-ui-react'
import { Row, Col, Modal, Button, Spinner } from 'react-bootstrap';
import LineChartModal from './LineChart'
import { BsFillBarChartFill } from "react-icons/bs";
import { FaHandHoldingUsd } from "react-icons/fa";
import { useEffect } from 'react';
import { dataContext } from "../App"



const projOders = [
    { key: 'desc', value: 'desc', text: 'Total Followers (descending)' },
    { key: 'asc', value: 'asc', text: 'Total Followers (ascending)' },
    { key: 'grow-desc', value: 'grow-desc', text: 'Growth (descending)' },
    { key: 'grow-asc', value: 'grow-asc', text: 'Growth (ascending)' },
    { key: 'az-asc', value: 'alph-asc', text: 'Alphabetical (A-Z) asc' },
    { key: 'az-desc', value: 'alph-desc', text: 'Alphabetical (A-Z) desc' }
]


function sortAndListData(props) {

    var sortable = []

    const LastDateData = props.data
    const by = props.by
    const sponsor = props.all

    const sponsorList = ['DOODZ_CNFT', 'regulaversoNFTs', 'CardinosNFT', 'Sushi_Bytes', 'themobcrypto', 'The_ClayMates', 'Time_Trotters', 'crypto_heroe', 'BobclatsCardano',
        'BizarreStarsNFT', 'unsigned_algo', 'ADA_Ninjaz', 'CheekyUnts']


    LastDateData.forEach(function (proj) {
        try {

            if (sponsor === "all") {
                sortable.push({ ...proj })
            } else {
                if (sponsorList.includes(proj.project_name)) {
                    sortable.push({ ...proj })
                }
            }
        } catch (e) {

        }
    })

    if (by === 'desc') {
        sortable.sort(function (a, b) {
            return b.total_followers - a.total_followers
        });
    } else if (by === 'asc') {
        sortable.sort(function (a, b) {
            return a.total_followers - b.total_followers
        });
    } else if (by === 'grow-desc') {
        sortable.sort(function (a, b) {
            return b.following - a.following
        });
    } else if (by === 'grow-asc') {
        sortable.sort(function (a, b) {
            return a.following - b.following
        });
    } else if (by === 'alph-asc') {
        sortable.sort(function (a, b) {
            return a.project_name.localeCompare(b.project_name);
        });
    } else {
        sortable.sort(function (a, b) {
            return b.project_name.localeCompare(a.project_name);
        });
    }

    return sortable
}



const ProjectModal = ({ proj_data, focusModalProject, setIsModalOpen }) => {

    const sponsorList = ['DOODZ_CNFT', 'regulaversoNFTs', 'CardinosNFT', 'Sushi_Bytes', 'themobcrypto', 'The_ClayMates', 'Time_Trotters', 'crypto_heroe', 'BobclatsCardano',
        'BizarreStarsNFT', 'unsigned_algo', 'ADA_Ninjaz', 'CheekyUnts']

    const isSponsor = sponsorList.includes(proj_data.project_name)

    const imgUrl = proj_data.image_url
    const projectTitle = proj_data.alias_name
    const totalFollowers = proj_data.total_followers
    let projectUrl = proj_data.website_url

    let difference = 50

    const cardStyle = isSponsor ? 'cardStyleSponsor' : 'cardStyle'

    const clickedProj = () => {
        focusModalProject(proj_data.project_name)
        setIsModalOpen((open) => !open)
    }


    return (
        <div>
            <div style={{ width: "100%" }} className='bottom16 projectCards'>
                <div className={cardStyle}>
                    <div>
                        <div className='textCenter bottom16'>
                            <img className='bordRadius24 bottom16' alt='twitter project mini logo' src={imgUrl} />
                            <p className='cardsTitle'>{projectTitle}</p>
                        </div>
                        <div className='dispFlex bottom8'>
                            <div>Total Followers: </div>
                            <div>
                                <span className='right4'>{totalFollowers.toLocaleString()}</span>
                                <span style={{ fontSize: 10, color: difference > 0 ? 'green' : 'red' }}>
                                    ({difference > 0 ? '+' : ''}{difference.toLocaleString()})</span>
                            </div>
                        </div>
                        <div className='dispFlex bottom8'>
                            <div>Twitter</div>
                            <a href={"https://twitter.com/" + proj_data.project_name} target='blank'>@{proj_data.project_name}</a>
                        </div>
                        <div className='dispFlex bottom8'>
                            <div>Site</div>
                            {projectUrl ? <a href={projectUrl ? projectUrl : '#'} target='blank'>{projectUrl ? projectUrl.replace(/(^\w+:|^)\/\//, '') : 'not inf'}</a> : <div>Not set</div>}
                        </div>
                        <div className='dispFlex bottom8'>
                            <div>Partner Project</div>
                            <div><FaHandHoldingUsd style={{ color: isSponsor ? 'gold' : 'rgb(47, 44, 44)' }} /></div>
                        </div>
                        <div className='dispFlex'>
                            <div>Historical</div>
                            <div>
                                <Button
                                    onClick={clickedProj}
                                    className="btnModalHist">
                                    <BsFillBarChartFill />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >)
}

function getFollowersDateList(jsonTotal) {

    if (jsonTotal === null) {
        return [null, null]
    }

    let followerslist = []
    let dateList = []

    jsonTotal.history.forEach(function (jsonProjs) {
        followerslist.push(jsonProjs.followers)
        dateList.push(jsonProjs.date)
    })

    return [dateList, followerslist]
}

const ProjectListing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { responseData, totalProjs } = useContext(dataContext)
    const [cardOrder, setCardOrder] = useState('desc');
    const [projects, setProjects] = useState('all');
    const [loadProj, setLoadProj] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [loading, setLoading] = useState(true);


    let projList = responseData ? sortAndListData({ data: responseData, by: cardOrder, all: projects }) : null

    useEffect(() => {
        const fetchData = async (project) => {
            const cards = await fetch(
                `https://fastapi-hrk.herokuapp.com/projects/history/${project}`,
            );
            const jsonCards = await cards.json();
            setModalData(jsonCards);
        };
        if (loadProj === null) {

            setLoading(true)
            setModalData(null);
        }
        else {
            setLoading(true)
            setModalData(null);
            fetchData(loadProj);
            setLoading(false)
        }
    }, [loadProj]);


    let [dateList, followerslist] = getFollowersDateList(modalData)


    const radioHandleChange = e => {
        const target = e.target;
        if (target.checked) {
            setProjects(target.value);
        }
    };

    const handleChange = (e, data) => {
        setCardOrder(data.value)
    }

    return (<div>
        <div className='textTitleCenter'>
            {/* <Row> */}
            <h2 className='bottom32'>(~almost) All CNFT Twitter Projects</h2>
            <h4 className='bottom32'>We are monitoring a total of {totalProjs ? totalProjs.total_projects : "loading..."} projects.</h4>
            <div style={{ justifyContent: 'end' }} className='inputsMonitor'>
                <div>
                    <div style={{ display: 'flex' }}>
                        <div>
                            <div style={{ textAlign: 'left', fontSize: 14 }} className='bottom4'>
                                Filter Projects
                            </div>
                            <form>
                                <div style={{ display: 'grid', textAlign: 'left', marginRight: '24px' }}>
                                    <label>
                                        <input type="radio" value="all" checked={projects === 'all'}
                                            onChange={radioHandleChange} style={{ marginRight: '5px' }} />
                                        <span>All Projects</span>
                                    </label>
                                    <label>
                                        <input type="radio" value="sponsors" checked={projects === 'sponsors'}
                                            onChange={radioHandleChange} style={{ marginRight: '5px' }} />
                                        <span>Only Sponsors</span>
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div>
                            <div style={{ textAlign: 'left', fontSize: 14 }} className='bottom4'>Sort the cards by:</div>
                            <Select style={{ width: '220px' }}
                                className='bottom16 SelectElement'
                                value={cardOrder}
                                options={projOders}
                                onChange={handleChange} />
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
                    {projList ? (projList.map((project, i) => {
                        return (
                            <ProjectModal
                                proj_data={project}
                                focusModalProject={setLoadProj}
                                setIsModalOpen={setIsModalOpen}

                                key={`project-${i}`}
                            // sponsorProject={false}
                            />
                        )
                    })) : (
                        <div>Loading the component</div>
                    )
                    }
                </div>
            </Col>
        </Row>
        <Modal
            id={loadProj}
            show={isModalOpen}
            onHide={() => setIsModalOpen(false)}
            className="modalStyle">
            <Modal.Header>
                <Modal.Title>Project Twitter account: @{loadProj}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>This project has a total of {dateList ? dateList.length : ''} records in our databse.</div>
                <div>
                    {loading ? (
                        (<Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>)
                    ) : (
                        <LineChartModal
                            data={[{
                                type: "scatter",
                                mode: "lines",
                                x: dateList ? dateList : [],
                                y: followerslist ? followerslist : []
                            }]}
                            title={loadProj}
                        />
                    )}
                </div>
            </Modal.Body>
        </Modal>
    </div>)
}

export default ProjectListing;