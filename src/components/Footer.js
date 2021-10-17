import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { Modal } from 'react-bootstrap'
import { FaWallet } from "react-icons/fa";

export default function Footer() {

    const [modalShow, setModalShow] = useState(false);

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);
    
    return (
        <div id="footer">
            <div className='bottom16'>
              <i style={{color:"rgb(29 161 242)"}} class="twitter icon"></i>
              <a target='blank' className='white' href="https://twitter.com/AnalyticsBudz">Follow us on twitter</a>
            </div>
            <div className="bottom8">Developers:</div>
            <div className='dispFlex'>
                <div>
                    <div className="bottom4">
                        <div>
                            <a style={{color:"rgb(29 161 242)"}} href='https://www.linkedin.com/in/leonardoferreirads/' target='blank'>
                                <i class="linkedin icon"/>
                            </a>
                            <a style={{color:'white'}} href='https://github.com/kaburelabs/' target='blank'>
                            <i class="github icon"/>
                            </a>
                            Leonardo Ferreira  |  Data Scientist and Core Developer
                        </div>
                    </div>
                    <div>
                        <div>
                            <a style={{color:"rgb(29 161 242)"}} href='https://www.linkedin.com/in/natacha-romano/' target='blank'>
                                <i class="linkedin icon"/>
                            </a>
                            <a style={{color:'white'}} href='https://github.com/romanonatacha/' target='blank'>
                            <i class="github icon"/>
                            </a>
                            Natacha Romano  |  Front-end Developer and UI Designer
                        </div>
                    </div>
                </div>
                <div className='dispFlex'>
                    <div><Button onClick={handleShow} className='btnBaseStyle right8'>Register your project</Button></div>
                    <Modal
                        show={modalShow}
                        onHide={handleClose}
                        // backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header>
                        <Modal.Title>SUPPORT THIS PROJECT</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className='bottom16'>
                                    
                                    If this app be useful to you and helped you to earn more money with your budz, please, consider donating any amount to any of the wallets below:
                                </div>
                                <span className='addrSpanStyle'>addr1q9dhvz6jr6mngvp0r3nmmhrm4666edh6uccs9fem56dyx605takx5pl6q7p2mxvy56w5l2wcyrjw2hmwgnsr7v6kgszshfauvk</span>

                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className='dispFlex'>
                    <div><Button onClick={handleShow} className='btnBaseStyle right8'>Register your project</Button></div>
                    <Modal
                        show={modalShow}
                        onHide={handleClose}
                        keyboard={false}
                    >
                        <Modal.Header>
                        <Modal.Title>REGISTER YOUR PROJECT</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <div className='bottom16'>
                                    
                                    If this app be useful to you and helped you to earn more money with your budz, please, consider donating any amount to any of the wallets below:
                                </div>
                                <span className='addrSpanStyle'>addr1q9dhvz6jr6mngvp0r3nmmhrm4666edh6uccs9fem56dyx605takx5pl6q7p2mxvy56w5l2wcyrjw2hmwgnsr7v6kgszshfauvk</span>

                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div>
    )
}