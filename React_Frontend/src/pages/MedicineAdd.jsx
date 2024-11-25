import React, { useEffect, useState } from "react";
import AuthHandler from "../utils/Authhandler";
import APIHandler from "../utils/APIHandler";
import { toast } from "react-hot-toast";


const MedicineAdd = () => {
  const apiHandler = APIHandler();
  const [companylist, setCompanyList] = useState([]);
  const [medicinedetails, setMedicineDetails] = useState([
    { salt_name: "", salt_qty: "", salt_qty_type: "", description: "" },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    medical_typ: "",
    buy_price: "",
    sell_price: "",
    c_gst: "",
    s_gst: "",
    batch_no: "",
    shelf_no: "",
    expire_date: "",
    mfg_date: "",
    description: "",
    in_stock_total: "",
    qty_in_strip: "",
    company_id: "",
  });

  useEffect(() => {
    AuthHandler.checkTokenExpiry();
    LoadCompany();
  }, []);

  const LoadCompany = async () => {
    const companyData = await apiHandler.fetchCompanyOnly();
    setCompanyList(companyData.data);
  };

  const AddItems = () => {
    setMedicineDetails([
      ...medicinedetails,
      { salt_name: "", salt_qty: "", salt_qty_type: "", description: "" },
    ]);
  };

  const RemoveItems = () => {
    // Remove the last item from the array
    if (medicinedetails.length > 1) {
      setMedicineDetails(medicinedetails.slice(0, -1));
    }
  };

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset.index !== undefined) {
      const index = dataset.index;
      const updatedMedicineData = [...medicinedetails];
      updatedMedicineData[index][name] = value;
      setMedicineDetails(updatedMedicineData);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiHandler.saveMedicineData(
        formData.name,
        formData.medical_typ,
        formData.buy_price,
        formData.sell_price,
        formData.c_gst,
        formData.s_gst,
        formData.batch_no,
        formData.shelf_no,
        formData.expire_date,
        formData.mfg_date,
        formData.company_id,
        formData.description,
        formData.in_stock_total,
        formData.qty_in_strip,
        medicinedetails
      );

      if (response.data.error) {
        console.error("Error saving medicine data:", response);
        toast.error("Error saving medicine data: " + response.data.message);
        return;
      } else {
        console.log("Medicine data saved:", response.data);
        toast.success(response.data.message);
        // Reset form fields
        setFormData({
          name: "",
          medical_typ: "",
          buy_price: "",
          sell_price: "",
          c_gst: "",
          s_gst: "",
          batch_no: "",
          shelf_no: "",
          expire_date: "",
          mfg_date: "",
          description: "",
          in_stock_total: "",
          qty_in_strip: "",
          company_id: "",
        });
        setMedicineDetails([
          { salt_name: "", salt_qty: "", salt_qty_type: "", description: "" },
        ]);
      }
    } catch (error) {
      console.error("Error saving medicine data:", error);
      toast.error("Error saving medicine data");
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row mb-2 mb-xl-3">
        <h3 className="mb-3">
          <strong>Add Medicine</strong> Details
        </h3>
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Add Medicine</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="medical_typ">
                      Medicine Type
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="medical_typ"
                      name="medical_typ"
                      placeholder="Enter Medicine Type"
                      value={formData.medical_typ}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="buy_price">
                      Buy Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="buy_price"
                      name="buy_price"
                      placeholder="Enter Buy Price"
                      value={formData.buy_price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="sell_price">
                      Sell Price
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="sell_price"
                      name="sell_price"
                      placeholder="Enter Sell Price"
                      value={formData.sell_price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="c_gst">
                      C GST
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="c_gst"
                      name="c_gst"
                      placeholder="Enter C GST"
                      value={formData.c_gst}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="s_gst">
                      S GST
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="s_gst"
                      name="s_gst"
                      placeholder="Enter S GST"
                      value={formData.s_gst}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="batch_no">
                      Batch No
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="batch_no"
                      name="batch_no"
                      placeholder="Enter Batch No"
                      value={formData.batch_no}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="shelf_no">
                      Shelf No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="shelf_no"
                      name="shelf_no"
                      placeholder="Enter Shelf No"
                      value={formData.shelf_no}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="expire_date">
                      Expire Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="expire_date"
                      name="expire_date"
                      value={formData.expire_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="mfg_date">
                      Mfg Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="mfg_date"
                      name="mfg_date"
                      value={formData.mfg_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="description">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="Enter Description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="in_stock_total">
                      In Stock Total
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="in_stock_total"
                      name="in_stock_total"
                      placeholder="Enter In Stock Total"
                      value={formData.in_stock_total}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="qty_in_strip">
                      Qty. in Strip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="qty_in_strip"
                      name="qty_in_strip"
                      placeholder="Enter Qty. in Strip"
                      value={formData.qty_in_strip}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label" htmlFor="company_id">
                      Company
                    </label>
                    <select
                      className="form-select"
                      id="company_id"
                      name="company_id"
                      value={formData.company_id}
                      onChange={handleChange}
                    >
                      <option value="">Select Company</option>
                      {companylist.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <button
                      type="button"
                      className="col-md-12 btn btn-success"
                      onClick={AddItems}
                    >
                      Add Details
                    </button>
                  </div>
                  <div className="mb-3 col-md-6">
                    <button
                      type="button"
                      className="col-md-12 btn btn-danger"
                      onClick={RemoveItems}
                    >
                      Remove Details
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {medicinedetails.map((salt, index) => (
                      <div className="row" key={index}>
                        <div className="mb-3 col-md-3">
                          <label htmlFor={`salt_name_${index}`}>
                            Salt Name
                          </label>
                          <input
                            type="text"
                            id={`salt_name_${index}`}
                            name="salt_name"
                            className="form-control"
                            placeholder="Enter Salt Name"
                            onChange={handleChange}
                            data-index={index}
                            value={salt.salt_name}
                            required
                          />
                        </div>

                        <div className="mb-3 col-md-3">
                          <label htmlFor={`salt_qty_${index}`}>Salt Qty</label>
                          <input
                            type="text"
                            id={`salt_qty_${index}`}
                            name="salt_qty"
                            className="form-control"
                            placeholder="Enter Salt Qty"
                            onChange={handleChange}
                            data-index={index}
                            value={salt.salt_qty}
                            required
                          />
                        </div>

                        <div className="mb-3 col-md-3">
                          <label htmlFor={`salt_qty_type_${index}`}>
                            Salt Qty Type
                          </label>
                          <input
                            type="text"
                            id={`salt_qty_type_${index}`}
                            name="salt_qty_type"
                            className="form-control"
                            placeholder="Enter Salt Qty Type"
                            onChange={handleChange}
                            data-index={index}
                            value={salt.salt_qty_type}
                            required
                          />
                        </div>

                        <div className="mb-3 col-md-3">
                          <label htmlFor={`description _${index}`}>
                            Description
                          </label>
                          <input
                            type="text"
                            id={`description_${index}`}
                            name="description"
                            className="form-control"
                            placeholder="Enter Description"
                            onChange={handleChange}
                            data-index={index}
                            value={salt.description}
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary col-md-12">
                    Add Medicine
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineAdd;
