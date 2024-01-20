import { Outlet } from "react-router"
import Header from "./Header"


const Layout = () => {
  return (
    <main>
        <Header />
        <Outlet />
        
    </main>
  )
}

export default Layout