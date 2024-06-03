import { IBlogEntry, IUser } from '@/types/types';
import axios from 'axios'

export const baseUrl = 'http://localhost:3000'

export async function fetchBlogs():Promise<IBlogEntry[]>{
  const response = await axios.get(`${baseUrl}/blogs`);
  return response.data;
}

export async function fetchBlog(id:string):Promise<IBlogEntry>{
  const response = await axios.get(`${baseUrl}/blogs/${id}`);
  return response.data;
}

export async function fetchUsers():Promise<IUser[]>{
  const response = await axios.get(`${baseUrl}/users`);
  return response.data;
}

