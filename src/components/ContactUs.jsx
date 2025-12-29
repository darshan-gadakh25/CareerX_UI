import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill required fields");
      return;
    }

    localStorage.setItem("careerx_contact", JSON.stringify(formData));
    toast.success("Message sent successfully");

    setFormData({
      name: "",
      email: "",
      phone: "",
      city: "",
      message: "",
    });
  };

  return (
    <div className="bg-white">
     
      

      
      <div className="text-center py-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2F4156]">
          Get In Touch With Us
        </h2>
        <hr className="mx-auto w-24 sm:w-32 md:w-40 border-t mt-2 border-[#2F4156]" />
      </div>

      
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2F4156] rounded-lg flex items-center justify-center text-white">
            <Phone />
          </div>
          <div>
            <p className="text-[#567C8D] text-sm">Call to ask any question</p>
            <p className="font-semibold text-[#2F4156]">+91 1234567890</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2F4156] rounded-lg flex items-center justify-center text-white">
            <Mail />
          </div>
          <div>
            <p className="text-[#567C8D] text-sm">Email us</p>
            <p className="font-semibold text-[#2F4156]">
              support@careerguide.com
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2F4156] rounded-lg flex items-center justify-center text-white">
            <MapPin />
          </div>
          <div>
            <p className="text-[#567C8D] text-sm">Visit our office</p>
            <p className="font-semibold text-[#2F4156]">Pune, Maharashtra</p>
          </div>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 pb-16 shadow-none md:shadow-[0_0_35px_rgba(0,0,0,0.25)]">
      
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 md:p-8 rounded-xl space-y-4 mt-6 md:mt-10"
        >
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full rounded-lg border border-[#C8D9E6] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full sm:w-1/2 rounded-lg border border-[#C8D9E6] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full sm:w-1/2 rounded-lg border border-[#C8D9E6] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
            />
          </div>

          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full rounded-lg border border-[#C8D9E6] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows="4"
            className="w-full rounded-lg border border-[#C8D9E6] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#2F4156] text-white py-3 rounded font-medium hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form>

        
        <div className="rounded-xl overflow-hidden shadow mt-6 md:mt-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d115053.17865154844!2d73.76497187847507!3d18.54831226015322!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c17db0f73171%3A0x26398f247a752cec!2sAptitude%20Testing%20And%20Career%20Counseling%20Centre!5e1!3m2!1sen!2sin!4v1766857320730!5m2!1sen!2sin"
            width="100%"
            height="100%"
            className="min-h-[300px] sm:min-h-[350px] md:min-h-[450px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
