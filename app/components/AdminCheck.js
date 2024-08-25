import React, { useState, useEffect } from 'react';
import { auth, app } from '../navigation/firebase';
import { doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';

const db = getFirestore(app);

// const AdminView = async ({ children, props }) => {
//     const [isAdmin, setIsAdmin] = useState(null);

//     useEffect(() => {
//       const checkAdminStatus = async () => {
//         const adminStatus = await checkIsAdmin();
//         setIsAdmin(adminStatus);
//       };
  
//       setInterval(() => {
//         checkAdminStatus();
//       }, 1000);
//     }, []);

//     if ((!props.inverted && isAdmin) || (props.inverted && !isAdmin)) {
//         return (
//             <>
//                 {children}
//             </>
//         );
//     } else {
//         return (<></>);
//     }
// };

const adminCheck = async () => {
    const userId = await waitForUserId();
    const userDoc = await getDoc(doc(db, `users/${userId}`));
  
    if (userDoc.data() === undefined) return false;
    const userRole = userDoc.data().role;
  
    return userRole === 'admin';
}

function waitForUserId() {
    let userId = auth.currentUser.uid;

    return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
        if (typeof userId !== 'undefined' && userId !== null) {
            clearInterval(interval);
            resolve(userId);
        }
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        reject(new Error('Timeout: User was not retrieved in time.'));
    }, 5000);
    });
}

export default adminCheck;