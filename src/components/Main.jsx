import MessagesPage from "./MessagesPage";
import SideNav from "./SideNav";
import TopNav from "./TopNav";


function Main () {

    return (
        <div class ="flex flex-col h-screen">
            <TopNav/>
            <div class= "flex flex-1">
                <SideNav/>
                <MessagesPage/>
            </div>
        </div>
    ) 
}

export default Main;