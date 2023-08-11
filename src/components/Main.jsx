import MessagesPage from "./MessagesPage";
import SideNav from "./SideNav";
import TopNav from "./TopNav";


function Main () {

    return (
        <div class ="flex flex-col w-full h-screen">
            <TopNav/>
            <div class= "flex">
                <SideNav/>
                <MessagesPage/>
            </div>
        </div>
    ) 
}

export default Main;