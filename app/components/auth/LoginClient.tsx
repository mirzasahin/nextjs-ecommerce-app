"use client";
import Link from "next/link";
import AuthContainer from "../containers/AuthContainer";
import Button from "../general/Button";
import Heading from "../general/Heading";
import Input from "../general/Input";
import { useForm, SubmitHandler, FieldValue, FieldValues } from "react-hook-form"
import { FcGoogle } from "react-icons/fc";



const LoginClient = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <AuthContainer>
      <div className="w-full md:w-[500px] p-3 shadow-lg rounded-md">
        <Heading text="Login" center />
        <Input placeholder="Email" type="text" id="email" register={register} errors={errors} required />
        <Input placeholder="Password" type="password" id="password" register={register} errors={errors} required />
        <Button text="Login" onClick={handleSubmit(onSubmit)}/>
        <div className="text-center my-2 text-sm text-red-500">If you don't have an account <Link className="underline font-bold" href="/register">click here</Link></div>
        <div className="text-center my-2 text-lg">OR</div>
        <Button text="Login with Google" icon={FcGoogle} outline onClick={() => {}}/>
      </div>
    </AuthContainer>
  );
};

export default LoginClient;
