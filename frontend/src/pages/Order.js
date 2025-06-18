import {useState} from 'react';
import {useEffect} from 'react';
import axios from 'axios'

function PaymentField(props){
new StaxJs('Covestone-Corporations-67ca113d35e80f9e7c', {
  number: {
    id: 'card-number',
    placeholder: '0000 0000 0000 0000',
    style: 'width: 90%; height:90%; border-radius: 3px; border: 1px solid #ccc; padding: .5em .5em; font-size: 91%;'
  },
  cvv: {
    id: 'card-cvv',
    placeholder: '000',
    style: 'width: 30px; height:90%; border-radius: 3px; border: 1px solid #ccc; padding: .5em .5em; font-size: 91%;'
  }
});

staxJs.showCardForm().then(handler => {
  console.log('form loaded');
  handler.setTestPan('4111111111111111');
  handler.setTestCvv('123');
  var form = document.querySelector('form');
  form.querySelector('input[name=month]').value = 11;
  form.querySelector('input[name=year]').value = 2025;
  form.querySelector('input[name=cardholder-first-name]').value = 'Jon';
  form.querySelector('input[name=cardholder-last-name]').value = 'Doe';
  form.querySelector('input[name=phone]').value = '+1111111111111111';
})
.catch(err => {
  console.log('error init form ' + err);
  // reinit form
});

document.querySelector('#paybutton').onclick = () => {

  var form = document.querySelector('form');
  var extraDetails = {
    total: 1, // 1$
    firstname: form.querySelector('input[name=cardholder-first-name]').value,
    lastname: form.querySelector('input[name=cardholder-last-name]').value,
    company: '',
    email: '',
    month: form.querySelector('input[name=month]').value,
    year: form.querySelector('input[name=year]').value,
    phone: form.querySelector('input[name=phone]').value,
    address_1: '100 S Orange Ave',
    address_2: '',
    address_city: 'Orlando',
    address_state: 'FL',
    address_zip: '32811',
    address_country: 'USA',
    url: "https://app.staxpayments.com/#/bill/",
    method: 'card',
    // validate is optional and can be true or false. 
    // determines whether or not stax.js does client-side validation.
    // the validation follows the sames rules as the api.
    // check the api documentation for more info:
    // https://staxpayments.com/api-documentation/
    validate: false,
    // meta is optional and each field within the POJO is optional also
    meta: {
      reference: 'invoice-reference-num',// optional - will show up in emailed receipts
      memo: 'notes about this transaction',// optional - will show up in emailed receipts
      otherField1: 'other-value-1', // optional - we don't care
      otherField2: 'other-value-2', // optional - we don't care
      subtotal: 1, // optional - will show up in emailed receipts
      tax: 0, // optional - will show up in emailed receipts
      lineItems: [ // optional - will show up in emailed receipts
        {"id": "optional-fm-catalog-item-id", "item":"Demo Item","details":"this is a regular, demo item","quantity":10,"price":.1}
      ] 
    }
  };
  
  console.log(extraDetails);

  // call pay api
  staxJs.pay(extraDetails).then((result) => {
    console.log('pay:');
    console.log(result);
    if (result.id) {
      console.log('success')
    }
  })
  .catch(err => {
    // if a transaction did occur, but errored, the error will be in the message of the first child transactoin
    if (err.payment_attempt_message) {
      console.log('error')
    } else {
      // else, there may have been a validation error - and tokenization failed
      // err can contain an object where each key is a field name that points to an array of errors
      // such as {phone_number: ['The phone number is invalid']}
      console.log('error')
    }
  });
}

return (
<>
  <form onsubmit="return false;">
    <div class="group">
      <label>
        <span>First Name</span>
        <input 
 name="cardholder-first-name" class="field input-box" placeholder="Jane" />
      </label>
      <label>
        <span>Last Name</span>
        <input name="cardholder-last-name" class="field input-box" placeholder="Doe" />
      </label>
      <label>
        <span>Phone</span>
        <input name="phone" class="field input-box"  placeholder="+1000000000000" />
      </label>
    </div>
    <div class="group">
      <label>
        <span>Card</span>
        <div id="card-element" class="field">
          <div id="staxjs-number" style="width:180px; height:35px; display: inline-block; margin:3px"></div>
          <div id="staxjs-cvv" style="width:50px; height:35px; display: inline-block; margin:3px"></div>
        </div>
        <div style="width:40px; height:35px; display: inline-block;">
          <input name="month" size="3" maxlength="2" placeholder="MM" style="width: 22px; height:18px; border-radius: 3px; border: 1px solid #ccc; padding: .5em .5em; font-size: 91%;" />
        </div>
        /
        <div style="width:55px; height:35px; display: inline-block;padding: 0 8px 0 0">
          <input name="year" size="5" maxlength="4" placeholder="YYYY" style="width: 40px; height:18px; border-radius: 3px; border: 1px solid #ccc; padding: .5em .5em; font-size: 91%" />
        </div>
      </label>
    </div>
    <button id="paybutton">Pay $1</button>
  </form>
</>
)

}

