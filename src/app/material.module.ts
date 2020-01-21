import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule,  MatDatepickerModule,  MatNativeDateModule, MatProgressBarModule,  MatSlideToggleModule,  MatSnackBarModule,
} from '@angular/material';
@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule,
    MatInputModule, MatDialogModule, MatSidenavModule, MatCheckboxModule, MatListModule, MatExpansionModule, MatGridListModule,
    MatPaginatorModule, MatSortModule, MatTableModule, MatTooltipModule, MatBadgeModule, MatSelectModule, MatProgressSpinnerModule,
    MatChipsModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatProgressBarModule],
  exports: [MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatFormFieldModule, MatInputModule,
    MatDialogModule, MatSidenavModule, MatCheckboxModule, MatListModule, MatExpansionModule, MatGridListModule, MatPaginatorModule,
    MatSortModule, MatTableModule, MatTooltipModule, MatBadgeModule, MatSelectModule, MatProgressSpinnerModule, MatChipsModule,
    MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatProgressBarModule]
})
export class MaterialModule { }
