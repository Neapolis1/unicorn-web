import NavBar from "./navbar";

import CategoryListProvider from "./category/category-list-provider";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <CategoryListProvider>
        <NavBar />
        <Outlet/>
    </CategoryListProvider>
  );
}

export default Layout;
