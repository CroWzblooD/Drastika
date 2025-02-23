// import React from "react";
// import SideBar from "../courseGenerator/_components/SideBar";
// import Header from "./_components/Header";
// const courseDashboard = ({ children }) => {
//   return (
//     <div>
//       <div className="md:w-64 hidden md:block">
//         <SideBar />
//       </div>
//       <div className="md:ml-64 mt-0">
//         <Header />
//         {children}
//       </div>
//     </div>
//   );
// };

// export default courseDashboard;

import React from "react";
import SideBar from "../courseGenerator/_components/SideBar";
import Header from "./_components/Header";

const CourseDashboard = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#FDF8F3]">
      {/* Sidebar */}
      <div className="w-64 hidden md:block fixed h-full">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <Header />
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CourseDashboard;
