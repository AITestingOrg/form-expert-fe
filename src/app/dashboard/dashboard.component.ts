import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { select, select$ } from '@angular-redux/store';
import {MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Observable, Subscription } from 'rxjs';
import { LabelMappingActions } from '../state/label-mapping/label-mapping.actions';
import { IState } from '../models/model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  private displayedColumns = ['select', 'Label', 'Type', 'Abstraction'];
  @select(['labelMapping'])
  private readonly mappings$: Observable<IState>;
  private selection = new SelectionModel<any>(true, []);
  private dataSource: MatTableDataSource<any>;
  private subscription: Subscription;

  constructor(public snackBar: MatSnackBar, protected mappingsActions: LabelMappingActions) {}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.dataSource.sort = this.sort;
    this.mappingsActions.getAllMappings();
    this.subscription = this.mappings$.subscribe(
      mappings => {
        if (mappings.error) {
          this.snackBar.open('The label mappings could not be returned, please try again later.', 'Close', { duration: 5000 });
        } else {
          this.dataSource = new MatTableDataSource(mappings.items.toArray());
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
