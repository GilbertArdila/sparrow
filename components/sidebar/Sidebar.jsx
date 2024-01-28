import Menu from "./Menu";
import Logo from "./Logo";
import Button from "./Button";
import MiniProfile from "./MiniProfile";

const Sidebar = () => {
  return (
    <section className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
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
    </section>
  )
}

export default Sidebar;