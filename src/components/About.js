


import React from 'react';

const About = ( ) => {
    const addr = "addr1q9dhvz6jr6mngvp0r3nmmhrm4666edh6uccs9fem56dyx605takx5pl6q7p2mxvy56w5l2wcyrjw2hmwgnsr7v6kgszshfauvk"
    
    const AboutText = [
        {'title': "THE PROJECT", 'content': "The projects aims to be an easy way to the ADA community and NFT lovers discover projects on the Cardano Blockchain in an simple and objective way.", "last":false}, 
        {'title': "WHO BUILT IT?", 'content':"This platform is built by community members to community members. We are individual programmers, data scientists and data engineers who wants to collaborate and aggregate value to this amazing ecosystem of Cardano blockchain.", "last":false}, 
        {'title': "WHAT'S THE PURPOSE OF THE PLATFORM?", 'content': "It's an app build to help the community to better understand the value of the NFTs giving some important informations and insights to people do better trades based in the scarcity/rarity of their budz.", "last":false}, 
        {'title': "WHAT'S NEXT?", 'content': "We intend to consolidate and aggregate extra informations related to each gadget and also, going in depth in the analyzis of the gadgets and trying to find more solutions using data science techniques.", "last":false}, 
        {'title': "HOW TO CONTRIBUTE?", 'content': "If you want to collaborate and see more features in this project, you can consider donating some ADA's to us or even contribute in other ways like labeling by the link below.", "last":false}, 
        {'title': "WALLET ADDRESS", 'content': `Please, consider sending some ADAs to support and motivate us to provide more work force on this cool and promising project. Send the ADAs to: `, "last":true}
    ]

    let count = 0

    const ListValues = AboutText.map(function(row) {

        if (row.last) {
            return <div className="bottom32">
                <div style={{fontWeight:"bold", fontSize:18}} className="bottom8">{row.title}</div>
                <div>{row.content}</div>
                <span className='addrSpanStyle'>{addr}</span>
            </div>
        } else {
            return <div className="bottom32">
            <div style={{fontWeight:"bold", fontSize:18}} className="bottom8">{row.title}</div>
            <div>{row.content}</div>
        </div>
        }
    })
    

    return <div className='aboutWrapper top64'>
            {ListValues}
        </div>
    
}

export default About 