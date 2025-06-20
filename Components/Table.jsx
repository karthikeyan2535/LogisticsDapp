export default ({ setcreateShipmentModel, allShipmentsdata }) => {
  const convertTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(newTime);
    return dataTime;
  };

  console.log(allShipmentsdata);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Create Tracking
          </h3>
          <p className="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <p
            onClick={() => setcreateShipmentModel(true)}
            className="items-center px-4 py-2 duration-150 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-sm inline-flex md:text-sm rounded-lg md:inline-flex cursor-pointer"
          >
            Add Tracking
          </p>
        </div>
      </div>

      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="px-6 py-3">Sender</th>
              <th className="px-6 py-3">Receiver</th>
              <th className="px-6 py-3">Pickup time</th>
              <th className="px-6 py-3">Distance</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Delivery time</th>
              <th className="px-6 py-3">Paid</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {allShipmentsdata?.map((shipment, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.sender.slice(0, 25)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.receiver.slice(0, 25)}...
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {convertTime(shipment.pickupTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.distance} km
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.price} ETH
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.deliveryTime ? convertTime(shipment.deliveryTime) : "Pending"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.isPaid ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {shipment.status === 0
                    ? "Pending"
                    : shipment.status === 1
                    ? "In Transit"
                    : shipment.status === 2
                    ? "Delivered"
                    : "Cancelled"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
