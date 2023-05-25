import db from "../firebase/firebaseConfig.js";
import {
collection,
addDoc,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

const portfolioRef = collection(db, "portfolio");

class Services {

addMessage = async (newMessage) => {
  return await addDoc(portfolioRef, newMessage)
  }
}

let services = new Services;

export default services;