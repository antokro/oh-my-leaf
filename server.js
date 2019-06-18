const setupServer = require('./setup-server');
const app = setupServer();

const User = require('./models/User');
const Listing = require('./models/Listing');

app.get('/listings', (req, res) => {
  Listing.find()
    .populate('user_id')
    .then(listing => {
      res.json(listing);
    })
    .catch(err => res.json(err));
});

app.get('/users', (req, res) => {
  User.find()
    .then(listing => res.json(listing))
    .catch(err => res.json(err));
});

app.post('/users', function(req, res) {
  User.create(req.body).then(data => res.json(data));
});

app.get('/users/:id', function(req, res) {
  const id = req.params.id;
  User.findById(id).then(user => res.json(user.favourites));
});

app.get('/users/:id/listings', function(req, res) {
  const id = req.params.id;
  User.findById(id)
    .populate('listings')
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.post('/listings', function(req, res) {
  Listing.create(req.body)
    .then(listing => {
      User.findById(req.body.user_id).then(user => {
        user.listings.push(listing._id);
        user.save();
      });
      res.json('Your listing has been published');
    })
    .catch(err => res.json(err));
});

app.patch('/listings/:id', function(req, res) {
  const id = req.params.id;
  Listing.findByIdAndUpdate(id, req.body.listing, { new: true })
    .then(() => res.json('Your changes have been saved'))
    .catch(err => res.json(err));
});

app.patch('/users/:id', function(req, res) {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.patch('/users/:id/favourites', function(req, res) {
  const user_id = req.params.id;
  const listing_id = req.body.listing_id;
  User.findByIdAndUpdate(user_id, listing_id, { new: true })
    .then(user => {
      const index = user.favourites.indexOf(listing_id);
      user.favourites = user.favourites.includes(listing_id)
        ? [
            ...user.favourites.slice(0, index),
            ...user.favourites.slice(index + 1)
          ]
        : [...user.favourites, listing_id];
      user.save();
      res.json(user);
    })
    .catch(err => console.log(err));
});

app.delete('/listings/:id', function(req, res) {
  const id = req.params.id;
  Listing.findByIdAndDelete(id)
    .then(deletedListing => {
      User.findById(deletedListing.user_id).then(user => {
        const index = user.listings.indexOf(id);
        user.listings = user.listings.includes(id) && [
          ...user.listings.slice(0, index),
          ...user.listings.slice(index + 1)
        ];
        user.favourites = user.favourites.includes(id) && [
          ...user.favourites.slice(0, index),
          ...user.favourites.slice(index + 1)
        ];
        user.save();
        res.json('Your listing has been deleted');
      });
    })
    .catch(err => console.log(err));
});
