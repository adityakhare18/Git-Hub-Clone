import React from 'react';
import { useState,useEffect,useContext,createContext } from 'react';

// Available rahega throughtOut the application
const AuthContext=createContext();


export const useAuth=()=>{
    return useContext(AuthContext);
}

export const AuthProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    useEffect(()=>{
        // check if user is logged in or not
        const userId=localStorage.getItem('userId');
        if(userId){
            setCurrentUser(userId);
        }
    },[]);
    const value={
        currentUser,setCurrentUser
    }
    // to provide these value into login Page to set its ID
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
