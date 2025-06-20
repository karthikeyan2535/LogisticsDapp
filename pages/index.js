import React, { useContext, useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import {
  Table,
  Form,
  Service,
  GetShipment,
  StartShipment,
  Profile,
  CompleteShipment,
} from '@/Components';
import { TrackingContext } from '@/Context/TrackingContext';

const Home = () => {
  const {
    currentUser,
    createShipment,
    getAllShipments,
    getShipmentCount,
    completeShipment,
    getShipment,
    startShipment,
  } = useContext(TrackingContext);

  const [createShipmentModel, setcreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setstartModal] = useState(false);
  const [completeModal, setcompleteModal] = useState(false);
  const [getModal, setgetModal] = useState(false);
  const [allShipmentsdata, setallShipmentsdata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllShipments();
      setallShipmentsdata(allData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Service
        setOpenProfile={setOpenProfile}
        setcompleteModal={setcompleteModal}
        setgetModal={setgetModal}
        setstartModal={setstartModal}
      />
      <Table
        setcreateShipmentModel={setcreateShipmentModel}
        allShipmentsdata={allShipmentsdata}
      />
      <Form
        createShipmentModel={createShipmentModel}
        createShipment={createShipment}
        setcreateShipmentModel={setcreateShipmentModel}
      />
      <Profile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        currentUser={currentUser}
        getShipmentCount={getShipmentCount}
      />
      <CompleteShipment
        completeModal={completeModal}
        setcompleteModal={setcompleteModal}
        completeShipment={completeShipment}
      />
      <GetShipment
        getModal={getModal}
        setgetModal={setgetModal}
        getShipment={getShipment}
      />
      <StartShipment
        startModal={startModal}
        setstartModal={setstartModal}
        startShipment={startShipment}
      />
    </>
  );
};

export default Home;
