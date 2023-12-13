import { useDispatch, useSelector } from 'react-redux';
import { dateHanlder } from '../../../utils/date';
import { open_create_conversation } from '../../../features/chatSlice';
import { getConversationId } from '../../../utils/chat';
export default function Conversation({ convo }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const values = { reciver_id: getConversationId(user, convo.users), token };
  const openConversation = () => {
    dispatch(open_create_conversation(values));
  };
  return (
    <li
      onClick={() => openConversation()}
      className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/*left*/}
        <div className="flex items-center gap-x-3">
          {/*right*/}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={convo.picture}
              className="w-full h-full object-cover"
            ></img>
          </div>
          {/*conv name and message */}
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">
              {convo.name}
            </h1>
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 ">
                  <p>{convo.latestMessage.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {dateHanlder(convo.latestMessage.createdAt)}
          </span>
        </div>
      </div>
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}
