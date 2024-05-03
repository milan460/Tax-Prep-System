import '@trussworks/react-uswds/lib/index.css';
import '@trussworks/react-uswds/lib/uswds.css';
// import { useState } from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Header, FooterReal, PersonalInfoForm, SignIn, Register, W2Form, ReviewPage, ResultsPage, INT1099Form  } from "./components"
import './i18n'; // Importing the i18n configuration file from the src folder


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
                        <Route path="/w2-form" element={<W2Form/>}/>
                        <Route path="/int-1099-form" element={<INT1099Form/>}/>
                        <Route path="/review-page" element={<ReviewPage/>}/>
                        <Route path="/results-page" element={<ResultsPage/>}/>
                    </Routes>
                <FooterReal />
            </div>
        </BrowserRouter>
    </>
  )
}

export default App