import { useEffect, useState } from "react";
import { getEthereumContract } from "../utils/userContract";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMedicines = async () => {
    try {
      const contract = await getEthereumContract();
      const meds = await contract.getAllMedicines();
      setMedicines(meds);
    } catch (error) {
      console.error("Failed to fetch medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e10] py-16 px-6 flex justify-center">
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-400 mb-12 text-center">
          💊 Available Medicines
        </h2>

        {loading ? (
          <div className="text-center text-gray-400 text-lg">Loading medicines...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicines.map((med, index) => (
              <div
                key={index}
                className="bg-[#1c1c1e] hover:shadow-lg hover:scale-[1.02] transition-all duration-200 p-6 rounded-2xl text-white border border-[#2c2c2e]"
              >
                <h3 className="text-xl font-semibold mb-2 text-teal-300">{med.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{med.description}</p>
                <div className="space-y-1 text-sm">
                  <p><span className="text-gray-300">Quantity:</span> {med.quantity.toString()}</p>
                  <p><span className="text-gray-300">Base Price:</span> {med.basePrice.toString()} wei</p>
                  <p><span className="text-gray-300">Owner:</span> {med.owner}</p>
                  <p>
                    <span className="text-gray-300">On Auction:</span>{" "}
                    <span className={med.onAuction ? "text-green-400" : "text-red-400"}>
                      {med.onAuction ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineList;
