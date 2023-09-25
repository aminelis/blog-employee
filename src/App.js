import React from 'react'
import Login from './components/login'
import Start from './components/Start'
import EmployeeLogin from './components/EmployeeLogin'
import Dashboard from './components/dashboard'
import { Routes, Route} from 'react-router-dom'
import Home from './components/home'
import Employee from './components/employee'
import Profile from './components/profile'
import AddEmployee from './components/addEmployee'
//import EditEmployee from './components/editEmployee'
import EmployeeDetail from './components/employeeDetail'
import { Provider } from 'react-redux'
import store from './store/store'
//import Dashboard from './Dashboard'
//import Employee from './Employee'
//import Profile from './Profile'
//import Home from './Home'
//import AddEmployee from './AddEmployee'
//import EditEmployee from './EditEmployee'
//import Start from './Start'
//import EmployeeDetail from './EmployeeDetail'
//import EmployeeLogin from './EmployeeLogin'



const App = () => {
  return (
    <Provider store={store}>
    <Routes>
      <Route path='/' element={<Dashboard />}>
    
        <Route path='' element={<Home />}></Route>
        <Route path='/employee' element={<Employee />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/create' element={<AddEmployee />}></Route>
       {/* <Route path='/employeeEdit/:id' element={<EditEmployee />}></Route>*/}
  </Route>
      <Route path='/login' element={<Login />}></Route>
     <Route path='/start' element={<Start />}></Route>
      <Route path='/employeeLogin' element={<EmployeeLogin />}></Route>
<Route path='/employeedetail/:id' element={<EmployeeDetail />}></Route>
    </Routes>
    </Provider>
  )
}

export default App