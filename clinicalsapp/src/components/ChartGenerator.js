import React from 'react';
import { Line} from 'react-chartjs-2';
import axios from 'axios';


const initData = {
    
    labels:[],
    datasets:[
        {
            label:'HeartRate',
            borderWidth : 8
        }
    ]
}

class ChartGenerator extends React.Component{

    constructor(props){

        super(props);
        this.state={
            chartData:initData
        }
    }


    componentWillMount(){
        axios.get("http://localhost:8080/clinicalservices/api/clinicals/"
        +this.props.match.params.patientId+"/"+this.props.match.params.componentName).then(res=>{
            console.log(res.data)
           this.setState(res.data)
            var d =res.data
            console.log(d)
           for(var i = 0; i< d.length;i++){
               initData.labels[i] = d[i].measuredDateTime;
               initData.datasets[0].data[i] = d[i].componentValue;
           }
           this.setState({initData})
       })
    }
    // componentWillMount(){
    //     axios.get('http://localhost:8080/clinicalservices/api/patients/analyze/'
    //     +this.props.match.params.patientId).then(res=>{
    //         console.log(res.data)
    //        this.setState(res.data)
           
    //        var heartrateData = res.data.clinicalData.filter(component=>component.componentName==='heartrate')
    //        console.log(heartrateData)
    //        for(var i = 0; i< heartrateData.length;i++){
    //            initData.labels[i] = heartrateData[i].measuredDateTime;
    //            initData.datasets[0].data[i] = heartrateData[i].componentValue;
    //        }
    //        this.setState({initData})
    //    })
    // }
    render(){

        return(
            <div>
                <Line data={this.state.chartData}/>
            </div>
        )
    }

}

export default ChartGenerator;