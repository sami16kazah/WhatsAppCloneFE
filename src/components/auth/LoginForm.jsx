import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signInSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/userSlice.js';

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInSchema) });

  const onSubmit = async (values) => {
    let res = await dispatch(loginUser({ ...values }));
    if (res?.payload?.user) {
      navigate('/');
    }
  };

  return (
    <div className=" min-h-screen w-full flex items-center justify-center m-auto overflow-hidden">
      <div className="  space-y-8 rounded-xl px-8 dark:bg-dark_bg_2 md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="text-center dark: text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="  space-y-6">
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />

          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />

          {error ? (
            <div>
              <p className="text-red-400"> {error}</p>
            </div>
          ) : null}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-3 rounded-full tracking-wide
            font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {status === 'loading' ? (
              <PulseLoader color="#fff" size={16}></PulseLoader>
            ) : (
              'Log in'
            )}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span> do not have an account ?</span>
            <Link
              className="hover:underline cursor-pointer transition ease-in duration-300"
              to="/register"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
