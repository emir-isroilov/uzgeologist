import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { AuthProvider } from './auth/AuthContext'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Learning from './pages/Learning'
import { SoftwareDetail, SoftwareList } from './pages/Software'
import { About, Contact, Search } from './pages/Static'
import { Account, Login, Register } from './pages/Auth'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="learning" element={<Learning />} />
              <Route path="software" element={<SoftwareList />} />
              <Route path="software/:id" element={<SoftwareDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="search" element={<Search />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="account" element={<Account />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  )
}