function EditOrderRow(props){
const [inputs,setInputs] = useState({});
const [addItem,setAddItem] = useState(props.item);
const [updateHover,setUpdateHover] = useState(false);
const [deleteHover,setDeleteHover] = useState(false);

const handleChange = (event) => {
    const name = event.target.name;
    const value = parseInt(event.target.value,10);
    setInputs(values => ({...values,[name]:value}))
    setAddItem(values => ({...values,[name]:value}))
}

const updater = (event) => {
    props.onClick(props.item,addItem);
}

const deleter = (event) => {
    props.onClick2(props.item);
}
    
const EditOrderRowDiv = {        
    borderBottom:"1px solid #C5C5C5",
    backgroundColor:"rgba(0,0,0,.05)",
    textAlign:"left",
    width:"100%",
    height:"50px", 
    padding:"10px 0px 10px 0px"  
}
const EditOrderRowLDiv = {
    width:"160px",
    height:"90%",
    float:"left",
    padding:"0px 0px 0px 15px"
} 
const EditOrderRowMDiv = {
    width:"90px",
    height:"90%",
    float:"left",
    textAlign:"right",
    padding:"0px 0px 0px 0px"
} 
const EditOrderRowM2Div = {
    width:"45px",
    height:"90%",
    float:"left",
    textAlign:"right",
    padding:"0px 0px 0px 0px"
} 
const EditOrderRowRDiv = {
    textAlign:"right",
    width:"55px",
    height:"90%",
    float:"right",
    padding:"0px 15px 0px 0px"
}
const EditOrderRowH = {            
    color:"#000000",
    fontWeight:"100",
    fonSize:"13pt"
}
const EditOrderRowInput1 = {
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
const EditOrderRowInput2 = {
    height:"20px",
    width:"25px",   
    fontWeight:"100",
    fontSize:"10pt",
    border:"1px solid #C5C5C5",
    boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
    borderRadius:"4px",
    textAlign:"center",
    padding:"2px"
}
const SubmitButton = {
    width:"45px",
    height:"20px",
    backgroundColor: updateHover ? "rgba(255,165,0,1)" : "rgba(255,165,0,.75)",
    borderRadius:"4px",
    border:"1px solid #C5C5C5",
    boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
    color:"#FFFFFF",
    textAlign:"center",
    fontWeight:"200",
    padding:"0px",
    fontSize:"12px"
}
const DeleteButton = {
    width:"45px",
    height:"20px",
    backgroundColor: deleteHover ? "rgba(255,26,0,1)" : "rgba(255,26,0,.75)",
    borderRadius:"4px",
    border:"1px solid #C5C5C5",
    boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
    color:"#FFFFFF",
    textAlign:"center",
    fontWeight:"200",
    padding:"0px",
    fontSize:"12px"
}
    return (
    <>        
        <div style={EditOrderRowDiv}>
        <div style={EditOrderRowLDiv}>
            <b style={EditOrderRowH}>{addItem.description}</b>
        <br />
            <label style={EditOrderRowH}>
            <input
                type="text"
                name="modifications"
                value={inputs.modification || addItem.modification || "Add Modification"}
                style={EditOrderRowInput1}
                onChange={handleChange}
            />
            </label>
        </div>
        <div style={EditOrderRowMDiv}>
            <label style={EditOrderRowH}>Guest:
            <input
                type="text"
                name="guest"
                value={inputs.guest || addItem.guest || ""}
                style={EditOrderRowInput2}
                onChange={handleChange}
            />
            </label>
        <br />
            <label style={EditOrderRowH}>Qty:
            <input
                type="number"
                name="qty"
                value={inputs.qty || addItem.qty || ""}
                style={EditOrderRowInput2}
                onChange={(event) => handleChange(event)}
            />
            </label>
        </div>
        <div style={EditOrderRowM2Div}>
           <b style={EditOrderRowH}>${addItem.unit_price * addItem.qty}</b>
        </div>
        <div style={EditOrderRowRDiv}>
            <button style={SubmitButton} onMouseEnter={() => setUpdateHover(true)} onMouseLeave={() => setUpdateHover(false)} onClick={(event) => updater(event)}>Update</button>
        <br />
            <button style={DeleteButton} onMouseEnter={() => setDeleteHover(true)} onMouseLeave={() => setDeleteHover(false)} onClick={(event) => deleter(event)}>Delete</button>
        </div>
    </div>
    </>
    )  

}

function EditOrder(props){
    const [inputs,setInputs] = useState({});
    const [updatedOrder,setUpdatedOrder] = useState(props.workorder);
    const [locationHandler,setLocationHandler] = useState(props.location);
    const [selectedValue, setSelectedValue] = useState('');
    const [allAdd, setAllAdd] = useState([]);
    const [items, setItems] = useState([]);
    const [reload, setReload] = useState(false);
    const [updateHover,setUpdateHover] = useState(false);
    const [deleteHover,setDeleteHover] = useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values,[name]:value}))
        setUpdatedOrder(values => ({...values,[name]:value}))
    }

    const handleSelect = (event,order) => {
        const value = event.target.value;
        setSelectedValue(value);
        axios
        .get(`/api/items/${value}/`)
        .then((res) => {
            const item = {"id":"","order":order.id,"item":value,"description":res.data.description,"modification":"Add Modification","unit_price":res.data.price,"qty":1,"price":res.data.price,"guest":1}
            axios
                .post("/api/additems/", item)
                .then((res) => console.log(res));
                
            const utotal = parseFloat(updatedOrder.total) + parseFloat(res.data.price);
            setUpdatedOrder(values => ({...values,["total"]:utotal}))
            const uorder = {"id":props.workorder.id,"location":props.location.id,"table":updatedOrder.table,"guests":updatedOrder.guests,"total":utotal,"finalized_list":props.workorder.finalized_list,"completed":false}
            axios
                .put(`/api/orders/${props.workorder.id}/`, uorder)
                .then((res) => console.log(res));
        })
        setSelectedValue('')
        setReload(true);
    };

    const handleSubmit = (event) => {
        //event.preventDefaults();
        console.log('event');
    }

        useEffect(() => {
        const fetchData = async () => {
            await axios
                .get("api/items/")
                .then((response) => {setItems(response.data)})
                .catch ((error) => {
                    console.log("Error fetching data:", error)
                })

            await axios
                .get("/api/additems/") // Replace with your API URL
                .then((response) => {setAllAdd(response.data)})
                .catch ((error) => {
                    console.log("Error fetching data:", error);
                })
        };  
        setReload(false);      
        fetchData();
    }, [reload]);
    
    const handleUpdate = (event, order) => {
        if (updatedOrder.id === order.id && updatedOrder.id != null){
            axios
                .put(`/api/orders/${order.id}/`, updatedOrder)
                .then((res) => setReload(true))
        }        
        else{
            const uorder = {"id":"","location":props.location.id,"table":updatedOrder.table,"guests":updatedOrder.guests,"total":0.00,"finalized_list":{"default":true},"completed":false}           
            const new_guests = props.location.guests + parseInt(updatedOrder.guests);
            const new_avail = props.location.avail - 1;
            const new_taken = props.location.taken + 1;
            const uloc = {"id":props.location.id,"name":props.location.name,"tables":props.location.tables,"taken":new_taken,"avail":new_avail,"guests":new_guests,"staff":0,"waiting":0}             
            axios
                .put(`/api/locations/${props.location.id}/`,uloc)
                .then((res) => console.log(res))
                .catch ((eror) => {
                    console.log("Error fetching data:", eror)
                    alert(eror)
                })            
            axios
                .post('/api/orders/',uorder)
                .then((res) => console.log(res))
                .catch ((eror) => {
                    console.log("Error fetching data:", eror)
                    alert(eror)
                })
            setReload(true)
        }
    }

    const handleDelete = (event, order) => {
            const new_guests = props.location.guests - parseInt(updatedOrder.guests);
            const new_avail = props.location.avail + 1;
            const new_taken = props.location.taken - 1;
            const uloc = {"id":props.location.id,"name":props.location.name,"tables":props.location.tables,"taken":new_taken,"avail":new_avail,"guests":new_guests,"staff":0,"waiting":0}     
            axios
                .put(`/api/locations/${props.location.id}/`,uloc)
                .then((res) => console.log(res))
                .catch ((eror) => {
                    console.log("Error fetching data:", eror)
                    alert(eror)
                })            
        setUpdatedOrder([]);
        axios
            .delete(`/api/orders/${order.id}/`)
            .then((res) => setReload(true))
    }

    const handleLIUpdate = (item, uitem) => {
        if (uitem.id === item.id) {
            axios
                .put(`/api/additems/${item.id}/`, uitem)
                .then((res) => console.log(res));

            const utotal = parseFloat(updatedOrder.total) + parseFloat(item.qty * item.unit_price);
            setUpdatedOrder(values => ({...values,["total"]:utotal}))
            const uorder = {"id":props.workorder.id,"location":props.location.id,"table":updatedOrder.table,"guests":updatedOrder.guests,"total":utotal,"finalized_list":props.workorder.finalized_list,"completed":false}
            axios
                .put(`/api/orders/${props.workorder.id}/`, uorder)
                .then((res) => console.log(res));
            setReload(true)
            return;
        }
    }

    const handleLIDelete = (item) => {
        axios
            .delete(`/api/additems/${item.id}/`)
            .then((res) => console.log(res));
        
        const utotal = parseFloat(updatedOrder.total) - parseFloat(item.qty * item.unit_price);
        setUpdatedOrder(values => ({...values,["total"]:utotal}))
        const uorder = {"id":props.workorder.id,"location":props.location.id,"table":updatedOrder.table,"guests":updatedOrder.guests,"total":utotal,"finalized_list":props.workorder.finalized_list,"completed":false}
        axios
           .put(`/api/orders/${props.workorder.id}/`, uorder)
           .then((res) => console.log(res));
        setReload(true)
        return;
    }

