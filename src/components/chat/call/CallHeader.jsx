import { ArrowIcon, ContactIcon, LockIcon } from '../../../svg';

export default function CallHeader() {
  return (
    <header className="absolute top-0 w-full z-40">
      <div className="p-1 flex items-center justify-between ">
        <button className="btn">
          <span className="rotate-180 scale-150">
            <ArrowIcon className="fill-white"></ArrowIcon>
          </span>
        </button>
        <p className="flex items-center">
          <LockIcon className="fill-white scale-75"></LockIcon>
          <span className="text-xs text-white">End-To-End-Encrypted</span>
        </p>
        <button className="btn">
          <ContactIcon className="fill-white"></ContactIcon>
        </button>
      </div>
    </header>
  );
}
