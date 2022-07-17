import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// Layouts
import Auth from './layouts/Auth'
import Dashboard from './layouts/Dashboard'

// Modelo: Auth
import Login from './pages/Auth/Login'

// Modelo: Cliente
import Inicio from './pages/Inicio'
import NuevoCliente from './pages/NuevoCliente'
import EditarCliente from './pages/EditarCliente'
import VerCliente from './pages/VerCliente'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth/>}>
          <Route index element={<Login/>}/>
        </Route>
        <Route path="clientes" element={<Dashboard/>}>
          <Route index element={<Inicio/>}/>
          <Route path="nuevo" element={<NuevoCliente/>}/>
          <Route path=":id" element={<VerCliente/>}/>
          <Route path="editar/:id" element={<EditarCliente/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
