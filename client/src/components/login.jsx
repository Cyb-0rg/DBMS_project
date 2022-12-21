import ".././App.css";
import { useState } from "react";

import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from "../App";

function login() {
 

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  const [nameErr, setNameErr] = useState();
  const [ageErr, setAgeErr] = useState(true);



  const [isValid, setIsValid] = useState(true);

  const validateHandleSub = () => { 

     if (name === "") {
        setNameErr("name is required");
        setIsValid(false);
         return false;
     } 
     
     setAge(34);
     if (age <15 ) {
      setAgeErr("age must be greater than 14");
      setIsValid(false);
       return false;
    }

        
      
      setIsValid(true);
      setNameErr("");
      setAgeErr("");

      return true;
     

  }


  const handleSub = () => { 
      
      validateHandleSub() 

      //addEmployee()

  }




 



  return (


    <div className="App">

{/* 
      <div className="information">
        <label>UserName:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />


            
              <div className="errorMessege">
                <p> {nameErr}</p>
              </div>
            

        <label>password:</label>
        <input
          type="password"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />

              <div className="errorMessege">
                <p> {ageErr}</p>
              </div>

                     


         

        <button className={ isValid ? "successButton" : "invalidButton"}  onClick={ handleSub  }>"LOGIN"</button>
        <button onClick={getEmployees}>"FORGET PASSWORD"</button>
      </div>
 */}

    <div>
      hello
    </div>



    </div> 
    

    


  );
  
}



export default login;
