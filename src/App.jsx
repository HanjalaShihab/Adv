import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Homepage/Home.jsx'
import About from './pages/About/About.jsx'
import Admin from './pages/Admin.jsx'
import CaseDetail from './pages/CaseDetail.jsx'
import Contact from './pages/Contact/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import Projects from './pages/Cases/Projects.jsx'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="case/:id" element={<CaseDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
