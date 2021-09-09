import React,  {Component}  from "react";
import Loading from './Loading.js';
import Panel from "./Panel.js";
import classnames from "classnames";

//Fake data

const data = [
  {
    id: 1,
    label: "Total Interviews",
    value: 6
  },
  {
    id: 2,
    label: "Least Popular Time Slot",
    value: "1pm"
  },
  {
    id: 3,
    label: "Most Popular Day",
    value: "Wednesday"
  },
  {
    id: 4,
    label: "Interviews Per Day",
    value: "2.3"
  }
];


//Component
class Dashboard extends Component {
  state = { 
    loading: true,
    focused: null,
    days: [],
    appointments: {},
    interviewers: {}
  }
  
  selectPanel(id) {
    this.setState(prev => ({
      focused: prev.focused !== null ? null : id
    }));
  }

  componentDidMount() {
    const focused = JSON.parse(localStorage.getItem("focused"));

    if (focused) {
      this.setState({ focused });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousState.focused !== this.state.focused) {
      localStorage.setItem("focused", JSON.stringify(this.state.focused));
    }
  }
    

  render() {
    const dashboardClasses = classnames("dashboard", {
      "dashboard--focused": this.state.focused
     });

    if (this.state.loading) {
      return <Loading />
    }

    const panelArray = data
      .filter(panel => this.state.focused === null || this.state.focused === panel.id)
      .map(panel => <Panel key={panel.id} label={panel.label} value={panel.value} onSelect={() => this.selectPanel(panel.id)}/>)


    return <main className={dashboardClasses} >
      {panelArray}
    </main>
  }
}

export default Dashboard;
