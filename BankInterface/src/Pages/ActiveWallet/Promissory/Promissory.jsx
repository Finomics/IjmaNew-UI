import {React,useState,useEffect} from 'react'
import './Promissory.css'
import PromissoryNote from './PromissoryNote.json'
import {getData,postData} from '../../../Api/api'

export default function Promissory() {
  const[bank,setBank]=useState({accountName:"Bank1"});
    const[pNotes,setPNotes ]=useState(PromissoryNote);
    const [item, setItem] = useState(null);

    useEffect(()=> {
      let payload={
          account: bank.accountName,
          consumable: ""
         }
     
 getData("issued-PNs",payload,setPNotes);
  },[])

    const handleRedeeem=async()=>{
      let api="pNote/burn";
      let payload={
          applicationId: item.id,
          term:"2",
           insuranceRequired:true,
            account:""
          }
      console.log("In Redeem PNode",payload);
      const resp= await postData(api,payload);
  }

  return (
    <div class="card card-cascade narrower">
      <div
        class="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center">

        <div>
          <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
            <i class="fas fa-th-large mt-0"></i>
          </button>
          <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
            <i class="fas fa-columns mt-0"></i>
          </button>
        </div>

        <a class="white-text mx-3">Allow Access</a>

        <div>
          <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
            <i class="fas fa-pencil-alt mt-0"></i>
          </button>
          <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
            <i class="far fa-trash-alt mt-0"></i>
          </button>
          <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
            <i class="fas fa-info-circle mt-0"></i>
          </button>
        </div>

      </div>
      <div class="container mt-3">
        <h2 className='text-center'>Promissory Notes</h2>

        <table class="table table-hover">
          <thead class="bg-light">
            <tr>
              <th>Issue Date</th>
              <th>Freference No..</th>
              <th>Issuer</th>
              <th>Payee</th>
              <th>Amount</th>
              <th>Expire Date</th>
              <th></th>
            </tr>
          </thead>
          {
            pNotes.map((v, i) => {
              return (

                <tbody>
                  <tr>
                    <td>{v.issueDate}</td>
                    <td>{v.id}</td>
                    <td>{v.issuerAccount.name}</td>
                    <td>{v.payeeAccount.name}</td>
                    <td>{v.value}</td>
                    <td>{v.maturity}</td>
                    <td>
                      <span type="button" class="btn btn-warning btn-rounded" data-toggle="modal" data-target="#myModal"
                       onClick={() => setItem(v)}
                      >View</span>
                    </td>
                  </tr>
                </tbody>
              )
            })}

        </table>
      </div>
      <div class="modal" id="myModal">
        <div class="modal-dialog modal-dialog-scrollable-sm">
          <div class="modal-content" style={{ width: "115%" }}>

            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h3 class="modal-title">Promissory Note Details</h3>
              <button type="button" class="btn btn-danger close" data-dismiss="modal">X</button>
            </div>

            {/* <!-- Modal body --> */}
           
            {(item!=null)?
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
                      <td>Redeemad</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Expiry</td>
                      <td>{item.maturity}</td>
                    </tr>

                  </table>

                </div>
              :<></>
            }

            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              <button type="button" class="btn btn-success"onClick={handleRedeeem} >Redeem</button>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}
