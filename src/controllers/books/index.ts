import { Response, Request } from 'express'
import { IBook } from '../../types/books'
import Book from '../../models/books'
import xss from 'xss'

export const addBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IBook, 'title' | 'author' | 'year'>

    const book: IBook = new Book({
      title: xss(body.title),
      author: xss(body.author),
      year: body.year,
    })
    /*  delete book._id //! not working */

    const newBook: IBook = await book.save()
    const allBooks: IBook[] = await Book.find()

    res
      .status(201)
      .json({ message: 'Book added', book: newBook, books: allBooks })
  } catch (error: any) {
    res.status(500).json({ error: new Error(error) })
  }
}
export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bookToDelete: IBook | null = await Book.findOne({
      id: req.params.id,
    })
    const deletedBook = await bookToDelete?.delete()

    const allBooks: IBook[] = await Book.find()
    res.status(200).json({
      message: 'Book deleted',
      book: deletedBook,
      books: allBooks,
    })
  } catch (err: any) {
    res.status(500).json({ error: new Error(err) })
  }
}
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books: IBook[] = await Book.find()
    res.status(200).json({ books })
  } catch (error: any) {
    res.status(500).json({ error: new Error(error) })
  }
}
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req
    const book = {
      title: xss(body.title),
      author: xss(body.author),
      year: body.year,
    }

    const updatedBook: IBook | null = await Book.findOneAndUpdate(
      { id: id },
      book
    )
    const allBooks: IBook[] = await Book.find()
    res.status(200).json({
      message: 'Book updated',
      book: updatedBook,
      books: allBooks,
    })
  } catch (error: any) {
    res.status(500).json({ error: new Error(error) })
  }
}
export const getSingleBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  {
    try {
      const book: IBook | null = await Book.findOne({ id: req.params.id })
      res.status(200).json({ book })
    } catch (error: any) {
      res.status(500).json({ error: new Error(error) })
    }
  }
}
