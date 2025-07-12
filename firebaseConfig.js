import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBpCAA_zXk2ElNZ8wk4lu_Zh45TyQdZ1ug",
  authDomain: "cyclesync-bcfdc.firebaseapp.com",
  projectId: "cyclesync-bcfdc",
  storageBucket: "cyclesync-bcfdc.firebasestorage.app",
  messagingSenderId: "1019349126653",
  appId: "1:1019349126653:web:75f85607e2643d6c629d94",
  measurementId: "G-GLY12LDJJ9",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// export const auth = getAuth(app);
export const db = getFirestore(app);
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import { initializeApp } from "firebase/app";
// import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBpCAA_zXk2ElNZ8wk4lu_Zh45TyQdZ1ug",
//   authDomain: "cyclesync-bcfdc.firebaseapp.com",
//   projectId: "cyclesync-bcfdc",
//   storageBucket: "cyclesync-bcfdc.appspot.com",
//   messagingSenderId: "1019349126653",
//   appId: "1:1019349126653:web:75f85607e2643d6c629d94",
//   measurementId: "G-GLY12LDJJ9",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

// export const db = getFirestore(app);
