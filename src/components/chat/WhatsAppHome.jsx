import { Logo } from '../../svg';

export default function WhatsAppHome() {
  return (
    <div className="h-full w-full dark:bg-dark_bg_4 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_2">
      <div className=" w-full h-screen flex flex-col items-center justify-center">
        <span>
          <Logo></Logo>
        </span>
        <div className="mt-1 text-center space-y-[12px]">
          <h1 className="text-[32px] dark:text-dark_text_4 font-extralight">
            Whats app web
          </h1>
          <p className="text-sm dark:text-dark_text_2">
            Send and recive messages without keeping your phone online
          </p>
        </div>
      </div>
    </div>
  );
}
