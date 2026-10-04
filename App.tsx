import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import { AuthProvider } from './auth/AuthContext'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Tutorials from './pages/Learning'
import Subscription from './pages/Subscription'
import { SoftwareDetail, SoftwareList } from './pages/Software'
import { About, Legal, Search, Support } from './pages/Static'
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
              <Route path="tutorials" element={<Tutorials />} />
              <Route path="learning" element={<Navigate to="/tutorials" replace />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="software" element={<SoftwareList />} />
              <Route path="software/:id" element={<SoftwareDetail />} />
              <Route path="about" element={<About />} />
              <Route path="support" element={<Support />} />
              <Route path="contact" element={<Navigate to="/support" replace />} />
              <Route path="terms" element={<Legal kind="terms" />} />
              <Route path="privacy" element={<Legal kind="privacy" />} />
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
