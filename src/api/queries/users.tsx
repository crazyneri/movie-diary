import axios from "axios";

const users_url = 'http://localhost:3004/users';
export const getUserObject = async (userId: string | number) => {
   if(userId === 0 || userId === '') return false;

   const result = await axios.get(`${users_url}/${userId}`);
   const userData = result.data;

   if(!!userData?.id)
   {
       return userData;
   }
   return false;
}

export const getLoggedInUserId = () => {
   const user = localStorage.getItem('user');
   if(user === null) return false;

   const userId = JSON.parse(user).id;
   if(userId === '') return false;

   return userId;
}