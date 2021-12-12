import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TarjetaCategoriaInicioComponent } from './tarjeta-categoria-inicio.component';

describe('TarjetaCategoriaInicioComponent', () => {
  let component: TarjetaCategoriaInicioComponent;
  let fixture: ComponentFixture<TarjetaCategoriaInicioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaCategoriaInicioComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TarjetaCategoriaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
