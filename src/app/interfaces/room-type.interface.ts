/**
 * RoomType.
 *
 * @export
 * @interface RoomType
 */
export interface RoomType {
  id: number;
  type: string;
  description: string;
  minimum: number;
  maximum: number;
  price: number;
  tax: number;
  createdAt: string;
  updatedAt: string;
}
