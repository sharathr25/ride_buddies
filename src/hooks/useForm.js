import { useState } from 'react';

const useForm = ({ initialValues, onValidate, onSubmit }) => {
  const [form, setForm] = useState({ values: initialValues, errors: {}, touched: {} });

  const setFormValue = (key) => (value) => {
    setForm({
      ...form,
      values: { ...form.values, [key]: value },
      touched: { ...form.touched, [key]: value ? true : false },
    });
  };

  const isValid = () => {
    const errors = onValidate(form.values);
    return Object.keys(errors).length === 0;
  };

  const validate = () => {
    const errors = onValidate(form.values);
    setForm({ ...form, errors });
  };

  const setError = (key, value) => {
    setForm({ ...form, errors: { ...form.errors, [key]: value } });
  };

  const handleSubmit = () => {
    if (isValid()) {
      onSubmit(form.values);
    }
  };

  return { form, setForm: setFormValue, isValid, validate, handleSubmit, setError };
};

export default useForm;
