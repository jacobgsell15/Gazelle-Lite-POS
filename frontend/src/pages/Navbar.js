import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";

function NavElement(props){
    const [isHovering, setIsHovering] = useState(false);
    const HeadingsDiv = {
        height:"20px",
        display:"inline-block",
        backgroundColor: isHovering ? 'rgba(9,9,93,.1)' : 'rgba(9,9,93,.0)',
        margin:"5px 5px 5px 0",
        padding:"5px",
        textAlign:"center",
        textDecoration:"none",
        verticalAlign:"center",
        border: isHovering ? '1px solid #D9D9D9' : 'none',
        borderRadius: isHovering ? '10px' : 'none',
        float:"right"      
    }
    const HeadingsB = {        
        color:"#555555",
        textAlign:"center",
        fontWeight:"400",
        fontSize:"12pt",
        textDecoration:"none",
        font:"sans-serif"
    }
    return (
        <div style={HeadingsDiv} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Link to={props.heading.link} style={HeadingsB}>{props.heading.title}</Link>
        </div>
    )
}
function Navbar(){    
    const [isHovering, setIsHovering] = useState(false);
    const headings = [
    {id:0, title:'Reports', link: '/reports'},
    {id:1, title:'Menu', link: '/menu'},
    {id:2, title:'Orders', link: '/order'}
  ];

    const NavbarDiv = {
        height:"55px",
        width:"100%",
        margin:"0px",
        padding:"0 0 0 0",
        backgroundColor:"rgba(9,9,93,.1)",
        border:"1px solid #D9D9D9",
        boxShadow: "2px 2px  #D9D9D9",
        borderRadius:"8px",
    }
    const LogoDiv = {
        height:"50px",
        width:"75px",
        border: isHovering ? '1px solid rgba(9,9,93,.1)' : '1px solid rgba(9,9,93,.0)',
        backgroundImage: "url('./Logo1.png')",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        margin:"auto",
        padding:"5px",
        textAlign:"center",
        verticalAlign:"center",
        borderRadius: isHovering ? '10px' : 'none',
        float:"left"
    }
    return(
        <>
        <nav>
        <div style={NavbarDiv}>
            <div style={LogoDiv} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <Link to="/app"></Link>
            </div>
            {headings.map((heading) => <NavElement key={heading.id} heading={heading}/>)}
        </div>
        </nav>

        <Outlet />
        </>
    )
}

export default Navbar;