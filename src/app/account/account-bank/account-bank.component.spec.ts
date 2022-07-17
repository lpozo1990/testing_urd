import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBankComponent } from './account-bank.component';

describe('AccountBankComponentComponent', () => {
  let component: AccountBankComponent;
  let fixture: ComponentFixture<AccountBankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
