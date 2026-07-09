import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])]
    }).compileComponents();
  });

  it('should render brand logo', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.logo')?.textContent).toContain(
      'Plataforma CFP'
    );
  });

  it('should render exactly three navigation options', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('.nav-link');
    expect(navLinks.length).toBe(3);
    expect(navLinks[0].textContent?.trim()).toBe('Cadastros de eventos');
    expect(navLinks[1].textContent?.trim()).toBe('Cadastro de palestra');
    expect(navLinks[2].textContent?.trim()).toBe('Dashboard');
  });
});
