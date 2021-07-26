import NavBar from './NavBar';
import MyAppBar from "./appbar"
import {
    Container,
    Paper,
} from "@material-ui/core"
import { UserContext } from '../context/userContext';

const Layout = ({ children }) => {
    return (        
        <>
            <NavBar />
            {/* <MyAppBar /> */}
            {/* <UserContext>{children}</UserContext> */}
        </> 
    );
};

export default Layout;