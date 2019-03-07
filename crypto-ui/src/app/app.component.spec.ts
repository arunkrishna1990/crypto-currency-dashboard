import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng2-mock-component';
import { CreatePortfolioComponent } from './create-portfolio/create-portfolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignModule } from './shared/material.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>, component: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockComponent({
          selector: 'app-crypto-currency-list'
        }),
        MockComponent({
          selector: 'app-portfolio-list'
        })
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialDesignModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
