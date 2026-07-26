import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import DashboardCards from "../components/admin/DashboardCards";
import ProductTable from "../components/admin/ProductTable";

export default function AdminDashboard(){

return(

<div className="dashboard">

<Sidebar/>

<div className="dashboardContent">

<Topbar/>

<DashboardCards/>

<ProductTable/>

</div>

</div>

);

}
