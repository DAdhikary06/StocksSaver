import React, { useEffect, useState, useRef } from "react";
import AuthHandler from "../utils/Authhandler";
import APIHandler from "../utils/APIHandler";
import { toast } from "react-hot-toast";
// import { useNavigate, useParams } from "react-router-dom";
import AutoCompleteMedicine from "../components/AutoCompleteMedicine";

const BillGenerate = () => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  const apiHandler = APIHandler();
  const [medicineStock, setMedicineStock] = useState([]);
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
    fetchMedicineStock();
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

  const fetchMedicineStock = async () => {
    try {
      const medicinedata = await apiHandler.fetchAllMedicine();
      console.log(medicinedata.data.data);
      setMedicineStock(medicinedata.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const checkStockAvailability = () => {
    for (const medicine of medicineDetails) {
      const stock = medicineStock.find((item) => item.id === medicine.id);
      // console.log("Stock:", stock);
      if (stock && stock.in_stock_total <= 0) {
        toast.error(`Medicine "${medicine.medicine_name}" is out of stock.`);
        return false; // Out of stock
      }
    }
    return true; // All medicines are in stock
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
    if (!checkStockAvailability()) {
      return; // Exit if any medicine is out of stock
    }
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
      billGeneratePrint(customer_name, address, phone, bill_id, medicineDetails, totalAmount);
      // Reset form fields
      setFormData({
        customer_name: "",
        address: "",
        phone: "",
        bill_id: "",
      });
    } catch (error) {
      console.error("Error saving company bank data:", error);
      toast.error("Error saving company bank data");
    }
  };

  const billGeneratePrint = async (customer_name, address, phone, bill_id, medicineDetails, totalAmount) => {
    const response = await fetch('/invoiceTemplate.html');
    const template = await response.text();

    const medicineRows = medicineDetails.map(item => `
      <tr>
        <td>${item.sr_no}</td>
        <td>${item.medicine_name}</td>
        <td>${item.qty}</td>
        <td>${item.qty_type}</td>
        <td>${item.unit_price}</td>
        <td>${parseInt(item.c_gst) + parseInt(item.s_gst)}</td>
        <td>${item.amount}</td>
      </tr>
    `).join('');

    const htmlContent = template
      .replace('{{date}}', new Date().toLocaleDateString())
      .replace('{{bill_id}}', bill_id)
      .replace('{{customer_name}}', customer_name)
      .replace('{{address}}', address)
      .replace('{{phone}}', phone)
      .replace('{{medicine_rows}}', medicineRows)
      .replace('{{totalAmount}}', totalAmount);

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(htmlContent);
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
                        itemPosition={index}
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
