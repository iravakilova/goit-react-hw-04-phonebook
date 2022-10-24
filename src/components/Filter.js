import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';

const schema = yup.object({
  filter: yup.string(),
});

const initialValues = {
  filter: ' ',
};

const FormField = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Label = styled.label`
  font-size: ${p => p.theme.fontSizes.m};
  color: ${p => p.theme.colors.black};
  margin-top: ${p => p.theme.space[4]}px;
  margin-bottom: ${p => p.theme.space[4]}px;
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

export const Filter = ({ onChange }) => {
  const onFormSubmit = (values, { resetForm }) => {
    console.log(values);
    onChange(values);
    resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onFormSubmit}
      validationSchema={schema}
    >
      <FormField>
        <Label>
          Find contacts by name
          <Input type="text" name="filter" />
          <Warning name="filter" component="div" />
        </Label>
      </FormField>
    </Formik>
  );
};
