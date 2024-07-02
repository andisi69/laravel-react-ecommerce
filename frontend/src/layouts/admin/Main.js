import React from "react";
import Navbar from './Navbar';
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Dashboard from "../../components/admin/Dashboard.js";
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts.js';


function Main() {

   return (
      <div className="sb-nav-fixed">
         <Navbar />
         <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
               <Sidebar />
            </div>
            <div id="layoutSidenav_content">
               <main> 
                  <Dashboard />
               </main>
               <Footer />
            </div> 
         </div>
      </div>
   )
}

export default Main;