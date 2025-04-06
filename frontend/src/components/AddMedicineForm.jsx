import { useState } from "react";
import { getEthereumContract } from "../utils/userContract";
import { ethers } from "ethers";

const MedicineForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", form);

    try {
      const contract = await getEthereumContract();

      const tx = await contract.addMedicine(
        form.name,
        form.description,
        Number(form.quantity),
        ethers.parseEther(form.price)
      );

      await tx.wait();
      alert("✅ Medicine added successfully to the blockchain!");
    } catch (error) {
      console.error("❌ Failed to add medicine:", error);
      alert(`Failed to add medicine: ${error?.message || "Unknown error"}`);
    }
    
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] px-4 py-10 flex justify-center">
      <div className="w-full max-w-7xl bg-[#1c1c1e] p-6 md:p-10 lg:p-14 rounded-2xl shadow-2xl transition-all duration-300">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-400 mb-10 text-center">
          🧪 Add New Medicine
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Medicine Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <InputField
              label="Quantity"
              name="quantity"
              type="number"
              value={form.quantity}
              onChange={handleChange}
            />
            <InputField
              label="Unit Price (ETH)"
              name="price"
              type="number"
              step="0.0001"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Describe the medicine..."
              className="w-full p-3 bg-[#2a2a2e] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-12 py-4 rounded-lg shadow-lg transition-all duration-200 text-lg"
            >
              ➕ Add Medicine
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable input field
const InputField = ({ label, name, value, onChange, type = "text", step }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      step={step}
      className="w-full p-3 bg-[#2a2a2e] text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
      required
    />
  </div>
);

export default MedicineForm;
