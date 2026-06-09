import React, { useState } from "react";

const Form = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log("-");
    };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        Email :<input type="text" id="email" name="email" className="border" value={email} 
        onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        Password :
        <input type="text" id="password" name="password" className="border" value={password} 
        onChange={(e) => setPassword(e.target.value)}
        />
        <br/>
        <input type="submit" value="send" className="bg-gray-200 p-2" />
      </form>
    </div>
  );
};

export default Form;