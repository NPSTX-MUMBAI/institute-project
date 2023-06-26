import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { SpeedDialModule } from 'primeng/speeddial';
import { SliderModule } from 'primeng/slider';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { ChartModule } from 'primeng/chart';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessagesModule } from 'primeng/messages';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ImageModule } from 'primeng/image';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { TabMenuModule } from 'primeng/tabmenu';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TimelineModule } from 'primeng/timeline';
import { MenubarModule } from 'primeng/menubar';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';
import { ChipsModule } from 'primeng/chips';
import { BadgeModule } from 'primeng/badge';
import { GalleriaModule } from 'primeng/galleria';
import { SplitterModule } from 'primeng/splitter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';

const arrays = [
    CommonModule,
    CarouselModule,
    CalendarModule,
    PasswordModule,
    ToastModule,
    InputTextModule,
    DropdownModule,
    StepsModule,
    CardModule,
    SpeedDialModule,
    SliderModule,
    FileUploadModule,
    TableModule,
    MultiSelectModule,
    MultiSelectModule,
    MenuModule,
    ChartModule,
    CheckboxModule,
    TagModule,
    DialogModule,
    TreeModule,
    MenuModule,
    SplitButtonModule,
    ToastModule,
    AccordionModule,
    DividerModule,
    ConfirmPopupModule,
    InputTextareaModule,
    ReactiveFormsModule,
    MessagesModule,
    DynamicDialogModule,
    CardModule,
    TabViewModule,
    ImageModule,
    ToastModule,
    KeyFilterModule,
    InputNumberModule,
    AutoCompleteModule,
    InputMaskModule,
    TabMenuModule,
    ReactiveFormsModule,
    InputSwitchModule,
    FormsModule,
    TimelineModule,
    MenubarModule,
    ChipsModule,
    BadgeModule,
    GalleriaModule,
    SplitterModule,
    ConfirmDialogModule,
    ProgressBarModule,
];

export const loaderConf: NgxUiLoaderConfig = {
    bgsColor: 'red',
    bgsOpacity: 0.5,
    bgsPosition: 'bottom-right',
    bgsSize: 60,
    bgsType: 'wandering-cubes',
    blur: 5,
    delay: 0,
    fastFadeOut: true,
    fgsColor: '#9D4BFF',
    fgsPosition: 'center-center',
    fgsSize: 60,
    fgsType: 'square-jelly-box',
    gap: 24,
    logoPosition: 'center-center',
    logoSize: 120,
    logoUrl: '../../assets/layout/images/society_loading.gif',
    masterLoaderId: 'master',
    overlayBorderRadius: '0',
    overlayColor: 'rgba(40, 40, 40, 0.8)',
    pbColor: '#9D4BFF',
    pbDirection: 'ltr',
    pbThickness: 3,
    hasProgressBar: true,
    text: '',
    textColor: '#FFFFFF',
    textPosition: 'center-center',
    maxTime: -1,
    minTime: 300,
};
@NgModule({
    imports: arrays,
    exports: arrays,
})
export class UiModule {}
