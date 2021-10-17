import Plot from 'react-plotly.js';

export default function LineChartModal({ data, title, height }) {
    return (
        <Plot
            data={data}
            config={{ displayModeBar: false }}
            layout={{height: height ? height : 350, 
                    paper_bgcolor:'rgba(0,0,0,0)', 
                    plot_bgcolor:'rgba(0,0,0,0)', 
                    xaxis:{
                        title:'Date' ,
                        //  tickangle:75,
                        titlefont: {
                            size: 14,
                            color: 'lightgrey'
                            },
                        tickfont:{color:"lightgrey"},
                        linecolor:'rgb(116 113 113 / 58%)',
                        gridcolor:'rgb(116 113 113 / 58%)'},
                    yaxis:{ 
                        title:'Total Followers', 
                        titlefont: {
                            size: 14,
                            color: 'lightgrey'},
                        tickcolor:'#000', 
                        tickfont: {
                            color:"lightgrey"},
                        linecolor:'rgb(116 113 113 / 58%)',
                        gridcolor:'rgb(116 113 113 / 58%)'
                        },
                        margin:{l: 50, r:15, t:15, b:35}
                    }}
            style={{ width: "100%"}}
        />
    )
}
