import { Component } from '@angular/core';
import { FilterService } from 'src/app/services/filter/filter.service';
import { Filter } from 'src/app/interfaces';
import { ComparisonType, FilterType } from 'src/app/enums';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  public filters: Filter[] = [];

  public ComparisonType = ComparisonType;
  public FilterType = FilterType;

  constructor(private filterService: FilterService) {
    this.filterService.filters$.subscribe((filters: Map<string, Filter>) => {
      this.filters = [...filters.values()];
    });
  }

  filterApplyChanged(el: Filter) {
    el.apply = !el.apply;
  }

  remove(id: string) {
    const response = confirm('Do you want to remove this filter?');
    if (response) {
      this.filterService.removeFilter(id);
    }
  }

  edit(filter: Filter){
    this.filterService.editFilter(filter);
  }
}
