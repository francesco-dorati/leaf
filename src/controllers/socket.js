const chalk = require('chalk');
const debug = require('debug')('app:socket');
const mongodb = require('mongodb');
const { MongoClient } = require('mongodb');

const socketController = (socket) => {
  debug(chalk.yellow('Socket Connection'));

  socket.on('post-submit', (post) => {
    const {
      username, imgPath, time, body, code,
    } = post;
    let id;

    const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'Leaf';
    const client = new MongoClient(url, { useNewUrlParser: true });
    client.connect(async (err) => {
      if (err) debug(chalk.red(err));
      const collection = client.db(dbName).collection(code);
      debug('Connected to Server');
      const postContent = {
        username, imgPath, time, body, votes: 0, userVotes: [],
      };

      const result = await collection.insertOne(postContent);

      id = result.insertedId;

      socket.broadcast.emit('main', {
        _id: id,
        ...post,
      });

      client.close();
    });
  });

  socket.on('post-voted', (message) => {
    const {
      id, value, username, type, action, code,
    } = message;

    const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'Leaf';
    const client = new MongoClient(url, { useNewUrlParser: true });
    client.connect(async (err) => {
      if (err) debug(err);
      const collection = client.db(dbName).collection(code);
      debug('Connected to Server');

      const voteResult = await collection.update(
        { _id: new mongodb.ObjectID(id) },
        { $inc: { votes: value } },
      );

      switch (action) {
        case 'create':
          await collection.update(
            { _id: new mongodb.ObjectID(id) },
            { $push: { userVotes: { user: username, type } } },
          );
          break;

        case 'replace':
          // let it go inside the user Votes
          await collection.updateOne(
            { _id: new mongodb.ObjectID(id), 'userVotes.user': username },
            { $set: { 'userVotes.$.type': type } },
          );
          break;

        case 'remove':
          await collection.update(
            { _id: new mongodb.ObjectID(id) },
            { $pull: { userVotes: { user: username } } },
          );
          break;

        default:
          debug(chalk.red(action));
      }

      debug(voteResult);

      client.close();
    });
  });

  socket.on('chat', (message) => {
    debug(message);

    const url = 'mongodb+srv://admin:admin@leaf-8y7iy.mongodb.net/test?retryWrites=true&w=majority';
    const dbName = 'Leaf';
    const client = new MongoClient(url, { useNewUrlParser: true });

    client.connect(async (err) => {
      if (err) debug(chalk.red(err));
      const collection = client.db(dbName).collection('users');

      const chatExist = await collection.findOne({
        username: message.sender,
        chats: { $elemMatch: { username: message.receiver } },
      });

      if (chatExist) {
        // Sender
        await collection.updateOne(
          { username: message.sender, chats: { $elemMatch: { username: message.receiver } } },
          {
            $push: {
              'chats.$.messages': {
                sent: true,
                time: message.time,
                body: message.body,
              },
            },
          },
        );

        // Receiver
        await collection.updateOne(
          { username: message.receiver, chats: { $elemMatch: { username: message.sender } } },
          {
            $inc: { notifications: 1, 'chats.$.notifications': 1 },
            $push: {
              'chats.$.messages': {
                sent: false,
                time: message.time,
                body: message.body,
              },
            },
          },
        );
      } else {
        // Sender
        await collection.updateOne(
          { username: message.sender },
          {
            $push: {
              chats: {
                username: message.receiver,
                notifications: 0,
                messages: [
                  {
                    sent: true,
                    time: message.time,
                    body: message.body,
                  },
                ],
              },
            },
          },
        );

        // Receiver
        await collection.updateOne(
          { username: message.receiver },
          {
            $inc: { notifications: 1 },
            $push: {
              chats: {
                username: message.sender,
                notifications: 1,
                messages: [
                  {
                    sent: false,
                    time: message.time,
                    body: message.body,
                  },
                ],
              },
            },
          },
        );
      }

      client.close();
    });

    socket.broadcast.emit(`${message.receiver}`, {
      sender: message.sender,
      time: message.time,
      body: message.body,
    });
  });
};

module.exports = socketController;
