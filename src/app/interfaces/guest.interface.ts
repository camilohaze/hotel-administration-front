import { Gender } from "./gender.interface";
import { DocumentType } from "./document-type.interface";
import { Booking } from "./booking.interface";

/**
 * Guest.
 *
 * @export
 * @interface Guest
 */
export interface Guest {
  id: number;
  firstName: string;
  lastName: string;
  genderId: string;
  gender: Gender;
  documentTypeId: string;
  documentType: DocumentType;
  document: string;
  email: string;
  phone: string;
  bookingId: number;
  booking: Booking;
  createdAt: string;
  updatedAt: string;
}
