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
      <div>Sign In page</div>;
      <button onClick={logGoogleUser}>Sign in With google popup</button>
    </>
  );
};

export default SignIn;
