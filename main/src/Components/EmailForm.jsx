import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const EmailForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = "service_r3bampl";
    const templateId = "template_qgc8rwd";
    const publicKey = "lF3u8mRy1CCiyL8-H";

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Arjit Kedia",
      message: message,
    };

    // Send the email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        alert("SENT");
        console.log("Email sent successfully!", response);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[20rem]">
      <input
        className="rounded-lg p-1 border-3 bg-white"
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="rounded-lg  p-1 border-3 bg-white"
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        className="rounded-lg  p-1 border-3 bg-white"
        cols="5"
        rows="5"
        placeholder="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="rounded-lg  p-1 border-3 bg-white text-[#3468C0] text-xl"
      >
        Send Email
      </button>
    </form>
  );
};

export default EmailForm;
