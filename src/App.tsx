import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import ForumPage from './pages/ForumPage'
import NewThreadPage from './pages/NewThreadPage'
import ArticlesPage from './pages/ArticlesPage'
import EducationPage from './pages/EducationPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminDashboard from './pages/AdminDashboard'

console.log('App component loaded')

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="call-center-theme">
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/forum/new" element={<NewThreadPage />} />
            <Route path="/forum/:category" element={<ForumPage />} />
            <Route path="/artikel" element={<ArticlesPage />} />
            <Route path="/artikel/:slug" element={<ArticlesPage />} />
            <Route path="/ojk-regulasi" element={<EducationPage />} />
            <Route path="/edukasi-keuangan" element={<EducationPage />} />
            <Route path="/kontak" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App