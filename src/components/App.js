import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import uuid from 'react-uuid';
import './App.css';
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetails from "./ContactDetails";
import EditContact from "./EditContact";
import api from "../api/contacts";

function App() {
  const [contacts, setContacts] = useState([]);

  //Retrieve Contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  } ;
  
  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const {id} = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? {...response.data} : contact;
      })
    );
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };



  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if(retriveContacts) setContacts(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if(allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    // if(contacts?.length){
    //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    // }
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />} />
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path="/edit" element={<EditContact updateContactHandler={updateContactHandler} />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
