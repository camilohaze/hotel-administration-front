import { Hotel } from "./hotel.interface";
import { RoomType } from "./room-type.interface";

/**
 * Room.
 *
 * @export
 * @interface Room
 */
export interface Room {
  id: number;
  number: number;
  roomTypeId: number;
  roomType: RoomType;
  hotelId: number;
  hotel: Hotel;
  busy: boolean;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}
