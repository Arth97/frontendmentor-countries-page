import Header from './components/Header/header';
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '100px' }}>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;