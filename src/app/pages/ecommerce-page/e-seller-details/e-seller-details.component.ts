import { Component, Input, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { TotalEarningsComponent } from './total-earnings/total-earnings.component';
import { TotalRefundsComponent } from './total-refunds/total-refunds.component';
import { ConversionRateComponent } from './conversion-rate/conversion-rate.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RevenueComponent } from './revenue/revenue.component';
import { ProductsComponent } from './products/products.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { CommonModule } from '@angular/common';
import { HttpServicesService } from '../../../services/http-services.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-e-seller-details',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatCardModule,
        CommonModule,
        TotalOrdersComponent,
        TotalEarningsComponent,
        TotalRefundsComponent,
        ConversionRateComponent,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        RevenueComponent,
        ProductsComponent,
    ],
    templateUrl: './e-seller-details.component.html',
    styleUrl: './e-seller-details.component.scss',
})
export class ESellerDetailsComponent {
    rating: number = 0;
    stars: boolean[] = Array(5).fill(false);
    feedback: any;
    replyForm: FormGroup;

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private supabaseService: HttpServicesService
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
        this.replyForm = new FormGroup({
            reply: new FormControl('', Validators.required),
        });
    }

    async ngOnInit() {
        this.feedback = await this.supabaseService.getRating();
        console.log(this.feedback);
    }

    updateStars() {
        this.stars = this.stars.map((_, i) => i < this.rating);
    }

    rate(rating: number) {
        this.rating = rating;
        this.updateStars();
    }

    async submitReply(feedbackId: number) {
        const reply = this.replyForm.value.reply;
        try {
            await this.supabaseService.addReply(feedbackId, reply);
            const feedbackItem = this.feedback.find(
                (item: any) => item.id === feedbackId
            );
            if (feedbackItem) {
                feedbackItem.reply = reply;
            }
            this.replyForm.reset();
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
