import React, { useContext, useState, createContext, useEffect } from 'react';
import { auth } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signUp(email, pw) {
        return auth.createUserWithEmailAndPassword(email, pw);
    }

    function signIn(email, pw) {
        return auth.signInWithEmailAndPassword(email, pw);
    }

    function signOut() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user); // initially set user 
            setLoading(false); // then set loading to false
        })

        return unsubscribe;
    }, []);

    
    const value = { currentUser, signUp, signIn, signOut, resetPassword, updateEmail, updatePassword };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
