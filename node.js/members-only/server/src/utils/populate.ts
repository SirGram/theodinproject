import mongoose, { Types } from "mongoose";
import { User } from "../models/user.model";
import { Message } from "../models/message.model";
import { connectToDB } from "../config/db";
import { AvatarGenerator } from "random-avatar-generator";
import { hash } from "bcryptjs";
import { IMessage, IUser } from "../types/interfaces";

async function dropData() {
  try {
    // Drop previous db
    await mongoose.connection.db.dropCollection("users");
    console.log("Collection users is dropped.");
    await mongoose.connection.db.dropCollection("messages");
    console.log("Collection messages is dropped.");
  } catch (err) {
    console.error("Error dropping data:", err);
  }
}

async function populateData() {
  const generator = new AvatarGenerator();

  async function createUsers(userData: IUser[]): Promise<IUser[]> {
    try {
      const createdUsers: IUser[] = [];
      for (const user of userData) {
        const hashedPassword = await hash(user.password, 10);
        const newUser = new User({
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: hashedPassword,
          avatar: generator.generateRandomAvatar(),
          registrationDate: new Date(),
          isPro: user.isPro, 
          signature: user.signature,
        });

        const savedUser = await newUser.save();
        createdUsers.push(savedUser);
        console.log(`User "${user.userName}" created successfully!`);
      }
      return createdUsers;
    } catch (error) {
      console.error(`Error creating users: ${error}`);
      return [];
    }
  }

  async function createMessages(messageData: string[], userData: IUser[]) {
    try {
      const messages: IMessage[] = [
        {
          content: messageData[0],
          sender: userData[0]._id as Types.ObjectId,
          timestamp: new Date(),
        },
        {
          content: messageData[1],
          sender: userData[0]._id as Types.ObjectId,
          timestamp: new Date(),
        },
        {
          content: messageData[2],
          sender: userData[1]._id as Types.ObjectId,
          timestamp: new Date(),
        },
        {
          content: messageData[3],
          sender: userData[2]._id as Types.ObjectId,
          timestamp: new Date(),
        },
      ];

      const createdMessages = await Message.insertMany(messages);
      console.log("Messages created successfully!");
      return createdMessages;
    } catch (error) {
      console.error(`Error creating messages: ${error}`);
      return [];
    }
  }

  try {
    await connectToDB();
    await dropData();

    const userData: IUser[] = [
      {
        userName: "user1",
        firstName: "John",
        lastName: "Doe",
        email: "user1@example.com",
        password: "password1",
        registrationDate: new Date(),
        avatar: generator.generateRandomAvatar(),
        signature:
          "I make videogames in my spare time. Wanna see them? Check them out at mystore.com",
        isPro: true,
      },
      {
        userName: "user2",
        firstName: "Jane",
        lastName: "Smith",
        email: "user2@example.com",
        password: "password2",
        registrationDate: new Date(),
        avatar: generator.generateRandomAvatar(),
        signature: "My dog's name is Belly",
        isPro: false,
      },
      {
        userName: "user3",
        firstName: "Hercules",
        lastName: "Copper",
        email: "user3@example.com",
        password: "password3",
        registrationDate: new Date(),
        avatar: generator.generateRandomAvatar(),
        isPro: true,
      },
    ];

    const messageData: string[] = [
      "Hello everyone.",
      "Is anybody there?",
      "Yes, we're here. How are you?",
      "Nice to meet you guys. This website is awesome!",
    ];

    const createdUsers = await createUsers(userData);
    if (createdUsers.length === 0) {
      throw new Error("No users created, cannot create messages");
    }

    const createdMessages = await createMessages(messageData, createdUsers);

    console.log("Created users:", createdUsers);
    console.log("Created messages:", createdMessages);
  } catch (err) {
    console.error("Error populating data:", err);
  } finally {
    await mongoose.connection.close();
  }
}

populateData()
  .then(() => console.log("Process done"))
  .catch((error) => console.error("Error populating database:", error));
