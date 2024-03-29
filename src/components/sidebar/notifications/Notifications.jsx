import { ArrowIcon, CloseIcon, NotificationIcon } from '../../../svg';
import { useState } from 'react';
export default function Notifications() {
  const [status, setStatus] = useState(Notification.permission);
  // Define a function that requests permission and updates the status
  const handleNotification = () => {
    Notification.requestPermission().then((permission) => {
      setStatus(permission);
    });
  };
  return (
    <div className="h-[90px] dark:bg-dark_bg_3 flex items-center p-[13px]">
      <div className="w-full flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-x-4">
          <div onClick={handleNotification} className="cursor-pointer">
            <NotificationIcon className="dark:fill-blue_1 "></NotificationIcon>
          </div>

          <div className="flex flex-col">
            <span className="textPrimary">Get notified of new messages </span>
            <span className="textSecondery mt-0.5 flex items-center gap-0.5">
              Turn on desktop notifications
              <ArrowIcon className="dark:fill-dark_svg_2 mt-1"></ArrowIcon>
            </span>
          </div>
        </div>
        {/* right */}
        <div className="cursor-pointer">
          <CloseIcon className="dark:fill-dark_svg_2 "></CloseIcon>
        </div>
      </div>
    </div>
  );
}
