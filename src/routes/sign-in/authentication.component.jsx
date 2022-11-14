import Button from "../../components/button/button.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    // sending the user data to the database so we could check if we need to create collection for this user or not
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <>
      <h1>Sign In page</h1>;
      <Button onClick={logGoogleUser}>Sign in With google popup</Button>
      <SignInForm />
    </>
  );
};

export default SignIn;