const EditOrderDiv = {
    border:"1px solid #C5C5C5",
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',        
    boxShadow: '0px 2px  rgba(0,0,0,.25)',
    width:"400px",
    height:"450px",
    margin:"20px",
    textAlign:"center",
    float:"left"
}
const EditOrderHeadingDiv = {        
    borderBottom:"1px solid #C5C5C5",
    width:"100%",
    height:"50px"
}
const EditOrderHeadingH = {        
    color:"#555555",
    width:"70%",
    height:"25px",
    textAlign:"center",
    fontWeight:"200",
    fontSize:"14pt",
    margin:"15px auto",
    padding:"0"
}
const EditOrderSubHeadingDiv = {        
    borderBottom:"1px solid #C5C5C5",
    width:"100%",
    height:"50px",
    padding:"15px 0px 0px 0px" 
}
const EditOrderSubHeadingH = {            
    color:"#000000",
    paddingLeft:"10px",
}
const EditOrderSubHeadingInput1 = {    
    height:"20px",
    width:"55px",   
    fontWeight:"100",
    fontSize:"10pt",
    border:"1px solid #C5C5C5",
    boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
    borderRadius:"4px",
    textAlign:"center",
    padding:"2px"
}
const EditOrderBottomRowDiv = {        
    borderBottom:"1px solid #C5C5C5",
    backgroundColor:"rgba(0,0,0,.05)",
    textAlign:"left",
    width:"95%",
    height:"50px", 
    padding:"5px 0px 0px 5%"  
}

