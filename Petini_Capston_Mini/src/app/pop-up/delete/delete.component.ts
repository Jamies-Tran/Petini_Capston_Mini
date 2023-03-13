import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../message/message.component';
import { SuccessComponent } from '../success/success.component';
import { AfterCareService } from '../../services/after-care.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit {
  message: any;
  filter: any;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { data: string; name: string; filter: string },
    public dialog: MatDialog,
    private httpAfterCare: AfterCareService,
    private httpOrder: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.data.filter == 'service') {
      this.filter = 'xóa';
    } else if (this.data.filter == 'order') {
      this.filter = 'từ chối';
    }
  }

  deleteAction() {
    if (this.data.filter == 'service') {
      this.httpAfterCare.deleteService(this.data.name).subscribe(
        (data) => {
          this.message = 'Xóa dịch vụ thành công';
          this.openDialogSuccess();
          setTimeout(() => {
            this.router.navigate(['/ShopOwner/Service'], {
              relativeTo: this.route,
            });
          }, 1000);
        },
        (error) => {
          this.message = error;
          this.openDialogMessag();
        }
      );
    } else if (this.data.filter == 'order') {
      let id = this.data.name as unknown as number;
      this.httpOrder.rejectOrder(id).subscribe(
        (data) => {
          localStorage.setItem('manageOrder', 'true');
          this.message = 'Xóa dịch vụ thành công';
          this.openDialogSuccess();
        },
        (error) => {
          this.message = error;
          this.openDialogMessag();
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
