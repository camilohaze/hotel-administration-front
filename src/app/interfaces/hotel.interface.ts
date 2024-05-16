import { City } from "./city.interface";
import { Room } from "./room.interface";

/**
 * Hotel.
 *
 * @export
 * @interface Hotel
 */
export interface Hotel {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  cityId: number;
  city: City;
  status: boolean;
  rooms: Room[];
  createdAt: string;
  updatedAt: string;
}
