import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { HttpServicesService } from '../../services/http-services.service';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
@Component({
    selector: 'app-sign-up',
    standalone: true,
    imports: [
        MatOption,
        MatSelect,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        NgIf,
    ],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
    // isToggled
    isToggled = false;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public themeService: CustomizerSettingsService,
        private supabaseService: HttpServicesService
    ) {
        this.authForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            businessName: ['', Validators.required],
            businessAddress: ['', Validators.required],
            firstName: ['', Validators.required],
            phoneNumber: [
                '',
                [Validators.required, Validators.pattern('^[0-9]+$')],
            ],
            taxId: ['', Validators.required],
            typeofBusiness: ['', Validators.required],
        });
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    // Password Hide
    hide = true;

    // Form
    authForm: FormGroup;
    async onSubmit() {
        if (this.authForm.valid) {
            const formValues = this.authForm.value;
            console.log(formValues);
            try {
                const userExists = await this.supabaseService.checkUserExists(
                    formValues.email!
                );
                if (userExists) {
                    alert('Merchant already exists!');
                } else {
                    const user = this.supabaseService.signUp(
                        formValues.email!,
                        formValues.password!
                    );
                    if (user !== null && user !== undefined) {
                        //   if (fileUrl) {
                        const merchantDetails = {
                            email: formValues.email,
                            phone_number: formValues.phoneNumber,
                            name: formValues.firstName,
                            business_name: formValues.businessName,
                            business_address: formValues.businessAddress,
                            tax_id: formValues.taxId,
                            typeof_business: formValues.typeofBusiness,
                            password: formValues.password,
                        };
                        await this.supabaseService.storeUserData(
                            merchantDetails,
                            'merchants'
                        );

                        alert(
                            'Signup successful! Please wait for admin approval.'
                        );
                        this.authForm.reset();
                        this.router.navigate([
                            '/ecommerce-page/create-category',
                        ]);
                        console.log(merchantDetails);
                    }
                }
            } catch (error) {
                console.error('Error during registration:', error);
                alert('Registration failed!');
            }
        } else {
            console.log('Form is invalid. Please check the fields.');
        }
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // Card Border
    toggleCardBorderTheme() {
        this.themeService.toggleCardBorderTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
