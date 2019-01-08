import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/twitter', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  tweet: String,
  author: String,
  createdAt: Date,
});

const ObjectId = mongoose.Types.ObjectId;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};

const TweetModel = mongoose.model('Tweet', tweetSchema);

export default {
  getTweets: () => TweetModel.find().sort({ _id: -1 }),
  getTweet: _id => TweetModel.findOne({ _id }),
  createTweet: args => TweetModel(args).save(),
  deleteTweet: (args) => {
    const { _id } = args;

    TweetModel.remove({ _id }, (error) => {
      if (error) {
        console.log('Error Removing:', error);
      }
    });

    return args;
  },
  updateTweet: (args) => {
    const { _id, tweet } = args;

    TweetModel.update({ _id }, {
      $set: {
        tweet,
      },
    },
    { upsert: true }, (error) => {
      if (error) {
        console.log('Error Updating:', error);
      }
    });

    args.author = 'codejobs';
    args.createdAt = new Date();

    return args;
  },
};
