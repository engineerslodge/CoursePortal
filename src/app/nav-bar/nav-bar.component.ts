import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Output, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiDataService } from '../Shared/api-data.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class NavBarComponent {
  loader: boolean = false;
  allCategory: any = [];
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private apiservice: ApiDataService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.GetAllCategory();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.apiservice.toggleSidebar(); // Uncomment this line if you want to trigger toggleSidebar on navigation end
      });
  }

  GetAllCategory() {
    this.loader = true;
    this.apiservice.GetCategory(localStorage.getItem('accesskey')).subscribe({
      next: (d) => {
        console.log(d);
        this.loader = false;
        this.allCategory = d;
        console.log(d);
      },
      error: (er) => {
        this.loader = false;
      },
    });
  }

  Logout() {
    localStorage.removeItem('accesskey');
    localStorage.removeItem('customername');
    localStorage.removeItem('email');
    localStorage.removeItem('Wallet');
    this.router.navigate(['/Login']);
  }
}
