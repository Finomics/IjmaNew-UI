import { React, useState, useEffect, useContext } from 'react';
import './Proformas.css'
import { Spin } from 'antd';
import { getData, postData } from '../../../Api'
import ProformaState from './ProformaState.json'
import Filter from '../../filter/filter';
import StoreContext from '../../../ContextApi';


export default function Proformas() {
    const contextData = useContext(StoreContext);
    const [user, setUser] = useState({ accountName: "Buyer1" });
    const [bank, setBank] = useState('');
    const [value, setValue] = useState('');
    const [item, setItem] = useState(null);
    const [loading, setloading] = useState(true);
    const [proformas, setProformas] = useState(ProformaState);


    console.log(contextData.SignInData, "Proformas Context Data");

   

    useEffect(() => {
        setUser(contextData.SignInData);
        console.log("user in proformas",user);
        let payload = {
            account: contextData.SignInData.UserAccountNo,
            consumable: ""
        }
        getData("received-Proformas", payload, setProformas);
    }, [contextData.SignInData])

    const handleRequestMurabaha = async () => {
        let api = "apply/murabaha";
        setloading(false);
        // setTimeout(() => {
        //     setloading(true)
        // }, 2000);

        let payload = {
            bank: bank,
            proformaId: item.processId,
            "term": value,
            borrower: contextData.SignInData.UserAccountNo,
        }
        console.log("In request Murabaha", payload);
        const resp = await postData(api, payload);
        
        setloading(true);
    }

    return (
        <div class="card card-cascade narrower">
            <Filter />
            <div class="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center"
                style={{ marginTop: "-4%" }}
            >

                {/* <div>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="fas fa-th-large mt-0"></i>
                    </button>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="fas fa-columns mt-0"></i>
                    </button>
                </div>
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
                </div> */}

            </div>
            <div class="container mt-3">
                <h2 className='text-center'>Proformas</h2>

                <table class="table table-hover">
                    <thead class="bg-light">
                        <tr>
                            <th> Date</th>
                            <th>Reference No.</th>
                            <th>Issuer</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>
                    {proformas.map((v, i) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{v.date}</td>
                                    <td>{v.proformaId}</td>
                                    <td>{v.sellerAccountInfo.name}</td>
                                    <td>{v.goods.asset}</td>
                                    <td>{v.goods.quantity.value + " " + v.goods.quantity.unit}</td>
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
                            <h3 class="modal-title">Proforma Details</h3>
                            <button type="button" class="btn btn-danger close" data-dismiss="modal">X</button>
                        </div>

                        {(item != null) ?
                            <div class="modal-body">
                                <table id="customers">

                                    <tr>
                                        <td>Vendor</td>
                                        <td>{item.sellerAccountInfo.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Client</td>
                                        <td>{item.buyerAccountInfo.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Refrence No.</td>
                                        <td>{item.proformaId}</td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td>{item.date}</td>
                                    </tr>
                                    <tr>
                                        <td>Consignment No.</td>
                                        <td>{item.goods.consignmentNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Item</td>
                                        <td>{item.goods.asset}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>{item.description}</td>
                                    </tr>
                                    <tr>
                                        <td>Quantity</td>
                                        <td>{item.goods.quantity.value + " " + item.goods.quantity.unit}</td>
                                    </tr>
                                    <tr>
                                        <td>Amount</td>
                                        <td>2{item.amount}</td>
                                    </tr>


                                </table>

                            </div>
                            : <></>
                        }



                        {/* <div class="row justify-content-between text-left">

                            <div class=" form-group col-sm-5 flex-column d-flex form-label">
                                <input type="text" id="ans" name="ans" placeholder="Text" onblur="validate(1)" />
                            </div>

                            <div class="form-group col-sm-5 flex-column d-flex">
                                <input type="text" id="ans" name="ans" placeholder="Tenor" onblur="validate(1)" />

                            </div>

                            <div class=" form-group col-sm-2 flex-column d-flex form-label">
                                <button class="btn btn-primary" type="button" >+</button>
                            </div>
                        </div> */}



                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer d-flex justify-content-evenly">
                            <input type="number" placeholder="Tenor" onChange={(e) => setValue(e.target.value)} />
                            <input type="text" placeholder="Bank" onChange={(e) => setBank(e.target.value)} />
                            {/* <button type="button" class="btn btn-success" onClick={handleRequestMurabaha} >Request Murabaha</button> */}
                            {loading ? <button type="button" class="btn btn-success" onClick={handleRequestMurabaha} >Request Murabaha</button> : <Spin size="large" />}

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
