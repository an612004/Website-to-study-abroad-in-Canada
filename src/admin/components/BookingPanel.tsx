import React, { useEffect, useState } from 'react';

import { IBookingItem } from '../../pages/api/booking/get-all';

const PAGINATION = 20;

const BookingDeleteButton = ({
  booking,
  onDelete,
}: {
  booking: IBookingItem;
  onDelete: () => void;
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const setConfirmation = async () => {
    const response = await fetch('/api/booking/delete', {
      method: 'POST',
      body: JSON.stringify({ id: booking.id }),
    });
    if (response.ok) {
      const { success } = await response.json();
      if (success) {
        onDelete();
      }
    }
    setShowConfirm(false);
  };

  return (
    <div className="relative">
      <div
        className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100 hover:cursor-pointer"
        onClick={() => setShowConfirm(true)}
      >
        <svg
          className="w-4 h-4 fill-current text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
        </svg>
      </div>
      {showConfirm && (
        <div className="z-40 rounded border border-gray-100 absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-white shadow-lg py-2 px-4 flex gap-1">
          <div
            onClick={() => setShowConfirm(false)}
            className="text-xs text-gray-900 hover:cursor-pointer bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded border"
          >
            Cancel
          </div>
          <div
            onClick={() => setConfirmation()}
            className="text-xs text-white hover:cursor-pointer bg-red-400 hover:bg-red-500 px-3 py-1 rounded border"
          >
            Confirm
          </div>
        </div>
      )}
    </div>
  );
};

const BookingStatusToggle = ({
  booking,
  onToggle,
}: {
  booking: IBookingItem;
  onToggle?: (value: boolean) => void;
}) => {
  const [value, setValue] = useState(booking.resolved);
  const [showConfirm, setShowConfirm] = useState(false);

  const onToggleStatus = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const setConfirmation = async () => {
    const response = await fetch('/api/booking/update', {
      method: 'POST',
      body: JSON.stringify({ bookingId: booking.id, status: !value }),
    });
    if (response.ok) {
      const { success } = await response.json();
      if (success) {
        if (onToggle) onToggle(!value);
        setValue(!value);
      }
    }
    setShowConfirm(false);
  };

  return (
    <div className="relative">
      <label
        htmlFor={booking.id}
        className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100"
      >
        <span className="relative">
          <input
            id={booking.id}
            type="checkbox"
            onChange={(e) => onToggleStatus(e)}
            disabled={showConfirm}
            checked={value}
            className="hidden peer"
          />
          <div className="w-10 h-6 rounded-full shadow-inner dark:bg-gray-400 peer-checked:dark:bg-green-500"></div>
          <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-100"></div>
        </span>
      </label>
      {showConfirm && (
        <div className="z-40 rounded border border-gray-400 absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-white shadow-lg py-2 px-4 flex gap-1">
          <div
            onClick={() => setShowConfirm(false)}
            className="text-xs text-gray-900 hover:cursor-pointer bg-gray-400 hover:bg-gray-500 px-3 py-1 rounded border"
          >
            Cancel
          </div>
          <div
            onClick={() => setConfirmation()}
            className="text-xs text-white hover:cursor-pointer bg-red-400 hover:bg-red-500 px-3 py-1 rounded border"
          >
            Confirm
          </div>
        </div>
      )}
    </div>
  );
};

const BookingPanel = () => {
  const [bookings, setBookings] = useState<Array<IBookingItem>>([]);
  const [searchPosts, setSearchPosts] = useState<Array<IBookingItem>>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setSearchPosts([...bookings]);
  }, [bookings]);

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/booking/get-all', {
        method: 'GET',
      });
      const body = await response.json();
      setBookings([...body.data]);
      // console.log(body.data);
    })();
  }, []);

  function onSearching(e: React.ChangeEvent<HTMLInputElement>): void {
    // if (e.target.value.length > 0)
    setSearchPosts((_bookings) =>
      _bookings?.filter((b) => b.time.includes(e.target.value))
    );
  }

  function onToggleBookingStatus(booking: IBookingItem, value: boolean): void {
    setBookings((_bookings) =>
      _bookings?.map((b) =>
        b.id === booking.id ? { ...b, resolved: value } : b
      )
    );
  }

  function onRemoveBooking(booking: IBookingItem): void {
    setBookings((_bookings) => _bookings?.filter((b) => b.id !== booking.id));
  }

  return (
    <div className="w-full px-20 py-10 overflow-y-scroll max-h-screen">
      <div className="text-2xl font-bold mb-16">Liện hệ</div>
      <div className="">
        <div className="bg-white pb-4 px-4 rounded-md w-full">
          <div className="flex justify-between w-full pt-6 ">
            <p className="ml-3"></p>
            {/* <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.4">
                <circle cx="2.19796" cy="1.80139" r="1.38611" fill="#222222" />
                <circle cx="11.9013" cy="1.80115" r="1.38611" fill="#222222" />
                <circle cx="7.04991" cy="1.80115" r="1.38611" fill="#222222" />
              </g>
            </svg> */}
          </div>
          <div className="w-full flex justify-end px-2 mt-2">
            <div className="w-full sm:w-64 inline-block relative ">
              <input
                type=""
                onChange={(e) => onSearching(e)}
                name=""
                className="leading-snug border border-gray-300 block w-full appearance-none bg-gray-100 text-sm text-gray-600 py-1 px-4 pl-8 rounded-lg"
                placeholder="Search by Date"
              />

              <div className="pointer-events-none absolute pl-3 inset-y-0 left-0 flex items-center px-2 text-gray-300">
                <svg
                  className="fill-current h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 511.999 511.999"
                >
                  <path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto mt-6">
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr className="rounded-lg text-sm font-medium text-gray-700 text-left">
                  <th className="px-4 py-2 bg-gray-200 ">Name</th>
                  <th className="px-4 py-2 bg-gray-200 ">Email</th>
                  <th className="px-4 py-2 bg-gray-200 ">Phone</th>
                  <th className="px-4 py-2 ">Date</th>
                  <th className="px-4 py-2 ">Mail Sent</th>
                  <th className="px-4 py-2 ">Status</th>
                  <th className="px-4 py-2 "></th>
                </tr>
              </thead>
              <tbody className="text-sm font-normal text-gray-700">
                {searchPosts
                  ?.slice(
                    PAGINATION * currentPage,
                    PAGINATION * (currentPage + 1)
                  )
                  .map((booking) => (
                    <tr
                      key={`${booking.id}`}
                      className="hover:bg-gray-100 border-b border-gray-200 py-10"
                    >
                      <td className="px-4 py-4">
                        <p className="">{booking.name}</p>
                      </td>
                      <td className="px-4 py-4">{booking.email}</td>
                      <td className="px-4 py-4">{booking.phone}</td>
                      <td className="px-4 py-4">{booking.time}</td>
                      <td
                        className={`px-4 py-4${
                          booking.mailSent ? '' : ' text-red-800'
                        }`}
                      >
                        {booking.mailSent ? 'Đã gửi' : 'Chưa gửi'}
                      </td>
                      <td className="px-4 py-4">
                        <BookingStatusToggle
                          booking={booking}
                          onToggle={(value) =>
                            onToggleBookingStatus(booking, value)
                          }
                        ></BookingStatusToggle>
                      </td>
                      <td className="px-4 py-4">
                        <BookingDeleteButton
                          booking={booking}
                          onDelete={() => onRemoveBooking(booking)}
                        ></BookingDeleteButton>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div
            id="pagination"
            className="w-full flex justify-center border-t border-gray-100 pt-4 items-center"
          >
            {/* <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.4">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 12C9 12.2652 9.10536 12.5196 9.29289 12.7071L13.2929 16.7072C13.6834 17.0977 14.3166 17.0977 14.7071 16.7072C15.0977 16.3167 15.0977 15.6835 14.7071 15.293L11.4142 12L14.7071 8.70712C15.0977 8.31659 15.0977 7.68343 14.7071 7.29289C14.3166 6.90237 13.6834 6.90237 13.2929 7.29289L9.29289 11.2929C9.10536 11.4804 9 11.7348 9 12Z" fill="#2C2C2C" />
              </g>
            </svg> */}
            {[
              ...Array(
                Math.ceil((searchPosts?.length ?? 0) / PAGINATION)
              ).keys(),
            ].map((n) => (
              <div
                key={n}
                onClick={() => setCurrentPage(n)}
                className={
                  `${n === currentPage ? 'underline' : ''} ` +
                  `p-2 border-1 leading-relaxed cursor-pointer mx-2 text-blue-600 hover:text-blue-700 text-sm`
                }
              >
                {n + 1}
              </div>
            ))}
            {/* <svg className="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15 12C15 11.7348 14.8946 11.4804 14.7071 11.2929L10.7071 7.2929C10.3166 6.9024 9.6834 6.9024 9.2929 7.2929C8.9024 7.6834 8.9024 8.3166 9.2929 8.7071L12.5858 12L9.2929 15.2929C8.9024 15.6834 8.9024 16.3166 9.2929 16.7071C9.6834 17.0976 10.3166 17.0976 10.7071 16.7071L14.7071 12.7071C14.8946 12.5196 15 12.2652 15 12Z" fill="#18A0FB" />
            </svg> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPanel;
