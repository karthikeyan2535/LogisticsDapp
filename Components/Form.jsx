import { useState } from "react";

const Form = ({ setcreateShipmentModel, createShipmentModel, createShipment }) => {
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: "",
  });

  const createItem = async () => {
    try {
      await createShipment(shipment);
    } catch (e) {
      console.error("Error creating shipment:", e);
    }
  };

  return createShipmentModel ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={() => setcreateShipmentModel(false)}></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
          <div className="justify-end flex">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setcreateShipmentModel(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mx-auto max-w-sm py-3 space-y-3 text-center">
            <h4 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Create Shipment
            </h4>
            <p className="text-gray-600 mt-2">
              Fill in the details to create a new shipment.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createItem();
              }}
            >
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Receiver Address"
                  value={shipment.receiver}
                  onChange={(e) => setShipment({ ...shipment, receiver: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="relative mt-4">
                <input
                  type="datetime-local"
                  value={shipment.pickupTime}
                  onChange={(e) => setShipment({ ...shipment, pickupTime: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="relative mt-4">
                <input
                  type="number"
                  placeholder="Distance (km)"
                  value={shipment.distance}
                  onChange={(e) => setShipment({ ...shipment, distance: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="relative mt-4">
                <input
                  type="number"
                  placeholder="Price (ETH)"
                  value={shipment.price}
                  onChange={(e) => setShipment({ ...shipment, price: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-indigo-800 hover:bg-indigo-700 active:bg-indigo-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  Create Shipment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Form;
