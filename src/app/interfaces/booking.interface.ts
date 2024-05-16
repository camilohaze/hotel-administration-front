import { Guest } from "./guest.interface";
import { Hotel } from "./hotel.interface";
import { Room } from "./room.interface";

/**
 * Booking.
 *
 * @export
 * @interface Booking
 */
export interface Booking {
  id: number;
  hotelId: number;
  hotel: Hotel;
  roomId: number;
  room: Room;
  checkin: string;
  checkout: string;
  fullName: string;
  phone: string;
  total: string;
  guests: Guest[];
  createdAt: string;
  updatedAt: string;
}
