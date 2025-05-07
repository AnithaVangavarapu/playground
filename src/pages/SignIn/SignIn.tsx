import { useSignIn } from "./useSignIn";
const SignIn = () => {
  const { handleLogin } = useSignIn();
  return (
    <div onClick={handleLogin} className="border">
      SignIn
    </div>
  );
};

export default SignIn;
