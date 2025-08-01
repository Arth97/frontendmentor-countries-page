import Header from './components/Header/header';
import { Outlet } from "react-router";

function Layout() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '100px' }} className="flex flex-col justify-center items-center">
        <div className="max-w-7xl w-full ">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default Layout;