import { Routes, Route } from 'react-router-dom'
import IndexPage from './pages/IndexPage'
import AdvancedSearchPage from './pages/AdvancedSearchPage'
import BookDetailPage from './pages/BookDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage/>}/>
      <Route path="/search" element={<AdvancedSearchPage/>}/>
      <Route path="/book/:bookId" element={<BookDetailPage/>}/>
    </Routes>
  )
}

export default App
