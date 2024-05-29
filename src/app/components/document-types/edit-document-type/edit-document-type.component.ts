import {
  Component,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule, registerLocaleData, Location } from '@angular/common';
import localeCO from '@angular/common/locales/es-CO';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { EventData } from '@class';
import { EventBusService } from '@services';
import { DocumentType } from '@interfaces';

registerLocaleData(localeCO);

@Component({
  selector: 'cmp-edit-document-type',
  templateUrl: './edit-document-type.component.html',
  styleUrl: './edit-document-type.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-CO' }],
})
export class EditDocumentTypeComponent implements OnChanges, OnInit {
  @Input() public documentType!: DocumentType;

  public form: FormGroup = this.formBuilder.group({
    id: new FormControl(null, []),
    abbreviation: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
  });

  private eventBusService: EventBusService = inject(EventBusService);

  constructor(private formBuilder: FormBuilder, private location: Location) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { documentType } = changes;

    if (documentType && documentType.currentValue) {
      this.form.patchValue(this.documentType);
    }
  }

  ngOnInit(): void {
    // code here!
  }

  public onGoBack(): void {
    this.location.back();
  }

  public onSumbit(): void {
    if (this.form.valid) {
      this.eventBusService.emit(new EventData('edit-document-type', this.form.value));
    }
  }
}
