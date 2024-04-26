import '@trussworks/react-uswds/lib/index.css';
import '@trussworks/react-uswds/lib/uswds.css';
// import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Header, FooterReal, PersonalInfoForm, SignIn, Register} from "./components"

function App() {

  return (
    <>
      <BrowserRouter>
            <div>
                <Header />
                    <Routes>
                        <Route path="/" element={<SignIn />}/>
                        <Route path="/personal-info-form" element={<PersonalInfoForm/>}/>
                        <Route path="/register" element={<Register/>}/>
                    </Routes>
                <FooterReal />
            </div>
        </BrowserRouter>
    </>
  )
}

export default App
