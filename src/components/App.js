import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Box } from './Box';
import { Phonebook } from './Phonebook';
import { Contacts } from './Contacts';
import { Filter } from './Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onSubmitData = data => {
    const filteredNames = this.state.contacts.filter(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    );
    console.log(filteredNames);

    if (filteredNames.length > 0) {
      alert(`${data.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  filterByName = value => {
    this.setState({
      filter: value.filter,
    });
  };

  onClickDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const savedData = localStorage.getItem('contacts');

    if (savedData) {
      this.setState({ contacts: JSON.parse(savedData) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <Box m={4}>
        <GlobalStyle />
        <h1>Phonebook</h1>
        <Phonebook onSubmit={this.onSubmitData} />
        <h2>Contacts</h2>
        <Filter onChange={this.filterByName} />
        <Contacts
          contacts={this.state.contacts}
          onClickDelete={this.onClickDelete}
        />
      </Box>
    );
  }
}
