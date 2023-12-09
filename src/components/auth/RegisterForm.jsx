import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '../../utils/validation';
import AuthInput from './AuthInput';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, changeStatus } from '../../features/userSlice.js';
import { useState } from 'react';
import Picture from './Picture.jsx';
import axios from 'axios';
const cloudSecret = process.env.REACT_APP_CLOUDE_SECRET;
const cloudName = process.env.REACT_APP_CLOUDE_NAME;
export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const onSubmit = async (data) => {
    dispatch(changeStatus('loading'));
    if (picture) {
      await UploadImg().then(async (response) => {
        let res = await dispatch(
          registerUser({ ...data, picture: response.secure_url })
        );
        if (res?.payload?.user) {
          navigate('/');
        }
      });
    } else {
      let res = await dispatch(registerUser({ ...data, picture: '' }));
      if (res?.payload?.user) {
        navigate('/');
      }
    }
  };

  const UploadImg = async () => {
    const imageData = picture; // Assuming 'picture' holds image data in one of the supported formats.
    const formData = new FormData();
    formData.append('upload_preset', cloudSecret); // Replace with actual preset name
    formData.append('file', imageData);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      formData
    );
    return data;
  };

  return (
    <div className=" min-h-screen w-full flex items-center justify-center m-auto overflow-hidden">
      <div className="  space-y-8 rounded-xl px-8 dark:bg-dark_bg_2 md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <div className="text-center dark: text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign up</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="  space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="Full name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />

          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          <Picture
            readablePicture={readablePicture}
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
          ></Picture>
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
              'Sign up'
            )}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span> have an account ?</span>
            <Link
              className="hover:underline cursor-pointer transition ease-in duration-300"
              to="/login"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
