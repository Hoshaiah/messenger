import InputMessage from "./InputMessage";
import MessagesPage from "./MessagesPage";
import SideNav from "./SideNav";
import TopNav from "./TopNav";


function Main () {

    return (
        <div class ="flex flex-col h-screen">
            <TopNav/>
            <SideNav/>
            <MessagesPage/>
            <InputMessage/>
        </div>
    ) 
}

export default Main;