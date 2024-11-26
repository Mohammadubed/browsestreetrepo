import { Shop } from '@mui/icons-material';
import Cookies from 'js-cookie';

export function setToken(token,b=null){
    if(b===null){

        Cookies.set('token', token);
    } else{
        Cookies.set('token',token,{expires:b})
    }
}

export function setIsShopExist(exist){

    if(exist === "Exist" ){
        
        Cookies.set('IsShopExist',true)
    } else {

        Cookies.set('IsShopExist',false)
    }
}

export const getIsShopExist = () => {
    const cookieValue = Cookies.get('IsShopExist');
    
    if (cookieValue === null) {
        return false;
    }
    
    return cookieValue === 'true';
};

export function getToken(){

    return Cookies.get('token')||null;
}

export function deleteToken(){

    Cookies.remove('token')
}