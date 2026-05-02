import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { nanoid } from "nanoid";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "url_shortener_db",
});

const prismaClient = new PrismaClient({
  adapter,
  log: ["query"],
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

// create short url
app.post("/shorten", async (req, res) => {
  try {
    const { original } = req.body;

    if (!original) {
      return res.status(400).json({ message: "Original URL required" });
    }

    const shortCode = nanoid(6);

    const url = await prismaClient.url.create({
      data: {
        original: original,
        shortCode: shortCode,
      },
    });

    return res.status(201).json({
      message: "URL created successfully",
      shortUrl: `http://localhost:${PORT}/${shortCode}`,
      original: url.original,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//Redirect short url

app.get('/:shortCode',async(req,res)=>{
  try {
    const {shortCode} = req.params;

const url = await prismaClient.url.findUnique({
     where:{shortCode}
})

if(!url){
  return res.status(404).json({message:"Url not found"})
}

res.redirect(url.original)
}catch (error) {
    return res.status(500).json({ message: "Something went wrong"});
}
})

//Get all urls

app.get('/api/urls',async(req,res)=>{
  const urls = await prismaClient.url.findMany();

  return res.status(200).json({message:"Successfully fetched urls",urls})
})

app.listen(PORT, () => {
  console.log(`Server running on PORT no ${PORT}`);
});