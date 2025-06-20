import React from "react";
import Image from "next/image";
import images from "../Images/index";

const Service = ({
  setOpenProfile = () => {},
  setcompleteModal = () => {},
  setgetModal = () => {},
  setstartModal = () => {},
}) => {
  const team = [
    { avatar: images.compShipment },
    { avatar: images.getShipment },
    { avatar: images.startShipment },
    { avatar: images.userProfile },
    { avatar: images.shipCount },
    { avatar: images.send },
  ];

  const openModelBox = (index) => {
    switch (index) {
      case 1:
        setcompleteModal(true);
        break;
      case 2:
        setgetModal(true);
        break;
      case 3:
        setstartModal(true);
        break;
      case 4:
        setOpenProfile(true);
        break;
      default:
        break;
    }
  };

  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {team.map((item, idx) => (
              <li key={idx}>
                <div
                  onClick={() => openModelBox(idx + 1)}
                  className="w-full h-60 sm:h-52 md:h-56 rounded-xl overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
                >
                  <Image
                    src={item.avatar}
                    alt={`Service ${idx + 1}`}
                    className="w-full h-full object-cover"
                    layout="responsive"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Service;
