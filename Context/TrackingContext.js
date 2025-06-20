import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import tracking from "../Context/Tracking.json";

const ContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"; // Replace with your contract address
const ContractABI = tracking.abi;

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  const DappName = "Logistics Dapp";
  const [currentUser, setCurrentUser] = useState("");

  const createShipment = async (items) => {
    console.log("Creating shipment with data:", items);
    const { receiver, pickupTime, distance, price } = items;

    try {
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
      });

      // Connect to MetaMask or another provider for signing transactions
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);

      const createItem = await contract.createShipment(
        receiver,
        Math.floor(new Date(pickupTime).getTime() / 1000),
        distance,
        ethers.utils.parseUnits(price, "ether"),
        {
          value: ethers.utils.parseUnits(price, "ether"),
        }

      );

      await createItem.wait();
      console.log("Shipment Created:", createItem);
    } catch (e) {
      console.error("Error creating shipment:", e);
    }
  };

  const getAllShipments = async () => {
    try {
      // Direct connection to Hardhat node for read-only functions
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
      const contract = fetchContract(provider);
      const shipments = await contract.getAlltransactions();
      return shipments.map((ship) => ({
        sender: ship.sender,
        receiver: ship.receiver,
        price: ethers.utils.formatEther(ship.price.toString()),
        pickupTime: ship.pickupTime.toNumber(),
        distance: ship.distance.toNumber(),
        isPaid: ship.isPaid,
        status: ship.status,
      }));
    } catch (e) {
      console.log("Error getting shipments:", e);
    }
  };
  const getShipmentCount = async () => {
    try {
      if(!window.ethereum) return "Install MetaMask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
      const contract = fetchContract(provider);
      const count = await contract.getShipmentCount();
      return count.toNumber();
    }
    catch (e) {
      console.log("Error getting shipment count:", e);
    }
  } 
const completeShipment = async ({ receiver, index }) => {
  try {
    if (!window.ethereum) return "Install MetaMask";

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const web3Modal = new Web3Modal({ cacheProvider: true });
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection); // Use Web3Provider here
    const signer = provider.getSigner();

    const contract = fetchContract(signer); // Pass signer, not provider, for write operations

    const completeItem = await contract.completeShipment(
      accounts[0],
      receiver,
      index,
      {
        gasLimit: 3000000,
      }
    );

    await completeItem.wait();
    console.log("Shipment Completed:", completeItem);
  } catch (e) {
    console.error("Error completing shipment:", e);
  }
};


  const getShipment = async (index) => {
    try { 
      if(!window.ethereum) return "Install MetaMask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });   
      const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
      const contract = fetchContract(provider);
      const shipment = await contract.getShipment(accounts[0],index);
      return {
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
      };
    } catch (e) {
      console.log("Error getting shipment:", e);
    }
  };
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (e) {
      console.log("Error checking wallet connection:", e);
    }
  };
 const startShipment = async ({ receiver, index }) => {
  try {
    if (!window.ethereum) return "Install MetaMask";

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer); // Use signer for transactions

    const startItem = await contract.startShipment(
      accounts[0],
      receiver,
      index,
      { gasLimit: 3000000 }
    );

    await startItem.wait();
    console.log("Shipment Started:", startItem);
  } catch (e) {
    console.error("Error starting shipment:", e);
  }
};

  
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return "Install MetaMask";
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentUser(accounts[0]);
    } catch (e) {
      console.log("Error connecting wallet:", e);
    }
  };
 
  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        startShipment,
        getShipment,
        getShipmentCount,
        completeShipment,
        createShipment,
        getAllShipments,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
