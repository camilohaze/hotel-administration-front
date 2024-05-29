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
import { City } from '@interfaces';

registerLocaleData(localeCO);

@Component({
  selector: 'cmp-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrl: './edit-city.component.scss',
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
export class EditCityComponent implements OnChanges, OnInit {
  @Input() public city!: City;

  public form: FormGroup = this.formBuilder.group({
    id: new FormControl(null, []),
    name: new FormControl(null, [Validators.required]),
  });

  private eventBusService: EventBusService = inject(EventBusService);

  constructor(private formBuilder: FormBuilder, private location: Location) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { city } = changes;

    if (city && city.currentValue) {
      this.form.patchValue(this.city);
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
      this.eventBusService.emit(new EventData('edit-city', this.form.value));
    }
  }
}
