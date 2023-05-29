import db from "../firebase/firebaseConfig.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

const portfolioRef = collection(db, "portfolio");

class Services {
  addMessage = async (newMessage) => {
    try {
      const docRef = await addDoc(portfolioRef, newMessage);
      return docRef;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

const services = new Services();

export default services;