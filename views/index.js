import express from "express";
import bodyParser from "body-parser";
import path from "path"; 

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
        image: "/images/gojo.jpg", 
    },
    {
        id: 2,
        title: "Second Post",
        content: "This is the second post.",
        image: "/images/itachi.jpg", 
    }
];

app.get("/", function (req, res) {
    res.render("index.ejs", { posts: posts });
});

app.post("/addPost", (req, res) => {
    const { title, content } = req.body;
    const image = req.file ? "/images/" + req.file.filename : "/images/naruto.jpg"; // Assuming you have a default image
    const newPost = { id: posts.length + 1, title: title, content: content, image: image };
    posts.push(newPost);
    res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
    const postId = req.params.id;
    posts = posts.filter(post => post.id !== parseInt(postId));
    res.redirect("/");
});

// Serve images statically
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
