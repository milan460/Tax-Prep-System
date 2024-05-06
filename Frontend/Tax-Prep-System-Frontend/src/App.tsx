import '@trussworks/react-uswds/lib/index.css';
import '@trussworks/react-uswds/lib/uswds.css';
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Header, FooterReal, PersonalInfoForm, SignIn, Register, W2Form, ReviewPage, ResultsPage, INT1099Form, AdminPage, Home  } from "./components"
import './i18n'; // Importing the i18n configuration file from the src folder
import { useState } from 'react';


function App() {

  const [currentPage, setCurrentPage] = useState(0);
  
  return (
    <>
      <BrowserRouter>
            <div id='mainRootDiv'>
                <Header currentPage={currentPage}/>
                    <Routes>
                        <Route path="/" element={<SignIn/>}/>
                        <Route path="/personal-info-form" element={<PersonalInfoForm setCurrentPage={setCurrentPage}/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/w2-form" element={<W2Form setCurrentPage={setCurrentPage}/>}/>
                        <Route path="/int-1099-form" element={<INT1099Form setCurrentPage={setCurrentPage}/>}/>
                        <Route path="/review-page" element={<ReviewPage setCurrentPage={setCurrentPage}/>}/>
                        <Route path="/results-page" element={<ResultsPage setCurrentPage={setCurrentPage}/>}/>
                        <Route path="/admin-page" element={<AdminPage/>}/>
                        <Route path="/home" element={<Home setCurrentPage={setCurrentPage}/>}/>

                    </Routes>
                <FooterReal />
            </div>
        </BrowserRouter>
    </>
  )
}

export default App
