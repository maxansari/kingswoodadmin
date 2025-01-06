import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="">
      <div className="text-center text-xl py-4 border-b-[1px] border-gray-700">
        <h1>KingsWood Admin Console</h1>
      </div>

      <div className="flex w-[80%] mx-auto mt-4">
        <div className="mt-10">
          <h2>Login Into Your Account</h2>
          <form className="mt-4">
            <Input placeholder={"Email"} type={"email"} />
            <Input
              classNameContainer="mt-4"
              placeholder={"Password"}
              type={"password"}
            />
            <Button
              variant="contained"
              className="mt-4 w-full flex justify-center"
            >
              Login
            </Button>
          </form>
          <p className="mt-4 text-center">
            Forget Password? <a href="#">Reset Password</a>
          </p>
          <p className="mt-4 text-center">
            Need help? <a href="#">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
