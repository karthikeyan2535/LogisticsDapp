import { useState } from "react";
import { Str1 } from ".";

const CompleteShipment = ({ completeModal, setcompleteModal, completeShipment }) => {
  const [completeship, setCompleteship] = useState({
    receiver: "",
    index: ""
  });

  const changeStatus = async () => {
    try {
      await completeShipment(completeship);
    } catch (error) {
      console.error("Failed to complete shipment:", error);
    }
  };

  return completeModal ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setcompleteModal(false)}
      ></div>
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-md shadow-md">
          <div className="flex justify-end">
            <button
              className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
              onClick={() => setcompleteModal(false)}
            >
              <Str1 />
            </button>
          </div>
          <div className="mx-auto max-w-sm space-y-3 text-center">
            <h4 className="text-lg font-semibold text-gray-800">Complete Shipment</h4>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                changeStatus();
              }}
            >
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder="Receiver Address"
                  value={completeship.receiver}
                  onChange={(e) =>
                    setCompleteship({ ...completeship, receiver: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div className="relative mt-4">
                <input
                  type="number"
                  placeholder="Shipment Index"
                  value={completeship.index}
                  onChange={(e) =>
                    setCompleteship({ ...completeship, index: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 mt-4 text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Complete Shipment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CompleteShipment;
