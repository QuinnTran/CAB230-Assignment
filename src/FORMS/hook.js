import { useState } from "react";

//Callback gets called whenever the user submits the form
const hook = (initialValues, callback) => {
  const [inputs, setInputs] = useState(initialValues);
  const handleSubmit = event => {
    if (event) event.preventDefault();
    callback();
  };
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};

export default hook;
