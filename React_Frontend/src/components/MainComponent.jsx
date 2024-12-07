import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";
// import Analytics from "../pages/Analytics";
const MainComponent = (({ page: Page, activepage, ...props }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lowStockMedicines,setLowStockMedicines] =  useState([]);

  return (
    <div className='wrapper'>
      <Sidebar activePage={activepage} sidebarOpen={sidebarOpen}/>
      <div className='main'>
        <Navbar setSidebarOpen={setSidebarOpen}  lowStockMedicines={lowStockMedicines}/>
        <main className="content">
          {/* <Analytics /> */}
          <Page {...props} setLowStockMedicines={setLowStockMedicines} />
        </main>
      </div>
    </div>
  );
});

export default MainComponent;