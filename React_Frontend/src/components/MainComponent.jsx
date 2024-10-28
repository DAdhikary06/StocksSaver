import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
// import Analytics from "../pages/Analytics";
const MainComponent = (({ page: Page, activepage, ...props }) => {
  return (
    <div className='wrapper'>
      <Sidebar activePage={activepage} />
      <div className='main'>
        <Navbar />
        <main className="content">
          {/* <Analytics /> */}
          <Page {...props} />
        </main>
      </div>
    </div>
  );
});

export default MainComponent;