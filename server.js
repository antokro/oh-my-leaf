const setupServer = require('./setup-server');
const app = setupServer();

const User = require('./models/User');
const Listing = require('./models/Listing');

app.get('/listing', (req, res) => {
  Listing.find()
    .populate('user_id')
    .then(listing => res.json(listing))
    .catch(err => res.json(err));
});

app.post('/listing', function(req, res) {
  Listing.create(req.body)
    .then(listing => res.json(listing))
    .catch(err => res.json(err));
});

app.get('/user', (req, res) => {
  User.find()
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post('/user', function(req, res) {
  User.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.get('/getUserById', function(req, res) {
  User.findById(req.body.userId)
    .populate('listings')
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

/*app.patch('/cards/:id', function(req, res) {
  const id = req.params.id;
  Card.findByIdAndUpdate(id, req.body, { new: true })
    .then(card => res.json(card))
    .catch(err => res.json(err));
});*/
