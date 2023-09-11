import { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css";
import {Button, Alert, Row, Col} from 'react-bootstrap';
import Header from "./components/Header";
import {Form} from 'react-bootstrap';
import {Image} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import "./App.css"
 
export default function App(){
  const [CardInputs, setCardInputs] = useState({
    NameOnCard: "",
    CardNumber:"",
    ExpiryDay:"",
    ExpiryMonth:"",
    CVV:"",
    Country:""
  });
  const [card, setCards] = useState(() => {
    const localValue = localStorage.getItem("CARDS")
    if(localValue == null){
      return []
    }
    return JSON.parse(localValue)
  });
  const [country, getCountry] = useState([]);
  const [CardNumberArr, getCardNumber] = useState([]);
  //Create a list of banned countries
  const [bannedCountry, getbannedCountry] = useState(["Iran", "Cuba", "North Korea", "Sudan", "Syria", "Ukraine"]);

  useEffect(() => {
    localStorage.setItem("CARDS", JSON.stringify(card))
    localStorage.setItem("BANNEDLIST", JSON.stringify(bannedCountry))
  }, [card, bannedCountry])

  useEffect(() => {
    // Retrieve the stored JSON strings from localStorage AND Parse the JSON strings to get the object and array
    const StoredBannedArr = JSON.parse(localStorage.getItem("BANNEDLIST"));
    // Set the state with the retrieved data
    if (StoredBannedArr) {
      getbannedCountry(StoredBannedArr);
    }
  }, []);

  //Submit everything on the foem
  function handleSubmit (e) {
    e.preventDefault();
    console.log("Step1");
    const newNCountry = CardInputs.Country;
    CardValidation();
      // Use fetc0h to load the file content
      fetch('/countries.txt')
        .then((Coderesponse) => {
          if (Coderesponse.ok) {
            return Coderesponse.text();
          }else{
            throw Coderesponse;
          }
        })
        .then((countryToArr) => {
          // Split the content into an array
          const arr = countryToArr.split(/\r?\n/);
          
          const GetSpecificCoun = arr.filter((country) =>
          country.toLowerCase().includes(newNCountry.toLowerCase())
          );

          //Check if the Card Number exists
          const Checkbanned = bannedCountry.filter((country) =>
            country.toLowerCase().includes(CardInputs.Country.toLowerCase())
          );

 
          if(CardNumberArr.includes(CardInputs.CardNumber)){
            alert("Card Number already exists");
            return;
          }else if(Checkbanned.length > 0 && CardInputs.Country !== ""){
            alert("You selected a banned country");
            return;
          }else if(GetSpecificCoun.length === 0){
            alert("The country doesn't exist");
            return;
          }
          else{
            console.log("False");
            console.log("True");
            // getCountry(GetSpecificCoun);
            setCards((latestCard) => {
              return [
                ...latestCard, {NameOnCard: CardInputs.NameOnCard, CardNumber:CardInputs.CardNumber, ExpiryDay: CardInputs.ExpiryDay ,ExpiryMonth:CardInputs.ExpiryMonth ,CVV: CardInputs.CVV, Country: CardInputs.Country},
              ]
            });
            getCardNumber((prevCard) => {
              return [...prevCard, CardInputs.CardNumber];
            });
            
            setCardInputs({NameOnCard: "",CardNumber: "",ExpiryDay: "",ExpiryMonth:"" ,CVV: "", Country:""});
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }

  //Validation
  const [errors, setErrors] = useState({});
  const validationErrors = {}
  function CardValidation(){
    if(!CardInputs.NameOnCard.trim()){
      validationErrors.NameOnCard = "Name On Card is required"
    }

    if(!CardInputs.CardNumber.trim()){
      validationErrors.CardNumber = "Card Number is required"
    }

    if(!CardInputs.ExpiryDay.trim()){
      validationErrors.ExpiryDay = "Expiry Day is required"
    }

    if(!CardInputs.ExpiryMonth.trim()){
      validationErrors.ExpiryMonth = "Expiry Month is required"
    }

    if(!CardInputs.CVV.trim()){
      validationErrors.CVV = "CVV is required"
    }

    if(!CardInputs.Country.trim()){
      validationErrors.Country = "Country is required"
    }

    setErrors(validationErrors)

    

    if(Object.keys(validationErrors).length === 0){
      alert("Form Submitted successfully")
    }
  }

  //Add banned countries
  const [InputBanned, getInputBanned] = useState('');
  //Validation
  const [errors2, setErrors2] = useState({});
  const validationErrors2 = {}
  function CardValidation2(){
    if(!InputBanned.trim()){
      validationErrors2.InputBanned = "Input country is required"
    }

    setErrors2(validationErrors2)
    if(Object.keys(validationErrors2).length === 0){
      alert("Form Submitted successfully")
    }
  }

  function AddBannedCountry(){
    fetch('/countries.txt')
    .then((Coderesponse) => {
      if (Coderesponse.ok) {
        return Coderesponse.text();
      }else{
        throw Coderesponse;
      }
    })
    .then((countryToArr) => {
      // Split the content into an array
      const arr = countryToArr.split(/\r?\n/);
      
      const GetSpecificCoun = arr.filter((country) =>
      country.toLowerCase().includes(InputBanned.toLowerCase())
      );

      const Checkbanned = bannedCountry.filter((country) =>
      country.toLowerCase().includes(InputBanned.toLowerCase())
    );
    CardValidation2();
    
    if(InputBanned !== ""){
      if(Checkbanned.length > 0){
        alert("The banned country already exists");
        return;
      }else if(GetSpecificCoun.length === 0){
        alert("The country doesn't exist");
        return;
      }else{
        console.log("banned stuff submitted")
        getbannedCountry([...bannedCountry, InputBanned]);
        alert("Country added successfully");
        getInputBanned('');
      }
    }

    })
    .catch((error) => {
      console.error(error);
    });
  }

  function RemoveBannedCountry(){

    fetch('/countries.txt')
    .then((Coderesponse) => {
      if (Coderesponse.ok) {
        return Coderesponse.text();
      }else{
        throw Coderesponse;
      }
    })
    .then((countryToArr) => {
      // Split the content into an array
      const arr = countryToArr.split(/\r?\n/);
      
      const GetSpecificCoun = arr.filter((country) =>
      country.toLowerCase().includes(InputBanned.toLowerCase())
      );

      const Checkbanned = bannedCountry.filter((country) =>
      country.toLowerCase().includes(InputBanned.toLowerCase())
    );
    CardValidation2();
    
    if(InputBanned !== ""){
      if(Checkbanned.length > 0){
        const RemoveBanCountry = bannedCountry.indexOf(InputBanned);
        if(RemoveBanCountry !== -1){
          bannedCountry.splice(RemoveBanCountry, 1);
        }
        getInputBanned('');
      }else if(GetSpecificCoun.length === 0){
        alert("The country doesn't exist");
        return;
      }
    }
    })
    .catch((error) => {
      console.error(error);
    });

  }


  return(
    <>
    <Header/>
      {/* Form for adding a new card */}
      <Row>
      <Col>
        <Form style={{width:"80%", marginLeft:"10%", marginTop:"5%"}}>
          <div id="AddCard">
            <Form.Group >
              <Form.Label htmlFor="Name-on-Card">Name On Card</Form.Label>
              <Form.Control placeholder="Name of Card.." type="text" name="NameOnCard" id="Name-on-Card" value={CardInputs.NameOnCard} onChange = {e => setCardInputs({ ...CardInputs, NameOnCard: e.target.value })}/>
              {errors.NameOnCard && <span>{errors.NameOnCard}</span>}
            </Form.Group >
            <Form.Group >
              <Form.Label htmlFor="Card-Number">Card Number</Form.Label>
              <Form.Control maxLength={5} placeholder="Card Number.." type="text" name="Card-Number" id="Card-Number" value={CardInputs.CardNumber} onChange = {e => setCardInputs({ ...CardInputs, CardNumber: e.target.value })}/>
              {errors.CardNumber && <span>{errors.CardNumber}</span>}
            </Form.Group >
            
            <Form.Group >
              <Row>
                <Form.Label htmlFor="Expiry-Date">Expiry Date</Form.Label>
                <Col xs={5}>
                <Form.Control maxLength={2} placeholder="Month.." type="text" name="Expiry-Day" id="Expiry-Day" value={CardInputs.ExpiryDay} onChange = {e => setCardInputs({ ...CardInputs, ExpiryDay: e.target.value })}/>
                </Col>
                <Col xs={5}>
                <Form.Control maxLength={2} placeholder="Year.." type="text" name="Expiry-Month" id="Expiry-Month" value={CardInputs.ExpiryMonth} onChange = {e => setCardInputs({ ...CardInputs, ExpiryMonth: e.target.value })}/>
                </Col>
                {errors.ExpiryDay && <span>{errors.ExpiryDay}</span>}
                {errors.ExpiryMonth && <span>{errors.ExpiryMonth}</span>}
              </Row>
            </Form.Group >

            <Form.Group >
              <Form.Label htmlFor="CVV">CVV</Form.Label>
              <Form.Control maxLength={3} placeholder="CVV Number.." type="text" name="CVV" id="CVV" value={CardInputs.CVV} onChange = {e => setCardInputs({ ...CardInputs, CVV: e.target.value })}/>
              {errors.CVV && <span>{errors.CVV}</span>}
            </Form.Group >

            <Form.Group >
              <Form.Label htmlFor="Country">Country</Form.Label>
              <Form.Control placeholder="Country.." className="textbox" type="text" name="Country" id="Country" value={CardInputs.Country} onChange = {e => setCardInputs({ ...CardInputs, Country: e.target.value })}/>
              {errors.Country && <span>{errors.Country}</span>}
            </Form.Group >

            <Button onClick={handleSubmit}>Add Card</Button>
          </div>
        </Form>
      </Col>

      <Col>
      <div>
           <Image src="./6134225.jpg" thumbnail style={{border:"none"}} /> 
        </div>
      </Col>
      </Row>

    <Container style={{marginTop:"10%", marginBottom:"10%"}}>
        {/* Display the information on the table  */}
        <h2>Card list</h2>
        <Table id="table2" responsive striped bordered hover variant="light">
          <thead>
            <tr>
              <th>Name On Card</th>
              <th>Card Number</th>
              <th>Expiry Date</th>
              <th>CVV</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {card.map((card, index) => (
                <tr key={index}>
                          <td>{card.NameOnCard}</td>
                          <td>{card.CardNumber}</td>
                          <td>{card.ExpiryDay}/{card.ExpiryMonth}</td>
                          <td>{card.CVV}</td>
                          <td>{card.Country}</td> 
              </tr>
            ))}
          </tbody>
        </Table>
    </Container>
    
    <Row>
    <Col>
    <Container>
        <div className="align-items-center">
        <Form id="ConCountry" style={{width:"80%", marginLeft:"10%", marginTop:"20%"}}>
        <h4>Configure Country</h4>
          <Form.Group >
          <Form.Label >Enter the Country</Form.Label>
            <Form.Control type="text" name="bannedCountry" placeholder="Enter your email"  value={InputBanned} onChange={e => getInputBanned(e.target.value)}/>
            {errors2.InputBanned && <span>{errors2.InputBanned}</span>}
          </Form.Group>
            <Button variant="danger" onClick={RemoveBannedCountry} style={{marginLeft:"1%", marginTop:"1%"}}>Delete</Button>
            <Button onClick={AddBannedCountry} style={{marginLeft:"1%", marginTop:"1%"}}>Add</Button>
          </Form>
        </div>
      </Container>
      
    </Col>

      <Col>
        <Container>
        <div>
           <Image src="./2wok_68xy_140717.jpg" thumbnail style={{border:"none"}} /> 
        </div>
        </Container>
      </Col>
    </Row>
      
    </>
  )
}