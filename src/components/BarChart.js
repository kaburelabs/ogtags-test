import Plot from 'react-plotly.js';

export default function BarChart({ data, title, height }) {
    return (
        <Plot
            data={data}
            config={{ displayModeBar: false }}
            layout={{height: height ? height : 350, 
                    paper_bgcolor:'rgba(0,0,0,0)', 
                    plot_bgcolor:'rgba(0,0,0,0)', 
                    xaxis:{
                        title:'Project Accounts' ,
                        //  tickangle:75,
                        titlefont: {
                            size: 14,
                            color: 'lightgrey'
                            },
                        tickfont:{color:"lightgrey"}},
                    yaxis:{ 
                        title:'Total Followers', 
                        titlefont: {
                            size: 14,
                            color: 'lightgrey'},
                        tickcolor:'#000', 
                        tickfont: {
                            color:"lightgrey"}
                        },
                        margin:{l: 50, r:80, t:15, b:130}
                    }}
            style={{ width: "100%"}}
        />
    )
}
