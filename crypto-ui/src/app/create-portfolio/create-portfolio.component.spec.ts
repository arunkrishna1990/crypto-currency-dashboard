import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePortfolioComponent } from './create-portfolio.component';
import { MaterialDesignModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CryptoDashboardService } from '../core/crypto-dashboard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material';

describe('CreatePortfolioComponent', () => {
  let component: CreatePortfolioComponent, dialog;
  let fixture: ComponentFixture<CreatePortfolioComponent>, mockCryptoDashboardService;
  const mockCryptoCurrencies = [{
    'id': 1,
    'name': 'Bitcoin',
    'price': 3881.88864625
  },
  {
    'id': 52,
    'name': 'XRP',
    'price': 0.353610065729
  },
  {
    'id': 1027,
    'name': 'Ethereum',
    'price': 108.4856134
  }];
  beforeEach(async(() => {
    mockCryptoDashboardService = jasmine.createSpyObj('CryptoDashboardService', ['getListOfCryptoCurrencies', 'createNewPortfolio']);
    mockCryptoDashboardService.getListOfCryptoCurrencies.and.returnValue(of(mockCryptoCurrencies));
    dialog = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      declarations: [CreatePortfolioComponent],
      imports: [BrowserAnimationsModule, MaterialDesignModule, ReactiveFormsModule],
      providers: [{
        provide: CryptoDashboardService, useValue: mockCryptoDashboardService
      }, { provide: MatDialogRef, useValue: dialog }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when component is compiled', () => {
    it('should show the list of crypto currencies', () => {
      const listItems = fixture.debugElement.queryAll(By.css('.mat-list-item'));
      expect(listItems.length).toEqual(mockCryptoCurrencies.length);

      for (let i = 0; i < listItems.length; i++) {
        expect(listItems[i].nativeElement.innerHTML).toContain(mockCryptoCurrencies[i].name);
        expect(listItems[i].nativeElement.innerHTML).toContain(mockCryptoCurrencies[i].price);
      }
    });
  });

  describe('create', () => {
    beforeEach(() => {
      component.createPortfolioForm.get('name').setValue('DummyName');
      fixture.debugElement.queryAll(By.css('.mat-list-item'))[0].triggerEventHandler('click', null);
      fixture.debugElement.queryAll(By.css('.mat-list-item'))[1].triggerEventHandler('click', null);
      fixture.detectChanges();

      fixture.debugElement.query(By.css('#create')).triggerEventHandler('click', null);
      fixture.detectChanges();
    });

    it('should call cryptoDashboardService.createNewPortfolio with the correct payload', () => {
      const expectedPayload = {
        name: 'DummyName',
        cryptoCurrencies: [{
          'id': 1,
          'name': 'Bitcoin',
          'price': 3881.88864625
        },
        {
          'id': 52,
          'name': 'XRP',
          'price': 0.353610065729
        }]
      };
      expect(mockCryptoDashboardService.createNewPortfolio).toHaveBeenCalledWith(expectedPayload);
    });

    it('should close the dialog', () => {
      expect(dialog.close).toHaveBeenCalledTimes(1);
    });
  });
});
