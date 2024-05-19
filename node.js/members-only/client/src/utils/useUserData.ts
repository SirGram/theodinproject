import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export function useUserData(){
const {setUserData, setIsAuthenticated}= useAuth()

useEffect(()=>{
    async function getUser(token:string){
      try{
        const response = await axios.get("http://localhost:3001/api/users/me",{ headers: {
          Authorization: `Bearer ${token}`,}
        },)
        setIsAuthenticated(true);
        setUserData(response.data.user);
        console.log(response.data.user)
      }catch(err){
        console.error(err);
      }
    }
    const token = localStorage.getItem("token")
    if(token){
      getUser(token)
    }
    console.log(token)
  },[])  
}