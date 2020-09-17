import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



class RowCreator extends React.Component{

  render(){

    var data = this.props.item;

    return(<tr>
            <td>{data.id}</td>
            <td>{data.firstName}</td>
            <td>{data.lastName}</td>
            <td>{data.age}</td>
            <td> <Link to={'/patientDetails/'+data.id}>Add Data</Link></td>
            <td> <Link to={'/analyze/'+data.id}>Analyze Data</Link></td>
        </tr>
    )
  }
}

class Home extends React.Component{

state = {
    patientData:[]
}
componentWillMount(){

    axios.get("http://localhost:8080/clinicalservices/api/patients").then(res=>{
        const patientData = res.data;
        this.setState({patientData});
    })
}

    render(){

        return(
            <div>
                <h2>Patients:</h2>
                <table align="center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.patientData.map(patient=><RowCreator item={patient}/>)}
                   </tbody>
                </table>
                <br/>
                <Link to={'/addPatient/'}><font size="5">Register Patient</font></Link>
            </div>
        )
    }

}

export default Home;