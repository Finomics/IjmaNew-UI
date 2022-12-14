import {React,useState,useEffect} from 'react'
import './Murabaha.css'
import MurbanState from './MurbahaState.json'
import {getData,postData} from '../../../Api/api'

export default function Murabaha() {

    const[bank,setBank]=useState({accountName:"Bank1"});
    const[murabahas,setMurabahas]=useState(MurbanState);
    const [item, setItem] = useState(null);

    
    useEffect(()=> {
        let payload={
            account: bank.accountName,
            consumable: ""
           }
           getData("issued-murabaha",payload,setMurabahas);
        },[])

    const handleMurabahaOffer=async()=>{
        let api="murabaha/offer";
        let payload={
            stateId: item.internalReference,
           
            account: bank.accountName,
            }
        console.log("In murabaha/offer",payload);
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

                {/* <a class="white-text mx-3">Allow Access</a> */}

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
                <h2 className='text-center'>Murabaha Contact</h2>
                {murabahas.map((v, i) => {
                    return (


                        <table class="table table-hover">
                            <thead class="bg-light">
                                <tr>
                                    <th >Date</th>
                                    <th>Refrence No</th>
                                    <th>Bank</th>
                                    <th>Borrower</th>
                                    <th>Term</th>
                                    <th>Cost Price</th>
                                   
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{v.agreementDate}</td>
                                    <td>{v.internalReference}</td>
                                    <td>{v.bankAccountInfo.name}</td>
                                    <td>Buyer 1</td>
                                    <td>{v.term}</td>
                                    <td>{v.costPrice}</td>

                                    {/* <td>{v.borrowerAccountInfo.name}</td>
                                    <td>{v.sellingprice}</td>
                                    <td>{v.profitrate}</td>
                                    <td>Medicines</td> */}
                                    <td>unSigned</td>
                                  
                                    <td>
                                        <span type="button" class="btn btn-warning btn-rounded" data-toggle="modal" data-target="#myModal"
                                         onClick={() => setItem(v)}
                                        >View</span>
                                    </td>

                                </tr>
                            </tbody>

                        </table>
                    )
                })}
            </div>

            <div class="modal" id="myModal">
                <div class="modal-dialog modal-dialog-scrollable-sm">
                    <div class="modal-content" style={{ width: "115%" }}>

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h3 class="modal-title">Murabaha Agreement Details</h3>
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
                                            <td>Date</td>
                                            <td>{item.agreementDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Refrence No.</td>
                                            <td>{item.internalReference}</td>
                                        </tr>
                                        <tr>
                                            <td>Bank</td>
                                            <td>{item.bankAccountInfo.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Applicant</td>
                                            <td>{item.borrowerAccountInfo.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Cost Price</td>
                                            <td>{item.costPrice}</td>
                                        </tr>
                                        <tr>
                                            <td>Tenor</td>
                                            <td>{item.term}</td>
                                        </tr>
                                        <tr>
                                            <td>Selling Price</td>
                                            <td>{item.sellingprice}</td>
                                        </tr>
                                        <tr>
                                            <td>Profile Rate</td>
                                            <td>{item.profitrate}</td>
                                        </tr>
                                        <tr>
                                            <td>Item</td>
                                            <td>Cotton</td>
                                        </tr>
                                        <tr>
                                            <td>Bank Signature</td>
                                            {(item.bankSignature)?
                                            <td>Signed</td>
                                            :
                                            <td>Un Signed</td>
                        }
                                        </tr>
                                        <tr>
                                            <td>Brorower Signature</td>
                                            {(item.borrowerSignature)?
                                            <td>Signed</td>
                                            :
                                            <td>Un Signed</td>
                        }
                                        </tr>

                                    </table>

                                </div>
                          :<></>
                                }


r
                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" onClick={handleMurabahaOffer}>Offer</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
