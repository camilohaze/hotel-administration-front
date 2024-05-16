import { Room } from "./room.interface";

/**
 * DeleteRoomEvent.
 *
 * @export
 * @interface DeleteRoomEvent
 */
export interface DeleteRoomEvent {
  index: number;
  room: Room;
}
