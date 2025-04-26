import { useState } from "react";
import ImageCarousel from "../carousel/ImageCarousel";
import TextInputField from "../input/TextInputField";
import NumberInputField from "../input/NumberInputField";
import OptionsInput from "../input/OptionsInput";
import DateInputField from "../input/DateInputField";
import ImageInputField from "../input/ImageInputField";
import MessageDialog from "../dialog/MessageDialog";
import {
  MdAlarm,
  MdEdit,
  MdNumbers,
  MdOutlineAirlineSeatReclineNormal,
  MdOutlineAlternateEmail,
  MdOutlineCalendarMonth,
  MdOutlineDirectionsCar,
  MdOutlineFormatColorFill,
  MdOutlineLocationOn,
  MdOutlinePerson2,
  MdOutlinePhone,
  MdOutlineTrendingUp,
} from "react-icons/md";
import { LiaMoneyBillWaveAltSolid } from "react-icons/lia";

import { LuFuel, LuMailbox } from "react-icons/lu";
import ErrorMessage from "../ErrorMessage";
import ApiService from "../../api/ApiService";
import SuccessMessage from "../SuccessMessage";
import { useParams } from "react-router";
import { TbCoins } from "react-icons/tb";
import AuctionEditPanel from "../auction/AuctionEditPanel";

