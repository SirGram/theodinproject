import mongoose from 'mongoose';
import { IUser, IMessage } from '../types/interfaces';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { connectToDB } from '../config/db';

async function dropData() {
  try {
    // Drop previous db
    await mongoose.connection.db.dropCollection('users');
    console.log('Collection users is dropped.');
    await mongoose.connection.db.dropCollection('messages');
    console.log('Collection messages is dropped.');
  } catch (err) {
    console.error('Error dropping data:', err);
  }
}
async function populateData() {
  try {
    await connectToDB()
    await dropData()
    const users: IUser[] = await User.create([
      {
        userName: 'user1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'user1@example.com',
        password: 'hash_the_password',
      },
      {
        userName: 'user2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'user2@example.com',
        password: 'hash_the_password',
      },
    ]);

    const messages: IMessage[] = await Promise.all(
      users.map(async (user) => {
        try {
          const messageContent = `Message from ${user.userName}`;
          const message = new Message({ content: messageContent, sender: user._id });
          return message.save();
        } catch (error) {
          console.error(`Error creating message for user ${user.userName}:`, error);
        }
      }),
    );

    console.log('Created users:', users);
    console.log('Created messages:', messages);
  } catch (err) {
    console.error('Error populating data:', err);
  } finally {
    await mongoose.connection.close();
  }
}

populateData()
  .then(() => console.log('Process done'))
  .catch((error) => console.error('Error populating database:', error));
