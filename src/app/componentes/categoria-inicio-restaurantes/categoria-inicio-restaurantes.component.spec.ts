import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriaInicioRestaurantesComponent } from './categoria-inicio-restaurantes.component';

describe('CategoriaInicioRestaurantesComponent', () => {
  let component: CategoriaInicioRestaurantesComponent;
  let fixture: ComponentFixture<CategoriaInicioRestaurantesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaInicioRestaurantesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaInicioRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
