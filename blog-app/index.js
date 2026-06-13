import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');      
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let posts = [{
    id: '1',
    title: 'My First Post',
    content: 'This is the content of my first post.',
    Date: new Date()
}];
let nextId = 2;

app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.get('/compose', (req, res) => {
    res.render('compose');
});

app.post('/compose', (req, res) => {
    const newPost = {
        id: String(nextId++),
        title: req.body.title,
        content: req.body.content,
        Date: new Date()
    };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/posts/:id', (req, res) => {
    const foundPost = posts.find(post => post.id === req.params.id);
    if (foundPost) {
        res.render('post', { post: foundPost });
    } else {
        res.status(404).send('Post not found');
    }
});

app.get('/posts/:id/edit', (req, res) => {
    const foundPost = posts.find(post => post.id === req.params.id);
    if (foundPost) {
        res.render('edit', { post: foundPost });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/posts/:id/edit', (req, res) => {
    const foundPost = posts.find(post => post.id === req.params.id);
    if (foundPost) {
        foundPost.title = req.body.postTitle;
        foundPost.content = req.body.postBody;
        res.redirect(`/posts/${foundPost.id}`);
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/posts/:id/delete', (req, res) => {
    posts = posts.filter(post => post.id !== req.params.id);
    res.redirect('/');
});

app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`);
})