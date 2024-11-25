import React, { useEffect, useState, useRef } from "react";
import AuthHandler from "../utils/Authhandler";
import APIHandler from "../utils/APIHandler";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AutoCompleteMedicine from "../components/AutoCompleteMedicine";

const BillGenerate = () => {
    const { id } = useParams();
    const apiHandler = APIHandler();
    const navigate = useNavigate();
    const [medicineDetails, setMedicineDetails] = useState([
        {
            sr_no: 1,
            id: 0,
            medicine_name: "",
            qty: "",
            qty_type: "",
            unit_price: "",
            c_gst: "",
            s_gst: "",
            amount: "",
        },
    ]);

    const [formData, setFormData] = useState({
        customer_name: "",
        address: "",
        phone: "",
        bill_id: "",
    });

    useEffect(() => {
        // Check if user is logged in
        AuthHandler.checkTokenExpiry();
        // saveCompanyBankData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const addMedicine = () => {
        setMedicineDetails([
            ...medicineDetails,
            {
                sr_no: medicineDetails.length + 1,
                id: 0,
                medicine_name: "",
                qty: "",
                qty_type: "",
                unit_price: "",
                c_gst: "",
                s_gst: "",
                amount: "",
            },
        ]);
    };

    const removeMedicine = () => {
        if (medicineDetails.length > 1) {
            const medicineDetailsCopy = [...medicineDetails];
            medicineDetailsCopy.pop();
            setMedicineDetails(medicineDetailsCopy);
        }
    };

    const showDataInInputs = (index, item) => {
        const updatedMedicineDetails = [...medicineDetails];
        updatedMedicineDetails[index] = {
            ...updatedMedicineDetails[index],
            id: item.id,
            qty: 1,
            qty_type: "Pieces",
            unit_price: item.sell_price,
            c_gst: item.c_gst,
            s_gst: item.s_gst,
            medicine_name: item.name,
            amount:
                parseInt(item.sell_price) + parseInt(item.c_gst) + parseInt(item.s_gst),
        };
        setMedicineDetails(updatedMedicineDetails);
    };

    const qtyChangeUpdate = (event) => {
        const value = event.target.value;
        const index = event.target.dataset.index;
        const updatedMedicineDetails = [...medicineDetails];

        updatedMedicineDetails[index].amount =
            (parseInt(updatedMedicineDetails[index].unit_price) +
                parseInt(updatedMedicineDetails[index].c_gst) +
                parseInt(updatedMedicineDetails[index].s_gst)) *
            value;
        updatedMedicineDetails[index].qty = value;
        setMedicineDetails(updatedMedicineDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Form Data:", formData);
        // console.log("Medicine Details:", medicineDetails);
        try {
            const customer_name = formData.customer_name;
            const address = formData.address;
            const phone = formData.phone;
            const bill_id = formData.bill_id;
            const totalAmount = medicineDetails.reduce((total, item) => {
                return total + (parseInt(item.amount) || 0); // Fallback to 0 if item.amount is not valid
            }, 0);

            const response = await apiHandler.generateBill(
                customer_name,
                address,
                phone,
                medicineDetails
            );
            console.log("Bill Generated:", response);
            toast.success(response.data.message);
            bilGeneratePrint(customer_name, address, phone, bill_id, medicineDetails,totalAmount);
            // Reset form fields
            setFormData({
                customer_name: "",
                address: "",
                phone: "",
                bill_id: "",
            })
        } catch (error) {
            console.error("Error saving company bank data:", error);
            toast.error("Error saving company bank data");
        }
    };

    const bilGeneratePrint = (
        customer_name,
        address,
        phone,
        bill_id,
        medicineDetails,
        totalAmount
    ) => {
        const printWindow = window.open("", "", "width=800,height=600");
        printWindow.document.write(`
            <html>
            <head>
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap"
                rel="stylesheet"
              />
              <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
                integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
              />
              <style>
                *,
                *::after,
                *::before {
                  padding: 0;
                  margin: 0;
                  box-sizing: border-box;
                }
          
                :root {
                  --blue-color: #0c2f54;
                  --dark-color: #535b61;
                  --white-color: #fff;
                }
          
                ul {
                  list-style-type: none;
                }
                ul li {
                  margin: 1px 0;
                }
                .stocks {
                  color: grey;
                }
                .saver {
                  color: green;
                }
                /* text colors */
                .text-dark {
                  color: var(--dark-color);
                }
                .text-blue {
                  color: var(--blue-color);
                }
                .text-end {
                  text-align: right;
                }
                .text-center {
                  text-align: center;
                }
                .text-start {
                  text-align: left;
                }
                .text-bold {
                font-size: 16px;
                  font-weight: 700;
                }
                .cust_name {
                  margin-top: 12px;
                  font-weight: 500;
                  color: var(--blue-color);
                }
                /* hr line */
                .hr {
                  height: 1px;
                  background-color: rgba(0, 0, 0, 0.1);
                }
                /* border-bottom */
                .border-bottom {
                  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }
          
                body {
                  font-family: "Poppins", sans-serif;
                  color: var(--dark-color);
                  font-size: 14px;
                }
                .invoice-wrapper {
                  min-height: 100vh;
                  background-color: rgba(0, 0, 0, 0.1);
                  padding-top: 20px;
                  padding-bottom: 20px;
                }
                .invoice {
                  max-width: 850px;
                  margin-right: auto;
                  margin-left: auto;
                  background-color: var(--white-color);
                  padding: 50px;
                  border: 1px solid rgba(0, 0, 0, 0.2);
                  border-radius: 5px;
                  min-height: 920px;
                }
                .invoice-head-top-left img {
                  width: 130px;
                }
                .invoice-head-top-right h3 {
                  font-weight: 500;
                  font-size: 27px;
                  color: var(--blue-color);
                }
                .invoice-head-middle,
                .invoice-head-bottom {
                  padding: 16px 0;
                }
                .invoice-body {
                  border: 1px solid rgba(0, 0, 0, 0.1);
                  border-radius: 4px;
                  overflow: hidden;
                }
                .invoice-body table {
                  border-collapse: collapse;
                  border-radius: 4px;
                  width: 100%;
                }
                .invoice-body table td,
                .invoice-body table th {
                  padding: 12px;
                }
                .invoice-body table tr {
                  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }
                .invoice-body table thead {
                  background-color: rgba(0, 0, 0, 0.02);

                
                }
                .invoice-body-info-item {
                  display: grid;
                  grid-template-columns: 80% 20%;
                }
                .invoice-body-info-item .info-item-td {
                  padding: 12px;
                  background-color: rgba(0, 0, 0, 0.02);
                }
                .invoice-foot {
                  padding: 30px 0;
                }
          
                .invoice-head-top,
                .invoice-head-middle,
                .invoice-head-bottom {
                  display: grid;
                  grid-template-columns: repeat(2, 1fr);
                  padding-bottom: 10px;
                }
          
                @media screen and (max-width: 992px) {
                  .invoice {
                    padding: 40px;
                  }
                }
          
                @media screen and (max-width: 576px) {
                  .invoice-head-top,
                  .invoice-head-middle,
                  .invoice-head-bottom {
                    grid-template-columns: repeat(1, 1fr);
                  }
                  .invoice-head-bottom-right {
                    margin-top: 12px;
                    margin-bottom: 12px;
                  }
                  .invoice * {
                    text-align: left;
                  }
                  .invoice {
                    padding: 28px;
                  }
                }
          
                .overflow-view {
                  overflow-x: scroll;
                }
                .invoice-body {
                  min-width: 600px;
                }
          
                @media print {
                  .print-area {
                    visibility: visible;
                    width: 100%;
                    position: absolute;
                    left: 0;
                    top: 0;
                    overflow: hidden;
                  }
          
                  .overflow-view {
                    overflow-x: hidden;
                  }
          
                  .invoice-btns {
                    display: none;
                  }
                }
              </style>
            </head>
            <body>
              <div class="invoice-wrapper" id="print-area">
                <div class="invoice">
                  <div class="invoice-container">
                    <div class="invoice-head">
                      <div class="invoice-head-top">
                        <div class="invoice-head-top-left text-start">
                          <h1 class="stocks">Stocks<span class="saver">Saver</span></h1>
                        </div>
                        <div class="invoice-head-top-right text-end">
                          <h3>Invoice</h3>
                        </div>
                      </div>
                      <div class="hr"></div>
                      <div class="invoice-head-middle">
                        <div class="invoice-head-middle-left text-start">
                          <p>
                            <span class="text-bold">Date</span>: ${new
                            Date().toLocaleDateString()}
                          </p>
                        </div>
                        <div class="invoice-head-middle-right text-end">
                          <p><span class="text-bold">Invoice No:</span> ${bill_id}</p>
                        </div>
                      </div>
                      <div class="hr"></div>
                      <div class="invoice-head-bottom">
                        <div class="invoice-head-bottom-left">
                          <ul>
                            <li class="text-bold">Customer Details:</li>
                            <li class="cust_name">${customer_name}</li>
                            <li>${address}</li>
                            <li>${phone}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="overflow-view">
                      <div class="invoice-body">
                        <table>
                          <thead>
                            <tr>
                              <td class="text-bold">SR No</td>
                              <td class="text-bold">Name</td>
                              <td class="text-bold">Qty</td>
                              <td class="text-bold">Qty Type</td>
                              <td class="text-bold">Unit Price</td>
                              <td class="text-bold">GST</td>
                              <td class="text-bold">Amount</td>
                            </tr>
                          </thead>
                          <tbody>
                            ${medicineDetails .map( (item) => `
                            <tr>
                              <td>${item.sr_no}</td>
                              <td>${item.medicine_name}</td>
                              <td>${item.qty}</td>
                              <td>${item.qty_type}</td>
                              <td>${item.unit_price}</td>
                              <td>${parseInt(item.c_gst) + parseInt(item.s_gst)}</td>
                              <td>${item.amount}</td>
                            </tr>
                            ` ) .join("")}
                          </tbody>
                        </table>
                        <div class="invoice-body-bottom">
                          <div class="invoice-body-info-item">
                            <div class="info-item-td text-end text-bold">Total:</div>
                            <h4 class="info-item-td text-center">Rs. ${totalAmount}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="invoice-foot text-center">
                      <p>
                        <span class="text-bold text-center">NOTE:&nbsp;</span>This is
                        computer generated receipt and does not require physical
                        signature.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </html>`);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="container-fluid p-0">
            <div className="row mb-2 mb-xl-3">
                <h3 className="mb-3">
                    <strong>Generate</strong> Bill
                </h3>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Generate Bill for Customer</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="customer_name">
                                            Customer Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="customer_name"
                                            name="customer_name"
                                            placeholder="Enter Customer Name"
                                            value={formData.customer_name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="address">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            name="address"
                                            placeholder="Enter Address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="phone">
                                            Phone No
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                            placeholder="Enter Customer Phone No"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label" htmlFor="bill_id">
                                            Bill ID
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="bill_id"
                                            name="bill_id"
                                            placeholder="Enter Bill ID"
                                            value={formData.bill_id}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <br />
                                <h4 className="mb-4">
                                    <strong>Medicine Details</strong>
                                </h4>
                                {medicineDetails.map((item, index) => (
                                    <div className="row" key={index}>
                                        <div className="mb-3 col-md-2">
                                            <label className="mb-2" htmlFor="">
                                                SR No.
                                            </label>
                                            <input
                                                type="text"
                                                id="sr_no"
                                                name="sr_no"
                                                className="form-control"
                                                placeholder="Enter SR No."
                                                defaultValue={index + 1}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col-md-2">
                                            <label className="mb-2" htmlFor="">
                                                Medicine Name
                                            </label>
                                            <AutoCompleteMedicine
                                                itemPostion={index}
                                                showDataInInputs={showDataInInputs}
                                            />
                                        </div>
                                        <div className="mb-3 col-md-2">
                                            <label className="mb-2" htmlFor="">
                                                Qty:
                                            </label>
                                            <input
                                                type="text"
                                                id="qty"
                                                name="qty"
                                                className="form-control"
                                                placeholder="Enter Quantity "
                                                defaultValue={item.qty}
                                                data-index={index}
                                                onChange={qtyChangeUpdate}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col-md-2">
                                            <label className="mb-2" htmlFor="">
                                                Qty Type:
                                            </label>
                                            <input
                                                type="text"
                                                id="qty_type"
                                                name="qty_type"
                                                className="form-control"
                                                placeholder="Enter Qty Type"
                                                onChange={handleChange}
                                                defaultValue={item.qty_type}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col-md-2">
                                            <label className="mb-2" htmlFor="">
                                                Unit Price
                                            </label>
                                            <input
                                                type="text"
                                                id="unit_price"
                                                name="unit_price"
                                                className="form-control"
                                                placeholder="Enter Unit Price"
                                                onChange={handleChange}
                                                defaultValue={item.unit_price}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3 col-md-2">
                                            <label className="mb-2" htmlFor="">
                                                Amount :
                                            </label>
                                            <input
                                                type="text"
                                                id="amount"
                                                name="amount"
                                                className="form-control"
                                                placeholder="Enter Amount"
                                                onChange={handleChange}
                                                defaultValue={item.amount}
                                                required
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <button
                                            type="button"
                                            className="col-md-12 btn btn-success"
                                            onClick={addMedicine}
                                        >
                                            Add Medicine Details
                                        </button>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <button
                                            type="button"
                                            className="col-md-12 btn btn-danger"
                                            onClick={removeMedicine}
                                        >
                                            Remove Medicine Details
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="col-md-12 btn btn-primary">
                                    Generate Bill
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillGenerate;