const CarEditingPanel = ({ car, owner, saveInfo, auction }) => {
  const params = useParams();
  const [carData, setCarData] = useState(car);
  const [ownerData, setOwnerData] = useState(owner);
  const [auctionData, setAuctionData] = useState(auction);
  const [uploadImages, setUploadImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const OPERATING_MODES = [
    "Bakhjulstrekk",
    "Framhjulstrekk",
    "Firehjulstrekk",
    "Annet",
  ];
  const GEARBOX_TYPES = ["Manuell", "Automat", "Annet"];
  const STATUS_OPTIONS = ["Vurdering", "Auksjon", "Solgt", "Annet"];
  const USER_TYPES = ["Ny Bruker", "Ekisterende"];
  const [userType, setUserType] = useState("Ny Bruker");
  const [userError, setUserError] = useState(null);

  const handleCarInputChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOwnerInputChange = (e) => {
    const { name, value } = e.target;
    setOwnerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const deleteImageByName = (imageName) => {
    setCarData((prevData) => ({
      ...prevData,
      imagePaths: prevData.imagePaths.filter(
        (imageUrl) => !imageUrl.includes(imageName),
      ),
    }));
  };

  const submitSaveRequest = (e) => {
    e.preventDefault();
    saveInfo(carData, ownerData, uploadImages);
  };

  const checkUserExistsByEmail = async (email) => {
    if (email == "") {
      setUserError({ message: "Fyll inn epost feltet" });
      return;
    }

    setUserError(null);
    setCarData((prevData) => ({
      ...prevData,
      ownerId: "",
    }));

    try {
      const user = await ApiService.getUserByEmail(email);
      setCarData((prevData) => ({
        ...prevData,
        ownerId: user.data.id,
      }));
    } catch (error) {
      setUserError(error);
    }
  };

  return (
    <div className="flex w-full max-w-7xl flex-col items-center justify-center py-28">
      <hr className="mb-2 mt-1 h-[4px] w-full max-w-[700px] bg-gunmental px-2" />
      <ImageCarousel
        images={carData.imagePaths}
        deleteImage={deleteImageByName}
      />
      <hr className="mb-4 mt-2 w-full max-w-[700px] border-[1px] border-dashed border-gunmental px-2" />
      <ImageInputField images={uploadImages} setImages={setUploadImages} />
      <form
        className="mt-4 flex w-full max-w-[700px] flex-col items-center px-2 md:px-0"
        onSubmit={submitSaveRequest}
        onReset={() => {
          setIsOpen(true);
        }}
      >
        <h1 className="text-2xl font-bold text-medium-gray">PERSONALIA</h1>
        {!params.id && (
          <OptionsInput
            options={USER_TYPES}
            initialOption={userType}
            optionName={"userType"}
            handleInputChange={(e) => {
              setCarData((prevData) => ({
                ...prevData,
                ownerId: "",
              }));
              setOwnerData(owner);
              setUserType(e.target.value);
            }}
          />
        )}

        {userType == "Ny Bruker" ? (
          <>
            <div className="flex w-full flex-col items-start">
              <TextInputField
                label={"Fullt Navn"}
                icon={<MdOutlinePerson2 className="h-6 w-auto" />}
                name={"name"}
                initialValue={ownerData.name}
                onChange={handleOwnerInputChange}
              />
            </div>
            <TextInputField
              label={"Mobilnummer"}
              icon={<MdOutlinePhone className="h-6 w-auto" />}
              name={"phoneNumber"}
              initialValue={ownerData.phoneNumber}
              onChange={handleOwnerInputChange}
            />
            {owner.role !== "ONE_TIME_SELLER" && (
              <>
                <TextInputField
                  label={"Epost"}
                  icon={<MdOutlineAlternateEmail className="h-6 w-auto" />}
                  name={"email"}
                  disableCheckbox={true}
                  initialValue={ownerData.email}
                  onChange={handleOwnerInputChange}
                />
                {owner.role == "BUYER" && (
                  <TextInputField
                    label={"Land"}
                    name="country"
                    icon={
                      <MdOutlineLocationOn
                        className="h-6 w-auto"
                        color="#333"
                      />
                    }
                    initialValue={ownerData.address.country}
                    onChange={(e) =>
                      setOwnerData((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          country: e.target.value,
                        },
                      }))
                    }
                  />
                )}
                <TextInputField
                  label={"Gateadresse"}
                  name="streetAddress"
                  icon={
                    <MdOutlineLocationOn className="h-6 w-auto" color="#333" />
                  }
                  initialValue={ownerData.address.streetAddress}
                  onChange={(e) =>
                    setOwnerData((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        streetAddress: e.target.value,
                      },
                    }))
                  }
                />
                <div className="flex w-full flex-row gap-2">
                  <div className="basis-7/12">
                    <TextInputField
                      label={"Poststed (By)"}
                      name="postalLocation"
                      icon={<LuMailbox className="h-6 w-auto" />}
                      initialValue={ownerData.address.postalLocation}
                      onChange={(e) =>
                        setOwnerData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            postalLocation: e.target.value,
                          },
                        }))
                      }
                    />
                  </div>
                  <div className="basis-5/12">
                    <TextInputField
                      label={"Postnummer"}
                      name="postalCode"
                      icon={<MdNumbers className="h-6 w-auto" />}
                      initialValue={ownerData.address.postalCode}
                      onChange={(e) => {
                        const value = e.target.value;
                        const numericValue = value.replace(/\D/g, "");

                        setOwnerData((prev) => ({
                          ...prev,
                          address: {
                            ...prev.address,
                            postalCode: numericValue,
                          },
                        }));
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <TextInputField
              label={"Epost"}
              icon={<MdOutlineAlternateEmail className="h-6 w-auto" />}
              name={"email"}
              initialValue={ownerData.email}
              onChange={handleOwnerInputChange}
              disableCheckbox={true}
            />
            {userError && <ErrorMessage error={userError.message} />}
            {carData.ownerId && (
              <SuccessMessage
                message={`Bruker med epost '${ownerData.email}' finnes og ble lagt til`}
              />
            )}
            <p
              className={`mb-1 mt-3 flex w-auto cursor-pointer border-b-2 border-light-gray text-center text-xl font-medium text-light-gray hover:border-gunmental hover:text-gunmental`}
              onClick={() => {
                checkUserExistsByEmail(ownerData.email);
              }}
            >
              Skjekk bruker
            </p>
          </>
        )}
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-medium-gray">
          BILENS INFO
        </h1>
        <TextInputField
          label={"Forventet Pris"}
          name="expectedPrice"
          icon={
            <LiaMoneyBillWaveAltSolid className="h-6 w-auto" color="#333" />
          }
          initialValue={carData.expectedPrice}
          onChange={(e) => {
            const value = e.target.value;
            const numericValue = value.replace(/\D/g, "");

            setCarData((prev) => ({
              ...prev,
              expectedPrice: numericValue,
            }));
          }}
        />
        <TextInputField
          label={"Modell"}
          icon={<MdOutlineDirectionsCar className="h-6 w-auto" />}
          name={"model"}
          initialValue={carData.model}
          onChange={handleCarInputChange}
        />
        <TextInputField
          label={"Merke"}
          icon={<MdOutlineDirectionsCar className="h-6 w-auto" />}
          name={"make"}
          initialValue={carData.make}
          onChange={handleCarInputChange}
        />
        <TextInputField
          label={"Registrasjonsnummer"}
          icon={<MdNumbers className="h-6 w-auto" />}
          name={"registrationNumber"}
          initialValue={carData.registrationNumber}
          disableCheckbox={true}
          onChange={handleCarInputChange}
        />
        <DateInputField
          label={"Førstegangsregistrering i Norge"}
          icon={<MdOutlineCalendarMonth className="h-6 w-auto" />}
          name={"firstTimeRegisteredInNorway"}
          initialValue={carData.firstTimeRegisteredInNorway}
          onChange={handleCarInputChange}
        />
        <DateInputField
          label={"Neste EU-kontroll"}
          icon={<MdOutlineCalendarMonth className="h-6 w-auto" />}
          name={"nextEUControl"}
          initialValue={carData.nextEUControl}
          onChange={handleCarInputChange}
        />
        <NumberInputField
          label={"Kilometerstand"}
          icon={<MdNumbers className="h-6 w-auto" />}
          name={"kilometers"}
          initialValue={carData.kilometers}
          onChange={handleCarInputChange}
        />
        <TextInputField
          label={"Drivstoff"}
          icon={<LuFuel className="h-6 w-auto" />}
          name={"engineType"}
          initialValue={carData.engineType}
          onChange={handleCarInputChange}
        />
        <NumberInputField
          label={"Motorvolum/slagvolum"}
          icon={<MdNumbers className="h-6 w-auto" />}
          name={"engineVolume"}
          initialValue={carData.engineVolume}
          onChange={handleCarInputChange}
        />
        <p className="mt-4 text-base font-medium text-light-gray">Driftstype</p>
        <OptionsInput
          options={OPERATING_MODES}
          initialOption={carData.operatingMode}
          optionName={"operatingMode"}
          handleInputChange={handleCarInputChange}
        />
        <p className="mt-4 text-base font-medium text-light-gray">
          Girkassetype
        </p>
        <OptionsInput
          options={GEARBOX_TYPES}
          initialOption={carData.gearboxType}
          optionName={"gearboxType"}
          handleInputChange={handleCarInputChange}
        />
        <NumberInputField
          label={"Egenvekt"}
          icon={<MdNumbers className="h-6 w-auto" />}
          name={"weight"}
          initialValue={carData.weight}
          onChange={handleCarInputChange}
        />
        <TextInputField
          label={"Karosseri"}
          icon={<MdOutlineDirectionsCar className="h-6 w-auto" />}
          name={"bodywork"}
          initialValue={carData.bodywork}
          onChange={handleCarInputChange}
        />
        <NumberInputField
          label={"Dørantall"}
          icon={<MdNumbers className="h-6 w-auto" />}
          name={"numberOfDoors"}
          initialValue={carData.numberOfDoors}
          onChange={handleCarInputChange}
        />
        <NumberInputField
          label={"Seteantall"}
          icon={<MdOutlineAirlineSeatReclineNormal className="h-6 w-auto" />}
          name={"numberOfSeats"}
          initialValue={carData.numberOfSeats}
          onChange={handleCarInputChange}
        />
        <TextInputField
          label={"Farge"}
          icon={<MdOutlineFormatColorFill className="h-6 w-auto" />}
          name={"color"}
          initialValue={carData.color}
          onChange={handleCarInputChange}
        />
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-medium-gray">
          TILLEGSINFO
        </h1>
        <div className="relative mb-3 mt-5 w-full">
          <div className="pointer-events-none absolute inset-y-0 start-0 top-5 flex items-baseline ps-5">
            <MdEdit className="h-6 w-auto" />
          </div>
          <textarea
            id="add_info"
            className="block min-h-48 w-full rounded-lg border border-medium-gray bg-white px-5 py-4 ps-11 text-base font-medium text-medium-gray md:ps-14 md:text-lg"
            placeholder="Ytterligere opplysninger*"
            name={"additionalInformation"}
            value={carData.additionalInformation || ""}
            onChange={handleCarInputChange}
          />
        </div>
        <hr className="mb-4 mt-4 w-10/12 border-[1px] border-dashed border-gunmental px-2" />
        <h1 className="mt-8 text-2xl font-bold text-gunmental">STATUS</h1>
        <OptionsInput
          options={STATUS_OPTIONS}
          initialOption={carData.status}
          optionName={"status"}
          handleInputChange={handleCarInputChange}
        />

        {/* update new info for car, set status Auksjon, so it will not be displayed in Vurdering tab, send create new auction */}
        {carData.status === "Auksjon" && (
          <AuctionEditPanel
            auctionData={auctionData}
            setAuctionData={setAuctionData}
          />
        )}
        <div className="fixed bottom-0 flex w-full flex-row items-center justify-center gap-2 bg-lighthouse/50 backdrop-blur md:gap-5">
          <button
            type="submit"
            className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-2 pt-1 text-lg font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:px-4 md:text-2xl"
          >
            Lagre Alt
          </button>
          <button
            type="reset"
            className="card_shadow group mb-3 mt-3 flex flex-row items-center rounded-lg border border-medium-gray bg-lighthouse px-3 pb-2 pt-1 text-lg font-semibold text-gunmental hover:bg-gunmental hover:text-lighthouse md:px-4 md:text-2xl"
          >
            Tilbakestille
          </button>
        </div>
      </form>
      <MessageDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message={
          "Are you sure you want to reset all data? After confirming all unsaved data will be lost."
        }
        onFunc={() => {
          window.location.reload();
        }}
      />
    </div>
  );
};

export default CarEditingPanel;
