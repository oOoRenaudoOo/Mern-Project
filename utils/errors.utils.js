module.exports.signUpErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "pseudo incorrect ou deja pris";

  if (err.message.includes("email")) errors.email = "email incorrect";

  if (err.message.includes("password"))
    errors.password = "le mot de passe doit avoir au moins 6 caracteres";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
    errors.pseudo = "ce pseudo est deja pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "cet email est deja enregistre";

  return errors;
};

module.exports.signInErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = err.message;

  // if (err.message.includes("password"))
  //   errors.password = "le mot de passe ne correspond pas";
  errors.password = err.message;

  return errors;
};
