import { useState } from "react";
import { Str1 } from ".";

export const StartShipment = ({ startModal, setstartModal, startShipment }) => {
  const [getProduct, setgetProduct] = useState({
    receiver: "",
    index: "",
  });
  
  const startShipping = async () => {
    try {
      await startShipment(getProduct);
    } catch (error) {
      console.error("Failed to start shipment:", error);
    }
  };

  return startModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setstartModal(false)}
      ></div>
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-md shadow-md">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setstartModal(false)}
            >
              <Str1 />
            </button>
          </div>
          <div className="mx-auto max-w-sm space-y-3 text-center">
            <h4 className="text-lg font-semibold text-gray-800">Start Shipment</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                startShipping();
              }}
            >
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Receiver Address"
                  value={getProduct.receiver}
                  onChange={(e) =>
                    setgetProduct({ ...getProduct, receiver: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="relative mt-4">
                <input
                  type="number"
                  placeholder="Shipment Index"
                  value={getProduct.index}
                  onChange={(e) =>
                    setgetProduct({ ...getProduct, index: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-5 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Start Shipment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