const EditOrderRowHouseDiv = {
    overflowY:"scroll",
    maxHeight:"250px"
}
const SubmitButton = {
    width:"45px",
    height:"20px",
    backgroundColor: updateHover ? "rgba(255,165,0,1)" : "rgba(255,165,0,.75)",
    borderRadius:"4px",
    border:"1px solid #C5C5C5",
    boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
    color:"#FFFFFF",
    textAlign:"center",
    fontWeight:"200",
    padding:"0px",
    fontSize:"12px"
}
const SubmitButton2 = {
    width:"90px",
    height:"20px",
    backgroundColor: updateHover ? "rgba(255,165,0,1)" : "rgba(255,165,0,.75)",
    borderRadius:"4px",
    border:"1px solid #C5C5C5",
    boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
    color:"#FFFFFF",
    textAlign:"center",
    fontWeight:"200",
    padding:"0px",
    fontSize:"12px"
}
const DeleteButton = {
    width:"45px",
    height:"20px",
    backgroundColor: deleteHover ? "rgba(255,26,0,1)" : "rgba(255,26,0,.75)",
    borderRadius:"4px",
    border:"1px solid #C5C5C5",
    boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
    color:"#FFFFFF",
    textAlign:"center",
    fontWeight:"200",
    padding:"0px",
    fontSize:"12px"
}
    return(
        <div style={EditOrderDiv}>
            <div style={EditOrderHeadingDiv}>
                <div style={EditOrderHeadingH}><b>{props.location.name}</b></div>
            </div>
            <form onSubmit={(event) => handleUpdate(event,props.workorder)}>
                <div style={EditOrderSubHeadingDiv}>
                    <label style={EditOrderSubHeadingH}>Table:
                    <input 
                        type="text" 
                        name="table" 
                        value={inputs.table || updatedOrder.table || ""} 
                        style={EditOrderSubHeadingInput1}
                        onChange={handleChange}
                    />
                    </label>
                    <label style={EditOrderSubHeadingH}>Guests:
                    <input 
                        type="number" 
                        name="guests" 
                        value={inputs.guests || updatedOrder.guests || ""} 
                        style={EditOrderSubHeadingInput1}
                        onChange={handleChange}
                    />
                    </label>
                    <button style={DeleteButton} onClick={(event) => props.OnClick(event,updatedOrder)} onMouseEnter={() => setDeleteHover(true)} onMouseLeave={() => setDeleteHover(false)}>Pay</button>
                </div>
                <div style={EditOrderRowHouseDiv}>
                {allAdd.map((item) => (
                    <>
                    {(item.order === props.workorder.id) && <EditOrderRow key={item.id} item={item} product={items[item.item - 1]} onClick={handleLIUpdate} onClick2={handleLIDelete}/> }
                    </>
                ))}
                </div>
                {!(props.blanks) && (
                    <>
                <div style={EditOrderBottomRowDiv}>
                <label>
                    Choose an Item:
                    <select value={selectedValue} onChange={(event) => handleSelect(event, props.workorder)}>
                        <option value="">Select a Menu Item</option>
                        {items.map((product) => (
                        <option key={product.id} value={product.id}>{product.description}</option>
                        ))}
                    </select>
                </label>
                <label style={EditOrderSubHeadingH}>Total: $
                    <input 
                        type="number" 
                        name="total" 
                        value={inputs.total || updatedOrder.total || ""} 
                        style={EditOrderSubHeadingInput1}
                        onChange={handleChange}
                    />
                    </label>
                </div>
                    <input type="submit" style={SubmitButton} onMouseEnter={() => setUpdateHover(true)} onMouseLeave={() => setUpdateHover(false)} /><button style={DeleteButton} onClick={(event) => handleDelete(event,props.workorder)} onMouseEnter={() => setDeleteHover(true)} onMouseLeave={() => setDeleteHover(false)}>Delete</button>
                    </>
                )}
                {(props.blanks) && (
                    <>
                    <input type="submit" style={SubmitButton2} onMouseEnter={() => setUpdateHover(true)} onMouseLeave={() => setUpdateHover(false)} />                    
                    </>
                )}
            </form>
        </div>
    )
}

