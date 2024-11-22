import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";
// import Analytics from "../pages/Analytics";
const MainComponent = (({ page: Page, activepage, ...props }) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='wrapper'>
      <Sidebar activePage={activepage} sidebarOpen={sidebarOpen}/>
      <div className='main'>
        <Navbar setSidebarOpen={setSidebarOpen}/>
        <main className="content">
          {/* <Analytics /> */}
          <Page {...props} />
        </main>
      </div>
    </div>
  );
});

export default MainComponent;