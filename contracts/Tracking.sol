// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Tracking {
    enum Status { PENDING, IN_TRANSIT, DELIVERED }

    struct Shipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        Status stat;
        bool isPaid;
    }

    mapping(address => Shipment[]) public shipments;
    uint256 public shipmentCount;

    struct TypeShipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        Status stat;
        bool isPaid;
    }

    TypeShipment[] public typeshipments;

    event ShipmentCreated(address indexed sender, address indexed receiver, uint256 pickupTime, uint256 distance, uint256 price);
    event ShipmentInTransit(address indexed sender, address indexed receiver, uint256 pickupTime);
    event ShipmentDelivered(address indexed sender, address indexed receiver, uint256 deliveryTime);
    event ShipmentPaid(address indexed sender, address indexed receiver, uint256 amount);

    constructor() {
        shipmentCount = 0;
    }

    function createShipment(address r, uint256 pickupt, uint256 dist, uint256 amt) public payable {
        require(msg.value == amt, "Payment amount mismatch");

        Shipment memory shipment = Shipment(msg.sender, r, pickupt, 0, dist, amt, Status.PENDING, false);
        shipments[msg.sender].push(shipment);
        shipmentCount++;

        typeshipments.push(TypeShipment(msg.sender, r, pickupt, 0, dist, amt, Status.PENDING, false));

        emit ShipmentCreated(msg.sender, r, pickupt, dist, amt);
    }

    function startShipment(address sender, address receiver, uint256 index) public {
        Shipment storage shipment = shipments[sender][index];
        TypeShipment storage typeshipment = typeshipments[index];

        require(receiver == shipment.receiver, "Invalid receiver");
        require(shipment.stat == Status.PENDING, "Shipment already started");

        shipment.stat = Status.IN_TRANSIT;
        typeshipment.stat = Status.IN_TRANSIT;

        emit ShipmentInTransit(sender, receiver, shipment.pickupTime);
    }

    function completeShipment(address sender, address receiver, uint256 index) public {
        Shipment storage shipment = shipments[sender][index];
        TypeShipment storage typeshipment = typeshipments[index];

        require(receiver == shipment.receiver, "Invalid receiver");
        require(shipment.stat == Status.IN_TRANSIT, "Shipment not in transit");

        shipment.stat = Status.DELIVERED;
        typeshipment.stat = Status.DELIVERED;
        shipment.deliveryTime = block.timestamp;
        typeshipment.deliveryTime = block.timestamp;

        uint256 amount = shipment.price;
        payable(shipment.sender).transfer(amount);

        shipment.isPaid = true;
        typeshipment.isPaid = true;

        emit ShipmentDelivered(sender, receiver, shipment.deliveryTime);
        emit ShipmentPaid(sender, receiver, amount);
    }

    function getShipment(address sender, uint256 index) public view returns (Shipment memory) {
        return shipments[sender][index];
    }

    function getShipmentCount(address sender) public view returns (uint256) {
        return shipments[sender].length;
    }

    function getAlltransactions() public view returns (TypeShipment[] memory) {
        return typeshipments;
    }
}