function OrderLocationElement(props){
    const [locationHover,setLocationHover] = useState(false);
    const LocationDiv= {
        border:"1px solid #C5C5C5",
        backgroundColor: '#FFFFFF',
        width:"350px",
        height:"135px",
        borderRadius:"8px",
        margin:"20px",
        boxShadow: '0px 2px  rgba(0,0,0,.25)',
        textAlign:"center",      
    }
    const LocationHeadingDiv = {
        borderBottom:"1px solid #C5C5C5",
        width:"350px",
        height:"50px"
    }
    const LocationHeadingH = {
        color:"#555555",
        width:"150x",
        height:"25px",
        textAlign:"left",
        fontWeight:"200",
        fontSize:"14pt",
        margin:"10px",
        float:"left",
        padding:"0"
    }
    const SubmitButton = {
        width:"75px",
        height:"25px",
        backgroundColor: locationHover ? "rgba(255,165,0,1)" : "rgba(255,165,0,.75)",
        borderRadius:"4px",
        border:"1px solid #C5C5C5",
        boxShadow:"1px 1px 1px 1px rgba(0,0,0,.25)",
        color:"#FFFFFF",
        textAlign:"center",
        fontWeight:"200",
        fontSize:"12px",
        float:"right",
        margin:"10px"
    }
    const LocationInfoDiv = {
        width:"350px",
        height:"80px"
    }
    const LocationInfoCol = {
        width:"30%",
        height:"70px",
        fontWeight:"100",
        fontSize:"11pt",
        float:"left",
        margin:"5px"
    }
    return (
        <div style={LocationDiv}>
            <div style={LocationHeadingDiv}>
                <div style={LocationHeadingH}><b>{props.location.name}</b></div>
                <button style={SubmitButton} onMouseEnter={() => setLocationHover(true)} onMouseLeave={() => setLocationHover(false)} onClick={props.onClick}>New Order</button>            
            </div>
            <div style={LocationInfoDiv}>
                <div style={LocationInfoCol}>
                    <b>Total Tables: {props.location.tables}</b>
                    <br />
                    <br />
                    <b>Available: {props.location.avail}</b>
                </div>
                <div style={LocationInfoCol}>
                    <b>Dining: {props.location.taken}</b>
                    <br />
                    <br />
                    <b>Registers: {props.location.waiting}</b>
                </div>
                <div style={LocationInfoCol}>
                    <b>Guests: {props.location.guests}</b>
                    <br />
                    <br />
                    <b>Staff: {props.location.staff}</b>
                </div>
            </div>
        </div>
    )
}

