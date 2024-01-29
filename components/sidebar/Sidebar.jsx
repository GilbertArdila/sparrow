import Menu from "./Menu";
import Logo from "./Logo";
import Button from "./Button";
import MiniProfile from "./MiniProfile";

const Sidebar = () => {
  return (
    <>
        {/**Logo */}
        <div className="hoverEffect p-0 xl:p-1 hover:bg-blue-100">
           <Logo /> 
        </div>
        
        {/**Menu */}
       
           <Menu/> 
        
        
        {/**Button */}
        <Button/>
        {/**Mini-profile */}
        <MiniProfile/>
    </>
  )
}

export default Sidebar;



