import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios'

function MenuListRow(props){    
    const [inputs,setInputs] = useState({});
    const [isSelected, setIsSelected] = useState(false);
    const [updateHover, setUpdateHover] = useState(false);
    const [deleteHover, setDeleteHover] = useState(false);
    const [currItem, setCurrItem] = useState(props.item);

        const handleUpdate = (event, item) => {
            if (currItem.id === item.id && currItem.id != null){
                axios
                    .put(`/api/items/${item.id}/`, currItem)
                    .then((res) => window.location.reload())
            }
            else{
                const uitem = {"id":"","description":currItem.description,"recipe":currItem.recipe,"cost":currItem.cost,"price":currItem.price};
                axios
                    .post('/api/items/',uitem)
                    .then((res) => window.location.reload())
            }
        }
    
        const handleDelete = (event, item) => {
            axios
                .delete(`/api/items/${item.id}/`)
                .then((res) => window.location.reload())
        }

    const handleSelectedChange = (event) => {
        setIsSelected(event.target.checked);
    };

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values,[name]:value}))
      setCurrItem(values => ({...values,[name]:value}))
    }
    const MenuListRowDiv = {
        borderBottom:"1px solid #C5C5C5",
        //backgroundColor: isHovering ? 'rgba(0,0,0,.05)' : 'rgba(0,0,0,0)',\
        width:"100%",
        height:"50px",
    }
    const MenuListRowH = {            
        color:"#000000",
        fontWeight:"300",
        fonSize:"13pt"
    }
    const MenuListRowInput1 = {
        height:"20px",
        width:"120px",   
        fontWeight:"100",
        fontSize:"10pt",
        border:"1px solid #C5C5C5",
        boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
        borderRadius:"4px",
        textAlign:"center",
        padding:"2px"
    }
    const MenuListRowInput2 = {
        height:"20px",
        width:"50px",   
        fontWeight:"100",
        fontSize:"10pt",
        border:"1px solid #C5C5C5",
        boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
        borderRadius:"4px",
        textAlign:"center",
        padding:"2px"
    }
    const UpdateButton = {
    width:"75px",
    height:"20px",
    backgroundColor: updateHover ? "rgba(255,165,0,1)" : "rgba(255,165,0,.75)",
    borderRadius:"4px",
    border:"1px solid #C5C5C5",
    boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
    color:"#FFFFFF",
    textAlign:"center",
    fontWeight:"200",
    padding:"0px",
    margin:"0px auto 0px auto",
    fontSize:"12px"
    }
    const DeleteButton = {
    width:"75px",
    height:"20px",
    backgroundColor: deleteHover ? "rgba(255,26,0,1)" : "rgba(255,26,0,.75)",
    borderRadius:"4px",
    border:"1px solid #C5C5C5",
    boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
    color:"#FFFFFF",
    textAlign:"center",
    fontWeight:"200",
    padding:"0px",
    margin:"0px auto 0px auto",
    fontSize:"12px"
    }
    