function OrderListRow(props){    
    const [isHovering, setIsHovering] = useState(false);
    const OrderListRowDiv = {
        borderBottom:"1px solid #C5C5C5",
        backgroundColor: isHovering ? 'rgba(0,0,0,.05)' : 'rgba(0,0,0,0)',
        width:"100%",
        height:"50px",
        textAlign:"left" 
    }
    const ListRowB1 = {        
        color:"#000000",
        fontWeight:"100",
        fontSize:"13pt",
        paddingLeft:"10px",
    }
    const ListRowB1v2 = {        
        color:"#000000",
        fontWeight:"100",
        fontSize:"13pt",
        paddingRight:"10px",
        float:"right"
    }
    const ListRowB2 = {        
        color:"#000000",
        fontWeight:"100",
        fontSize:"11pt",
        paddingLeft:"10px"
    }
    return (
        <div style={OrderListRowDiv} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} onClick={props.onClick}>
            <b style={ListRowB1}>Table {props.order.table}</b><b style={ListRowB1v2}>Guests: {props.order.guests}</b>
            <br />
            <b style={ListRowB2}>{props.location.name}</b>
        </div>
    )
}

function Order(){
    const [toggleComp,setToggleComp] = useState(false)
    const [togglePay,setTogglePay] = useState(false)
    const [currOrd,setCurrOrd] = useState([])
    const [payOrd, setPayOrd] = useState([])
    const [items,setItems] = useState([])
    const [openOrds,setOpenOrds] = useState([])
    const [locs,setLocs] = useState([])
    const [blanks,setBlanks] = useState(true)


    useEffect(() => {
        const fetchData = async () => {            
            await axios
                .get("/api/locations/")
                .then((response) => {setLocs(response.data)})
                .catch ((eror) => {
                    console.log("Error fetching data:", eror)
                })

            await axios
                .get("/api/orders/") // Replace with your API URL
                .then((response) => {setOpenOrds(response.data)})
                .catch ((error) => {
                    console.log("Error fetching data:", error);
                })

            await axios
                .get("/api/items/")
                .then((response) => {setItems(response.data)})
                .catch ((eror) => {
                    console.log("Error fetching data:", eror)
                })
        };        
        fetchData();
    }, []);

    const handleToggle = (event, order, id) => {
        if(toggleComp){
             setCurrOrd([]);
             setToggleComp(false);
        }
        else{
            setToggleComp(true)};
            if(order === "blank"){
                setCurrOrd([]);
                setCurrOrd(values => ({...values,["location"]:id}));        
            }
            else {                
                setBlanks(false);
                setCurrOrd(order);
            }
    }
    
    const handlePayToggle = (event, order) => {   
        setCurrOrd([]);
        setToggleComp(false);
        if(togglePay){
             setPayOrd([]);
             setTogglePay(false);
        }
        else{
            setPayOrd(order)
            setTogglePay(true)};
    }

    const HouseDiv = {
        backgroundImage:"linear-gradient( rgba(9,9,93,.7), rgba(9,9,93,.2), rgba(9,9,93,.7))",
        padding:"30px 5% 30px 5%",
        width:"100%",
        height:"600px",
        TextAlign:"center"
    }
    const OrdersDiv = {
        border:"1px solid #C5C5C5",
        backgroundColor: '#FFFFFF',
        width:"200px",
        height:"450px",
        borderRadius:"8px",
        margin:"20px",
        boxShadow: '0px 2px  rgba(0,0,0,.25)',
        textAlign:"center",
        float:"left"        
    }
    const OrdersH = {
        color:"#555555",
        width:"100%",
        height:"25px",
        textAlign:"center",
        fontWeight:"200",
        fontSize:"14pt",
        margin:"10px auto 10px auto",
        padding:"0"
    }
    const OrdersListDiv = {
        border:"1px solid #C5C5C5",
        backgroundColor: 'rgba(0,0,0,.05)',
        width:"200px",
        height:"375px",
        margin:"0px",
        textAlign:"center",
        float:"left"
    }
    const LocationsHouseDiv = {
        width:"400px",
        height:"400px",
        backgroundColor:"rgba(0,0,0,0)",
        float:"left"
    }
    
    return (    
        <div style={HouseDiv}>
            <div style={OrdersDiv}>
                <div style={OrdersH}>
                    <b>Open Orders</b>
                </div>

                <div style={OrdersListDiv}>
                {openOrds.map((order) => (
                    <>
                        <OrderListRow key={order.id} order={order} location={locs[order.location - 1]} onClick={(event) => handleToggle(event, order)}/>
                    </>
                ))}
                </div>
            </div>

            <>
            {toggleComp && <EditOrder location={locs[currOrd.location - 1]} workorder={currOrd} blanks={blanks} onClick={handlePayToggle}/>}
            {payComp && <PaymentField payorder={payOrd} />}
            </>

            <div style={LocationsHouseDiv}>
                {locs.map((location) => (
                    <>
                        <OrderLocationElement key={location.id} location={location} orders={openOrds} onClick={(event) => handleToggle(event,"blank",location.id)}/>
                    </>
                ))}
            </div>

        </div>
    )
}

export default Order;