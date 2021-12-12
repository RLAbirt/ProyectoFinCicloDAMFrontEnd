import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriaInicioRuralesComponent } from './categoria-inicio-rurales.component';

describe('CategoriaInicioRuralesComponent', () => {
  let component: CategoriaInicioRuralesComponent;
  let fixture: ComponentFixture<CategoriaInicioRuralesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaInicioRuralesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriaInicioRuralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
