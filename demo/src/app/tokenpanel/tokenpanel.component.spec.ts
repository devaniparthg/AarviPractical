import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenpanelComponent } from './tokenpanel.component';

describe('TokenpanelComponent', () => {
  let component: TokenpanelComponent;
  let fixture: ComponentFixture<TokenpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenpanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
