import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecentItemsComponent } from './recent-items.component';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { offerServiceMockData } from '@gintaa/shared/mock-data';
import { of } from 'rxjs';
import { OfferService } from '@gintaa/shared';


describe('RecentItemsComponent', () => {
  let component: RecentItemsComponent;
  let fixture: ComponentFixture<RecentItemsComponent>;
  let mockOfferService: OfferService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentItemsComponent ],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [OfferService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    mockOfferService = TestBed.get(OfferService);

    fixture = TestBed.createComponent(RecentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('greets the subject', () => {
    const res: any = of(offerServiceMockData.getAllRecentOffers.responseData.successRes.payload);
    spyOn(mockOfferService, 'getAllRecentOffers').and.returnValue(res);
    component.ngOnInit();
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.gintaa-title-sub'));
    const name = fixture.debugElement.query(By.css('h3'));
    const price = fixture.debugElement.query(By.css('.price'));
    const location = fixture.debugElement.query(By.css('.location'));
    
    expect(button.nativeElement.innerText).toBe(`${res.value.length} Items`);
    expect(name.nativeElement.innerText).toBe(res.value[0].name);
    expect(price.nativeElement.innerText).toBe(mockOfferService.showDesire(res.value[0]));
    expect(location.nativeElement.innerText).toBe(mockOfferService.showLocation(res.value[0]));
  });
});
