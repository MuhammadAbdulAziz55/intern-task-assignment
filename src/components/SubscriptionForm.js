import { useState } from "react";
import { toast } from "react-toastify";

export default function SubscriptionForm() {
  const [email, setEmail] = useState("");

  const validate = (email) => {
    const regex = /^[^\s@]+@(gmail\.com|example\.com|domain\.com)$/;
    return regex.test(email.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(email)) {
      toast.error("Invalid email address");

      return;
    }
    try {
      // const response = await fetch("http://localhost:5000/sendemail", {
      const response = await fetch(
        "https://intern-task-api.onrender.com/sendemail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);

        setEmail("");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      className="w-full flex-w flex-c-m validate-form"
      onSubmit={handleSubmit}
    >
      <div className={"wrap-input100 validate-input where1 "}>
        <input
          className="input100 placeholder0 s2-txt2"
          type="text"
          name="email"
          placeholder="Enter Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="focus-input100"></span>
      </div>

      <button
        type="submit"
        className="flex-c-m size3 s2-txt3 how-btn1 trans-04 where1"
      >
        Subscribe
      </button>
    </form>
  );
}
