import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { UserSettings } from 'src/schemas/userSettings.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    const settingsData = settings || {};
    const newSettings = new this.userSettingsModel(settingsData);
    const savedNewSettings = await newSettings.save();
    const newUser = new this.userModel({
      ...createUserDto,
      settings: savedNewSettings._id,
    });
    console.log();
    return newUser.save();
  }
  async updateUser(id: string, { settings, ...updateUserDto }: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    if (settings) {
      await this.userSettingsModel.findByIdAndUpdate(user.settings, settings);
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  async getUsers() {
    return this.userModel.find().select('username fullname registrationDate');
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username: username });
  }
}
