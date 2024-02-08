import React from "react";
import EmailForm from "./EmailForm";
import contact from "../resource/contacts.png";
const Contact = () => {
  return (
    <div className="h-screen flex flex-row justify-center items-center ">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-[#3468C0] text-6xl font-bold">Contact Me</div>
        <div>
          <EmailForm />
        </div>
      </div>
      <div className="w-[30rem] hidden lg:block ">
        <img src={contact} alt="scs" />
      </div>
    </div>
  );
};

export default Contact;
