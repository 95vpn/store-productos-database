const Replicate = require("replicate");
const Product = require('../models/Product');

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

const generateImage = async (req, res) => {
  const { productId, userPrompt } = req.body;

  if (!productId || !userPrompt) {
    return res.status(400).json({ error: "Product ID and user prompt are required" });
  }

  try {
    // Buscar el producto en la base de datos
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Combina el prompt del usuario con los campos del producto
    const prompt = `
      User Input: ${userPrompt}. 
      Product Name: ${product.nombre_product}, 
      Description: ${product.description}, 
      Price: $${product.price}, 
      Stock: ${product.stock} units. 
      Supplier: ${product.proveedor}.`;

    const input = {
      cfg: 4.5,
      prompt,
      aspect_ratio: "1:1",
      output_format: "webp",
      output_quality: 79,
      negative_prompt: "ugly, distorted",
    };

    const output = await replicate.run("stability-ai/stable-diffusion-3", {
      input,
    });

    return res.json(output);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generateImage,
};