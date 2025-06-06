import NavBar from "./navbar";

import CategoryListProvider from "./category/category-list-provider";

function Layout() {
  return (
    <CategoryListProvider>
        <NavBar />
    </CategoryListProvider>
  );
}

export default Layout;
