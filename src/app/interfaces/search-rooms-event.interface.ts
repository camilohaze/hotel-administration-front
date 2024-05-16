import { Moment } from 'moment';

/**
 * SearchRoomsEvent.
 *
 * @export
 * @interface SearchRoomsEvent
 */
export interface SearchRoomsEvent {
  cityId: number;
  checkin: Moment;
  checkout: Moment;
  passengers: number;
}
