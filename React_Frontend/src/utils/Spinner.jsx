// import React from "react";
// // import { RotatingLines  } from "react-loader-spinner";
// import { PulseLoader } from "react-spinners";


// const override = {
//     display: "block",
//     margin: "0 auto",
//     borderColor: "red",
//   };

// const Spinner = () => {
//   return (
//     <div className="d-flex justify-content-center">
//     <div className="">
//     <PulseLoader cssOverride={override} />
//     </div>
//     </div>
//   );
// };

// export default Spinner;

import React from 'react'
import {PulseLoader} from 'react-spinners'

const Spinner = () => {
  return (
    <div className='loading-overlay'>
        <div className="loading-square">
            <PulseLoader color="#000" loading={true} size={15} />
        </div>
    </div>
  )
}

export default Spinner