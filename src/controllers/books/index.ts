import { Response, Request } from 'express'
import { IBook } from '../../types/books'
import Book from '../../models/books'

export const addBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IBook, 'title' | 'author' | 'year'>

    const book: IBook = new Book({
      title: body.title,
      author: body.author,
      year: body.year,
    })
    delete book._id

    const newBook: IBook = await book.save()
    const allBooks: IBook[] = await Book.find()

    res
      .status(201)
      .json({ message: 'Book added', book: newBook, books: allBooks })
  } catch (error) {
    console.log(error)
  }
}
export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {}
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books: IBook[] = await Book.find()
    res.status(200).json({ books })
  } catch (error) {
    throw error
  }
}
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {}
export const getSingleBook = async (
  req: Request,
  res: Response
): Promise<void> => {}
