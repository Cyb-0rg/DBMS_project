import ".././App.css";
import { useState } from "react";
import Axios from "axios";

import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PulseLoader from "react-spinners/PulseLoader";



function Main() {


  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");


  const [newWage, setNewWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);


  const [nameErr, setNameErr] = useState();
  const [positionErr, setPositionErr] = useState(true);
  const [ageErr, setAgeErr] = useState(true);
  const [wageErr, setWageErr] = useState(true);
  const [countryErr, setCountryErr] = useState(true);
  const [loginErr, setLoginErr] = useState("");

  const [showEmployees, setshowEmployees] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [openAnalysis, setOpenAnalysis] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLogin, setIsLoadingLogin] = useState(true);

 
  //and also try including the a general error like "isValid" so 
  //that the className would acquire it and change the CSS

  const [isValid, setIsValid] = useState(true);

  
  const validateHandleSub = () => { 

     if (name === "") {
        setNameErr("name is required");
        setIsValid(false);
         return false;
     } 

     
     if (age <15 ) {
      setAgeErr("age must be greater than 14");
      setIsValid(false);
       return false;
    }

    if (position === "") {
      setPositionErr("position is required");
      setIsValid(false);
       return false;
    }

    if (country === "") {
      setCountryErr("country is required");
      setIsValid(false);
       return false;
    }

    if (wage <8) {
      setWageErr("minimum wage must be greater than 8");
      setIsValid(false);
       return false;
    }


     
    //toast('SUCCESSFULLY ADDED', {position: toast.POSITION.TOP_LEFT} )
    
      
      setIsValid(true);
      setNameErr("");
      setPositionErr("");
      setAgeErr("");
      setCountryErr("");
      setWageErr("");

      //maybe here?

      
      return true;
     

  }


  const handleSub = () => { 

      validateHandleSub() ? successToast() || addEmployee() || console.log("valid submission") : errorToast() || console.log("invalid submission")
 
  }


  const userAuth_login = () => { 

    password === '1234' && userName === 'admin' ? setIsLoggedin(true) || setLoginErr("") : setIsLoggedin(false) || setLoginErr("invalid login credenials!") ;

    setTimeout (() => {
      setIsLoadingLogin(false);
    }, 2500)

    setIsLoadingLogin(true)
    setShowForm(false)
    setshowEmployees(false)
  }

  const logout = () => {
    setPassword("")
    setUserName("")
    setIsLoggedin(false)
  }

  const forgetPassword = ()  => {
    console.log("I am not ready yet")
  }

  const addEmployee = () => {
    Axios.post("http://localhost:5001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {

      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);


    });
  };

  const getEmployees = () => {

    setShowForm(false)
    setTimeout (() => {
      setIsLoading(false);
      !showEmployees && messageToast();
    }, 3000)

    
    setshowEmployees(!showEmployees); //opens and closes the employees listing
    setIsLoading(true)

    Axios.get("http://localhost:5001/employees").then((response) => {
      setEmployeeList(response.data);
      console.log(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    successToast();
    Axios.put("http://localhost:5001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  }; 

  const deleteEmployee = (id) => {
    deleteSuccessToast();
    Axios.delete(`http://localhost:5001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };


  const successToast = () => {
    toast.success("successfully added", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;

  const errorToast = () => {
    toast.error("invalid attempt !", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;


  const messageToast = () => {
    toast.info("scroll down to see the list", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;

  const deleteSuccessToast = () => {
    toast.error("employee deleted", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toastBox"
    })
  } ;

  //add more toasts here.

  return (

    <div className="App-main">

    <>
      <ToastContainer/>
    </>

{


isLoggedIn  ? 

showForm ? 

<div className="information">
    <label>Name:</label>
    <input
      type="text"
      onChange={(event) => {
        setName(event.target.value);
      }}
    />
   
          <div className="errorMessege">
            <p> {nameErr}</p>
          </div>
        

    <label>Age:</label>
    <input
      type="number"
      onChange={(event) => {
        setAge(event.target.value);
      }}
    />

          <div className="errorMessege">
            <p> {ageErr}</p>
          </div>

    <label>Country:</label>
    <input
      type="text"
      onChange={(event) => {
        setCountry(event.target.value);
      }}
    />


          <div className="errorMessege">
            <p> {countryErr}</p>
          </div>

    <label>Position:</label>
    <input
      type="text"
      onChange={(event) => {
        setPosition(event.target.value);
      }}
    />

          <div className="errorMessege">
            <p> {positionErr}</p>
          </div>


    <label>Wage :</label>
    <input
      type="number"
      onChange={(event) => {
        setWage(event.target.value);
      }}
    />

          <div className="errorMessege">
            <p> {wageErr}</p>
          </div>


    

    <button className={ isValid ? "successButton" : "invalidButton"}  onClick={ handleSub  }>Save Employee</button>
    <button onClick={()=>{setShowForm(!showForm)}}> { !showForm ? "Add Employee" : "Close Form"}</button>
    <button onClick={getEmployees}> { !showEmployees ? "Show Employees" : "Close Employees"}</button>
    <button onClick={logout}> { "Logout"}</button>

</div>

:

!isLoadingLogin?

<div className="information">

{
   !openAnalysis ?
   <>
  <button onClick={()=>{setShowForm(!showForm); setshowEmployees(false)}}> { !showForm ? "Add Employee" : "Close Form"}</button>
  <button onClick={getEmployees}> { !showEmployees ? "Show Employees" : "Close Employees"}</button>
  <button onClick={logout}> { "Logout"}</button>
  </> 
  :
  ""  
}
  
  <button onClick={()=>{setOpenAnalysis(!openAnalysis); setshowEmployees(false)}}> {!openAnalysis ? "See analysis" : "close analysis"}</button>


</div>  

:

<PulseLoader
  color="#000"
  cssOverride={{paddingTop:50}}
  loading
  size={14}
  speedMultiplier={1}
/>

:

  
<div className="information">
  
        <h1>LOGIN</h1>
        <label>UserName:</label>
        <input
          type="text"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />

        
              <div className="errorMessege">
                <p> {nameErr}</p>
              </div>
            

        <label>password:</label>
        <input
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

              <div className="errorMessege">
                <p> {nameErr}</p>
                <p> {loginErr}</p>
              </div>
                       

        <button className={ isValid ? "successButton" : "invalidButton"}  onClick={ userAuth_login  }>LOGIN</button>
        <button onClick={forgetPassword()}>"FORGET PASSWORD"</button>
        <a href="http://localhost:4200" target="blank"> Go to Devices App </a>
        

</div>  


}


{
    isLoggedIn ?

    showEmployees ? 

    !isLoading ?


    <div className="employees">
    {employeeList.map((val, key) => {
      return (   
        <div className="employee">
            <div>
              <h3> Name: {val.name} </h3>
              <h3>Age: {val.age}</h3>
              <h3>Country: {val.country}</h3>
              <h3>Position: {val.position}</h3>
              <h3>Wage: {val.wage}</h3>
            </div>
          <div>


            <input
              type="number"
              placeholder="new wage"
              onChange={(event) => {
                setNewWage(event.target.value);
              }}
            />


            <button
              onClick={() => {
                updateEmployeeWage(val.id);
              }}
            >
              {" "}
              Update
            </button>

            <button className="deleteButton"
              onClick={() => {
                deleteEmployee(val.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      );
    })}
    </div>

    :

    <PulseLoader
    color="#000000"
    cssOverride={{paddingTop:60}}
    loading
    size={13}
    speedMultiplier={1}
  />

:

//
"" 
:

//
""

}

{
  isLoggedIn ?

  openAnalysis ?

  <div className="analysisLinks"> 
        <a href="http://localhost:5001/min/age" target="blank"> Go to Min Age </a>
        <a href="http://localhost:5001/max/age" target="blank"> Go to Max Age </a>
        <a href="http://localhost:5001/avg/age" target="blank"> Go to Average Age </a>
        <a href="http://localhost:5001/count/diversity" target="blank"> Go to Employees Count </a>
        <a href="http://localhost:5001/join" target="blank"> Go to Join Tables </a>
  </div>
  

  :

  ""
  :

  ""
}
    </div> 
  );
}

export default Main;
