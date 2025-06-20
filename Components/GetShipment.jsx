import { useState } from "react";
import { Str1 } from ".";

const GetShipment = ({ getModal, setgetModal, getShipment }) => {
  const [index, setIndex] = useState(0);
  const [singleShipmentData, setSingleShipmentData] = useState({
    sender: "",
    reciever: "",
    pickupTime: "",
    distance: 0,
    price: 0,
    deliveryTime: "",
    paid: false,
    status: 0,
  });

  const getShipments = async () => {
    try {
      const getData = await getShipment(index);
      setSingleShipmentData(getData);
      console.log(getData);
    } catch (e) {
      console.error("Error fetching shipment:", e);
    }
  };

 const convertTime = (time) => {
  const newTime = new Date(time);

  // Check if the date is valid
  if (isNaN(newTime.getTime())) {
    console.warn("Invalid date:", time);
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(newTime);
};


  if (!getModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div
        className="fixed inset-0 bg-black opacity-40"
        onClick={() => setgetModal(false)}
      ></div>

      <div className="relative z-10 w-full max-w-lg p-6 mx-auto bg-white rounded-md shadow-lg">
        <div className="flex justify-end">
          <button
            className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
            onClick={() => setgetModal(false)}
          >
            <Str1 />
          </button>
        </div>

        <div className="mx-auto max-w-sm space-y-3 text-center">
          <h4 className="text-lg font-medium text-gray-800">
            Product Tracking Details
          </h4>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              getShipments();
            }}
          >
            <div className="relative mt-4">
              <input
                type="number"
                placeholder="Enter Shipment ID"
                value={index}
                onChange={(e) => setIndex(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Get Shipment Details
            </button>
          </form>

          {singleShipmentData && (
            <div className="text-left mt-4 text-sm text-gray-700">
              <p><strong>Sender:</strong> {singleShipmentData.sender?.slice(0, 15)}</p>
              <p><strong>Receiver:</strong> {singleShipmentData.reciever?.slice(0, 15)}</p>
              <p><strong>Pickup Time:</strong> {convertTime(singleShipmentData.pickupTime)}</p>
              <p><strong>Distance:</strong> {singleShipmentData.distance} km</p>
              <p><strong>Price:</strong> {singleShipmentData.price} $</p>
              <p><strong>Delivery Time:</strong> {convertTime(singleShipmentData.deliveryTime)}</p>
              <p><strong>Paid:</strong> {singleShipmentData.paid ? "Yes" : "No"}</p>
              <p><strong>Status:</strong> {singleShipmentData.status === 0
                    ? "Pending"
                    : singleShipmentData.status === 1
                    ? "In Transit"
                    : singleShipmentData.status === 2
                    ? "Delivered"
                    : "Cancelled"
                     }</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetShipment;
