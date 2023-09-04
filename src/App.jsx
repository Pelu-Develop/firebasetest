import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDuqtAVR2Rbm0hlbe0_2lLrlOri5KXtpzg",
  authDomain: "reactfirebase-20f68.firebaseapp.com",
  projectId: "reactfirebase-20f68",
});

export const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  const db = getFirestore(firebaseApp);
  const userCollectionRef = collection(db, "users");

  async function criarUser() {
    const user = await addDoc(userCollectionRef, {
      name,
      email,
    });
    console.log(user);
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  async function deleteUser(id) {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Nome..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={criarUser}>Criar user</button>
      <ul>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <button onClick={() => deleteUser(user.id)}>Deletar</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
