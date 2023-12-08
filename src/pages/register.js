import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex item-center justify-center  overflow-hiden">
      <div className="h-full flex w-[1600px] mx-auto  overflow-hiden">
        <RegisterForm></RegisterForm>
      </div>
    </div>
  );
}
