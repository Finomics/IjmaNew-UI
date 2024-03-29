import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { getData, postData } from '../../../Api/Api'
import { Spin } from "antd";
import Filter from "./filter";
import axios from "axios";
import './Promissory.css';
import JsonData from './PromissoryNote.json'
import StoreContext from "../../../ContextApi";
import Modal from 'react-bootstrap/Modal';



export default function Promissory() {
  const [user, setUser] = useState({ accountName: "seller1" });

  // const [promissoryData, setpromissoryData] = useState(filterItem)
  const [loading, setloading] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [item, setItem] = useState(null);
  const contextData = useContext(StoreContext);

  // filterItem.map((v, i) => { console.log(v, "PromissoryNote") })
  // console.log(contextData.SignInData, "Prom PromissoryNote Data");

  const [filterItem, setfilterItem] = useState(JsonData);

  useEffect(() => {
    setUser(contextData.SignInData);
    let payload = {
      account: user.UserAccountNo,
      consumable: ""
    }
    getData("received-PNs", payload, setfilterItem);
    // console.log("goods in seller",promissoryData);
  }, [user])

  const notify = () => toast.success('🦄 Successfully!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const Encash = async () => {

    setloading(false)
    setTimeout(() => {
      setloading(true)//1
      handleClose() // 2
      notify() // 3
    }, 2000);


    let api = "pNote/encash";
    let payload = {
      stateId: item.processId,
      account: user.UserAccountNo
    }
    console.log("InPNote Encash", payload);
    const resp = await postData(api, payload);
  }

  //   var data = {
  //     "account": "Seller1",
  //  "consumable": ""
  //   };

  //   var apiURLData = "received-PNs";

  // useEffect(()=>{

  //   getData(apiURLData, data).then((res) => {  
  //     setpromissoryData(res.data)
  //   });

  // },[])


  // console.log(filterItem, "res");


  return (
    <div class="card card-cascade narrower">
      <Filter data={{ JsonData, setfilterItem }} />
      <ToastContainer />
      <div
        class="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center">
      </div>
      <div class="container mt-3">
        <h2 className='text-center'>Promissory Notes</h2>

        <table class="table table-hover">
          <thead class="bg-light">
            <tr>
              <th>Id</th>
              <th>Issue Date</th>
              <th>Maturity</th>
              <th>Issuer </th>
              <th>Payee </th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          {
            filterItem.map((v, i) => {
              return (

                <tbody>
                  <tr>
                    <td>{v.id}</td>
                    <td>{v.issueDate}</td>
                    <td>{v.maturity}</td>
                    <td>{v.issuerAccount.name}</td>
                    <td>{v.payeeAccount.name}</td>
                    <td>{v.value}</td>
                    <td>
                      <span type="button" class="btn btn-warning btn-rounded" data-toggle="modal" data-target="#myModal"
                        //  onClick={() => setClinetID(v._id)}
                        onClick={() => handleShow(setItem(v))}
                      >View</span>
                    </td>
                  </tr>
                </tbody>
              )
            })}

        </table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Promissory Note Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* <!-- Modal body --> */}
          {(item != null) ?
            // return 

            <div class="modal-body">
              <table id="customers">

                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                </tr>
                <tr>
                  <td>Issue Date.</td>
                  <td>{item.issueDate}</td>
                </tr>
                <tr>
                  <td>Refrence No.</td>
                  <td>{item.id}</td>
                </tr>
                <tr>
                  <td>Issuer</td>
                  <td>{item.issuerAccount.name}</td>
                </tr>
                <tr>
                  <td>Payee</td>
                  <td>{item.payeeAccount.name}</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{item.value}</td>
                </tr>
                <tr>
                  <td>Redeemed</td>
                  <td>No.</td>
                </tr>
                <tr>
                  <td>Due Date</td>
                  <td>{item.maturity}</td>
                </tr>

              </table>

            </div>
            : <></>
          }






        </Modal.Body>
        <div class="modal-footer">
          {loading ? <button type="button" class="btn btn-success" data-dismiss={show} onClick={Encash}>Encash</button> : <Spin size="large" />}
        </div>
      </Modal>
    </div>

  )
}
