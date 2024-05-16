import { Hotel } from "./hotel.interface";
import { Room } from "./room.interface";

import { DocumentType } from "./document-type.interface";
import { Gender } from "./gender.interface";
import { Guest } from "./guest.interface";

/**
 * BookingEvent.
 *
 * @export
 * @interface BookingEvent
 */
export interface BookingEvent {
  id: number;
  hotelId: number;
  hotel: Hotel;
  roomId: number;
  room: Room;
  checkin: string;
  checkout: string;
  passengers: number;
  total: number;
  documentTypes: DocumentType[];
  genders: Gender[];
  guests: Guest[];
}
