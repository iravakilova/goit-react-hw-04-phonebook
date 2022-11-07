// import { Component } from 'react';
import { useState, useEffect } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Box } from './Box';
import { Phonebook } from './Phonebook';
import { Contacts } from './Contacts';
import { Filter } from './Filter';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    setContacts(JSON.parse(window.localStorage.getItem('contacts')));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmitData = data => {
    if (contacts.filter(contact => contact.name === data.name).length > 0) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts(prevState => {
      return [
        ...prevState,
        { name: data.name, number: data.number, id: data.id },
      ];
    });
  };

  const filterByName = e => {
    setFilter(e.currentTarget.value);
  };

  const onClickDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredNames = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Box m={4}>
      <GlobalStyle />
      <h1>Phonebook</h1>
      <Phonebook onSubmit={onSubmitData} />
      <h2>Contacts</h2>
      <Filter onChange={filterByName} />
      <Contacts contacts={filteredNames} onClickDelete={onClickDelete} />
    </Box>
  );
};
