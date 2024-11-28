import React, { useState, useRef } from "react";
import APIHandler from "../utils/APIHandler";

const AutoCompleteMedicine = ({ showDataInInputs,itemPosition }) => {
  const [onFocus, setOnFocus] = useState(false);
  const [datalist, setDatalist] = useState([]);
  const inputData = useRef(null);

  const onFocusChange = () => {
    setOnFocus(true);
  };

  const onBlurChange = () => {
    setOnFocus(false);
  };

  const loadDataMedicine = async (event) => {
    const apiHandler = APIHandler();
    const dataresponse = await apiHandler.fetchMedicineByName(event.target.value);
    console.log(dataresponse.data);
    setDatalist(dataresponse.data);
  };

  const onShowItem = (item) => {
    console.log(item);
    inputData.current.value = item.name
    showDataInInputs(itemPosition, item);
    onBlurChange();
  };

  return (
    <>
      <input
        type="text"
        id="medicine_name"
        name="medicine_name"
        className="form-control"
        placeholder="Enter Medicine Name"
        onFocus={onFocusChange}
        onBlur={onBlurChange}
        autoComplete="off"
        onChange={loadDataMedicine}
        ref={inputData}
      />
      {onFocus && (
        <div>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
            //   border: "1px solid lightgrey",
              boxShadow: "1px 1px 1px lightgrey",
              position: "absolute",
              width: "10vw",
              background: "white",
            }}
          >
            {/* <li style={{ padding: 5, borderBottom: "1px solid lightgrey" }}>ABC</li>
            <li style={{ padding: 5, borderBottom: "1px solid lightgrey" }}>CDE</li> */}
            {datalist.map((item, index) => (
              <li
                key={index}
                style={{ padding: 5, borderBottom: "1px solid lightgrey" }}
                onMouseDown={() => onShowItem(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default AutoCompleteMedicine;