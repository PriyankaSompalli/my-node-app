const Book = require('./models/book');


app.post('/books', async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send();
  }
});


app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
});


app.patch('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
});