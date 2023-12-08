import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex item-center justify-center py-[19px] overflow-hiden">
      <div className="flex w-[1600px] mx-auto h-full">
        <LoginForm></LoginForm>
      </div>
    </div>
  );
}
