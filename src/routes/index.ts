import { Router } from 'express'
import {
  addBook,
  deleteBook,
  getBooks,
  updateBook,
  getSingleBook,
} from '../controllers/books'

const router: Router = Router()

router.get('/books', getBooks)

/* router.options('*', cors()) */
router.post('/books', addBook)

router.put('/books/:id', updateBook)

router.delete('/books/:id/delete', deleteBook)

router.get('/books/:id', getSingleBook)

export default router
