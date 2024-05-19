import axios from 'axios';
import { useState, useEffect } from 'react';
import { IMessage } from '../types/types';



export const useMessages = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const url = 'http://localhost:3001/api/messages'
    const fetchData = async () => {
      try {
        const fetchedMessages = await axios.get(url);
        setMessages(fetchedMessages.data);
      } catch (error) {
        console.log(error) 
      }       
    };

    fetchData();
  }, []); 

  return { messages};
};


export const useAvatar = (url:string) => {
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAvatar = await axios.get(url);
        setAvatar(fetchedAvatar.data);
      } catch (error) {
        console.log(error) 
      }       
    };

    fetchData();
  }, []); 

  return { avatar};
};

