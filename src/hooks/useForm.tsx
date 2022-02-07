import { useState } from 'react';

export const useForm = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    const { name, value } = e.target;
    setValue(values => ({
      ...values,
      [name]: value
    }));
  };

  const reset = () => {
    setValue('');
  };

  return [value, handleChange, reset];
};