const AddButton = {
    width:"75px",
    height:"20px",
    backgroundColor: updateHover ? "rgba(255,165,0,1)" : "rgba(255,165,0,.75)",
    borderRadius:"4px",
    border:"1px solid #C5C5C5",
    boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
    color:"#FFFFFF",
    textAlign:"center",
    fontWeight:"200",
    padding:"0px",
    margin:"0px auto 0px auto",
    fontSize:"12px"
}

    return(        
        <tr style={MenuListRowDiv}>
            <td><input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleSelectedChange}
                />
            </td>
            {!(props.last) && <td style={MenuListRowH}>{props.item.description}</td>}
            {(props.last) && (
                <td><input
                    type="text"
                    name="description"
                    style={MenuListRowInput1}
                    value={inputs.description || props.item.description || ""}
                    onChange={handleChange}
                />                    
                </td>
            )
            }
            <td><input
                    type="text"
                    name="recipe"
                    style={MenuListRowInput1}
                    value={inputs.recipe || props.item.recipe || ""}
                    onChange={handleChange}
                />                    
            </td>
            <td><input
                    type="text"
                    name="cost"
                    style={MenuListRowInput2}
                    value={inputs.cost || props.item.cost || ""}
                    onChange={handleChange}
                />
            </td>
            <td><input
                    type="text"
                    name="price"
                    style={MenuListRowInput2}
                    value={inputs.price || props.item.price || ""}
                    onChange={handleChange}
                />
            </td>
            {!(props.last) && 
            <td>
                <button style={UpdateButton} onMouseEnter={() => setUpdateHover(true)} onMouseLeave={() => setUpdateHover(false)} onClick={(event) => handleUpdate(event,props.item)}>Update</button>
                <button style={DeleteButton} onMouseEnter={() => setDeleteHover(true)} onMouseLeave={() => setDeleteHover(false)} onClick={(event) => handleDelete(event,props.item)}>Delete</button>
            </td>
            }
            {(props.last) && 
            <td>
                <button style={AddButton} onMouseEnter={() => setUpdateHover(true)} onMouseLeave={() => setUpdateHover(false)} onClick={(event) => handleUpdate(event,"")}>Add Item</button>
            </td>
            }
        </tr>
    )
}

function Menu(){

    const [items,setItems] = useState([])
    const [reload,setReload] = useState(false)

    const Signal = (event) => {
        setReload(true);
    }

    useEffect(() => {
        const fetchData = async () => {      
            await axios
                .get("/api/items/")
                .then((response) => {setItems(response.data)})
                .catch ((eror) => {
                    console.error("Error fetching data:", eror)
                })
        };  
        setReload(false);      
        fetchData();
    }, [reload]);


const HouseDiv = {
    backgroundImage:"linear-gradient( rgba(9,9,93,.7), rgba(9,9,93,.2), rgba(9,9,93,.7))",
    padding:"30px 5% 30px 5%",
    width:"100%",
    height:"600px",
    margin:"auto",
    TextAlign:"center"
}
const MenuDiv = {
    border:"1px solid #C5C5C5",
    backgroundColor: '#FFFFFF',
    width:"600px",
    height:"450px",
    borderRadius:"8px",
    margin:"auto",
    boxShadow: '0px 2px  rgba(0,0,0,.25)',
    textAlign:"center",
    float:"left"        
}
const MenuHDiv = {
    borderBottom:"1px solid #C5C5C5",
    width:"100%",
    height:"50px",
    margin:"auto",
    padding:"10px 0 0 0",
    textAlign:"center"
}
const MenuH = {
    color:"#555555",
    width:"100%",
    height:"25px",
    textAlign:"center",
    fontWeight:"200",
    fontSize:"14pt",
    margin:"10px auto 10px auto",
    padding:"0"
}
const MenuListHeader = {            
    color:"#000000",
    fontWeight:"400",
    fonSize:"14pt"
}
const MenuListDiv = {
    border:"1px solid #C5C5C5",
    backgroundColor: 'rgba(0,0,0,.05)',
    width:"100%",
    height:"390px",
    margin:"0px",
    textAlign:"center",
    overflowY: "scroll",
    scrollbarColor:" #C5C5C5 #F5F5F5",
    scrollbarWidth: "thin",
    borderRadius:"8px",
    float:"left"
}
    return (
        <div style={HouseDiv}>
            <div style={MenuDiv}>
            <div style={MenuHDiv}>
                <b style={MenuH}>Menu Maintenance</b>
            </div>
            <div style={MenuListDiv}>
                <table>
                <th style={MenuListHeader} width="5%">Available</th><th style={MenuListHeader} width="30%">Item</th><th style={MenuListHeader} width="50%">Recipe</th><th style={MenuListHeader} width="5%">Cost</th><th style={MenuListHeader} width="5%">Price</th><th style={MenuListHeader} width="5%">Confirm</th>
                {items.map((item) => (
                    <MenuListRow key={item.id} item={item} last={false} signal={Signal}/>
                ))}
                <MenuListRow item={[]} last={true}/>
                </table>
            </div>
            </div>
        </div>
    )
}

export default Menu;