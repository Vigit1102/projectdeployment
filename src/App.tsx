// import * as React from 'react';
// import './App.css';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import { Navbar } from './Components/Header/Navbar';
// import { CreateUser } from './Components/User/CreateUser';
// import { UserList } from './Components/User/UserList';
// import { UpdateUser } from './Components/User/UpdateUser';
// import { UserCheckList } from './Components/User/UserCheckList';
// import ProtectedRoutes from './Components/Auth/ProtectedRoutes';
// import { Login } from './Components/Login/Login';


// function App() {
//   const [open, setOpen] = React.useState(true);
//   const [user, setUser] = React.useState(false)
//   const location = useLocation()
//   const loginPage = location.pathname === '/'

//   return (
//     <div className="App" >
//       {!loginPage && (
//         <div className={`${open ? 'mainOpen' : ''}`}>
//           <Navbar setOpen={setOpen} open={open} />
//         </div>
//       )}
//        <div className={`${open ? 'mainOpen' : ''}`}>
//        </div>

//         <Routes>
//           <Route path="/createuser"
//             element={<ProtectedRoutes user={user}><CreateUser /></ProtectedRoutes>} />
//           <Route path="/userlist"
//             element={<ProtectedRoutes user={user}><UserList user={user} /></ProtectedRoutes>} />
//           <Route path="/"
//             element={<Login setUser={setUser} />} />
//           <Route path="/edituser/:id"
//             element={<ProtectedRoutes user={user}><UpdateUser /></ProtectedRoutes>} />
//           <Route path="/userchecklist"
//             element={<ProtectedRoutes user={user}><UserCheckList /></ProtectedRoutes>} />
//         </Routes>

//       {/* </div> */}
//     </div>
//   );
// }

// export default App;

import * as React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './Components/Header/Navbar';
import { CreateUser } from './Components/User/CreateUser';
import { UserList } from './Components/User/UserList';
import { UpdateUser } from './Components/User/UpdateUser';
import { UserCheckList } from './Components/User/UserCheckList';
import ProtectedRoutes from './Components/Auth/ProtectedRoutes';
import { Login } from './Components/Login/Login';

function App() {
  const [open, setOpen] = React.useState(false); // Start with drawer closed
  const [user, setUser] = React.useState(false);
  const location = useLocation();
  const loginPage = location.pathname === '/';

  return (
    <div className="App">
      {!loginPage && <Navbar setOpen={setOpen} open={open} />}
      
      <div className={`page-content ${!loginPage && open ? 'page-content-shift' : ''}`}>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route 
            path="/createuser" 
            element={<ProtectedRoutes user={user}><CreateUser /></ProtectedRoutes>} 
          />
          <Route 
            path="/userlist" 
            element={<ProtectedRoutes user={user}><UserList user={user} /></ProtectedRoutes>} 
          />
          <Route 
            path="/edituser/:id" 
            element={<ProtectedRoutes user={user}><UpdateUser /></ProtectedRoutes>} 
          />
          <Route 
            path="/userchecklist" 
            element={<ProtectedRoutes user={user}><UserCheckList /></ProtectedRoutes>} 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;