import './App.css';
import { useState } from 'react';
import Order from './Order';

function Floater(props) {
  const [isHover, setIsHover] = useState(false);
  const FloaterDiv = {
    border:"1px solid #C5C5C5",
    backgroundColor: isHover ? '#F5F5FF' : '#FFFFFF',
    width:"300px",
    height:"150px",
    borderRadius:"8px",
    margin:"20px",
    boxShadow: isHover ? '0px 4px  rgba(0,0,0,.25)' : '0px 2px  rgba(0,0,0,.25)',
    textAlign:"center",
    float:"left"
  }
  const FloaterP = {  
    color:"#B3B3B3",
    textAlign:"center",
    width:"75%",
    fontWeight:"300",
    fontSize:"12pt",
    font:"sans-serif",
    margin:"0px auto 10px auto",
    padding:"0"
  }
  const FloaterH = {
    color:"#555555",
    width:"100%",
    textAlign:"top center",
    fontWeight:"400",
    fontSize:"15pt",
    font:"sans-serif",
    margin:"10px auto 0px auto",
    padding:"0"
  }
  return (
    <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} style={FloaterDiv}>
      <div style={FloaterH}>
        <b>{props.floater.title}</b>
      </div>
      <br />
      <div style={FloaterP}>
        <p>{props.floater.description}</p>
      </div>
    </div>
  )
}

function App() {
  const HouseDiv = {
    backgroundImage:"linear-gradient( rgba(9,9,93,.7), rgba(9,9,93,.2), rgba(9,9,93,.7))",
    padding:"30px",
    width:"100%",
    height:"600px",
    TextAlign:"center"
  }
  const FloatersDiv = {
    width:"90%",
    margin:"0 auto 0 auto"
  }
  const floaters = [
    {id:0, title:'Orders', description: 'Create New Orders and View Existing Ones', link: '/order'},
    {id:1, title:'Menu', description: 'View and Add to the Menu, as well as Update Pricing', link: '/order'},
    {id:2, title:'Employees', description: 'Clock Employees In and Out, as well as View Timesheets', link: '/order'},
    {id:3, title:'Analytics', description: 'Track Trends, Employee Productivity, and Download Reports', link: '/order'},
    {id:4, title:'Scheduling', description: 'Schedule Employees, Delivery’s, and Events (Reservations, Parties, etc.)', link: '/order'},
    {id:5, title:'Setup', description: 'Add and Remove Employees, as well as Customize Wages', link: '/order'}
  ];
  return (
    <div style={HouseDiv}>
      <div style={FloatersDiv}>
      {floaters.map((floater) => (
        <div key={floater.id}>
          <Floater floater={floater} />
        </div>
      ))}
      </div>
    </div>
  );
}

export default App;
