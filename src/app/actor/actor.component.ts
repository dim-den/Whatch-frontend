import { Component, OnInit } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { ActorDto } from '@proxy/dto';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActorService } from '@proxy/services';
import { MatDialog } from '@angular/material/dialog';
import { ActorDialogComponent } from './actor-dialog/actor-dialog.component';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss'],
  providers: [ListService],
})
export class ActorComponent implements OnInit {
  actors: PagedResultDto<ActorDto> = { items: [], totalCount: 0 };

  columns: string[] = ['actions', 'name', 'lastname', 'birthday'];

  changePage(pageEvent: PageEvent) {
    this.list.page = pageEvent.pageIndex;
  }

  changeSort(sort: Sort) {
    this.list.sortKey = sort.active;
    this.list.sortOrder = sort.direction;
  }

  constructor(
    public readonly list: ListService,
    private actorService: ActorService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const actorStreamCreator = query => this.actorService.getList(query);

    this.list.hookToQuery(actorStreamCreator).subscribe(x => (this.actors = x));
  }

  createActor() {
    const dialogRef = this.dialog.open(ActorDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.actorService.create(result).subscribe(() => {
          this.list.get();
        });
      }
    });
  }

  editActor(id: any) {
    this.actorService.get(id).subscribe(actor => {
      const dialogRef = this.dialog.open(ActorDialogComponent, {
        data: actor,
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.actorService.update(id, result).subscribe(() => {
            this.list.get();
          });
        }
      });
    });
  }

  deleteActor(id: number) {
    this.actorService.delete(id).subscribe(() => this.list.get());
  }
}
