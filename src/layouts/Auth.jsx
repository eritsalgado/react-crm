import {Outlet} from 'react-router-dom'
const Auth = () => {
    return ( 
        <div>
            <h1>desde Auth</h1>
            <Outlet/>
        </div>
     );
}
 
export default Auth;