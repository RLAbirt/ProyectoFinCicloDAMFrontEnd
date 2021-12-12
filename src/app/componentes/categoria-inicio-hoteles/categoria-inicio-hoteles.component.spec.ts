import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriaInicioHotelesComponent } from './categoria-inicio-hoteles.component';

describe('CategoriaInicioHotelesComponent', () => {
  let component: CategoriaInicioHotelesComponent;
  let fixture: ComponentFixture<CategoriaInicioHotelesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaInicioHotelesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaInicioHotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
