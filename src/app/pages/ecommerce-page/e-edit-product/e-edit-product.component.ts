// import { Component } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatSelectModule } from '@angular/material/select';
// import { RouterLink } from '@angular/router';
// import { FileUploadModule } from '@iplab/ngx-file-upload';
// import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';

// @Component({
//     selector: 'app-e-edit-product',
//     standalone: true,
//     imports: [
//         MatCardModule,
//         MatMenuModule,
//         MatButtonModule,
//         RouterLink,
//         FormsModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatSelectModule,
//         MatDatepickerModule,
//         MatNativeDateModule,
//         ReactiveFormsModule,
//         FileUploadModule,
//         NgxEditorModule,
//     ],
//     templateUrl: './e-edit-product.component.html',
//     styleUrl: './e-edit-product.component.scss',
// })
// export class EEditProductComponent {
//     // Select Value
//     productTypeSelected = 'option1';
//     brandTypeSelected = 'option1';
//     categorySelected = 'option1';
//     vendorSelected = 'option1';
//     collectionSelected = 'option1';

//     // Text Editor
//     editor: Editor;
//     toolbar: Toolbar = [
//         ['bold', 'italic'],
//         ['underline', 'strike'],
//         ['code', 'blockquote'],
//         ['ordered_list', 'bullet_list'],
//         [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
//         ['link', 'image'],
//         ['text_color', 'background_color'],
//         ['align_left', 'align_center', 'align_right', 'align_justify'],
//     ];

//     ngOnInit(): void {
//         this.editor = new Editor();
//     }

//     // make sure to destory the editor
//     ngOnDestroy(): void {
//         this.editor.destroy();
//     }
// }

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { HttpServicesService } from '../../../services/http-services.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-e-edit-product',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        FileUploadModule,
        NgxEditorModule,
    ],
    templateUrl: './e-edit-product.component.html',
    styleUrl: './e-edit-product.component.scss',
})
export class EEditProductComponent {
    // Select Value
    productTypeSelected: string = '';
    selectedOption: any = null;
    // brandTypeSelected = 'option1';
    // categorySelected = 'option1';
    // vendorSelected = 'option1';
    // collectionSelected = 'option1';

    // Text Editor
    editor: Editor;
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    // make sure to destory the editor
    ngOnDestroy(): void {
        this.editor.destroy();
    }
    highlightsControl = new FormControl('', Validators.required);
    optionsControl = new FormControl<string | null>(null);
    descriptionControl = new FormControl('', Validators.required);
    endDateControl = new FormControl<Date | null>(null);

    id: string;

    constructor(
        private route: ActivatedRoute,
        private supabaseService: HttpServicesService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];

        this.editor = new Editor();
        this.loadInput();
        this.optionsControl.valueChanges.subscribe((value) => {
            this.productTypeSelected = value || '';
            this.updateSelectedOption();
        });
    }
    options: any[] = [];
    campaignName: string;
    async loadInput() {
        try {
            const optionData = await this.supabaseService.getInputById(this.id);
            console.log(optionData);
            this.options = optionData.options || [];
            this.campaignName = optionData.name;
            console.log('Loaded options:', this.options); // Deb
            this.endDateControl.patchValue(optionData.end_date);
            this.highlightsControl.patchValue(optionData.highlights);
            this.descriptionControl.patchValue(optionData.description);

            if (this.options.length > 0) {
                this.optionsControl.setValue(this.options[0].option_name); // Set default selection
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    }

    async Edit() {
        if (this.selectedOption) {
            const index = this.options.findIndex(
                (option) =>
                    option.option_name === this.selectedOption.option_name
            );
            if (index !== -1) {
                this.options[index] = this.selectedOption;
            }
            const end_date = this.endDateControl.value;
            const highlights = this.highlightsControl.value;
            // const options = this.optionsControl.value;
            const description = this.descriptionControl.value;

            await this.supabaseService.updateUser(this.id, {
                end_date,
                highlights,
                options: this.options,
                description,
            });
            console.log('Campaign updated successfully');
            alert('Campaign updated successfully');
            await this.loadInput();
            this.router.navigate(['/ecommerce-page']);
        }
    }

    updateSelectedOption() {
        this.selectedOption = this.options.find(
            (option: any) => option.option_name === this.optionsControl.value
        );
    }
}
