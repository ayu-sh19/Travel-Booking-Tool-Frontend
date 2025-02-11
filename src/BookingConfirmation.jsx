import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import globe from "../src/assets/globe.gif";
import confetti from "canvas-confetti";

function BookingConfirmation() {
  const { offerId } = useParams();
  console.log(offerId);
  // const authToken = useSelector((state) => state.auth.userAuthToken);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState();
  const [bookingFailure, setBookingFailure] = useState(false);
  const guestInfo = useSelector((state) => state.auth.bookingData);
  const [error, setError] = useState();
  const bookHotel = async (guestInfo) => {
    try {
      return await axios.post(
        "http://localhost:3131/api/booking",
        {
          data: {
            type: "hotel-order",
            guests: [
              {
                tid: 1,
                title: "MR",
                firstName: `${guestInfo.data.firstName}`,
                lastName: `${guestInfo.data.lastName}`,
                phone: "+33679278416",
                email: `${guestInfo.data.email}`,
              },
            ],
            travelAgent: {
              contact: {
                email: "bob.smith@email.com",
              },
            },
            roomAssociations: [
              {
                guestReferences: [
                  {
                    guestReference: "1",
                  },
                ],
                hotelOfferId: `${offerId}`,
              },
            ],
            payment: {
              method: "CREDIT_CARD",
              paymentCard: {
                paymentCardInfo: {
                  vendorCode: "VI",
                  cardNumber: "4151289722471370",
                  expiryDate: "2026-08",
                  holderName: "BOB SMITH",
                },
              },
            },
          },
        },
        {
          params: {},
        }
      );
    } catch (error) {
      setError(error.message);
    }
  };

  function fire() {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.8 },
    });
  }

  useEffect(() => {
    bookHotel(guestInfo)
      .then((data) => {
        try {
          const bookingConfirmationData = data.data.data;
          if (bookingConfirmationData) {
            setBooking(bookingConfirmationData);
            console.log(bookingConfirmationData);
            fire();
          }
        } catch (error) {
          setBookingFailure(true);
          console.error("Booking Confirmation Failed", error);
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    !bookingFailure ? (
      <div className="flex justify-center h-screen w-full  fixed overflow-hidden">
        <div className="w-full max-w-sm mb-50 p-4 m-auto bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            Hotel Confirmation
          </h5>
          <div className="flex items-baseline text-2xl text-gray-900 dark:text-white">
            {booking?.hotelBookings[0]?.hotel.name}
          </div>
          {/* <div className="flex items-baseline text-gray-900 dark:text-white">
              <span className="text-3xl font-semibold">$</span>
              <span className="text-5xl font-extrabold tracking-tight">49</span>
              <span className="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">
                /month
              </span>
            </div> */}
          <ul role="list" className="space-y-5 my-7">
            <li className="flex items-center">
              <span className="text-base font-normal  text-gray-900 dark:text-white ">
                Confirmation Number :{" "}
                {
                  booking?.hotelBookings[0]?.hotelProviderInformation[0]
                    .confirmationNumber
                }
              </span>
            </li>
            <li className="flex">
              <span className="text-base font-normal text-gray-900 dark:text-white">
                Guest : {booking?.guests[0].firstName}{" "}
                {booking?.guests[0].lastName}
              </span>
            </li>
            <li className="flex">
              <span className="text-base font-normal text-gray-900 dark:text-white">
                Check In : {booking?.hotelBookings[0].hotelOffer?.checkInDate}{" "}
                {/* {
                  booking?.hotelBookings[0].hotelOffer?.policies.checkInOut
                    .checkIn
                } */}
                {/* {hotel?.offers[0]?.price.base} */}
              </span>
            </li>
            <li className="flex">
              <span className="text-base font-normal text-gray-900 dark:text-white">
                Check Out : {booking?.hotelBookings[0].hotelOffer?.checkOutDate}{" "}
                {/* {
                  booking?.hotelBookings[0].hotelOffer?.policies.checkInOut
                    .checkOut
                } */}
                {/* {(
                  Number(hotel?.offers[0]?.price.total) -
                  Number(hotel?.offers[0]?.price.base)
                ).toFixed(2)} */}
              </span>
            </li>
            <li className="flex">
              <span className="text-base font-normal text-gray-900 dark:text-white">
                {/* Total Price : {hotel?.offers[0]?.price.currency}{" "}
                {hotel?.offers[0]?.price.total} */}
              </span>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <div className="flex justify-center h-screen w-full fixed overflow-hidden items-center">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-auto w-5xl"
          role="alert"
        >
          <strong className="font-bold">Booking Failure! </strong>
          <span className="block sm:inline">
            Booking confirmation failure due to server error
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      </div>
    )
  ) : (
    <div className=" w-full fixed overflow-hidden flex items-center h-screen">
      <div className="m-auto w-30 h-30">
        <img src={globe}></img>
      </div>
    </div>
  );
}

export default BookingConfirmation;
