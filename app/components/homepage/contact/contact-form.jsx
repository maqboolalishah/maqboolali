"use client";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { isValidEmail } from "@/utils/check-email";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, required: false }));

    // Check email validation when email input changes
    if (name === "email") {
      setError((prev) => ({ ...prev, email: !isValidEmail(value) }));
    }
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    }
    if (error.email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    emailjs
      .send(
        "service_h194ygk",
        "template_mtya7la",
        {
          from_name: userInput.name,
          to_name: "Sajjad",
          from_email: userInput.email,
          to_email: "sajukarim76@gmail.com",
          message: userInput.message,
        },
        "Yx5VuZ-kpwxVtupr2"
      )
      .then(
        () => {
          setIsLoading(false);
          toast.success("Message sent successfully!");
          setUserInput({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setIsLoading(false);
          console.error(error);
          toast.error("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        Contact with me
      </p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          If you have any questions or concerns, please don’t hesitate to
          contact me.
        </p>
        <form onSubmit={handleSendMail} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base">Your Name: </label>
            <input
              name="name"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] px-3 py-2"
              type="text"
              maxLength="100"
              required
              onChange={handleChange}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Email: </label>
            <input
              name="email"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] px-3 py-2"
              type="email"
              maxLength="100"
              required
              onChange={handleChange}
              value={userInput.email}
            />
            {error.email && (
              <p className="text-sm text-red-400">
                Please provide a valid email!
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-base">Your Message: </label>
            <textarea
              name="message"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] px-3 py-2"
              maxLength="500"
              required
              onChange={handleChange}
              rows="4"
              value={userInput.message}
            />
          </div>

          <div className="flex flex-col items-center gap-3">
            {error.required && (
              <p className="text-sm text-red-400">All fields are required!</p>
            )}
            <button
              type="submit"
              className="gap-1 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 py-2.5 text-xs font-medium text-white"
              disabled={isLoading}
            >
              {isLoading ? "Sending Message..." : " Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
