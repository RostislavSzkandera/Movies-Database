import React from 'react';
import { useState, useEffect } from "react"
import { createContext, useContext } from "react";
import { auth } from "../firebase/config"
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        signOut, 
        onAuthStateChanged, 
        sendPasswordResetEmail
        } from "firebase/auth";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";




const AllContext = createContext()


export function AllContextProvider({children}) {
    const [user, setUser] = useState({})
    
    const [showModal, setShowModal] = useState(false)
    
    const navigate = useNavigate()
    
    const [visible, setVisible] = useState(false)
    
   
// Funkce pro otevírání a následné zavření notifikace
    const Modal = () => {
        setShowModal(true)
        setTimeout( () => {
            setShowModal(false)
        }, 5000)
    }
   
// Funkce pro scroll na začátek stránky
  const toggleVisible = () => { 
    const scrolled = document.documentElement.scrollTop; 
    if (scrolled > 300){ 
      setVisible(true) 
    }  
    else if (scrolled <= 300){ 
      setVisible(false) 
    } 
  }

  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
      
    })
  }
    
  useEffect( () => {
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener("scroll", toggleVisible)
  })
  


// Funkce pro přihlášení přes Google

    const SignWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then( (result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/movielist")
    }).catch((error) => {
        console.log(error)
      });
  }

// Funkce pro registraci 

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

// Funkce pro reset hesla

    function resetPassword( email ) {
        return sendPasswordResetEmail(auth, email )
    }
    
// Funkce pro přihlášení

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)

    }

// Funkce pro odhlášení

    function logOut() {
        return signOut(auth)
    }


    
    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    })

    return (
        <AllContext.Provider value={ {signUp, logIn, logOut, user, SignWithGoogle, resetPassword, showModal, setShowModal, Modal, visible, scrollToTop}}>
            {children}
        </AllContext.Provider>
    )
}

export function MyContext() {
    return useContext(AllContext)
}