const setupServer = require('./setup-server');
const app = setupServer();

const User = require('./models/User');
const Listing = require('./models/Listing');

app.get('/listings', (req, res) => {
  Listing.find()
    .populate('user_id')
    .then(listing => res.json(listing))
    .catch(err => res.json(err));
});

app.post('/listings', function(req, res) {
  Listing.create(req.body)
    .then(listing => {
      User.findById(req.body.user_id).then(user => {
        user.listings.push(listing._id);
        user.save();
      });
      res.json(listing);
    })
    .catch(err => res.json(err));
});

/*app.delete('/listing', (req, res) => {
  Listing.findByIdAndDelete(req.body.listibgID).then(deletedListing => {
    User.findById(deletedListing.user).then(user => {
      const listingIndex = user.listings.i;
    });
  });
});*/

app.get('/users', (req, res) => {
  User.find()
    .then(listing => res.json(listing))
    .catch(err => res.json(err));
});

app.get('/users/:id', function(req, res) {
  const id = req.params.id;
  User.findUserById(id).then(user => res.json(user.favourites));
});

app.patch('/users/:id/favourites', function(req, res) {
  const id = req.params.id;
  User.findById(id).then(user => {
    const index = user.listings.indexOf(req.body);
    const newFavourites = user.listings.includes(req.body)
      ? [...user.listings.slice(0, index), ...user.listings.slice(index + 1)]
      : [...user.listings, id];
    User.findByIdAndUpdate(id, newFavourites, { new: true })
      .then(favourites => res.json(favourites))
      .catch(err => res.json(err));
  });
});

app.get('/getUserById', function(req, res) {
  User.findById(req.body.userId)
    .populate('listings')
    .then(user => res.json(user))
    .catch(err => res.json(err));
});
