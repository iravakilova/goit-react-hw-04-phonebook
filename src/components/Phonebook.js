import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import styled from 'styled-components';

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.string().min(6).required(),
});

const id = nanoid();

const Formfield = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-top: ${p => p.theme.space[4]}px;
`;

const Label = styled.label`
  font-size: ${p => p.theme.fontSizes.m};
  color: ${p => p.theme.colors.black};
`;

const Input = styled(Field)`
  width: 100%;
  height: 25px;
  font-size: ${p => p.theme.fontSizes.s};
  color: ${p => p.theme.colors.text};
  border: ${p => p.theme.borders.normal};
  &:focus {
    outline: none;
    border: 3px solid;
    border-color: ${p => p.theme.colors.secondary};
  }
`;

const Warning = styled(ErrorMessage)`
  color: orange;
`;

const Button = styled.button`
  width: 50%;
  font-size: ${p => p.theme.fontSizes.s};
  background-color: ${p => p.theme.colors.primary};
  border: ${p => p.theme.borders.borderTable};
  border-radius: ${p => p.theme.radii.normal};
  padding-top: ${p => p.theme.space[2]}px;
  padding-bottom: ${p => p.theme.space[2]}px;
  margin-bottom: ${p => p.theme.space[4]}px;
`;

export const Phonebook = ({ onSubmit }) => {
  const initialValues = {
    name: '',
    number: '',
  };
  const handleSubmit = (values, { resetForm }) => {
    values.id = nanoid();
    console.log(values);
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Formfield autoComplete="off">
        <Label htmlFor="name">
          Name
          <Input
            id={id}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <Warning name="name" component="div" />
        </Label>
        <br />
        <Label htmlFor="number">
          Number
          <Input
            id={id}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <Warning name="number" component="div" />
        </Label>
        <br />
        <Button type="submit">Add contact</Button>
      </Formfield>
    </Formik>
  );
};
