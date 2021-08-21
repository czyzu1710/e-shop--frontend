import { TextField } from "@material-ui/core";
import { useState } from "react";

const OrderData = ({ values, handleChange }) => {
  const [errors, setErrors] = useState(); // eslint-disable-line
  const [errorsDetails, setErrorsDetails] = useState(); // eslint-disable-line

  return (
    <>
      <TextField
        error={Boolean(errors?.name)}
        helperText={errors?.name}
        className="order-input"
        type="text"
        label="Imię i Nazwisko"
        placeholder="Imię i Nazwisko"
        margin="normal"
        variant="filled"
        name="name"
        onChange={handleChange("name")}
        value={values.name}
        required
      />
      <TextField
        error={Boolean(errorsDetails?.street)}
        helperText={errorsDetails?.street}
        className="order-input"
        type="text"
        label="Ulica"
        placeholder="Ulica"
        margin="normal"
        variant="filled"
        name="street"
        onChange={handleChange("street")}
        value={values.street}
        required
      />
      <TextField
        error={Boolean(errorsDetails?.postal)}
        helperText={errorsDetails?.postal}
        className="order-input"
        type="text"
        label="Kod pocztowy"
        placeholder="Kod pocztowy"
        margin="normal"
        variant="filled"
        name="postal"
        onChange={handleChange("postal")}
        value={values.postal}
        required
      />
      <TextField
        error={Boolean(errorsDetails?.city)}
        helperText={errorsDetails?.city}
        className="order-input"
        type="text"
        label="Miasto"
        placeholder="Miasto"
        margin="normal"
        variant="filled"
        name="city"
        onChange={handleChange("city")}
        value={values.city}
        required
      />
      <TextField
        error={Boolean(errorsDetails?.phone)}
        helperText={errorsDetails?.phone}
        className="order-input"
        type="text"
        label="Numer telefonu"
        placeholder="Numer telefonu"
        margin="normal"
        variant="filled"
        name="phone"
        onChange={handleChange("phone")}
        value={values.phone}
        required
      />
      <TextField
        error={Boolean(errorsDetails?.email)}
        helperText={errorsDetails?.email}
        className="order-input"
        type="text"
        label="Email"
        placeholder="Email"
        margin="normal"
        variant="filled"
        name="email"
        onChange={handleChange("email")}
        value={values.email}
        required
      />
    </>
  );
};

export default OrderData;
