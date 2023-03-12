import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { SuccessComponent } from '../success/success.component';
import { AfterCareService } from '../../services/after-care.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  message: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { data: string; name: string; filter: string },
    public dialog: MatDialog,
    private http: AfterCareService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  deleteAction() {
    if (this.data.filter == 'service') {
      this.http.deleteService(this.data.name).subscribe(
        (data) => {
          this.message = 'Xóa dịch vụ thành công';
          this.openDialogSuccess();
          setTimeout(() =>{
            this.router.navigate(['/ShopOwner/Service'], { relativeTo: this.route });
         }, 1000);

        },
        (error) => {
          this.message = error;
          this.openDialogSuccess();
        }
      );
    }
  }

  openDialogMessag() {
    this.dialog.open(MessageComponent, {
      data: this.message,
    });
  }
  openDialogSuccess() {
    this.dialog.open(SuccessComponent, {
      data: this.message,
    });
  }
}
