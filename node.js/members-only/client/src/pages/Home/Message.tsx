import { useState } from "react";
import { IMessage } from "../../types/types";

export default function Message({ message }: { message: IMessage }) {
  function getMessageAge() {
    const today = new Date();
    const messageDate = new Date(message.timestamp);
    const diffTime = Math.abs(today.getTime() - messageDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 365) {
      const diffYears = Math.floor(diffDays / 365);
      return `${diffYears} ${diffYears > 1 ? "years" : "year"} ago`;
    } else if (diffDays > 31) {
      const diffMonths = Math.floor(diffDays / 31);
      return `${diffMonths} ${diffMonths > 1 ? "months" : "month"} ago`;
    } else {
      return `${diffDays} ${diffDays > 1 ? "days" : "day"} ago`;
    }
  }
  function formatDate(dateString: Date) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} - ${year}`;
  }

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const registrationDate = formatDate(message.sender.registrationDate);
  return (
    <div className="flex gap-3 p-2 relative">
      <div>
        <div
          className="size-20 shrink-0"
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <img
            className="h-full w-full"
            src={message.sender.avatar}
            alt="avatar"
          />
        </div>{" "}
      </div>
      <div className="flex flex-col ">
        <h3 className="mb-2">
          {" "}
          <b>{message.sender.userName}</b> wrote:
        </h3>
        <p>{message.content}</p>
      </div>
      <div className="absolute top-1 right-1 text-slate-400">
        {getMessageAge()}
      </div>
      {tooltipVisible && (
        <div className="absolute top-0 left-24 bg-zinc-100  text-sm rounded p-2 z-10">
          <p>
            Registered on: <strong>{registrationDate}</strong>
          </p>
          {message.sender.isPro ? (
            <p>
              Membership: <strong>PRO</strong>
            </p>
          ) : (
            <p>
              Membership: <strong>MEMBER</strong>
            </p>
          )}
          <div className=" bg-gray-400 my-2 p-0.5"></div>

          <p>{message.sender.signature}</p>

          <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 bg-gray-700 w-2 h-2 rotate-45"></div>
        </div>
      )}
    </div>
  );
}
