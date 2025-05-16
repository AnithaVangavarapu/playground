import { useSignIn } from "./useSignIn";
const SignIn = () => {
  const { handleLogin } = useSignIn();
  return (
    <div className="flex gap-1 flex-row  justify-center items-center lg:mt-40 mx-10">
      <div className="w-[60%]">
        <img src="./login.svg" />
      </div>
      <div className="flex justify-center items-center mx-auto">
        <div
          onClick={handleLogin}
          className="border border-blue-950 bg-blue-950 text-white rounded-lg w-50 text-center p-2 cursor-pointer"
        >
          Sign In
        </div>
      </div>
    </div>
  );
};

export default SignIn;
