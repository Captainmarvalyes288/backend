/* import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const port = 3000;

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

let posts = [
    {
        id: 1,
        title: "First Post",
        content: "This is the first post.",
        image: "/images/gojo.jpg", 
    },
    {
        id: 2,
        title: "Second Post",
        content: "This is the second post.",
        image: "/images/itachi.jpg", 
    }
];

// Set up body-parser and static files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const _filename = new URL(import.meta.url).pathname;  
const _dirname = path.dirname(_filename);
app.use(express.static(path.join(_dirname, 'public')));

// Serve index.html
app.get('/', (req, res) => {
    const _filename = new URL(import.meta.url).pathname;  
    const _dirname = path.dirname(_filename);
  res.render("index.ejs", { posts: posts });
});

// Handle form submission
app.post('/submit', upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  const imagePath = req.file.path;

  // Save data to database or file
  console.log(`Title: ${title}`);
  console.log(`Content: ${content}`);
  console.log(`Image path: ${imagePath}`);

  res.redirect('/');
});

// Handle image deletion
app.get('/delete/:filename', (req, res) => {
  const _filename = new URL(import.meta.url).pathname;  
    const { filename } = req.params;
    const _dirname = path.dirname(_filename);
  const imagePath = path.join(_dirname, 'uploads', filename);

  // Delete image from filesystem
  fs.unlinkSync(imagePath);

  res.redirect('/');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
*/

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import multer from "multer"; // Import multer for handling file uploads

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [
  {
      id: 1,
      title: "First Post",
      content: "This is the first post.",
      image: "./images/gojo.jpg",
  },
  {
      id: 2,
      title: "Second Post",
      content: "This is the second post.",
      image: "./images/itachi.jpg",
  }
];

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/images')); // Destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original filename for uploaded images
    }
});
const upload = multer({ storage: storage });

app.get("/", function (req, res) {
    res.render("index.ejs", { posts: posts });
});

app.post("/addPost", upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? "/images/" + req.file.filename : "/images/naruto.jpg"; // Assuming you have a default image
    const newPost = { id: posts.length + 1, title : title, content : content, image : image };
    posts.push(newPost);
    res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(post => post.id !== parseInt(postId));
    res.redirect("/");
});

// Serve images statically
const _filename = new URL(import.meta.url).pathname;
const _dirname = path.dirname(_filename);

app.use("/images", express.static(path.join(_dirname, "public/images")));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
