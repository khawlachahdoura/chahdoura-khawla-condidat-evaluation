//import logo from './logo.svg';
import { useState, useEffect } from "react";
import './App.css';

function App() {
  const initialValues = { username: "", email: "", password: "" };
  
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues(initialValues);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "champ vide !";
    }
    if (!values.email) {
      errors.email = "champ vide !";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "champ vide !";
    } else if (values.password.length < 4) {
      errors.password = "Au moins 4 caractèrs ! ";
    } else if (values.password.length > 10) {
      errors.password = "Au plus 10 caractèrs ! ";
    }
    return errors;
  };
 /* cancel= () => { 
    document.getElementById("form").reset();
  }*/
  const handleFormReset = () => {
    setFormValues(initialValues);
  }
  
  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <p>Signed in successfully</p>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}

      <form  > 
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Utilisateur * </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email * </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Mot De Passe * </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button type="Submit" className="fluid ui button blue" onClick={handleSubmit}>Valider</button>
          <button onClick={handleFormReset}>Annuler</button>
                       
                   
          
        
         
        </div>
      </form>
    </div>
  );
}

export default App;
