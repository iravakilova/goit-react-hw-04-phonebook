import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styled from 'styled-components';

const ListItem = styled.li`
  font-size: ${p => p.theme.fontSizes.m};
  padding-bottom: ${p => p.theme.space[3]}px;
`;

const Button = styled.button`
  width: 100px;
  font-size: ${p => p.theme.fontSizes.s};
  border: ${p => p.theme.borders.borderTable};
  border-radius: ${p => p.theme.radii.normal};
  background-color: transparent;
  margin-left: ${p => p.theme.space[4]}px;
  padding-top: ${p => p.theme.space[2]}px;
  padding-bottom: ${p => p.theme.space[2]}px;
  &:focus {
    background-color: ${p => p.theme.colors.secondary};
  }
`;

export const Contacts = ({ contacts, onClickDelete }) => {
  return (
    <ul>
      {contacts.map(contact => (
        <ListItem key={nanoid()}>
          <span>
            {contact.name}: {contact.number}
          </span>
          <Button
            type="button"
            id={contact.number}
            onClick={() => onClickDelete(contact.id)}
          >
            Delete
          </Button>
        </ListItem>
      ))}
    </ul>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
