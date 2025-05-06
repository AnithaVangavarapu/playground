import { useSignIn } from "./useSignIn";
const SignIn = () => {
  const { handleLogin } = useSignIn();
  return <div onClick={handleLogin}>SignIn</div>;
};

export default SignIn;
