const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage
let products = [];
let nextId = 1;

// GET - Ambil semua produk
app.get("/products", (req, res) => {
  res.json(products);
});

// GET - Ambil produk berdasarkan ID
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
  res.json(product);
});

// POST - Tambah produk baru
app.post("/products", (req, res) => {
  const { name, price, stock } = req.body;

  if (!name || price == null || stock == null) {
    return res.status(400).json({ message: "Field name, price, dan stock wajib diisi" });
  }

  const product = { id: nextId++, name, price, stock };
  products.push(product);
  res.status(201).json(product);
});

// PUT - Update produk
app.put("/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Produk tidak ditemukan" });

  const { name, price, stock } = req.body;

  if (!name || price == null || stock == null) {
    return res.status(400).json({ message: "Field name, price, dan stock wajib diisi" });
  }

  products[index] = { ...products[index], name, price, stock };
  res.json(products[index]);
});

// DELETE - Hapus produk
app.delete("/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Produk tidak ditemukan" });

  const deleted = products.splice(index, 1)[0];
  res.json({ message: "Produk berhasil dihapus", product: deleted });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
