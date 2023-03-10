import React, { useState } from "react";
import "./AddIncome.css";
import Logo from "../../moneyManLogo1.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddIncome = () => {
  const [newIncome, setnewIncome] = useState("");
  const [newPayor, setnewPayor] = useState("");
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");
  console.log(userEmail);
  
  const handleSubmit = async (e) => {
    console.log(newPayor, newIncome);
    axios
      .post(
        "http://localhost:3001/api/AddNewIncome",
        { userEmail, income: { newPayor, newIncome } },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        // res.user.income.push(income);
        // console.log(user);
        alert("Successfully added Income!");
        navigate("/Dashboard");
      });
    // catch((err) => console.log("err", err));
  };
  return (
    <div>
      <div className="logo-name">Money Managed</div>
      <div className="img-div">
        <img src={Logo} alt="Money Managed Logo" className="logo" />
      </div>
      <div className="inner-income-div">
        <h5>Add Income</h5>
        <input
          type="text"
          name="Payor"
          placeholder="Who Paid You?"
          onChange={(e) => setnewPayor(e.target.value)}
          required
        />
        <br />
        <br />
        <br />
        <input
          type="number"
          name="amount"
          placeholder="Payment Amount"
          onChange={(e) => setnewIncome(e.target.value)}
          required
        />
        <br />
        <br />
        <br />
        <button type="button" className="button" onClick={handleSubmit}>
          Add Income
        </button>
        <Link to="/Dashboard" className="button">
          Back
        </Link>
      </div>
    </div>
  );
};

export default AddIncome;
