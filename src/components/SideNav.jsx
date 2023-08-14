import logo from '../logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from "../redux/counterSlice";
import { setAuthorization} from "../redux/currentuserSlice";
import { useEffect } from 'react';
import { getUserChannels } from '../services/actionServices';


function SideNav () {
    const currentuser = useSelector((state)=> state.currentuser)
    const sample = ['Hello', 'bye', 'good']
    return(
        <div class="flex justify-center w-80 bg-slate-800">
            <div class = "flex flex-col w-40">
                {sample.map((item) => (
                    <p>{item}</p>
                ))}
            </div>
            <button onClick={() => getUserChannels(currentuser.authorization)}> test</button>
        </div>
    )
}

export default SideNav